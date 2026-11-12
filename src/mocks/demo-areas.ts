import { recordedFindings, recordedLawSections } from "@/mocks/security-guard-review";

export type PlainClaimStatus = "rejected" | "verified";

export interface PlainAiClaim {
  readonly id: string;
  readonly titleKey: string;
  readonly detailKey: string;
  readonly claimedReferenceKey: string;
  readonly verifierReasonKey: string;
  readonly status: PlainClaimStatus;
}

export const plainAiClaims = [
  {
    id: "invented-hours-limit",
    titleKey: "mockReview.finding.dailyHours.title",
    detailKey: "comparisonPage.claims.hours",
    claimedReferenceKey: "comparisonPage.claims.ref999",
    verifierReasonKey: "comparisonPage.reasons.sectionMissing",
    status: "rejected",
  },
  {
    id: "invented-overtime-quote",
    titleKey: "mockReview.finding.unpaidOvertime.title",
    detailKey: "comparisonPage.claims.overtime",
    claimedReferenceKey: "comparisonPage.claims.ref108",
    verifierReasonKey: "comparisonPage.reasons.quoteMismatch",
    status: "rejected",
  },
  {
    id: "invented-probation-rule",
    titleKey: "mockReview.finding.probationDuration.title",
    detailKey: "comparisonPage.claims.probation",
    claimedReferenceKey: "comparisonPage.claims.refProbation",
    verifierReasonKey: "comparisonPage.reasons.doesNotSupport",
    status: "rejected",
  },
  {
    id: "invented-deduction-rule",
    titleKey: "mockReview.finding.uniformDeposit.title",
    detailKey: "comparisonPage.claims.deduction",
    claimedReferenceKey: "comparisonPage.claims.ref125",
    verifierReasonKey: "comparisonPage.reasons.quoteMismatch",
    status: "rejected",
  },
] as const satisfies readonly PlainAiClaim[];

export function summarizeClaimRejections(claims: readonly PlainAiClaim[]) {
  return {
    citationCount: claims.length,
    rejectedCount: claims.filter((claim) => claim.status === "rejected").length,
  };
}

export const comparisonFindings = recordedFindings.slice(0, 4);

export const sampleReviewQueue = [
  {
    id: "RQ-2048",
    findingKey: "mockReview.finding.probationDuration.title",
    clauseKey: "mockReview.finding.probationDuration.clause",
    reasonKey: "admin.queue.reasonProbation",
    severity: "high",
    sourceId: "section4",
  },
  {
    id: "RQ-2047",
    findingKey: "mockReview.finding.weeklyHours.title",
    clauseKey: "mockReview.finding.weeklyHours.clause",
    reasonKey: "admin.queue.reasonApplicability",
    severity: "critical",
    sourceId: "section102",
  },
  {
    id: "RQ-2046",
    findingKey: "mockReview.finding.uniformDeposit.title",
    clauseKey: "mockReview.finding.uniformDeposit.clause",
    reasonKey: "admin.queue.reasonDeduction",
    severity: "high",
    sourceId: "section125",
  },
] as const;

export const samplePlaybooks = [
  {
    id: "wage-deductions",
    titleKey: "admin.playbooks.wageTitle",
    descriptionKey: "admin.playbooks.wageDescription",
    rule: "mockReview.finding.uniformDeposit.explanation",
  },
  {
    id: "working-hours",
    titleKey: "admin.playbooks.hoursTitle",
    descriptionKey: "admin.playbooks.hoursDescription",
    rule: "mockReview.finding.weeklyHours.explanation",
  },
  {
    id: "termination",
    titleKey: "admin.playbooks.terminationTitle",
    descriptionKey: "admin.playbooks.terminationDescription",
    rule: "mockReview.finding.terminationNotice.explanation",
  },
] as const;

export const sampleUsageData = [
  { periodKey: "admin.usage.periods.mon", reviews: 18, cost: 32 },
  { periodKey: "admin.usage.periods.tue", reviews: 24, cost: 41 },
  { periodKey: "admin.usage.periods.wed", reviews: 16, cost: 29 },
  { periodKey: "admin.usage.periods.thu", reviews: 31, cost: 53 },
  { periodKey: "admin.usage.periods.fri", reviews: 27, cost: 47 },
  { periodKey: "admin.usage.periods.sat", reviews: 12, cost: 20 },
] as const;

export const sampleTraceStages = [
  { id: "read", labelKey: "mockReview.progress.stages.reading", duration: 820, offset: 0 },
  { id: "redact", labelKey: "mockReview.progress.stages.redacting", duration: 340, offset: 820 },
  { id: "classify", labelKey: "mockReview.progress.stages.classifying", duration: 510, offset: 1160 },
  { id: "retrieve", labelKey: "mockReview.progress.stages.searching", duration: 1240, offset: 1670 },
  { id: "analyze", labelKey: "mockReview.progress.stages.analyzing", duration: 960, offset: 2910 },
  { id: "verify", labelKey: "mockReview.progress.stages.verifying", duration: 680, offset: 3870 },
] as const;

export function getQueueSource(queueItemId: string) {
  const item = sampleReviewQueue.find((entry) => entry.id === queueItemId);
  if (!item) return null;
  return recordedLawSections[item.sourceId as keyof typeof recordedLawSections];
}