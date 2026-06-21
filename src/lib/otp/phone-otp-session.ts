import "server-only";

import { createHash, randomInt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import {
  PHONE_OTP_COOKIE,
  PHONE_OTP_RESEND_COOLDOWN_SEC,
  PHONE_OTP_TTL_SEC,
} from "@/lib/otp/constants";
import { phoneMatchesVerifiedSession, setPhoneVerifiedSession } from "@/lib/otp/phone-verified-session";
import { sendFast2SmsLoginOtp } from "@/lib/sms/fast2sms-send-login-otp";

export { PHONE_OTP_COOKIE, PHONE_OTP_RESEND_COOLDOWN_SEC, PHONE_OTP_TTL_SEC } from "@/lib/otp/constants";

type StoredPhoneOtp = {
  phone: string;
  countryCode: string;
  hash: string;
  exp: number;
  lastSentAt: number;
};

import { normalizeIndianMobile } from "@/lib/otp/normalize-phone";

export { normalizeIndianMobile } from "@/lib/otp/normalize-phone";

function otpPepper(): string {
  return (
    process.env.PHONE_OTP_SECRET?.trim() ||
    process.env.FAST2SMS_API_KEY?.trim() ||
    "dev-insecure-otp-pepper"
  );
}

function hashOtp(otp: string, phone: string): string {
  return createHash("sha256")
    .update(`${otp}:${phone}:${otpPepper()}`)
    .digest("hex");
}

function generateOtpCode(): string {
  return String(randomInt(100_000, 1_000_000));
}

function parseStored(raw: string): StoredPhoneOtp | null {
  try {
    const parsed = JSON.parse(raw) as StoredPhoneOtp;
    if (
      !parsed.phone ||
      !parsed.countryCode ||
      !parsed.hash ||
      typeof parsed.exp !== "number" ||
      typeof parsed.lastSentAt !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function readStored(): Promise<StoredPhoneOtp | null> {
  const jar = await cookies();
  const raw = jar.get(PHONE_OTP_COOKIE)?.value;
  if (!raw) return null;
  return parseStored(raw);
}

async function writeStored(record: StoredPhoneOtp): Promise<void> {
  const jar = await cookies();
  jar.set(PHONE_OTP_COOKIE, JSON.stringify(record), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PHONE_OTP_TTL_SEC,
  });
}

export async function clearPhoneOtpSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(PHONE_OTP_COOKIE);
}

export async function sendPhoneLoginOtp(payload: {
  phone: string;
  countryCode?: string;
}): Promise<
  { ok: true; alreadyVerified: boolean } | { ok: false; error: string }
> {
  const phone = normalizeIndianMobile(payload.phone);
  const countryCode = payload.countryCode?.trim() || "+91";

  if (countryCode !== "+91") {
    return {
      ok: false,
      error: "SMS OTP is available for Indian (+91) mobile numbers only.",
    };
  }
  if (phone.length !== 10) {
    return { ok: false, error: "Enter a valid 10-digit mobile number." };
  }

  if (await phoneMatchesVerifiedSession(phone, countryCode)) {
    return { ok: true, alreadyVerified: true };
  }

  const now = Date.now();
  const existing = await readStored();
  if (
    existing &&
    existing.phone === phone &&
    existing.countryCode === countryCode &&
    now - existing.lastSentAt < PHONE_OTP_RESEND_COOLDOWN_SEC * 1000
  ) {
    const waitSec = Math.ceil(
      (PHONE_OTP_RESEND_COOLDOWN_SEC * 1000 - (now - existing.lastSentAt)) / 1000
    );
    return {
      ok: false,
      error: `Please wait ${waitSec}s before requesting another OTP.`,
    };
  }

  const otp = generateOtpCode();
  const sent = await sendFast2SmsLoginOtp(phone, otp);
  if (!sent.ok) {
    return sent;
  }

  await writeStored({
    phone,
    countryCode,
    hash: hashOtp(otp, phone),
    exp: now + PHONE_OTP_TTL_SEC * 1000,
    lastSentAt: now,
  });

  return { ok: true, alreadyVerified: false };
}

export async function verifyPhoneLoginOtp(payload: {
  phone: string;
  countryCode?: string;
  otp: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const phone = normalizeIndianMobile(payload.phone);
  const countryCode = payload.countryCode?.trim() || "+91";
  const otp = payload.otp.trim();

  if (otp.length < 4 || otp.length > 8) {
    return { ok: false, error: "Enter the OTP sent to your mobile." };
  }

  const stored = await readStored();
  if (!stored) {
    return { ok: false, error: "OTP expired or not sent. Request a new code." };
  }
  if (Date.now() > stored.exp) {
    await clearPhoneOtpSession();
    return { ok: false, error: "OTP expired. Request a new code." };
  }
  if (stored.phone !== phone || stored.countryCode !== countryCode) {
    return { ok: false, error: "Mobile number does not match the OTP request." };
  }

  const expected = Buffer.from(stored.hash, "hex");
  const actual = Buffer.from(hashOtp(otp, phone), "hex");
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return { ok: false, error: "Invalid verification code." };
  }

  await clearPhoneOtpSession();
  await setPhoneVerifiedSession(phone, countryCode);
  return { ok: true };
}
