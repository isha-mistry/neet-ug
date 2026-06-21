"use client";

import { PHONE_VERIFIED_TTL_SEC } from "@/lib/otp/constants";

const STORAGE_KEY = "dravio_phone_verified_session";

export type PhoneVerifiedClientRecord = {
  phone: string;
  countryCode: string;
  verifiedAt: number;
  exp: number;
};

function normalizePhone(digits: string): string {
  return digits.replace(/\D/g, "");
}

export function readPhoneVerifiedClientSession(): PhoneVerifiedClientRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PhoneVerifiedClientRecord;
    if (!parsed.phone || !parsed.countryCode || typeof parsed.exp !== "number") {
      return null;
    }
    if (Date.now() > parsed.exp) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writePhoneVerifiedClientSession(
  phone: string,
  countryCode: string
): void {
  if (typeof window === "undefined") return;
  const now = Date.now();
  const record: PhoneVerifiedClientRecord = {
    phone: normalizePhone(phone),
    countryCode: countryCode.trim() || "+91",
    verifiedAt: now,
    exp: now + PHONE_VERIFIED_TTL_SEC * 1000,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

export function clearPhoneVerifiedClientSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function clientPhoneMatchesVerifiedSession(
  phone: string,
  countryCode: string
): boolean {
  const stored = readPhoneVerifiedClientSession();
  if (!stored) return false;
  return (
    stored.phone === normalizePhone(phone) &&
    stored.countryCode === (countryCode.trim() || "+91")
  );
}
