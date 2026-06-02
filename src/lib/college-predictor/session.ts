import { cookies } from "next/headers";
import type {
  CollegePredictorPhoneVerifiedSession,
  CollegePredictorSession,
  CollegePredictorStoredSession,
} from "./types";
import {
  isFullCollegePredictorSession,
  isPhoneVerifiedCollegePredictorSession,
} from "./types";
import {
  COLLEGE_PREDICTOR_SESSION_COOKIE,
  COLLEGE_PREDICTOR_SESSION_MAX_AGE_SEC,
} from "./constants";

function parseStoredSession(raw: string): CollegePredictorStoredSession | null {
  try {
    const parsed = JSON.parse(raw) as CollegePredictorStoredSession;
    if (
      !Number.isFinite(parsed.air) ||
      !parsed.stateSlug ||
      !parsed.category ||
      !parsed.quota
    ) {
      return null;
    }
    if (isFullCollegePredictorSession(parsed)) {
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
    if (isPhoneVerifiedCollegePredictorSession(parsed)) {
      if (!parsed.phone) return null;
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getCollegePredictorStoredSession(): Promise<CollegePredictorStoredSession | null> {
  const jar = await cookies();
  const raw = jar.get(COLLEGE_PREDICTOR_SESSION_COOKIE)?.value;
  if (!raw) return null;
  return parseStoredSession(raw);
}

export async function getCollegePredictorSession(): Promise<CollegePredictorSession | null> {
  const stored = await getCollegePredictorStoredSession();
  if (!stored || !isFullCollegePredictorSession(stored)) return null;
  return stored;
}

export async function getCollegePredictorPhoneVerifiedSession(): Promise<CollegePredictorPhoneVerifiedSession | null> {
  const stored = await getCollegePredictorStoredSession();
  if (!stored || !isPhoneVerifiedCollegePredictorSession(stored)) return null;
  return stored;
}

export async function setCollegePredictorSession(
  session: CollegePredictorStoredSession
): Promise<void> {
  const jar = await cookies();
  jar.set(COLLEGE_PREDICTOR_SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COLLEGE_PREDICTOR_SESSION_MAX_AGE_SEC,
  });
}
