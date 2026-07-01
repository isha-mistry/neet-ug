import "server-only";

import { getRankPredictorConfig } from "@/lib/data/rank-predictor";
import { fetchAirRange, fetchStateMeritRange } from "@/lib/rank-predictor/predict-api";
import { computeCutoffAnalysis } from "./compute";
import { ANALYSER_DISCLAIMER, FOCUS_STATE_SLUGS } from "./constants";
import { buildFeeCollegesByState, loadAnalyserColleges } from "./load-colleges";
import { applyCollegeTypeFilter } from "./run-shared";
import type {
  CutoffAnalyserFormInput,
  CutoffAnalyserPhoneVerifiedSession,
  CutoffAnalyserInput,
  CutoffAnalyserResult,
  CutoffAnalyserSession,
  CutoffAnalyserSummary,
  CutoffAnalyserTeaserResult,
  CutoffAnalyserUnlockedResult,
} from "./types";

export {
  applyCollegeTypeFilter,
  sessionsMatch,
  validateCutoffAnalyserInput,
} from "./run-shared";

function buildSummary(result: CutoffAnalyserResult): CutoffAnalyserSummary {
  return {
    userRank: result.userRank,
    rankRange: result.rankRange,
    admissionProbabilityPercent: result.admissionProbabilityPercent,
    probabilityLabel: result.probabilityLabel,
    safeCollegeCount: result.safeCollegeCount,
    statesEligibleCount: result.statesEligibleCount,
    statesSelectedCount: result.statesSelectedCount,
    eligibleStateAbbrevs: result.eligibleStateAbbrevs,
    comparisonRowCount: result.stateQuotaRows.length,
    collegeMatchCount: result.collegeMatches.length,
  };
}

async function buildUnlocked(
  input: CutoffAnalyserFormInput,
): Promise<CutoffAnalyserUnlockedResult> {
  const config = getRankPredictorConfig();
  const rankRange = await fetchAirRange(input.score);
  const userRank = Math.round((rankRange.min + rankRange.max) / 2);
  let stateMeritRank: number | undefined;
  try {
    const smrRange = await fetchStateMeritRange(input.score, input.domicileState);
    if (smrRange) {
      stateMeritRank = Math.round((smrRange.min + smrRange.max) / 2);
    }
  } catch (err) {
    console.warn("[buildUnlocked] fetchStateMeritRange failed:", err);
  }
  const minCutoffYear = config.referenceYear - 1;

  const colleges = await loadAnalyserColleges();
  const analyserInput: CutoffAnalyserInput = {
    score: input.score,
    category: input.category,
    domicileState: input.domicileState,
    stateSlugs: [...FOCUS_STATE_SLUGS],
    quota: input.quota || "state",
    collegeTypeFilter: "all",
  };

  const result = computeCutoffAnalysis(analyserInput, colleges, {
    userRank,
    rankRange,
    stateMeritRank,
    referenceYear: config.referenceYear,
    minCutoffYear,
  });

  const summarySource = applyCollegeTypeFilter(result, "government");

  return {
    referenceYear: result.referenceYear,
    disclaimer: ANALYSER_DISCLAIMER,
    input,
    summary: buildSummary(summarySource),
    result,
    feeCollegesByState: buildFeeCollegesByState(colleges),
  };
}

export async function computeTeaserResult(
  input: CutoffAnalyserFormInput,
): Promise<CutoffAnalyserTeaserResult> {
  const unlocked = await buildUnlocked(input);
  return {
    referenceYear: unlocked.referenceYear,
    disclaimer: unlocked.disclaimer,
    input: unlocked.input,
    summary: unlocked.summary,
  };
}

export async function computeUnlockedResult(
  input: CutoffAnalyserFormInput | CutoffAnalyserSession,
): Promise<CutoffAnalyserUnlockedResult> {
  const { score, category, domicileState, quota } = input;
  return buildUnlocked({ score, category, domicileState, quota });
}

export type { CutoffAnalyserPhoneVerifiedSession };
