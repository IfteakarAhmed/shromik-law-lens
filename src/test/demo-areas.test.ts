import { describe, expect, it } from "vitest";

import { plainAiClaims, sampleTraceStages, summarizeClaimRejections } from "@/mocks/demo-areas";
import { canSubmitReviewDecision } from "@/lib/admin-demo-logic";
import bn from "@/locales/bn.json";
import en from "@/locales/en.json";

function translationAt(source: unknown, key: string): unknown {
  return key.split(".").reduce<unknown>((value, segment) => {
    if (typeof value !== "object" || value === null || !(segment in value)) return undefined;
    return Reflect.get(value, segment) as unknown;
  }, source);
}

describe("sample citation comparison", () => {
  it("computes the citation totals from the mock claims", () => {
    expect(summarizeClaimRejections(plainAiClaims)).toEqual({ citationCount: 4, rejectedCount: 4 });
    expect(summarizeClaimRejections(plainAiClaims.slice(0, 2))).toEqual({
      citationCount: 2,
      rejectedCount: 2,
    });
  });

  it("labels rejected mock claims with a translated verifier reason in both languages", () => {
    for (const claim of plainAiClaims) {
      expect(claim.status).toBe("rejected");
      expect(translationAt(bn, claim.verifierReasonKey)).toEqual(expect.any(String));
      expect(translationAt(en, claim.verifierReasonKey)).toEqual(expect.any(String));
    }
  });
});

describe("admin mock data", () => {
  it("requires a nonblank note before a review decision", () => {
    expect(canSubmitReviewDecision("")).toBe(false);
    expect(canSubmitReviewDecision("   \n ")).toBe(false);
    expect(canSubmitReviewDecision("Checked the official section.")).toBe(true);
  });

  it("provides six trace stages with the displayed cumulative duration", () => {
    expect(sampleTraceStages).toHaveLength(6);
    expect(sampleTraceStages.reduce((total, stage) => total + stage.duration, 0)).toBe(4550);
  });

  it("provides labels for every admin section and language", () => {
    const keys = [
      "admin.reviewQueue",
      "admin.navPlaybooks",
      "admin.apiKeys",
      "admin.navUsage",
      "admin.navTrace",
      "admin.queue.noteRequired",
      "admin.playbooks.saved",
      "admin.keys.created",
      "admin.usage.chartReviews",
      "admin.trace.total",
    ];
    for (const key of keys) {
      expect(translationAt(bn, key)).toEqual(expect.any(String));
      expect(translationAt(en, key)).toEqual(expect.any(String));
    }
  });
});
