import Link from "next/link";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { Card } from "@/components/ui/Card";
import { CollegeTypeBadge } from "@/components/features/colleges/shared/CollegeTypeBadge";
import { toCollegeSummary } from "@/lib/colleges/mappers";
import type { CollegeRecord } from "@/types/college";
import { formatINR, formatNumber } from "@/lib/utils";

interface CollegeDetailRelatedProps {
  peers: CollegeRecord[];
}

export function CollegeDetailRelated({ peers }: CollegeDetailRelatedProps) {
  if (peers.length === 0) return null;

  return (
    <Card padded bordered className="border-outline-variant bg-surface-container-lowest">
      <h2 className="mb-1 text-base font-bold text-on-surface">Similar colleges</h2>
      <p className="mb-4 text-xs text-on-surface-variant">
        Same state or type, close cutoff band
      </p>
      <ul className="flex flex-col gap-3">
        {peers.map((record) => {
          const summary = toCollegeSummary(record);
          return (
            <li key={record.slug}>
              <Link
                href={`/colleges/${record.slug}`}
                className="group flex flex-col gap-2 rounded-xl border border-outline-variant/80 bg-surface-container-low p-3 transition hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <CollegeTypeBadge type={summary.collegeType} />
                </div>
                <span className="text-sm font-semibold leading-snug text-on-surface group-hover:text-primary">
                  {summary.name}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-on-surface-variant">
                  <MaterialSymbol name="location_on" className="text-sm" />
                  {summary.city}, {summary.stateName}
                </span>
                <div className="flex flex-wrap gap-3 text-xs font-semibold text-on-surface">
                  {summary.latestCutoffRank > 0 ? (
                    <span>AIR {formatNumber(summary.latestCutoffRank)}</span>
                  ) : null}
                  {summary.totalAnnualFee > 0 ? (
                    <span>{formatINR(summary.totalAnnualFee, { compact: true })}/yr</span>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
