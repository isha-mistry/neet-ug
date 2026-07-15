"use client";

import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { DetailSectionHeader } from "@/components/features/colleges/shared/DetailSectionHeader";
import { DetailPanel, DetailSubsectionHead } from "@/components/features/colleges/shared/DetailPanel";
import type { CollegeBond, CollegeFees, StateFeeScheduleRow } from "@/types/college";
import type { CounsellingPool } from "@/lib/colleges/counselling-pool";
import {
  feeHeadlineForAuthority,
  feeRowsForAuthority,
  hasMccFeeScheduleData,
  hasStateFeeScheduleData,
  isMccFeeScheduleSource,
  resolveFeeRowAuthority,
} from "@/lib/colleges/fee-source";
import { getStateConfig } from "@/lib/colleges/state-config";
import { useCounsellingScope } from "@/components/features/colleges/detail/CounsellingScopeContext";
import { cn } from "@/lib/utils";

interface FeesAndBondInfoProps {
  fees: CollegeFees;
  bond: CollegeBond;
  stateSlug?: string;
}

type FeeAuthority = "state" | "mcc";

const FEE_POOL_SECTIONS: {
  pool: CounsellingPool;
  authority: FeeAuthority;
  filter: (row: StateFeeScheduleRow) => boolean;
}[] = [
    {
      pool: "kea-state",
      authority: "state",
      filter: (row) =>
        resolveFeeRowAuthority(row) === "state" &&
        (row.counsellingPool === "kea-state" ||
          (!row.counsellingPool && !row.feeType.startsWith("MCC"))),
    },
    {
      pool: "kea-nri",
      authority: "state",
      filter: (row) =>
        resolveFeeRowAuthority(row) === "state" &&
        row.counsellingPool === "kea-nri",
    },
    {
      pool: "kea-management",
      authority: "state",
      filter: (row) =>
        resolveFeeRowAuthority(row) === "state" &&
        row.counsellingPool === "kea-management",
    },
    {
      pool: "mcc-aiq",
      authority: "mcc",
      filter: (row) =>
        resolveFeeRowAuthority(row) === "mcc" &&
        (row.counsellingPool === "mcc-aiq" || row.feeType.startsWith("MCC AIQ")),
    },
    {
      pool: "mcc-deemed",
      authority: "mcc",
      filter: (row) =>
        resolveFeeRowAuthority(row) === "mcc" &&
        (row.counsellingPool === "mcc-deemed" ||
          row.feeType.startsWith("MCC Deemed")),
    },
    {
      pool: "mcc-nri",
      authority: "mcc",
      filter: (row) =>
        resolveFeeRowAuthority(row) === "mcc" &&
        (row.counsellingPool === "mcc-nri" || row.feeType.startsWith("MCC NRI")),
    },
  ];

function sectionTitle(
  pool: CounsellingPool,
  stateSlug: string | undefined,
  stateScheduleTitle: string,
  onlyOneSection: boolean,
): string {
  if (onlyOneSection && pool === "kea-state") return stateScheduleTitle;
  switch (pool) {
    case "kea-state":
      return stateSlug === "karnataka" ? "KEA state counselling" : "State quota";
    case "kea-nri":
      return stateSlug === "karnataka" ? "KEA NRI quota" : "NRI quota";
    case "kea-management":
      return stateSlug === "karnataka"
        ? "KEA management / deemed"
        : "Management / deemed";
    case "mcc-aiq":
      return "MCC All India Quota";
    case "mcc-deemed":
      return "MCC Deemed / Paid";
    case "mcc-nri":
      return "MCC NRI Quota";
    default:
      return stateScheduleTitle;
  }
}

