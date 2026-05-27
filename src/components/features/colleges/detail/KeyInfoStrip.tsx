import { FiTrendingDown, FiUsers, FiDollarSign } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { formatINR, formatNumber } from "@/lib/utils";

interface KeyInfoStripProps {
  totalAnnualFee: number;
  latestCutoffRank: number;
  latestCutoffYear: number;
  seatCount: number;
}

export function KeyInfoStrip({
  totalAnnualFee,
  latestCutoffRank,
  latestCutoffYear,
  seatCount,
}: KeyInfoStripProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <KeyCard
        icon={<FiDollarSign aria-hidden="true" />}
        label="Annual Fees"
        value={formatINR(totalAnnualFee, { compact: true })}
      />
      <KeyCard
        icon={<FiTrendingDown aria-hidden="true" />}
        label={`Cutoff ${latestCutoffYear}`}
        value={`AIR ${formatNumber(latestCutoffRank)}`}
      />
      <KeyCard
        icon={<FiUsers aria-hidden="true" />}
        label="Total Seats"
        value={formatNumber(seatCount)}
      />
    </div>
  );
}

function KeyCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card padded bordered className="flex items-center gap-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand-700">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          {label}
        </span>
        <span className="text-lg font-semibold tracking-tight text-text">
          {value}
        </span>
      </div>
    </Card>
  );
}
