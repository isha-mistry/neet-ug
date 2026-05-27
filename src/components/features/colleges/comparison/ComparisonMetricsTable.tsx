"use client";

import { useMemo } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/common/EmptyState";
import { useComparisonStore } from "@/store/comparison.store";
import { buildComparison } from "@/lib/colleges/scoring";
import { cn } from "@/lib/utils";
import type { CollegeRecord } from "@/types/college";
import type { ComparisonMetric } from "@/types/comparison";

interface ComparisonMetricsTableProps {
  catalog: CollegeRecord[];
  metrics: ComparisonMetric[];
}

export function ComparisonMetricsTable({
  catalog,
  metrics,
}: ComparisonMetricsTableProps) {
  const selectedSlugs = useComparisonStore((state) => state.selectedSlugs);

  const selectedRecords = useMemo(
    () =>
      selectedSlugs
        .map((slug) => catalog.find((c) => c.slug === slug))
        .filter((c): c is CollegeRecord => Boolean(c)),
    [catalog, selectedSlugs]
  );

  if (selectedRecords.length === 0) {
    return (
      <Card padded bordered>
        <CardHeader title="Comparison" />
        <EmptyState
          title="Pick colleges to compare"
          description="Add at least two colleges from the selector to see a metric-by-metric comparison."
        />
      </Card>
    );
  }

  const viewModel = buildComparison(selectedRecords, metrics);

  return (
    <Card padded bordered>
      <CardHeader
        title="Metric Comparison"
        description="Top critical metrics shown side by side. Best value per row highlighted."
      />
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-widest text-text-muted">
                Metric
              </th>
              {viewModel.colleges.map((college) => (
                <th
                  key={college.slug}
                  className="px-3 py-2 text-left text-xs font-semibold tracking-tight text-text"
                >
                  {college.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {viewModel.rows.map((row) => (
              <tr key={row.metric.id}>
                <th
                  scope="row"
                  className="rounded-l-[var(--radius-md)] bg-surface px-3 py-3 text-left text-xs font-semibold uppercase tracking-widest text-text-muted"
                >
                  {row.metric.label}
                </th>
                {row.values.map((cell, index, arr) => {
                  const isBest = cell.collegeSlug === row.bestSlug;
                  const isLast = index === arr.length - 1;
                  return (
                    <td
                      key={cell.collegeSlug}
                      className={cn(
                        "bg-surface px-3 py-3 text-sm font-semibold tracking-tight",
                        isBest ? "text-brand-800" : "text-text",
                        isLast ? "rounded-r-[var(--radius-md)]" : ""
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {cell.display}
                        {isBest ? (
                          <span className="inline-flex items-center rounded-[var(--radius-pill)] bg-brand-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand-800">
                            Best
                          </span>
                        ) : null}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
