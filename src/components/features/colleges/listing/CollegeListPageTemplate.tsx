import type { ReactNode } from "react";
import { Pagination } from "@/components/ui/Pagination";
import { CollegeListingToolbar } from "./CollegeListingToolbar";
import { CollegeResultsGrid } from "./CollegeResultsGrid";
import type {
  CollegeFilters,
  FilterOptionGroups,
} from "@/types/filters";
import type { CollegeListingViewModel } from "@/types/listing";
import { buildFilterSearchParams } from "@/lib/colleges/search-params";
import {
  getListingCategoryShortLabel,
  getListingFeeQuotaShort,
} from "@/lib/colleges/listing-options";
import { formatNumber } from "@/lib/utils";

interface CollegeListPageTemplateProps {
  basePath: string;
  filters: CollegeFilters;
  filterOptions: FilterOptionGroups;
  listing: CollegeListingViewModel;
  hiddenFilters?: Array<"state" | "collegeType" | "collegeTypes">;
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

  const resetParams = buildFilterSearchParams({
    state: lockedFilters?.state ?? filters.state,
    collegeTypes: lockedFilters?.collegeTypes,
    feeMax: lockedFilters?.feeMax,
  });
  const resetQuery = resetParams.toString();
  const resetHref =
    lockedFilters?.feeMax !== undefined || lockedFilters?.collegeTypes?.length
      ? resetQuery
        ? `${basePath}?${resetQuery}`
        : basePath
      : basePath;

  const rankCategoryShort = getListingCategoryShortLabel(filters.category);
  const feeQuotaShort = getListingFeeQuotaShort(filters.quota);

  return (
    <div className="flex flex-col gap-8">
      {intro}
      <CollegeListingToolbar
        basePath={basePath}
        filters={filters}
        filterOptions={filterOptions}
        hiddenFields={hiddenFilters}
        lockedFilters={lockedFilters}
      />

      <section className="flex flex-col gap-6">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Showing{" "}
          <span className="font-semibold text-on-surface">
            {formatNumber(listing.items.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-on-surface">
            {formatNumber(listing.pagination.totalItems)}
          </span>{" "}
          colleges
        </p>
        <CollegeResultsGrid
          colleges={listing.items}
          resetHref={resetHref}
          rankCategoryShort={rankCategoryShort}
          feeQuotaShort={feeQuotaShort}
        />
        <Pagination
          currentPage={listing.pagination.page}
          totalPages={listing.pagination.totalPages}
          buildHref={buildPageHref}
        />
      </section>
    </div>
  );
}
