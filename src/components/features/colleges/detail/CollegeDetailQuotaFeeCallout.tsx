import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { Card } from "@/components/ui/Card";
import type { QuotaFeeBreakdown } from "@/types/college";
import { formatINR } from "@/lib/utils";

interface CollegeDetailQuotaFeeCalloutProps {
  breakdown: QuotaFeeBreakdown;
}

/** Highlights GQ vs MQ (and NRI) tuition for private colleges e.g. Adani Bhuj. */
export function CollegeDetailQuotaFeeCallout({
  breakdown,
}: CollegeDetailQuotaFeeCalloutProps) {
  const { govtQuotaAnnualInr, managementQuotaAnnualInr, nri } = breakdown;
  const showMq =
    managementQuotaAnnualInr > 0 &&
    (govtQuotaAnnualInr === 0 ||
      managementQuotaAnnualInr !== govtQuotaAnnualInr);

  if (govtQuotaAnnualInr === 0 && !showMq && !nri) return null;

  return (
    <Card
      padded
      bordered
      className="border-outline-variant bg-surface-container-low"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <MaterialSymbol name="account_balance" className="text-xl text-primary" />
          <h2 className="text-base font-bold text-on-surface">
            Quota-wise annual tuition
          </h2>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {govtQuotaAnnualInr > 0 ? (
            <FeeTile
              label="Government quota (GQ)"
              value={formatINR(govtQuotaAnnualInr, { compact: true })}
            />
          ) : null}
          {showMq ? (
            <FeeTile
              label="Management quota (MQ)"
              value={formatINR(managementQuotaAnnualInr, { compact: true })}
            />
          ) : null}
          {nri && nri.amount > 0 ? (
            <FeeTile
              label={`NRI (${nri.currency})`}
              value={
                nri.currency === "USD"
                  ? `$${nri.amount.toLocaleString("en-US")}`
                  : formatINR(nri.amount, { compact: true })
              }
            />
          ) : null}
        </dl>
        <p className="text-xs leading-relaxed text-on-surface-variant">
          Hostel, mess, and one-time charges are listed separately under fees.
          Always confirm the seat type on your allotment letter.
        </p>
      </div>
    </Card>
  );
}

function FeeTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-outline-variant/80 bg-surface-container-lowest px-4 py-3">
      <dt className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
        {label}
      </dt>
      <dd className="mt-1 text-lg font-bold text-on-surface">{value}</dd>
    </div>
  );
}
