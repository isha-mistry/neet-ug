import "server-only";
import { findStateBySlug } from "@/lib/data/states";
import type { RankRangeDto } from "./types";
import {
  RANK_PREDICT_AIR_WIDE_URL,
  RANK_PREDICT_STATE_RANK_URL,
} from "./constants";

interface ApiRange {
  lower: number;
  upper: number;
}

interface AirWideResponse {
  neet_score: number;
  air_wide_range: ApiRange;
}

interface StateRankResponse {
  neet_score: number;
  state: string;
  expected_air: number;
  air_range: ApiRange;
  state_merit_rank: number;
  state_merit_range: ApiRange;
}

function requireEnvUrl(value: string | undefined, name: string): string {
  const trimmed = value?.trim();
  if (!trimmed) {
    throw new Error(`${name} is not configured.`);
  }
  return trimmed;
}

function toRankRange(range: ApiRange): RankRangeDto {
  return { min: range.lower, max: range.upper };
}

async function postPredictJson<T>(url: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Prediction service error (${response.status})${detail ? `: ${detail.slice(0, 240)}` : "."}`
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchAirWideRange(score: number): Promise<RankRangeDto> {
  const url = requireEnvUrl(RANK_PREDICT_AIR_WIDE_URL, "RANK_PREDICT_AIR_WIDE_URL");
  const data = await postPredictJson<AirWideResponse>(url, { score });
  return toRankRange(data.air_wide_range);
}

export async function fetchStateRankPrediction(
  score: number,
  stateSlug: string
): Promise<{ airRange: RankRangeDto; stateMeritRange: RankRangeDto }> {
  const url = requireEnvUrl(RANK_PREDICT_STATE_RANK_URL, "RANK_PREDICT_STATE_RANK_URL");
  const state = await findStateBySlug(stateSlug);
  if (!state) {
    throw new Error("Select a valid domicile state.");
  }

  const data = await postPredictJson<StateRankResponse>(url, {
    score,
    state: state.name,
  });

  return {
    airRange: toRankRange(data.air_range),
    stateMeritRange: toRankRange(data.state_merit_range),
  };
}
