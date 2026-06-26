"use server";

import { sendPhoneLoginOtp } from "@/lib/otp/phone-otp-session";
import { reportAppError } from "@/lib/sentry/error-reporter";
import { verifyTurnstileToken } from "@/lib/captcha/verify";

export type SendPhoneOtpResult =
  | { success: true; alreadyVerified: boolean }
  | { success: false; error: string };

export async function sendPhoneLoginOtpAction(payload: {
  phone: string;
  countryCode?: string;
  captchaToken?: string;
}): Promise<SendPhoneOtpResult> {
  try {
    const captchaCheck = await verifyTurnstileToken(payload.captchaToken);
    if (!captchaCheck.ok) {
      return { success: false, error: captchaCheck.error };
    }

    const result = await sendPhoneLoginOtp(payload);
    if (!result.ok) {
      return { success: false, error: result.error };
    }
    return { success: true, alreadyVerified: result.alreadyVerified };
  } catch (error) {
    reportAppError(error, {
      module: "auth",
      feature: "otp_login",
      action: "sendPhoneLoginOtpAction",
      serverAction: "sendPhoneLoginOtpAction",
    });
    return { success: false, error: "Could not send verification OTP. Please try again later." };
  }
}
