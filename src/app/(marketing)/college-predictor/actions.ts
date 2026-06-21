"use server";

import {
  computeTeaserResult,
  computeUnlockedResult,
  sessionsMatch,
  validateCollegePredictorInput,
} from "@/lib/college-predictor/compute";
import { createLead } from "@/lib/leads/create-lead";
import { verifyPhoneLoginOtp } from "@/lib/otp/phone-otp-session";
import { assertPhoneVerifiedSession } from "@/lib/otp/phone-verified-session";
import { LEAD_CONSENT_ERROR } from "@/lib/leads/consent";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
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

  const data = await computeTeaserResult(validated.input);

  const leadSaved = await createLead({
    formType: LEAD_FORM_TYPES.collegePredictor,
    pagePath: "/college-predictor",
    pageLabel: "College predictor — summary only",
    variant: "estimate_only",
    neetScore: validated.input.air,
    neetCategory: validated.input.category,
    domicileState: validated.input.stateSlug,
    consent: false,
    rawPayload: {
      quota: validated.input.quota,
      input: validated.input,
      counts: data.counts,
      referenceYear: data.referenceYear,
    },
  });
  if (!leadSaved.success) {
    console.error("[submitCollegePredictorAction] estimate_only lead", leadSaved.error);
  }

  return { success: true, data };
}

export async function verifyCollegePredictorOtpAction(payload: {
  otp: string;
  countryCode?: string;
  phone?: string;
  consent: boolean;
  input: CollegePredictorFormInput;
  trustedSession?: boolean;
}): Promise<ActionResult<{ phoneVerified: true }>> {
  const validated = validateCollegePredictorInput(payload.input);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }
  if (!payload.consent) {
    return { success: false, error: LEAD_CONSENT_ERROR };
  }
  const phone = payload.phone?.replace(/\D/g, "") ?? "";
  const countryCode = payload.countryCode?.trim() || "+91";
  if (phone.length !== 10) {
    return { success: false, error: "Enter a valid 10-digit mobile number." };
  }

  const otpCheck = payload.trustedSession
    ? await assertPhoneVerifiedSession({ phone, countryCode })
    : await verifyPhoneLoginOtp({
        phone,
        countryCode,
        otp: payload.otp,
      });
  if (!otpCheck.ok) {
    return { success: false, error: otpCheck.error };
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

  const leadSaved = await createLead({
    formType: LEAD_FORM_TYPES.collegePredictor,
    pagePath: "/college-predictor",
    pageLabel: "College predictor",
    variant: "phone_verified",
    countryCode,
    phone,
    neetScore: validated.input.air,
    neetCategory: validated.input.category,
    domicileState: validated.input.stateSlug,
    consent: payload.consent,
    rawPayload: { input: validated.input },
  });
  if (!leadSaved.success) {
    return { success: false, error: leadSaved.error };
  }

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

  await createLead({
    formType: LEAD_FORM_TYPES.collegePredictor,
    pagePath: "/college-predictor",
    pageLabel: "College predictor",
    variant: "profile_complete",
    name: leadName,
    countryCode: pending.countryCode,
    phone: pending.phone,
    neetScore: validated.input.air,
    neetCategory: validated.input.category,
    domicileState: validated.input.stateSlug,
    city: leadCity,
    targetStates: leadStateSlug,
    consent: true,
    rawPayload: { input: validated.input },
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
