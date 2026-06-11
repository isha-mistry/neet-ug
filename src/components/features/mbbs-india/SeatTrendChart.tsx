"use client";

import { useMemo, useState } from "react";
import type { SeatTrendRow } from "@/lib/mbbs-india/content";
import { cn, formatNumber } from "@/lib/utils";

interface SeatTrendChartProps {
  rows: SeatTrendRow[];
  className?: string;
}

export function SeatTrendChart({ rows, className }: SeatTrendChartProps) {
  const [metric, setMetric] = useState<"seats" | "applicants">("seats");

  const maxY = useMemo(() => {
    if (metric === "seats") {
      return Math.max(...rows.map((r) => r.totalSeats)) * 1.05;
    }
    return Math.max(...rows.map((r) => r.neetApplicantsLakh)) * 1.05;
  }, [rows, metric]);

  const width = 720;
  const height = 280;
  const pad = { top: 20, right: 16, bottom: 40, left: 56 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const step = rows.length > 1 ? innerW / (rows.length - 1) : innerW;

  function y(val: number) {
    return pad.top + innerH - (val / maxY) * innerH;
  }

  function x(i: number) {
    return pad.left + i * step;
  }

  const linePath = rows
    .map((row, i) => {
      const val =
        metric === "seats" ? row.totalSeats : row.neetApplicantsLakh * 10000;
      const yy = y(val);
      return `${i === 0 ? "M" : "L"} ${x(i)} ${yy}`;
    })
    .join(" ");

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: "seats" as const, label: "Total MBBS seats" },
            { id: "applicants" as const, label: "NEET applicants (×10k lakh scale)" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setMetric(opt.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold border",
              metric === opt.id
                ? "border-primary bg-primary text-on-primary"
                : "border-outline-variant bg-surface text-on-surface-variant"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-3xl text-on-surface-variant"
        role="img"
        aria-label="MBBS seats and NEET applicants trend chart"
      >
        <line
          x1={pad.left}
          y1={pad.top + innerH}
          x2={pad.left + innerW}
          y2={pad.top + innerH}
          stroke="currentColor"
          strokeOpacity={0.2}
        />
        <path d={linePath} fill="none" stroke="var(--color-primary)" strokeWidth={2.5} />
        {rows.map((row, i) => {
          const val =
            metric === "seats" ? row.totalSeats : row.neetApplicantsLakh * 10000;
          return (
            <g key={row.year}>
              <circle cx={x(i)} cy={y(val)} r={4} fill="var(--color-primary)" />
              <text
                x={x(i)}
                y={pad.top + innerH + 22}
                textAnchor="middle"
                className="fill-current text-[11px]"
              >
                {row.year}
              </text>
            </g>
          );
        })}
        <text
          x={pad.left - 8}
          y={pad.top + 8}
          textAnchor="end"
          className="fill-current text-[10px]"
        >
          {metric === "seats" ? formatNumber(Math.round(maxY)) : `${(maxY / 10000).toFixed(1)}L`}
        </text>
      </svg>
    </div>
  );
}
