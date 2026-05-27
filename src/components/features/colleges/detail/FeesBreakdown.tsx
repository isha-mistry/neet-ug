import { Card, CardHeader } from "@/components/ui/Card";
import { formatINR } from "@/lib/utils";
import type { CollegeFees } from "@/types/college";

interface FeesBreakdownProps {
  fees: CollegeFees;
}

export function FeesBreakdown({ fees }: FeesBreakdownProps) {
  const rows = [
    { label: "Tuition", value: fees.tuition },
    { label: "Hostel", value: fees.hostel },
    { label: "Miscellaneous", value: fees.misc },
  ];
  return (
    <Card padded bordered>
      <CardHeader
        title="Fees Breakdown"
        description="Estimated annual and 5-year fee structure."
      />
      <ul className="mt-4 flex flex-col divide-y divide-border">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between py-3"
          >
            <span className="text-sm tracking-wide text-text-secondary">
              {row.label}
            </span>
            <span className="text-sm font-semibold tracking-tight text-text">
              {formatINR(row.value)}
            </span>
          </li>
        ))}
        <li className="flex items-center justify-between py-3">
          <span className="text-sm font-semibold tracking-wide text-text">
            Annual Total
          </span>
          <span className="text-base font-bold tracking-tight text-text">
            {formatINR(fees.totalAnnual)}
          </span>
        </li>
        <li className="flex items-center justify-between py-3">
          <span className="text-sm font-semibold tracking-wide text-text">
            Course Total (5 years)
          </span>
          <span className="text-base font-bold tracking-tight text-brand-700">
            {formatINR(fees.totalCourse)}
          </span>
        </li>
      </ul>
    </Card>
  );
}
