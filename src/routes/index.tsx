import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Check, Clock3, FileText, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { CitationChip } from "@/components/CitationChip";
import { Disclaimer } from "@/components/Disclaimer";
import { GlassCard } from "@/components/GlassCard";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SeverityTag } from "@/components/SeverityTag";
import { ThemeToggle } from "@/components/ThemeToggle";
import { VerificationBadge } from "@/components/VerificationBadge";
import { contractReview, reviewFindings } from "@/mocks/contract-review";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShromikAI — শ্রমিক · কর্মচুক্তি পর্যালোচনা" },
      {
        name: "description",
        content: "বাংলাদেশের শ্রম আইনের সঙ্গে মিলিয়ে কর্মচুক্তি বুঝুন—যাচাইকৃত সরকারি সূত্রসহ।",
      },
      {
        property: "og:title",
        content: "ShromikAI — শ্রমিক · কর্মচুক্তি পর্যালোচনা",
      },
      {
        property: "og:description",
        content: "বাংলাদেশের শ্রম আইনের সঙ্গে মিলিয়ে কর্মচুক্তি বুঝুন—যাচাইকৃত সরকারি সূত্রসহ।",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useTranslation();

  return (
    <div className="relative isolate min-h-screen">
      <div aria-hidden="true" className="texture-grid absolute inset-x-0 top-0 -z-10 h-[38rem]" />

      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-gutter py-5 sm:py-7">
        <a
          href="#top"
          className="group inline-flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${t("app.name")} ${t("app.ai")}`}
        >
          <span className="flex size-11 items-center justify-center rounded-xl border border-verified/25 bg-verified/10 text-verified shadow-glass-panel transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
            <span className="font-display text-xl font-bold" lang="bn">শ</span>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold tracking-normal text-foreground">
              {t("app.name")}<span className="text-verified">{t("app.ai")}</span>
            </span>
            <span className="text-xs text-muted-foreground">{t("app.tagline")}</span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs text-muted-foreground sm:flex">
            <ShieldCheck aria-hidden="true" className="size-4 text-verified" />
            <span>{t("header.officialSources")}</span>
          </div>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

      <div id="top" className="mx-auto max-w-7xl px-gutter pb-14 pt-10 sm:pb-20 sm:pt-16 lg:pt-20">
        <section aria-labelledby="page-title" className="grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex min-h-8 items-center gap-2 rounded-full border border-verified/20 bg-verified/5 px-3 text-sm font-medium text-verified">
              <span className="size-1.5 rounded-full bg-verified" aria-hidden="true" />
              {t("hero.eyebrow")}
            </div>
            <h1
              id="page-title"
              className="max-w-3xl font-display text-4xl font-semibold leading-[1.28] text-foreground sm:text-5xl lg:text-6xl"
            >
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-[1.8] text-muted-foreground sm:mt-6 sm:text-lg">
              {t("hero.description")}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button asChild size="lg" className="group rounded-lg px-5 font-semibold">
                <a href="#report">
                  {t("review.viewReport")}
                  <ArrowDown aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check aria-hidden="true" className="size-4 text-verified" />
                <span>{t("hero.scope")}</span>
              </div>
            </div>
          </div>

          <GlassCard
            as="aside"
            aria-label={t("common.verifiedOnly")}
            className="relative p-5 sm:p-6"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-tint" />
            <div className="relative flex items-start justify-between gap-4">
              <span className="flex size-12 items-center justify-center rounded-xl border border-verified/20 bg-verified/10 text-verified">
                <ShieldCheck aria-hidden="true" className="size-6" />
              </span>
              <Badge tone="verified">
                <Check aria-hidden="true" className="size-3.5" />
                {t("common.verifiedOnly")}
              </Badge>
            </div>
            <p className="relative mt-5 font-display text-xl font-semibold text-foreground sm:text-2xl">
              {t("hero.scope")}
            </p>
            <p className="relative mt-2 text-sm leading-7 text-muted-foreground">
              {t("app.description")}
            </p>
          </GlassCard>
        </section>

        <section id="report" aria-labelledby="review-title" className="mt-16 scroll-mt-8 sm:mt-24">
          <div className="mb-5 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText aria-hidden="true" className="size-4" />
                <span>{t("review.sectionTitle")}</span>
              </div>
              <h2 id="review-title" className="mt-1 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                {t("review.findingsTitle")}
              </h2>
            </div>
            <Badge tone="neutral" className="w-fit">
              {t("header.sampleReport")}
            </Badge>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <div className="space-y-3">
              {reviewFindings.map((finding, index) => (
                <GlassCard
                  as="article"
                  interactive
                  key={finding.id}
                  aria-labelledby={`finding-title-${finding.id}`}
                  className="p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-xs font-semibold text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            id={`finding-title-${finding.id}`}
                            className="font-display text-base font-semibold text-foreground sm:text-lg"
                          >
                            {t(finding.titleKey)}
                          </h3>
                          <SeverityTag severity={finding.severity} />
                        </div>
                        <p className="mt-1.5 text-sm leading-7 text-muted-foreground">
                          <span className="font-medium text-foreground">{t("review.clauseLabel")}: </span>
                          {t(finding.excerptKey)}
                        </p>
                      </div>
                    </div>
                    <VerificationBadge status={finding.verification} />
                  </div>

                  <div className="mt-4 border-t border-border/70 pt-3.5 sm:ml-11">
                    <p className="text-sm leading-7 text-foreground/90">
                      <span className="font-semibold">{t("review.analysisLabel")}: </span>
                      {t(finding.explanationKey)}
                    </p>
                    {finding.citations.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {finding.citations.map((citation) => (
                          <CitationChip
                            citation={citation}
                            key={`${finding.id}-${citation.section}`}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 rounded-md border border-uncertain/20 bg-uncertain/5 px-3 py-2 text-sm text-muted-foreground">
                        {t("review.noCitationNote")}
                      </p>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard as="aside" aria-labelledby="summary-title" className="p-5 sm:p-6 lg:sticky lg:top-6">
              <div className="flex items-center justify-between gap-3">
                <h3 id="summary-title" className="font-display text-lg font-semibold text-foreground">
                  {t("review.summaryTitle")}
                </h3>
                <span className="flex size-9 items-center justify-center rounded-lg border border-verified/20 bg-verified/10 text-verified">
                  <Check aria-hidden="true" className="size-4" />
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("review.sampleDocument")}
                <span className="ml-2 text-xs text-muted-foreground/80">· {t("review.sampleLabel")}</span>
              </p>

              <div className="my-5 grid grid-cols-3 gap-2 border-y border-border/70 py-4">
                <SummaryStat label={t("review.clausesReviewed")} value={contractReview.clausesReviewed} />
                <SummaryStat label={t("review.verifiedFindings")} value={contractReview.verifiedSources} />
                <SummaryStat label={t("review.needsReview")} value={contractReview.needsMoreInformation} />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 aria-hidden="true" className="size-4 shrink-0" />
                <span>{t("stats.checkedAt")}</span>
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-rejected/20 bg-rejected/5 px-3 py-2.5 text-sm text-foreground">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-rejected" aria-hidden="true" />
                <span>{t("stats.foundIssues")}</span>
              </div>
              <p className="mt-4 border-t border-border/70 pt-3 text-xs leading-6 text-muted-foreground">
                {t("common.footerNote")}
              </p>
            </GlassCard>
          </div>
        </section>

        <footer className="mt-12 border-t border-border/70 pt-6 sm:mt-16">
          <Disclaimer />
          <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>{t("common.verifiedOnly")}</span>
            <a
              href="https://bdlaws.minlaw.gov.bd/act-952.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 font-medium text-foreground/80 transition-colors hover:text-verified"
            >
              {t("citation.officialSource")}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

interface SummaryStatProps {
  label: string;
  value: number;
}

function SummaryStat({ label, value }: SummaryStatProps) {
  return (
    <div className="min-w-0">
      <p className="font-display text-2xl font-semibold tabular-nums text-foreground">{value}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{label}</p>
    </div>
  );
}