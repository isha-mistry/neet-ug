import type { ReactNode } from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { Card } from "@/components/ui/Card";
import { formatINR, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CollegeDetailAtAGlanceProps {
  totalAnnualFee: number;
  latestCutoffRank: number;
  latestCutoffYear: number;
  seatCount: number;
  roiScore: number;
  nirfMedicalRank?: number;
  nirfRankingYear?: number;
  bondYears: number;
}

export function CollegeDetailAtAGlance({
  totalAnnualFee,
  latestCutoffRank,
  latestCutoffYear,
  seatCount,
  roiScore,
  nirfMedicalRank,
  nirfRankingYear,
  bondYears,
}: CollegeDetailAtAGlanceProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon="payments"
          label="Annual fees"
          value={
            totalAnnualFee > 0
              ? formatINR(totalAnnualFee, { compact: true })
              : "See breakdown"
          }
        />
        <MetricCard
          icon="trending_down"
          label={
            latestCutoffRank > 0 && latestCutoffYear > 0
              ? `Cutoff ${latestCutoffYear}`
              : "Closing rank"
          }
          value={
            latestCutoffRank > 0
              ? `AIR ${formatNumber(latestCutoffRank)}`
              : "Not in dataset"
          }
        />
        <MetricCard
          icon="groups"
          label="MBBS seats"
          value={formatNumber(seatCount)}
        />
        <MetricCard
          icon="insights"
          label="Value score"
          value={`${roiScore}/100`}
          hint="MedSeat ROI index"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {nirfMedicalRank != null ? (
          <Chip icon="military_tech">
            NIRF Medical #{nirfMedicalRank}
            {nirfRankingYear ? ` · ${nirfRankingYear}` : ""}
          </Chip>
        ) : null}
        <Chip icon={bondYears > 0 ? "gavel" : "verified"}>
          {bondYears > 0
            ? `${bondYears} yr rural bond`
            : "No bond on record"}
        </Chip>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: string;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card
      padded
      bordered
      className="flex items-start gap-3 border-outline-variant bg-surface-container-lowest shadow-sm"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-on-primary-fixed">
        <MaterialSymbol name={icon} className="text-[22px]" />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
          {label}
        </span>
        <span className="text-lg font-bold tracking-tight text-on-surface">
          {value}
        </span>
        {hint ? (
          <span className="text-xs text-on-surface-variant">{hint}</span>
        ) : null}
      </div>
    </Card>
  );
}

function Chip({
  icon,
  children,
}: {
  icon: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-outline-variant",
        "bg-surface-container-low px-3 py-1.5 text-xs font-semibold text-on-surface"
      )}
    >
      <MaterialSymbol name={icon} className="text-base text-primary" />
      {children}
    </span>
  );
}
