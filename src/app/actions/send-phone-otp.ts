"use server";

import { sendPhoneLoginOtp } from "@/lib/otp/phone-otp-session";
import { reportAppError } from "@/lib/sentry/error-reporter";

export type SendPhoneOtpResult =
  | { success: true; alreadyVerified: boolean }
  | { success: false; error: string };

export async function sendPhoneLoginOtpAction(payload: {
  phone: string;
  countryCode?: string;
}): Promise<SendPhoneOtpResult> {
  try {
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
