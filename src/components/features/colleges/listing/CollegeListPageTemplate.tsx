import type { ReactNode } from "react";
import { Pagination } from "@/components/ui/Pagination";
import { CollegeFiltersPanel } from "./CollegeFiltersPanel";
import { CollegeSortControl } from "./CollegeSortControl";
import { CollegeResultsGrid } from "./CollegeResultsGrid";
import type {
  CollegeFilters,
  FilterOptionGroups,
} from "@/types/filters";
import type { CollegeListingViewModel } from "@/types/listing";
import { buildFilterSearchParams } from "@/lib/colleges/search-params";
import { formatNumber } from "@/lib/utils";

interface CollegeListPageTemplateProps {
  basePath: string;
  filters: CollegeFilters;
  filterOptions: FilterOptionGroups;
  listing: CollegeListingViewModel;
  hiddenFilters?: Array<"state" | "collegeTypes">;
  lockedFilters?: Pick<CollegeFilters, "state" | "collegeTypes" | "feeMax">;
  intro?: ReactNode;
}

export function CollegeListPageTemplate({
  basePath,
  filters,
  filterOptions,
  listing,
  hiddenFilters,
  lockedFilters,
  intro,
}: CollegeListPageTemplateProps) {
  const buildPageHref = (page: number) => {
    const params = buildFilterSearchParams(filters);
    if (page > 1) params.set("page", String(page));
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  return (
    <div className="flex flex-col gap-8">
      {intro}
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <CollegeFiltersPanel
            basePath={basePath}
            filters={filters}
            filterOptions={filterOptions}
            hiddenFields={hiddenFilters}
            lockedFilters={lockedFilters}
          />
        </aside>
        <section className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium tracking-wide text-text-muted">
              Showing{" "}
              <span className="font-semibold text-text">
                {formatNumber(listing.items.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-text">
                {formatNumber(listing.pagination.totalItems)}
              </span>{" "}
              colleges
            </p>
            <CollegeSortControl basePath={basePath} filters={filters} />
          </div>
          <CollegeResultsGrid
            colleges={listing.items}
            resetHref={basePath}
          />
          <Pagination
            currentPage={listing.pagination.page}
            totalPages={listing.pagination.totalPages}
            buildHref={buildPageHref}
          />
        </section>
      </div>
    </div>
  );
}
