"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import type { CollegeCutoff } from "@/types/college";
import { formatNumber } from "@/lib/utils";
import { FiChevronDown, FiAlertCircle, FiTrendingUp } from "react-icons/fi";
import {
  type CategoryFilter,
  CATEGORIES,
  matchesSelectedCategory,
} from "@/lib/colleges/categories";
import { DetailSectionHeader } from "@/components/features/colleges/shared/DetailSectionHeader";
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

  return (
    <section className="flex flex-col gap-4 animate-fadeIn">
      {/* Reusable Premium Header */}
      <DetailSectionHeader
        title="Admission & Cutoffs"
        description="Year-wise cutoff ranks, seat types, and category opening/closing rank distributions"
        theme="brand"
      />

      <Card padded className="flex flex-col gap-6 bg-surface-container-lowest">
        {/* Cutoff Trends Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-base font-bold flex items-center gap-2 text-text">
              <FiTrendingUp className="text-primary" /> Cutoff Trends
            </h3>

            {/* Dropdown Styled EXACTLY like Reference Image 1 */}
            <div className="relative inline-block text-left self-start sm:self-auto">
              <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 shadow-xs hover:border-primary transition-all duration-200 cursor-pointer">
                <span className="text-xs font-semibold text-text-secondary whitespace-nowrap">
                  Category:
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryFilter)}
                  className="appearance-none bg-transparent pr-6 text-sm font-bold text-brand-600 cursor-pointer border-none focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value} className="bg-surface text-text">
                      {cat.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3.5 pointer-events-none text-brand-600 h-4 w-4" />
              </div>
            </div>
          </div>

          {filteredCutoffs.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-border bg-surface">
              <table className="w-full min-w-[700px] text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-container-low text-text-muted text-xs font-bold uppercase tracking-wider">
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
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border p-8 text-center bg-surface">
              <div className="rounded-full p-3 bg-brand-50 text-primary">
                <FiAlertCircle size={28} />
              </div>
              <h4 className="font-bold text-text-secondary">
                No Cutoff Data Found
              </h4>
              <p className="max-w-md text-xs text-text-muted">
                There are no cutoff trends recorded for the <span className="font-semibold text-text">{CATEGORIES.find(c => c.value === category)?.label}</span> category at this college. Please choose another category.
              </p>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
