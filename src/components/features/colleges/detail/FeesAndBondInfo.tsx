import { Card } from "@/components/ui/Card";
import type { CollegeFees, CollegeBond } from "@/types/college";
import { FiAward, FiShield, FiCheck, FiInfo } from "react-icons/fi";

interface FeesAndBondInfoProps {
  fees: CollegeFees;
  bond: CollegeBond;
}

export function FeesAndBondInfo({ fees, bond }: FeesAndBondInfoProps) {
  const hasBond = bond.years > 0;

  // Granular quota tuition fees
  const gqTuition = fees.gqFees ?? fees.tuition ?? 0;
  const mqTuition = fees.mqFees ?? 0;
  const nriTuition = fees.nriFees ?? 0;
  const nriCurrency = fees.nriCurrency ?? "Rs.";

  // Mandatory annual charges
  const hostelFee = fees.hostelFees ?? fees.hostel ?? 0;
  const messFee = fees.messFees ?? 0;
  const universityFee = fees.universityFees ?? fees.misc ?? 0;
  const transportFee = fees.transportFees ?? 0;
  const examFee = fees.examFees ?? 0;

  // Check if NRI quota uses USD
  const isNriUsd = nriCurrency.toUpperCase() === "USD" || nriCurrency === "$";

  // Formatting helper supporting Rupees (INR) and Dollars (USD)
  const formatCurrency = (amount: number, isNri: boolean = false) => {
    if (amount === 0) return "—";
    const isUsd = isNri && isNriUsd;
    
    if (isUsd) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(amount);
    }
    
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Dynamic Bond Note matching screenshot
  const getBondNote = () => {
    if (bond.note) return bond.note;
    if (fees.totalAnnual < 20000) {
      return "AIIMS institutions generally do not have a rural service bond for MBBS graduates as per central government regulations.";
    }
    return "Service bond obligations, rural postings, and penalties depend strictly on state counseling guidelines.";
  };

  // Structured list items to render vertically matching Image 1 format
  const feeRows = [
    { label: "General", value: gqTuition, isNri: false },
    { label: "Management", value: mqTuition, isNri: false },
    { label: "NRI", value: nriTuition, isNri: true },
    { label: "Hostel", value: hostelFee, border: true },
    { label: "Mess", value: messFee, isMess: true },
    { label: "University", value: universityFee },
    { label: "Transport", value: transportFee },
    { label: "Exam", value: examFee },
  ];

  return (
    <section className="flex flex-col gap-4 animate-fadeIn">
      {/* Premium Header Design */}
      <div className="ms-section-header ms-section-header-indigo">
        <div className="flex flex-col gap-0.5">
          <h2 className="ms-section-header-title">
            Fees & Bond Specification
          </h2>
          <p className="ms-section-header-description">
            MBBS tuition structure by quota, facility costs, caution deposit, and rural service agreements
          </p>
        </div>
      </div>
      
      {/* 2/3 Fees and 1/3 Bond grid layout */}
      <div className="ms-fees-grid">
        
        {/* Left Card: Fee Structure (Takes 2/3 screen width on desktop) */}
        <Card padded className="ms-fees-card">
          <div>
            {/* Header: Title and Academic Year Badge */}
            <div className="ms-card-header-premium">
              <div className="ms-card-header-icon-title">
                <FiAward className="text-brand-500 h-5.5 w-5.5" />
                <h3 className="ms-card-header-title">Fee Structure</h3>
              </div>

              {/* Academic Year Badge */}
              <span className="ms-academic-badge">
                Academic Year 2024-25
              </span>
            </div>

            {/* List Structure matching Image 1 */}
            <dl className="ms-fees-list">
              {feeRows.map((row, idx) => (
                <div 
                  key={idx} 
                  className={row.border ? "ms-fees-row ms-fees-row-bordered" : "ms-fees-row"}
                >
                  <span>{row.label}</span>
                  <span className="ms-fees-value">
                    {row.value > 0 ? (
                      formatCurrency(row.value, row.isNri)
                    ) : (
                      row.isMess ? (
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200/50 px-2 py-0.5 rounded uppercase tracking-wide">
                          Included
                        </span>
                      ) : "—"
                    )}
                  </span>
                </div>
              ))}
            </dl>
          </div>
        </Card>

        {/* Right Card: Service Bond (Takes 1/3 screen width on desktop) */}
        <Card padded className="ms-bond-card">
          <div>
            {/* Header: Title */}
            <div className="ms-card-header-premium">
              <div className="ms-card-header-icon-title">
                <FiShield className="text-brand-500 h-5 w-5" />
                <h3 className="ms-card-header-title-sm">Service Bond</h3>
              </div>
            </div>

            {/* Content matching Image 3 */}
            <div className="ms-bond-section">
              <div className="flex flex-col gap-2">
                <span className="ms-bond-label-tiny">
                  Mandatory Service
                </span>
                <div className={`ms-bond-badge-service ${
                  hasBond ? "ms-bond-badge-service-yes" : "ms-bond-badge-service-no"
                }`}>
                  <FiCheck className="h-4.5 w-4.5" />
                  <span>{hasBond ? "Rural Service Bond" : "No Rural Bond"}</span>
                </div>
              </div>

              {/* Penalty and Duration */}
              <div className="ms-bond-stat-grid">
                <div className="flex flex-col gap-0.5">
                  <span className="ms-bond-label-tiny">
                    Penalty
                  </span>
                  <span className={`ms-bond-stat-val ${hasBond ? "ms-bond-stat-val-mono" : ""}`}>
                    {hasBond ? formatCurrency(bond.penalty) : "₹0.00"}
                  </span>
                </div>
                
                <div className="flex flex-col gap-0.5">
                  <span className="ms-bond-label-tiny">
                    Duration
                  </span>
                  <span className="ms-bond-stat-val">
                    {hasBond ? `${bond.years} ${bond.years === 1 ? "Year" : "Years"}` : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Note Box matching Image 3 */}
          <div className="ms-bond-note-box">
            <p className="font-medium text-slate-700">
              <strong>Note:</strong> {getBondNote()}
            </p>
          </div>
        </Card>
        
      </div>

      {/* Exchange rate warning if NRI uses USD */}
      {isNriUsd && nriTuition > 0 && (
        <div className="flex items-start gap-2 bg-slate-50 p-3.5 rounded-xl border border-border/40 text-[11px] text-text-muted leading-relaxed">
          <FiInfo className="text-brand-600 h-4 w-4 flex-shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <p>
              * <strong>Exchange Rate note:</strong> Foreign NRI tuition values are expressed in USD (e.g. <strong>$49,000 USD</strong>), and local facility costs are in INR.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

