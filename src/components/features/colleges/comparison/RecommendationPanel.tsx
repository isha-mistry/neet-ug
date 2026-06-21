"use client";

import { useMemo } from "react";
import { FiCheck } from "react-icons/fi";
import { Card, CardHeader } from "@/components/ui/Card";
import { useComparisonStore } from "@/store/comparison.store";
import { buildComparison } from "@/lib/colleges/scoring";
import type { CollegeRecord } from "@/types/college";
import type { ComparisonMetric } from "@/types/comparison";

interface RecommendationPanelProps {
  catalog: CollegeRecord[];
  metrics: ComparisonMetric[];
}

export function RecommendationPanel({
  catalog,
  metrics,
}: RecommendationPanelProps) {
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
    <Card padded bordered>
      <CardHeader
        title="Recommendation"
        description="Why we believe this college is the best fit across selected metrics."
      />
      <div className="mt-4 flex flex-col gap-3">
        {winner ? (
          <p className="text-sm leading-relaxed text-text-secondary">
            <span className="font-semibold text-text">{winner.name}</span> emerges
            as the strongest pick based on weighted comparison.
          </p>
        ) : null}
        <ul className="flex flex-col gap-2">
          {recommendation.reasons.map((reason, index) => (
            <li
              key={index}
              className="flex items-start gap-2 rounded-[14px] border border-border bg-surface px-3 py-2 text-sm leading-relaxed text-text-secondary"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-[var(--radius-pill)] bg-brand-100 text-brand-700"
              >
                <FiCheck />
              </span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
