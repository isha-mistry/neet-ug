"use client";

import { useCallback, useEffect, useState } from "react";
import { sendPhoneLoginOtpAction } from "@/app/actions/send-phone-otp";
import { verifyLeadPhoneOtpAction } from "@/app/actions/verify-lead-phone-otp";
import {
  shouldTrustPhoneSessionLocally,
} from "@/components/features/predictors/predictor-phone-verify";
import { writePhoneVerifiedClientSession } from "@/lib/leads/phone-verified-client";

type UseLeadPhoneOtpArgs = {
  phone: string;
  countryCode: string;
  captchaToken?: string;
  setError: (message: string | null) => void;
};

export function useLeadPhoneOtp({
  phone,
  countryCode,
  captchaToken,
  setError,
}: UseLeadPhoneOtpArgs) {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);

  const digits = phone.replace(/\D/g, "");

  useEffect(() => {
    const trusted = shouldTrustPhoneSessionLocally(digits, countryCode);
    if (trusted && digits.length === 10) {
      setPhoneVerified(true);
      setOtpSent(true);
      return;
    }
    setPhoneVerified(false);
    setOtpSent(false);
    setOtp("");
  }, [digits, countryCode]);

  const resetPhoneOtp = useCallback(() => {
    setOtp("");
    setOtpSent(false);
    setPhoneVerified(false);
    setOtpSending(false);
    setOtpVerifying(false);
  }, []);

  const sendOtp = useCallback(async () => {
    setError(null);
    if (digits.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setOtpSending(true);
    try {
      const result = await sendPhoneLoginOtpAction({
        phone: digits,
        countryCode,
        captchaToken,
      });
      if (!result.success) {
        setError(result.error);
        setOtpSent(false);
        setPhoneVerified(false);
        return;
      }

      setOtpSent(true);
      if (result.alreadyVerified) {
        writePhoneVerifiedClientSession(digits, countryCode);
        setPhoneVerified(true);
        setOtp("");
      }
    } finally {
      setOtpSending(false);
    }
  }, [captchaToken, countryCode, digits, setError]);

  const verifyOtp = useCallback(async (): Promise<boolean> => {
    setError(null);
    if (digits.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return false;
    }

    const trusted = phoneVerified || shouldTrustPhoneSessionLocally(digits, countryCode);
    if (!trusted && !otp.trim()) {
      setError("Enter the OTP sent to your mobile.");
      return false;
    }
    if (!otpSent && !trusted) {
      setError("Send the OTP to your mobile first.");
      return false;
    }

    setOtpVerifying(true);
    try {
      const result = await verifyLeadPhoneOtpAction({
        phone: digits,
        countryCode,
        otp: trusted ? "" : otp,
        captchaToken,
        trustedSession: trusted || undefined,
      });

      if (!result.success) {
        setError(result.error);
        if (trusted) {
          setPhoneVerified(false);
          setOtpSent(false);
        }
        return false;
      }

      writePhoneVerifiedClientSession(digits, countryCode);
      setPhoneVerified(true);
      setError(null);
      return true;
    } finally {
      setOtpVerifying(false);
    }
  }, [
    captchaToken,
    countryCode,
    digits,
    otp,
    otpSent,
    phoneVerified,
    setError,
  ]);

  /** Ensures the phone is verified before lead submit. */
  const ensureVerified = useCallback(async (): Promise<boolean> => {
    if (phoneVerified) return true;
    if (shouldTrustPhoneSessionLocally(digits, countryCode)) {
      return verifyOtp();
    }
    if (!otpSent) {
      setError("Verify your mobile number with OTP before submitting.");
      return false;
    }
    return verifyOtp();
  }, [countryCode, digits, otpSent, phoneVerified, setError, verifyOtp]);

  return {
    otp,
    setOtp,
    otpSent,
    phoneVerified,
    otpSending,
    otpVerifying,
    sendOtp,
    verifyOtp,
    ensureVerified,
    resetPhoneOtp,
  };
}
