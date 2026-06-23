import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { DetailSectionHeader } from "@/components/features/colleges/shared/DetailSectionHeader";
import { DetailPanel, DetailSubsectionHead } from "@/components/features/colleges/shared/DetailPanel";
import type { CollegeBond, CollegeFees } from "@/types/college";
import { cn } from "@/lib/utils";

interface FeesAndBondInfoProps {
  fees: CollegeFees;
  bond: CollegeBond;
  stateSlug?: string;
}

export function FeesAndBondInfo({ fees, bond, stateSlug }: FeesAndBondInfoProps) {
  const hasBond = bond.years > 0;

  // Formatting helper supporting Rupees (INR) and Dollars (USD)
  const formatCurrency = (amount: number, currency: string = "INR") => {
    if (amount === 0 || amount === undefined || amount === null) return "—";

    if (currency.toUpperCase() === "USD" || currency === "$") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(amount);
    }

    const formattedVal = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(amount);
    return `Rs. ${formattedVal}`;
  };

  // Check if NRI quota uses USD
  const nriCurrencyStr = fees.quotaBreakdown?.nri?.currency as string | undefined;
  const isNriUsd =
    nriCurrencyStr?.toUpperCase() === "USD" || nriCurrencyStr === "$";

  const feeScheduleTitle =
    stateSlug === "maharashtra"
      ? "CET state fee schedule"
      : stateSlug === "madhya-pradesh"
        ? "DMAT fee schedule"
        : "State fee schedule";

  // Dynamic Bond Note matching screenshot
  const getBondNote = () => {
    if (bond.note) return bond.note;
    if (bond.years === 0 && bond.penalty === 0) {
      return "Note: Bond data not available in source dataset or not applicable for this institution.";
    }
    if (fees.totalAnnual < 20000) {
      return "AIIMS institutions generally do not have a rural service bond for MBBS graduates as per central government regulations.";
    }
    return "Service bond obligations, rural postings, and penalties depend strictly on state counselling guidelines.";
  };

  return (
    <section className="flex flex-col gap-6 animate-fadeIn">
      <DetailSectionHeader
        eyebrow="Investment"
        title="Fees & bond"
        description="Tuition by quota, annual charges, and rural service bond terms"
        icon="payments"
      />

      {/* 2/3 Fees and 1/3 Bond grid layout */}
      <div className="grid gap-6 lg:grid-cols-3 items-stretch">

        {/* Left Card: Fee Structure (Takes 2/3 screen width on desktop) */}
        <DetailPanel
          padded={false}
          className="lg:col-span-2 flex min-h-[360px] flex-col overflow-hidden"
        >
          <div className="flex flex-col">
            {/* BASE ANNUAL CHARGES Section */}
            <div className="flex flex-col">
              <DetailSubsectionHead title="Base Annual Charges" />
              <div className="flex flex-col border-y border-border">
                <FeeDetailRow label="Tuition Fees" value={formatCurrency(fees.tuition)} />
                <FeeDetailRow label="Hostel Fees" value={formatCurrency(fees.hostel)} />
                <FeeDetailRow label="Miscellaneous" value={formatCurrency(fees.misc)} isLast />
              </div>
            </div>

            {/* QUOTA-WISE TUITION BREAKDOWN Section */}
            {fees.quotaBreakdown && !fees.stateFeeSchedule?.length && (
              <div className="flex flex-col mt-2">
                <DetailSubsectionHead title="Quota-wise Tuition Breakdown" />
                <div className="flex flex-col border-y border-border">
                  <FeeDetailRow
                    label="Govt Quota (GQ)"
                    value={formatCurrency(fees.quotaBreakdown.govtQuotaAnnualInr)}
                  />
                  <FeeDetailRow
                    label="Management (MQ)"
                    value={formatCurrency(
                      fees.quotaBreakdown.managementQuotaAnnualInr,
                    )}
                    isLast={!fees.quotaBreakdown.nri}
                  />
                  {fees.quotaBreakdown.nri && (
                    <FeeDetailRow
                      label="NRI Quota"
                      value={formatCurrency(
                        fees.quotaBreakdown.nri.amount,
                        fees.quotaBreakdown.nri.currency,
                      )}
                      isLast
                    />
                  )}
                </div>
              </div>
            )}

            {fees.stateFeeSchedule && fees.stateFeeSchedule.length > 0 && (
              <div className="flex flex-col mt-2">
                <DetailSubsectionHead title={feeScheduleTitle} />
                <div className="flex flex-col border-y border-border">
                  {fees.stateFeeSchedule.map((row, idx) => {
                    const label = [
                      row.feeType,
                      row.category,
                      row.gender,
                    ]
                      .filter(Boolean)
                      .join(" · ");
                    const isLast = idx === fees.stateFeeSchedule!.length - 1;
                    return (
                      <FeeDetailRow
                        key={`${row.feeType}-${row.category ?? ""}-${idx}`}
                        label={label}
                        value={formatCurrency(row.totalAnnual)}
                        isLast={isLast}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* FEE TOTALS Section */}
            <div className="flex flex-col mt-2">
              <DetailSubsectionHead title="Fee Totals" />
              <div className="flex flex-col border-t border-border">
                <FeeDetailRow
                  label="Total Annual Fees"
                  value={formatCurrency(fees.totalAnnual)}
                />
                <FeeDetailRow
                  label="Total Course Fees (5 Years)"
                  value={formatCurrency(fees.totalCourse)}
                  isLast
                />
              </div>
            </div>

          </div>
        </DetailPanel>

        {/* Right Card: Service Bond (Takes 1/3 screen width on desktop) */}
        <DetailPanel className="lg:col-span-1 flex flex-col lg:self-start">
          <div className="flex flex-col gap-6">
            {/* Header: Title */}
            <div className="flex items-center gap-3">
              <svg className="h-6 w-6 stroke-current text-text" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="font-extrabold text-lg text-text">
                Service Bond
              </h3>
            </div>

            {/* Divider */}
            <hr className="border-t border-border/80 m-0" />

            {/* Mandatory Service badge */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase text-text-muted">
                Mandatory Service
              </span>
              <div
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2.5 rounded-xl w-full border text-sm font-extrabold",
                  hasBond
                    ? "border-outline-variant bg-secondary-container/25 text-on-secondary-container"
                    : "border-outline-variant bg-primary-fixed text-on-primary-fixed-variant"
                )}
              >
                {hasBond ? (
                  <>
                    <MaterialSymbol name="gavel" className="shrink-0 text-lg" />
                    <span>Rural service bond required</span>
                  </>
                ) : (
                  <>
                    <MaterialSymbol name="check_circle" className="shrink-0 text-lg" />
                    <span>No rural bond on record</span>
                  </>
                )}
              </div>
            </div>

            {/* Penalty and Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-wider uppercase text-text-muted">
                  Penalty
                </span>
                <span className="text-2xl font-black text-text">
                  {hasBond ? formatCurrency(bond.penalty) : "Rs. 0"}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-wider uppercase text-text-muted">
                  Duration
                </span>
                <span className="text-2xl font-black text-text">
                  {hasBond ? `${bond.years} ${bond.years === 1 ? "Year" : "Years"}` : "N/A"}
                </span>
              </div>
            </div>

            {/* Bottom Note Box matching Image */}
            <div className="flex gap-2.5 p-3.5 rounded-xl bg-surface-container-low/50 text-text-secondary text-xs border border-border/40">
              <MaterialSymbol name="info" className="mt-0.5 shrink-0 text-lg text-primary" />
              <span className="leading-normal font-medium text-text-secondary">
                {getBondNote()}
              </span>
            </div>
          </div>
        </DetailPanel>

      </div>

      {/* Exchange rate warning if NRI uses USD */}
      {isNriUsd && fees.quotaBreakdown?.nri?.amount && (
        <div className="flex items-start gap-2.5 p-4 rounded-xl border border-border bg-surface-container-low/50 text-xs text-text-muted leading-relaxed">
          <MaterialSymbol name="info" className="mt-0.5 shrink-0 text-lg text-primary" />
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-text-secondary">
              * Exchange Rate note: Foreign NRI tuition values are expressed in USD (e.g. {formatCurrency(fees.quotaBreakdown.nri.amount, "USD")}), and local facility costs are in INR.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

interface FeeDetailRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

function FeeDetailRow({
  label,
  value,
  isLast = false,
}: FeeDetailRowProps) {
  return (
    <div
      className={cn(
        "flex w-full",
        !isLast && "border-b border-border/80"
      )}
    >
      {/* Label cell: left, styled with gray background */}
      <div className="w-[38%] pl-6 pr-4 py-4 text-xs font-bold tracking-wider uppercase flex items-center text-text-muted bg-surface-container-low/20 border-r border-border/80">
        {label}
      </div>
      {/* Value cell: right, styled with light container background and primary brand color text */}
      <div className="w-[62%] pl-8 pr-6 py-4 text-sm font-extrabold flex items-center bg-surface-container-low/40 text-primary">
        {value}
      </div>
    </div>
  );
}
