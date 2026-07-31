"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminConfirmDialog } from "@/components/features/admin/AdminConfirmDialog";
import {
  adminFetch,
  clearAdminToken,
  getAdminToken,
} from "@/lib/admin/client-session";
import {
  AdminLeadDetail,
  type AdminLeadDetailData,
} from "@/components/features/admin/AdminLeadDetail";
import {
  getLeadPlanName,
  getLeadQuota,
  PACKAGE_PLAN_VARIANTS,
  type PackagePlanVariant,
} from "@/lib/leads/plan-fields";

type PlanLeadRow = {
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
  notificationLogs?: AdminLeadDetailData["notificationLogs"];
};

type PlansResponse = {
  items: PlanLeadRow[];
  total: number;
  page: number;
  pageSize: number;
  counts: {
    all: number;
    purchased: number;
    pending: number;
    byPlan: Record<PackagePlanVariant, number>;
  };
  error?: string;
};

type Filters = {
  q: string;
  plan: string;
  purchase: "all" | "purchased" | "pending";
  from: string;
  to: string;
};

type LatestNoticePreview = {
  notice: {
    date: string;
    title: string;
    summary: string;
    href: string;
    tag: string;
  } | null;
  noticeKey: string | null;
  recipientCount: number;
  alreadySentCount: number;
  error?: string;
};

type BroadcastNoticeResponse = {
  ok?: boolean;
  sent?: number;
  failed?: number;
  skipped?: number;
  errors?: { leadId: string; error: string }[];
  error?: string;
};

const EMPTY_FILTERS: Filters = {
  q: "",
  plan: "",
  purchase: "all",
  from: "",
  to: "",
};

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
  });
}

function planLabel(variant: string | null): string {
  if (!variant) return "—";
  return getLeadPlanName({ variant, rawPayload: null });
}

