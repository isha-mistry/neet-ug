"use client";

import { useEffect, useState } from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { cn } from "@/lib/utils";
import { useCollegeListingNavigation } from "@/lib/colleges/use-college-listing-navigation";
import { SORT_OPTIONS } from "@/lib/constants";
import type {
  CollegeFilters,
  FilterOptionGroups,
  ListingCollegeType,
  ListingQuota,
  SortValue,
} from "@/types/filters";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import type { OptionItem } from "@/types/core";

interface CollegeListingToolbarProps {
  basePath: string;
  filters: CollegeFilters;
  filterOptions: FilterOptionGroups;
  hiddenFields?: Array<"state" | "collegeType" | "collegeTypes">;
  lockedFilters?: Pick<CollegeFilters, "state" | "collegeTypes" | "feeMax">;
}

function FilterPill<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
  trailingIcon = "expand_more",
}: {
  label: string;
  value: T | "";
  options: OptionItem<T | "">[];
  onChange: (value: T | "") => void;
  disabled?: boolean;
  trailingIcon?: string;
}) {
  const active = Boolean(value);
  const selected = options.find((o) => o.value === value);
  const display = selected && selected.value !== "" ? selected.label : label;

  return (
    <label
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border px-4 py-2 font-label-md text-label-md transition-colors",
        active
          ? "border-primary-fixed bg-primary-fixed text-on-primary-fixed"
          : "border-outline-variant bg-surface-container-highest text-on-surface-variant hover:border-outline hover:bg-surface-container-high",
        disabled && "pointer-events-none opacity-60"
      )}
    >
      <span className="pointer-events-none max-w-[9rem] truncate">{display}</span>
      <MaterialSymbol
        name={trailingIcon}
        className="pointer-events-none shrink-0 opacity-80"
      />
      <select
        className="absolute inset-0 cursor-pointer opacity-0"
        value={value}
        disabled={disabled}
        aria-label={label}
        onChange={(e) => onChange(e.target.value as T | "")}
      >
        {options.map((opt) => (
          <option key={opt.value || "__any"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CollegeListingToolbar({
  basePath,
  filters,
  filterOptions,
  hiddenFields = [],
  lockedFilters,
}: CollegeListingToolbarProps) {
  const { navigate, isPending } = useCollegeListingNavigation({
    basePath,
    filters,
    hiddenFields,
    lockedFilters,
  });

  const [searchDraft, setSearchDraft] = useState(filters.q ?? "");

  useEffect(() => {
    setSearchDraft(filters.q ?? "");
  }, [filters.q]);

  useEffect(() => {
    const trimmed = searchDraft.trim();
    const current = (filters.q ?? "").trim();
    if (trimmed === current) return;

    const timer = window.setTimeout(() => {
      navigate({ q: trimmed || undefined });
    }, 350);

    return () => window.clearTimeout(timer);
  }, [searchDraft, filters.q, navigate]);

  const stateOptions = [
    { value: "" as const, label: "All states" },
    ...filterOptions.states,
  ];

  const quotaOptions = [
    { value: "" as const, label: "Any quota" },
    ...filterOptions.quotas,
  ];

  const categoryOptions = [
    { value: "" as const, label: "Open / General" },
    ...filterOptions.categories.filter((c) => c.value !== "general"),
  ];

  const collegeTypeOptions = [
    { value: "" as const, label: "Any type" },
    ...filterOptions.collegeTypes,
  ];

  const sortOptions: OptionItem<SortValue | "">[] = [
    { value: "", label: "Default (A–Z)" },
    ...SORT_OPTIONS,
  ];

  const collegeTypeValue =
    filters.collegeType ??
    (filters.collegeTypes?.length === 1 &&
    (filters.collegeTypes[0] === "government" ||
      filters.collegeTypes[0] === "private" ||
      filters.collegeTypes[0] === "deemed")
      ? filters.collegeTypes[0]
      : "");

  const lockedStateLabel = lockedFilters?.state
    ? filterOptions.states.find((s) => s.value === lockedFilters.state)?.label
    : undefined;

  return (
    <section
      className={cn(
        "sticky top-20 z-40 flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface-elevated/80 p-4 shadow-sm backdrop-blur-md md:flex-row md:items-center md:justify-between",
        isPending && "opacity-90"
      )}
      aria-busy={isPending}
    >
      <div className="relative w-full md:max-w-md md:flex-1">
        <MaterialSymbol
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline"
        />
        <input
          type="search"
          value={searchDraft}
          onChange={(e) => setSearchDraft(e.target.value)}
          placeholder="Search by college name, city or state..."
          className="h-11 w-full rounded-lg border border-outline-variant bg-surface-elevated py-2 pl-10 pr-4 text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none"
          aria-label="Search colleges"
        />
      </div>

      <div className="flex w-full gap-2 overflow-x-auto pb-1 md:w-auto md:justify-end md:pb-0">
        {hiddenFields.includes("state") && lockedStateLabel ? (
          <span className="inline-flex shrink-0 items-center rounded-full border border-primary-fixed bg-primary-fixed px-4 py-2 font-label-md text-label-md text-on-primary-fixed">
            {lockedStateLabel}
          </span>
        ) : hiddenFields.includes("state") ? null : (
          <FilterPill
            label="State / Domicile"
            value={filters.state ?? ""}
            options={stateOptions}
            disabled={isPending}
            onChange={(value) => navigate({ state: value || undefined })}
          />
        )}
        <FilterPill
          label="Quota"
          value={filters.quota ?? ""}
          options={quotaOptions}
          disabled={isPending}
          onChange={(value) =>
            navigate({
              quota: (value || undefined) as ListingQuota | undefined,
            })
          }
        />
        <FilterPill
          label="Category"
          value={filters.category ?? ""}
          options={categoryOptions}
          disabled={isPending}
          onChange={(value) =>
            navigate({
              category: (value || undefined) as NeetCategory | undefined,
            })
          }
        />
        {hiddenFields.includes("collegeType") ||
        hiddenFields.includes("collegeTypes") ? null : (
          <FilterPill
            label="College Type"
            value={collegeTypeValue}
            options={collegeTypeOptions}
            disabled={isPending}
            onChange={(value) =>
              navigate({
                collegeType: (value || undefined) as
                  | ListingCollegeType
                  | undefined,
                collegeTypes: undefined,
              })
            }
          />
        )}
        <FilterPill
          label="Sort by"
          value={filters.sort ?? ""}
          options={sortOptions}
          disabled={isPending}
          trailingIcon="tune"
          onChange={(value) =>
            navigate({
              sort: (value || undefined) as SortValue | undefined,
            })
          }
        />
      </div>
    </section>
  );
}
