import { FiClock, FiAlertCircle } from "react-icons/fi";
import { Card, CardHeader } from "@/components/ui/Card";
import { formatINR } from "@/lib/utils";
import type { CollegeBond } from "@/types/college";

interface BondInfoProps {
  bond: CollegeBond;
}

export function BondInfo({ bond }: BondInfoProps) {
  return (
    <Card padded bordered>
      <CardHeader
        title="Bond Information"
        description="Mandatory service commitment and penalty for exit."
      />
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <Row
          icon={<FiClock aria-hidden="true" />}
          label="Years"
          value={bond.years === 0 ? "No bond" : `${bond.years} years`}
        />
        <Row
          icon={<FiAlertCircle aria-hidden="true" />}
          label="Penalty"
          value={bond.penalty === 0 ? "None" : formatINR(bond.penalty)}
        />
      </dl>
      {bond.note ? (
        <p className="mt-4 rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2 text-sm leading-relaxed text-text-muted">
          {bond.note}
        </p>
      ) : null}
    </Card>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-surface px-3 py-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand-700">
        {icon}
      </span>
      <div className="flex flex-col">
        <dt className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          {label}
        </dt>
        <dd className="text-sm font-semibold tracking-tight text-text">
          {value}
        </dd>
      </div>
    </div>
  );
}
