import { cookies } from "next/headers";
import type {
  RankPredictorPhoneVerifiedSession,
  RankPredictorSession,
  RankPredictorStoredSession,
} from "./types";
import {
  isFullRankPredictorSession,
  isPhoneVerifiedRankPredictorSession,
} from "./types";
import {
  RANK_PREDICTOR_SESSION_COOKIE,
  RANK_PREDICTOR_SESSION_MAX_AGE_SEC,
} from "./constants";

function parseStoredSession(raw: string): RankPredictorStoredSession | null {
  try {
    const parsed = JSON.parse(raw) as RankPredictorStoredSession;
    if (!parsed.score || !parsed.stateSlug || !parsed.category) {
      return null;
    }
    if (isFullRankPredictorSession(parsed)) {
      if (
        !parsed.leadName?.trim() ||
        !parsed.leadCity?.trim() ||
        !parsed.leadStateSlug?.trim() ||
        !parsed.phone
      ) {
        return null;
      }
      return parsed;
    }
    if (isPhoneVerifiedRankPredictorSession(parsed)) {
      if (!parsed.phone) return null;
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getRankPredictorStoredSession(): Promise<RankPredictorStoredSession | null> {
  const jar = await cookies();
  const raw = jar.get(RANK_PREDICTOR_SESSION_COOKIE)?.value;
  if (!raw) return null;
  return parseStoredSession(raw);
}

export async function getRankPredictorSession(): Promise<RankPredictorSession | null> {
  const stored = await getRankPredictorStoredSession();
  if (!stored || !isFullRankPredictorSession(stored)) return null;
  return stored;
}

export async function getRankPredictorPhoneVerifiedSession(): Promise<RankPredictorPhoneVerifiedSession | null> {
  const stored = await getRankPredictorStoredSession();
  if (!stored || !isPhoneVerifiedRankPredictorSession(stored)) return null;
  return stored;
}

export async function setRankPredictorSession(
  session: RankPredictorStoredSession
): Promise<void> {
  const jar = await cookies();
  jar.set(RANK_PREDICTOR_SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: RANK_PREDICTOR_SESSION_MAX_AGE_SEC,
  });
}

export async function clearRankPredictorSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(RANK_PREDICTOR_SESSION_COOKIE);
}
