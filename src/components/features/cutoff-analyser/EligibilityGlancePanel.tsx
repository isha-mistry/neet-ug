"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import india, {
  INDIA_MAP_BANNER_SCALE,
  INDIA_MAP_CENTER,
  INDIA_MAP_HEIGHT,
  INDIA_MAP_WIDTH,
} from "@/lib/maps/india-topology";
import { stateSlugFromMapName } from "@/lib/maps/state-geo-keys";
import { formatNumber, cn, formatINR } from "@/lib/utils";
import type { StateEligibility, StateQuotaRow, CollegeMatch } from "@/lib/cutoff-analyser/types";
import type { ListingQuota } from "@/types/filters";
import type { FocusStateSlug } from "@/lib/cutoff-analyser/constants";
import { FOCUS_STATE_SLUGS } from "@/lib/cutoff-analyser/constants";
import { compareCutoffStatus } from "@/lib/cutoff-analyser/status";
import {
  MAP_FILL,
  STATUS_BADGE_CLASS,
  STATUS_LABEL,
  STATUS_ROW_CLASS,
} from "./section-styles";
import { CutoffStatusBadge } from "./CutoffAnalyserParts";

interface EligibilityGlanceContext {
  referenceYear: number;
  quota: ListingQuota;
  domicileState?: FocusStateSlug;
  quotaLabel: string;
  categoryLabel: string;
  stateQuotaRows: StateQuotaRow[];
  collegeMatches: CollegeMatch[];
}

interface StateTooltipExtra {
  quotaRow: StateQuotaRow | undefined;
  otherQuotas: StateQuotaRow[];
  matchCount: number;
  safeCount: number;
  borderlineCount: number;
  topMatch: CollegeMatch | null;
  feeMin: number | null;
  feeMax: number | null;
  totalSeats: number;
}

function buildStateTooltipExtra(
  stateSlug: FocusStateSlug,
  ctx: EligibilityGlanceContext,
): StateTooltipExtra {
  const inState = ctx.collegeMatches.filter((m) => m.college.stateSlug === stateSlug);
  const fees = inState
    .map((m) => m.college.totalAnnualFee)
    .filter((f) => f > 0);
  const topMatch =
    inState.length > 0
      ? inState.reduce((best, m) =>
          m.likelihoodPercent > best.likelihoodPercent ? m : best,
        )
      : null;

  const targetQuota = ctx.domicileState && stateSlug !== ctx.domicileState && ctx.quota === "state"
    ? "aiq"
    : ctx.quota;

  return {
    quotaRow: ctx.stateQuotaRows.find(
      (r) => r.stateSlug === stateSlug && r.quota === targetQuota,
    ),
    otherQuotas: ctx.stateQuotaRows.filter(
      (r) => r.stateSlug === stateSlug && r.quota !== targetQuota,
    ),
    matchCount: inState.length,
    safeCount: inState.filter((m) => m.status === "safe").length,
    borderlineCount: inState.filter((m) => m.status === "borderline").length,
    topMatch,
    feeMin: fees.length ? Math.min(...fees) : null,
    feeMax: fees.length ? Math.max(...fees) : null,
    totalSeats: inState.reduce((sum, m) => sum + m.college.seatCount, 0),
  };
}

function gapSummary(gap: number | null): string {
  if (gap == null) return "—";
  if (gap >= 0) return `${formatNumber(gap)} ranks better than closing`;
  return `${formatNumber(Math.abs(gap))} ranks below closing`;
}

function TooltipMetricRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex justify-between gap-3 tabular-nums">
      <dt className="text-on-surface-variant">{label}</dt>
      <dd className={cn("font-semibold text-on-surface", valueClassName)}>{value}</dd>
    </div>
  );
}

