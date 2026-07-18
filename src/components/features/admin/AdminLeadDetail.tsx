"use client";

import type { ReactNode } from "react";

type LeadDetail = {
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
  rawPayload: unknown;
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

export function AdminLeadDetail({
  lead,
  loading,
  onClose,
}: {
  lead: LeadDetail | null;
  loading: boolean;
  onClose: () => void;
}) {
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
              <Field label="ID" value={lead.id} />
              <Field label="Created" value={formatDateTime(lead.createdAt)} />
              <Field label="Form type" value={lead.formType} />
              <Field label="Status" value={lead.status} />
              <Field label="Page path" value={lead.pagePath} />
              <Field label="Page label" value={lead.pageLabel} />
              <Field label="Variant" value={lead.variant} />
              <Field label="Name" value={lead.name} />
              <Field
                label="Phone"
                value={
                  lead.phone
                    ? `${lead.countryCode || ""} ${lead.phone}`.trim()
                    : null
                }
              />
              <Field label="Email" value={lead.email} />
              <Field label="NEET score" value={lead.neetScore} />
              <Field label="NEET category" value={lead.neetCategory} />
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
