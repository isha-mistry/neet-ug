"use client";

import { useMemo, useState } from "react";
import {
  TREND_BY_QUOTA,
  TREND_BY_STATE,
  type TrendView,
} from "@/lib/cutoff-analyser/content";
import { ToolFilterPill } from "@/components/features/predictors/PredictorToolParts";
import { cn, formatNumber } from "@/lib/utils";

const YEAR_COLORS: Record<number, string> = {
  2021: "#c4d2ff",
  2022: "#8aa8ff",
  2023: "#5c85f0",
  2024: "#378ADD",
  2025: "#2546d0",
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

  const width = 900;
  const height = 280;
  const pad = { top: 20, right: 20, bottom: 40, left: 52 };
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
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-2">
        {(["state", "quota"] as const).map((v) => (
          <ToolFilterPill key={v} active={view === v} onClick={() => setView(v)}>
            {v === "state" ? "By state" : "By quota"}
          </ToolFilterPill>
        ))}
      </div>

      <div className="ca-chart-panel">
        <div className="ca-chart-canvas">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label="Closing rank trend chart 2021 to 2025"
            preserveAspectRatio="xMidYMid meet"
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
                    stroke="var(--color-outline-variant)"
                    strokeWidth={1}
                    strokeDasharray="4 6"
                  />
                  <text
                    x={pad.left - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-outline text-[10px] font-medium"
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
                y={height - 10}
                textAnchor="middle"
                className="fill-on-surface-variant text-[11px] font-semibold"
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
                  strokeWidth={row.year === 2025 ? 2.75 : 2}
                  strokeDasharray={row.year === 2021 ? "5 4" : undefined}
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                    r={row.year === 2025 ? 4.5 : 3.5}
                    fill={color}
                    stroke="#fff"
                    strokeWidth={1.5}
                  >
                    <title>{`${row.year} ${key}: ${formatNumber(rank)}`}</title>
                  </circle>
                );
              });
            })}
          </svg>
        </div>

        <ul className="ca-chart-legend">
          {series.map((row) => (
            <li key={row.year}>
              <button
                type="button"
                className={cn(
                  "ca-chart-legend-btn",
                  hiddenYears.has(row.year) && "ca-chart-legend-btn-off",
                )}
                onClick={() => toggleYear(row.year)}
              >
                <span
                  className="h-2 w-4 shrink-0 rounded-sm"
                  style={{ background: YEAR_COLORS[row.year] }}
                  aria-hidden
                />
                {row.year}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="rp-field-hint">
        Lower closing rank is better. Toggle years to compare movement — verify against official
        bulletins before planning choices.
      </p>
    </div>
  );
}
