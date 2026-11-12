import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, ShieldCheck, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { CitationChip } from "@/components/CitationChip";
import { GlassCard } from "@/components/GlassCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { comparisonFindings, plainAiClaims, summarizeClaimRejections } from "@/mocks/demo-areas";
import { recordedLawSections } from "@/mocks/security-guard-review";

export function ComparePage() {
  const { t } = useTranslation();
  const [side, setSide] = useState("plain");
  const summary = useMemo(() => summarizeClaimRejections(plainAiClaims), []);

  const plainColumn = (
    <div className="space-y-4" aria-label={t("comparisonPage.plain")}>
      {plainAiClaims.map((claim) => (
        <GlassCard key={claim.id} as="article" className="space-y-4 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-rejected/25 bg-rejected/10 text-rejected">
                <X aria-hidden="true" className="size-4" />
              </span>
              <h3 className="text-base font-semibold leading-snug text-foreground">{t(claim.titleKey)}</h3>
            </div>
            <Badge tone="rejected">{t("verification.rejected")}</Badge>
          </div>
          <p className="border-l-2 border-rejected/60 pl-3 text-sm text-muted-foreground line-through decoration-rejected decoration-2">
            {t(claim.detailKey)}
          </p>
          <div className="rounded-md border border-rejected/20 bg-rejected/5 p-3">
            <p className="text-xs font-semibold text-rejected">{t("comparisonPage.unverified")}</p>
            <p className="mt-1 text-sm font-medium text-foreground line-through decoration-rejected decoration-2">{t(claim.claimedReferenceKey)}</p>
            <p className="mt-2 text-xs text-muted-foreground"><span className="font-semibold text-foreground">{t("comparisonPage.reasonLabel")}: </span>{t(claim.verifierReasonKey)}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  );

  const verifiedColumn = (
    <div className="space-y-4" aria-label={t("comparisonPage.verifiedTitle")}>
      {comparisonFindings.map((finding) => (
        <GlassCard key={finding.id} as="article" className="space-y-4 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-verified/25 bg-verified/10 text-verified">
                <Check aria-hidden="true" className="size-4" />
              </span>
              <h3 className="text-base font-semibold leading-snug text-foreground">{t(finding.titleKey)}</h3>
            </div>
            <Badge tone="verified">{t("verification.verified")}</Badge>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{t(finding.explanationKey)}</p>
          <div className="flex flex-wrap gap-2">
            {finding.sectionIds.map((sectionId) => {
              const section = recordedLawSections[sectionId];
              return <CitationChip key={sectionId} citation={{ section: section.section, titleKey: section.titleKey, href: section.href }} />;
            })}
          </div>
        </GlassCard>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-gutter py-4 sm:py-6">
        <Button asChild variant="ghost" className="px-2 text-muted-foreground">
          <Link to="/app" search={{ role: "worker" }}><ArrowLeft aria-hidden="true" />{t("navigation.backHome")}</Link>
        </Button>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-verified"><ShieldCheck aria-hidden="true" className="size-4" />{t("app.name")}{t("app.ai")}</span>
      </header>
      <main className="mx-auto max-w-7xl px-gutter pb-16">
        <div className="mb-8 max-w-3xl space-y-3">
          <p className="text-sm font-semibold text-verified">{t("comparisonPage.eyebrow")}</p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t("comparisonPage.title")}</h1>
            <Badge tone="neutral">{t("comparisonPage.sample")}</Badge>
          </div>
          <p className="max-w-2xl text-muted-foreground">{t("comparisonPage.description")}</p>
        </div>

        <GlassCard className="mb-6 flex flex-wrap items-center gap-3 border-rejected/25 p-4 sm:p-5">
          <span className="flex size-9 items-center justify-center rounded-md bg-rejected/10 text-rejected"><X aria-hidden="true" className="size-5" /></span>
          <p className="min-w-0 flex-1 text-base font-semibold text-foreground">{t("comparisonPage.summary", summary)}</p>
          <span className="text-xs text-muted-foreground">{t("comparisonPage.unverified")}</span>
        </GlassCard>

        <Tabs value={side} onValueChange={setSide} className="space-y-5">
          <TabsList aria-label={t("comparisonPage.tabsLabel")} className="grid h-auto w-full grid-cols-2 gap-1 rounded-md border border-border bg-card p-1 md:hidden">
            <TabsTrigger value="plain" className="min-h-11 whitespace-normal">{t("comparisonPage.plain")}</TabsTrigger>
            <TabsTrigger value="verified" className="min-h-11 whitespace-normal">{t("comparisonPage.verified")}</TabsTrigger>
          </TabsList>
          <div className="grid items-start gap-6 md:grid-cols-2">
            <section className="hidden space-y-4 md:block">
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground"><X aria-hidden="true" className="size-4 text-rejected" />{t("comparisonPage.plain")}</h2>
              {plainColumn}
            </section>
            <section className="hidden space-y-4 md:block">
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground"><Check aria-hidden="true" className="size-4 text-verified" />{t("comparisonPage.verified")}</h2>
              {verifiedColumn}
            </section>
            <TabsContent value="plain" className="mt-0 md:hidden">{plainColumn}</TabsContent>
            <TabsContent value="verified" className="mt-0 md:hidden">{verifiedColumn}</TabsContent>
          </div>
        </Tabs>
        <footer className="mt-10 flex justify-end">
          <Button asChild variant="outline"><Link to="/app" search={{ role: "worker" }}>{t("comparisonPage.backToDemo")}<ArrowUpRight aria-hidden="true" /></Link></Button>
        </footer>
      </main>
    </div>
  );
}