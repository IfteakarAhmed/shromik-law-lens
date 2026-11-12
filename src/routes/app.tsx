import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/Badge";
import { CitationChip } from "@/components/CitationChip";
import { Disclaimer } from "@/components/Disclaimer";
import { GlassCard } from "@/components/GlassCard";
import { VerificationBadge } from "@/components/VerificationBadge";

type DemoRole = "worker" | "hr" | "admin";

export const Route = createFileRoute("/app")({
  validateSearch: (search: Record<string, unknown>): { role: DemoRole } => ({
    role: search["role"] === "hr" || search["role"] === "admin" ? search["role"] : "worker",
  }),
  head: () => ({
    meta: [
      { title: "নমুনা চুক্তি পর্যালোচনা · ShromikAI" },
      { name: "description", content: "কাল্পনিক কর্মচুক্তির ধারা, বাংলাদেশের শ্রম আইনের সরকারি সূত্রের সঙ্গে যাচাই করা নমুনা পর্যালোচনা।" },
      { property: "og:title", content: "নমুনা চুক্তি পর্যালোচনা · ShromikAI" },
      { property: "og:description", content: "কাল্পনিক কর্মচুক্তির ধারা, বাংলাদেশের শ্রম আইনের সরকারি সূত্রের সঙ্গে যাচাই করা নমুনা পর্যালোচনা।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemoReview,
});

function DemoReview() {
  const { t } = useTranslation();
  const { role } = Route.useSearch();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="texture-grid absolute inset-x-0 top-0 -z-10 h-[34rem]" />
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-gutter py-5">
        <Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
          <ArrowLeft aria-hidden="true" className="size-4" />
          {t("navigation.backHome")}
        </Link>
        <Badge tone="neutral">{t(`roles.${role}`)} · {t("demo.eyebrow")}</Badge>
      </header>

      <main className="mx-auto max-w-5xl px-gutter pb-14 pt-8 sm:pb-20 sm:pt-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-verified">{t("demo.eyebrow")}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.3] text-foreground sm:text-5xl">
            {t("demo.title")}
          </h1>
          <p className="mt-4 text-base leading-8 text-muted-foreground">{t("demo.description")}</p>
        </div>

        <GlassCard as="article" className="mt-8 p-5 sm:p-8">
          <div className="flex flex-col gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t("review.sampleDocument")}</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">{t("demo.findingTitle")}</h2>
            </div>
            <VerificationBadge status="rejected" />
          </div>

          <div className="grid gap-6 pt-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">{t("review.clauseLabel")}</p>
              <blockquote className="mt-3 rounded-lg border border-border bg-background/60 p-4 font-display text-base leading-8 text-foreground">
                {t("demo.clause")}
              </blockquote>
              <Badge tone="rejected" className="mt-4">{t("review.findingsTitle")}</Badge>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">{t("review.analysisLabel")}</p>
              <p className="mt-3 text-sm leading-8 text-foreground">{t("demo.explanation")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <CitationChip
                  citation={{
                    section: "১০৮",
                    titleKey: "citation.labourAct",
                    href: "https://bdlaws.minlaw.gov.bd/act-952/section-29435.html",
                  }}
                />
                <a
                  href="https://bdlaws.minlaw.gov.bd/act-952/section-29435.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t("citation.officialSource")}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="mt-6">
          <Disclaimer />
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">{t("demo.sampleLabel")}</p>
      </main>
    </div>
  );
}