import { getStateNameFromCatalog } from "@/lib/data/state-name-cache";
import { formatINR } from "@/lib/utils";
import type { CollegeSummary, SafeRiskTag } from "@/types/listing";
import type { ListingQuota } from "@/types/filters";
import type { CollegeMatch, CutoffStatus } from "./types";

function statusToSafetyTag(status: CutoffStatus): SafeRiskTag {
  if (status === "safe") return "safe";
  if (status === "borderline") return "moderate";
  return "risky";
}

function cutoffYear(
  match: CollegeMatch,
  referenceYear: number,
): number {
  const hit = match.college.cutoffs.find(
    (c) => c.rank === match.closingRank || c.closingRank === match.closingRank,
  );
  return hit?.year ?? referenceYear;
}

/** Maps cutoff analyser match rows to listing {@link CollegeSummary} for `CollegeCard`. */
export function collegeMatchToSummary(
  match: CollegeMatch,
  referenceYear: number,
  _quota: ListingQuota,
): CollegeSummary {
  const { college, closingRank, status } = match;
  const annual = college.totalAnnualFee;

  return {
    slug: college.slug,
    name: college.name,
    city: college.city,
    stateSlug: college.stateSlug,
    stateName: getStateNameFromCatalog(college.stateSlug),
    collegeType: college.collegeType,
    totalAnnualFee: annual,
    totalCourseFee: annual > 0 ? annual * 5 : 0,
    displayAnnualFee: annual > 0 ? formatINR(annual, { compact: true }) : "Not available",
    latestCutoffRank: closingRank,
    latestCutoffYear: cutoffYear(match, referenceYear),
    seatCount: college.seatCount,
    quotaInfo: "",
    bondLabel: "—",
    roiScore: null,
    safetyTag: statusToSafetyTag(status),
    bond: { years: 0, penalty: 0 },
  };
}
