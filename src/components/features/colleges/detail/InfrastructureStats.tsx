import { FiActivity, FiUsers } from "react-icons/fi";
import { Card, CardHeader } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";
import type { CollegeInfrastructure } from "@/types/college";

interface InfrastructureStatsProps {
  infrastructure: CollegeInfrastructure;
}

export function InfrastructureStats({
  infrastructure,
}: InfrastructureStatsProps) {
  return (
    <Card padded bordered>
      <CardHeader
        title="Infrastructure"
        description="Clinical capacity and notable facilities."
      />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Stat
          icon={<FiUsers aria-hidden="true" />}
          label="Beds"
          value={formatNumber(infrastructure.beds)}
        />
        <Stat
          icon={<FiActivity aria-hidden="true" />}
          label="Daily Patient Flow"
          value={formatNumber(infrastructure.patientFlowPerDay)}
        />
      </div>
      {infrastructure.facilities.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {infrastructure.facilities.map((facility) => (
            <span
              key={facility}
              className="inline-flex items-center rounded-[var(--radius-pill)] bg-brand-50 px-3 py-1 text-xs font-semibold tracking-wide text-brand-800"
            >
              {facility}
            </span>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

function Stat({
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
        <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          {label}
        </span>
        <span className="text-sm font-semibold tracking-tight text-text">
          {value}
        </span>
      </div>
    </div>
  );
}
