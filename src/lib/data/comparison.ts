import { dravioData } from "./source";
import type { ComparisonMetric } from "@/types/comparison";

export function getComparisonMetrics(): ComparisonMetric[] {
  return dravioData.comparisonMetrics;
}
