"use server";

import {
  computeTeaserResult,
  computeUnlockedResult,
  sessionsMatch,
  validateCutoffAnalyserInput,
} from "@/lib/cutoff-analyser/run";
import { createLead } from "@/lib/leads/create-lead";
import { verifyPhoneLoginOtp } from "@/lib/otp/phone-otp-session";
import { assertPhoneVerifiedSession } from "@/lib/otp/phone-verified-session";
import { LEAD_CONSENT_ERROR } from "@/lib/leads/consent";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import {
  getCutoffAnalyserPhoneVerifiedSession,
  getCutoffAnalyserSession,
  getCutoffAnalyserStoredSession,
  setCutoffAnalyserSession,
} from "@/lib/cutoff-analyser/session";
import type {
  CutoffAnalyserFormInput,
  CutoffAnalyserPhoneVerifiedSession,
  CutoffAnalyserTeaserResult,
  CutoffAnalyserUnlockedResult,
} from "@/lib/cutoff-analyser/types";
import { verifyTurnstileToken } from "@/lib/captcha/verify";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function predictionErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return "Could not reach the prediction service. Try again in a moment.";
}

export async function submitCutoffAnalyserAction(
  raw: CutoffAnalyserFormInput,
): Promise<ActionResult<CutoffAnalyserTeaserResult>> {
  const captchaCheck = await verifyTurnstileToken(raw.captchaToken);
  if (!captchaCheck.ok) {
    return { success: false, error: captchaCheck.error };
  }

  const validated = validateCutoffAnalyserInput(raw);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }

  try {
    const data = await computeTeaserResult(validated.input);

    const leadSaved = await createLead({
      formType: LEAD_FORM_TYPES.cutoffAnalyser,
      pagePath: "/cutoff-analyser",
      pageLabel: "Cutoff analyser — summary only",
      variant: "estimate_only",
      neetScore: validated.input.score,
      neetCategory: validated.input.category,
      domicileState: validated.input.domicileState,
      consent: false,
      rawPayload: {
        quota: validated.input.quota,
        input: validated.input,
        summary: data.summary,
        referenceYear: data.referenceYear,
      },
    });
    if (!leadSaved.success) {
      console.error("[submitCutoffAnalyserAction] estimate_only lead", leadSaved.error);
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: predictionErrorMessage(error) };
  }
}

export async function verifyCutoffAnalyserOtpAction(payload: {
  otp: string;
  countryCode?: string;
  phone?: string;
  consent: boolean;
  input: CutoffAnalyserFormInput;
  trustedSession?: boolean;
}): Promise<ActionResult<{ phoneVerified: true }>> {
  const captchaCheck = await verifyTurnstileToken(payload.input.captchaToken);
  if (!captchaCheck.ok) {
    return { success: false, error: captchaCheck.error };
  }

  const validated = validateCutoffAnalyserInput(payload.input);
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

  const session: CutoffAnalyserPhoneVerifiedSession = {
    verified: false,
    phoneVerified: true,
    phoneVerifiedAt: Date.now(),
    countryCode,
    phone,
    ...validated.input,
  };
  await setCutoffAnalyserSession(session);

  const leadSaved = await createLead({
    formType: LEAD_FORM_TYPES.cutoffAnalyser,
    pagePath: "/cutoff-analyser",
    pageLabel: "Cutoff analyser",
    variant: "phone_verified",
    countryCode,
    phone,
    neetScore: validated.input.score,
    neetCategory: validated.input.category,
    domicileState: validated.input.domicileState,
    consent: payload.consent,
    rawPayload: { input: validated.input },
  });
  if (!leadSaved.success) {
    return { success: false, error: leadSaved.error };
  }

  return { success: true, data: { phoneVerified: true } };
}

export async function completeCutoffAnalyserProfileAction(payload: {
  input: CutoffAnalyserFormInput;
  leadName: string;
  leadStateSlug: string;
  leadCity: string;
}): Promise<ActionResult<CutoffAnalyserUnlockedResult>> {
  const validated = validateCutoffAnalyserInput(payload.input);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }
  const pending = await getCutoffAnalyserPhoneVerifiedSession();
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

  await setCutoffAnalyserSession({
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
    formType: LEAD_FORM_TYPES.cutoffAnalyser,
    pagePath: "/cutoff-analyser",
    pageLabel: "Cutoff analyser",
    variant: "profile_complete",
    name: leadName,
    countryCode: pending.countryCode,
    phone: pending.phone,
    neetScore: validated.input.score,
    neetCategory: validated.input.category,
    domicileState: validated.input.domicileState,
    city: leadCity,
    targetStates: leadStateSlug,
    consent: true,
    rawPayload: { input: validated.input },
  });

  try {
    return {
      success: true,
      data: await computeUnlockedResult(validated.input),
    };
  } catch (error) {
    return { success: false, error: predictionErrorMessage(error) };
  }
}

export async function getCutoffAnalyserSessionAction(): Promise<
  ActionResult<{
    session: Awaited<ReturnType<typeof getCutoffAnalyserStoredSession>>;
  }>
> {
  const session = await getCutoffAnalyserStoredSession();
  return { success: true, data: { session } };
}

export async function getUnlockedCutoffAnalyserAction(
  input: CutoffAnalyserFormInput,
): Promise<ActionResult<CutoffAnalyserUnlockedResult>> {
  const validated = validateCutoffAnalyserInput(input);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }
  const session = await getCutoffAnalyserSession();
  if (!session || !sessionsMatch(session, validated.input)) {
    return { success: false, error: "Verification required." };
  }
  return { success: true, data: await computeUnlockedResult(validated.input) };
}
