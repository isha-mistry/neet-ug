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
    (c) => c.stateOpeningRank !== undefined || c.stateClosingRank !== undefined
  );

  const hasCategoryRank = filteredCutoffs.some(
    (c) => c.categoryOpeningRank !== undefined || c.categoryClosingRank !== undefined
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

      <Card padded className="flex flex-col gap-6">
        {/* Cutoff Trends Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 
              className="text-base font-bold flex items-center gap-2"
              style={{ color: "var(--color-text)" }}
            >
              <FiTrendingUp style={{ color: "var(--color-primary)" }} /> Cutoff Trends
            </h3>

            {/* Dropdown Styled EXACTLY like Reference Image 1 */}
            <div className="ms-dropdown-container self-start sm:self-auto">
              <div className="ms-dropdown-wrapper">
                <span className="ms-dropdown-label">
                  Category:
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryFilter)}
                  className="ms-dropdown-select"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value} className="bg-surface text-text">
                      {cat.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="ms-dropdown-icon" />
              </div>
            </div>
          </div>

          {filteredCutoffs.length > 0 ? (
            <div className="ms-table-container">
              <table className="ms-table">
                <thead>
                  <tr className="ms-table-header-tr">
                    <th className="ms-table-th">Round</th>
                    <th className="ms-table-th">Seat Type</th>
                    <th className="ms-table-th-right">
                      Opening Rank<br />
                      <span 
                        className="text-[10px] font-medium lowercase tracking-normal md:uppercase"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        (air)
                      </span>
                    </th>
                    <th className="ms-table-th-right">
                      Closing Rank<br />
                      <span 
                        className="text-[10px] font-medium lowercase tracking-normal md:uppercase"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        (air)
                      </span>
                    </th>

                    {/* Optional Columns rendered only if data exists in the filtered rows */}
                    {hasStateRank && (
                      <>
                        <th className="ms-table-th-right">
                          Opening Rank<br />
                          <span 
                            className="text-[10px] font-medium lowercase tracking-normal md:uppercase"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            (state)
                          </span>
                        </th>
                        <th className="ms-table-th-right">
                          Closing Rank<br />
                          <span 
                            className="text-[10px] font-medium lowercase tracking-normal md:uppercase"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            (state)
                          </span>
                        </th>
                      </>
                    )}
                    {hasCategoryRank && (
                      <>
                        <th className="ms-table-th-right">
                          Opening Rank<br />
                          <span 
                            className="text-[10px] font-medium lowercase tracking-normal md:uppercase"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            (category)
                          </span>
                        </th>
                        <th className="ms-table-th-right">
                          Closing Rank<br />
                          <span 
                            className="text-[10px] font-medium lowercase tracking-normal md:uppercase"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            (category)
                          </span>
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredCutoffs.map((cutoff, idx) => {
                    const isLatest = cutoff.year === latestYear;
                    return (
                      <tr
                        key={idx}
                        className={`ms-table-row ${isLatest ? "ms-table-row-latest" : ""}`}
                      >
                        {/* Round */}
                        <td className="ms-table-td ms-table-td-bold-brand">
                          <div className="flex items-center gap-2">
                            <span>{cutoff.year}{cutoff.round ? ` - ${cutoff.round}` : ""}</span>
                            {isLatest && (
                              <span 
                                className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide shadow-sm border"
                                style={{
                                  backgroundColor: "var(--color-brand-50)",
                                  borderColor: "var(--color-brand-200)",
                                  color: "var(--color-brand-700)",
                                }}
                              >
                                Latest
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Seat Type (Quota) */}
                        <td className="ms-table-td ms-table-td-semibold">
                          {cutoff.category} / {cutoff.quota}
                        </td>

                        {/* Opening Rank (AIR) */}
                        <td className="ms-table-td ms-table-td-right">
                          {cutoff.openingRank !== undefined ? formatNumber(cutoff.openingRank) : "—"}
                        </td>

                        {/* Closing Rank (AIR) */}
                        <td className="ms-table-td ms-table-td-right-bold">
                          {cutoff.closingRank !== undefined ? formatNumber(cutoff.closingRank) : "—"}
                        </td>

                        {/* Optional State Ranks */}
                        {hasStateRank && (
                          <>
                            <td className="ms-table-td ms-table-td-right">
                              {cutoff.stateOpeningRank !== undefined ? formatNumber(cutoff.stateOpeningRank) : "—"}
                            </td>
                            <td className="ms-table-td ms-table-td-right-bold">
                              {cutoff.stateClosingRank !== undefined ? formatNumber(cutoff.stateClosingRank) : "—"}
                            </td>
                          </>
                        )}

                        {/* Optional Category Ranks */}
                        {hasCategoryRank && (
                          <>
                            <td className="ms-table-td ms-table-td-right">
                              {cutoff.categoryOpeningRank || "—"}
                            </td>
                            <td className="ms-table-td ms-table-td-right-bold">
                              {cutoff.categoryClosingRank || "—"}
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div 
              className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-8 text-center"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <div 
                className="rounded-full p-3"
                style={{
                  backgroundColor: "var(--color-brand-50)",
                  color: "var(--color-primary)",
                }}
              >
                <FiAlertCircle size={28} />
              </div>
              <h4 
                className="font-bold"
                style={{ color: "var(--color-text-secondary)" }}
              >
                No Cutoff Data Found
              </h4>
              <p 
                className="max-w-md text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                There are no cutoff trends recorded for the <span className="font-semibold text-text">{CATEGORIES.find(c => c.value === category)?.label}</span> category at this college. Please choose another category.
              </p>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
