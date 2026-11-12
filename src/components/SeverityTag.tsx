import { useTranslation } from "react-i18next";

import { Badge } from "@/components/Badge";
import type { FindingSeverity } from "@/mocks/contract-review";

interface SeverityTagProps {
  severity: FindingSeverity;
}

const severityTone = {
  critical: "rejected",
  high: "rejected",
  medium: "uncertain",
  low: "neutral",
} as const;

export function SeverityTag({ severity }: SeverityTagProps) {
  const { t } = useTranslation();

  return (
    <Badge tone={severityTone[severity]}>
      <span>{t(`severity.${severity}`)}</span>
    </Badge>
  );
}
