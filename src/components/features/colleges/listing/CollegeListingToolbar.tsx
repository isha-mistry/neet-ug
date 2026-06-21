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
  activeLabel,
  trailingIcon = "expand_more",
}: {
  label: string;
  value: T | "";
  options: OptionItem<T | "">[];
  onChange: (value: T | "") => void;
  disabled?: boolean;
  activeLabel?: string;
  trailingIcon?: string;
}) {
  const active = Boolean(value || activeLabel);
  const selected = options.find((o) => o.value === value);
  const display = activeLabel ?? (selected && selected.value !== "" ? selected.label : label);

  return (
    <label
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border px-4 py-2 font-label-md text-label-md transition-colors focus-within:ring-2 focus-within:ring-primary/25",
        active
          ? "border-primary/20 bg-primary-fixed text-on-primary-fixed"
          : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-primary/30 hover:bg-primary-fixed/30 hover:text-primary",
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

function parseRangeValue(value: string): { min?: number; max?: number } {
  if (!value.includes("-")) return {};
  const [minString, maxString] = value.split("-");
  const min = Number(minString);
  const max = Number(maxString);
  return {
    min: Number.isFinite(min) ? min : undefined,
    max: Number.isFinite(max) ? max : undefined,
  };
}

function getRangeValue(
  min: number | undefined,
  max: number | undefined,
  options: OptionItem<string>[]
): string {
  if (min === undefined && max === undefined) return "";
  const match = options.find((option) => {
    const range = parseRangeValue(option.value);
    return range.min === min && range.max === max;
  });
  return match?.value ?? "";
}

function getRangeLabel(
  min: number | undefined,
  max: number | undefined,
  options: OptionItem<string>[],
  fallback: string
): string | undefined {
  if (min === undefined && max === undefined) return undefined;
  const value = getRangeValue(min, max, options);
  if (value) return options.find((option) => option.value === value)?.label;
  if (min !== undefined && max !== undefined) return `${fallback}: ${min.toLocaleString("en-IN")} - ${max.toLocaleString("en-IN")}`;
  if (max !== undefined) return `${fallback}: Under ${max.toLocaleString("en-IN")}`;
  return `${fallback}: Above ${min?.toLocaleString("en-IN")}`;
}

function ActiveFilterChip({
  label,
  onClear,
  locked,
}: {
  label: string;
  onClear?: () => void;
  locked?: boolean;
}) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-outline-variant/45 bg-surface-container-lowest px-3 py-1.5 text-xs font-semibold text-on-surface-variant">
      {locked ? <MaterialSymbol name="lock" size="xs" className="text-outline" /> : null}
      {label}
      {onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-4 w-4 items-center justify-center rounded-full text-outline transition-colors hover:bg-primary-fixed hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`Remove ${label} filter`}
        >
          <MaterialSymbol name="close" size="xs" />
        </button>
      ) : null}
    </span>
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
    const timer = window.setTimeout(() => {
      setSearchDraft(filters.q ?? "");
    }, 0);
    return () => window.clearTimeout(timer);
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
  const feeRangeOptions: OptionItem<string | "">[] = [
    { value: "", label: "Any fee" },
    ...filterOptions.feeRanges,
  ];
  const cutoffRangeOptions: OptionItem<string | "">[] = [
    { value: "", label: "Any rank" },
    ...filterOptions.cutoffRanges,
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
  const stateLabel = filters.state
    ? filterOptions.states.find((s) => s.value === filters.state)?.label
    : undefined;
  const quotaLabel = filters.quota
    ? quotaOptions.find((option) => option.value === filters.quota)?.label
    : undefined;
  const categoryLabel = filters.category
    ? categoryOptions.find((option) => option.value === filters.category)?.label
    : undefined;
  const collegeTypeLabel = collegeTypeValue
    ? collegeTypeOptions.find((option) => option.value === collegeTypeValue)?.label
    : undefined;
  const sortLabel = filters.sort
    ? sortOptions.find((option) => option.value === filters.sort)?.label
    : undefined;
  const feeRangeValue = getRangeValue(
    filters.feeMin,
    filters.feeMax,
    filterOptions.feeRanges
  );
  const cutoffRangeValue = getRangeValue(
    filters.cutoffMin,
    filters.cutoffMax,
    filterOptions.cutoffRanges
  );
  const feeRangeLabel = getRangeLabel(
    filters.feeMin,
    filters.feeMax,
    filterOptions.feeRanges,
    "Fee"
  );
  const cutoffRangeLabel = getRangeLabel(
    filters.cutoffMin,
    filters.cutoffMax,
    filterOptions.cutoffRanges,
    "Rank"
  );
  const hasLockedFeeCap = lockedFilters?.feeMax !== undefined;
  const activeFilters = [
    filters.q
      ? {
        key: "q",
        label: `Search: ${filters.q}`,
        onClear: () => navigate({ q: undefined }),
      }
      : null,
    filters.state && !hiddenFields.includes("state")
      ? {
        key: "state",
        label: stateLabel ?? filters.state,
        onClear: () => navigate({ state: undefined }),
      }
      : null,
    filters.quota
      ? {
        key: "quota",
        label: quotaLabel ?? filters.quota,
        onClear: () => navigate({ quota: undefined }),
      }
      : null,
    filters.category
      ? {
        key: "category",
        label: categoryLabel ?? filters.category,
        onClear: () => navigate({ category: undefined }),
      }
      : null,
    collegeTypeValue && !hiddenFields.includes("collegeType") && !hiddenFields.includes("collegeTypes")
      ? {
        key: "type",
        label: collegeTypeLabel ?? collegeTypeValue,
        onClear: () => navigate({ collegeType: undefined, collegeTypes: undefined }),
      }
      : null,
    feeRangeLabel
      ? {
        key: "fee",
        label: hasLockedFeeCap ? `Preset: ${feeRangeLabel}` : feeRangeLabel,
        locked: hasLockedFeeCap,
        onClear: hasLockedFeeCap
          ? undefined
          : () => navigate({ feeMin: undefined, feeMax: undefined }),
      }
      : null,
    cutoffRangeLabel
      ? {
        key: "cutoff",
        label: cutoffRangeLabel,
        onClear: () => navigate({ cutoffMin: undefined, cutoffMax: undefined }),
      }
      : null,
    filters.sort
      ? {
        key: "sort",
        label: `Sort: ${sortLabel ?? filters.sort}`,
        onClear: () => navigate({ sort: undefined }),
      }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    label: string;
    onClear?: () => void;
    locked?: boolean;
  }>;
  const hasClearableFilters = activeFilters.some((filter) => filter.onClear);
  const clearAll = () =>
    navigate({
      q: undefined,
      state: undefined,
      quota: undefined,
      category: undefined,
      collegeType: undefined,
      collegeTypes: undefined,
      feeMin: undefined,
      feeMax: undefined,
      cutoffMin: undefined,
      cutoffMax: undefined,
      sort: undefined,
    });

  return (
    <section
      className={cn(
        "sticky top-16 z-40 flex flex-col gap-4 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest/90 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_44px_-28px_rgba(37,70,208,0.32)] backdrop-blur-md",
        isPending && "opacity-90"
      )}
      aria-busy={isPending}
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(18rem,1fr)_auto] lg:items-start">
        <div className="relative w-full">
          <MaterialSymbol
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline"
          />
          <input
            type="search"
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            placeholder="Search by college name, city, state or university..."
            className="h-12 w-full rounded-[14px] border border-outline-variant bg-surface py-2 pl-10 pr-4 text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none"
            aria-label="Search colleges"
          />
        </div>

        <div className="flex w-full gap-2 overflow-x-auto pb-1 lg:w-auto lg:max-w-[54rem] lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0">
          {hiddenFields.includes("state") && lockedStateLabel ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/20 bg-primary-fixed px-4 py-2 font-label-md text-label-md text-on-primary-fixed">
              <MaterialSymbol name="lock" size="xs" />
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
            label="Budget"
            value={feeRangeValue}
            activeLabel={feeRangeLabel}
            options={feeRangeOptions}
            disabled={isPending || hasLockedFeeCap}
            onChange={(value) => {
              const range = parseRangeValue(value);
              navigate({ feeMin: range.min, feeMax: range.max });
            }}
          />
          <FilterPill
            label="Closing rank"
            value={cutoffRangeValue}
            activeLabel={cutoffRangeLabel}
            options={cutoffRangeOptions}
            disabled={isPending}
            onChange={(value) => {
              const range = parseRangeValue(value);
              navigate({ cutoffMin: range.min, cutoffMax: range.max });
            }}
          />
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
      </div>

      {activeFilters.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 border-t border-outline-variant/35 pt-3">
          <span className="text-xs font-bold uppercase tracking-wider text-outline">
            Active filters
          </span>
          {activeFilters.map((filter) => (
            <ActiveFilterChip
              key={filter.key}
              label={filter.label}
              locked={filter.locked}
              onClear={filter.onClear}
            />
          ))}
          {hasClearableFilters ? (
            <button
              type="button"
              onClick={clearAll}
              disabled={isPending}
              className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary-fixed/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-60"
            >
              Clear all
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
