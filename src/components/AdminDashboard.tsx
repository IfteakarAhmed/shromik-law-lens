import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  BookOpenText,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Copy,
  KeyRound,
  ListChecks,
  LockKeyhole,
  Plus,
  ShieldCheck,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { GlassCard } from "@/components/GlassCard";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  getQueueSource,
  samplePlaybooks,
  sampleReviewQueue,
  sampleTraceStages,
  sampleUsageData,
} from "@/mocks/demo-areas";

type AdminSection = "queue" | "playbooks" | "keys" | "usage" | "trace";
type QueueDecision = "approved" | "rejected";
type QueueStatus = "pending" | QueueDecision;

interface DemoKey {
  readonly id: string;
  readonly name: string;
  readonly secret: string;
  readonly status: "active" | "revoked";
  readonly showOnce: boolean;
}

const sectionIcons = {
  queue: ListChecks,
  playbooks: BookOpenText,
  keys: KeyRound,
  usage: CircleDollarSign,
  trace: Activity,
} satisfies Record<AdminSection, typeof ListChecks>;

const usageChartConfig = {
  reviews: { label: "Reviews", color: "var(--color-verified)" },
} satisfies ChartConfig;

const costChartConfig = {
  cost: { label: "Cost index", color: "var(--color-uncertain)" },
} satisfies ChartConfig;

