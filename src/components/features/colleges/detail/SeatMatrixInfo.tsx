"use client";

import { useEffect, useState } from "react";
import type { CollegeSeatMatrix } from "@/types/college";
import { formatNumber } from "@/lib/utils";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import { DetailSectionHeader } from "@/components/features/colleges/shared/DetailSectionHeader";
import { DetailPanel } from "@/components/features/colleges/shared/DetailPanel";

interface SeatMatrixInfoProps {
  seatMatrix: CollegeSeatMatrix;
}

type QuotaChartPoint = {
  name: string;
  value: number;
  color: string;
  percentage: number;
};

type CategoryChartPoint = {
  name: string;
  seats: number;
  percentage: number;
  color: string;
};

/** Distinct quota slice colors — primary / secondary scale only */
const QUOTA_SLICE_COLORS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-primary-hover)",
  "var(--color-on-secondary-container)",
  "var(--color-secondary-fixed-dim)",
  "var(--color-primary-fixed-dim)",
] as const;

function formatCategoryLabel(raw: string): string {
  return raw.toUpperCase();
}

function getCategoryBarColor(catName: string): string {
  const name = catName.toLowerCase();
  if (name.includes("open") || name.includes("gen") || name === "op") {
    return "var(--color-primary)";
  }
  if (name === "sc") {
    return "var(--color-secondary)";
  }
  if (name === "st") {
    return "var(--color-primary-hover)";
  }
  if (name.includes("obc") || name.includes("sebc") || name === "se") {
    return "var(--color-on-secondary-container)";
  }
  if (name === "ews") {
    return "var(--color-surface-tint)";
  }
  if (name.includes("pwd")) {
    return "var(--color-secondary-fixed-dim)";
  }
  if (name.includes("sainik")) {
    return "var(--color-on-secondary-container)";
  }
  if (name.includes("freedom") || name === "ff") {
    return "var(--color-secondary-fixed-dim)";
  }
  if (name.includes("govt school") || name === "gs") {
    return "var(--color-primary-fixed-dim)";
  }
  return "var(--color-outline)";
}

