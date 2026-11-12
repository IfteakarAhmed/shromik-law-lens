export const recordedLawSections = {
  section4: {
    section: "৪",
    titleKey: "mockReview.law.section4.title",
    textKey: "mockReview.law.section4.text",
    highlightKey: "mockReview.law.section4.highlight",
    href: "https://bdlaws.minlaw.gov.bd/act-952/section-29072.html",
  },
  section5: {
    section: "৫",
    titleKey: "mockReview.law.section5.title",
    textKey: "mockReview.law.section5.text",
    highlightKey: "mockReview.law.section5.highlight",
    href: "https://bdlaws.minlaw.gov.bd/act-952/section-29073.html",
  },
  section26: {
    section: "২৬",
    titleKey: "mockReview.law.section26.title",
    textKey: "mockReview.law.section26.text",
    highlightKey: "mockReview.law.section26.highlight",
    href: "https://bdlaws.minlaw.gov.bd/act-952/section-29913.html",
  },
  section100: {
    section: "১০০",
    titleKey: "mockReview.law.section100.title",
    textKey: "mockReview.law.section100.text",
    highlightKey: "mockReview.law.section100.highlight",
    href: "https://bdlaws.minlaw.gov.bd/act-952/section-29427.html",
  },
  section101: {
    section: "১০১",
    titleKey: "mockReview.law.section101.title",
    textKey: "mockReview.law.section101.text",
    highlightKey: "mockReview.law.section101.highlight",
    href: "https://bdlaws.minlaw.gov.bd/act-952/section-29428.html",
  },
  section102: {
    section: "১০২",
    titleKey: "mockReview.law.section102.title",
    textKey: "mockReview.law.section102.text",
    highlightKey: "mockReview.law.section102.highlight",
    href: "https://bdlaws.minlaw.gov.bd/act-952/section-29429.html",
  },
  section103: {
    section: "১০৩",
    titleKey: "mockReview.law.section103.title",
    textKey: "mockReview.law.section103.text",
    highlightKey: "mockReview.law.section103.highlight",
    href: "https://bdlaws.minlaw.gov.bd/act-952/section-29430.html",
  },
  section108: {
    section: "১০৮",
    titleKey: "mockReview.law.section108.title",
    textKey: "mockReview.law.section108.text",
    highlightKey: "mockReview.law.section108.highlight",
    href: "https://bdlaws.minlaw.gov.bd/act-952/section-29435.html",
  },
  section125: {
    section: "১২৫",
    titleKey: "mockReview.law.section125.title",
    textKey: "mockReview.law.section125.text",
    highlightKey: "mockReview.law.section125.highlight",
    href: "https://bdlaws.minlaw.gov.bd/act-952/section-29452.html",
  },
} as const;

export type RecordedLawSectionId = keyof typeof recordedLawSections;
export type ReviewSeverity = "critical" | "high" | "medium";

export interface RecordedFinding {
  readonly id: string;
  readonly titleKey: string;
  readonly clauseKey: string;
  readonly explanationKey: string;
  readonly severity: ReviewSeverity;
  readonly nonObvious: boolean;
  readonly sectionIds: readonly RecordedLawSectionId[];
  readonly modelKey: string;
}

