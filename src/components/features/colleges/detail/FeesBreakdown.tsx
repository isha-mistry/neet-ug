import { Card, CardHeader } from "@/components/ui/Card";
import { formatINR, formatQuotaFee } from "@/lib/utils";
import type { CollegeFees } from "@/types/college";

interface FeesBreakdownProps {
  fees: CollegeFees;
}

export function FeesBreakdown({ fees }: FeesBreakdownProps) {
  const q = fees.quotaBreakdown;

  const rows = [
    ...(q
      ? [
          {
            label: "Government quota (GQ) — annual",
            value: formatINR(q.govtQuotaAnnualInr),
          },
          {
            label: "Management quota (MQ) — annual",
            value: formatINR(q.managementQuotaAnnualInr),
          },
          ...(q.nri
            ? [
                {
                  label: `NRI quota — annual (${q.nri.currency})`,
                  value: formatQuotaFee(q.nri.amount, q.nri.currency),
                },
              ]
            : []),
        ]
      : [{ label: "Tuition (display quota)", value: formatINR(fees.tuition) }]),
    { label: "Hostel", value: formatINR(fees.hostel) },
    { label: "Miscellaneous", value: formatINR(fees.misc) },
  ];

  return (
    <Card padded bordered>
      <CardHeader
        title="Fees Breakdown"
        description={
          q
            ? "GQ and MQ are in INR. NRI fee uses the currency from the fee sheet ($ or Rs.) and is not added to the INR annual total below."
            : "Estimated annual and 5-year fee structure."
        }
      />
      <ul className="mt-4 flex flex-col divide-y divide-border">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-4 py-3"
          >
            <span className="text-sm tracking-wide text-text-secondary">
              {row.label}
            </span>
            <span className="shrink-0 text-sm font-semibold tracking-tight text-text">
              {row.value}
            </span>
          </li>
        ))}
        <li className="flex items-center justify-between py-3">
          <span className="text-sm font-semibold tracking-wide text-text">
            Annual total (INR, excl. NRI)
          </span>
          <span className="text-base font-bold tracking-tight text-text">
            {formatINR(fees.totalAnnual)}
          </span>
        </li>
        <li className="flex items-center justify-between py-3">
          <span className="text-sm font-semibold tracking-wide text-text">
            Course total (5 years, INR)
          </span>
          <span className="text-base font-bold tracking-tight text-brand-700">
            {formatINR(fees.totalCourse)}
          </span>
        </li>
      </ul>
    </Card>
  );
}