export function AdminPlansView() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [data, setData] = useState<PlansResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<AdminLeadDetailData | null>(
    null,
  );
  const [detailLoading, setDetailLoading] = useState(false);
  const [noticePreview, setNoticePreview] = useState<LatestNoticePreview | null>(
    null,
  );
  const [noticeLoading, setNoticeLoading] = useState(false);
  const [broadcastBusy, setBroadcastBusy] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState<string | null>(null);
  const [broadcastError, setBroadcastError] = useState<string | null>(null);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router]);

  const [broadcastConfirmOpen, setBroadcastConfirmOpen] = useState(false);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (applied.q) params.set("q", applied.q);
    if (applied.plan) params.set("plan", applied.plan);
    if (applied.purchase !== "all") params.set("purchase", applied.purchase);
    if (applied.from) params.set("from", applied.from);
    if (applied.to) params.set("to", applied.to);
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));
    return params.toString();
  }, [applied, page, pageSize]);

  const loadPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch(`/api/admin/plans?${queryString}`);
      if (res.status === 401) {
        clearAdminToken();
        router.replace("/admin/login");
        return;
      }
      const json = (await res.json()) as PlansResponse;
      if (!res.ok) {
        setError(json.error || "Failed to load plan leads");
        setData(null);
        return;
      }
      setData(json);
    } catch {
      setError("Failed to load plan leads");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [queryString, router]);

  useEffect(() => {
    if (!ready) return;
    void loadPlans();
  }, [ready, loadPlans]);

  const loadNoticePreview = useCallback(async () => {
    setNoticeLoading(true);
    try {
      const res = await adminFetch("/api/admin/plans/latest-notice");
      if (res.status === 401) {
        clearAdminToken();
        router.replace("/admin/login");
        return;
      }
      const json = (await res.json()) as LatestNoticePreview;
      if (!res.ok) {
        setNoticePreview(null);
        setBroadcastError(json.error || "Failed to load latest notice");
        return;
      }
      setNoticePreview(json);
    } catch {
      setNoticePreview(null);
      setBroadcastError("Failed to load latest notice");
    } finally {
      setNoticeLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!ready) return;
    void loadNoticePreview();
  }, [ready, loadNoticePreview]);

  async function broadcastLatestNotice() {
    const notice = noticePreview?.notice;
    if (!notice) return;

    setBroadcastConfirmOpen(false);
    setBroadcastBusy(true);
    setBroadcastError(null);
    setBroadcastMessage(null);
    try {
      const res = await adminFetch("/api/admin/plans/broadcast-notice", {
        method: "POST",
      });
      if (res.status === 401) {
        clearAdminToken();
        router.replace("/admin/login");
        return;
      }
      const json = (await res.json()) as BroadcastNoticeResponse;
      if (!res.ok) {
        setBroadcastError(json.error || "Failed to broadcast notice");
        return;
      }
      const failHints = (json.errors ?? [])
        .slice(0, 3)
        .map((e) => e.error)
        .join("; ");
      setBroadcastMessage(
        `Sent ${json.sent ?? 0} · Skipped ${json.skipped ?? 0} · Failed ${json.failed ?? 0}` +
          (failHints ? ` — ${failHints}` : ""),
      );
      await loadNoticePreview();
    } catch {
      setBroadcastError("Failed to broadcast notice");
    } finally {
      setBroadcastBusy(false);
    }
  }

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
      const lead = (await res.json()) as AdminLeadDetailData;
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

  function setPurchaseFilter(purchase: Filters["purchase"]) {
    setFilters((f) => ({ ...f, purchase }));
    setApplied((f) => ({ ...f, purchase }));
    setPage(1);
  }

  function setPlanFilter(plan: string) {
    setFilters((f) => ({ ...f, plan }));
    setApplied((f) => ({ ...f, plan }));
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
      <header className="border-b border-outline-variant pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-on-surface">
          Counselling plans
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Essentials, Expert, and Premium interest — mark purchased and send
          WhatsApp plan info.
        </p>
      </header>

      {data?.counts ? (
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {(
            [
              {
                key: "all",
                label: "All plan leads",
                value: data.counts.all,
                active: applied.purchase === "all" && !applied.plan,
                onClick: () => {
                  setPurchaseFilter("all");
                  setPlanFilter("");
                },
              },
              {
                key: "purchased",
                label: "Purchased",
                value: data.counts.purchased,
                active: applied.purchase === "purchased",
                onClick: () => setPurchaseFilter("purchased"),
              },
              {
                key: "pending",
                label: "Not purchased",
                value: data.counts.pending,
                active: applied.purchase === "pending",
                onClick: () => setPurchaseFilter("pending"),
              },
              ...PACKAGE_PLAN_VARIANTS.map((plan) => ({
                key: plan,
                label: planLabel(plan),
                value: data.counts.byPlan[plan],
                active: applied.plan === plan,
                onClick: () => setPlanFilter(plan),
              })),
            ] as const
          ).map((card) => (
            <button
              key={card.key}
              type="button"
              onClick={card.onClick}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                card.active
                  ? "border-primary bg-primary-fixed"
                  : "border-outline-variant bg-surface-container-low/40 hover:border-primary"
              }`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
                {card.label}
              </p>
              <p className="mt-1 text-2xl font-bold text-on-surface">
                {card.value}
              </p>
            </button>
          ))}
        </section>
      ) : null}

      <section className="rounded-2xl border border-outline-variant bg-surface-container-low/40 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
              Counselling alerts
            </p>
            <p className="mt-1 text-sm text-on-surface-variant">
              One-click WhatsApp of the latest NEET UG notice-feed item to all
              purchased Essentials / Expert / Premium numbers.
            </p>
          </div>
          <button
            type="button"
            disabled={
              broadcastBusy ||
              noticeLoading ||
              !noticePreview?.notice ||
              (noticePreview?.recipientCount ?? 0) === 0
            }
            onClick={() => setBroadcastConfirmOpen(true)}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition hover:bg-primary-hover disabled:opacity-50"
          >
            {broadcastBusy ? "Sending…" : "Send latest alert on WhatsApp"}
          </button>
        </div>

        {noticeLoading && !noticePreview ? (
          <p className="mt-3 text-sm text-on-surface-variant">
            Loading latest notice…
          </p>
        ) : null}

        {noticePreview?.notice ? (
          <div className="mt-4 space-y-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-primary-fixed px-2.5 py-0.5 font-bold uppercase tracking-wider text-primary">
                {noticePreview.notice.tag}
              </span>
              <span className="font-semibold tabular-nums text-on-surface-variant">
                {noticePreview.notice.date}
              </span>
            </div>
            <h2 className="text-base font-bold leading-snug text-on-surface">
              {noticePreview.notice.title}
            </h2>
            <p className="line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
              {noticePreview.notice.summary}
            </p>
            <a
              href={noticePreview.notice.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-sm font-semibold text-primary hover:underline"
            >
              Open notice link
            </a>
            <p className="text-xs text-on-surface-variant">
              Recipients:{" "}
              <span className="font-semibold text-on-surface">
                {noticePreview.recipientCount}
              </span>{" "}
              unique purchased numbers · Already sent this notice:{" "}
              <span className="font-semibold text-on-surface">
                {noticePreview.alreadySentCount}
              </span>
            </p>
          </div>
        ) : !noticeLoading ? (
          <p className="mt-3 text-sm text-on-surface-variant">
            No notice in the feed yet.
          </p>
        ) : null}

        {broadcastMessage ? (
          <p className="mt-3 text-sm text-on-surface">{broadcastMessage}</p>
        ) : null}
        {broadcastError ? (
          <p className="mt-3 text-sm text-error" role="alert">
            {broadcastError}
          </p>
        ) : null}
      </section>

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
            Plan
          </span>
          <select
            value={filters.plan}
            onChange={(e) => setFilters((f) => ({ ...f, plan: e.target.value }))}
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All plans</option>
            {PACKAGE_PLAN_VARIANTS.map((plan) => (
              <option key={plan} value={plan}>
                {planLabel(plan)}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
            Purchase
          </span>
          <select
            value={filters.purchase}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                purchase: e.target.value as Filters["purchase"],
              }))
            }
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All</option>
            <option value="purchased">Purchased</option>
            <option value="pending">Not purchased</option>
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
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition hover:bg-primary-hover"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition hover:border-primary hover:bg-primary-fixed"
          >
            Clear
          </button>
        </div>
      </section>

      {error ? (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <section className="overflow-x-auto rounded-2xl border border-outline-variant">
        <table className="min-w-full divide-y divide-outline-variant text-left text-sm">
          <thead className="bg-surface-container-low text-[11px] uppercase tracking-wide text-on-surface-variant">
            <tr>
              <th className="px-4 py-3 font-semibold">Created</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Plan</th>
              <th className="px-4 py-3 font-semibold">Score / Category</th>
              <th className="px-4 py-3 font-semibold">Quota</th>
              <th className="px-4 py-3 font-semibold">Purchase</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant bg-surface-container-lowest">
            {loading && !data ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-on-surface-variant"
                >
                  Loading…
                </td>
              </tr>
            ) : null}
            {data?.items.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-on-surface-variant"
                >
                  No plan leads match these filters.
                </td>
              </tr>
            ) : null}
            {data?.items.map((row) => {
              const purchased = Boolean(row.planPurchasedAt);
              return (
                <tr
                  key={row.id}
                  className="cursor-pointer transition hover:bg-primary-fixed/40"
                  onClick={() => void openDetail(row.id)}
                >
                  <td className="whitespace-nowrap px-4 py-3 text-on-surface-variant">
                    {formatDateTime(row.createdAt)}
                  </td>
                  <td className="px-4 py-3 font-medium text-on-surface">
                    {row.name || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-on-surface">
                    {row.phoneE164 || row.phone || "—"}
                  </td>
                  <td className="px-4 py-3 text-on-surface">
                    {planLabel(row.variant)}
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">
                    {[row.neetScore, row.neetCategory]
                      .filter((v) => v != null && String(v).trim())
                      .join(" · ") || "—"}
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">
                    {getLeadQuota(row.rawPayload) || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-bold ${
                        purchased
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-amber-200 bg-amber-50 text-amber-900"
                      }`}
                    >
                      {purchased
                        ? `Purchased · ${formatDateTime(row.planPurchasedAt)}`
                        : "Pending"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {data && data.total > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-on-surface-variant">
          <p>
            Showing {(page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, data.total)} of {data.total}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-xl border border-outline-variant px-3 py-1.5 font-semibold text-on-surface disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-2 py-1.5">
              Page {page} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-xl border border-outline-variant px-3 py-1.5 font-semibold text-on-surface disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}

      {(selectedId || detailLoading) && (
        <AdminLeadDetail
          lead={selectedLead}
          loading={detailLoading}
          onClose={() => {
            setSelectedId(null);
            setSelectedLead(null);
          }}
          onLeadUpdated={(updated) => {
            setSelectedLead(updated);
            void loadPlans();
          }}
        />
      )}

      <AdminConfirmDialog
        open={broadcastConfirmOpen}
        title="Send counselling alert on WhatsApp?"
        description={
          noticePreview?.notice ? (
            <div className="space-y-2">
              <p className="font-semibold text-on-surface">
                “{noticePreview.notice.title}”
              </p>
              <ul className="list-disc space-y-0.5 pl-4">
                <li>
                  Unique purchased numbers: {noticePreview.recipientCount}
                </li>
                <li>Already sent: {noticePreview.alreadySentCount}</li>
                <li>
                  Will attempt:{" "}
                  {Math.max(
                    0,
                    noticePreview.recipientCount -
                      noticePreview.alreadySentCount,
                  )}
                </li>
              </ul>
            </div>
          ) : null
        }
        confirmLabel="Send alert"
        busy={broadcastBusy}
        onConfirm={() => void broadcastLatestNotice()}
        onCancel={() => setBroadcastConfirmOpen(false)}
      />
    </div>
  );
}