export function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const { section } = Route.useSearch();
  const navigate = useNavigate({ from: "/admin" });
  const [selectedQueueId, setSelectedQueueId] = useState<string>(sampleReviewQueue[0]?.id ?? "");
  const [decisions, setDecisions] = useState<Record<string, QueueStatus>>({});
  const [notes, setNotes] = useState("");
  const [queueMessage, setQueueMessage] = useState("");
  const [playbookRules, setPlaybookRules] = useState<Record<string, string>>(() =>
    Object.fromEntries(samplePlaybooks.map((playbook) => [playbook.id, t(playbook.rule)])),
  );
  const [savedPlaybookId, setSavedPlaybookId] = useState<string | null>(null);
  const [keys, setKeys] = useState<DemoKey[]>([
    { id: "key-review", name: t("admin.keys.reviewKey"), secret: "demo_sk_sample_review_01", status: "active", showOnce: false },
    { id: "key-reports", name: t("admin.keys.reportsKey"), secret: "demo_sk_sample_reports_02", status: "active", showOnce: false },
  ]);
  const [newKeyId, setNewKeyId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const selectedQueue = sampleReviewQueue.find((item) => item.id === selectedQueueId) ?? null;
  const source = selectedQueue ? getQueueSource(selectedQueue.id) : null;
  const queuedStatus: QueueStatus = selectedQueue ? decisions[selectedQueue.id] ?? "pending" : "pending";
  const queueItems = useMemo(() => sampleReviewQueue, []);
  const sectionLabel = (key: AdminSection) => t(`admin.${key === "queue" ? "reviewQueue" : key}`);

  const changeSection = (value: string) => {
    if (value === "queue" || value === "playbooks" || value === "keys" || value === "usage" || value === "trace") {
      void navigate({ search: { section: value } });
    }
  };

  const decide = (decision: QueueDecision) => {
    if (!selectedQueue) return;
    if (notes.trim().length === 0) {
      setQueueMessage(t("admin.queue.noteRequired"));
      return;
    }
    setDecisions((current) => ({ ...current, [selectedQueue.id]: decision }));
    setNotes("");
    setQueueMessage(t("admin.queue.saved"));
  };

  const createDemoKey = () => {
    const id = `demo-${keys.length + 1}`;
    const key: DemoKey = {
      id,
      name: `${t("admin.keys.newKeyName")} ${keys.length + 1}`,
      secret: `demo_sk_sample_${String(keys.length + 1).padStart(2, "0")}_not_live`,
      status: "active",
      showOnce: true,
    };
    setKeys((current) => [key, ...current]);
    setNewKeyId(key.id);
    setCopiedKey(false);
  };

  const copyDemoKey = async (key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(key);
        setCopiedKey(true);
      } catch {
        setCopiedKey(false);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-gutter py-4 sm:py-6">
        <Button asChild variant="ghost" className="px-2 text-muted-foreground">
          <Link to="/"><ArrowLeft aria-hidden="true" />{t("navigation.backHome")}</Link>
        </Button>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-verified"><ShieldCheck aria-hidden="true" className="size-4" />{t("app.name")}{t("app.ai")}</span>
      </header>

      <div className="mx-auto max-w-[1600px] px-gutter pb-12">
        <div className="mb-7 space-y-2">
          <p className="text-sm font-semibold text-verified">{t("admin.eyebrow")}</p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t("admin.title")}</h1>
            <Badge tone="uncertain">{t("admin.sample")}</Badge>
          </div>
          <p className="max-w-3xl text-muted-foreground">{t("admin.description")}</p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <nav aria-label={t("admin.navLabel")} className="-mx-gutter flex gap-1 overflow-x-auto border-y border-border px-gutter py-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:border-0 lg:px-0 lg:py-0">
            {(["queue", "playbooks", "keys", "usage", "trace"] as const).map((key) => {
              const Icon = sectionIcons[key];
              const active = section === key;
              return (
                <Button
                  key={key}
                  type="button"
                  variant={active ? "secondary" : "ghost"}
                  aria-current={active ? "page" : undefined}
                  onClick={() => changeSection(key)}
                  className="min-w-max justify-start px-3 lg:w-full"
                >
                  <Icon aria-hidden="true" className={active ? "text-verified" : "text-muted-foreground"} />
                  {sectionLabel(key)}
                </Button>
              );
            })}
          </nav>

          <main className="min-w-0 space-y-5">
            {section === "queue" ? (
              <section className="space-y-4" aria-labelledby="admin-section-title">
                <SectionHeading title={t("admin.queue.title")} description={t("admin.queue.description")} />
                <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
                  <GlassCard className="overflow-hidden">
                    <div className="max-h-[480px] overflow-auto">
                      <Table>
                        <TableHeader className="sticky top-0 z-10 bg-background/95 backdrop-blur">
                          <TableRow>
                            <TableHead className="whitespace-nowrap">{t("admin.queue.id")}</TableHead>
                            <TableHead>{t("admin.queue.finding")}</TableHead>
                            <TableHead>{t("admin.queue.severity")}</TableHead>
                            <TableHead>{t("admin.queue.status")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {queueItems.map((item) => {
                            const status = decisions[item.id] ?? "pending";
                            const selected = selectedQueueId === item.id;
                            return (
                              <TableRow key={item.id} data-state={selected ? "selected" : undefined}>
                                <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">{item.id}</TableCell>
                                <TableCell className="min-w-48">
                                  <Button type="button" variant="ghost" onClick={() => { setSelectedQueueId(item.id); setQueueMessage(""); }} aria-pressed={selected} className="h-auto min-h-11 w-full justify-start whitespace-normal px-2 py-2 text-left leading-snug">
                                    {t(item.findingKey)}
                                  </Button>
                                </TableCell>
                                <TableCell><Badge tone={item.severity === "critical" ? "rejected" : "uncertain"}>{t(`severity.${item.severity}`)}</Badge></TableCell>
                                <TableCell><StatusBadge status={status} /></TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </GlassCard>

                  <GlassCard as="section" aria-labelledby="queue-detail-title" className="space-y-4 p-4 sm:p-5">
                    {selectedQueue && source ? (
                      <>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div><p className="text-xs font-semibold text-muted-foreground">{selectedQueue.id}</p><h3 id="queue-detail-title" className="mt-1 text-lg font-bold text-foreground">{t("admin.queue.detail")}</h3></div>
                          <StatusBadge status={queuedStatus} />
                        </div>
                        <div><p className="text-xs font-semibold text-muted-foreground">{t("admin.queue.finding")}</p><p className="mt-1 font-semibold text-foreground">{t(selectedQueue.findingKey)}</p></div>
                        <div><p className="text-xs font-semibold text-muted-foreground">{t("admin.queue.clause")}</p><p className="mt-1 text-sm text-foreground">{t(selectedQueue.clauseKey)}</p></div>
                        <div><p className="text-xs font-semibold text-muted-foreground">{t("admin.queue.reason")}</p><p className="mt-1 text-sm text-muted-foreground">{t(selectedQueue.reasonKey)}</p></div>
                        <div className="rounded-md border border-border bg-background/50 p-3">
                          <p className="text-xs font-semibold text-muted-foreground">{t("admin.queue.source")}</p>
                          <a href={source.href} target="_blank" rel="noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-verified underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            {t(source.titleKey)} · {t("citation.section", { number: source.section })}
                          </a>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="decision-note" className="text-sm font-semibold text-foreground">{t("admin.queue.noteLabel")}</label>
                          <Textarea id="decision-note" value={notes} onChange={(event) => { setNotes(event.target.value); setQueueMessage(""); }} placeholder={t("admin.queue.notePlaceholder")} className="min-h-20 resize-y" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button type="button" onClick={() => decide("approved")} disabled={queuedStatus !== "pending"}><Check aria-hidden="true" />{t("admin.queue.approve")}</Button>
                          <Button type="button" variant="destructive" onClick={() => decide("rejected")} disabled={queuedStatus !== "pending"}><X aria-hidden="true" />{t("admin.queue.reject")}</Button>
                        </div>
                        {queueMessage ? <p role="status" className="text-sm text-uncertain">{queueMessage}</p> : null}
                      </>
                    ) : <EmptyState title={t("admin.queue.noSelection")} />}
                  </GlassCard>
                </div>
              </section>
            ) : null}

            {section === "playbooks" ? (
              <section className="space-y-4" aria-labelledby="admin-section-title">
                <SectionHeading title={t("admin.playbooks.title")} description={t("admin.playbooks.description")} />
                <div className="grid gap-4 xl:grid-cols-2">
                  {samplePlaybooks.map((playbook) => (
                    <GlassCard key={playbook.id} as="article" className="space-y-4 p-4 sm:p-5">
                      <div><h3 className="text-lg font-semibold text-foreground">{t(playbook.titleKey)}</h3><p className="text-sm text-muted-foreground">{t(playbook.descriptionKey)}</p></div>
                      <label htmlFor={`playbook-${playbook.id}`} className="text-sm font-medium text-foreground">{t("admin.playbooks.edit")}</label>
                      <Textarea id={`playbook-${playbook.id}`} value={playbookRules[playbook.id] ?? t(playbook.rule)} onChange={(event) => { setPlaybookRules((current) => ({ ...current, [playbook.id]: event.target.value })); setSavedPlaybookId(null); }} className="min-h-28 resize-y" />
                      <div className="flex flex-wrap items-center gap-3"><Button type="button" variant="outline" onClick={() => setSavedPlaybookId(playbook.id)}>{t("admin.playbooks.save")}</Button>{savedPlaybookId === playbook.id ? <span role="status" className="text-sm text-verified">{t("admin.playbooks.saved")}</span> : null}</div>
                    </GlassCard>
                  ))}
                </div>
              </section>
            ) : null}

            {section === "keys" ? (
              <section className="space-y-4" aria-labelledby="admin-section-title">
                <SectionHeading title={t("admin.keys.title")} description={t("admin.keys.description")} />
                <GlassCard className="overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><LockKeyhole aria-hidden="true" className="size-4 text-uncertain" />{t("admin.keys.notice")}</div>
                    <Button type="button" onClick={createDemoKey}><Plus aria-hidden="true" />{t("admin.keys.create")}</Button>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="sticky top-0 z-10 bg-background/95 backdrop-blur"><TableRow><TableHead>{t("admin.keys.name")}</TableHead><TableHead>{t("admin.keys.masked")}</TableHead><TableHead>{t("admin.keys.status")}</TableHead><TableHead><span className="sr-only">{t("admin.keys.revoke")}</span></TableHead></TableRow></TableHeader>
                      <TableBody>
                        {keys.map((key) => (
                          <TableRow key={key.id}>
                            <TableCell className="min-w-32 font-medium">{key.name}</TableCell>
                            <TableCell className="min-w-48 font-mono text-xs">{key.id === newKeyId && key.showOnce ? key.secret : "demo_sk_••••••••••••"}</TableCell>
                            <TableCell><Badge tone={key.status === "active" ? "verified" : "neutral"}>{key.status === "active" ? t("admin.keys.active") : t("admin.keys.revoked")}</Badge></TableCell>
                            <TableCell className="text-right">
                              {key.status === "active" ? <Button type="button" variant="outline" size="sm" onClick={() => setKeys((current) => current.map((entry) => entry.id === key.id ? { ...entry, status: "revoked" } : entry))} aria-label={`${t("admin.keys.revoke")} ${key.name}`}>{t("admin.keys.revoke")}</Button> : null}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {newKeyId ? (() => {
                    const created = keys.find((key) => key.id === newKeyId);
                    if (!created || !created.showOnce) return null;
                    return <div className="m-4 rounded-md border border-uncertain/30 bg-uncertain/5 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-semibold text-uncertain">{t("admin.keys.created")}</p><p className="mt-2 break-all font-mono text-sm text-foreground">{created.secret}</p></div><div className="flex gap-2"><Button type="button" variant="outline" onClick={() => void copyDemoKey(created.secret)}><Copy aria-hidden="true" />{copiedKey ? t("admin.keys.copied") : t("admin.keys.copy")}</Button><Button type="button" variant="ghost" onClick={() => { setKeys((current) => current.map((key) => key.id === created.id ? { ...key, showOnce: false } : key)); setNewKeyId(null); }}>{t("admin.keys.dismiss")}</Button></div></div>
                    </div>;
                  })() : null}
                </GlassCard>
              </section>
            ) : null}

            {section === "usage" ? (
              <section className="space-y-4" aria-labelledby="admin-section-title">
                <SectionHeading title={t("admin.usage.title")} description={t("admin.usage.description")} />
                <div className="grid gap-4 xl:grid-cols-2">
                  <GlassCard className="space-y-3 p-4 sm:p-5"><h3 className="font-semibold text-foreground">{t("admin.usage.chartReviews")}</h3><ChartContainer config={usageChartConfig} className="h-[260px] w-full"><BarChart accessibilityLayer data={sampleUsageData} margin={{ left: -18, right: 8, top: 12 }}><CartesianGrid vertical={false} stroke="var(--color-border)" /><XAxis dataKey="periodKey" tickFormatter={(key: string) => t(key)} tickLine={false} axisLine={false} /><YAxis allowDecimals={false} tickLine={false} axisLine={false} /><Tooltip content={<ChartTooltipContent labelFormatter={(key) => t(String(key))} formatter={(value) => `${t("admin.usage.reviews")}: ${value}`} />} /><Bar dataKey="reviews" fill="var(--color-reviews)" radius={[4, 4, 0, 0]} /></BarChart></ChartContainer></GlassCard>
                  <GlassCard className="space-y-3 p-4 sm:p-5"><h3 className="font-semibold text-foreground">{t("admin.usage.chartCost")}</h3><ChartContainer config={costChartConfig} className="h-[260px] w-full"><LineChart accessibilityLayer data={sampleUsageData} margin={{ left: -18, right: 8, top: 12 }}><CartesianGrid vertical={false} stroke="var(--color-border)" /><XAxis dataKey="periodKey" tickFormatter={(key: string) => t(key)} tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} /><Tooltip content={<ChartTooltipContent labelFormatter={(key) => t(String(key))} formatter={(value) => `${t("admin.usage.cost")}: ${value}`} />} /><Line type="monotone" dataKey="cost" stroke="var(--color-cost)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--color-cost)" }} activeDot={{ r: 5 }} /></LineChart></ChartContainer></GlassCard>
                </div>
              </section>
            ) : null}

            {section === "trace" ? (
              <section className="space-y-4" aria-labelledby="admin-section-title">
                <SectionHeading title={t("admin.trace.title")} description={t("admin.trace.description")} />
                <GlassCard className="p-4 sm:p-6">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4"><div><p className="text-xs font-semibold text-verified">{t("admin.trace.sample")}</p><h3 className="mt-1 font-semibold text-foreground">{t("admin.trace.analysis")}</h3></div><Badge tone="neutral">SG-REC-01</Badge></div>
                  <ol className="space-y-0">
                    {sampleTraceStages.map((stage, index) => (
                      <li key={stage.id} className="relative grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 py-3">
                        {index < sampleTraceStages.length - 1 ? <span aria-hidden="true" className="absolute bottom-0 left-[1.34rem] top-9 w-px bg-border" /> : null}
                        <span className="relative z-10 flex size-11 items-center justify-center rounded-full border border-verified/30 bg-verified/10 text-verified"><CheckCircle2 aria-hidden="true" className="size-5" /></span>
                        <div className="min-w-0"><h4 className="font-medium text-foreground">{t(stage.labelKey)}</h4><p className="text-xs text-muted-foreground">{t("admin.trace.stage")} {index + 1}</p></div>
                        <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs tabular-nums text-muted-foreground"><Clock3 aria-hidden="true" className="size-3.5" />{stage.duration} ms</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm"><span className="font-semibold text-foreground">{t("admin.trace.total")}</span><span className="font-mono tabular-nums text-verified">{sampleTraceStages.reduce((sum, stage) => sum + stage.duration, 0)} ms</span></div>
                </GlassCard>
              </section>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return <div className="space-y-1"><h2 id="admin-section-title" className="text-xl font-bold text-foreground">{title}</h2><p className="text-sm text-muted-foreground">{description}</p></div>;
}

function StatusBadge({ status }: { status: QueueStatus }) {
  const { t } = useTranslation();
  const tone = status === "approved" ? "verified" : status === "rejected" ? "rejected" : "uncertain";
  return <Badge tone={tone}>{t(`admin.queue.${status}`)}</Badge>;
}