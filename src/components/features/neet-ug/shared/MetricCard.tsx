import React from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

type MetricTone =
  | "blue"
  | "amber"
  | "emerald"
  | "rose"
  | "indigo"
  | "teal"
  | "slate";

const toneClasses: Record<MetricTone, string> = {
  blue: "bg-clinical-surface-low text-clinical-blue ring-clinical-outline",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  emerald: "bg-emerald-50 text-clinical-green ring-emerald-100",
  rose: "bg-rose-50 text-rose-600 ring-rose-100",
  indigo: "bg-indigo-50 text-indigo-600 ring-indigo-100",
  teal: "bg-teal-50 text-clinical-green ring-teal-100",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
};

interface MetricCardProps {
  icon: string;
  label: string;
  value: string;
  tone?: MetricTone;
  /** Optional smaller sub-label below value */
  sub?: string;
}

export function MetricCard({
  icon,
  label,
  value,
  tone = "blue",
  sub,
}: MetricCardProps) {
  return (
    <Card
      padded={false}
      className="flex items-center gap-3 rounded-lg border border-clinical-outline bg-clinical-surface p-4 shadow-clinical-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-clinical-blue/20 hover:shadow-clinical-hover"
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ring-1 ${toneClasses[tone]}`}
      >
        <MaterialSymbol name={icon} size="sm" />
      </span>
      <div>
        <p className="text-[10px] font-extrabold uppercase leading-none tracking-[0.14em] text-clinical-muted/70">
          {label}
        </p>
        <p className="mt-1 text-sm font-extrabold text-clinical-navy">{value}</p>
        {sub && <p className="mt-0.5 text-[11px] text-clinical-muted">{sub}</p>}
      </div>
    </Card>
  );
}
