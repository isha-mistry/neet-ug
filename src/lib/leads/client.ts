"use client";

import { submitLeadAction } from "@/app/actions/submit-lead";
import type { SubmitLeadInput } from "@/lib/leads/types";
import { openCounselWhatsApp } from "@/lib/leads/whatsapp";

/** Persists the lead, then opens WhatsApp. Returns an error message on failure. */
export async function persistLeadThenWhatsApp(
  input: SubmitLeadInput,
  whatsappLines: string[],
): Promise<string | null> {
  const saved = await submitLeadAction(input);
  if (!saved.success) {
    return saved.error;
  }
  openCounselWhatsApp(whatsappLines);
  return null;
}
