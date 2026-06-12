import type { CollegeRecord } from "@/types/college";

interface QualityInput {
  stateSlug: string;
  hasFeeSchedule: boolean;
  hasSeatSnapshot: boolean;
  cutoffYears: number[];
  nriFeeUsd: boolean;
  seatSnapshotCount: number;
}

export function buildDataQualityFlags(input: QualityInput): string[] {
  const flags: string[] = [];
  const isGujarat = input.stateSlug === "gujarat";
  const isRajasthan = input.stateSlug === "rajasthan";

  if (isGujarat) {
    if (input.hasFeeSchedule) flags.push("HAS_GUJARAT_FEES");
    else flags.push("MISSING_GUJARAT_FEES");

    if (input.cutoffYears.includes(2025)) flags.push("HAS_GUJARAT_CUTOFFS");
    else flags.push("MISSING_GUJARAT_CUTOFFS");

    if (input.hasSeatSnapshot) flags.push("HAS_GUJARAT_SEATS");
    if (input.seatSnapshotCount > 1) flags.push("MULTIPLE_SEAT_MATRICES");
  }

  if (isRajasthan) {
    if (input.hasFeeSchedule) flags.push("HAS_RAJASTHAN_FEES");
    else flags.push("MISSING_RAJASTHAN_FEES");
    if (input.cutoffYears.includes(2025)) flags.push("HAS_RAJASTHAN_CUTOFFS");
    else flags.push("MISSING_RAJASTHAN_CUTOFFS");
    if (input.hasSeatSnapshot) flags.push("HAS_RAJASTHAN_SEATS");
  }

  if (input.nriFeeUsd) flags.push("NRI_FEE_USD");

  return flags;
}

export function hasDataQualityFlag(
  record: CollegeRecord,
  flag: string
): boolean {
  return record.dataQuality?.includes(flag) ?? false;
}
