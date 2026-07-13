import type { CollegeFees, StateFeeScheduleRow } from "@/types/college";
import type { CounsellingPool } from "@/lib/colleges/counselling-pool";
import {
  GUJARAT_DUMP_SOURCE,
  MH_DUMP_SOURCE,
  MP_DUMP_SOURCE,
  RAJASTHAN_DUMP_SOURCE,
  stateFactSourceForSlug,
} from "@/lib/colleges/counselling-source";

/** `FeeSchedule.source` for Karnataka KEA fee dump (`karnataka_data.sql`). */
export const KARNATAKA_DUMP_SOURCE = "karnataka_dump";

/** `FeeSchedule.source` for UP DGME fee dump (`up_data.sql`). */
export const UP_DUMP_SOURCE = "up_dump";

/** `FeeSchedule.source` value for MCC fee CSV imports. */
export const MCC_FEE_CSV_SOURCE = "mcc_fee_csv";

/** Legacy/alternate source tags from earlier seed runs. */
export const MCC_FEE_CSV_SOURCE_LEGACY = "mcc_fees_csv";
export const KARNATAKA_DUMP_SOURCE_LEGACY = "karnataka_data.sql";
export const UP_DUMP_SOURCE_LEGACY = "up_data.sql";

const MCC_FEE_SOURCES = new Set([MCC_FEE_CSV_SOURCE, MCC_FEE_CSV_SOURCE_LEGACY]);

const STATE_DUMP_SOURCES = new Set([
  GUJARAT_DUMP_SOURCE,
  RAJASTHAN_DUMP_SOURCE,
  MP_DUMP_SOURCE,
  MH_DUMP_SOURCE,
  KARNATAKA_DUMP_SOURCE,
  UP_DUMP_SOURCE,
  KARNATAKA_DUMP_SOURCE_LEGACY,
  UP_DUMP_SOURCE_LEGACY,
]);

const MCC_POOLS = new Set<CounsellingPool>([
  "mcc-aiq",
  "mcc-deemed",
  "mcc-nri",
]);

export function isMccFeeScheduleSource(source: string | undefined | null): boolean {
  return source != null && MCC_FEE_SOURCES.has(source);
}

export function isStateDumpFeeSource(source: string | undefined | null): boolean {
  if (source == null || source === "") return false;
  return STATE_DUMP_SOURCES.has(source);
}

/** Preferred dump source tag for a configured state slug. */
export function stateDumpSourceForSlug(
  stateSlug: string | undefined | null,
): string | null {
  return stateFactSourceForSlug(stateSlug);
}

export type FeeDisplayAuthority = "state" | "mcc";

export function resolveFeeRowAuthority(
  row: StateFeeScheduleRow,
): FeeDisplayAuthority {
  if (isMccFeeScheduleSource(row.source)) return "mcc";
  if (isStateDumpFeeSource(row.source)) return "state";
  if (row.counsellingPool && MCC_POOLS.has(row.counsellingPool)) return "mcc";
  if (row.feeType.startsWith("MCC")) return "mcc";
  return "state";
}

export function feeRowsForAuthority(
  schedule: StateFeeScheduleRow[],
  authority: FeeDisplayAuthority,
): StateFeeScheduleRow[] {
  return schedule.filter((row) => resolveFeeRowAuthority(row) === authority);
}

export function hasStateFeeScheduleData(fees: CollegeFees): boolean {
  const rows = feeRowsForAuthority(fees.stateFeeSchedule ?? [], "state");
  if (rows.length > 0) return true;
  if (isStateDumpFeeSource(fees.scheduleSource)) return true;
  if (
    fees.scheduleSource &&
    !isMccFeeScheduleSource(fees.scheduleSource) &&
    (fees.tuition > 0 || fees.totalAnnual > 0)
  ) {
    return true;
  }
  return false;
}

export function hasMccFeeScheduleData(fees: CollegeFees): boolean {
  if (fees.mccFeeSummary) return true;
  if (isMccFeeScheduleSource(fees.scheduleSource)) return true;
  return feeRowsForAuthority(fees.stateFeeSchedule ?? [], "mcc").length > 0;
}

export type FeeHeadlineSummary = Pick<
  CollegeFees,
  "tuition" | "hostel" | "misc" | "totalAnnual" | "totalCourse"
>;

/** Headline tuition/hostel/totals for the active counselling authority tab. */
export function feeHeadlineForAuthority(
  fees: CollegeFees,
  authority: FeeDisplayAuthority,
): FeeHeadlineSummary | null {
  if (authority === "mcc") {
    if (fees.mccFeeSummary) return fees.mccFeeSummary;
    if (isMccFeeScheduleSource(fees.scheduleSource)) {
      return {
        tuition: fees.tuition,
        hostel: fees.hostel,
        misc: fees.misc,
        totalAnnual: fees.totalAnnual,
        totalCourse: fees.totalCourse,
      };
    }
    const mccRows = feeRowsForAuthority(fees.stateFeeSchedule ?? [], "mcc");
    if (mccRows.length > 0) {
      // Prefer assembled headline when schedule only has NRI / non-AIQ rows.
      if (
        fees.tuition > 0 ||
        fees.hostel > 0 ||
        fees.misc > 0 ||
        fees.totalAnnual > 0
      ) {
        return {
          tuition: fees.tuition,
          hostel: fees.hostel,
          misc: fees.misc,
          totalAnnual: fees.totalAnnual,
          totalCourse: fees.totalCourse,
        };
      }
      const primary =
        mccRows.find((r) => r.feeType.includes("AIQ")) ?? mccRows[0];
      return {
        tuition: primary.totalAnnual,
        hostel: 0,
        misc: 0,
        totalAnnual: primary.totalAnnual,
        totalCourse: primary.totalAnnual * 5,
      };
    }
    return null;
  }

  const stateRows = feeRowsForAuthority(fees.stateFeeSchedule ?? [], "state");
  if (stateRows.length === 0) {
    if (isMccFeeScheduleSource(fees.scheduleSource)) return null;
    if (hasMccFeeScheduleData(fees) && !hasStateFeeScheduleData(fees)) {
      return null;
    }
  }

  if (isMccFeeScheduleSource(fees.scheduleSource) && fees.mccFeeSummary) {
    return null;
  }

  if (stateRows.length > 0 && fees.tuition <= 0) {
    const primary = stateRows[0];
    return {
      tuition: primary.totalAnnual,
      hostel: fees.hostel,
      misc: fees.misc,
      totalAnnual: fees.totalAnnual || primary.totalAnnual,
      totalCourse: fees.totalCourse || primary.totalAnnual * 5,
    };
  }

  return {
    tuition: fees.tuition,
    hostel: fees.hostel,
    misc: fees.misc,
    totalAnnual: fees.totalAnnual,
    totalCourse: fees.totalCourse,
  };
}

export function hasFeeHeadlineData(
  summary: FeeHeadlineSummary | null,
  extras?: {
    hostelAcFees?: number;
    hostelNonAcFees?: number;
    securityDeposit?: number;
  },
): boolean {
  if (!summary) return false;
  return (
    summary.tuition > 0 ||
    summary.hostel > 0 ||
    summary.misc > 0 ||
    summary.totalAnnual > 0 ||
    summary.totalCourse > 0 ||
    (extras?.hostelAcFees ?? 0) > 0 ||
    (extras?.hostelNonAcFees ?? 0) > 0 ||
    (extras?.securityDeposit ?? 0) > 0
  );
}
