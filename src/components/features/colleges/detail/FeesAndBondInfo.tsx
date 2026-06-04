import { Card } from "@/components/ui/Card";
import type { CollegeFees, CollegeBond } from "@/types/college";
import { FiInfo, FiCheckCircle } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import { DetailSectionHeader } from "@/components/features/colleges/shared/DetailSectionHeader";

interface FeesAndBondInfoProps {
  fees: CollegeFees;
  bond: CollegeBond;
}

export function FeesAndBondInfo({ fees, bond }: FeesAndBondInfoProps) {
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
  const isNriUsd = nriCurrencyStr?.toUpperCase() === "USD" || nriCurrencyStr === "$";

  // Dynamic Bond Note matching screenshot
  const getBondNote = () => {
    if (bond.note) return bond.note;
    if (bond.years === 0 && bond.penalty === 0) {
      return "Note: Bond data not available in source dataset. Information presented based on latest available verified norms.";
    }
    if (fees.totalAnnual < 20000) {
      return "AIIMS institutions generally do not have a rural service bond for MBBS graduates as per central government regulations.";
    }
    return "Service bond obligations, rural postings, and penalties depend strictly on state counseling guidelines.";
  };

  return (
    <section className="flex flex-col gap-4 animate-fadeIn">
      {/* Reusable Premium Section Header */}
      <DetailSectionHeader
        title="Fees & Bond Specification"
        description="MBBS tuition structure by quota, facility costs, caution deposit, and rural service agreements"
        theme="indigo"
      />
      
      {/* 2/3 Fees and 1/3 Bond grid layout */}
      <div className="ms-fees-grid">
        
        {/* Left Card: Fee Structure (Takes 2/3 screen width on desktop) */}
        <Card 
          padded={false} 
          className="ms-fees-card border shadow-sm rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--color-surface-container-lowest)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex flex-col">
            {/* BASE ANNUAL CHARGES Section */}
            <div className="flex flex-col">
              <CardSectionHeader title="Base Annual Charges" />
              <div className="flex flex-col">
                <FeeDetailRow label="Tuition Fees" value={formatCurrency(fees.tuition)} />
                <FeeDetailRow label="Hostel Fees" value={formatCurrency(fees.hostel)} />
                <FeeDetailRow label="Miscellaneous" value={formatCurrency(fees.misc)} isLast />
              </div>
            </div>

            {/* QUOTA-WISE TUITION BREAKDOWN Section */}
            {fees.quotaBreakdown && (
              <div className="flex flex-col">
                <CardSectionHeader title="Quota-wise Tuition Breakdown" />
                <div className="flex flex-col">
                  <FeeDetailRow 
                    label="Govt Quota (GQ)" 
                    value={formatCurrency(fees.quotaBreakdown.govtQuotaAnnualInr)} 
                  />
                  <FeeDetailRow 
                    label="Management (MQ)" 
                    value={formatCurrency(fees.quotaBreakdown.managementQuotaAnnualInr)} 
                    valueColor="var(--color-text-secondary)"
                    isLast={!fees.quotaBreakdown.nri}
                  />
                  {fees.quotaBreakdown.nri && (
                    <FeeDetailRow 
                      label="NRI Quota" 
                      value={formatCurrency(fees.quotaBreakdown.nri.amount, fees.quotaBreakdown.nri.currency)} 
                      isLast
                    />
                  )}
                </div>
              </div>
            )}

            {/* FEE TOTALS Section */}
            <div className="flex flex-col">
              <CardSectionHeader title="Fee Totals" />
              <div className="flex flex-col">
                <FeeDetailRow 
                  label="Total Annual Fees" 
                  value={formatCurrency(fees.totalAnnual)} 
                  valueColor="var(--color-text)"
                />
                <FeeDetailRow 
                  label="Total Course Fees (5 Years)" 
                  value={formatCurrency(fees.totalCourse)} 
                  valueColor="var(--color-text)"
                  isLast
                />
              </div>
            </div>

          </div>
        </Card>

        {/* Right Card: Service Bond (Takes 1/3 screen width on desktop) */}
        <Card 
          padded={false} 
          className="border shadow-sm rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--color-surface-container-lowest)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="p-7 flex flex-col gap-6">
            {/* Header: Title */}
            <div className="flex items-center gap-3">
              <svg className="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" style={{ color: "var(--color-on-surface)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="font-bold text-xl md:text-2xl" style={{ color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}>
                Service Bond
              </h3>
            </div>

            {/* Divider */}
            <hr style={{ borderColor: "var(--color-border)", borderTopWidth: "1px", margin: "0" }} />

            {/* Mandatory Service badge */}
            <div className="flex flex-col gap-2.5">
              <span 
                className="text-[10px] font-black tracking-wider uppercase"
                style={{ color: "var(--color-text-muted)" }}
              >
                Mandatory Service
              </span>
              <div 
                className="flex items-center gap-3 px-4 py-3 rounded-xl w-full border"
                style={
                  hasBond
                    ? {
                        backgroundColor: "rgba(224, 231, 255, 0.8)",
                        color: "#3730a3",
                        borderColor: "#e0e7ff",
                      }
                    : {
                        backgroundColor: "rgba(209, 250, 229, 0.8)",
                        color: "#007b55",
                        borderColor: "#d1fae5",
                      }
                }
              >
                {hasBond ? (
                  <>
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" style={{ color: "#3730a3" }}>
                      <path fillRule="evenodd" d="M2.166 4.9L10 1.55l7.834 3.35a1 1 0 01.618.92v4.887c0 5.59-3.824 10.29-9 11.622-5.176-1.332-9-6.03-9-11.622V5.82a1 1 0 01.618-.92zM10 16a1 1 0 001-1V9a1 1 0 10-2 0v6a1 1 0 001 1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-sm">Rural Service Bond Required</span>
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" style={{ color: "#007b55" }}>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-sm">No Rural Bond Required</span>
                  </>
                )}
              </div>
            </div>

            {/* Penalty and Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <span 
                  className="text-[10px] font-black tracking-wider uppercase"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Penalty
                </span>
                <span 
                  className="text-4xl font-extrabold tracking-tight"
                  style={{ color: "var(--color-text)", fontWeight: 900 }}
                >
                  {hasBond ? formatCurrency(bond.penalty) : "Rs. 0"}
                </span>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <span 
                  className="text-[10px] font-black tracking-wider uppercase"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Duration
                </span>
                <span 
                  className="text-4xl font-extrabold tracking-tight"
                  style={{ color: "var(--color-text)", fontWeight: 900 }}
                >
                  {hasBond ? `${bond.years} ${bond.years === 1 ? "Year" : "Years"}` : "N/A"}
                </span>
              </div>
            </div>

            {/* Bottom Note Box matching Image */}
            <div 
              className="flex gap-3.5 p-4 rounded-xl leading-relaxed"
              style={{
                backgroundColor: "#f1f3f5",
                color: "var(--color-text-secondary)",
                fontSize: "12px",
              }}
            >
              <FiInfo className="h-5 w-5 flex-shrink-0" style={{ color: "#3b82f6", marginTop: "2px" }} />
              <span>
                {getBondNote()}
              </span>
            </div>
          </div>
        </Card>
        
      </div>

      {/* Exchange rate warning if NRI uses USD */}
      {isNriUsd && fees.quotaBreakdown?.nri?.amount && (
        <div 
          className="flex items-start gap-2 p-3.5 rounded-xl border text-[11px] leading-relaxed"
          style={{
            backgroundColor: "var(--color-surface-container-low)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          <FiInfo className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }} />
          <div className="flex flex-col gap-0.5">
            <p>
              * <strong>Exchange Rate note:</strong> Foreign NRI tuition values are expressed in USD (e.g. <strong>{formatCurrency(fees.quotaBreakdown.nri.amount, "USD")}</strong>), and local facility costs are in INR.
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
  valueColor?: string;
  isLast?: boolean;
}

function FeeDetailRow({
  label,
  value,
  valueColor = "var(--color-secondary)",
  isLast = false,
}: FeeDetailRowProps) {
  return (
    <div 
      className="flex"
      style={{
        borderBottom: isLast ? "none" : "1px solid var(--color-border)",
      }}
    >
      <div 
        className="w-[38%] pl-6 pr-4 py-4.5 text-[11px] font-bold tracking-wider uppercase flex items-center"
        style={{
          color: "var(--color-text-muted)",
          backgroundColor: "var(--color-surface-container-lowest)",
        }}
      >
        {label}
      </div>
      <div 
        className="w-[62%] pl-8 pr-6 py-4.5 text-sm font-bold flex items-center"
        style={{
          color: valueColor,
          backgroundColor: "var(--color-surface-container-low)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function CardSectionHeader({ title }: { title: string }) {
  return (
    <div className="px-6 pt-6 pb-2.5">
      <h4 
        className="text-[11px] font-black tracking-wider uppercase"
        style={{ color: "var(--color-text)" }}
      >
        {title}
      </h4>
    </div>
  );
}
