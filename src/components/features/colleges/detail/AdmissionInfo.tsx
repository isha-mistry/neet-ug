"use client";

import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
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

interface ColumnTooltipProps {
  title: string;
  description: string;
  linkHref?: string;
  linkText?: string;
}

function ColumnInfoTooltip({ title, description, linkHref, linkText }: ColumnTooltipProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const calculatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(10, rect.left - 20), typeof window !== "undefined" ? window.innerWidth - 270 : 200);
    const y = rect.bottom + 6;
    setCoords({ x, y });
  };

  const handlePointerEnter = () => {
    calculatePosition();
    setOpen(true);
  };

  return (
    <div className="relative inline-flex items-center ml-1.5 align-middle">
      <button
        ref={buttonRef}
        type="button"
        onMouseEnter={handlePointerEnter}
        onMouseLeave={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          if (!open) handlePointerEnter();
          else setOpen(false);
        }}
        className="inline-flex items-center justify-center rounded-full text-on-surface-variant/80 hover:text-primary hover:bg-primary/10 p-0.5 transition-colors cursor-help"
        aria-label={`Info about ${title}`}
      >
        <MaterialSymbol name="info" className="text-[15px]" />
      </button>

      {open && coords && typeof document !== "undefined" &&
        createPortal(
          <div
            style={{ position: "fixed", left: coords.x, top: coords.y, zIndex: 99999 }}
            className="w-64 rounded-xl border border-outline-variant bg-surface-container-highest p-3.5 shadow-xl text-left font-normal animate-in fade-in-0 zoom-in-95 duration-150"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
              <MaterialSymbol name="help" className="text-[16px] text-primary" />
              <span>{title}</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-on-surface-variant normal-case tracking-normal">
              {description}
            </p>
            {linkHref && (
              <Link
                href={linkHref}
                onClick={() => setOpen(false)}
                className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline normal-case tracking-normal"
              >
                <span>{linkText || "Learn more in Terms Explained →"}</span>
                <MaterialSymbol name="arrow_forward" className="text-[13px]" />
              </Link>
            )}
          </div>,
          document.body
        )}
    </div>
  );
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

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-on-surface">
            <div className="flex items-center gap-2">
              <MaterialSymbol name="lightbulb" className="text-primary text-[18px] shrink-0" />
              <span>Unsure about a reservation category code or seat quota? Hover over column info icons or open our complete glossary.</span>
            </div>
            <Link
              href="/neet-ug-2026/terms-explained#abbreviations"
              className="inline-flex items-center gap-1 shrink-0 font-bold text-primary hover:underline"
            >
              <span>View Terms Explained</span>
              <MaterialSymbol name="arrow_forward" className="text-[14px] hover:no-underline!" />
            </Link>
          </div>

          {filteredCutoffs.length > 0 ? (
            <div className="overflow-x-auto rounded-[14px] border border-outline-variant bg-surface-container-lowest">
              <table className="w-full min-w-[700px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">
                      <div className="inline-flex items-center">
                        <span>Round</span>
                        <ColumnInfoTooltip
                          title="Counselling Round"
                          description="The specific allotment phase (e.g., Round 1, Round 2, Mop-Up, Stray Vacancy) in which the closing rank was recorded."
                        />
                      </div>
                    </th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">
                      <div className="inline-flex items-center">
                        <span>Category</span>
                        <ColumnInfoTooltip
                          title="Reservation Category Code"
                          description="Social or vertical reservation category (e.g., OPEN, OBC, SC, ST, EWS, SEBC) under which the seat was allotted."
                          linkHref="/neet-ug-2026/terms-explained#abbreviations"
                          linkText="Decode Category Codes in Terms Explained"
                        />
                      </div>
                    </th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">
                      <div className="inline-flex items-center">
                        <span>Seat Type</span>
                        <ColumnInfoTooltip
                          title="Seat Type & Quota Pool"
                          description="Admission quota or horizontal reservation code (e.g., AIQ, State Quota, Management Quota, NRI, Earmarked)."
                          linkHref="/neet-ug-2026/terms-explained#abbreviations"
                          linkText="Decode Seat Types in Terms Explained"
                        />
                      </div>
                    </th>
                    <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end">
                        <span>Closing Rank (AIR)</span>
                        <ColumnInfoTooltip
                          title="All India Rank (AIR)"
                          description="The overall All India NEET merit rank of the last candidate admitted to this course under this category and quota pool."
                        />
                      </div>
                    </th>

                    {/* Optional Columns rendered only if data exists in the filtered rows */}
                    {hasStateRank && (
                      <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end">
                          <span>Closing Rank (State)</span>
                          <ColumnInfoTooltip
                            title="State Merit Rank"
                            description="The state-level merit rank assigned by state counselling authorities of the last admitted candidate."
                          />
                        </div>
                      </th>
                    )}
                    {hasCategoryRank && (
                      <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end">
                          <span>Closing Rank (Category)</span>
                          <ColumnInfoTooltip
                            title="Category Merit Rank"
                            description="The specific category-wise merit rank of the last admitted candidate within their reservation group."
                          />
                        </div>
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

                        {/* Category */}
                        <td className="px-4 py-3.5 font-semibold text-on-surface whitespace-nowrap">
                          <span className="inline-flex items-center rounded-md bg-surface-container-high px-2 py-0.5 text-xs font-bold text-on-surface border border-outline-variant/60">
                            {cutoff.dbCategory || cutoff.category || "—"}
                          </span>
                        </td>

                        {/* Seat Type (Quota) */}
                        <td className="px-4 py-3.5 font-semibold text-text-secondary whitespace-nowrap">
                          {cutoff.dbSeatType || cutoff.quota || "—"}
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
