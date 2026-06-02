import type { SafeRiskTag } from "@/types/listing";
import {
  RISKY_CUTOFF_THRESHOLD,
  SAFE_CUTOFF_THRESHOLD,
} from "@/lib/constants";

export function deriveSafetyTag(latestCutoffRank: number): SafeRiskTag {
  if (!latestCutoffRank || !Number.isFinite(latestCutoffRank)) return "risky";
  if (latestCutoffRank <= SAFE_CUTOFF_THRESHOLD) return "safe";
  if (latestCutoffRank >= RISKY_CUTOFF_THRESHOLD) return "risky";
  return "moderate";
}
