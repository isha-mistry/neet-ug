import { FiMapPin, FiUsers, FiTarget, FiArrowRight } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CollegeTypeBadge } from "@/components/features/colleges/shared/CollegeTypeBadge";
import { SafeRiskTag } from "@/components/features/colleges/shared/SafeRiskTag";
import { formatINR, formatNumber } from "@/lib/utils";
import type { CollegeSummary } from "@/types/listing";

interface CollegeCardProps {
  college: CollegeSummary;
}

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Card
      padded
      bordered
      elevated
      as="article"
      className="grid h-full min-w-0 grid-rows-[auto_1fr_auto] gap-5 overflow-hidden"
    >
      <header className="flex min-h-28 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <CollegeTypeBadge type={college.collegeType} />
          <SafeRiskTag tag={college.safetyTag} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="max-h-14 overflow-hidden wrap-break-word text-lg font-semibold leading-tight tracking-snug text-text md:text-xl">
            {college.name}
          </h3>
          <p className="inline-flex items-center gap-1.5 text-sm tracking-wide text-text-muted">
            <FiMapPin aria-hidden="true" />
            <span className="truncate">
              {college.city}, {college.stateName}
            </span>
          </p>
        </div>
      </header>
      <dl className="grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            Total Fees
          </dt>
          <dd className="text-base font-semibold tracking-tight text-text">
            {formatINR(college.totalCourseFee, { compact: true })}
          </dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-text-muted">
            <FiTarget aria-hidden="true" />
            Cutoff ({college.latestCutoffYear})
          </dt>
          <dd className="text-base font-semibold tracking-tight text-text">
            AIR {formatNumber(college.latestCutoffRank)}
          </dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-text-muted">
            <FiUsers aria-hidden="true" />
            Seats
          </dt>
          <dd className="text-base font-semibold tracking-tight text-text">
            {formatNumber(college.seatCount)}
          </dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            ROI
          </dt>
          <dd className="text-base font-semibold tracking-tight text-text">
            {college.roiScore}/100
          </dd>
        </div>
      </dl>
      <footer className="flex min-w-0 items-center gap-2 border-t border-border pt-4">
        <span className="min-w-0 flex-1 truncate text-xs tracking-wide text-text-muted">
          {college.quotaInfo}
        </span>
        <Button
          as="link"
          href={`/colleges/${college.slug}`}
          variant="primary"
          size="sm"
          className="shrink-0 px-2.5"
          trailingIcon={<FiArrowRight aria-hidden="true" />}
        >
          Details
        </Button>
      </footer>
    </Card>
  );
}
