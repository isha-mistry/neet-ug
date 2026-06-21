import { pickAnalyserCutoffFromCutoffs } from "./cutoff-match";
import type { CollegeCutoff } from "@/types/college";
import type { ListingQuota } from "@/types/filters";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import {
  FOCUS_STATE_OPTIONS,
  QUOTA_OPTIONS,
} from "./constants";
import {
  gapRanksBetter,
  likelihoodPercent,
  probabilityLabel,
  rankVsClosingStatus,
} from "./status";
import type {
  AnalyserCollege,
  CollegeMatch,
  CutoffAnalyserInput,
  CutoffAnalyserRankContext,
  CutoffAnalyserResult,
  FocusStateSlug,
  StateEligibility,
  StateQuotaRow,
} from "./types";

function pickAnalyserCutoff(
  college: AnalyserCollege,
  quota: ListingQuota,
  category: NeetCategory,
  minCutoffYear?: number,
): CollegeCutoff | null {
  return pickAnalyserCutoffFromCutoffs(
    college.cutoffs,
    quota,
    category,
    minCutoffYear,
  );
}

function quotaLabel(quota: ListingQuota): string {
  return QUOTA_OPTIONS.find((q) => q.value === quota)?.label ?? quota;
}

function stateMeta(slug: FocusStateSlug) {
  const row = FOCUS_STATE_OPTIONS.find((s) => s.slug === slug);
  return {
    stateName: row?.label ?? slug,
    stateAbbrev: row?.abbrev ?? slug.slice(0, 2).toUpperCase(),
  };
}

function matchesCollegeType(
  college: AnalyserCollege,
  filter: CutoffAnalyserInput["collegeTypeFilter"]
): boolean {
  if (filter === "all") return true;
  if (filter === "government") {
    return college.collegeType === "government" || college.collegeType === "aiims";
  }
  return college.collegeType === "private" || college.collegeType === "deemed";
}

export function computeCutoffAnalysis(
  input: CutoffAnalyserInput,
  colleges: AnalyserCollege[],
  rankContext: CutoffAnalyserRankContext,
): CutoffAnalyserResult {
  const { userRank, rankRange, referenceYear, minCutoffYear } = rankContext;

  const selected = new Set(input.stateSlugs);
  const pool = colleges.filter(
    (c) =>
      selected.has(c.stateSlug as FocusStateSlug) &&
      matchesCollegeType(c, input.collegeTypeFilter)
  );

  const collegeMatches: CollegeMatch[] = [];
  for (const college of pool) {
    const cutoff = pickAnalyserCutoff(
      college,
      input.quota,
      input.category,
      minCutoffYear,
    );
    if (!cutoff?.rank) continue;
    const gap = gapRanksBetter(userRank, cutoff.rank);
    const status = rankVsClosingStatus(userRank, cutoff.rank);
    collegeMatches.push({
      college,
      closingRank: cutoff.rank,
      gapToUser: gap,
      likelihoodPercent: likelihoodPercent(userRank, cutoff.rank),
      status,
    });
  }

  collegeMatches.sort((a, b) => b.likelihoodPercent - a.likelihoodPercent);

  const safeCollegeCount = collegeMatches.filter(
    (m) => m.status === "safe"
  ).length;

  const stateEligibility: StateEligibility[] = input.stateSlugs.map(
    (stateSlug) => {
      const inState = collegeMatches.filter(
        (m) => m.college.stateSlug === stateSlug
      );
      const closingRank =
        inState.length > 0
          ? Math.max(...inState.map((m) => m.closingRank))
          : null;
      const status = rankVsClosingStatus(userRank, closingRank);
      const gap =
        closingRank != null ? gapRanksBetter(userRank, closingRank) : null;
      const { stateName, stateAbbrev } = stateMeta(stateSlug);
      return {
        stateSlug,
        stateName,
        stateAbbrev,
        status,
        closingRank,
        userRank,
        gapToUser: gap,
      };
    }
  );

  const statesEligibleCount = stateEligibility.filter(
    (s) => s.status === "safe" || s.status === "borderline"
  ).length;

  const eligibleStateAbbrevs = stateEligibility
    .filter((s) => s.status !== "out")
    .map((s) => s.stateAbbrev)
    .join(" · ");

  const quotas: ListingQuota[] = ["state", "aiq", "management", "nri"];
  const stateQuotaRows: StateQuotaRow[] = [];

  for (const stateSlug of input.stateSlugs) {
    const stateColleges = colleges.filter(
      (c) => c.stateSlug === stateSlug
    );
    const { stateName, stateAbbrev } = stateMeta(stateSlug);

    for (const quota of quotas) {
      const ranks: number[] = [];
      for (const college of stateColleges) {
        const cutoff = pickAnalyserCutoff(
          college,
          quota,
          input.category,
          minCutoffYear,
        );
        if (cutoff?.rank) ranks.push(cutoff.rank);
      }
      if (!ranks.length) continue;
      const openingRank = Math.min(...ranks);
      const closingRank = Math.max(...ranks);
      const status = rankVsClosingStatus(userRank, closingRank);
      stateQuotaRows.push({
        stateSlug,
        stateName,
        stateAbbrev,
        quota,
        quotaLabel: quotaLabel(quota),
        openingRank,
        closingRank,
        gapToUser: gapRanksBetter(userRank, closingRank),
        status,
      });
    }
  }

  const safeRows = stateQuotaRows.filter((r) => r.status === "safe").length;
  const borderlineRows = stateQuotaRows.filter(
    (r) => r.status === "borderline"
  ).length;
  const totalRows = stateQuotaRows.length || 1;
  const admissionProbabilityPercent = Math.min(
    95,
    Math.round(
      ((safeRows * 1 + borderlineRows * 0.45) / totalRows) * 100 +
        (safeCollegeCount > 0 ? 8 : 0)
    )
  );

  return {
    userRank,
    rankRange,
    referenceYear,
    admissionProbabilityPercent,
    probabilityLabel: probabilityLabel(admissionProbabilityPercent),
    safeCollegeCount,
    statesEligibleCount,
    statesSelectedCount: input.stateSlugs.length,
    eligibleStateAbbrevs,
    stateQuotaRows,
    collegeMatches,
    stateEligibility,
  };
}

export function pickAnalyserCutoffForCollege(
  college: AnalyserCollege,
  quota: ListingQuota,
  category: NeetCategory
): CollegeCutoff | null {
  return pickAnalyserCutoff(college, quota, category);
}
