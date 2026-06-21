import "server-only";

import { cookies } from "next/headers";
import {
  PHONE_VERIFIED_COOKIE,
  PHONE_VERIFIED_TTL_SEC,
} from "@/lib/otp/constants";
import { normalizeIndianMobile } from "@/lib/otp/normalize-phone";

export { PHONE_VERIFIED_TTL_SEC } from "@/lib/otp/constants";

type StoredPhoneVerified = {
  phone: string;
  countryCode: string;
  verifiedAt: number;
  exp: number;
};

function parseStored(raw: string): StoredPhoneVerified | null {
  try {
    const parsed = JSON.parse(raw) as StoredPhoneVerified;
    if (
      !parsed.phone ||
      !parsed.countryCode ||
      typeof parsed.verifiedAt !== "number" ||
      typeof parsed.exp !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function readStored(): Promise<StoredPhoneVerified | null> {
  const jar = await cookies();
  const raw = jar.get(PHONE_VERIFIED_COOKIE)?.value;
  if (!raw) return null;
  const parsed = parseStored(raw);
  if (!parsed) return null;
  if (Date.now() > parsed.exp) {
    await clearPhoneVerifiedSession();
    return null;
  }
  return parsed;
}

export async function setPhoneVerifiedSession(
  phone: string,
  countryCode: string
): Promise<void> {
  const normalized = normalizeIndianMobile(phone);
  const code = countryCode.trim() || "+91";
  const now = Date.now();
  const record: StoredPhoneVerified = {
    phone: normalized,
    countryCode: code,
    verifiedAt: now,
    exp: now + PHONE_VERIFIED_TTL_SEC * 1000,
  };
  const jar = await cookies();
  jar.set(PHONE_VERIFIED_COOKIE, JSON.stringify(record), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PHONE_VERIFIED_TTL_SEC,
  });
}

export async function clearPhoneVerifiedSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(PHONE_VERIFIED_COOKIE);
}

export async function phoneMatchesVerifiedSession(
  phone: string,
  countryCode?: string
): Promise<boolean> {
  const normalized = normalizeIndianMobile(phone);
  const code = countryCode?.trim() || "+91";
  const stored = await readStored();
  if (!stored) return false;
  return stored.phone === normalized && stored.countryCode === code;
}

export async function assertPhoneVerifiedSession(payload: {
  phone: string;
  countryCode?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const phone = normalizeIndianMobile(payload.phone);
  const countryCode = payload.countryCode?.trim() || "+91";

  if (phone.length !== 10) {
    return { ok: false, error: "Enter a valid 10-digit mobile number." };
  }

  const matches = await phoneMatchesVerifiedSession(phone, countryCode);
  if (!matches) {
    return {
      ok: false,
      error: "Session expired. Request a new OTP to verify your mobile.",
    };
  }

  await setPhoneVerifiedSession(phone, countryCode);
  return { ok: true };
}
