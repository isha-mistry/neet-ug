import "server-only";

import { prisma } from "@/lib/db/prisma";
import { e164ToEvolutionNumber } from "@/lib/leads/normalize-phone-e164";
import {
  createEvolutionWhatsAppSenderFromEnv,
} from "@/lib/notifications/evolution-client";
import { buildPlanInfoWhatsAppMessage } from "@/lib/notifications/plan-info-message";
import {
  NotificationAttemptStatus,
  NotificationChannel,
  Prisma,
} from "@prisma/client";

export type SendPlanInfoResult =
  | { ok: true; providerMsgId?: string }
  | { ok: false; error: string; status?: number };

function mergeRawPayload(
  existing: unknown,
  patch: Record<string, unknown>,
): Prisma.InputJsonValue {
  const base =
    existing && typeof existing === "object" && !Array.isArray(existing)
      ? { ...(existing as Record<string, unknown>) }
      : {};
  return { ...base, ...patch } as Prisma.InputJsonValue;
}

export async function setLeadPlanPurchased(
  leadId: string,
  purchased: boolean,
): Promise<{ ok: true } | { ok: false; error: string; status: number }> {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { ok: false, error: "Lead not found", status: 404 };

  await prisma.lead.update({
    where: { id: leadId },
    data: {
      planPurchasedAt: purchased ? new Date() : null,
      rawPayload: mergeRawPayload(lead.rawPayload, {
        planPurchased: purchased,
        planPurchasedUpdatedAt: new Date().toISOString(),
      }),
    },
  });

  return { ok: true };
}

export async function sendLeadPlanInfo(
  leadId: string,
): Promise<SendPlanInfoResult> {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { ok: false, error: "Lead not found", status: 404 };

  if (!lead.planPurchasedAt) {
    return {
      ok: false,
      error: "Mark the plan as purchased before sending plan info.",
      status: 400,
    };
  }

  const phoneE164 = lead.phoneE164?.trim();
  if (!phoneE164) {
    return {
      ok: false,
      error: "Lead has no WhatsApp number on file.",
      status: 400,
    };
  }

  const sender = createEvolutionWhatsAppSenderFromEnv();
  if (!sender) {
    return {
      ok: false,
      error: "Evolution WhatsApp is not configured.",
      status: 503,
    };
  }

  const text = await buildPlanInfoWhatsAppMessage(lead);
  const number = e164ToEvolutionNumber(phoneE164);
  const result = await sender.send({ kind: "text", number, text });

  await prisma.notificationLog.create({
    data: {
      leadId: lead.id,
      channel: NotificationChannel.whatsapp,
      provider: "evolution",
      status: result.ok
        ? NotificationAttemptStatus.sent
        : NotificationAttemptStatus.failed,
      errorMsg: result.ok ? null : result.error,
      providerMsgId: result.ok ? result.providerMsgId ?? null : null,
      payload: {
        kind: "plan_info",
        number,
        textPreview: text.slice(0, 500),
      },
    },
  });

  if (!result.ok) {
    return { ok: false, error: result.error || "WhatsApp send failed", status: 502 };
  }

  await prisma.lead.update({
    where: { id: lead.id },
    data: {
      rawPayload: mergeRawPayload(lead.rawPayload, {
        planInfoSentAt: new Date().toISOString(),
      }),
    },
  });

  return { ok: true, providerMsgId: result.providerMsgId };
}
