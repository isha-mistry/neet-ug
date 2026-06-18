import "server-only";
import { findStateBySlug } from "@/lib/data/states";
import type { RankRangeDto } from "./types";
import {
  RANK_PREDICT_AIR_URL,
  RANK_PREDICT_AIR_WIDE_URL,
  RANK_PREDICT_STATE_RANK_URL,
} from "./constants";

interface AirWideResponse {
  neet_score: number;
  air_wide_lower: number;
  air_wide_upper: number;
  air_wide_range: string;
}

interface AirResponse {
  neet_score: number;
  expected_air: number;
  air_lower: number;
  air_upper: number;
  air_range: string;
}

interface StateRankResponse {
  neet_score: number;
  state: string;
  expected_air: number;
  air_range: string;
  expected_state_merit_rank: number;
  state_merit_range: string;
}

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

function parseFormattedRankRange(formatted: string): RankRangeDto {
  const match = formatted.trim().match(/^([\d,]+)\s*[–\-]\s*([\d,]+)$/);
  if (!match) {
    throw new Error("Invalid rank range from prediction service.");
  }
  const min = Number(match[1].replace(/,/g, ""));
  const max = Number(match[2].replace(/,/g, ""));
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new Error("Invalid rank range from prediction service.");
  }
  return { min, max };
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
  return toRankRange(data.air_wide_lower, data.air_wide_upper);
}

export async function fetchAirRange(score: number): Promise<RankRangeDto> {
  const url = requireEnvUrl(RANK_PREDICT_AIR_URL, "RANK_PREDICT_AIR_URL");
  const data = await postPredictJson<AirResponse>(url, { score });
  return toRankRange(data.air_lower, data.air_upper);
}

export async function fetchStateMeritRange(
  score: number,
  stateSlug: string
): Promise<RankRangeDto> {
  const url = requireEnvUrl(RANK_PREDICT_STATE_RANK_URL, "RANK_PREDICT_STATE_RANK_URL");
  const state = await findStateBySlug(stateSlug);
  if (!state) {
    throw new Error("Select a valid domicile state.");
  }

  const data = await postPredictJson<StateRankResponse>(url, {
    score,
    state: state.name,
  });

  return parseFormattedRankRange(data.state_merit_range);
}
