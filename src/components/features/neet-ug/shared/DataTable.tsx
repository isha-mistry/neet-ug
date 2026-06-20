import React from "react";
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
  blue: "border-primary/15 bg-primary-fixed/50 text-primary",
  rose: "border-error/30 bg-error-container text-on-error-container",
  amber: "border-tertiary-fixed-dim/60 bg-tertiary-fixed text-on-tertiary-fixed-variant",
  emerald: "border-secondary/25 bg-secondary-fixed/80 text-secondary",
  slate: "border-outline-variant bg-surface-container-high text-on-surface-variant",
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
  const guideWrapClass = "overflow-x-auto rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)]";
  const guideTableClass = "w-full border-collapse text-sm tabular-nums [&_thead]:bg-primary [&_th]:px-5 [&_th]:py-4 [&_th]:text-[10px] [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-[0.14em] [&_th]:text-on-primary [&_td]:px-5 [&_td]:py-4 [&_td]:align-top [&_td]:leading-[1.6] [&_tbody_tr]:border-b [&_tbody_tr]:border-outline-variant [&_tbody_tr:last-child]:border-b-0 [&_tbody_tr:hover]:bg-primary-fixed/20 [&_tbody_td:first-child]:bg-surface-container-low/60 [&_tbody_td:first-child]:font-bold [&_tbody_td:first-child]:text-on-surface";
  const guideTableLabelNumericColsClass = "[&_thead_th:first-child]:text-left [&_tbody_td:first-child]:text-left [&_tfoot_td:first-child]:text-left [&_thead_th:not(:first-child)]:text-right [&_tbody_td:not(:first-child)]:text-right [&_tfoot_td:not(:first-child)]:text-right";

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
            ? guideWrapClass
            : "overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)]",
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
                  : "border-b border-outline-variant bg-primary text-[10px] font-bold uppercase tracking-[0.14em] text-on-primary"
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
          <tbody className={isGuide ? undefined : "divide-y divide-outline-variant text-sm"}>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={cn(
                  !isGuide && "transition-colors hover:bg-primary-fixed/20",
                  !isGuide &&
                    highlightLastRow &&
                    ri === rows.length - 1 &&
                    "bg-primary-fixed/40 font-semibold"
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
                        !isGuide && "px-5 py-4",
                        alignClass(col.align),
                        !isGuide &&
                          (ci === 0
                            ? "font-semibold text-on-surface"
                            : "font-medium text-on-surface-variant"),
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
            isGuide ? "text-outline" : "text-on-surface-variant"
          )}
        >
          {footnote}
        </p>
      ) : null}
    </div>
  );
}
