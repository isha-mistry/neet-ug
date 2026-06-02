import {
  estimateRankFromScore,
  getRankPredictorConfig,
  getCollegesForRankPreview,
} from "@/lib/data/rank-predictor";
import { toCollegeSummary } from "@/lib/colleges/mappers";
import type {
  RankPredictorFormInput,
  RankPredictorTeaserResult,
  RankPredictorUnlockedResult,
} from "./types";
import {
  NEET_SCORE_MAX,
  NEET_SCORE_MIN,
} from "./constants";

const CATEGORY_NOTE =
  "College previews (after verification) use AIQ closing ranks from our dataset. Category-wise cutoffs will apply on the official College Predictor after your NTA rank is published.";

function previewOptions(input: RankPredictorFormInput) {
  return {
    collegeTypes: input.collegeTypes?.length ? input.collegeTypes : undefined,
    maxTotalCourseFee: input.maxTotalCourseFee,
    useBuffer: true as const,
  };
}

export function validateRankPredictorInput(
  raw: RankPredictorFormInput
): { ok: true; input: RankPredictorFormInput } | { ok: false; message: string } {
  const score = Math.round(Number(raw.score));
  if (!Number.isFinite(score) || score < NEET_SCORE_MIN || score > NEET_SCORE_MAX) {
    return { ok: false, message: `Enter a NEET score between ${NEET_SCORE_MIN} and ${NEET_SCORE_MAX}.` };
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
      score,
      category: raw.category,
      stateSlug: raw.stateSlug,
      collegeTypes: raw.collegeTypes?.filter(Boolean),
      maxTotalCourseFee: raw.maxTotalCourseFee,
    },
  };
}

export function computeTeaserResult(
  input: RankPredictorFormInput
): RankPredictorTeaserResult {
  const config = getRankPredictorConfig();
  const estimate = estimateRankFromScore(input.score);

  return {
    referenceYear: estimate.referenceYear,
    disclaimer: config.disclaimer,
    input,
    coarse: estimate.coarse,
    teaserColleges: [],
    categoryNote: CATEGORY_NOTE,
  };
}

export async function computeUnlockedResult(
  input: RankPredictorFormInput
): Promise<RankPredictorUnlockedResult> {
  const teaser = computeTeaserResult(input);
  const config = getRankPredictorConfig();
  const estimate = estimateRankFromScore(input.score);
  const limit = config.previewLimits.verifiedPreviewCount;
  const preview = await getCollegesForRankPreview(
    estimate.tight.min,
    estimate.tight.max,
    { ...previewOptions(input), limit }
  );

  return {
    ...teaser,
    tight: estimate.tight,
    previewColleges: preview.colleges.map((c) => toCollegeSummary(c)),
  };
}

export function sessionsMatch(
  a: RankPredictorFormInput,
  b: RankPredictorFormInput
): boolean {
  return (
    a.score === b.score &&
    a.category === b.category &&
    a.stateSlug === b.stateSlug &&
    (a.maxTotalCourseFee ?? 0) === (b.maxTotalCourseFee ?? 0) &&
    JSON.stringify(a.collegeTypes ?? []) === JSON.stringify(b.collegeTypes ?? [])
  );
}
