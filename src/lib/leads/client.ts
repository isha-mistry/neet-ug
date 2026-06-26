"use client";

import { submitLeadAction } from "@/app/actions/submit-lead";
import type { SubmitLeadInput } from "@/lib/leads/types";
import { openCounselWhatsApp } from "@/lib/leads/whatsapp";
import { reportAppError } from "@/lib/sentry/error-reporter";

/** Persists the lead, then opens WhatsApp. Returns an error message on failure. */
export async function persistLeadThenWhatsApp(
  input: SubmitLeadInput,
  whatsappLines: string[],
): Promise<string | null> {
  try {
    const saved = await submitLeadAction(input);
    if (!saved.success) {
      return saved.error;
    }
    openCounselWhatsApp(whatsappLines);
    return null;
  } catch (error) {
    reportAppError(error, {
      module: "lead",
      feature: "client_submission",
      action: "persistLeadThenWhatsApp",
      route: typeof window !== "undefined" ? window.location.pathname : undefined,
      metadata: { formType: input.formType },
    });
    return "Could not process your request. Please check your network and try again.";
  }
}
