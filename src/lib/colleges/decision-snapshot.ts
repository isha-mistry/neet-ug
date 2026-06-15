import type { CollegeDetailViewModel } from "@/types/detail";
import { formatINR, formatNumber } from "@/lib/utils";

export interface DecisionSnapshotLine {
  tone: "neutral" | "positive" | "caution";
  text: string;
}

export function buildDecisionSnapshot(
  college: CollegeDetailViewModel
): DecisionSnapshotLine[] {
  const lines: DecisionSnapshotLine[] = [];

  if (college.latestCutoffRank > 0 && college.latestCutoffYear > 0) {
    lines.push({
      tone: "neutral",
      text: `Latest closing rank we track is AIR ${formatNumber(college.latestCutoffRank)} (${college.latestCutoffYear}). Use cutoffs below for your category and quota.`,
    });
  } else {
    lines.push({
      tone: "caution",
      text: "Cutoff history is limited in our dataset — confirm ranks on the official counselling portal before locking choices.",
    });
  }

  const qb = college.fees.quotaBreakdown;
  if (qb?.govtQuotaAnnualInr && qb.managementQuotaAnnualInr) {
    lines.push({
      tone: "caution",
      text: `GQ tuition about ${formatINR(qb.govtQuotaAnnualInr, { compact: true })}/yr vs MQ about ${formatINR(qb.managementQuotaAnnualInr, { compact: true })}/yr — seat type changes total cost sharply.`,
    });
  } else if (college.collegeType === "government" || college.collegeType === "aiims") {
    lines.push({
      tone: "positive",
      text: "Government / AIIMS seat — typically lower tuition than private management quotas; still verify bond and service rules.",
    });
  } else if (college.fees.totalAnnual > 0) {
    lines.push({
      tone: "neutral",
      text: `Indicative annual fees around ${formatINR(college.totalAnnualFee, { compact: true })} — see quota-wise breakdown in the fees section.`,
    });
  }

  if (college.bond.years > 0) {
    lines.push({
      tone: "caution",
      text: `Rural service bond of ${college.bond.years} year${college.bond.years === 1 ? "" : "s"} applies${
        college.bond.penalty > 0
          ? ` (penalty up to ${formatINR(college.bond.penalty, { compact: true })})`
          : ""
      }.`,
    });
  } else {
    lines.push({
      tone: "positive",
      text: "No rural bond on record for this college in our data.",
    });
  }

  if (college.seatMatrix) {
    const { aiq, stateQuota, management, nri } = college.seatMatrix;
    const parts: string[] = [];
    if (aiq > 0) parts.push(`AIQ ${aiq}`);
    if (stateQuota > 0) parts.push(`state ${stateQuota}`);
    if (management > 0) parts.push(`MQ ${management}`);
    if (nri > 0) parts.push(`NRI ${nri}`);
    if (parts.length > 0) {
      lines.push({
        tone: "neutral",
        text: `Seat mix highlights: ${parts.join(", ")} — plan both AIQ and state rounds if you are eligible.`,
      });
    }
  }

  return lines.slice(0, 4);
}
