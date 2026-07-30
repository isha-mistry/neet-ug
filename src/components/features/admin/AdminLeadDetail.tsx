"use client";

import { useState, type ReactNode } from "react";
import { adminFetch } from "@/lib/admin/client-session";
import { getLeadPlanName, getLeadQuota, PACKAGE_PLAN_VARIANTS } from "@/lib/leads/plan-fields";

type NotificationLogDetail = {
  id: string;
  channel: string;
  provider: string;
  status: string;
  errorMsg: string | null;
  providerMsgId: string | null;
  createdAt: string;
};

export type AdminLeadDetailData = {
  id: string;
  createdAt: string;
  formType: string;
  status: string;
  pagePath: string | null;
  pageLabel: string | null;
  variant: string | null;
  name: string | null;
  countryCode: string | null;
  phone: string | null;
  phoneE164: string | null;
  email: string | null;
  neetScore: number | null;
  neetCategory: string | null;
  domicileState: string | null;
  targetStates: string | null;
  city: string | null;
  queryType: string | null;
  message: string | null;
  preferredSlot: string | null;
  topics: unknown;
  consent: boolean;
  consentAt: string | null;
  consentWhatsapp: boolean;
  consentWhatsappAt: string | null;
  notificationStatus: string;
  planPurchasedAt: string | null;
  rawPayload: unknown;
  notificationLogs?: NotificationLogDetail[];
};

function Field({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="space-y-1 border-b border-outline-variant/50 py-2.5 last:border-b-0">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
        {label}
      </dt>
      <dd className="break-words text-sm text-on-surface">{value ?? "—"}</dd>
    </div>
  );
}

