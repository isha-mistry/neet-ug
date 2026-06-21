"use client";

import { useMemo } from "react";
import { FiArrowRight, FiPhoneCall } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { useComparisonStore } from "@/store/comparison.store";
import type { CollegeRecord } from "@/types/college";
import { buildComparison } from "@/lib/colleges/scoring";
import type { ComparisonMetric } from "@/types/comparison";

interface ComparisonCTAGroupProps {
  catalog: CollegeRecord[];
  metrics: ComparisonMetric[];
}

export function ComparisonCTAGroup({
  catalog,
  metrics,
}: ComparisonCTAGroupProps) {
  const selectedSlugs = useComparisonStore((state) => state.selectedSlugs);

  const winnerSlug = useMemo(() => {
    if (selectedSlugs.length < 2) return null;
    const records = selectedSlugs
      .map((slug) => catalog.find((c) => c.slug === slug))
      .filter((c): c is CollegeRecord => Boolean(c));
    const { recommendation } = buildComparison(records, metrics);
    return recommendation?.bestCollegeSlug ?? null;
  }, [catalog, metrics, selectedSlugs]);

  if (selectedSlugs.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-border bg-surface-elevated p-4 md:p-5">
      <div className="flex flex-col">
        <h3 className="text-base font-semibold tracking-snug text-text">
          Take the next step
        </h3>
        <p className="text-sm tracking-wide text-text-muted">
          View detailed pages or schedule guided counseling for your selections.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {winnerSlug ? (
          <Button
            as="link"
            href={`/colleges/${winnerSlug}`}
            variant="primary"
            trailingIcon={<FiArrowRight aria-hidden="true" />}
          >
            View Recommended
          </Button>
        ) : null}
        <Button
          as="link"
          href="/counselling"
          variant="outline"
          leadingIcon={<FiPhoneCall aria-hidden="true" />}
        >
          Get Counseling
        </Button>
      </div>
    </div>
  );
}
