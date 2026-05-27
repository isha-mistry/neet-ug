"use client";

import { useMemo } from "react";
import { FiAward } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { useComparisonStore } from "@/store/comparison.store";
import { buildComparison } from "@/lib/colleges/scoring";
import type { CollegeRecord } from "@/types/college";
import type { ComparisonMetric } from "@/types/comparison";

interface BestFitScoreCardProps {
  catalog: CollegeRecord[];
  metrics: ComparisonMetric[];
}

export function BestFitScoreCard({
  catalog,
  metrics,
}: BestFitScoreCardProps) {
  const selectedSlugs = useComparisonStore((state) => state.selectedSlugs);

  const selected = useMemo(
    () =>
      selectedSlugs
        .map((slug) => catalog.find((c) => c.slug === slug))
        .filter((c): c is CollegeRecord => Boolean(c)),
    [catalog, selectedSlugs]
  );

  if (selected.length < 2) return null;

  const { recommendation, colleges } = buildComparison(selected, metrics);
  if (!recommendation) return null;
  const winner = colleges.find((c) => c.slug === recommendation.bestCollegeSlug);

  return (
    <Card padded bordered elevated className="ms-gradient-soft">
      <header className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] ms-gradient-strong text-text-on-brand">
          <FiAward aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            Best Fit Score
          </span>
          <h3 className="text-lg font-semibold tracking-snug text-text">
            {winner?.name ?? "—"}
          </h3>
        </div>
      </header>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            Weighted Score
          </span>
          <span className="text-3xl font-bold tracking-tight text-text">
            {recommendation.score}
            <span className="text-base font-semibold text-text-muted">/100</span>
          </span>
        </div>
        <p className="max-w-sm text-sm tracking-wide text-text-secondary">
          Score is weighted across fees, cutoff, seats, bond and ROI.
        </p>
      </div>
    </Card>
  );
}