function CategorySeatRows({ rows }: { rows: CategoryChartPoint[] }) {
  return (
    <ul className="grid grid-cols-[minmax(5rem,6.25rem)_minmax(0,1fr)_8.25rem] items-center gap-x-4 gap-y-5 sm:grid-cols-[6.5rem_minmax(0,1fr)_8.75rem] sm:gap-x-5">
      {rows.map((row) => (
        <li key={row.name} className="contents">
          <span className="text-right text-[11px] font-bold uppercase leading-snug tracking-wide text-on-surface-variant sm:text-xs [text-wrap:balance]">
            {formatCategoryLabel(row.name)}
          </span>
          <div
            className="h-3.5 w-full min-w-0 overflow-hidden rounded-full bg-surface-container-high sm:h-4"
            role="presentation"
          >
            <div
              className="h-full min-w-[3px] rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
              style={{
                width: `${Math.min(100, Math.max(row.percentage, row.seats > 0 ? 2 : 0))}%`,
                backgroundColor: row.color,
              }}
            />
          </div>
          <div className="text-right tabular-nums leading-tight whitespace-nowrap">
            <span className="text-sm font-extrabold text-on-surface sm:text-base">
              {formatNumber(row.seats)}
            </span>
            <span className="ml-1 text-[11px] font-semibold text-on-surface-variant sm:text-xs">
              seats
            </span>
            <span className="ml-2 text-[11px] font-semibold text-primary sm:text-xs">
              {row.percentage.toFixed(1)}%
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CustomQuotaTooltip({
  active,
  payload,
}: TooltipContentProps) {
  if (active && payload && payload.length > 0) {
    const entry = payload[0];
    const data = entry.payload as QuotaChartPoint | undefined;
    if (!data) return null;
    return (
      <div className="border border-border p-3 rounded-xl flex flex-col gap-0.5 bg-surface-container-lowest shadow-level-2 z-50 animate-fadeIn">
        <div className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span className="text-[9px] font-bold uppercase tracking-wider text-text-secondary">
            {entry.name}
          </span>
        </div>
        <div className="text-sm font-extrabold text-text mt-0.5">
          {formatNumber(Number(entry.value ?? 0))}{" "}
          <span className="text-xs font-normal text-text-muted">Seats</span>
        </div>
        <span className="text-[9px] text-text-muted font-medium">
          Share: {data.percentage.toFixed(1)}%
        </span>
      </div>
    );
  }
  return null;
}

export function SeatMatrixInfo({ seatMatrix }: SeatMatrixInfoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Setup quota colors from theme scale (one distinct color per slice)
  const quotaDefs = [
    { label: "All India Quota (AIQ)", value: seatMatrix.aiq },
    { label: "GOI Quota", value: seatMatrix.goiQuota },
    { label: "State Quota", value: seatMatrix.stateQuota },
    { label: "ESIC Quota", value: seatMatrix.esic },
    { label: "Management", value: seatMatrix.management },
    { label: "NRI Quota", value: seatMatrix.nri },
    { label: "Institutional (IQ)", value: seatMatrix.iqQuota },
  ].filter((q) => q.value > 0);

  const quotas = quotaDefs.map((q, index) => ({
    ...q,
    color: QUOTA_SLICE_COLORS[index % QUOTA_SLICE_COLORS.length],
  }));

  const activeQuotas = quotas.filter((q) => q.value > 0);

  const totalQuotaSeats = activeQuotas.reduce((sum, q) => sum + q.value, 0);
  const totalCategorySeats = Object.values(
    seatMatrix.categoryDistribution,
  ).reduce((sum, val) => sum + val, 0);

  /** Categories (Open, SC, …) subdivide state or AIQ pools — not the full institute intake. */
  const categoryShareBase =
    seatMatrix.stateQuota > 0
      ? seatMatrix.stateQuota
      : seatMatrix.aiq > 0
        ? seatMatrix.aiq
        : totalCategorySeats;

  const hasQuotaData = totalQuotaSeats > 0;
  const hasCategoryData = totalCategorySeats > 0;
  const hasAnyData = hasQuotaData || hasCategoryData;

  // Check if AIQ represents 100% of the quota seats
  const isAiq100 =
    seatMatrix.aiq > 0 &&
    (seatMatrix.aiq === totalQuotaSeats ||
      (seatMatrix.stateQuota === 0 &&
        seatMatrix.goiQuota === 0 &&
        seatMatrix.iqQuota === 0 &&
        seatMatrix.esic === 0 &&
        seatMatrix.management === 0 &&
        seatMatrix.nri === 0));

  // Prepare chart data for Quota Distribution Donut Chart
  const quotaChartData = activeQuotas.map((q) => {
    const pct = totalQuotaSeats > 0 ? (q.value / totalQuotaSeats) * 100 : 0;
    return {
      name: q.label,
      value: q.value,
      color: q.color,
      percentage: pct
    };
  });

  // Prepare chart data for Category-wise seats horizontal bar chart
  const categoryChartData = Object.entries(
    seatMatrix.categoryDistribution,
  ).map(([category, count]) => {
    const percentage =
      categoryShareBase > 0 ? (count / categoryShareBase) * 100 : 0;
    return {
      name: category.toUpperCase(),
      seats: count,
      percentage,
      color: getCategoryBarColor(category),
    };
  });

  const categoryScopeLabel = isAiq100
    ? "Within AIQ"
    : seatMatrix.stateQuota > 0
      ? "Within state quota"
      : "Categories";

  return (
    <section className="flex flex-col gap-6 animate-fadeIn">
      {/* Reusable Section Header */}
      <DetailSectionHeader
        eyebrow="Intake"
        title="Seat matrix"
        description="Quota split (AIQ, state, management, NRI) and category reservation within the state pool"
        icon="pie_chart"
      />

      {!hasAnyData ? (
        <DetailPanel className="flex flex-col items-center justify-center gap-3 py-14 text-center">
          <div className="rounded-full bg-secondary-container/30 p-3 text-secondary">
            <span className="material-symbols-outlined text-3xl" aria-hidden>
              groups
            </span>
          </div>
          <h3 className="text-base font-bold text-text">
            Seat Allocation Data Not Available
          </h3>
          <p className="max-w-md text-xs leading-relaxed text-text-muted">
            Detailed seat allocation statistics, category distributions, and quota divisions are currently not available in our records for this college. Please refer to official counseling brochures for current intake details.
          </p>
        </DetailPanel>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <DetailPanel bodyClassName="flex flex-col gap-4">
            <h3 className="font-extrabold text-lg text-text">Quota Distribution</h3>

            {hasQuotaData ? (
              <div className="flex flex-col items-center gap-6 py-2">
                {/* Interactive Donut Chart (Top Side) */}
                <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    <span className="text-3xl font-black tracking-tight text-text">
                      {formatNumber(totalQuotaSeats)}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-0.5">
                      Total
                    </span>
                  </div>

                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={quotaChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={2}
                          stroke="var(--color-surface-container-lowest)"
                          strokeWidth={2}
                          dataKey="value"
                        >
                          {quotaChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              className="focus:outline-none transition-all duration-300 hover:opacity-90 cursor-pointer"
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          content={CustomQuotaTooltip}
                          cursor={false}
                          wrapperStyle={{ zIndex: 1000, outline: "none" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs font-semibold text-text-muted animate-pulse">
                      Loading...
                    </div>
                  )}
                </div>

                {/* Legend List (Bottom Side - Stacked chips) */}
                <div className="flex flex-col gap-4 w-full border-t border-border/60 pt-5">
                  {quotaChartData.map((quota, idx) => {
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low/20 border border-border/40 hover:border-brand-300 hover:bg-surface-container-low/40 transition-all duration-300 shadow-xs"
                      >
                        <div className="flex items-center gap-2.5 text-on-surface-variant font-bold text-xs md:text-sm">
                          <span
                            className="h-3.5 w-3.5 rounded-full flex-shrink-0 ring-2 ring-surface-container-lowest"
                            style={{ backgroundColor: quota.color }}
                          />
                          <span>{quota.name}</span>
                        </div>
                        <div className="shrink-0 text-right tabular-nums">
                          <span className="font-extrabold text-on-surface text-sm md:text-base">
                            {formatNumber(quota.value)}
                          </span>
                          <span className="ml-1.5 text-xs font-semibold text-primary">
                            {quota.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
                <span className="text-xs font-bold text-text-secondary">
                  Quota Allocation Not Available
                </span>
                <p className="text-[11px] max-w-xs text-text-muted">
                  Specific quota division data is not recorded for this institution.
                </p>
              </div>
            )}
          </DetailPanel>

          <DetailPanel bodyClassName="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-extrabold text-lg text-text">Category-wise Seats</h3>
              {hasCategoryData && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border shadow-xs bg-surface-container-low text-text-muted border-border">
                  {categoryScopeLabel}
                </span>
              )}
            </div>

            {hasCategoryData ? (
              <div className="pt-2">
                {mounted ? (
                  <CategorySeatRows rows={categoryChartData} />
                ) : (
                  <div className="flex min-h-[12rem] w-full items-center justify-center text-xs font-semibold text-text-muted animate-pulse">
                    Loading category breakdown...
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
                <span className="text-xs font-bold text-text-secondary">
                  Category Distribution Not Available
                </span>
                <p className="text-[11px] max-w-xs text-text-muted">
                  Detailed reservation/category-wise seat allocation is not recorded.
                </p>
              </div>
            )}
          </DetailPanel>
        </div>
      )}
    </section>
  );
}
