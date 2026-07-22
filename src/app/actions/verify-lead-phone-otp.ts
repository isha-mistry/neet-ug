"use server";

import { verifyTurnstileToken } from "@/lib/captcha/verify";
import { verifyPhoneLoginOtp } from "@/lib/otp/phone-otp-session";
import { assertPhoneVerifiedSession } from "@/lib/otp/phone-verified-session";
import { reportAppError } from "@/lib/sentry/error-reporter";

export type VerifyLeadPhoneOtpResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Verifies OTP (or a trusted 30-min session) for marketing lead forms.
 * Sets the httpOnly verified-phone cookie used by createLead.
 */
export async function verifyLeadPhoneOtpAction(payload: {
  phone: string;
  countryCode?: string;
  otp: string;
  captchaToken?: string;
  /** Skip OTP when the number is in the 30-minute verified session. */
  trustedSession?: boolean;
}): Promise<VerifyLeadPhoneOtpResult> {
  try {
    const captchaCheck = await verifyTurnstileToken(payload.captchaToken);
    if (!captchaCheck.ok) {
      return { success: false, error: captchaCheck.error };
    }

    const phone = payload.phone.replace(/\D/g, "");
    const countryCode = payload.countryCode?.trim() || "+91";

    if (phone.length !== 10) {
      return { success: false, error: "Enter a valid 10-digit mobile number." };
    }

    const result = payload.trustedSession
      ? await assertPhoneVerifiedSession({ phone, countryCode })
      : await verifyPhoneLoginOtp({
          phone,
          countryCode,
          otp: payload.otp,
        });

    if (!result.ok) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    reportAppError(error, {
      module: "lead",
      feature: "phone_otp",
      action: "verifyLeadPhoneOtpAction",
      serverAction: "verifyLeadPhoneOtpAction",
    });
    return {
      success: false,
      error: "Could not verify OTP. Please try again.",
    };
  }
}
