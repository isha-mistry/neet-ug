"use client";

import { cn, formatNumber } from "@/lib/utils";
import type { StateQuotaRow } from "@/lib/cutoff-analyser/types";
import { compareCutoffStatus } from "@/lib/cutoff-analyser/status";
import { CutoffStatusBadge } from "./CutoffAnalyserParts";
import { STATUS_ROW_CLASS } from "./section-styles";

type SortKey = "state" | "closing" | "gap" | "status";

interface CutoffComparisonTableProps {
  rows: StateQuotaRow[];
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  onSort: (key: SortKey) => void;
}

function SortHeader({
  label,
  active,
  dir,
  onClick,
  align = "left",
}: {
  label: string;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
  align?: "left" | "right";
}) {
  return (
    <th
      scope="col"
      className={cn(
        "px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-on-primary",
        align === "right" && "text-right"
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1 transition-colors hover:text-white/80",
          align === "right" && "ml-auto",
          active ? "text-white" : "text-white/70"
        )}
      >
        {label}
        <span
          className={cn(
            "material-symbols-outlined text-base",
            !active && "opacity-50"
          )}
          aria-hidden
        >
          {active && dir === "desc" ? "arrow_downward" : "arrow_upward"}
        </span>
      </button>
    </th>
  );
}

function gapCell(gap: number | null) {
  if (gap == null) return "—";
  const positive = gap >= 0;
  return (
    <span
      className={cn(
        "font-semibold tabular-nums",
        positive ? "text-college-type-government-fg" : "text-error"
      )}
    >
      {positive ? "+" : ""}
      {formatNumber(gap)}
    </span>
  );
}

export function CutoffComparisonTable({
  rows,
  sortKey,
  sortDir,
  onSort,
}: CutoffComparisonTableProps) {
  const sorted = [...rows].sort((a, b) => {
    let cmp = 0;
    switch (sortKey) {
      case "state":
        cmp = a.stateName.localeCompare(b.stateName);
        break;
      case "closing":
        cmp = (a.closingRank ?? 0) - (b.closingRank ?? 0);
        break;
      case "gap":
        cmp = (a.gapToUser ?? 0) - (b.gapToUser ?? 0);
        break;
      case "status":
        cmp = compareCutoffStatus(a.status, b.status);
        if (cmp === 0) cmp = a.stateName.localeCompare(b.stateName);
        if (cmp === 0) cmp = a.quotaLabel.localeCompare(b.quotaLabel);
        break;
    }
    return sortDir === "asc" ? cmp : -cmp;
  });

  return (
    <>
      <div className="hidden md:block quota-table-wrap">
        <table className="quota-table min-w-[720px]">
          <thead className="sticky top-0 z-10 bg-primary">
            <tr>
              <SortHeader
                label="State"
                active={sortKey === "state"}
                dir={sortDir}
                onClick={() => onSort("state")}
              />
              <th
                scope="col"
                className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-on-primary"
              >
                Quota
              </th>
              <th
                scope="col"
                className="px-5 py-4 text-right text-[10px] font-bold uppercase tracking-[0.14em] text-on-primary"
              >
                Opening
              </th>
              <SortHeader
                label="Closing"
                active={sortKey === "closing"}
                dir={sortDir}
                onClick={() => onSort("closing")}
                align="right"
              />
              <SortHeader
                label="Gap to your rank"
                active={sortKey === "gap"}
                dir={sortDir}
                onClick={() => onSort("gap")}
                align="right"
              />
              <SortHeader
                label="Status"
                active={sortKey === "status"}
                dir={sortDir}
                onClick={() => onSort("status")}
                align="right"
              />
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr
                key={`${row.stateSlug}-${row.quota}`}
                className={cn(
                  "border-b border-outline-variant/70 transition-colors last:border-b-0 hover:bg-surface-container-low/70",
                  STATUS_ROW_CLASS[row.status],
                )}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-xs font-bold text-primary">
                      {row.stateAbbrev}
                    </span>
                    <span className="font-semibold text-on-surface">
                      {row.stateName}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-on-surface-variant">
                  {row.quotaLabel}
                </td>
                <td className="px-5 py-4 text-right font-mono tabular-nums text-on-surface-variant">
                  {row.openingRank ? formatNumber(row.openingRank) : "—"}
                </td>
                <td className="px-5 py-4 text-right font-mono text-base font-bold tabular-nums text-on-surface">
                  {row.closingRank ? formatNumber(row.closingRank) : "—"}
                </td>
                <td className="px-5 py-4 text-right text-sm">
                  {gapCell(row.gapToUser)}
                </td>
                <td className="px-5 py-4 text-right">
                  <CutoffStatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 p-4 md:hidden">
        {sorted.map((row) => (
          <div
            key={`m-${row.stateSlug}-${row.quota}`}
            className={cn(
              "rounded-xl border border-outline-variant p-4",
              STATUS_ROW_CLASS[row.status],
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-fixed text-xs font-bold text-primary">
                  {row.stateAbbrev}
                </span>
                <div>
                  <p className="font-semibold">{row.stateName}</p>
                  <p className="text-xs text-on-surface-variant">
                    {row.quotaLabel}
                  </p>
                </div>
              </div>
              <CutoffStatusBadge status={row.status} />
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-xs uppercase text-outline">Closing</dt>
                <dd className="font-mono font-bold">
                  {row.closingRank ? formatNumber(row.closingRank) : "—"}
                </dd>
              </div>
              <div className="text-right">
                <dt className="text-xs uppercase text-outline">Gap</dt>
                <dd>{gapCell(row.gapToUser)}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}
