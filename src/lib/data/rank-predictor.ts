import { medseatData } from "./source";
import { getAllColleges } from "./colleges";
import { getLatestRank } from "@/lib/colleges/filters";
import type { CollegeRecord } from "@/types/college";
import type { EstimatedRankRange, RankPredictorConfig } from "@/types/rank-predictor";

export function getRankPredictorConfig(): RankPredictorConfig {
  return medseatData.rankPredictor;
}

function clampScore(score: number): number {
  const { scoreMin, scoreMax } = getRankPredictorConfig();
  return Math.min(scoreMax, Math.max(scoreMin, Math.round(score)));
}

export function findScoreBand(score: number) {
  const normalized = clampScore(score);
  const band = getRankPredictorConfig().scoreBands.find(
    (b) => normalized >= b.minScore && normalized <= b.maxScore
  );
  if (!band) {
    const bands = getRankPredictorConfig().scoreBands;
    return bands[bands.length - 1];
  }
  return band;
}

export function estimateRankFromScore(score: number): EstimatedRankRange {
  const config = getRankPredictorConfig();
  const scoreBand = findScoreBand(score);
  return {
    referenceYear: config.referenceYear,
    coarse: { min: scoreBand.coarseRankMin, max: scoreBand.coarseRankMax },
    tight: { min: scoreBand.tightRankMin, max: scoreBand.tightRankMax },
    scoreBand,
  };
}

function expandRankRange(
  min: number,
  max: number,
  bufferPercent: number
): { min: number; max: number } {
  const mid = (min + max) / 2;
  const halfSpan = ((max - min) / 2) * (1 + bufferPercent / 100);
  return {
    min: Math.max(1, Math.round(mid - halfSpan)),
    max: Math.round(mid + halfSpan),
  };
}

function getPredictorCutoffRank(record: CollegeRecord): number | null {
  if (!record.cutoffs.length) return null;
  const rank = getLatestRank(record);
  if (!Number.isFinite(rank) || rank <= 0 || rank >= Number.POSITIVE_INFINITY) {
    return null;
  }
  return rank;
}

function collegesInRankWindow(
  records: CollegeRecord[],
  rankMin: number,
  rankMax: number
): CollegeRecord[] {
  return records.filter((record) => {
    const rank = getPredictorCutoffRank(record);
    if (rank === null) return false;
    return rank >= rankMin && rank <= rankMax;
  });
}

function sortByClosenessToMidpoint(
  records: CollegeRecord[],
  midpoint: number
): CollegeRecord[] {
  return [...records].sort((a, b) => {
    const rankA = getPredictorCutoffRank(a) ?? Number.MAX_SAFE_INTEGER;
    const rankB = getPredictorCutoffRank(b) ?? Number.MAX_SAFE_INTEGER;
    return Math.abs(rankA - midpoint) - Math.abs(rankB - midpoint);
  });
}

export interface RankPreviewResult {
  rankMin: number;
  rankMax: number;
  colleges: CollegeRecord[];
}

/** Colleges whose latest AIQ cutoff falls in the rank window (for predictor preview UI). */
export async function getCollegesForRankPreview(
  rankMin: number,
  rankMax: number,
  options?: {
    limit?: number;
    collegeTypes?: CollegeRecord["collegeType"][];
    maxTotalCourseFee?: number;
    useBuffer?: boolean;
  }
): Promise<RankPreviewResult> {
  const config = getRankPredictorConfig();
  const buffer = options?.useBuffer
    ? config.previewLimits.rankMatchBufferPercent
    : 0;
  const window = expandRankRange(rankMin, rankMax, buffer);
  const catalog = await getAllColleges();
  const withCutoffs = catalog.filter((c) => c.cutoffs.length > 0);
  let pool = collegesInRankWindow(withCutoffs, window.min, window.max);

  if (options?.collegeTypes?.length) {
    pool = pool.filter((c) => options.collegeTypes!.includes(c.collegeType));
  }
  if (options?.maxTotalCourseFee !== undefined) {
    pool = pool.filter((c) => c.fees.totalCourse <= options.maxTotalCourseFee!);
  }

  const midpoint = (rankMin + rankMax) / 2;
  const sorted = sortByClosenessToMidpoint(pool, midpoint);
  const limit = options?.limit ?? config.previewLimits.verifiedPreviewCount;

  let result = sorted;

  if (
    config.previewLimits.fillNearestWhenUnderLimit &&
    result.length < limit
  ) {
    const seen = new Set(result.map((c) => c.slug));
    const nearest = sortByClosenessToMidpoint(withCutoffs, midpoint);
    const padded = [...result];
    for (const college of nearest) {
      if (padded.length >= limit) break;
      if (seen.has(college.slug)) continue;
      seen.add(college.slug);
      padded.push(college);
    }
    result = padded;
  }

  return {
    rankMin: window.min,
    rankMax: window.max,
    colleges: result.slice(0, limit),
  };
}

export async function getTeaserCollegesForScore(
  score: number
): Promise<RankPreviewResult> {
  const estimate = estimateRankFromScore(score);
  const limit = getRankPredictorConfig().previewLimits.teaserCollegeCount;
  return getCollegesForRankPreview(
    estimate.coarse.min,
    estimate.coarse.max,
    { limit, useBuffer: true }
  );
}

export async function getVerifiedPreviewCollegesForScore(
  score: number
): Promise<RankPreviewResult> {
  const estimate = estimateRankFromScore(score);
  const limit = getRankPredictorConfig().previewLimits.verifiedPreviewCount;
  return getCollegesForRankPreview(
    estimate.tight.min,
    estimate.tight.max,
    { limit, useBuffer: true }
  );
}
