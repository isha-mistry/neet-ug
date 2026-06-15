import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { DetailSectionHeader } from "@/components/features/colleges/shared/DetailSectionHeader";
import { DetailPanel } from "@/components/features/colleges/shared/DetailPanel";
import { hasClinicalData } from "@/lib/colleges/clinical-data";
import type { CollegeInfrastructure } from "@/types/college";
import { formatNumber } from "@/lib/utils";

interface CollegeClinicalInfoProps {
  infrastructure: CollegeInfrastructure;
  collegeName: string;
}

export function CollegeClinicalInfo({
  infrastructure,
  collegeName,
}: CollegeClinicalInfoProps) {
  const hasData = hasClinicalData(infrastructure);

  return (
    <section
      id="clinical"
      className="scroll-mt-28 flex flex-col gap-6"
    >
      <DetailSectionHeader
        eyebrow="Hospital"
        title="Clinical exposure"
        description="Hospital beds, patient load, and campus facilities when available in our catalog"
        icon="local_hospital"
      />

      {hasData ? (
        <div className="grid gap-4 md:grid-cols-3">
          {infrastructure.beds > 0 ? (
            <StatTile
              icon="bed"
              label="Hospital beds"
              value={formatNumber(infrastructure.beds)}
            />
          ) : null}
          {infrastructure.patientFlowPerDay > 0 ? (
            <StatTile
              icon="local_hospital"
              label="Patients / day"
              value={formatNumber(infrastructure.patientFlowPerDay)}
            />
          ) : null}
          {infrastructure.facilities.length > 0 ? (
            <DetailPanel className="md:col-span-3">
              <h3 className="mb-3 text-sm font-bold text-on-surface">Facilities</h3>
              <ul className="flex flex-wrap gap-2">
                {infrastructure.facilities.map((f) => (
                  <li
                    key={f}
                    className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold text-on-surface-variant"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </DetailPanel>
          ) : null}
        </div>
      ) : (
        <DetailPanel className="border-dashed">
          <p className="text-sm leading-relaxed text-on-surface-variant">
            We don&apos;t have verified hospital metrics for {collegeName} yet.
            Check the official college or state counselling brochure for attached
            hospital capacity and OPD load.
          </p>
        </DetailPanel>
      )}
    </section>
  );
}

function StatTile({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <DetailPanel bodyClassName="flex flex-col gap-2">
      <MaterialSymbol name={icon} className="text-2xl text-primary" />
      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
        {label}
      </span>
      <span className="text-2xl font-bold text-on-surface">{value}</span>
    </DetailPanel>
  );
}
