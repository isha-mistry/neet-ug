"use server";

import { createLead } from "@/lib/leads/create-lead";
import type { SubmitLeadInput, SubmitLeadResult } from "@/lib/leads/types";

/** Single entry point for all marketing / counselling lead forms. */
export async function submitLeadAction(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  return createLead(input);
}
