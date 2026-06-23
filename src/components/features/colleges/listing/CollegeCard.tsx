import type { ReactNode } from "react";
import Link from "next/link";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { CollegeCoverPhoto } from "@/components/features/colleges/shared/CollegeCoverPhoto";
import { AiGeneratedCoverBadge } from "@/components/features/colleges/shared/AiGeneratedCoverBadge";
import { getCollegeCoverImageUrl, hasUploadedCollegePhoto } from "@/lib/colleges/cover-images";
import { formatDravioRoiScore } from "@/lib/colleges/dravio-roi-score";
import { cn, formatINR, formatNumber } from "@/lib/utils";
import {
  parseSeatDistributionChips,
  seatQuotaChipsFromMatrix,
} from "@/lib/colleges/quota-display";
import type { CollegeSummary } from "@/types/listing";
import type { CollegeType } from "@/types/college";

interface CollegeCardProps {
  college: CollegeSummary;
  rankCategoryShort: string;
  feeQuotaShort: string;
  /** `grid` = two-column listing; scales typography and layout for narrower cards. */
  layout?: "list" | "grid";
}

function collegeTypeLabel(type: CollegeType): string {
  if (type === "aiims") return "AIIMS";
  if (type === "government") return "Government";
  if (type === "semi-government") return "Semi Government";
  if (type === "private") return "Private";
  if (type === "deemed") return "Deemed";
  return type;
}

function accentClass(type: CollegeType): string {
  switch (type) {
  case "government":
  case "aiims":
  case "semi-government":
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
  case "semi-government":
    return "bg-college-type-government-bg text-college-type-government-fg";
  case "deemed":
    return "bg-college-type-deemed-bg text-college-type-deemed-fg";
  case "private":
    return "bg-college-type-private-bg text-college-type-private-fg";
  default:
    return "bg-college-type-deemed-bg text-college-type-deemed-fg";
  }
}

function safetyLabel(tag: CollegeSummary["safetyTag"]): string {
  if (tag === "safe") return "Reachable";
  if (tag === "risky") return "Competitive";
  return "Moderate";
}

function safetyClass(tag: CollegeSummary["safetyTag"]): string {
  if (tag === "safe") return "border-secondary/25 bg-secondary-fixed/75 text-secondary";
  if (tag === "risky") return "border-error/25 bg-error-container text-on-error-container";
  return "border-tertiary-fixed-dim/60 bg-tertiary-fixed text-on-tertiary-fixed-variant";
}

