import type { CollegeRecord, CollegeSeatMatrix } from "@/types/college";
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

export function parseQuotaInfoToSeatMatrix(quotaInfo: string): CollegeSeatMatrix {
  const matrix: CollegeSeatMatrix = {
    aiq: 0,
    stateQuota: 0,
    management: 0,
    nri: 0,
    categoryDistribution: {},
  };

  if (!quotaInfo) return matrix;

  const parts = quotaInfo.split("/").map((p) => p.trim());
  for (const part of parts) {
    const match = part.match(/^([A-Za-z\s\-]+)\s+(\d+)$/);
    if (match) {
      const label = match[1].trim();
      const val = parseInt(match[2], 10);
      const lowerLabel = label.toLowerCase();

      if (lowerLabel === "aiq" || lowerLabel === "all india quota") {
        matrix.aiq = val;
      } else if (lowerLabel === "state" || lowerLabel === "state quota") {
        matrix.stateQuota = val;
      } else if (lowerLabel === "management" || lowerLabel === "mq" || lowerLabel === "management quota") {
        matrix.management = val;
      } else if (lowerLabel === "nri" || lowerLabel === "nri quota") {
        matrix.nri = val;
      } else {
        // Capture category distributions (e.g. Open, SC, ST, SEBC, EWS)
        matrix.categoryDistribution[label] = val;
      }
    }
  }

  return matrix;
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
    bond: record.bond
  };
}

export function toCollegeDetail(record: CollegeRecord): CollegeDetailViewModel {
  const latest = getLatestCutoff(record);
  const seatMatrix = record.seatMatrix ?? (record.quotaInfo ? parseQuotaInfoToSeatMatrix(record.quotaInfo) : undefined);
  return {
    ...record,
    seatMatrix,
    stateName: getStateName(record.stateSlug),
    totalAnnualFee: record.fees.totalAnnual,
    totalCourseFee: record.fees.totalCourse,
    latestCutoffRank: latest?.rank ?? 0,
    latestCutoffYear: latest?.year ?? 0,
  };
}