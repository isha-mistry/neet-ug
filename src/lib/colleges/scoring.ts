import type { CollegeRecord } from "@/types/college";
import type {
  ComparisonMetric,
  ComparisonRow,
  ComparisonViewModel,
  RecommendationResult,
} from "@/types/comparison";
import { formatINR, formatNumber } from "@/lib/utils";
import { toCollegeSummary } from "./mappers";
import { getLatestRank } from "./filters";

function metricValue(record: CollegeRecord, metricId: string): number {
  switch (metricId) {
    case "totalFee":
      return record.fees.totalCourse;
    case "latestCutoff":
      return getLatestRank(record);
    case "seatCount":
      return record.seatCount;
    case "bondYears":
      return record.bond.years;
    case "roiScore":
      return record.roiScore ?? 0;
    default:
      return 0;
  }
}

function formatValue(value: number, format: ComparisonMetric["format"]): string {
  switch (format) {
    case "currency":
      return formatINR(value, { compact: true });
    case "number":
      return formatNumber(value);
    case "years":
      return value === 0 ? "None" : `${value} ${value === 1 ? "year" : "years"}`;
    case "score":
      return `${value}/100`;
  }
}

function pickBestSlug(
  metric: ComparisonMetric,
  values: { collegeSlug: string; value: number }[]
): string {
  if (values.length === 0) return "";
  return values.reduce((best, current) => {
    if (!best) return current;
    if (metric.direction === "lower") {
      return current.value < best.value ? current : best;
    }
    return current.value > best.value ? current : best;
  }).collegeSlug;
}

export function buildComparison(
  records: CollegeRecord[],
  metrics: ComparisonMetric[]
): ComparisonViewModel {
  const summaries = records.map((record) => toCollegeSummary(record));

  const rows: ComparisonRow[] = metrics.map((metric) => {
    const values = records.map((record) => {
      const v = metricValue(record, metric.id);
      return {
        collegeSlug: record.slug,
        value: v,
        display: formatValue(v, metric.format),
      };
    });
    return {
      metric,
      values,
      bestSlug: pickBestSlug(metric, values),
    };
  });

  const recommendation = computeRecommendation(records, rows);

  return { colleges: summaries, rows, recommendation };
}

function computeRecommendation(
  records: CollegeRecord[],
  rows: ComparisonRow[]
): RecommendationResult | null {
  if (records.length < 2) return null;

  const scores = new Map<string, number>();
  records.forEach((r) => scores.set(r.slug, 0));

  rows.forEach((row) => {
    row.values.forEach(({ collegeSlug }) => {
      if (collegeSlug === row.bestSlug) {
        const weight = row.metric.weight;
        scores.set(collegeSlug, (scores.get(collegeSlug) ?? 0) + weight * 100);
      }
    });
  });

  let bestSlug = records[0].slug;
  let bestScore = -1;
  scores.forEach((value, key) => {
    if (value > bestScore) {
      bestSlug = key;
      bestScore = value;
    }
  });

  const winningMetrics = rows
    .filter((row) => row.bestSlug === bestSlug)
    .map((row) => row.metric.label);

  const reasons = winningMetrics.length
    ? winningMetrics.map((label) => `Leads on ${label}.`)
    : ["Balanced across metrics relative to selected colleges."];

  return {
    bestCollegeSlug: bestSlug,
    score: Math.round(bestScore),
    reasons,
  };
}

export function getComparisonMetricFormatter(format: ComparisonMetric["format"]) {
  return (value: number) => formatValue(value, format);
}