function formatJson(value: unknown): string {
  if (value == null) return "—";
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const PACKAGE_VARIANTS = new Set<string>(PACKAGE_PLAN_VARIANTS);

export function AdminLeadDetail({
  lead,
  loading,
  onClose,
  onLeadUpdated,
}: {
  lead: AdminLeadDetailData | null;
  loading: boolean;
  onClose: () => void;
  onLeadUpdated?: (lead: AdminLeadDetailData) => void;
}) {
  const [actionBusy, setActionBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const isPackageLead = Boolean(
    lead?.variant && PACKAGE_VARIANTS.has(lead.variant),
  );
  const purchased = Boolean(lead?.planPurchasedAt);
  const hasPhone = Boolean(lead?.phoneE164);
  const canSend = isPackageLead && purchased && hasPhone;

  async function markPurchased(next: boolean) {
    if (!lead) return;
    setActionBusy(true);
    setActionError(null);
    setActionMessage(null);
    try {
      const res = await adminFetch(
        `/api/admin/leads/${lead.id}/plan-purchase`,
        {
          method: "PATCH",
          body: JSON.stringify({ purchased: next }),
        },
      );
      const json = (await res.json()) as {
        error?: string;
        lead?: AdminLeadDetailData;
      };
      if (!res.ok) {
        setActionError(json.error || "Failed to update purchase status");
        return;
      }
      if (json.lead) onLeadUpdated?.(json.lead);
      setActionMessage(
        next ? "Plan marked as purchased." : "Purchase mark removed.",
      );
    } catch {
      setActionError("Failed to update purchase status");
    } finally {
      setActionBusy(false);
    }
  }

  async function resendWhatsApp() {
    if (!lead) return;
    setActionBusy(true);
    setActionError(null);
    setActionMessage(null);
    try {
      const res = await adminFetch(
        `/api/admin/leads/${lead.id}/resend-whatsapp`,
        { method: "POST" },
      );
      const json = (await res.json()) as {
        error?: string;
        lead?: AdminLeadDetailData;
      };
      if (json.lead) onLeadUpdated?.(json.lead);
      if (!res.ok) {
        setActionError(json.error || "Failed to send WhatsApp message");
        return;
      }
      setActionMessage("WhatsApp message sent.");
    } catch {
      setActionError("Failed to send WhatsApp message");
    } finally {
      setActionBusy(false);
    }
  }

  async function sendPlanInfo() {
    if (!lead) return;
    setActionBusy(true);
    setActionError(null);
    setActionMessage(null);
    try {
      const res = await adminFetch(
        `/api/admin/leads/${lead.id}/send-plan-info`,
        { method: "POST" },
      );
      const json = (await res.json()) as {
        error?: string;
        lead?: AdminLeadDetailData;
      };
      if (!res.ok) {
        setActionError(json.error || "Failed to send plan info");
        return;
      }
      if (json.lead) onLeadUpdated?.(json.lead);
      setActionMessage("Plan info sent on WhatsApp.");
    } catch {
      setActionError("Failed to send plan info");
    } finally {
      setActionBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-on-surface/40"
      role="dialog"
      aria-modal="true"
      aria-label="Lead detail"
      onClick={onClose}
    >
      <aside
        className="flex h-full w-full max-w-lg flex-col bg-surface-container-lowest shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-outline-variant px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
              Lead detail
            </p>
            <h2 className="mt-0.5 text-lg font-bold text-on-surface">
              {lead?.name || lead?.formType || "Loading…"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-outline-variant px-3 py-1.5 text-sm font-semibold hover:bg-surface-container-low"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-2">
          {loading || !lead ? (
            <p className="py-8 text-sm text-on-surface-variant">
              Loading detail…
            </p>
          ) : (
            <dl>
              {isPackageLead ? (
                <div className="mb-3 space-y-3 rounded-2xl border border-outline-variant bg-surface-container-low/50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
                    Plan fulfillment
                  </p>
                  <p className="text-sm text-on-surface">
                    Plan:{" "}
                    <span className="font-semibold">
                      {getLeadPlanName(lead)}
                    </span>
                    {" · "}
                    Quota:{" "}
                    <span className="font-semibold">
                      {getLeadQuota(lead.rawPayload) ?? "—"}
                    </span>
                  </p>
                  <p className="text-sm text-on-surface">
                    Purchase:{" "}
                    <span className="font-semibold">
                      {purchased
                        ? `Confirmed ${formatDateTime(lead.planPurchasedAt)}`
                        : "Not confirmed"}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={actionBusy}
                      onClick={() => void markPurchased(!purchased)}
                      className="rounded-xl border border-outline-variant px-3 py-1.5 text-sm font-semibold disabled:opacity-50"
                    >
                      {purchased ? "Unmark purchased" : "Mark plan purchased"}
                    </button>
                    <button
                      type="button"
                      disabled={actionBusy || !canSend}
                      onClick={() => void sendPlanInfo()}
                      className="rounded-xl bg-primary px-3 py-1.5 text-sm font-semibold text-on-primary disabled:opacity-50"
                    >
                      Send plan info on WhatsApp
                    </button>
                  </div>
                  {!purchased ? (
                    <p className="text-xs text-on-surface-variant">
                      Mark purchase after offline payment confirmation, then
                      send plan info.
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div className="mb-3 space-y-3 rounded-2xl border border-outline-variant bg-surface-container-low/50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
                  WhatsApp delivery
                </p>
                <p className="text-sm text-on-surface">
                  Status:{" "}
                  <span className="font-semibold">
                    {lead.notificationStatus}
                  </span>
                </p>
                <button
                  type="button"
                  disabled={actionBusy || !hasPhone}
                  onClick={() => void resendWhatsApp()}
                  className="rounded-xl border border-outline-variant px-3 py-1.5 text-sm font-semibold disabled:opacity-50"
                >
                  Send WhatsApp now
                </button>
                <p className="text-xs text-on-surface-variant">
                  {hasPhone
                    ? "Sends this form type's template again — use it to retry a failed delivery."
                    : "No WhatsApp number on file for this lead."}
                </p>
                {actionMessage ? (
                  <p className="text-xs text-on-surface">{actionMessage}</p>
                ) : null}
                {actionError ? (
                  <p className="text-xs text-error" role="alert">
                    {actionError}
                  </p>
                ) : null}
              </div>

              <Field label="ID" value={lead.id} />
              <Field label="Created" value={formatDateTime(lead.createdAt)} />
              <Field label="Form type" value={lead.formType} />
              <Field label="Status" value={lead.status} />
              <Field label="Page path" value={lead.pagePath} />
              <Field label="Page label" value={lead.pageLabel} />
              <Field label="Variant" value={lead.variant} />
              <Field
                label="Plan purchased at"
                value={formatDateTime(lead.planPurchasedAt)}
              />
              <Field label="Name" value={lead.name} />
              <Field
                label="Phone"
                value={
                  lead.phoneE164 ??
                  (lead.phone
                    ? `${lead.countryCode || ""} ${lead.phone}`.trim()
                    : null)
                }
              />
              <Field label="Email" value={lead.email} />
              <Field label="NEET score" value={lead.neetScore} />
              <Field label="NEET category" value={lead.neetCategory} />
              <Field label="Quota" value={getLeadQuota(lead.rawPayload)} />
              <Field label="Domicile state" value={lead.domicileState} />
              <Field label="Target states" value={lead.targetStates} />
              <Field label="City" value={lead.city} />
              <Field label="Query type" value={lead.queryType} />
              <Field label="Preferred slot" value={lead.preferredSlot} />
              <Field
                label="Message"
                value={
                  lead.message ? (
                    <span className="whitespace-pre-wrap">{lead.message}</span>
                  ) : null
                }
              />
              <Field
                label="Topics"
                value={
                  <pre className="overflow-x-auto rounded-xl bg-surface-container-low p-3 text-xs leading-relaxed">
                    {formatJson(lead.topics)}
                  </pre>
                }
              />
              <Field label="Consent" value={lead.consent ? "Yes" : "No"} />
              <Field
                label="Consent at"
                value={formatDateTime(lead.consentAt)}
              />
              <Field
                label="WhatsApp consent"
                value={lead.consentWhatsapp ? "Yes" : "No"}
              />
              <Field
                label="WhatsApp consent at"
                value={formatDateTime(lead.consentWhatsappAt)}
              />
              <Field label="Notification status" value={lead.notificationStatus} />
              <Field
                label="Notification log"
                value={
                  lead.notificationLogs?.length ? (
                    <ul className="space-y-2">
                      {lead.notificationLogs.map((log) => (
                        <li
                          key={log.id}
                          className="rounded-xl bg-surface-container-low p-3 text-xs leading-relaxed"
                        >
                          <p>
                            {formatDateTime(log.createdAt)} · {log.channel} ·{" "}
                            {log.provider} · {log.status}
                          </p>
                          {log.providerMsgId ? (
                            <p className="mt-1 text-on-surface-variant">
                              Provider ID: {log.providerMsgId}
                            </p>
                          ) : null}
                          {log.errorMsg ? (
                            <p className="mt-1 text-on-error-container">
                              {log.errorMsg}
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No attempts yet"
                  )
                }
              />
              <Field
                label="Raw payload"
                value={
                  <pre className="overflow-x-auto rounded-xl bg-surface-container-low p-3 text-xs leading-relaxed">
                    {formatJson(lead.rawPayload)}
                  </pre>
                }
              />
            </dl>
          )}
        </div>
      </aside>
    </div>
  );
}
