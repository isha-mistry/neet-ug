import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { cn, formatNumber } from "@/lib/utils";
import { parseSeatDistributionChips } from "@/lib/colleges/quota-display";
import type { CollegeSummary } from "@/types/listing";
import type { CollegeType } from "@/types/college";

/** Placeholder campus photo for listing cards until per-college images exist in data. */
const COLLEGE_LIST_IMAGE = "/sample_college_img.png";

interface CollegeCardProps {
  college: CollegeSummary;
  rankCategoryShort: string;
  feeQuotaShort: string;
}

function collegeTypeLabel(type: CollegeType): string {
  if (type === "aiims") return "AIIMS";
  if (type === "government") return "Government";
  if (type === "private") return "Private";
  if (type === "deemed") return "Deemed";
  return type;
}

function accentClass(type: CollegeType): string {
  switch (type) {
  case "government":
  case "aiims":
    return "bg-college-accent-government";
  case "deemed":
    return "bg-college-accent-deemed";
  case "private":
    return "bg-college-accent-private";
  default:
    return "bg-college-accent-deemed";
  }
}

function typePillClass(type: CollegeType): string {
  switch (type) {
  case "government":
  case "aiims":
    return "bg-college-type-government-bg text-college-type-government-fg";
  case "deemed":
    return "bg-college-type-deemed-bg text-college-type-deemed-fg";
  case "private":
    return "bg-college-type-private-bg text-college-type-private-fg";
  default:
    return "bg-college-type-deemed-bg text-college-type-deemed-fg";
  }
}

export function CollegeCard({
  college,
  rankCategoryShort,
  feeQuotaShort,
}: CollegeCardProps) {
  const seatChips = parseSeatDistributionChips(college.quotaInfo);
  const detailHref = `/colleges/${college.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest",
        "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_color-mix(in_srgb,var(--color-primary)_10%,transparent)]"
      )}
    >
      <span
        className={cn("absolute left-0 top-0 z-10 h-full w-1", accentClass(college.collegeType))}
        aria-hidden
      />

      <div className="flex flex-col md:flex-row">
        <div className="relative h-44 w-full shrink-0 overflow-hidden md:h-auto md:min-h-[228px] md:w-96 lg:min-h-[240px] lg:w-[26rem]">
          <Image
            src={COLLEGE_LIST_IMAGE}
            alt={`${college.name} campus`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 384px, 416px"
          />
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col gap-5 p-5 md:p-6">
          <Link
            href={detailHref}
            className="absolute right-5 top-5 inline-flex items-center gap-0.5 font-label-md text-label-md font-bold text-primary transition-colors hover:text-primary-container"
          >
            See more
            <MaterialSymbol
              name="chevron_right"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <header className="pr-24">
            <div className="mb-2">
              <span
                className={cn(
                  "inline-flex rounded-full px-3 py-1 font-label-md text-label-md uppercase tracking-wider",
                  typePillClass(college.collegeType)
                )}
              >
                {collegeTypeLabel(college.collegeType)}
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">
              <Link href={detailHref} className="hover:text-primary">
                {college.name}
              </Link>
            </h3>
            <p className="mt-1 inline-flex items-center gap-1 text-on-surface-variant">
              <MaterialSymbol name="location_on" />
              <span className="font-body-md text-body-md">
                {college.city}, {college.stateName}
              </span>
            </p>
          </header>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <MetricTile
              icon="payments"
              label={
                <FeesMetricLabel quotaShort={feeQuotaShort} />
              }
              value={college.displayAnnualFee}
              variant="fees"
            />
            <MetricTile
              icon="leaderboard"
              label={
                <ClosingRankMetricLabel categoryShort={rankCategoryShort} />
              }
              value={
                college.latestCutoffRank > 0
                  ? `AIR ${formatNumber(college.latestCutoffRank)}`
                  : "Not available"
              }
              variant="rank"
            />
            <MetricTile
              icon="chair_alt"
              label={<MetricTileLabel>Seats</MetricTileLabel>}
              value={formatNumber(college.seatCount)}
              variant="seats"
            />
            <MetricTile
              icon="verified"
              label={<MetricTileLabel>Bond</MetricTileLabel>}
              value={college.bondLabel}
              variant="bond"
            />
          </div>

          {seatChips.length > 0 ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-outline-variant/25 pt-3.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-outline">
                Seat distribution
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seatChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/35 bg-surface-container-low px-2.5 py-1"
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full ring-2 ring-white/80",
                        chip.variant === "brand" ? "bg-primary" : "bg-secondary"
                      )}
                      aria-hidden
                    />
                    <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                      {chip.quota}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-bold tabular-nums leading-none",
                        chip.variant === "brand" ? "text-primary" : "text-secondary"
                      )}
                    >
                      {chip.seats}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

const metricTileStyles = {
  fees: {
    box: "border-college-metric-fees-border bg-college-metric-fees hover:bg-college-metric-fees-hover",
    value: "text-primary",
  },
  rank: {
    box: "border-college-metric-rank-border bg-college-metric-rank hover:bg-college-metric-rank-hover",
    value: "text-primary",
  },
  seats: {
    box: "border-college-metric-seats-border bg-college-metric-seats hover:bg-college-metric-seats-hover",
    value: "text-on-surface",
  },
  bond: {
    box: "border-college-metric-bond-border bg-college-metric-bond hover:bg-college-metric-bond-hover",
    value: "text-on-surface",
  },
} as const;

function MetricTileIcon({ name }: { name: string }) {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-surface-container-lowest text-primary shadow-sm"
      aria-hidden
    >
      <MaterialSymbol name={name} size="sm" />
    </span>
  );
}

function FeesMetricLabel({ quotaShort }: { quotaShort: string }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5">
      <span className="text-sm font-semibold uppercase leading-snug tracking-wide text-on-surface-variant">
        Annual fees
      </span>
      <span
        className="inline-flex shrink-0 items-center rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold uppercase leading-none tracking-wider text-on-primary ring-2 ring-primary/20"
        title={`Quota: ${quotaShort}`}
      >
        {quotaShort}
      </span>
    </div>
  );
}

function ClosingRankMetricLabel({ categoryShort }: { categoryShort: string }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5">
      <span className="text-sm font-semibold uppercase leading-snug tracking-wide text-on-surface-variant">
        Closing rank
      </span>
      <span
        className="inline-flex shrink-0 items-center rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold uppercase leading-none tracking-wider text-on-primary ring-2 ring-primary/20"
        title={`Category: ${categoryShort}`}
      >
        {categoryShort}
      </span>
    </div>
  );
}

function MetricTileLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm font-semibold uppercase leading-snug tracking-wide text-on-surface-variant">
      {children}
    </span>
  );
}

function MetricTile({
  icon,
  label,
  value,
  variant,
}: {
  icon: string;
  label: ReactNode;
  value: string;
  variant: keyof typeof metricTileStyles;
}) {
  const styles = metricTileStyles[variant];

  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-xl border p-3.5 transition-colors md:gap-3 md:p-4",
        styles.box
      )}
    >
      <div className="flex items-center gap-2.5">
        <MetricTileIcon name={icon} />
        <div className="min-w-0 flex-1">{label}</div>
      </div>
      <p
        className={cn(
          "truncate text-lg font-bold leading-none tracking-tight md:text-xl",
          styles.value
        )}
      >
        {value}
      </p>
    </div>
  );
}
