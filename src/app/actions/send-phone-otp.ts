"use server";

import { sendPhoneLoginOtp } from "@/lib/otp/phone-otp-session";

export type SendPhoneOtpResult =
  | { success: true; alreadyVerified: boolean }
  | { success: false; error: string };

export async function sendPhoneLoginOtpAction(payload: {
  phone: string;
  countryCode?: string;
}): Promise<SendPhoneOtpResult> {
  const result = await sendPhoneLoginOtp(payload);
  if (!result.ok) {
    return { success: false, error: result.error };
  }
  return { success: true, alreadyVerified: result.alreadyVerified };
}
