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
  const firstResult =
    listing.pagination.totalItems === 0
      ? 0
      : (listing.pagination.page - 1) * listing.pagination.pageSize + 1;
  const lastResult = Math.min(
    listing.pagination.page * listing.pagination.pageSize,
    listing.pagination.totalItems
  );
  const contextItems = [
    filters.state
      ? filterOptions.states.find((state) => state.value === filters.state)?.label ?? filters.state
      : "All India",
    filters.quota
      ? filterOptions.quotas.find((quota) => quota.value === filters.quota)?.label
      : "All quotas",
    filters.category
      ? filterOptions.categories.find((category) => category.value === filters.category)?.label
      : "Open category",
  ].filter(Boolean);

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

      <section className="flex flex-col gap-6 ">
        <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.2)] md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Results
              </p>
              <p className="font-headline-md text-headline-md text-on-surface">
                {firstResult > 0
                  ? `${formatNumber(firstResult)}-${formatNumber(lastResult)} of ${formatNumber(
                    listing.pagination.totalItems
                  )} colleges`
                  : "No colleges found"}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {contextItems.join(" · ")} · Page{" "}
                {formatNumber(listing.pagination.page)} of{" "}
                {formatNumber(listing.pagination.totalPages)}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center sm:min-w-[22rem]">
              <ResultStat label="Loaded" value={formatNumber(listing.items.length)} />
              <ResultStat
                label="Rank view"
                value={rankCategoryShort}
              />
              <ResultStat
                label="Fee view"
                value={feeQuotaShort}
              />
            </div>
          </div>
        </div>
        <CollegeResultsGrid
          colleges={listing.items}
          resetHref={resetHref}
          hasSearch={Boolean(filters.q)}
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

function ResultStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-outline-variant/35 bg-surface-container-low px-3 py-2.5">
      <p className="text-[10px] font-bold uppercase tracking-wider text-outline">{label}</p>
      <p className="mt-1 truncate text-sm font-bold text-on-surface">{value}</p>
    </div>
  );
}
