"use client";

import { LEAD_CONSENT_ERROR } from "@/lib/leads/consent";
import {
  clientPhoneMatchesVerifiedSession,
  writePhoneVerifiedClientSession,
} from "@/lib/leads/phone-verified-client";

type ApplyPhoneVerificationArgs = {
  phone: string;
  countryCode: string;
  consent: boolean;
  trustedSession: boolean;
  otp: string;
  setError: (message: string | null) => void;
  setPhoneSessionTrusted: (value: boolean) => void;
  setOtpSent: (value: boolean) => void;
  verify: (payload: {
    otp: string;
    phone: string;
    countryCode: string;
    consent: boolean;
    trustedSession?: boolean;
  }) => Promise<{ success: boolean; error?: string }>;
  onVerified: () => void;
};

export async function applyPredictorPhoneVerification({
  phone,
  countryCode,
  consent,
  trustedSession,
  otp,
  setError,
  setPhoneSessionTrusted,
  setOtpSent,
  verify,
  onVerified,
}: ApplyPhoneVerificationArgs): Promise<void> {
  if (!consent) {
    setError(LEAD_CONSENT_ERROR);
    return;
  }

  const normalizedPhone = phone.replace(/\D/g, "");
  const result = await verify({
    otp: trustedSession ? "" : otp,
    phone: normalizedPhone,
    countryCode,
    consent,
    trustedSession: trustedSession || undefined,
  });

  if (!result.success) {
    setError(result.error ?? "Verification failed.");
    if (trustedSession) {
      setPhoneSessionTrusted(false);
      setOtpSent(false);
    }
    return;
  }

  writePhoneVerifiedClientSession(normalizedPhone, countryCode);
  setError(null);
  onVerified();
}

export function shouldTrustPhoneSessionLocally(
  phone: string,
  countryCode: string
): boolean {
  return clientPhoneMatchesVerifiedSession(phone, countryCode);
}
