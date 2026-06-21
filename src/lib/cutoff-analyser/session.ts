import { cookies } from "next/headers";
import {
  CUTOFF_ANALYSER_SESSION_COOKIE,
  CUTOFF_ANALYSER_SESSION_MAX_AGE_SEC,
} from "./constants";
import type {
  CutoffAnalyserPhoneVerifiedSession,
  CutoffAnalyserSession,
  CutoffAnalyserStoredSession,
} from "./types";
import {
  isFullCutoffAnalyserSession,
  isPhoneVerifiedCutoffAnalyserSession,
} from "./types";

function parseStoredSession(raw: string): CutoffAnalyserStoredSession | null {
  try {
    const parsed = JSON.parse(raw) as CutoffAnalyserStoredSession;
    if (
      !Number.isFinite(parsed.score) ||
      !parsed.category ||
      !parsed.domicileState ||
      !parsed.quota
    ) {
      return null;
    }
    if (isFullCutoffAnalyserSession(parsed)) {
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
    if (isPhoneVerifiedCutoffAnalyserSession(parsed)) {
      if (!parsed.phone) return null;
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getCutoffAnalyserStoredSession(): Promise<CutoffAnalyserStoredSession | null> {
  const jar = await cookies();
  const raw = jar.get(CUTOFF_ANALYSER_SESSION_COOKIE)?.value;
  if (!raw) return null;
  return parseStoredSession(raw);
}

export async function getCutoffAnalyserSession(): Promise<CutoffAnalyserSession | null> {
  const stored = await getCutoffAnalyserStoredSession();
  if (!stored || !isFullCutoffAnalyserSession(stored)) return null;
  return stored;
}

export async function getCutoffAnalyserPhoneVerifiedSession(): Promise<CutoffAnalyserPhoneVerifiedSession | null> {
  const stored = await getCutoffAnalyserStoredSession();
  if (!stored || !isPhoneVerifiedCutoffAnalyserSession(stored)) return null;
  return stored;
}

export async function setCutoffAnalyserSession(
  session: CutoffAnalyserStoredSession,
): Promise<void> {
  const jar = await cookies();
  jar.set(CUTOFF_ANALYSER_SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CUTOFF_ANALYSER_SESSION_MAX_AGE_SEC,
  });
}
