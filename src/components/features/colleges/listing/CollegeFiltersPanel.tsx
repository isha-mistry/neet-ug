"use client";

import { FiFilter, FiX } from "react-icons/fi";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { buildListingHref } from "@/lib/colleges/search-params";
import { useCollegeListingNavigation } from "@/lib/colleges/use-college-listing-navigation";
import type {
  CollegeFilters,
  FilterOptionGroups,
  ListingCollegeType,
  ListingQuota,
} from "@/types/filters";
import type { NeetCategory } from "@/lib/rank-predictor/types";

interface CollegeFiltersPanelProps {
  basePath: string;
  filters: CollegeFilters;
  filterOptions: FilterOptionGroups;
  hiddenFields?: Array<"state" | "collegeType" | "collegeTypes">;
  lockedFilters?: Pick<CollegeFilters, "state" | "collegeTypes" | "feeMax">;
}

export function CollegeFiltersPanel({
  basePath,
  filters,
  filterOptions,
  hiddenFields = [],
  lockedFilters,
}: CollegeFiltersPanelProps) {
  const { navigate, isPending } = useCollegeListingNavigation({
    basePath,
    filters,
    hiddenFields,
    lockedFilters,
  });

  const lockedState = lockedFilters?.state ?? filters.state;
  const lockedTypes = lockedFilters?.collegeTypes ?? filters.collegeTypes;

  const stateOptions = [
    { value: "", label: "All states" },
    ...filterOptions.states,
  ];

  const quotaOptions = [{ value: "", label: "Any" }, ...filterOptions.quotas];

  const categoryOptions = [
    { value: "", label: "Open / General" },
    ...filterOptions.categories.filter((c) => c.value !== "general"),
  ];

  const collegeTypeOptions = [
    { value: "", label: "Any" },
    ...filterOptions.collegeTypes,
  ];

  const collegeTypeValue =
    filters.collegeType ??
    (filters.collegeTypes?.length === 1 &&
    (filters.collegeTypes[0] === "government" ||
      filters.collegeTypes[0] === "private" ||
      filters.collegeTypes[0] === "deemed")
      ? filters.collegeTypes[0]
      : "");

  const resetHref =
    lockedFilters?.feeMax !== undefined || lockedTypes?.length
      ? buildListingHref(basePath, {
          state: lockedState,
          collegeTypes: lockedTypes,
          feeMax: lockedFilters?.feeMax,
        })
      : basePath;

  return (
    <Card
      padded
      bordered
      className="bg-surface-elevated"
      aria-busy={isPending}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <div className="inline-flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand-700">
            <FiFilter aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <h2 className="text-base font-semibold tracking-snug text-text">
              Filters
            </h2>
            <p className="text-xs tracking-wide text-text-muted">
              Domicile, quota, category, and college type.
            </p>
          </div>
        </div>
        <Link
          href={resetHref}
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-text-muted transition-colors hover:text-brand-700"
        >
          <FiX aria-hidden="true" />
          Reset
        </Link>
      </header>
      <div className="mt-5 flex flex-col gap-4">
        {hiddenFields.includes("state") ? null : (
          <Select
            label="State / Domicile"
            options={stateOptions}
            value={filters.state ?? ""}
            disabled={isPending}
            onValueChange={(value) =>
              navigate({ state: value || undefined })
            }
          />
        )}
        <Select
          label="Quota"
          options={quotaOptions}
          value={filters.quota ?? ""}
          disabled={isPending}
          onValueChange={(value) =>
            navigate({
              quota: (value || undefined) as ListingQuota | undefined,
            })
          }
        />
        <Select
          label="Category"
          options={categoryOptions}
          value={filters.category ?? ""}
          disabled={isPending}
          onValueChange={(value) =>
            navigate({
              category: (value || undefined) as NeetCategory | undefined,
            })
          }
        />
        {hiddenFields.includes("collegeType") ||
        hiddenFields.includes("collegeTypes") ? null : (
          <Select
            label="College Type"
            options={collegeTypeOptions}
            value={collegeTypeValue}
            disabled={isPending}
            onValueChange={(value) =>
              navigate({
                collegeType: (value || undefined) as
                  | ListingCollegeType
                  | undefined,
                collegeTypes: undefined,
              })
            }
          />
        )}
      </div>
    </Card>
  );
}
