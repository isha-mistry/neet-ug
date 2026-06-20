import React from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { neetIconTileClass, neetLabelClass } from "@/lib/neet-ug-2026/design-system";
import { cn } from "@/lib/utils";

type MetricTone =
  | "blue"
  | "amber"
  | "emerald"
  | "rose"
  | "indigo"
  | "teal"
  | "slate";

const toneClasses: Record<MetricTone, string> = {
  blue: "bg-primary-fixed text-primary ring-primary/10",
  amber: "bg-tertiary-fixed text-on-tertiary-fixed-variant ring-tertiary-fixed-dim/60",
  emerald: "bg-secondary-fixed/80 text-secondary ring-secondary/20",
  rose: "bg-error-container text-on-error-container ring-error/20",
  indigo: "bg-primary-fixed text-primary ring-primary/10",
  teal: "bg-secondary-fixed/80 text-secondary ring-secondary/20",
  slate: "bg-surface-container-high text-on-surface-variant ring-outline-variant",
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
      className="flex items-center gap-3 rounded-2xl border-outline-variant bg-surface-container-lowest p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)] hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_2px_6px_rgba(0,0,0,0.04),0_30px_70px_-30px_rgba(37,70,208,0.28)]"
    >
      <span
        className={cn(neetIconTileClass, "h-10 w-10", toneClasses[tone])}
      >
        <MaterialSymbol name={icon} size="sm" />
      </span>
      <div>
        <p className={cn(neetLabelClass, "text-outline")}>
          {label}
        </p>
        <p className="mt-1 text-[15px] font-extrabold leading-snug text-on-surface">{value}</p>
        {sub && <p className="mt-0.5 text-xs leading-relaxed text-on-surface-variant">{sub}</p>}
      </div>
    </Card>
  );
}