export const recordedFindings = [
  {
    id: "weekly-hours",
    titleKey: "mockReview.findings.weeklyHours.title",
    clauseKey: "mockReview.findings.weeklyHours.clause",
    explanationKey: "mockReview.findings.weeklyHours.explanation",
    severity: "critical",
    nonObvious: true,
    sectionIds: ["section102"],
    modelKey: "mockReview.findings.weeklyHours.model",
  },
  {
    id: "unpaid-overtime",
    titleKey: "mockReview.findings.unpaidOvertime.title",
    clauseKey: "mockReview.findings.unpaidOvertime.clause",
    explanationKey: "mockReview.findings.unpaidOvertime.explanation",
    severity: "critical",
    nonObvious: true,
    sectionIds: ["section108"],
    modelKey: "mockReview.findings.unpaidOvertime.model",
  },
  {
    id: "daily-hours",
    titleKey: "mockReview.findings.dailyHours.title",
    clauseKey: "mockReview.findings.dailyHours.clause",
    explanationKey: "mockReview.findings.dailyHours.explanation",
    severity: "high",
    nonObvious: true,
    sectionIds: ["section100"],
    modelKey: "mockReview.findings.dailyHours.model",
  },
  {
    id: "uniform-deduction",
    titleKey: "mockReview.findings.uniformDeduction.title",
    clauseKey: "mockReview.findings.uniformDeduction.clause",
    explanationKey: "mockReview.findings.uniformDeduction.explanation",
    severity: "high",
    nonObvious: false,
    sectionIds: ["section125"],
    modelKey: "mockReview.findings.uniformDeduction.model",
  },
  {
    id: "probation-duration",
    titleKey: "mockReview.findings.probationDuration.title",
    clauseKey: "mockReview.findings.probationDuration.clause",
    explanationKey: "mockReview.findings.probationDuration.explanation",
    severity: "high",
    nonObvious: true,
    sectionIds: ["section4"],
    modelKey: "mockReview.findings.probationDuration.model",
  },
  {
    id: "termination-notice",
    titleKey: "mockReview.findings.terminationNotice.title",
    clauseKey: "mockReview.findings.terminationNotice.clause",
    explanationKey: "mockReview.findings.terminationNotice.explanation",
    severity: "high",
    nonObvious: true,
    sectionIds: ["section26"],
    modelKey: "mockReview.findings.terminationNotice.model",
  },
  {
    id: "missing-break",
    titleKey: "mockReview.findings.missingBreak.title",
    clauseKey: "mockReview.findings.missingBreak.clause",
    explanationKey: "mockReview.findings.missingBreak.explanation",
    severity: "medium",
    nonObvious: false,
    sectionIds: ["section101"],
    modelKey: "mockReview.findings.missingBreak.model",
  },
  {
    id: "no-weekly-rest",
    titleKey: "mockReview.findings.noWeeklyRest.title",
    clauseKey: "mockReview.findings.noWeeklyRest.clause",
    explanationKey: "mockReview.findings.noWeeklyRest.explanation",
    severity: "medium",
    nonObvious: true,
    sectionIds: ["section103"],
    modelKey: "mockReview.findings.noWeeklyRest.model",
  },
  {
    id: "missing-appointment-letter",
    titleKey: "mockReview.findings.missingAppointmentLetter.title",
    clauseKey: "mockReview.findings.missingAppointmentLetter.clause",
    explanationKey: "mockReview.findings.missingAppointmentLetter.explanation",
    severity: "medium",
    nonObvious: false,
    sectionIds: ["section5"],
    modelKey: "mockReview.findings.missingAppointmentLetter.model",
  },
  {
    id: "unconditional-loss-deduction",
    titleKey: "mockReview.findings.unconditionalLossDeduction.title",
    clauseKey: "mockReview.findings.unconditionalLossDeduction.clause",
    explanationKey: "mockReview.findings.unconditionalLossDeduction.explanation",
    severity: "medium",
    nonObvious: true,
    sectionIds: ["section125"],
    modelKey: "mockReview.findings.unconditionalLossDeduction.model",
  },
] as const satisfies readonly RecordedFinding[];

export const uncertainFinding = {
  id: "probation-pay",
  titleKey: "mockReview.uncertain.title",
  clauseKey: "mockReview.uncertain.clause",
  explanationKey: "mockReview.uncertain.explanation",
  severity: "medium",
  nonObvious: false,
  sectionIds: [],
  modelKey: "mockReview.uncertain.model",
  verification: "uncertain",
} as const;

export const clauseProposals = [
  { id: "overtime", titleKey: "mockReview.proposals.overtime.title", oldKey: "mockReview.proposals.overtime.old", newKey: "mockReview.proposals.overtime.new", sectionId: "section108" },
  { id: "uniform", titleKey: "mockReview.proposals.uniform.title", oldKey: "mockReview.proposals.uniform.old", newKey: "mockReview.proposals.uniform.new", sectionId: "section125" },
  { id: "termination", titleKey: "mockReview.proposals.termination.title", oldKey: "mockReview.proposals.termination.old", newKey: "mockReview.proposals.termination.new", sectionId: "section26" },
] as const satisfies readonly {
  readonly id: string;
  readonly titleKey: string;
  readonly oldKey: string;
  readonly newKey: string;
  readonly sectionId: RecordedLawSectionId;
}[];

export const workerDuties = [
  "mockReview.duties.worker.0",
  "mockReview.duties.worker.1",
  "mockReview.duties.worker.2",
  "mockReview.duties.worker.3",
] as const;

export const employerDuties = [
  "mockReview.duties.employer.0",
  "mockReview.duties.employer.1",
  "mockReview.duties.employer.2",
  "mockReview.duties.employer.3",
] as const;

const severityOrder: Record<ReviewSeverity, number> = { critical: 0, high: 1, medium: 2 };

export function sortRecordedFindings(findings: readonly RecordedFinding[]): RecordedFinding[] {
  return [...findings].sort((first, second) => severityOrder[first.severity] - severityOrder[second.severity]);
}