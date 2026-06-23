import "server-only";
import { findStateBySlug } from "@/lib/data/states";
import type { RankRangeDto } from "./types";
import {
  RANK_PREDICT_AIR_URL,
  RANK_PREDICT_AIR_WIDE_URL,
  RANK_PREDICT_STATE_RANK_URL,
} from "./constants";

/** Shared rank-band shape from NEET Rank Predictor API v3. */
interface RankBandResponse {
  neet_score: number;
  lower_rank: number;
  upper_rank: number;
}

interface AirRankBandResponse extends RankBandResponse {
  predicted_air_rank: number;
}

interface StateRankBandResponse extends RankBandResponse {
  state: string;
  predicted_state_rank: number;
}

/** Must match FastAPI `state_models` keys (after lowercasing request `state`). */
const STATE_MERIT_API_STATES = new Set([
  "gujarat",
  "madhya pradesh",
  "rajasthan",
]);

function requireEnvUrl(value: string | undefined, name: string): string {
  const trimmed = value?.trim();
  if (!trimmed) {
    throw new Error(`${name} is not configured.`);
  }
  return trimmed;
}

function toRankRange(lower: number, upper: number): RankRangeDto {
  return { min: lower, max: upper };
}

function bandFromResponse(data: RankBandResponse): RankRangeDto {
  return toRankRange(data.lower_rank, data.upper_rank);
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
  const data = await postPredictJson<AirRankBandResponse>(url, { score });
  return bandFromResponse(data);
}

export async function fetchAirRange(score: number): Promise<RankRangeDto> {
  const url = requireEnvUrl(RANK_PREDICT_AIR_URL, "RANK_PREDICT_AIR_URL");
  const data = await postPredictJson<AirRankBandResponse>(url, { score });
  return bandFromResponse(data);
}

export async function fetchStateMeritRange(
  score: number,
  stateSlug: string
): Promise<RankRangeDto | null> {
  const url = requireEnvUrl(RANK_PREDICT_STATE_RANK_URL, "RANK_PREDICT_STATE_RANK_URL");
  const state = await findStateBySlug(stateSlug);
  if (!state) {
    throw new Error("Select a valid domicile state.");
  }

  const stateKey = state.name.toLowerCase().trim();
  if (!STATE_MERIT_API_STATES.has(stateKey)) {
    return null;
  }

  const data = await postPredictJson<StateRankBandResponse>(url, {
    score,
    state: state.name,
  });

  return bandFromResponse(data);
}
