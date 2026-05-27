import Link from "next/link";
import { FiArrowDownRight } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS } from "@/lib/constants";
import { buildFilterSearchParams } from "@/lib/colleges/search-params";
import type { CollegeFilters, SortValue } from "@/types/filters";

interface CollegeSortControlProps {
  basePath: string;
  filters: CollegeFilters;
}

export function CollegeSortControl({
  basePath,
  filters,
}: CollegeSortControlProps) {
  const buildHref = (sort: SortValue) => {
    const params = buildFilterSearchParams(filters);
    params.set("sort", sort);
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-text-muted">
        <FiArrowDownRight aria-hidden="true" />
        Sort by
      </span>
      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map((option) => {
          const isActive = filters.sort === option.value;
          return (
            <Link
              key={option.value}
              href={buildHref(option.value)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "inline-flex h-9 items-center rounded-[var(--radius-pill)] border px-3 text-xs font-semibold uppercase tracking-widest transition-colors",
                isActive
                  ? "border-brand-700 bg-brand-700 text-text-on-brand"
                  : "border-border bg-background text-text-secondary hover:border-brand-300 hover:text-brand-700"
              )}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
