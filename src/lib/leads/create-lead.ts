import "server-only";

import { LeadNotificationStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { isLeadConsentGranted } from "@/lib/leads/consent";
import { parsePhoneToE164 } from "@/lib/leads/normalize-phone-e164";
import { notifyEmailNewLead } from "@/lib/leads/notify-email-new-lead";
import { notifySlackNewLead } from "@/lib/leads/notify-slack-new-lead";
import { requirePhoneVerifiedForLead } from "@/lib/leads/require-phone-verified";
import { deliverLeadNotification } from "@/lib/notifications/notification-service";
import type { LeadForNotification } from "@/lib/notifications/types";
import { LEAD_FORM_TYPES } from "./types";
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

  let phoneE164: string | null = null;
  if (input.phone) {
    const parsed = parsePhoneToE164(input.countryCode, input.phone);
    if (!parsed.ok) {
      return { success: false, error: parsed.error };
    }
    phoneE164 = parsed.e164;
  }

  // Playbook WhatsApp is sent inline below. Plan package info is admin-triggered.
  // No separate notifier worker / PENDING queue.
  const shouldSendPlaybookWhatsapp =
    input.formType === LEAD_FORM_TYPES.homePlaybook && Boolean(phoneE164);
  const consentWhatsapp = shouldSendPlaybookWhatsapp;
  const notificationStatus = shouldSendPlaybookWhatsapp
    ? LeadNotificationStatus.IN_PROGRESS
    : LeadNotificationStatus.SKIPPED_NO_CONSENT;

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
        phoneE164,
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
        consentWhatsapp,
        consentWhatsappAt: consentWhatsapp ? new Date() : null,
        notificationStatus,
        rawPayload: input.rawPayload
          ? (input.rawPayload as Prisma.InputJsonValue)
          : undefined,
      },
      select: { id: true, createdAt: true },
    });

    if (shouldSendPlaybookWhatsapp && phoneE164) {
      const leadForNotify: LeadForNotification = {
        id: lead.id,
        formType: input.formType,
        phoneE164,
        name: input.name ?? null,
        pageLabel: input.pageLabel?.trim() || null,
        pagePath: input.pagePath?.trim() || null,
        variant: input.variant?.trim() || null,
        neetScore: input.neetScore ?? null,
        neetCategory: input.neetCategory ?? null,
        domicileState: input.domicileState ?? null,
        targetStates: input.targetStates ?? null,
        city: input.city ?? null,
        queryType: input.queryType ?? null,
        message: input.message ?? null,
        preferredSlot: input.preferredSlot ?? null,
      };

      try {
        const delivery = await deliverLeadNotification(prisma, leadForNotify);
        await prisma.lead.update({
          where: { id: lead.id },
          data: { notificationStatus: delivery.finalStatus },
        });
        // A rejected send resolves normally, so report it here or it stays silent.
        if (delivery.finalStatus !== LeadNotificationStatus.SENT) {
          const reason =
            (delivery.whatsappAttempt?.ok === false
              ? delivery.whatsappAttempt.error
              : null) ?? "unknown error";
          reportAppError(new Error(`Playbook WhatsApp not sent: ${reason}`), {
            module: "notifications",
            feature: "playbook_whatsapp",
            action: "send_inline",
            metadata: { leadId: lead.id, status: delivery.finalStatus },
          });
          console.error("[createLead] playbook WhatsApp not sent", {
            leadId: lead.id,
            status: delivery.finalStatus,
            reason,
          });
        }
      } catch (notifyError) {
        reportAppError(notifyError, {
          module: "notifications",
          feature: "playbook_whatsapp",
          action: "send_inline",
          metadata: { leadId: lead.id },
        });
        console.error("[createLead] playbook WhatsApp failed", notifyError);
        await prisma.lead.update({
          where: { id: lead.id },
          data: { notificationStatus: LeadNotificationStatus.FAILED },
        });
      }
    }

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
