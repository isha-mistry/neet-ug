import type { CollegeSummary } from "./listing";

export type ComparisonMetricFormat =
  | "currency"
  | "number"
  | "years"
  | "score";

export type ComparisonDirection = "lower" | "higher";

export interface ComparisonMetric {
  id: string;
  label: string;
  direction: ComparisonDirection;
  weight: number;
  format: ComparisonMetricFormat;
}

export interface ComparisonRow {
  metric: ComparisonMetric;
  values: Array<{ collegeSlug: string; value: number; display: string }>;
  bestSlug: string;
}

export interface RecommendationResult {
  bestCollegeSlug: string;
  score: number;
  reasons: string[];
}

export interface ComparisonViewModel {
  colleges: CollegeSummary[];
  rows: ComparisonRow[];
  recommendation: RecommendationResult | null;
}