export function CollegeCard({
  college,
  rankCategoryShort,
  feeQuotaShort,
  layout = "list",
}: CollegeCardProps) {
  const seatChips = college.seatMatrix
    ? seatQuotaChipsFromMatrix(college.seatMatrix)
    : parseSeatDistributionChips(college.quotaInfo);
  const detailHref = `/colleges/${college.slug}`;
  const isGrid = layout === "grid";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-outline-variant bg-surface-container-lowest cursor-pointer",
        "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_color-mix(in_srgb,var(--color-primary)_10%,transparent)]",
        "focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2"
      )}
    >
      <Link
        href={detailHref}
        className="absolute inset-0 z-10 rounded-xl"
        aria-label={`View details for ${college.name}`}
      />
      <span
        className={cn("absolute left-0 top-0 z-0 h-full w-1", accentClass(college.collegeType))}
        aria-hidden
      />

      <div
        className={cn(
          "relative z-0 flex min-h-0 flex-1 pointer-events-none",
          isGrid ? "flex-col sm:flex-row items-stretch" : "items-stretch flex-col md:flex-row"
        )}
      >
        <CollegeCardVisual college={college} compact={isGrid} />

        <div
          className={cn(
            "relative flex min-w-0 flex-1 flex-col",
            isGrid ? "gap-2 p-2.5 sm:p-3" : "gap-5 p-5 md:p-6"
          )}
        >
          <header>
            {isGrid ? null : (
              <div className="mb-2 flex items-start justify-end gap-3">
                <div className="flex shrink-0 items-baseline gap-1.5 text-right">
                  <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                    Seats
                  </span>
                  <span className="text-xl font-bold tabular-nums leading-none text-on-surface">
                    {formatNumber(college.seatCount)}
                  </span>
                </div>
              </div>
            )}
            <h3
              className={cn(
                "text-on-surface transition-colors group-hover:text-primary",
                isGrid
                  ? "line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight"
                  : "font-headline-lg text-headline-lg"
              )}
            >
              {college.name}
            </h3>
            <p
              className={cn(
                "mt-1 inline-flex items-center gap-1 text-on-surface-variant",
                isGrid && "mt-0.5"
              )}
            >
              <MaterialSymbol
                name="location_on"
                size={isGrid ? "xs" : "sm"}
                className={cn(isGrid && "text-outline")}
              />
              <span
                className={cn(
                  isGrid
                    ? "text-xs leading-tight"
                    : "font-body-md text-body-md"
                )}
              >
                {college.city}, {college.stateName}
              </span>
            </p>
            {college.universityName ? (
              <p
                className={cn(
                  "mt-1 truncate text-on-surface-variant",
                  isGrid ? "text-[11px]" : "font-body-sm text-body-sm"
                )}
              >
                {college.universityName}
              </p>
            ) : null}
          </header>

          <div
            className={cn(
              "grid min-w-0",
              isGrid
                ? "grid-cols-3 gap-1.5 sm:gap-2"
                : "grid-cols-2 gap-3 md:gap-4"
            )}
          >
            <MetricTile
              icon="payments"
              label={<FeesMetricLabel quotaShort={feeQuotaShort} compact={isGrid} />}
              value={college.displayAnnualFee}
              variant="fees"
              compact={isGrid}
            />
            <MetricTile
              icon="leaderboard"
              label={
                <ClosingRankMetricLabel categoryShort={rankCategoryShort} compact={isGrid} />
              }
              value={
                college.latestCutoffRank > 0
                  ? `AIR ${formatNumber(college.latestCutoffRank)}`
                  : "Not available"
              }
              variant="rank"
              compact={isGrid}
            />
            {isGrid ? (
              <MetricTile
                icon="chair_alt"
                label={<MetricTileLabel compact>Seats</MetricTileLabel>}
                value={formatNumber(college.seatCount)}
                variant="seats"
                compact
              />
            ) : null}
          </div>

          <CollegeInsightRow college={college} compact={isGrid} />

          {(isGrid ||
            seatChips.length > 0 ||
            college.bondLabel) && (
              <div
                className={cn(
                  "flex items-center justify-between gap-3 border-t border-outline-variant/25 pt-2",
                  isGrid && "pt-1.5"
                )}
              >
                <div
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-2",
                    isGrid && "gap-1.5"
                  )}
                >
                  <div
                    className={cn(
                      "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
                      isGrid && "flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    )}
                  >
                    {seatChips.length > 0 ? (
                      seatChips.map((chip) => (
                        <span
                          key={chip.label}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/35 bg-surface-container-low",
                            isGrid ? "px-1.5 py-px" : "px-2.5 py-1"
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 shrink-0 rounded-full ring-2 ring-white/80",
                              chip.variant === "brand" ? "bg-primary" : "bg-secondary"
                            )}
                            aria-hidden
                          />
                          <span
                            className={cn(
                              "font-semibold uppercase tracking-wide text-on-surface-variant",
                              isGrid ? "text-[10px]" : "text-xs"
                            )}
                          >
                            {chip.quota}
                          </span>
                          <span
                            className={cn(
                              "font-bold tabular-nums leading-none",
                              chip.variant === "brand" ? "text-primary" : "text-secondary",
                              isGrid ? "text-xs" : "text-sm"
                            )}
                          >
                            {chip.seats}
                          </span>
                        </span>
                      ))
                    ) : (
                      <span
                        className={cn(
                          "truncate text-on-surface-variant",
                          isGrid ? "text-[10px]" : "text-xs"
                        )}
                      >
                        {college.quotaInfo}
                      </span>
                    )}
                  </div>
                </div>
                {college.bondLabel ? (
                  <span
                    className={cn(
                      "shrink-0 font-semibold text-on-surface",
                      isGrid ? "text-xs" : "text-sm"
                    )}
                    title={
                      college.bond.penalty > 0
                        ? `Bond penalty: ${formatINR(college.bond.penalty, { compact: true })}`
                        : college.bond.note
                    }
                  >
                    {college.bondLabel}
                    {college.bond.penalty > 0 && !isGrid
                      ? ` · ${formatINR(college.bond.penalty, { compact: true })}`
                      : ""}
                  </span>
                ) : null}
              </div>
            )}
        </div>
      </div>
    </article>
  );
}

