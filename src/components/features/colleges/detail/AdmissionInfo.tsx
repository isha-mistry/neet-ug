"use client";

import { useState } from "react";
import type { CollegeCutoff } from "@/types/college";
import { formatNumber } from "@/lib/utils";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import {
  type CategoryFilter,
  CATEGORIES,
  matchesSelectedCategory,
} from "@/lib/colleges/categories";
import { DetailSectionHeader } from "@/components/features/colleges/shared/DetailSectionHeader";
import { DetailPanel } from "@/components/features/colleges/shared/DetailPanel";
import { cn } from "@/lib/utils";

interface AdmissionInfoProps {
  seatCount: number;
  cutoffs: CollegeCutoff[];
}

export function AdmissionInfo({ seatCount, cutoffs }: AdmissionInfoProps) {
  const [category, setCategory] = useState<CategoryFilter>("general");

  // Filter and sort cutoffs: Latest year first, then Round 1, 2...
  const filteredCutoffs = cutoffs
    .filter((cutoff) => matchesSelectedCategory(cutoff, category))
    .sort((a, b) => {
      if (b.year !== a.year) {
        return b.year - a.year;
      }
      return (a.round || "").localeCompare(b.round || "");
    });

  // Dynamically check which optional columns are available in the displayed dataset
  const hasStateRank = filteredCutoffs.some(
    (c) => c.stateClosingRank !== undefined
  );

  const hasCategoryRank = filteredCutoffs.some(
    (c) => c.categoryClosingRank !== undefined
  );

  // Find the latest year in the dataset dynamically to highlight it
  const latestYear = filteredCutoffs.length > 0 ? Math.max(...filteredCutoffs.map(c => c.year)) : 0;

  const categorySelectId = "college-cutoff-category";

  return (
    <section
      className="flex flex-col gap-6"
      aria-labelledby="college-admission-heading"
    >
      <DetailSectionHeader
        id="college-admission-heading"
        eyebrow="Cutoffs"
        title="Admission & Cutoffs"
        description="Year-wise closing ranks by category, seat type, and counselling round"
        icon="school"
      />

      <DetailPanel className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="flex items-center gap-2 text-base font-bold text-on-surface">
              <MaterialSymbol name="trending_down" className="text-primary" />
              Cutoff trends
            </h3>

            <div className="relative self-start sm:self-auto">
              <label
                htmlFor={categorySelectId}
                className="relative flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-low px-4 py-2 transition hover:border-primary/50"
              >
                <span className="text-xs font-semibold text-on-surface-variant">
                  Category
                </span>
                <select
                  id={categorySelectId}
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryFilter)}
                  className="cursor-pointer appearance-none border-none bg-transparent pr-7 text-sm font-bold text-primary focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option
                      key={cat.value}
                      value={cat.value}
                      className="bg-surface-container-lowest text-on-surface"
                    >
                      {cat.label}
                    </option>
                  ))}
                </select>
                <MaterialSymbol
                  name="expand_more"
                  className="pointer-events-none absolute right-3 text-primary"
                />
              </label>
            </div>
          </div>

          {filteredCutoffs.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-outline-variant bg-surface-container-lowest">
              <table className="w-full min-w-[700px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    <th className="px-4 py-3 font-semibold">Round</th>
                    <th className="px-4 py-3 font-semibold">Seat Type</th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Closing Rank<br />
                      <span className="text-[10px] font-medium lowercase tracking-normal md:uppercase text-text-muted">
                        (air)
                      </span>
                    </th>

                    {/* Optional Columns rendered only if data exists in the filtered rows */}
                    {hasStateRank && (
                      <th className="px-4 py-3 font-semibold text-right">
                        Closing Rank<br />
                        <span className="text-[10px] font-medium lowercase tracking-normal md:uppercase text-text-muted">
                          (state)
                        </span>
                      </th>
                    )}
                    {hasCategoryRank && (
                      <th className="px-4 py-3 font-semibold text-right">
                        Closing Rank<br />
                        <span className="text-[10px] font-medium lowercase tracking-normal md:uppercase text-text-muted">
                          (category)
                        </span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredCutoffs.map((cutoff, idx) => {
                    const isLatest = cutoff.year === latestYear;
                    return (
                      <tr
                        key={idx}
                        className={cn(
                          "border-b border-border/15 hover:bg-surface-container-lowest transition-colors duration-150 last:border-b-0",
                          isLatest && "bg-primary/5"
                        )}
                      >
                        {/* Round */}
                        <td className="px-4 py-3.5 font-bold text-primary">
                          <div className="flex items-center gap-2">
                            <span>{cutoff.year}{cutoff.round ? ` - ${cutoff.round}` : ""}</span>
                            {isLatest && (
                              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide shadow-xs border bg-brand-50 border-brand-200 text-brand-700">
                                Latest
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Seat Type (Quota) */}
                        <td className="px-4 py-3.5 font-semibold text-text-secondary">
                          {cutoff.category} / {cutoff.quota}
                        </td>

                        {/* Closing Rank (AIR) */}
                        <td className="px-4 py-3.5 text-right font-extrabold text-text">
                          {cutoff.closingRank !== undefined ? formatNumber(cutoff.closingRank) : "—"}
                        </td>

                        {/* Optional State Ranks */}
                        {hasStateRank && (
                          <td className="px-4 py-3.5 text-right font-extrabold text-text">
                            {cutoff.stateClosingRank !== undefined ? formatNumber(cutoff.stateClosingRank) : "—"}
                          </td>
                        )}

                        {/* Optional Category Ranks */}
                        {hasCategoryRank && (
                          <td className="px-4 py-3.5 text-right font-extrabold text-text">
                            {cutoff.categoryClosingRank || "—"}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-8 text-center">
              <div className="rounded-full bg-primary-fixed p-3 text-primary">
                <MaterialSymbol name="info" className="text-3xl" />
              </div>
              <h4 className="font-bold text-on-surface">
                No cutoff data for this category
              </h4>
              <p className="max-w-md text-xs text-on-surface-variant">
                There are no cutoff trends recorded for{" "}
                <span className="font-semibold text-on-surface">
                  {CATEGORIES.find((c) => c.value === category)?.label}
                </span>
                . Try another category from the menu above.
              </p>
            </div>
          )}
        </div>
      </DetailPanel>
    </section>
  );
}
