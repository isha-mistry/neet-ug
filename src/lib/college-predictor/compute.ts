import { getAllColleges } from "@/lib/data/colleges";
import { cutoffMatchesListingQuota } from "@/lib/colleges/cutoff-context";
import { matchesSelectedCategory } from "@/lib/colleges/categories";
import { toCollegeSummary } from "@/lib/colleges/mappers";
import type { CollegeCutoff, CollegeRecord } from "@/types/college";
import {
  AIR_MAX,
  AIR_MIN,
  COLLEGE_PREDICTOR_DISCLAIMER,
  POSSIBLE_RANK_RATIO,
  REACH_RANK_RATIO,
  REFERENCE_CUTOFF_YEAR,
} from "./constants";
import type {
  CollegePredictorBucketCounts,
  CollegePredictorFormInput,
  CollegePredictorTeaserResult,
  CollegePredictorUnlockedResult,
} from "./types";

export type CollegeChanceBucket = "likely" | "possible" | "reach";

function classifyChance(
  userAir: number,
  closingRank: number
): CollegeChanceBucket | null {
  if (closingRank <= 0) return null;
  if (userAir <= closingRank) return "likely";
  if (userAir <= closingRank * POSSIBLE_RANK_RATIO) return "possible";
  if (userAir <= closingRank * REACH_RANK_RATIO) return "reach";
  return null;
}

function pickPredictorCutoff(
  record: CollegeRecord,
  input: CollegePredictorFormInput
): { cutoff: CollegeCutoff; pool: "state" | "aiq" } | null {
  if (!record.cutoffs.length) return null;

  const latestYear = Math.max(...record.cutoffs.map((c) => c.year));
  const latestPool = record.cutoffs.filter((c) => c.year === latestYear);
  if (!latestPool.length) return null;

  const category = input.category ?? "general";
  const byCategory = latestPool.filter((c) => {
    if (category === "pwbd") return c.category === "pwbd";
    return matchesSelectedCategory(c, category);
  });
  if (!byCategory.length) return null;

  const isHomeState = record.stateSlug === input.stateSlug;

  if (isHomeState) {
    const stateCutoffs = byCategory.filter((c) => cutoffMatchesListingQuota(c, "state"));
    if (stateCutoffs.length) {
      const best = [...stateCutoffs].sort((a, b) => (b.rank || 0) - (a.rank || 0))[0];
      if (best?.rank) return { cutoff: best, pool: "state" };
    }
    const bestAny = [...byCategory].sort((a, b) => (b.rank || 0) - (a.rank || 0))[0];
    if (bestAny?.rank) return { cutoff: bestAny, pool: "state" };
    return null;
  } else {
    const aiqCutoffs = byCategory.filter(
      (c) =>
        cutoffMatchesListingQuota(c, "aiq") ||
        record.collegeType === "deemed" ||
        record.collegeType === "aiims" ||
        c.quota.toLowerCase().includes("all india")
    );
    if (!aiqCutoffs.length) return null;
    const best = [...aiqCutoffs].sort((a, b) => (b.rank || 0) - (a.rank || 0))[0];
    if (best?.rank) return { cutoff: best, pool: "aiq" };
    return null;
  }
}

function bucketColleges(
  colleges: CollegeRecord[],
  userAir: number,
  input: CollegePredictorFormInput
) {
  const likely: { record: CollegeRecord; cutoff: CollegeCutoff; pool: "state" | "aiq" }[] = [];
  const possible: { record: CollegeRecord; cutoff: CollegeCutoff; pool: "state" | "aiq" }[] = [];
  const reach: { record: CollegeRecord; cutoff: CollegeCutoff; pool: "state" | "aiq" }[] = [];
  let withCutoffData = 0;

  for (const college of colleges) {
    const match = pickPredictorCutoff(college, input);
    if (!match || !match.cutoff.rank || match.cutoff.year < REFERENCE_CUTOFF_YEAR - 1) continue;
    withCutoffData += 1;
    const bucket = classifyChance(userAir, match.cutoff.rank);
    if (bucket === "likely") likely.push({ record: college, cutoff: match.cutoff, pool: match.pool });
    else if (bucket === "possible") possible.push({ record: college, cutoff: match.cutoff, pool: match.pool });
    else if (bucket === "reach") reach.push({ record: college, cutoff: match.cutoff, pool: match.pool });
  }

  const sortByRank = (
    a: { cutoff: CollegeCutoff },
    b: { cutoff: CollegeCutoff }
  ) => (a.cutoff.rank ?? Number.MAX_SAFE_INTEGER) - (b.cutoff.rank ?? Number.MAX_SAFE_INTEGER);

  likely.sort(sortByRank);
  possible.sort(sortByRank);
  reach.sort(sortByRank);

  return { likely, possible, reach, withCutoffData };
}

export function validateCollegePredictorInput(
  raw: CollegePredictorFormInput
): { ok: true; input: CollegePredictorFormInput } | { ok: false; message: string } {
  const air = Math.round(Number(raw.air));
  if (!Number.isFinite(air) || air < AIR_MIN || air > AIR_MAX) {
    return {
      ok: false,
      message: `Enter an AIR between ${AIR_MIN.toLocaleString("en-IN")} and ${AIR_MAX.toLocaleString("en-IN")}.`,
    };
  }
  if (!raw.stateSlug?.trim()) {
    return { ok: false, message: "Select your domicile state." };
  }
  if (!raw.category) {
    return { ok: false, message: "Select your category." };
  }
  return {
    ok: true,
    input: {
      air,
      category: raw.category,
      stateSlug: raw.stateSlug.trim(),
    },
  };
}

function toCounts(
  likely: { record: CollegeRecord }[],
  possible: { record: CollegeRecord }[],
  reach: { record: CollegeRecord }[],
  withCutoffData: number
): CollegePredictorBucketCounts {
  return {
    likely: likely.length,
    possible: possible.length,
    reach: reach.length,
    withCutoffData,
  };
}

export async function computeTeaserResult(
  input: CollegePredictorFormInput
): Promise<CollegePredictorTeaserResult> {
  const all = await getAllColleges();
  const { likely, possible, reach, withCutoffData } = bucketColleges(
    all,
    input.air,
    input
  );

  return {
    referenceYear: REFERENCE_CUTOFF_YEAR,
    disclaimer: COLLEGE_PREDICTOR_DISCLAIMER,
    input,
    counts: toCounts(likely, possible, reach, withCutoffData),
  };
}

export async function computeUnlockedResult(
  input: CollegePredictorFormInput
): Promise<CollegePredictorUnlockedResult> {
  const teaser = await computeTeaserResult(input);
  const all = await getAllColleges();
  const { likely, possible, reach } = bucketColleges(all, input.air, input);

  const mapSummaries = (items: { record: CollegeRecord; pool: "state" | "aiq" }[]) =>
    items.map(({ record, pool }) => {
      const summary = toCollegeSummary(record, { category: input.category });
      summary.predictorPool = pool;
      return summary;
    });

  return {
    ...teaser,
    likely: mapSummaries(likely),
    possible: mapSummaries(possible),
    reach: mapSummaries(reach),
  };
}

export function sessionsMatch(
  a: CollegePredictorFormInput,
  b: CollegePredictorFormInput
): boolean {
  return (
    a.air === b.air &&
    a.category === b.category &&
    a.stateSlug === b.stateSlug
  );
}

