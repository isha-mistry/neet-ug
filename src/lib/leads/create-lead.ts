import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { isLeadConsentGranted } from "@/lib/leads/consent";
import { notifyEmailNewLead } from "@/lib/leads/notify-email-new-lead";
import { notifySlackNewLead } from "@/lib/leads/notify-slack-new-lead";
import { requirePhoneVerifiedForLead } from "@/lib/leads/require-phone-verified";
import { validateSubmitLeadInput } from "./validation";
import type { SubmitLeadInput, SubmitLeadResult } from "./types";
import { reportAppError } from "@/lib/sentry/error-reporter";

export async function createLead(raw: SubmitLeadInput): Promise<SubmitLeadResult> {
  const validated = validateSubmitLeadInput(raw);
  if (!validated.ok) {
    return { success: false, error: validated.error };
  }

  const input = validated.data;
  const phoneGateError = await requirePhoneVerifiedForLead({
    phone: input.phone,
    countryCode: input.countryCode,
  });
  if (phoneGateError) {
    return { success: false, error: phoneGateError };
  }

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
      select: { id: true, createdAt: true },
    });

    const alertPayload = {
      leadId: lead.id,
      formType: input.formType,
      name: input.name,
      email: input.email,
      phone: input.phone,
      countryCode: input.countryCode ?? "+91",
      pagePath: input.pagePath,
      pageLabel: input.pageLabel,
      variant: input.variant,
      createdAt: lead.createdAt,
      neetScore: input.neetScore,
      neetCategory: input.neetCategory,
      domicileState: input.domicileState,
      city: input.city,
      queryType: input.queryType,
      message: input.message,
    };

    // Fire-and-forget: never block or fail the lead response on notify errors
    void notifySlackNewLead(alertPayload);
    void notifyEmailNewLead(alertPayload);

    return { success: true, leadId: lead.id };
  } catch (error) {
    reportAppError(error, {
      module: "lead",
      feature: "lead_persistence",
      action: "create_lead",
      route: input.pagePath?.trim() || "/api/leads/create",
      metadata: { formType: input.formType, variant: input.variant },
    });
    console.error("[createLead]", error);
    return { success: false, error: "Could not save your request. Please try again." };
  }
}
