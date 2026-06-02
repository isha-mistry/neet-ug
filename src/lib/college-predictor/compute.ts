import { getAllColleges } from "@/lib/data/colleges";
import { pickDisplayCutoff } from "@/lib/colleges/cutoff-context";
import { toCollegeSummary } from "@/lib/colleges/mappers";
import type { CollegeRecord } from "@/types/college";
import type { ListingQuota } from "@/types/filters";
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

function filterContext(input: CollegePredictorFormInput) {
  return { quota: input.quota, category: input.category };
}

function bucketColleges(
  colleges: CollegeRecord[],
  userAir: number,
  input: CollegePredictorFormInput
) {
  const ctx = filterContext(input);
  const likely: CollegeRecord[] = [];
  const possible: CollegeRecord[] = [];
  const reach: CollegeRecord[] = [];
  let withCutoffData = 0;

  for (const college of colleges) {
    const cutoff = pickDisplayCutoff(college, ctx);
    if (!cutoff?.rank || cutoff.year < REFERENCE_CUTOFF_YEAR - 1) continue;
    withCutoffData += 1;
    const bucket = classifyChance(userAir, cutoff.rank);
    if (bucket === "likely") likely.push(college);
    else if (bucket === "possible") possible.push(college);
    else if (bucket === "reach") reach.push(college);
  }

  const sortByRank = (a: CollegeRecord, b: CollegeRecord) => {
    const ra = pickDisplayCutoff(a, ctx)?.rank ?? Number.MAX_SAFE_INTEGER;
    const rb = pickDisplayCutoff(b, ctx)?.rank ?? Number.MAX_SAFE_INTEGER;
    return ra - rb;
  };

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
  const quotas: ListingQuota[] = ["aiq", "state", "management", "nri"];
  if (!raw.quota || !quotas.includes(raw.quota)) {
    return { ok: false, message: "Select a counseling quota." };
  }
  return {
    ok: true,
    input: {
      air,
      category: raw.category,
      stateSlug: raw.stateSlug.trim(),
      quota: raw.quota,
    },
  };
}

function toCounts(
  likely: CollegeRecord[],
  possible: CollegeRecord[],
  reach: CollegeRecord[],
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
  const ctx = filterContext(input);

  const mapSummaries = (records: CollegeRecord[]) =>
    records.map((r) => toCollegeSummary(r, ctx));

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
    a.stateSlug === b.stateSlug &&
    a.quota === b.quota
  );
}
