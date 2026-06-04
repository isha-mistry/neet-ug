"use server";

import {
  computeTeaserResult,
  computeUnlockedResult,
  sessionsMatch,
  validateCollegePredictorInput,
} from "@/lib/college-predictor/compute";
import { COLLEGE_PREDICTOR_DEMO_OTP } from "@/lib/college-predictor/constants";
import {
  getCollegePredictorPhoneVerifiedSession,
  getCollegePredictorSession,
  getCollegePredictorStoredSession,
  setCollegePredictorSession,
} from "@/lib/college-predictor/session";
import type {
  CollegePredictorFormInput,
  CollegePredictorPhoneVerifiedSession,
  CollegePredictorTeaserResult,
  CollegePredictorUnlockedResult,
} from "@/lib/college-predictor/types";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function submitCollegePredictorAction(
  raw: CollegePredictorFormInput
): Promise<ActionResult<CollegePredictorTeaserResult>> {
  const validated = validateCollegePredictorInput(raw);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }
  return { success: true, data: await computeTeaserResult(validated.input) };
}

export async function verifyCollegePredictorOtpAction(payload: {
  otp: string;
  countryCode?: string;
  phone?: string;
  consent: boolean;
  input: CollegePredictorFormInput;
}): Promise<ActionResult<{ phoneVerified: true }>> {
  const validated = validateCollegePredictorInput(payload.input);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }
  if (!payload.consent) {
    return { success: false, error: "Please accept the terms to continue." };
  }
  const otp = payload.otp.trim();
  if (otp !== COLLEGE_PREDICTOR_DEMO_OTP) {
    return { success: false, error: "Invalid verification code." };
  }
  const phone = payload.phone?.replace(/\D/g, "") ?? "";
  const countryCode = payload.countryCode?.trim() || "+91";
  if (phone.length !== 10) {
    return { success: false, error: "Enter a valid 10-digit mobile number." };
  }

  const session: CollegePredictorPhoneVerifiedSession = {
    verified: false,
    phoneVerified: true,
    phoneVerifiedAt: Date.now(),
    countryCode,
    phone,
    ...validated.input,
  };
  await setCollegePredictorSession(session);
  return { success: true, data: { phoneVerified: true } };
}

export async function completeCollegePredictorProfileAction(payload: {
  input: CollegePredictorFormInput;
  leadName: string;
  leadStateSlug: string;
  leadCity: string;
}): Promise<ActionResult<CollegePredictorUnlockedResult>> {
  const validated = validateCollegePredictorInput(payload.input);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }
  const pending = await getCollegePredictorPhoneVerifiedSession();
  if (!pending || !sessionsMatch(pending, validated.input)) {
    return {
      success: false,
      error: "Verify your mobile number before continuing.",
    };
  }
  const leadName = payload.leadName.trim();
  const leadCity = payload.leadCity.trim();
  const leadStateSlug = payload.leadStateSlug.trim();
  if (leadName.length < 2) {
    return { success: false, error: "Enter your full name." };
  }
  if (!leadStateSlug) {
    return { success: false, error: "Select your state." };
  }
  if (leadCity.length < 2) {
    return { success: false, error: "Enter your city." };
  }

  await setCollegePredictorSession({
    verified: true,
    verifiedAt: Date.now(),
    countryCode: pending.countryCode,
    phone: pending.phone,
    leadName,
    leadStateSlug,
    leadCity,
    ...validated.input,
  });

  return { success: true, data: await computeUnlockedResult(validated.input) };
}

export async function getUnlockedCollegePredictorAction(
  input: CollegePredictorFormInput
): Promise<ActionResult<CollegePredictorUnlockedResult>> {
  const validated = validateCollegePredictorInput(input);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }
  const session = await getCollegePredictorSession();
  if (!session || !sessionsMatch(session, validated.input)) {
    return { success: false, error: "Verification required." };
  }
  return { success: true, data: await computeUnlockedResult(validated.input) };
}

export async function getCollegePredictorSessionAction(): Promise<
  ActionResult<{
    session: Awaited<ReturnType<typeof getCollegePredictorStoredSession>>;
  }>
> {
  const session = await getCollegePredictorStoredSession();
  return { success: true, data: { session } };
}
