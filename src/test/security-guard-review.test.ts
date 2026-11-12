import { describe, expect, it } from "vitest";

import { validateContractFile, MAX_CONTRACT_FILE_BYTES } from "@/lib/contract-file-validation";
import {
  recordedFindings,
  recordedLawSections,
  sortRecordedFindings,
  uncertainFinding,
} from "@/mocks/security-guard-review";

describe("security guard recorded sample", () => {
  it("contains ten findings with legal citations and sorted severity", () => {
    expect(recordedFindings).toHaveLength(10);
    expect(recordedFindings.every((finding) => finding.sectionIds.length > 0)).toBe(true);
    expect(sortRecordedFindings(recordedFindings).map((finding) => finding.severity)).toEqual([
      "critical",
      "critical",
      "high",
      "high",
      "high",
      "high",
      "medium",
      "medium",
      "medium",
      "medium",
    ]);
  });

  it("keeps the uncertain probation-pay finding free of citations", () => {
    expect(uncertainFinding.verification).toBe("uncertain");
    expect(uncertainFinding.sectionIds).toEqual([]);
  });

  it("links every cited section to the official government law repository", () => {
    expect(
      Object.values(recordedLawSections).every(
        (section) => new URL(section.href).hostname === "bdlaws.minlaw.gov.bd",
      ),
    ).toBe(true);
  });
});

describe("contract file validation", () => {
  it("accepts PDF, image and text formats at the 10 MB limit", () => {
    expect(
      validateContractFile({
        name: "contract.pdf",
        type: "application/pdf",
        size: MAX_CONTRACT_FILE_BYTES,
      }),
    ).toBeNull();
    expect(
      validateContractFile({ name: "contract.jpg", type: "image/jpeg", size: 128 }),
    ).toBeNull();
    expect(
      validateContractFile({ name: "contract.txt", type: "text/plain", size: 128 }),
    ).toBeNull();
  });

  it("rejects files above 10 MB", () => {
    expect(
      validateContractFile({
        name: "contract.pdf",
        type: "application/pdf",
        size: MAX_CONTRACT_FILE_BYTES + 1,
      }),
    ).toBe("tooLarge");
  });

  it("rejects unsupported file types", () => {
    expect(
      validateContractFile({ name: "contract.exe", type: "application/octet-stream", size: 128 }),
    ).toBe("unsupportedType");
  });
});
