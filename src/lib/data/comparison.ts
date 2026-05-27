import { medseatData } from "./source";
import type { ComparisonMetric } from "@/types/comparison";

export function getComparisonMetrics(): ComparisonMetric[] {
  return medseatData.comparisonMetrics;
}
