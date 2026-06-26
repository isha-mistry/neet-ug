"use server";

import { createLead } from "@/lib/leads/create-lead";
import type { SubmitLeadInput, SubmitLeadResult } from "@/lib/leads/types";
import { reportAppError } from "@/lib/sentry/error-reporter";

/** Single entry point for all marketing / counselling lead forms. */
export async function submitLeadAction(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  try {
    return await createLead(input);
  } catch (error) {
    reportAppError(error, {
      module: "lead",
      feature: "server_action",
      action: "submitLeadAction",
      serverAction: "submitLeadAction",
      route: input.pagePath?.trim() || undefined,
      metadata: { formType: input.formType },
    });
    return { success: false, error: "An unexpected error occurred while submitting your inquiry. Please try again." };
  }
}
