import "server-only";

import { reportAppError } from "@/lib/sentry/error-reporter";

export type SlackLeadNotification = {
  leadId: string;
  formType: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  countryCode?: string | null;
  pagePath?: string | null;
  pageLabel?: string | null;
  variant?: string | null;
  createdAt?: Date | string | null;
};

function formatPhone(
  countryCode?: string | null,
  phone?: string | null
): string {
  if (!phone?.trim()) return "—";
  const code = countryCode?.trim();
  return code ? `${code} ${phone.trim()}` : phone.trim();
}

function formatTimestamp(createdAt?: Date | string | null): string {
  const d =
    createdAt instanceof Date
      ? createdAt
      : createdAt
        ? new Date(createdAt)
        : new Date();
  if (Number.isNaN(d.getTime())) return new Date().toISOString();
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function buildSlackPayload(lead: SlackLeadNotification) {
  const name = lead.name?.trim() || "—";
  const email = lead.email?.trim() || "—";
  const phone = formatPhone(lead.countryCode, lead.phone);
  const when = formatTimestamp(lead.createdAt);
  const page =
    lead.pageLabel?.trim() ||
    lead.pagePath?.trim() ||
    "—";

  const text = [
    `*New lead* · \`${lead.formType}\``,
    `• *Name:* ${name}`,
    `• *Email:* ${email}`,
    `• *Phone:* ${phone}`,
    `• *Submitted:* ${when}`,
    `• *Page:* ${page}`,
    lead.variant?.trim() ? `• *Variant:* ${lead.variant.trim()}` : null,
    `• *Lead ID:* \`${lead.leadId}\``,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    text: `New lead: ${lead.formType} — ${name}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "New lead submitted",
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text,
        },
      },
    ],
  };
}

/**
 * Posts a Slack Incoming Webhook notification for a new lead.
 * Never throws — failures are logged / reported and ignored by callers.
 */
export async function notifySlackNewLead(
  lead: SlackLeadNotification
): Promise<void> {
  const webhookUrl = process.env.SLACK_LEADS_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5_000);

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildSlackPayload(lead)),
        signal: controller.signal,
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        reportAppError(new Error(`Slack webhook HTTP ${res.status}`), {
          module: "lead",
          feature: "slack_notification",
          action: "notify_slack_new_lead",
          leadId: lead.leadId,
          metadata: {
            formType: lead.formType,
            status: res.status,
            body: body.slice(0, 200),
          },
        });
      }
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    reportAppError(error, {
      module: "lead",
      feature: "slack_notification",
      action: "notify_slack_new_lead",
      leadId: lead.leadId,
      metadata: { formType: lead.formType },
    });
  }
}
