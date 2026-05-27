import { FiCheckCircle, FiAlertTriangle, FiActivity } from "react-icons/fi";
import { Badge } from "@/components/ui/Badge";
import type { SafeRiskTag as SafeRiskTagType } from "@/types/listing";

interface SafeRiskTagProps {
  tag: SafeRiskTagType;
}

const labelMap: Record<SafeRiskTagType, string> = {
  safe: "Safe",
  moderate: "Moderate",
  risky: "Risky",
};

export function SafeRiskTag({ tag }: SafeRiskTagProps) {
  if (tag === "safe") {
    return (
      <Badge tone="safe" icon={<FiCheckCircle aria-hidden="true" />}>
        {labelMap[tag]}
      </Badge>
    );
  }
  if (tag === "risky") {
    return (
      <Badge tone="risky" icon={<FiAlertTriangle aria-hidden="true" />}>
        {labelMap[tag]}
      </Badge>
    );
  }
  return (
    <Badge tone="neutral" icon={<FiActivity aria-hidden="true" />}>
      {labelMap[tag]}
    </Badge>
  );
}
