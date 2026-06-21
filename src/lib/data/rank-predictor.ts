import { dravioData } from "./source";
import { getAllColleges } from "./colleges";
import { pickDisplayCutoff } from "@/lib/colleges/cutoff-context";
import type { CollegeRecord } from "@/types/college";
import type { ListingQuota } from "@/types/filters";
import type { EstimatedRankRange, RankPredictorConfig } from "@/types/rank-predictor";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import { RANK_PREDICTOR_PREVIEW_QUOTA } from "@/lib/rank-predictor/constants";

export function getRankPredictorConfig(): RankPredictorConfig {
  return dravioData.rankPredictor;
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

export interface RankPreviewCutoffContext {
  quota: ListingQuota;
  category: NeetCategory;
  /** Ignore cutoffs older than this year (latest row per college must meet this). */
  minCutoffYear: number;
}

function getPreviewCutoff(
  record: CollegeRecord,
  context: RankPreviewCutoffContext
): { rank: number; year: number } | null {
  const cutoff = pickDisplayCutoff(record, {
    quota: context.quota,
    category: context.category,
  });
  if (!cutoff?.rank || cutoff.rank <= 0) return null;
  if (cutoff.year < context.minCutoffYear) return null;
  return { rank: cutoff.rank, year: cutoff.year };
}

function collegesInRankWindow(
  records: CollegeRecord[],
  rankMin: number,
  rankMax: number,
  context: RankPreviewCutoffContext
): CollegeRecord[] {
  return records.filter((record) => {
    const cutoff = getPreviewCutoff(record, context);
    if (!cutoff) return false;
    return cutoff.rank >= rankMin && cutoff.rank <= rankMax;
  });
}

function sortByClosenessToMidpoint(
  records: CollegeRecord[],
  midpoint: number,
  context: RankPreviewCutoffContext
): CollegeRecord[] {
  return [...records].sort((a, b) => {
    const rankA = getPreviewCutoff(a, context)?.rank ?? Number.MAX_SAFE_INTEGER;
    const rankB = getPreviewCutoff(b, context)?.rank ?? Number.MAX_SAFE_INTEGER;
    return Math.abs(rankA - midpoint) - Math.abs(rankB - midpoint);
  });
}

function collegesWithCatalogCutoff(
  catalog: CollegeRecord[],
  context: RankPreviewCutoffContext
): CollegeRecord[] {
  return catalog.filter((record) => getPreviewCutoff(record, context) !== null);
}

export interface RankPreviewResult {
  rankMin: number;
  rankMax: number;
  colleges: CollegeRecord[];
  cutoffContext: RankPreviewCutoffContext;
}

/** Colleges whose catalog closing rank (quota + category) falls in the rank window. */
export async function getCollegesForRankPreview(
  rankMin: number,
  rankMax: number,
  options?: {
    limit?: number;
    collegeTypes?: CollegeRecord["collegeType"][];
    maxTotalCourseFee?: number;
    useBuffer?: boolean;
    cutoffContext?: Partial<RankPreviewCutoffContext> &
      Pick<RankPreviewCutoffContext, "category">;
  }
): Promise<RankPreviewResult> {
  const config = getRankPredictorConfig();
  const cutoffContext: RankPreviewCutoffContext = {
    quota: options?.cutoffContext?.quota ?? RANK_PREDICTOR_PREVIEW_QUOTA,
    category: options?.cutoffContext?.category ?? "general",
    minCutoffYear:
      options?.cutoffContext?.minCutoffYear ?? config.referenceYear - 1,
  };

  const buffer = options?.useBuffer
    ? config.previewLimits.rankMatchBufferPercent
    : 0;
  const window = expandRankRange(rankMin, rankMax, buffer);
  const catalog = await getAllColleges();
  const withCutoffs = collegesWithCatalogCutoff(catalog, cutoffContext);
  let pool = collegesInRankWindow(
    withCutoffs,
    window.min,
    window.max,
    cutoffContext
  );

  if (options?.collegeTypes?.length) {
    pool = pool.filter((c) => options.collegeTypes!.includes(c.collegeType));
  }
  if (options?.maxTotalCourseFee !== undefined) {
    pool = pool.filter((c) => c.fees.totalCourse <= options.maxTotalCourseFee!);
  }

  const midpoint = (rankMin + rankMax) / 2;
  const sorted = sortByClosenessToMidpoint(pool, midpoint, cutoffContext);
  const limit = options?.limit ?? config.previewLimits.verifiedPreviewCount;

  let result = sorted;

  if (
    config.previewLimits.fillNearestWhenUnderLimit &&
    result.length < limit
  ) {
    const seen = new Set(result.map((c) => c.slug));
    const nearest = sortByClosenessToMidpoint(withCutoffs, midpoint, cutoffContext);
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
    cutoffContext,
  };
}

export async function getTeaserCollegesForScore(
  score: number,
  category: NeetCategory
): Promise<RankPreviewResult> {
  const estimate = estimateRankFromScore(score);
  const limit = getRankPredictorConfig().previewLimits.teaserCollegeCount;
  return getCollegesForRankPreview(
    estimate.coarse.min,
    estimate.coarse.max,
    { limit, useBuffer: true, cutoffContext: { category } }
  );
}

export async function getVerifiedPreviewCollegesForScore(
  score: number,
  category: NeetCategory
): Promise<RankPreviewResult> {
  const estimate = estimateRankFromScore(score);
  const limit = getRankPredictorConfig().previewLimits.verifiedPreviewCount;
  return getCollegesForRankPreview(
    estimate.tight.min,
    estimate.tight.max,
    { limit, useBuffer: true, cutoffContext: { category } }
  );
}
