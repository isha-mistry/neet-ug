import { FiFilter, FiX } from "react-icons/fi";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import type { CollegeFilters, FilterOptionGroups } from "@/types/filters";

interface CollegeFiltersPanelProps {
  basePath: string;
  filters: CollegeFilters;
  filterOptions: FilterOptionGroups;
  hiddenFields?: Array<"state" | "collegeTypes">;
  /** Locked preset values preserved as hidden inputs on submit. */
  lockedFilters?: Pick<CollegeFilters, "state" | "collegeTypes" | "feeMax">;
}

function activeFeeRange(filters: CollegeFilters): string {
  if (filters.feeMin === undefined && filters.feeMax === undefined) return "";
  return `${filters.feeMin ?? 0}-${filters.feeMax ?? 99999999}`;
}

function activeCutoffRange(filters: CollegeFilters): string {
  if (filters.cutoffMin === undefined && filters.cutoffMax === undefined)
    return "";
  return `${filters.cutoffMin ?? 0}-${filters.cutoffMax ?? 99999999}`;
}

export function CollegeFiltersPanel({
  basePath,
  filters,
  filterOptions,
  hiddenFields = [],
  lockedFilters,
}: CollegeFiltersPanelProps) {
  const hide = (field: "state" | "collegeTypes") =>
    hiddenFields.includes(field);

  const lockedState = lockedFilters?.state ?? filters.state;
  const lockedTypes =
    lockedFilters?.collegeTypes?.join(",") ??
    filters.collegeTypes?.join(",");

  return (
    <Card padded bordered className="bg-surface-elevated">
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
              Narrow colleges by your preferences.
            </p>
          </div>
        </div>
        <Link
          href={basePath}
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-text-muted transition-colors hover:text-brand-700"
        >
          <FiX aria-hidden="true" />
          Reset
        </Link>
      </header>
      <form method="get" action={basePath} className="mt-5 flex flex-col gap-4">
        {hide("state") && lockedState ? (
          <input type="hidden" name="state" value={lockedState} />
        ) : null}
        {hide("collegeTypes") && lockedTypes ? (
          <input type="hidden" name="types" value={lockedTypes} />
        ) : null}
        {lockedFilters?.feeMax !== undefined ? (
          <input
            type="hidden"
            name="feeMax"
            value={String(lockedFilters.feeMax)}
          />
        ) : null}

        {hide("state") ? null : (
          <Select
            name="state"
            label="State"
            placeholder="Any state"
            defaultValue={filters.state ?? ""}
            options={filterOptions.states}
          />
        )}
        <Select
          name="city"
          label="City"
          placeholder="Any city"
          defaultValue={filters.city ?? ""}
          options={filterOptions.cities}
        />
        {hide("collegeTypes") ? null : (
          <Select
            name="types"
            label="College Type"
            placeholder="Any type"
            defaultValue={filters.collegeTypes?.[0] ?? ""}
            options={filterOptions.collegeTypes}
          />
        )}
        <Select
          name="feeRange"
          label="Fee Range (Total Course)"
          placeholder="Any fee range"
          defaultValue={activeFeeRange(filters)}
          options={filterOptions.feeRanges}
        />
        <Select
          name="cutoffRange"
          label="Cutoff Range (AIR)"
          placeholder="Any cutoff range"
          defaultValue={activeCutoffRange(filters)}
          options={filterOptions.cutoffRanges}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            name="feeMin"
            type="number"
            label="Custom Fee Min"
            placeholder="Optional"
            defaultValue={filters.feeMin ?? ""}
            min={0}
          />
          <Input
            name="feeMax"
            type="number"
            label="Custom Fee Max"
            placeholder="Optional"
            defaultValue={
              lockedFilters?.feeMax !== undefined
                ? ""
                : filters.feeMax ?? ""
            }
            min={0}
            disabled={lockedFilters?.feeMax !== undefined}
          />
        </div>
        {filters.sort ? (
          <input type="hidden" name="sort" value={filters.sort} />
        ) : null}
        <Button type="submit" fullWidth>
          Apply Filters
        </Button>
      </form>
    </Card>
  );
}
