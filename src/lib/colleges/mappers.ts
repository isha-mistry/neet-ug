import type { CollegeRecord } from "@/types/college";
import type { CollegeSummary } from "@/types/listing";
import type { CollegeDetailViewModel } from "@/types/detail";
import type { CollegeFilters } from "@/types/filters";
import { pickDisplayCutoff } from "@/lib/colleges/cutoff-context";
import { pickDisplayQuotaFee } from "@/lib/colleges/fee-context";
import { deriveSafetyTag } from "./tags";
import { getStateNameFromCatalog } from "@/lib/data/state-name-cache";

function getStateName(stateSlug: string): string {
  return getStateNameFromCatalog(stateSlug);
}

function getLatestCutoff(record: CollegeRecord) {
  return pickDisplayCutoff(record, {});
}

export function toCollegeSummary(
  record: CollegeRecord,
  context?: Pick<CollegeFilters, "quota" | "category">
): CollegeSummary {
  const latest = context
    ? pickDisplayCutoff(record, context)
    : getLatestCutoff(record);
  const displayFee = pickDisplayQuotaFee(record, context?.quota);
  return {
    slug: record.slug,
    name: record.name,
    city: record.city,
    stateSlug: record.stateSlug,
    stateName: getStateName(record.stateSlug),
    collegeType: record.collegeType,
    totalAnnualFee: record.fees.totalAnnual,
    totalCourseFee: record.fees.totalCourse,
    displayAnnualFee: displayFee.formatted,
    latestCutoffRank: latest?.rank ?? 0,
    latestCutoffYear: latest?.year ?? 0,
    seatCount: record.seatCount,
    quotaInfo: record.quotaInfo,
    bondLabel:
      record.bond.years === 0
        ? "No Bond"
        : `${record.bond.years} Year${record.bond.years === 1 ? "" : "s"}`,
    roiScore: record.roiScore,
    safetyTag: deriveSafetyTag(latest?.rank ?? 0),
  };
}

export function toCollegeDetail(record: CollegeRecord): CollegeDetailViewModel {
  const latest = getLatestCutoff(record);
  return {
    ...record,
    stateName: getStateName(record.stateSlug),
    totalAnnualFee: record.fees.totalAnnual,
    totalCourseFee: record.fees.totalCourse,
    latestCutoffRank: latest?.rank ?? 0,
    latestCutoffYear: latest?.year ?? 0,
  };
}
