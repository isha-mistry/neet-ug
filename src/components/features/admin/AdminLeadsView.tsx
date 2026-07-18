"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  adminFetch,
  clearAdminToken,
  getAdminToken,
} from "@/lib/admin/client-session";
import { LEAD_FORM_TYPES, LEAD_STATUSES } from "@/lib/leads/types";
import { AdminLeadDetail } from "@/components/features/admin/AdminLeadDetail";

type LeadRow = {
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

type LeadsResponse = {
  items: LeadRow[];
  total: number;
  page: number;
  pageSize: number;
  error?: string;
};

type Filters = {
  q: string;
  formType: string;
  status: string;
  from: string;
  to: string;
};

const EMPTY_FILTERS: Filters = {
  q: "",
  formType: "",
  status: "",
  from: "",
  to: "",
};

const FORM_TYPE_OPTIONS = Object.values(LEAD_FORM_TYPES);

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminLeadsView() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<LeadRow | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router]);

  const logout = useCallback(() => {
    clearAdminToken();
    router.replace("/admin/login");
  }, [router]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (applied.q) params.set("q", applied.q);
    if (applied.formType) params.set("formType", applied.formType);
    if (applied.status) params.set("status", applied.status);
    if (applied.from) params.set("from", applied.from);
    if (applied.to) params.set("to", applied.to);
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));
    return params.toString();
  }, [applied, page, pageSize]);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch(`/api/admin/leads?${queryString}`);
      if (res.status === 401) {
        clearAdminToken();
        router.replace("/admin/login");
        return;
      }
      const json = (await res.json()) as LeadsResponse;
      if (!res.ok) {
        setError(json.error || "Failed to load leads");
        setData(null);
        return;
      }
      setData(json);
    } catch {
      setError("Failed to load leads");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [queryString, router]);

  useEffect(() => {
    if (!ready) return;
    void loadLeads();
  }, [ready, loadLeads]);

  async function openDetail(id: string) {
    setSelectedId(id);
    setDetailLoading(true);
    setSelectedLead(null);
    try {
      const res = await adminFetch(`/api/admin/leads/${id}`);
      if (res.status === 401) {
        clearAdminToken();
        router.replace("/admin/login");
        return;
      }
      if (!res.ok) {
        setError("Failed to load lead detail");
        return;
      }
      const lead = (await res.json()) as LeadRow;
      setSelectedLead(lead);
    } catch {
      setError("Failed to load lead detail");
    } finally {
      setDetailLoading(false);
    }
  }

  function applyFilters() {
    setPage(1);
    setApplied({ ...filters });
  }

  function clearFilters() {
    setFilters(EMPTY_FILTERS);
    setApplied(EMPTY_FILTERS);
    setPage(1);
  }

  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / data.pageSize))
    : 1;

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-on-surface-variant">
        Checking session…
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-outline-variant pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            Internal · Admin
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-on-surface">
            Leads inbox
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            All form submissions. Search and filter by type, status, or date.
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-xl border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition hover:border-primary hover:bg-primary-fixed"
        >
          Log out
        </button>
      </header>

      <section className="grid gap-3 rounded-2xl border border-outline-variant bg-surface-container-low/40 p-4 sm:grid-cols-2 lg:grid-cols-6">
        <label className="space-y-1 lg:col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
            Search
          </span>
          <input
            type="search"
            placeholder="Name, phone, or email"
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
            Form type
          </span>
          <select
            value={filters.formType}
            onChange={(e) =>
              setFilters((f) => ({ ...f, formType: e.target.value }))
            }
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All</option>
            {FORM_TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
            Status
          </span>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({ ...f, status: e.target.value }))
            }
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
            From
          </span>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
            To
          </span>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <div className="flex flex-wrap items-end gap-2 sm:col-span-2 lg:col-span-6">
          <button
            type="button"
            onClick={applyFilters}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-on-primary transition hover:bg-primary-pressed"
          >
            Apply filters
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition hover:bg-surface-container-low"
          >
            Clear
          </button>
          {data ? (
            <p className="ml-auto text-sm text-on-surface-variant">
              {data.total} lead{data.total === 1 ? "" : "s"}
              {loading ? " · loading…" : ""}
            </p>
          ) : null}
        </div>
      </section>

      {error ? (
        <p className="rounded-xl border border-error/30 bg-error-container/70 px-3 py-2 text-sm text-on-surface">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-outline-variant">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-outline-variant bg-surface-container-low text-[11px] uppercase tracking-wide text-on-surface-variant">
            <tr>
              <th className="px-3 py-3 font-semibold">Created</th>
              <th className="px-3 py-3 font-semibold">Form</th>
              <th className="px-3 py-3 font-semibold">Status</th>
              <th className="px-3 py-3 font-semibold">Name</th>
              <th className="px-3 py-3 font-semibold">Phone</th>
              <th className="px-3 py-3 font-semibold">Email</th>
              <th className="px-3 py-3 font-semibold">Domicile</th>
              <th className="px-3 py-3 font-semibold">Page</th>
              <th className="px-3 py-3 font-semibold">Variant</th>
            </tr>
          </thead>
          <tbody>
            {loading && !data ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-3 py-8 text-center text-on-surface-variant"
                >
                  Loading leads…
                </td>
              </tr>
            ) : null}
            {data?.items.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-3 py-8 text-center text-on-surface-variant"
                >
                  No leads match these filters.
                </td>
              </tr>
            ) : null}
            {data?.items.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => void openDetail(lead.id)}
                className={`cursor-pointer border-b border-outline-variant/60 transition hover:bg-primary-fixed/40 ${
                  selectedId === lead.id ? "bg-primary-fixed/50" : ""
                }`}
              >
                <td className="whitespace-nowrap px-3 py-2.5 text-on-surface-variant">
                  {formatDateTime(lead.createdAt)}
                </td>
                <td className="px-3 py-2.5 font-medium text-on-surface">
                  {lead.formType}
                </td>
                <td className="px-3 py-2.5">
                  <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-xs font-semibold capitalize">
                    {lead.status}
                  </span>
                </td>
                <td className="px-3 py-2.5">{lead.name || "—"}</td>
                <td className="whitespace-nowrap px-3 py-2.5">
                  {lead.phone
                    ? `${lead.countryCode || ""} ${lead.phone}`.trim()
                    : "—"}
                </td>
                <td className="px-3 py-2.5">{lead.email || "—"}</td>
                <td className="px-3 py-2.5">{lead.domicileState || "—"}</td>
                <td
                  className="max-w-[180px] truncate px-3 py-2.5 text-on-surface-variant"
                  title={lead.pagePath || undefined}
                >
                  {lead.pagePath || "—"}
                </td>
                <td className="px-3 py-2.5 text-on-surface-variant">
                  {lead.variant || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data && data.total > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-on-surface-variant">
            Page {data.page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-xl border border-outline-variant px-3 py-1.5 text-sm font-semibold disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-xl border border-outline-variant px-3 py-1.5 text-sm font-semibold disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}

      {selectedId ? (
        <AdminLeadDetail
          lead={selectedLead}
          loading={detailLoading}
          onClose={() => {
            setSelectedId(null);
            setSelectedLead(null);
          }}
        />
      ) : null}
    </div>
  );
}