function StateEligibilityMapTooltip({
  row,
  muted,
  extra,
  context,
}: {
  row: StateEligibility;
  muted: boolean;
  extra: StateTooltipExtra;
  context: EligibilityGlanceContext;
}) {
  const gapText = gapSummary(row.gapToUser);
  const gapPositive = row.gapToUser != null && row.gapToUser >= 0;

  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-on-surface">{row.stateName}</p>
          <p className="mt-0.5 text-[10px] leading-snug text-on-surface-variant">
            {context.categoryLabel} · {context.quotaLabel} · {context.referenceYear} cutoffs
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-primary-fixed px-2 py-0.5 text-[10px] font-bold text-primary">
          {row.stateAbbrev}
        </span>
      </div>

      {muted ? (
        <p className="mt-2 text-xs text-on-surface-variant">
          Limited eligibility without domicile — state quota may not apply.
        </p>
      ) : null}

      <dl className="mt-2.5 space-y-1 border-t border-outline-variant/40 pt-2.5 text-[11px]">
        <TooltipMetricRow label="Your AIR" value={formatNumber(row.userRank)} />
        {extra.quotaRow ? (
          <>
            <TooltipMetricRow
              label="Opening rank"
              value={
                extra.quotaRow.openingRank != null
                  ? formatNumber(extra.quotaRow.openingRank)
                  : "—"
              }
            />
            <TooltipMetricRow
              label={`Closing (${context.quotaLabel})`}
              value={
                extra.quotaRow.closingRank != null
                  ? formatNumber(extra.quotaRow.closingRank)
                  : "—"
              }
            />
          </>
        ) : (
          <TooltipMetricRow
            label="Closing (catalog pool)"
            value={row.closingRank ? formatNumber(row.closingRank) : "—"}
          />
        )}
        {!muted ? (
          <TooltipMetricRow
            label="Rank cushion"
            value={gapText}
            valueClassName={gapPositive ? "text-college-type-government-fg" : "text-error"}
          />
        ) : null}
      </dl>

      {!muted && extra.matchCount > 0 ? (
        <div className="mt-2.5 space-y-1 border-t border-outline-variant/40 pt-2.5 text-[11px] text-on-surface-variant">
          <p>
            <span className="font-semibold text-on-surface">{extra.matchCount}</span> colleges
            matched ·{" "}
            <span className="font-semibold text-college-type-government-fg">{extra.safeCount}</span>{" "}
            safe
            {extra.borderlineCount > 0 ? (
              <>
                {" "}
                ·{" "}
                <span className="font-semibold text-amber-700">{extra.borderlineCount}</span>{" "}
                borderline
              </>
            ) : null}
          </p>
          {extra.totalSeats > 0 ? (
            <p>{formatNumber(extra.totalSeats)} seats across matched colleges</p>
          ) : null}
          {extra.feeMin != null && extra.feeMax != null ? (
            <p>
              Annual fee{" "}
              {extra.feeMin === extra.feeMax
                ? formatINR(extra.feeMin, { compact: true })
                : `${formatINR(extra.feeMin, { compact: true })} – ${formatINR(extra.feeMax, { compact: true })}`}
            </p>
          ) : null}
          {extra.topMatch ? (
            <p className="line-clamp-2 leading-snug">
              <span className="font-semibold text-on-surface">Top fit:</span>{" "}
              {extra.topMatch.college.name}{" "}
              <span className="tabular-nums text-primary">
                ({extra.topMatch.likelihoodPercent}% likely)
              </span>
            </p>
          ) : null}
        </div>
      ) : null}

      {!muted && extra.otherQuotas.length > 0 ? (
        <dl className="mt-2 space-y-0.5 border-t border-outline-variant/40 pt-2 text-[10px] text-on-surface-variant">
          <dt className="font-semibold uppercase tracking-wide text-outline">Other quotas</dt>
          {extra.otherQuotas.map((q) => (
            <div key={q.quota} className="flex justify-between gap-2 tabular-nums">
              <dd>{q.quotaLabel}</dd>
              <dt className="font-medium text-on-surface">
                {q.closingRank != null ? formatNumber(q.closingRank) : "—"}
              </dt>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <CutoffStatusBadge status={row.status} />
        {extra.quotaRow ? (
          <span className="text-[10px] font-medium text-on-surface-variant">
            {STATUS_LABEL[extra.quotaRow.status]} in {context.quotaLabel}
          </span>
        ) : null}
      </div>
    </>
  );
}

interface EligibilityStatesMapProps {
  eligibility: StateEligibility[];
  selectedSlug?: FocusStateSlug | null;
  onSelectState?: (slug: FocusStateSlug) => void;
  mutedStateSlugs?: FocusStateSlug[];
  glanceContext?: EligibilityGlanceContext;
  className?: string;
}

interface MapTooltip {
  row: StateEligibility;
  muted: boolean;
  clientX: number;
  clientY: number;
}

function placeMapTooltip(
  clientX: number,
  clientY: number,
  width: number,
  height: number,
): { left: number; top: number; transform: string } {
  const pad = 12;
  const gap = 14;
  const w = width;
  const h = height;

  let left = clientX + gap;
  if (left + w > window.innerWidth - pad) {
    left = clientX - w - gap;
  }
  left = Math.max(pad, Math.min(left, window.innerWidth - w - pad));

  const fitsAbove = clientY - gap - h >= pad;
  const fitsBelow = clientY + gap + h <= window.innerHeight - pad;
  const preferAbove = clientY < window.innerHeight * 0.55;

  if (fitsAbove && (preferAbove || !fitsBelow)) {
    return { left, top: clientY - gap, transform: "translateY(-100%)" };
  }
  if (fitsBelow) {
    return { left, top: clientY + gap, transform: "none" };
  }

  const top = Math.max(pad, Math.min(clientY + gap, window.innerHeight - h - pad));
  return { left, top, transform: "none" };
}

function hoverFill(
  slug: FocusStateSlug | undefined,
  row: StateEligibility | undefined,
  muted: boolean
): string {
  if (muted || !row) return "var(--color-outline-variant)";
  switch (row.status) {
  case "safe":
    return "var(--color-tertiary-fixed)";
  case "borderline":
    return "#fde68a"; // amber-200
  case "out":
    return "var(--color-error-container)";
  default:
    return MAP_FILL.muted;
  }
}

export function EligibilityStatesMap({
  eligibility,
  selectedSlug,
  onSelectState,
  mutedStateSlugs = [],
  glanceContext,
  className,
}: EligibilityStatesMapProps) {
  const mapRootRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipCoords, setTooltipCoords] = useState<{
    left: number;
    top: number;
    transform: string;
  } | null>(null);
  const bySlug = useMemo(
    () => new Map(eligibility.map((e) => [e.stateSlug, e])),
    [eligibility]
  );

  const [tooltip, setTooltip] = useState<MapTooltip | null>(null);
  const focusSet = useMemo(() => new Set<string>(FOCUS_STATE_SLUGS), []);
  const mutedSet = useMemo(() => new Set(mutedStateSlugs), [mutedStateSlugs]);

  function fillForSlug(slug: string | undefined): string {
    if (!slug || !focusSet.has(slug)) return MAP_FILL.muted;
    if (mutedSet.has(slug as FocusStateSlug)) return MAP_FILL.muted;
    const row = bySlug.get(slug as FocusStateSlug);
    if (!row) return MAP_FILL.muted;
    return MAP_FILL[row.status];
  }

  const tooltipExtra = useMemo(() => {
    if (!tooltip || !glanceContext) return null;
    return buildStateTooltipExtra(tooltip.row.stateSlug, glanceContext);
  }, [tooltip, glanceContext]);

  useLayoutEffect(() => {
    if (!tooltip || !tooltipRef.current) {
      setTooltipCoords(null);
      return;
    }
    const { offsetWidth, offsetHeight } = tooltipRef.current;
    setTooltipCoords(
      placeMapTooltip(tooltip.clientX, tooltip.clientY, offsetWidth, offsetHeight),
    );
  }, [tooltip, tooltipExtra]);

  function onPointer(
    event: MouseEvent<SVGPathElement>,
    slug: string | undefined
  ) {
    if (!slug || !focusSet.has(slug)) {
      setTooltip(null);
      return;
    }
    const row = bySlug.get(slug as FocusStateSlug);
    if (!row) return;
    setTooltip({
      row,
      muted: mutedSet.has(slug as FocusStateSlug),
      clientX: event.clientX,
      clientY: event.clientY,
    });
  }

  const tooltipContent = tooltip ? (
    <div
      ref={tooltipRef}
      role="tooltip"
      className="pointer-events-none fixed z-[1200] w-[min(300px,calc(100vw-1.5rem))] rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3.5 py-3 shadow-lg"
      style={{
        left: tooltipCoords?.left ?? tooltip.clientX + 14,
        top: tooltipCoords?.top ?? tooltip.clientY,
        transform: tooltipCoords?.transform ?? "translateY(-100%)",
        visibility: tooltipCoords ? "visible" : "hidden",
      }}
    >
      {glanceContext && tooltipExtra ? (
        <StateEligibilityMapTooltip
          row={tooltip.row}
          muted={tooltip.muted}
          extra={tooltipExtra}
          context={glanceContext}
        />
      ) : (
        <>
          <p className="text-sm font-semibold text-on-surface">
            {tooltip.row.stateName}
          </p>
          {tooltip.muted ? (
            <p className="mt-1 text-xs text-on-surface-variant">
              Limited eligibility without domicile
            </p>
          ) : (
            <dl className="mt-2 space-y-1 text-xs text-on-surface-variant">
              <TooltipMetricRow
                label="Closing rank"
                value={
                  tooltip.row.closingRank
                    ? formatNumber(tooltip.row.closingRank)
                    : "—"
                }
              />
              <TooltipMetricRow
                label="Your rank"
                value={formatNumber(tooltip.row.userRank)}
              />
              <TooltipMetricRow
                label="Rank cushion"
                value={gapSummary(tooltip.row.gapToUser)}
              />
            </dl>
          )}
          <div className="mt-2">
            <CutoffStatusBadge status={tooltip.row.status} />
          </div>
        </>
      )}
    </div>
  ) : null;

  return (
    <div
      className={cn(
        "ca-map-shell relative flex min-h-[280px] flex-col justify-center overflow-visible",
        className,
      )}
    >
      <p className="pointer-events-none absolute left-4 top-3 z-10 text-[10px] font-bold uppercase tracking-[0.14em] text-outline">
        India · focus states
      </p>

      <div
        ref={mapRootRef}
        className="relative w-full px-3 pb-3 pt-11 sm:px-5"
        onMouseLeave={() => setTooltip(null)}
      >
        <ComposableMap
          projection="geoMercator"
          width={INDIA_MAP_WIDTH}
          height={INDIA_MAP_HEIGHT}
          projectionConfig={{
            scale: INDIA_MAP_BANNER_SCALE,
            center: INDIA_MAP_CENTER,
          }}
          className="block w-full [&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:max-h-[min(38vh,22rem)] [&_svg]:w-full"
        >
          <Geographies geography={india}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { ST_NM } = geo.properties as { ST_NM?: string };
                const slug = stateSlugFromMapName(ST_NM);
                const inFocus = Boolean(slug && focusSet.has(slug));
                const focusSlug = slug as FocusStateSlug | undefined;
                const row = focusSlug ? bySlug.get(focusSlug) : undefined;
                const isMuted = Boolean(focusSlug && mutedSet.has(focusSlug));
                const isSelected = Boolean(focusSlug && focusSlug === selectedSlug);
                const defaultFill = fillForSlug(slug);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    tabIndex={inFocus ? 0 : -1}
                    aria-label={
                      inFocus && row
                        ? `${row.stateName}: ${STATUS_LABEL[row.status]}`
                        : `${ST_NM ?? "State"}`
                    }
                    onMouseEnter={(e) => onPointer(e, slug)}
                    onMouseMove={(e) => onPointer(e, slug)}
                    onMouseLeave={() => setTooltip(null)}
                    onClick={() => {
                      if (inFocus && focusSlug) onSelectState?.(focusSlug);
                    }}
                    onKeyDown={(e) => {
                      if (
                        inFocus &&
                        focusSlug &&
                        (e.key === "Enter" || e.key === " ")
                      ) {
                        e.preventDefault();
                        onSelectState?.(focusSlug);
                      }
                    }}
                    style={{
                      default: {
                        fill: defaultFill,
                        stroke: isSelected
                          ? "var(--color-primary)"
                          : "#ffffff",
                        strokeWidth: isSelected ? 2 : inFocus ? 0.85 : 0.45,
                        outline: "none",
                        opacity: inFocus ? 1 : 0.72,
                      },
                      hover: {
                        fill: inFocus
                          ? hoverFill(focusSlug, row, isMuted)
                          : defaultFill,
                        stroke: inFocus
                          ? "var(--color-primary)"
                          : "#ffffff",
                        strokeWidth: inFocus ? 1.5 : 0.45,
                        outline: "none",
                        cursor: inFocus ? "pointer" : "default",
                        opacity: 1,
                      },
                      pressed: {
                        fill: "var(--color-primary)",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      {typeof document !== "undefined" && tooltipContent
        ? createPortal(tooltipContent, document.body)
        : null}
    </div>
  );
}

interface EligibilityGlancePanelProps {
  eligibility: StateEligibility[];
  mutedStateSlugs?: FocusStateSlug[];
  glanceContext?: EligibilityGlanceContext;
}

export function EligibilityGlancePanel({
  eligibility,
  mutedStateSlugs = [],
  glanceContext,
}: EligibilityGlancePanelProps) {
  const sorted = useMemo(
    () =>
      [...eligibility].sort((a, b) => {
        const byStatus = compareCutoffStatus(a.status, b.status);
        if (byStatus !== 0) return byStatus;
        return a.stateName.localeCompare(b.stateName);
      }),
    [eligibility]
  );

  const [selectedSlug, setSelectedSlug] = useState<FocusStateSlug | null>(
    null
  );

  useEffect(() => {
    if (selectedSlug && sorted.some((s) => s.stateSlug === selectedSlug)) {
      return;
    }
    const firstSafe = sorted.find((s) => s.status === "safe");
    setSelectedSlug(firstSafe?.stateSlug ?? sorted[0]?.stateSlug ?? null);
  }, [sorted, selectedSlug]);

  const selected = selectedSlug
    ? sorted.find((s) => s.stateSlug === selectedSlug)
    : undefined;

  const mutedSet = useMemo(() => new Set(mutedStateSlugs), [mutedStateSlugs]);

  const legendCounts = useMemo(() => {
    const c = { safe: 0, borderline: 0, out: 0 };
    for (const row of eligibility) c[row.status] += 1;
    return c;
  }, [eligibility]);

  return (
    <div className="grid gap-0 lg:grid-cols-2 lg:divide-x lg:divide-outline-variant/60">
      <div className="p-4 md:p-5 lg:pr-5">
        <EligibilityStatesMap
          eligibility={eligibility}
          selectedSlug={selectedSlug}
          onSelectState={setSelectedSlug}
          mutedStateSlugs={mutedStateSlugs}
          glanceContext={glanceContext}
        />
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-on-surface-variant">
          <li className="inline-flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-md ring-1 ring-black/5"
              style={{ background: MAP_FILL.safe }}
              aria-hidden
            />
            Safe ({legendCounts.safe})
          </li>
          <li className="inline-flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-md ring-1 ring-black/5"
              style={{ background: MAP_FILL.borderline }}
              aria-hidden
            />
            Borderline ({legendCounts.borderline})
          </li>
          <li className="inline-flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-md ring-1 ring-black/5"
              style={{ background: MAP_FILL.out }}
              aria-hidden
            />
            Unlikely ({legendCounts.out})
          </li>
          {mutedSet.size > 0 ? (
            <li className="inline-flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-md bg-surface-container-highest ring-1 ring-outline-variant"
                aria-hidden
              />
              Limited domicile ({mutedSet.size})
            </li>
          ) : null}
        </ul>
      </div>

      <div className="flex flex-col border-t border-outline-variant/60 bg-surface-container-lowest lg:border-t-0">
        <div className="border-b border-outline-variant/60 px-4 py-3.5 md:px-5">
          <h3 className="text-sm font-extrabold tracking-tight text-on-surface">
            Focus states
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
            Tap the map or a card below. Sorted Safe → Borderline → Unlikely.
          </p>
        </div>

        <ul className="flex flex-1 flex-col gap-2 p-3 md:p-4">
          {sorted.map((row) => {
            const active = row.stateSlug === selectedSlug;
            const muted = mutedSet.has(row.stateSlug);
            return (
              <li key={row.stateSlug}>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(row.stateSlug)}
                  className={cn(
                    "w-full rounded-[14px] border border-outline-variant p-3 text-left transition-all hover:border-primary/25 hover:shadow-sm",
                    STATUS_ROW_CLASS[row.status],
                    active && "border-primary/35 shadow-[0_8px_24px_-14px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] ring-2 ring-primary/15",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-container-lowest text-xs font-bold text-primary shadow-sm">
                        {row.stateAbbrev}
                      </span>
                      <div>
                        <p className="font-semibold text-on-surface">
                          {row.stateName}
                        </p>
                        {muted ? (
                          <p className="text-[11px] text-on-surface-variant">
                            Domicile may be required
                          </p>
                        ) : (
                          <p className="text-[11px] tabular-nums text-on-surface-variant">
                            Closing {formatNumber(row.closingRank ?? 0)}
                          </p>
                        )}
                      </div>
                    </div>
                    <CutoffStatusBadge status={row.status} />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {selected ? (
          <div className="border-t border-outline-variant/60 bg-surface-container-low px-4 py-4 md:px-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-outline">
              Selected · {selected.stateAbbrev}
            </p>
            <p className="mt-1 font-headline-md text-lg font-semibold text-primary">
              {selected.stateName}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-surface-container-low p-3">
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-outline">
                  Your rank
                </dt>
                <dd className="mt-1 font-mono text-lg font-bold tabular-nums text-on-surface">
                  {formatNumber(selected.userRank)}
                </dd>
              </div>
              <div className="rounded-xl bg-surface-container-low p-3">
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-outline">
                  Closing (pool)
                </dt>
                <dd className="mt-1 font-mono text-lg font-bold tabular-nums text-on-surface">
                  {selected.closingRank
                    ? formatNumber(selected.closingRank)
                    : "—"}
                </dd>
              </div>
            </dl>
            <p
              className={cn(
                "mt-3 text-xs font-medium",
                selected.gapToUser != null && selected.gapToUser >= 0
                  ? "text-college-type-government-fg"
                  : "text-error"
              )}
            >
              {gapSummary(selected.gapToUser)}
            </p>
            <span
              className={cn(
                "mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold",
                STATUS_BADGE_CLASS[selected.status]
              )}
            >
              {STATUS_LABEL[selected.status]}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
