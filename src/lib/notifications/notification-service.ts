import type { PrismaClient, Prisma } from "@prisma/client";
import {
  LeadNotificationStatus,
  NotificationAttemptStatus,
  NotificationChannel,
} from "@prisma/client";
import {
  createEvolutionWhatsAppSenderFromEnv,
  getEvolutionClientConfig,
} from "./evolution-client";
import {
  createFast2SmsLeadConfirmSender,
  isSmsFallbackEnabled,
} from "./fast2sms-lead-confirm";
import { resolveWhatsAppMessage, toWhatsAppPayload } from "./message-builder";
import { getSmsFallbackText } from "./message-templates";
import { readPublicFileAsBase64 } from "./public-media";
import type { LeadForNotification, SendResult } from "./types";

export type DeliverLeadNotificationResult = {
  finalStatus: LeadNotificationStatus;
  whatsappAttempt?: SendResult;
  smsAttempt?: SendResult;
};

async function writeNotificationLog(
  prisma: PrismaClient,
  input: {
    leadId: string;
    channel: NotificationChannel;
    provider: string;
    status: NotificationAttemptStatus;
    errorMsg?: string;
    providerMsgId?: string;
    payload?: Prisma.InputJsonValue;
  },
): Promise<void> {
  await prisma.notificationLog.create({
    data: {
      leadId: input.leadId,
      channel: input.channel,
      provider: input.provider,
      status: input.status,
      errorMsg: input.errorMsg ?? null,
      providerMsgId: input.providerMsgId ?? null,
      payload: input.payload ?? undefined,
    },
  });
}

export async function deliverLeadNotification(
  prisma: PrismaClient,
  lead: LeadForNotification,
): Promise<DeliverLeadNotificationResult> {
  if (!lead.phoneE164) {
    return { finalStatus: LeadNotificationStatus.FAILED };
  }

  const whatsappSender = createEvolutionWhatsAppSenderFromEnv();
  const resolvedMessage = resolveWhatsAppMessage(lead);
  let whatsappPayload = toWhatsAppPayload(lead.phoneE164, resolvedMessage);

  let whatsappAttempt: SendResult = {
    ok: false,
    error: "Evolution API is not configured.",
  };

  // Prefer inlining the attachment: Evolution can only download `media` when the
  // URL is publicly reachable, which is never true in dev and only true post-deploy.
  const localPath =
    resolvedMessage.kind === "document" ? resolvedMessage.localPath : undefined;
  if (localPath && whatsappPayload.kind === "media") {
    const base64 = await readPublicFileAsBase64(localPath);
    if (base64) {
      whatsappPayload = { ...whatsappPayload, media: base64 };
    } else {
      console.warn(
        `[notifications] public${localPath} not readable; falling back to URL media`,
      );
    }
  }

  if (whatsappSender) {
    whatsappAttempt = await whatsappSender.send(whatsappPayload);
    await writeNotificationLog(prisma, {
      leadId: lead.id,
      channel: NotificationChannel.whatsapp,
      provider: "evolution",
      status: whatsappAttempt.ok
        ? NotificationAttemptStatus.sent
        : NotificationAttemptStatus.failed,
      errorMsg: whatsappAttempt.ok ? undefined : whatsappAttempt.error,
      providerMsgId: whatsappAttempt.ok ? whatsappAttempt.providerMsgId : undefined,
      payload: {
        formType: lead.formType,
        messageKind: resolvedMessage.kind,
      },
    });
  } else {
    await writeNotificationLog(prisma, {
      leadId: lead.id,
      channel: NotificationChannel.whatsapp,
      provider: "evolution",
      status: NotificationAttemptStatus.failed,
      errorMsg: whatsappAttempt.error,
      payload: { formType: lead.formType, configured: false },
    });
  }

  if (whatsappAttempt.ok) {
    return { finalStatus: LeadNotificationStatus.SENT, whatsappAttempt };
  }

  if (!isSmsFallbackEnabled()) {
    return { finalStatus: LeadNotificationStatus.FAILED, whatsappAttempt };
  }

  const smsSender = createFast2SmsLeadConfirmSender();
  if (!smsSender) {
    return { finalStatus: LeadNotificationStatus.FAILED, whatsappAttempt };
  }

  const smsText = getSmsFallbackText({
    id: lead.id,
    formType: lead.formType,
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
  });

  const smsAttempt = await smsSender.sendConfirmation(lead.phoneE164, smsText);
  await writeNotificationLog(prisma, {
    leadId: lead.id,
    channel: NotificationChannel.sms,
    provider: "fast2sms",
    status: smsAttempt.ok
      ? NotificationAttemptStatus.sent
      : NotificationAttemptStatus.failed,
    errorMsg: smsAttempt.ok ? undefined : smsAttempt.error,
    providerMsgId: smsAttempt.ok ? smsAttempt.providerMsgId : undefined,
    payload: {
      formType: lead.formType,
      fallback: true,
      whatsappError: whatsappAttempt.error,
    },
  });

  return {
    finalStatus: smsAttempt.ok
      ? LeadNotificationStatus.SENT
      : LeadNotificationStatus.FAILED,
    whatsappAttempt,
    smsAttempt,
  };
}

export function isNotificationDeliveryConfigured(): boolean {
  return getEvolutionClientConfig() !== null;
}
