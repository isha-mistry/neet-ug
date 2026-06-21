import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { isLeadConsentGranted } from "@/lib/leads/consent";
import { validateSubmitLeadInput } from "./validation";
import type { SubmitLeadInput, SubmitLeadResult } from "./types";

export async function createLead(raw: SubmitLeadInput): Promise<SubmitLeadResult> {
  const validated = validateSubmitLeadInput(raw);
  if (!validated.ok) {
    return { success: false, error: validated.error };
  }

  const input = validated.data;
  const consent = isLeadConsentGranted(input.consent);
  const now = consent ? new Date() : null;

  try {
    const lead = await prisma.lead.create({
      data: {
        formType: input.formType,
        pagePath: input.pagePath?.trim() || null,
        pageLabel: input.pageLabel?.trim() || null,
        variant: input.variant?.trim() || null,
        name: input.name ?? null,
        countryCode: input.countryCode ?? "+91",
        phone: input.phone ?? null,
        email: input.email ?? null,
        neetScore: input.neetScore ?? null,
        neetCategory: input.neetCategory ?? null,
        domicileState: input.domicileState ?? null,
        targetStates: input.targetStates ?? null,
        city: input.city ?? null,
        queryType: input.queryType ?? null,
        message: input.message ?? null,
        preferredSlot: input.preferredSlot ?? null,
        topics: input.topics?.length ? input.topics : undefined,
        consent,
        consentAt: now,
        rawPayload: input.rawPayload
          ? (input.rawPayload as Prisma.InputJsonValue)
          : undefined,
      },
      select: { id: true },
    });

    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error("[createLead]", error);
    return { success: false, error: "Could not save your request. Please try again." };
  }
}
