import type { CollegeRecord } from "@/types/college";
import type { CollegeSummary } from "@/types/listing";
import type { CollegeDetailViewModel } from "@/types/detail";
import { deriveSafetyTag } from "./tags";
import { medseatData } from "@/lib/data/source";

function getStateName(stateSlug: string): string {
  return (
    medseatData.states.find((state) => state.slug === stateSlug)?.name ??
    stateSlug
  );
}

function getLatestCutoff(record: CollegeRecord) {
  return record.cutoffs.reduce(
    (acc, current) => (current.year > acc.year ? current : acc),
    record.cutoffs[0]
  );
}

export function toCollegeSummary(record: CollegeRecord): CollegeSummary {
  const latest = getLatestCutoff(record);
  return {
    slug: record.slug,
    name: record.name,
    city: record.city,
    stateSlug: record.stateSlug,
    stateName: getStateName(record.stateSlug),
    collegeType: record.collegeType,
    totalAnnualFee: record.fees.totalAnnual,
    totalCourseFee: record.fees.totalCourse,
    latestCutoffRank: latest.closingRank,
    latestCutoffYear: latest.year,
    seatCount: record.seatCount,
    quotaInfo: record.quotaInfo,
    roiScore: record.roiScore,
    safetyTag: deriveSafetyTag(latest.closingRank),
    bond: record.bond,
  };
}

export function toCollegeDetail(record: CollegeRecord): CollegeDetailViewModel {
  const latest = getLatestCutoff(record);
  return {
    ...record,
    stateName: getStateName(record.stateSlug),
    totalAnnualFee: record.fees.totalAnnual,
    totalCourseFee: record.fees.totalCourse,
    latestCutoffRank: latest.closingRank,
    latestCutoffYear: latest.year,
  };
}