function CollegeCardVisual({
  college,
  compact,
}: {
  college: CollegeSummary;
  compact: boolean;
}) {
  const coverSrc = getCollegeCoverImageUrl(college.slug, "card");
  const isUploadedPhoto = hasUploadedCollegePhoto(college.slug);
  const frameClass = cn(
    "relative shrink-0 overflow-hidden",
    compact
      ? "h-40 w-full self-stretch sm:h-full sm:min-h-[7rem] sm:w-[11rem] lg:w-44"
      : "h-44 w-full self-stretch md:h-auto md:min-h-[228px] md:w-72 lg:min-h-[240px] lg:w-80"
  );

  return (
    <div className={frameClass}>
      <CollegeCoverPhoto
        src={coverSrc}
        alt={
          isUploadedPhoto
            ? `${college.name} campus`
            : `Illustration for ${college.name}`
        }
        sizes={
          compact
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 11rem, 12rem"
            : "(max-width: 768px) 100vw, (max-width: 1024px) 288px, 320px"
        }
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="relative flex h-full flex-col justify-between p-2.5">
        <span
          className={cn(
            "inline-flex w-fit rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm",
            typePillClass(college.collegeType)
          )}
        >
          {collegeTypeLabel(college.collegeType)}
        </span>
        {college.nirfMedicalRank ? (
          <span className="inline-flex w-fit rounded-full border border-white/30 bg-black/35 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            NIRF #{college.nirfMedicalRank}
          </span>
        ) : null}
      </div>
      {!isUploadedPhoto ? <AiGeneratedCoverBadge compact={compact} /> : null}
    </div>
  );
}

