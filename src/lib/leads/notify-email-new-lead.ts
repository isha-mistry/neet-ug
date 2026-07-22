import "server-only";

import nodemailer from "nodemailer";
import { reportAppError } from "@/lib/sentry/error-reporter";
import type { SlackLeadNotification } from "@/lib/leads/notify-slack-new-lead";

export type EmailLeadNotification = SlackLeadNotification & {
  neetScore?: number | null;
  neetCategory?: string | null;
  domicileState?: string | null;
  city?: string | null;
  queryType?: string | null;
  message?: string | null;
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | null | undefined): string {
  const display = value?.trim() ? escapeHtml(value.trim()) : "—";
  return `<tr>
  <td style="padding:8px 12px;border-bottom:1px solid #e8e8e8;color:#5f6368;font-size:13px;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
  <td style="padding:8px 12px;border-bottom:1px solid #e8e8e8;color:#202124;font-size:14px;font-weight:600;">${display}</td>
</tr>`;
}

function buildLeadEmail(lead: EmailLeadNotification): {
  subject: string;
  text: string;
  html: string;
} {
  const name = lead.name?.trim() || "—";
  const email = lead.email?.trim() || "—";
  const phone = formatPhone(lead.countryCode, lead.phone);
  const when = formatTimestamp(lead.createdAt);
  const page = lead.pageLabel?.trim() || lead.pagePath?.trim() || "—";

  const subject = `New lead · ${lead.formType} · ${name}`;

  const textLines = [
    "New lead submitted on Dravio",
    "",
    `Form: ${lead.formType}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Submitted: ${when}`,
    `Page: ${page}`,
    lead.variant?.trim() ? `Variant: ${lead.variant.trim()}` : null,
    lead.neetScore != null ? `NEET score: ${lead.neetScore}` : null,
    lead.neetCategory?.trim() ? `NEET category: ${lead.neetCategory.trim()}` : null,
    lead.domicileState?.trim() ? `Domicile: ${lead.domicileState.trim()}` : null,
    lead.city?.trim() ? `City: ${lead.city.trim()}` : null,
    lead.queryType?.trim() ? `Query type: ${lead.queryType.trim()}` : null,
    lead.message?.trim() ? `Message: ${lead.message.trim()}` : null,
    `Lead ID: ${lead.leadId}`,
  ].filter(Boolean);

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:24px;background:#f5f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e0e0e0;">
    <tr>
      <td style="padding:20px 24px;background:#0b57d0;color:#ffffff;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;">Dravio · Lead alert</div>
        <div style="font-size:20px;font-weight:700;margin-top:6px;">New lead submitted</div>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 12px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          ${row("Form", lead.formType)}
          ${row("Name", name)}
          ${row("Email", email)}
          ${row("Phone", phone)}
          ${row("Submitted", when)}
          ${row("Page", page)}
          ${lead.variant?.trim() ? row("Variant", lead.variant) : ""}
          ${lead.neetScore != null ? row("NEET score", String(lead.neetScore)) : ""}
          ${lead.neetCategory?.trim() ? row("NEET category", lead.neetCategory) : ""}
          ${lead.domicileState?.trim() ? row("Domicile", lead.domicileState) : ""}
          ${lead.city?.trim() ? row("City", lead.city) : ""}
          ${lead.queryType?.trim() ? row("Query type", lead.queryType) : ""}
          ${lead.message?.trim() ? row("Message", lead.message) : ""}
          ${row("Lead ID", lead.leadId)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 24px 20px;color:#80868b;font-size:12px;line-height:1.5;">
        This message was sent automatically when a form submission was saved.
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text: textLines.join("\n"), html };
}

function parseRecipientList(): string[] {
  const raw =
    process.env.LEAD_NOTIFY_EMAIL_TO?.trim() ||
    process.env.ADMIN_EMAIL_ALLOWLIST?.trim() ||
    "";
  if (!raw) return [];
  return [
    ...new Set(
      raw
        .split(/[,;]/)
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)
    ),
  ];
}

function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim() &&
      (process.env.SMTP_FROM?.trim() ||
        process.env.SMTP_USER?.trim())
  );
}

/**
 * Emails admins about a new lead via Nodemailer SMTP.
 * Never throws — failures are reported and ignored by callers.
 */
export async function notifyEmailNewLead(
  lead: EmailLeadNotification
): Promise<void> {
  if (!isSmtpConfigured()) return;

  const recipients = parseRecipientList();
  if (recipients.length === 0) return;

  const host = process.env.SMTP_HOST!.trim();
  const user = process.env.SMTP_USER!.trim();
  const pass = process.env.SMTP_PASS!.trim();
  const from = process.env.SMTP_FROM?.trim() ||
    user;
  const port = Number.parseInt(process.env.SMTP_PORT?.trim() || "587", 10);
  const secure =
    process.env.SMTP_SECURE === "true" ||
    process.env.SMTP_SECURE === "1" ||
    port === 465;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number.isFinite(port) ? port : 587,
      secure,
      auth: { user, pass },
    });

    const { subject, text, html } = buildLeadEmail(lead);

    await transporter.sendMail({
      from,
      to: recipients.join(", "),
      subject,
      text,
      html,
    });
  } catch (error) {
    reportAppError(error, {
      module: "lead",
      feature: "email_notification",
      action: "notify_email_new_lead",
      leadId: lead.leadId,
      metadata: { formType: lead.formType },
    });
  }
}
