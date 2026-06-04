export interface RankPredictorScoreBand {
  minScore: number;
  maxScore: number;
  coarseRankMin: number;
  coarseRankMax: number;
  tightRankMin: number;
  tightRankMax: number;
}

export interface RankPredictorPreviewLimits {
  teaserCollegeCount: number;
  verifiedPreviewCount: number;
  /** Expand rank band by this % when matching colleges (illustrative preview). */
  rankMatchBufferPercent: number;
  /** Pad preview list with nearest cutoffs if the band has too few colleges. */
  fillNearestWhenUnderLimit?: boolean;
}

export interface RankPredictorConfig {
  referenceYear: number;
  scoreMin: number;
  scoreMax: number;
  disclaimer: string;
  previewLimits: RankPredictorPreviewLimits;
  scoreBands: RankPredictorScoreBand[];
}

export interface EstimatedRankRange {
  referenceYear: number;
  coarse: { min: number; max: number };
  tight: { min: number; max: number };
  scoreBand: RankPredictorScoreBand;
}
