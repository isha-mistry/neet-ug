"use client";

import { useMemo, useState } from "react";
import { FiPlus, FiSearch, FiX } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useComparisonStore } from "@/store/comparison.store";
import { COMPARISON_MAX_SELECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { CollegeSummary } from "@/types/listing";

interface CollegeSelectorProps {
  catalog: CollegeSummary[];
}

export function CollegeSelector({ catalog }: CollegeSelectorProps) {
  const selectedSlugs = useComparisonStore((state) => state.selectedSlugs);
  const add = useComparisonStore((state) => state.add);
  const remove = useComparisonStore((state) => state.remove);
  const clear = useComparisonStore((state) => state.clear);

  const [query, setQuery] = useState("");

  const selected = useMemo(
    () =>
      selectedSlugs
        .map((slug) => catalog.find((c) => c.slug === slug))
        .filter((c): c is CollegeSummary => Boolean(c)),
    [catalog, selectedSlugs]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalog.slice(0, 8);
    return catalog
      .filter((college) => {
        return (
          college.name.toLowerCase().includes(q) ||
          college.city.toLowerCase().includes(q) ||
          college.stateName.toLowerCase().includes(q)
        );
      })
      .slice(0, 12);
  }, [catalog, query]);

  return (
    <Card padded bordered>
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-snug text-text">
            Select Colleges
          </h2>
          <p className="text-sm tracking-wide text-text-muted">
            Pick up to {COMPARISON_MAX_SELECTIONS} colleges to compare.
          </p>
        </div>
        {selected.length > 0 ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            leadingIcon={<FiX aria-hidden="true" />}
            onClick={clear}
          >
            Clear All
          </Button>
        ) : null}
      </header>

      <div className="mt-4 flex flex-wrap gap-2 min-h-9">
        {selected.length === 0 ? (
          <p className="text-sm tracking-wide text-text-muted">
            No colleges selected yet.
          </p>
        ) : (
          selected.map((college) => (
            <span
              key={college.slug}
              className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold tracking-wide text-brand-800"
            >
              {college.name}
              <button
                type="button"
                aria-label={`Remove ${college.name}`}
                onClick={() => remove(college.slug)}
                className="inline-flex h-4 w-4 items-center justify-center rounded-[var(--radius-pill)] text-brand-800 transition-colors hover:bg-brand-100"
              >
                <FiX aria-hidden="true" />
              </button>
            </span>
          ))
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <Input
          name="search"
          placeholder="Search by name, city, or state"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          leadingIcon={<FiSearch aria-hidden="true" />}
        />
        <ul className="flex flex-col divide-y divide-border rounded-[var(--radius-md)] border border-border bg-surface">
          {filtered.length === 0 ? (
            <li className="px-3 py-3 text-sm tracking-wide text-text-muted">
              No colleges match your search.
            </li>
          ) : (
            filtered.map((college) => {
              const isSelected = selectedSlugs.includes(college.slug);
              const disabled =
                !isSelected &&
                selectedSlugs.length >= COMPARISON_MAX_SELECTIONS;
              return (
                <li
                  key={college.slug}
                  className="flex items-center justify-between gap-3 px-3 py-2.5"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-tight text-text">
                      {college.name}
                    </span>
                    <span className="text-xs tracking-wide text-text-muted">
                      {college.city}, {college.stateName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      isSelected ? remove(college.slug) : add(college.slug)
                    }
                    disabled={disabled}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-[var(--radius-md)] border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors",
                      isSelected
                        ? "border-brand-700 bg-brand-700 text-text-on-brand"
                        : disabled
                        ? "cursor-not-allowed border-border bg-surface text-text-muted opacity-60"
                        : "border-border bg-background text-text hover:border-brand-300 hover:text-brand-700"
                    )}
                  >
                    {isSelected ? "Selected" : <><FiPlus aria-hidden="true" /> Add</>}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </Card>
  );
}
