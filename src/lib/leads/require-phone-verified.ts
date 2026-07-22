import "server-only";

import { assertPhoneVerifiedSession } from "@/lib/otp/phone-verified-session";

/**
 * When a lead includes a mobile number, require OTP-verified session before DB write.
 * Returns null when verification is OK (or no phone to verify).
 */
export async function requirePhoneVerifiedForLead(input: {
  phone?: string | null;
  countryCode?: string | null;
}): Promise<string | null> {
  const phone = input.phone?.replace(/\D/g, "") ?? "";
  if (phone.length < 10) return null;

  const check = await assertPhoneVerifiedSession({
    phone,
    countryCode: input.countryCode?.trim() || "+91",
  });

  if (!check.ok) {
    return check.error;
  }

  return null;
}
