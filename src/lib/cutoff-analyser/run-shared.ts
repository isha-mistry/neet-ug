import {
  FOCUS_STATE_SLUGS,
  NEET_SCORE_MAX,
  NEET_SCORE_MIN,
} from "./constants";
import type {
  CutoffAnalyserFormInput,
  CutoffAnalyserResult,
  CutoffAnalyserStoredSession,
} from "./types";
import type { ListingQuota } from "@/types/filters";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import type { FocusStateSlug } from "./constants";

export function validateCutoffAnalyserInput(
  raw: CutoffAnalyserFormInput,
):
  | { ok: true; input: CutoffAnalyserFormInput }
  | { ok: false; message: string } {
  const score = Math.round(Number(raw.score));
  if (!Number.isFinite(score) || score < NEET_SCORE_MIN || score > NEET_SCORE_MAX) {
    return {
      ok: false,
      message: `Enter a NEET score between ${NEET_SCORE_MIN} and ${NEET_SCORE_MAX}.`,
    };
  }
  if (!raw.category) {
    return { ok: false, message: "Select your category." };
  }
  if (!raw.domicileState || !FOCUS_STATE_SLUGS.includes(raw.domicileState)) {
    return { ok: false, message: "Select your domicile state." };
  }
  const quota = raw.quota as ListingQuota;
  if (!quota) {
    return { ok: false, message: "Select a counseling quota." };
  }
  return {
    ok: true,
    input: {
      score,
      category: raw.category as NeetCategory,
      domicileState: raw.domicileState as FocusStateSlug,
      quota,
    },
  };
}

export function sessionsMatch(
  session: CutoffAnalyserStoredSession,
  input: CutoffAnalyserFormInput,
): boolean {
  return (
    session.score === input.score &&
    session.category === input.category &&
    session.domicileState === input.domicileState &&
    session.quota === input.quota
  );
}

export function applyCollegeTypeFilter(
  result: CutoffAnalyserResult,
  collegeTypeFilter: "government" | "private" | "all",
): CutoffAnalyserResult {
  if (collegeTypeFilter === "all") return result;

  let collegeMatches = result.collegeMatches;
  if (collegeTypeFilter === "government") {
    collegeMatches = collegeMatches.filter(
      (m) =>
        m.college.collegeType === "government" || m.college.collegeType === "aiims",
    );
  } else {
    collegeMatches = collegeMatches.filter(
      (m) =>
        m.college.collegeType === "private" || m.college.collegeType === "deemed",
    );
  }

  const safeCollegeCount = collegeMatches.filter((m) => m.status === "safe").length;

  return {
    ...result,
    collegeMatches,
    safeCollegeCount,
  };
}
