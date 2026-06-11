import rankPredictorSeed from "@/data/rank-predictor-seed.json";
import type { EstimatedRankRange, RankPredictorConfig } from "@/types/rank-predictor";

const config = rankPredictorSeed.rankPredictor as RankPredictorConfig;

function clampScore(score: number): number {
  return Math.min(
    config.scoreMax,
    Math.max(config.scoreMin, Math.round(score))
  );
}

function findScoreBand(score: number) {
  const normalized = clampScore(score);
  const band = config.scoreBands.find(
    (b) => normalized >= b.minScore && normalized <= b.maxScore
  );
  if (!band) return config.scoreBands[config.scoreBands.length - 1];
  return band;
}

/** Client-safe score → AIR estimate (same bands as rank predictor). */
export function estimateRankFromScoreClient(
  score: number
): EstimatedRankRange {
  const scoreBand = findScoreBand(score);
  return {
    referenceYear: config.referenceYear,
    coarse: { min: scoreBand.coarseRankMin, max: scoreBand.coarseRankMax },
    tight: { min: scoreBand.tightRankMin, max: scoreBand.tightRankMax },
    scoreBand,
  };
}

export function getRankPredictorReferenceYear(): number {
  return config.referenceYear;
}
