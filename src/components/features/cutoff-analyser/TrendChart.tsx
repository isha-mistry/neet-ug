"use client";

import { useMemo, useState } from "react";
import {
  TREND_BY_QUOTA,
  TREND_BY_STATE,
  type TrendView,
} from "@/lib/cutoff-analyser/content";
import { cn, formatNumber } from "@/lib/utils";

const YEAR_COLORS: Record<number, string> = {
  2021: "#c4d2ff",
  2022: "#8aa8ff",
  2023: "#5c85f0",
  2024: "#378ADD",
  2025: "#003d9b",
};

interface TrendChartProps {
  className?: string;
}

export function TrendChart({ className }: TrendChartProps) {
  const [view, setView] = useState<TrendView>("state");
  const [hiddenYears, setHiddenYears] = useState<Set<number>>(new Set());

  const series = view === "state" ? TREND_BY_STATE : TREND_BY_QUOTA;
  const keys = useMemo(() => {
    const set = new Set<string>();
    for (const row of series) {
      for (const k of Object.keys(row.values)) set.add(k);
    }
    return [...set];
  }, [series]);

  const maxRank = useMemo(() => {
    let max = 0;
    for (const row of series) {
      for (const v of Object.values(row.values)) max = Math.max(max, v);
    }
    return max * 1.05;
  }, [series]);

  const width = 680;
  const height = 260;
  const pad = { top: 16, right: 16, bottom: 36, left: 48 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const xStep = keys.length > 1 ? innerW / (keys.length - 1) : innerW;

  function yForRank(rank: number) {
    return pad.top + (rank / maxRank) * innerH;
  }

  function xForIndex(i: number) {
    return pad.left + i * xStep;
  }

  function toggleYear(year: number) {
    setHiddenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-2">
        <div className="inline-flex rounded-lg border border-border p-0.5 text-xs">
          {(["state", "quota"] as const).map((v) => (
            <button
              key={v}
              type="button"
              className={cn(
                "rounded-md px-3 py-1.5 font-medium transition-colors",
                view === v
                  ? "bg-primary text-on-primary"
                  : "text-text-secondary hover:bg-surface-container"
              )}
              onClick={() => setView(v)}
            >
              {v === "state" ? "By state" : "By quota"}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-3 md:p-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="min-w-[320px] w-full max-w-[680px]"
          role="img"
          aria-label="Closing rank trend chart 2021 to 2025"
        >
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const rank = Math.round(maxRank * t);
            const y = yForRank(rank);
            return (
              <g key={t}>
                <line
                  x1={pad.left}
                  x2={width - pad.right}
                  y1={y}
                  y2={y}
                  stroke="var(--color-border)"
                  strokeWidth={0.5}
                />
                <text
                  x={pad.left - 6}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-text-muted text-[10px]"
                >
                  {formatNumber(rank)}
                </text>
              </g>
            );
          })}

          {keys.map((key, i) => (
            <text
              key={key}
              x={xForIndex(i)}
              y={height - 8}
              textAnchor="middle"
              className="fill-text-secondary text-[11px]"
            >
              {key}
            </text>
          ))}

          {series.map((row) => {
            if (hiddenYears.has(row.year)) return null;
            const color = YEAR_COLORS[row.year] ?? "#378ADD";
            const points = keys
              .map((key, i) => {
                const rank = row.values[key];
                if (rank == null) return null;
                return `${xForIndex(i)},${yForRank(rank)}`;
              })
              .filter(Boolean)
              .join(" ");

            return (
              <polyline
                key={row.year}
                fill="none"
                stroke={color}
                strokeWidth={row.year === 2025 ? 2.5 : 2}
                strokeDasharray={row.year === 2021 ? "4 3" : undefined}
                points={points}
              />
            );
          })}

          {series.map((row) => {
            if (hiddenYears.has(row.year)) return null;
            const color = YEAR_COLORS[row.year] ?? "#378ADD";
            return keys.map((key, i) => {
              const rank = row.values[key];
              if (rank == null) return null;
              return (
                <circle
                  key={`${row.year}-${key}`}
                  cx={xForIndex(i)}
                  cy={yForRank(rank)}
                  r={row.year === 2025 ? 4 : 3}
                  fill={color}
                >
                  <title>{`${row.year} ${key}: ${formatNumber(rank)}`}</title>
                </circle>
              );
            });
          })}
        </svg>
      </div>

      <ul className="flex flex-wrap gap-3 text-xs text-text-secondary">
        {series.map((row) => (
          <li key={row.year}>
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-1 py-0.5",
                hiddenYears.has(row.year) && "opacity-40 line-through"
              )}
              onClick={() => toggleYear(row.year)}
            >
              <span
                className="h-2 w-4 rounded-sm"
                style={{ background: YEAR_COLORS[row.year] }}
                aria-hidden
              />
              {row.year}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
