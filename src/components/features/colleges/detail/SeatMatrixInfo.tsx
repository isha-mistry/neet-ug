"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
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
import { getStateConfig } from "@/lib/colleges/state-config";
import {
  applyNetStateQuotaDisplay,
  hasSplitSeatCounselling,
  isMccOnlySeatMatrix,
} from "@/lib/catalog/seat-matrix-from-snapshot";
import { useCounsellingScope } from "@/components/features/colleges/detail/CounsellingScopeContext";

interface SeatMatrixInfoProps {
  seatMatrix: CollegeSeatMatrix;
  mccSeatMatrix?: CollegeSeatMatrix;
  /** State slug — drives how quota groups are labelled and composed in the donut chart. */
  stateSlug?: string;
  /** Official seat increase for 2026–27 (when available). */
  seatsIncreased?: number;
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

type CategorySection = {
  id: string;
  title: string;
  scopeLabel: string;
  poolSeats: number;
  rows: CategoryChartPoint[];
};

function stripAiqPrefix(label: string): string {
  return label.replace(/^AIQ\s+/i, "").trim();
}

/** Prefer split distributions; fall back to partitioning merged legacy data. */
function resolveCategorySections(
  seatMatrix: CollegeSeatMatrix,
): CategorySection[] {
  let aiqDist = seatMatrix.aiqCategoryDistribution ?? {};
  let stateDist = seatMatrix.stateCategoryDistribution ?? {};
  const mccOnly = isMccOnlySeatMatrix(seatMatrix);
  const split = hasSplitSeatCounselling(seatMatrix);

  if (
    Object.keys(aiqDist).length === 0 &&
    Object.keys(stateDist).length === 0 &&
    Object.keys(seatMatrix.categoryDistribution).length > 0
  ) {
    aiqDist = {};
    stateDist = {};
    for (const [label, count] of Object.entries(seatMatrix.categoryDistribution)) {
      if (count <= 0) continue;
      const upper = label.toUpperCase();
      if (upper === "AIQ") continue;
      if (mccOnly || upper.startsWith("AIQ ")) {
        aiqDist[stripAiqPrefix(label)] = count;
      } else {
        stateDist[label] = count;
      }
    }
  } else {
    aiqDist = Object.fromEntries(
      Object.entries(aiqDist).map(([label, count]) => [
        stripAiqPrefix(label),
        count,
      ]),
    );
  }

  const toRows = (
    distribution: Record<string, number>,
    poolSeats: number,
  ): CategoryChartPoint[] =>
    Object.entries(distribution)
      .filter(([, count]) => count > 0)
      .map(([category, count]) => {
        const percentage =
          poolSeats > 0 ? (count / poolSeats) * 100 : 0;
        return {
          name: category,
          seats: count,
          percentage,
          color: getCategoryBarColor(category),
        };
      })
      .sort((a, b) => b.seats - a.seats || a.name.localeCompare(b.name));

  const sections: CategorySection[] = [];

  const aiqPool =
    seatMatrix.aiq > 0
      ? seatMatrix.aiq
      : Object.values(aiqDist).reduce((s, n) => s + n, 0);
  const aiqRows = toRows(aiqDist, aiqPool);
  if (aiqRows.length > 0) {
    sections.push({
      id: "aiq",
      title: "AIQ reservation split",
      scopeLabel: `Within AIQ · ${formatNumber(aiqPool)} seats`,
      poolSeats: aiqPool,
      rows: aiqRows,
    });
  }

  const statePool =
    seatMatrix.stateQuota > 0
      ? seatMatrix.stateQuota
      : Object.values(stateDist).reduce((s, n) => s + n, 0);
  const stateRows = toRows(stateDist, statePool);
  if (stateRows.length > 0 && (split || !mccOnly)) {
    sections.push({
      id: "state",
      title: "State quota reservation split",
      scopeLabel: `Within state quota · ${formatNumber(statePool)} seats`,
      poolSeats: statePool,
      rows: stateRows,
    });
  }

  return sections;
}


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

function CategorySeatRows({
  rows,
  dense = false,
}: {
  rows: CategoryChartPoint[];
  dense?: boolean;
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-[4rem_minmax(0,1fr)_5.25rem] items-center gap-x-4 sm:grid-cols-[6.5rem_minmax(0,1fr)_8.75rem] sm:gap-x-5",
        dense ? "gap-y-2.5" : "gap-y-4",
      )}
    >
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

export function SeatMatrixInfo({
  seatMatrix,
  mccSeatMatrix,
  stateSlug,
  seatsIncreased,
}: SeatMatrixInfoProps) {
  const scope = useCounsellingScope();
  const activeMatrix = useMemo(() => {
    if (scope?.authority === "mcc" && mccSeatMatrix) return mccSeatMatrix;
    const matrix = seatMatrix ?? mccSeatMatrix!;
    return scope?.authority === "state" || !mccSeatMatrix
      ? applyNetStateQuotaDisplay(matrix)
      : matrix;
  }, [scope?.authority, seatMatrix, mccSeatMatrix]);
  /** ESIC follows the active counselling snapshot — do not cross-merge state ↔ MCC. */
  const activeEsicSeats = activeMatrix.esic ?? 0;
  const [mounted, setMounted] = useState(false);
  const [quotaPanelHeight, setQuotaPanelHeight] = useState<number | undefined>(
    undefined,
  );
  const quotaPanelRef = useRef<HTMLDivElement>(null);
  const stateConfig = getStateConfig(stateSlug);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const quotaGroups = useMemo(() => {
    const groups = stateConfig.seatQuotaGroups;
    const esicGroup =
      groups.find((group) => group.fields.includes("esic")) ??
      ({
        label: "ESIC Quota",
        fields: ["esic"],
        color: "var(--color-primary-fixed-dim)",
      } as (typeof groups)[number]);

    let filtered = groups;
    if (scope?.showToggle) {
      if (scope.authority === "mcc") {
        // Same pools as state counselling where present on the MCC matrix:
        // AIQ open + NRI + Management (+ Karnataka virtual keys) + ESIC.
        filtered = groups.filter((group) =>
          group.fields.some(
            (field) =>
              field === "aiq" ||
              field === "nri" ||
              field === "management" ||
              field === "karnatakaNri" ||
              field === "karnatakaMgt" ||
              (field === "esic" && activeEsicSeats > 0),
          ),
        );
      } else {
        filtered = groups.filter((group) =>
          group.fields.some(
            (field) =>
              field !== "aiq" &&
              (field !== "esic" || activeEsicSeats > 0),
          ),
        );
      }
    }

    // Ensure ESIC is chartable when this snapshot has seats but config omitted the group.
    if (
      activeEsicSeats > 0 &&
      !filtered.some((group) => group.fields.includes("esic"))
    ) {
      filtered = [...filtered, esicGroup];
    }

    return filtered;
  }, [scope, stateConfig.seatQuotaGroups, activeEsicSeats]);

  // Build quota slices from state config groups
  const quotaDefs = quotaGroups
    .map((group) => {
      const total = group.fields.reduce((sum, field) => {
        const val = (activeMatrix as unknown as Record<string, number>)[field];
        return sum + (typeof val === "number" ? val : 0);
      }, 0);
      return { label: group.label, value: total, color: group.color };
    })
    .filter((q) => q.value > 0);

  const quotas = quotaDefs.map((q) => ({ ...q, name: q.label }));

  const activeQuotas = quotas.filter((q) => q.value > 0);

  const totalQuotaSeats = activeQuotas.reduce((sum, q) => sum + q.value, 0);
  const categorySections = useMemo(() => {
    const sections = resolveCategorySections(activeMatrix);
    const authority =
      scope?.authority ?? (isMccOnlySeatMatrix(activeMatrix) ? "mcc" : "state");
    if (!scope?.showToggle) {
      return sections.filter((section) =>
        authority === "mcc" ? section.id === "aiq" : section.id === "state",
      );
    }
    if (authority === "mcc") {
      return sections.filter((section) => section.id === "aiq");
    }
    return sections.filter((section) => section.id === "state");
  }, [activeMatrix, scope]);

  const hasQuotaData = totalQuotaSeats > 0;
  const hasCategoryData = categorySections.length > 0;
  const hasAnyData = hasQuotaData || hasCategoryData;

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

  const denseCategoryRows =
    categorySections.reduce((sum, section) => sum + section.rows.length, 0) > 10;

  useEffect(() => {
    if (!hasQuotaData) {
      setQuotaPanelHeight(undefined);
      return;
    }

    const syncQuotaHeight = () => {
      const quotaEl = quotaPanelRef.current;
      if (!quotaEl) return;
      setQuotaPanelHeight(Math.round(quotaEl.getBoundingClientRect().height));
    };

    syncQuotaHeight();

    const quotaEl = quotaPanelRef.current;
    if (!quotaEl) return;

    const observer = new ResizeObserver(syncQuotaHeight);
    observer.observe(quotaEl);
    window.addEventListener("resize", syncQuotaHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncQuotaHeight);
    };
  }, [hasQuotaData, mounted, quotaChartData.length]);

