import React from "react";

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
}

const badgeColorMap: Record<string, string> = {
  blue: "bg-clinical-surface-low text-clinical-blue border-clinical-outline",
  rose: "bg-rose-50 text-rose-600 border-rose-100/50",
  amber: "bg-amber-50 text-amber-700 border-amber-100/50",
  emerald: "bg-emerald-50 text-clinical-green border-emerald-100/50",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
};

export function DataTable({
  columns,
  rows,
  footnote,
  highlightLastRow = false,
  scrollable = false,
}: DataTableProps) {
  const alignClass = (align?: "left" | "right" | "center") => {
    if (align === "right") return "text-right";
    if (align === "center") return "text-center";
    return "text-left";
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`overflow-hidden rounded-2xl border border-clinical-outline bg-clinical-surface shadow-clinical-soft ${
          scrollable ? "overflow-x-auto" : ""
        }`}
      >
        <table
          className={`w-full border-collapse text-left text-sm tabular-nums ${
            scrollable ? "min-w-[600px]" : ""
          }`}
        >
          <thead>
            <tr className="border-b border-clinical-outline bg-clinical-surface-low text-[11px] font-extrabold uppercase tracking-[0.12em] text-clinical-muted">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 font-extrabold ${alignClass(col.align)}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-clinical-outline text-sm">
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={`transition-colors hover:bg-clinical-surface-low/45 ${
                  highlightLastRow && ri === rows.length - 1
                    ? "bg-clinical-surface-low/60 font-semibold"
                    : ""
                }`}
              >
                {columns.map((col, ci) => {
                  const cellValue = row[col.key];

                  // Determine badge color
                  let bColor = col.badgeVariant ?? "blue";
                  if (col.badgeColorKey && row[col.badgeColorKey]) {
                    bColor = row[col.badgeColorKey];
                  }

                  return (
                    <td
                      key={col.key}
                      className={`px-6 py-4 ${alignClass(col.align)} ${
                        ci === 0
                          ? "font-semibold text-clinical-navy"
                          : "font-medium text-clinical-muted"
                      }`}
                    >
                      {col.badge ? (
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${
                            badgeColorMap[bColor] ?? badgeColorMap.blue
                          }`}
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
      {footnote && (
        <p className="pl-1 text-[11px] text-clinical-muted/70">{footnote}</p>
      )}
    </div>
  );
}