function CollegeInsightRow({
  college,
  compact,
}: {
  college: CollegeSummary;
  compact: boolean;
}) {
  const insights = [
    {
      label: "Safety",
      value: safetyLabel(college.safetyTag),
      className: safetyClass(college.safetyTag),
      pill: true,
    },
    {
      label: "5 yr fee",
      value: college.totalCourseFee > 0 ? formatINR(college.totalCourseFee, { compact: true }) : "N/A",
    },
    {
      label: "Cutoff",
      value: college.latestCutoffYear > 0 ? String(college.latestCutoffYear) : "N/A",
    },
  ];

  return (
    <div
      className={cn(
        "grid gap-1.5",
        compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 md:grid-cols-3"
      )}
    >
      {insights.map((insight) => (
        <div
          key={insight.label}
          className="min-w-0 rounded-lg border border-outline-variant/30 bg-surface-container-low/55 px-2 py-1.5"
        >
          <p className="text-[9px] font-bold uppercase tracking-wider text-outline">
            {insight.label}
          </p>
          {insight.pill ? (
            <span
              className={cn(
                "mt-1 inline-flex max-w-full rounded-full border px-1.5 py-px text-[10px] font-bold",
                insight.className
              )}
            >
              {insight.value}
            </span>
          ) : (
            <p
              className={cn(
                "mt-1 truncate text-[11px] font-bold text-on-surface",
                insight.className
              )}
            >
              {insight.value}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

const metricTileStyles = {
  fees: {
    box: "border-college-metric-fees-border bg-college-metric-fees hover:bg-college-metric-fees-hover",
    value: "text-college-metric-fees-fg",
  },
  rank: {
    box: "border-college-metric-rank-border bg-college-metric-rank hover:bg-college-metric-rank-hover",
    value: "text-college-metric-rank-fg",
  },
  seats: {
    box: "border-college-metric-seats-border bg-college-metric-seats hover:bg-college-metric-seats-hover",
    value: "text-college-metric-seats-fg",
  },
  bond: {
    box: "border-college-metric-bond-border bg-college-metric-bond hover:bg-college-metric-bond-hover",
    value: "text-on-surface",
  },
} as const;

function MetricTileIcon({ name, compact }: { name: string; compact?: boolean }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-primary/25 bg-surface-container-lowest text-primary shadow-sm",
        compact ? "h-6 w-6" : "h-8 w-8"
      )}
      aria-hidden
    >
      <MaterialSymbol name={name} size="sm" />
    </span>
  );
}

function CompactMetricHeader({
  title,
  badge,
  badgeTitle,
}: {
  title: string;
  badge?: string;
  badgeTitle?: string;
}) {
  return (
    <div className="flex min-h-[1rem] min-w-0 flex-wrap items-center gap-x-1 gap-y-0.5">
      <span className="text-[9px] font-semibold uppercase leading-tight tracking-wider text-on-surface-variant">
        {title}
      </span>
      {badge ? (
        <span
          className="inline-flex max-w-full shrink-0 items-center rounded-full bg-primary px-1.5 py-px text-[8px] font-bold uppercase leading-none tracking-wider text-on-primary ring-1 ring-primary/15"
          title={badgeTitle}
        >
          {badge}
        </span>
      ) : null}
    </div>
  );
}

function FeesMetricLabel({
  quotaShort,
  compact,
}: {
  quotaShort: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <CompactMetricHeader title="Annual fees" badge={quotaShort} badgeTitle={`Quota: ${quotaShort}`} />
    );
  }

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-0.5">
      <span className="text-xs font-semibold uppercase leading-snug tracking-wide text-on-surface-variant">
        Annual fees
      </span>
      <span
        className="inline-flex shrink-0 items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wider text-on-primary ring-2 ring-primary/20"
        title={`Quota: ${quotaShort}`}
      >
        {quotaShort}
      </span>
    </div>
  );
}

function ClosingRankMetricLabel({
  categoryShort,
  compact,
}: {
  categoryShort: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <CompactMetricHeader
        title="Closing rank"
        badge={categoryShort}
        badgeTitle={`Category: ${categoryShort}`}
      />
    );
  }

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-0.5">
      <span className="text-xs font-semibold uppercase leading-snug tracking-wide text-on-surface-variant">
        Closing rank
      </span>
      <span
        className="inline-flex shrink-0 items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wider text-on-primary ring-2 ring-primary/20"
        title={`Category: ${categoryShort}`}
      >
        {categoryShort}
      </span>
    </div>
  );
}

function MetricTileLabel({
  children,
  compact,
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  if (compact) {
    return <CompactMetricHeader title={String(children)} />;
  }

  return (
    <span className="text-xs font-semibold uppercase leading-snug tracking-wide text-on-surface-variant">
      {children}
    </span>
  );
}

function MetricTile({
  icon,
  label,
  value,
  variant,
  compact,
}: {
  icon: string;
  label: ReactNode;
  value: string;
  variant: keyof typeof metricTileStyles;
  compact?: boolean;
}) {
  const styles = metricTileStyles[variant];
  const compactNeutralBox =
    "border-outline-variant/40 bg-transparent hover:bg-surface-container-low/50";

  return (
    <div
      className={cn(
        "min-w-0 rounded-lg border transition-colors",
        compact
          ? "flex h-full min-h-[3.85rem] flex-col justify-between gap-2 px-2 py-2"
          : "flex flex-col gap-2.5 p-3.5 md:gap-3 md:p-4",
        compact ? compactNeutralBox : styles.box
      )}
    >
      {compact ? (
        <>
          <div className="min-w-0">{label}</div>
          <p
            className={cn(
              "truncate text-base font-bold leading-tight tracking-tight tabular-nums",
              styles.value
            )}
          >
            {value}
          </p>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2.5">
            <MetricTileIcon name={icon} compact={false} />
            <div className="min-w-0 flex-1">{label}</div>
          </div>
          <p
            className={cn(
              "truncate font-bold leading-none tracking-tight text-lg md:text-xl",
              styles.value
            )}
          >
            {value}
          </p>
        </>
      )}
    </div>
  );
}