  const showSplitCategoryHeader = categorySections.length > 1;

  return (
    <section className="flex flex-col gap-6 animate-fadeIn">

      <DetailSectionHeader
        eyebrow="Intake"
        title="Seat matrix"
        description="Quota split (AIQ, ESIC, state, management, NRI) and reservation breakdown within each quota pool"
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
            Detailed seat allocation statistics, category distributions, and quota divisions are currently not available in our records for this college. Please refer to official counselling brochures for current intake details.
          </p>
        </DetailPanel>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div ref={quotaPanelRef} className="w-full self-start">
            <DetailPanel bodyClassName="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-extrabold text-lg text-text">Quota Distribution</h3>
                {seatsIncreased && seatsIncreased > 0 ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-tertiary-fixed px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-tertiary shadow-xs">
                    <span className="material-symbols-outlined text-sm" aria-hidden>
                      trending_up
                    </span>
                    +{formatNumber(seatsIncreased)} seats for 2026–27
                  </span>
                ) : null}
              </div>

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
          </div>

          <DetailPanel
            className="flex w-full flex-col self-start"
            style={
              quotaPanelHeight != null && hasCategoryData
                ? { maxHeight: quotaPanelHeight }
                : undefined
            }
            bodyClassName="flex min-h-0 flex-col gap-4 overflow-hidden"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border pb-3">
              <h3 className="font-extrabold text-lg text-text">Category-wise Seats</h3>
              {!showSplitCategoryHeader && categorySections[0] && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border shadow-xs bg-surface-container-low text-text-muted border-border">
                  {categorySections[0].scopeLabel}
                </span>
              )}
            </div>

            {hasCategoryData ? (
              <div
                className={cn(
                  "min-h-0 flex-1 overflow-y-auto overscroll-contain pt-2 pr-1",
                  quotaPanelHeight != null &&
                  "scrollbar-thin [scrollbar-color:var(--color-outline-variant)_transparent]",
                )}
              >
                {mounted ? (
                  <div
                    className={cn(
                      "flex flex-col",
                      showSplitCategoryHeader ? "gap-6" : "gap-2",
                    )}
                  >
                    {categorySections.map((section, sectionIndex) => (
                      <div key={section.id} className="flex flex-col gap-3">
                        {showSplitCategoryHeader && (
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="text-sm font-bold text-on-surface">
                              {section.title}
                            </h4>
                            <span className="shrink-0 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border shadow-xs bg-surface-container-low text-text-muted border-border">
                              {section.scopeLabel}
                            </span>
                          </div>
                        )}
                        <CategorySeatRows
                          rows={section.rows}
                          dense={denseCategoryRows}
                        />
                        {showSplitCategoryHeader &&
                          sectionIndex < categorySections.length - 1 && (
                            <div className="border-b border-border/60" />
                          )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-24 w-full items-center justify-center text-xs font-semibold text-text-muted animate-pulse">
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
