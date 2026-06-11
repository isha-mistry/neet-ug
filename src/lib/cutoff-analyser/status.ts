import { BORDERLINE_RANK_MARGIN } from "./constants";
import type { CutoffStatus } from "./types";

/** Lower AIR is better. `userRank` vs `closingRank` (last seat admitted). */
export function rankVsClosingStatus(
  userRank: number,
  closingRank: number | null | undefined
): CutoffStatus {
  if (!closingRank || closingRank <= 0) return "out";
  if (userRank <= closingRank - BORDERLINE_RANK_MARGIN) return "safe";
  if (userRank <= closingRank) return "borderline";
  return "out";
}

export function gapRanksBetter(userRank: number, closingRank: number): number {
  return closingRank - userRank;
}

export function likelihoodPercent(
  userRank: number,
  closingRank: number
): number {
  if (closingRank <= 0) return 0;
  if (userRank <= closingRank) {
    const cushion = (closingRank - userRank) / closingRank;
    return Math.min(98, Math.round(55 + cushion * 45));
  }
  const over = userRank - closingRank;
  if (over <= BORDERLINE_RANK_MARGIN) {
    return Math.max(35, Math.round(50 - (over / BORDERLINE_RANK_MARGIN) * 15));
  }
  const ratio = over / closingRank;
  return Math.max(5, Math.round(30 - ratio * 40));
}

export function statusToPreferenceTag(
  status: CutoffStatus
): "safe" | "target" | "reach" {
  if (status === "safe") return "safe";
  if (status === "borderline") return "target";
  return "reach";
}

export function probabilityLabel(percent: number): string {
  if (percent >= 70) return "Strong chance in selected states";
  if (percent >= 45) return "Mixed — target borderline options";
  return "Limited — focus on reach & mop-up";
}

/** Display order: Safe → Borderline → Unlikely (`out`). */
export const STATUS_SORT_ORDER: Record<CutoffStatus, number> = {
  safe: 0,
  borderline: 1,
  out: 2,
};

export function compareCutoffStatus(a: CutoffStatus, b: CutoffStatus): number {
  return STATUS_SORT_ORDER[a] - STATUS_SORT_ORDER[b];
}