export function FeesAndBondInfo({ fees, bond, stateSlug }: FeesAndBondInfoProps) {
  const scope = useCounsellingScope();
  const stateConfig = getStateConfig(stateSlug);
  const hasBond = bond.years > 0;

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

  const nriCurrencyStr = fees.quotaBreakdown?.nri?.currency as string | undefined;
  const isNriUsd =
    nriCurrencyStr?.toUpperCase() === "USD" || nriCurrencyStr === "$";

  const feeScheduleTitle =
    stateConfig.feeScheduleTitle ??
    (stateSlug === "maharashtra"
      ? "CET state fee schedule"
      : stateSlug === "madhya-pradesh"
        ? "DMAT fee schedule"
        : stateSlug === "uttar-pradesh"
          ? "UP DGME fee schedule"
          : stateSlug === "karnataka"
            ? "KEA state counselling fees"
            : "State fee schedule");

  const schedule = fees.stateFeeSchedule ?? [];
  const activeAuthority =
    scope?.authority ??
    (hasMccFeeScheduleData(fees) && !hasStateFeeScheduleData(fees)
      ? "mcc"
      : "state");
  const authoritySchedule = feeRowsForAuthority(schedule, activeAuthority);
  const headline = feeHeadlineForAuthority(fees, activeAuthority);

  const feeSections = FEE_POOL_SECTIONS.map((section) => ({
    ...section,
    rows: authoritySchedule.filter(section.filter),
  })).filter((section) => {
    if (section.rows.length === 0) return false;
    // MCC AIQ uses Base Annual Charges (tuition/hostel/misc) — skip line-item sections.
    if (activeAuthority === "mcc" && section.pool === "mcc-aiq") return false;
    return true;
  });

  const isUpFeeLayout = stateSlug === "uttar-pradesh";
  const showStateQuotaBreakdown =
    activeAuthority === "state" &&
    !isMccFeeScheduleSource(fees.scheduleSource) &&
    stateConfig.feesMode === "quotaBreakdown";
  const hasHeadlineAmounts =
    headline != null &&
    (headline.tuition > 0 ||
      headline.hostel > 0 ||
      headline.misc > 0 ||
      (fees.hostelAcFees ?? 0) > 0 ||
      (fees.hostelNonAcFees ?? 0) > 0 ||
      (fees.securityDeposit ?? 0) > 0);
  // MCC: always prefer simple Tuition / Hostel / Misc. State: only when no schedule table.
  const showBaseCharges =
    hasHeadlineAmounts &&
    (activeAuthority === "mcc" || authoritySchedule.length === 0);
  const showTotalAnnual = (headline?.totalAnnual ?? 0) > 0;
  const showTotalCourse = (headline?.totalCourse ?? 0) > 0;
  const showFeeTotals = showTotalAnnual || showTotalCourse;
  const showQuotaBreakdown =
    showStateQuotaBreakdown &&
    fees.quotaBreakdown != null &&
    authoritySchedule.length === 0;

  const hasFeeData =
    showBaseCharges ||
    feeSections.length > 0 ||
    showQuotaBreakdown ||
    showFeeTotals;

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

  const renderPenaltyDisplay = () => {
    if (!hasBond) return <span className="text-xl font-black text-text">Rs. 0</span>;

    if (stateSlug === "haryana" || bond.note?.includes("(Male)")) {
      return (
        <div className="flex flex-col gap-1 mt-0.5 pr-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-text bg-surface-container-low/90 px-2 py-1 rounded border border-border/60 shadow-2xs">
            <span className="text-[11px] text-text-muted">Male:</span>
            <span>₹25.77 Lakhs</span>
          </div>
          <div className="flex items-center justify-between text-xs font-extrabold text-text bg-surface-container-low/90 px-2 py-1 rounded border border-border/60 shadow-2xs">
            <span className="text-[11px] text-text-muted">Female:</span>
            <span>₹23.19 Lakhs</span>
          </div>
        </div>
      );
    }

    if (stateSlug === "madhya-pradesh" || bond.note?.includes("UR/OBC/EWS")) {
      return (
        <div className="flex flex-col gap-1 mt-0.5 pr-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-text bg-surface-container-low/90 px-2 py-1 rounded border border-border/60 shadow-2xs">
            <span className="text-[11px] text-text-muted">UR/OBC:</span>
            <span>₹10 Lakhs</span>
          </div>
          <div className="flex items-center justify-between text-xs font-extrabold text-text bg-surface-container-low/90 px-2 py-1 rounded border border-border/60 shadow-2xs">
            <span className="text-[11px] text-text-muted">SC/ST:</span>
            <span className="text-primary font-bold">Lower (Brochure)</span>
          </div>
        </div>
      );
    }

    return <span className="text-xl font-black text-text">{formatCurrency(bond.penalty)}</span>;
  };

  return (
    <section className="flex flex-col gap-6 animate-fadeIn">
      <DetailSectionHeader
        eyebrow="Investment"
        title="Fees & bond"
        description="Tuition by quota, annual charges, and rural service bond terms"
        icon="payments"
      />

      <div className="grid gap-6 lg:grid-cols-3 items-stretch">
        <DetailPanel
          padded={false}
          className="lg:col-span-2 flex min-h-[360px] flex-col overflow-hidden"
        >
          <div className="flex flex-col">
            {!hasFeeData ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <MaterialSymbol name="payments" className="text-3xl" />
                </div>
                <h3 className="text-base font-bold text-text">
                  Fee data not available
                </h3>
                <p className="max-w-md text-xs leading-relaxed text-text-muted">
                  {activeAuthority === "mcc"
                    ? "MCC fee details are not recorded for this college in our dataset."
                    : "State counselling fee details are not recorded for this college in our dataset."}
                </p>
              </div>
            ) : (
              <>
            {showBaseCharges && headline && (
              <div className="flex flex-col">
                <DetailSubsectionHead title="Base Annual Charges" />
                <div className="flex flex-col border-y border-border">
                  <FeeDetailRow label="Tuition Fees" value={formatCurrency(headline.tuition)} />
                  {isUpFeeLayout ? (
                    <>
                      <FeeDetailRow
                        label="Hostel Fees (AC)"
                        value={formatCurrency(fees.hostelAcFees ?? 0)}
                      />
                      <FeeDetailRow
                        label="Hostel Fees (Non-AC)"
                        value={formatCurrency(fees.hostelNonAcFees ?? 0)}
                      />
                      <FeeDetailRow
                        label="Miscellaneous"
                        value={formatCurrency(headline.misc)}
                      />
                      <FeeDetailRow
                        label="Security Deposit (One-Time)"
                        value={formatCurrency(fees.securityDeposit ?? 0)}
                        isLast
                      />
                    </>
                  ) : (
                    <>
                      <FeeDetailRow label="Hostel Fees" value={formatCurrency(headline.hostel)} />
                      <FeeDetailRow label="Miscellaneous" value={formatCurrency(headline.misc)} isLast />
                    </>
                  )}
                </div>
              </div>
            )}

            {showQuotaBreakdown && fees.quotaBreakdown && (
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

            {feeSections.length > 0 && (
              <>
                {feeSections.map((section, sectionIdx) => (
                  <div key={section.pool} className="flex flex-col mt-2">
                    <DetailSubsectionHead
                      title={sectionTitle(
                        section.pool,
                        stateSlug,
                        feeScheduleTitle,
                        feeSections.length === 1,
                      )}
                    />
                    <div className="flex flex-col border-y border-border">
                      {section.rows.map((row, idx) => {
                        const label = [row.feeType, row.category, row.gender]
                          .filter(Boolean)
                          .join(" · ");
                        const isLast = idx === section.rows.length - 1;
                        return (
                          <FeeDetailRow
                            key={`${section.pool}-${row.feeType}-${row.category ?? ""}-${idx}`}
                            label={label}
                            value={formatCurrency(
                              row.totalAnnual,
                              row.currency ?? "INR",
                            )}
                            isLast={
                              isLast && sectionIdx === feeSections.length - 1
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </>
            )}

            {showFeeTotals && headline && (
              <div className="flex flex-col mt-2">
                <DetailSubsectionHead title="Fee Totals" />
                <div className="flex flex-col border-t border-border">
                  {showTotalAnnual && (
                    <FeeDetailRow
                      label="Total Annual Fees"
                      value={formatCurrency(headline.totalAnnual)}
                      isLast={!showTotalCourse}
                    />
                  )}
                  {showTotalCourse && (
                    <FeeDetailRow
                      label="Total Course Fees (5 Years)"
                      value={formatCurrency(headline.totalCourse)}
                      isLast
                    />
                  )}
                </div>
              </div>
            )}
              </>
            )}
          </div>
        </DetailPanel>

        <DetailPanel className="lg:col-span-1 flex flex-col lg:self-start">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <svg className="h-6 w-6 stroke-current text-text" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="font-extrabold text-lg text-text">
                Service Bond
              </h3>
            </div>

            <hr className="border-t border-border/80 m-0" />

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

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col col-span-2 gap-1">
                <span className="text-[10px] font-bold tracking-wider uppercase text-text-muted">
                  Penalty
                </span>
                {renderPenaltyDisplay()}
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-wider uppercase text-text-muted">
                  Duration
                </span>
                <span className="text-xl font-black text-text">
                  {hasBond ? `${bond.years} ${bond.years === 1 ? "Year" : "Years"}` : "N/A"}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 p-3.5 rounded-xl bg-surface-container-low/50 text-text-secondary text-xs border border-border/40">
              <MaterialSymbol name="info" className="mt-0.5 shrink-0 text-lg text-primary" />
              <span className="leading-normal font-medium text-text-secondary">
                {getBondNote()}
              </span>
            </div>
          </div>
        </DetailPanel>
      </div>

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
      <div className="w-[38%] pl-6 pr-4 py-4 text-xs font-bold tracking-wider uppercase flex items-center text-text-muted bg-surface-container-low/20 border-r border-border/80">
        {label}
      </div>
      <div className="w-[62%] pl-8 pr-6 py-4 text-sm font-extrabold flex items-center bg-surface-container-low/40 text-primary">
        {value}
      </div>
    </div>
  );
}
