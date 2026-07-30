import "server-only";

import {
  NotificationAttemptStatus,
  NotificationChannel,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { PACKAGE_PLAN_VARIANTS } from "@/lib/leads/plan-fields";
import { e164ToEvolutionNumber } from "@/lib/leads/normalize-phone-e164";
import { createEvolutionWhatsAppSenderFromEnv } from "@/lib/notifications/evolution-client";
import {
  NEET_UG_UPDATES_NOTICE_FEED,
  type UpdatesNoticeItem,
} from "@/lib/neet-ug-2026/updates-content";
import { SITE_URL } from "@/lib/seo/site-config";

const SEND_PAUSE_MS = 1000;
export const NOTICE_FEED_ALERT_KIND = "notice_feed_alert";

export type NoticeAlertRecipient = {
  id: string;
  name: string | null;
  phoneE164: string;
  variant: string | null;
};

export type NoticeAlertPreview = {
  notice: UpdatesNoticeItem | null;
  noticeKey: string | null;
  recipientCount: number;
  alreadySentCount: number;
};

export type BroadcastNoticeResult =
  | {
      ok: true;
      notice: UpdatesNoticeItem;
      noticeKey: string;
      sent: number;
      failed: number;
      skipped: number;
      errors: { leadId: string; error: string }[];
    }
  | { ok: false; error: string; status: number };

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getLatestUpdatesNotice(): UpdatesNoticeItem | null {
  return NEET_UG_UPDATES_NOTICE_FEED[0] ?? null;
}

export function noticeKey(notice: UpdatesNoticeItem): string {
  return `${notice.date}|${notice.title}`;
}

export function resolveNoticeHref(href: string): string {
  const trimmed = href.trim();
  if (!trimmed) return SITE_URL;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return new URL(trimmed.startsWith("/") ? trimmed : `/${trimmed}`, SITE_URL)
    .href;
}

export function buildNoticeAlertWhatsAppMessage(
  lead: { name: string | null },
  notice: UpdatesNoticeItem,
): string {
  const name = lead.name?.trim();
  const greeting = name ? `Hi ${name},` : "Hi,";
  const link = resolveNoticeHref(notice.href);

  return [
    greeting,
    "",
    `Counselling alert · [${notice.tag}] ${notice.title}`,
    notice.date,
    "",
    notice.summary,
    "",
    `Read here: ${link}`,
    "",
    "— Team Dravio",
  ].join("\n");
}

export async function listPurchasedPlanAlertRecipients(): Promise<
  NoticeAlertRecipient[]
> {
  const leads = await prisma.lead.findMany({
    where: {
      planPurchasedAt: { not: null },
      variant: { in: [...PACKAGE_PLAN_VARIANTS] },
      phoneE164: { not: null },
    },
    orderBy: { planPurchasedAt: "desc" },
    select: {
      id: true,
      name: true,
      phoneE164: true,
      variant: true,
    },
  });

  const seen = new Set<string>();
  const recipients: NoticeAlertRecipient[] = [];

  for (const lead of leads) {
    const phone = lead.phoneE164?.trim();
    if (!phone || seen.has(phone)) continue;
    seen.add(phone);
    recipients.push({
      id: lead.id,
      name: lead.name,
      phoneE164: phone,
      variant: lead.variant,
    });
  }

  return recipients;
}

function isNoticePayloadMatch(
  payload: unknown,
  key: string,
): boolean {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }
  const record = payload as Record<string, unknown>;
  return (
    record.kind === NOTICE_FEED_ALERT_KIND &&
    typeof record.noticeKey === "string" &&
    record.noticeKey === key
  );
}

async function leadIdsAlreadySentNotice(
  leadIds: string[],
  key: string,
): Promise<Set<string>> {
  if (leadIds.length === 0) return new Set();

  const logs = await prisma.notificationLog.findMany({
    where: {
      leadId: { in: leadIds },
      channel: NotificationChannel.whatsapp,
      status: NotificationAttemptStatus.sent,
    },
    select: { leadId: true, payload: true },
  });

  const sent = new Set<string>();
  for (const log of logs) {
    if (isNoticePayloadMatch(log.payload, key)) {
      sent.add(log.leadId);
    }
  }
  return sent;
}

export async function getLatestNoticePreview(): Promise<NoticeAlertPreview> {
  const notice = getLatestUpdatesNotice();
  if (!notice) {
    return {
      notice: null,
      noticeKey: null,
      recipientCount: 0,
      alreadySentCount: 0,
    };
  }

  const key = noticeKey(notice);
  const recipients = await listPurchasedPlanAlertRecipients();
  const alreadySent = await leadIdsAlreadySentNotice(
    recipients.map((r) => r.id),
    key,
  );

  return {
    notice,
    noticeKey: key,
    recipientCount: recipients.length,
    alreadySentCount: alreadySent.size,
  };
}

export async function broadcastLatestNoticeAlert(): Promise<BroadcastNoticeResult> {
  const notice = getLatestUpdatesNotice();
  if (!notice) {
    return {
      ok: false,
      error: "Notice feed is empty — nothing to send.",
      status: 404,
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

  const key = noticeKey(notice);
  const recipients = await listPurchasedPlanAlertRecipients();
  if (recipients.length === 0) {
    return {
      ok: true,
      notice,
      noticeKey: key,
      sent: 0,
      failed: 0,
      skipped: 0,
      errors: [],
    };
  }

  const alreadySent = await leadIdsAlreadySentNotice(
    recipients.map((r) => r.id),
    key,
  );

  let sent = 0;
  let failed = 0;
  let skipped = 0;
  const errors: { leadId: string; error: string }[] = [];
  let pendingSend = false;

  for (const recipient of recipients) {
    if (alreadySent.has(recipient.id)) {
      skipped += 1;
      continue;
    }

    if (pendingSend) {
      await sleep(SEND_PAUSE_MS);
    }
    pendingSend = true;

    const text = buildNoticeAlertWhatsAppMessage(recipient, notice);
    const number = e164ToEvolutionNumber(recipient.phoneE164);
    const result = await sender.send({ kind: "text", number, text });

    const payload: Prisma.InputJsonValue = {
      kind: NOTICE_FEED_ALERT_KIND,
      noticeKey: key,
      href: resolveNoticeHref(notice.href),
      title: notice.title,
      tag: notice.tag,
      date: notice.date,
      number,
      textPreview: text.slice(0, 500),
    };

    await prisma.notificationLog.create({
      data: {
        leadId: recipient.id,
        channel: NotificationChannel.whatsapp,
        provider: "evolution",
        status: result.ok
          ? NotificationAttemptStatus.sent
          : NotificationAttemptStatus.failed,
        errorMsg: result.ok ? null : result.error,
        providerMsgId: result.ok ? result.providerMsgId ?? null : null,
        payload,
      },
    });

    if (result.ok) {
      sent += 1;
    } else {
      failed += 1;
      errors.push({
        leadId: recipient.id,
        error: result.error || "WhatsApp send failed",
      });
    }
  }

  return {
    ok: true,
    notice,
    noticeKey: key,
    sent,
    failed,
    skipped,
    errors,
  };
}
