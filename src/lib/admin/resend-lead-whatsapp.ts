import "server-only";

import { LeadNotificationStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { deliverLeadNotification } from "@/lib/notifications/notification-service";
import type { LeadForNotification } from "@/lib/notifications/types";

export type ResendLeadWhatsAppResult =
  | { ok: true; status: LeadNotificationStatus }
  | { ok: false; error: string; status: number };

/**
 * Re-runs the form-type WhatsApp template for a lead on demand, so a failed or
 * skipped send can be retried from the admin panel without a background worker.
 */
export async function resendLeadWhatsApp(
  leadId: string,
): Promise<ResendLeadWhatsAppResult> {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { ok: false, error: "Lead not found", status: 404 };

  const phoneE164 = lead.phoneE164?.trim();
  if (!phoneE164) {
    return {
      ok: false,
      error: "Lead has no WhatsApp number on file.",
      status: 400,
    };
  }

  const leadForNotify: LeadForNotification = {
    id: lead.id,
    formType: lead.formType,
    phoneE164,
    name: lead.name,
    pageLabel: lead.pageLabel,
    pagePath: lead.pagePath,
    variant: lead.variant,
    neetScore: lead.neetScore,
    neetCategory: lead.neetCategory,
    domicileState: lead.domicileState,
    targetStates: lead.targetStates,
    city: lead.city,
    queryType: lead.queryType,
    message: lead.message,
    preferredSlot: lead.preferredSlot,
  };

  const delivery = await deliverLeadNotification(prisma, leadForNotify);

  await prisma.lead.update({
    where: { id: lead.id },
    data: { notificationStatus: delivery.finalStatus },
  });

  if (delivery.finalStatus !== LeadNotificationStatus.SENT) {
    const reason =
      (delivery.whatsappAttempt?.ok === false
        ? delivery.whatsappAttempt.error
        : null) ?? "WhatsApp send failed";
    return { ok: false, error: reason, status: 502 };
  }

  return { ok: true, status: delivery.finalStatus };
}
