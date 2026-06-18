import React from "react";
import {
  guideTableClass,
  guideTableLabelNumericColsClass,
  guideTableWrapClass,
} from "@/lib/mbbs-india/section-styles";
import { cn } from "@/lib/utils";

export interface DataTableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  /** Render a badge pill instead of plain text */
  badge?: boolean;
  /** Badge colour variant — only used when badge=true */
  badgeVariant?: "blue" | "rose" | "amber" | "emerald" | "slate";
  /** Dynamic badge colour per-row using a row-level key */
  badgeColorKey?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataTableRow = Record<string, any>;

interface DataTableProps {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  footnote?: string;
  /** Highlight the last row (e.g., "expected" row in trend tables) */
  highlightLastRow?: boolean;
  scrollable?: boolean;
  /** `guide` is the brand default; `clinical` remains only for legacy NEET subpages. */
  theme?: "clinical" | "guide";
}

const clinicalBadgeColorMap: Record<string, string> = {
  blue: "bg-clinical-surface-low text-clinical-blue border-clinical-outline",
  rose: "bg-rose-50 text-rose-600 border-rose-100/50",
  amber: "bg-amber-50 text-amber-700 border-amber-100/50",
  emerald: "bg-emerald-50 text-clinical-green border-emerald-100/50",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
};

const guideBadgeColorMap: Record<string, string> = {
  blue: "border-primary/15 bg-primary-fixed/50 text-primary",
  rose: "border-error/30 bg-error-container text-on-error-container",
  /** Warm — design system tertiary-fixed (amber). */
  amber: "border-tertiary-fixed-dim/60 bg-tertiary-fixed text-on-tertiary-fixed-variant",
  /** Calm / lower intensity — secondary (teal), distinct from moderate amber. */
  emerald: "border-secondary/25 bg-secondary-fixed/80 text-secondary",
  slate: "border-outline-variant bg-surface-container-high text-on-surface-variant",
};

export function DataTable({
  columns,
  rows,
  footnote,
  highlightLastRow = false,
  scrollable = false,
  theme = "guide",
}: DataTableProps) {
  const isGuide = theme === "guide";
  const badgeColorMap = isGuide ? guideBadgeColorMap : clinicalBadgeColorMap;

  const alignClass = (align?: "left" | "right" | "center") => {
    if (align === "right") return "text-right";
    if (align === "center") return "text-center";
    return "text-left";
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          isGuide
            ? guideTableWrapClass
            : "overflow-hidden rounded-lg border border-clinical-outline bg-clinical-surface shadow-sm",
          scrollable && "overflow-x-auto"
        )}
      >
        <table
          className={cn(
            "w-full border-collapse text-left text-sm tabular-nums",
            scrollable && "min-w-[600px]",
            isGuide && guideTableClass,
            isGuide && guideTableLabelNumericColsClass
          )}
        >
          <thead>
            <tr
              className={
                isGuide
                  ? undefined
                  : "border-b border-clinical-outline bg-clinical-surface-container text-[11px] font-bold uppercase tracking-[0.08em] text-clinical-muted"
              }
            >
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    isGuide ? undefined : "px-6 py-4 font-extrabold",
                    alignClass(col.align)
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={isGuide ? undefined : "divide-y divide-clinical-outline text-sm"}>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={cn(
                  !isGuide && "transition-colors hover:bg-clinical-surface-low/45",
                  !isGuide &&
                    highlightLastRow &&
                    ri === rows.length - 1 &&
                    "bg-clinical-surface-low/60 font-semibold"
                )}
              >
                {columns.map((col, ci) => {
                  const cellValue = row[col.key];

                  let bColor = col.badgeVariant ?? "blue";
                  if (col.badgeColorKey && row[col.badgeColorKey]) {
                    bColor = row[col.badgeColorKey];
                  }

                  return (
                    <td
                      key={col.key}
                      className={cn(
                        !isGuide && "px-6 py-4",
                        alignClass(col.align),
                        !isGuide &&
                          (ci === 0
                            ? "font-semibold text-clinical-navy"
                            : "font-medium text-clinical-muted"),
                        isGuide && ci === 0 && "font-semibold text-on-surface"
                      )}
                    >
                      {col.badge ? (
                        <span
                          className={cn(
                            "inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-bold whitespace-nowrap",
                            badgeColorMap[bColor] ?? badgeColorMap.blue
                          )}
                        >
                          {cellValue}
                        </span>
                      ) : (
                        cellValue
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote ? (
        <p
          className={cn(
            "pl-1 text-[11px]",
            isGuide ? "text-outline" : "text-clinical-muted/70"
          )}
        >
          {footnote}
        </p>
      ) : null}
    </div>
  );
}
