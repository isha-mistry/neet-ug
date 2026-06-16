"use client";

import { GuideCard } from "@/components/features/mbbs-india/MbbsIndiaParts";
import { DataTable } from "@/components/features/neet-ug/shared/DataTable";

export interface FeeItem {
  quota: string;
  category: string;
  registrationFee: number;
  securityDeposit: number;
  isRefundable: boolean;
}

const feeData: FeeItem[] = [
  {
    quota: "15% All India Quota (AIQ)",
    category: "General / EWS",
    registrationFee: 1000,
    securityDeposit: 10000,
    isRefundable: true,
  },
  {
    quota: "15% All India Quota (AIQ)",
    category: "SC / ST / OBC / PwD",
    registrationFee: 500,
    securityDeposit: 5000,
    isRefundable: true,
  },
  {
    quota: "Deemed Universities",
    category: "All Candidates (Management/NRI)",
    registrationFee: 5000,
    securityDeposit: 200000,
    isRefundable: true,
  },
];

const MCC_REFUND_POLICY = [
  {
    label: "Financial custodian",
    text: (
      <>
        HLL Lifecare Ltd manages all payments and refunds. Contact:{" "}
        <a
          href="mailto:financemcc@lifecarehll.com"
          className="font-semibold text-primary hover:underline"
        >
          financemcc@lifecarehll.com
        </a>
        .
      </>
    ),
  },
  {
    label: "Refund account",
    text: "Refundable deposits return only to the same card or bank account used at registration. Keep that account active for 1–2 years. Do not pay from cyber café or shared cards.",
  },
  {
    label: "Chargebacks",
    text: "Do not raise chargebacks with your bank — that blocks MCC’s direct refund and requires a bank NOC, which delays repayment.",
  },
  {
    label: "NRI payments",
    text: "Under RBI rules, deposits cannot be refunded to NRI accounts. Transfer funds to an NRO account, pay from NRO, and receive the refund into the same NRO account.",
  },
  {
    label: "Duplicate payments",
    text: "Refunded within 30 days after registration closes. HLL deducts 50% of the registration fee or ₹500 (whichever is less) as administrative charges.",
  },
] as const;

function formatNumber(num: number): string {
  const str = num.toString();
  const lastThree = str.substring(str.length - 3);
  const otherNumbers = str.substring(0, str.length - 3);
  if (otherNumbers !== "") {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  }
  return lastThree;
}

export function CounsellingFeeTable() {
  const feeRows = feeData.map((item) => ({
    quota: item.quota,
    category: item.category,
    registrationFee: `₹${formatNumber(item.registrationFee)}`,
    securityDeposit: `₹${formatNumber(item.securityDeposit)}`,
    total: `₹${formatNumber(item.registrationFee + item.securityDeposit)}`,
  }));

  return (
    <div className="flex flex-col gap-6">
      <DataTable
        theme="guide"
        scrollable
        columns={[
          { key: "quota", label: "Quota / type" },
          { key: "category", label: "Category" },
          { key: "registrationFee", label: "Registration (non-refundable)", align: "right" },
          { key: "securityDeposit", label: "Security deposit (refundable)", align: "right" },
          { key: "total", label: "Total payment", align: "right" },
        ]}
        rows={feeRows}
        footnote="Pay using an account you control long-term — refunds go back to the same payment source only."
      />

      <GuideCard className="border-amber-200/80 bg-amber-50/40">
        <h3 className="flex items-center gap-2 text-sm font-bold text-amber-950">
          <span
            className="material-symbols-outlined text-lg text-amber-800"
            aria-hidden
          >
            payments
          </span>
          MCC refund policy
        </h3>
        <ul className="mt-4 space-y-3.5">
          {MCC_REFUND_POLICY.map((item) => (
            <li key={item.label} className="text-sm leading-relaxed text-on-surface-variant">
              <span className="font-semibold text-on-surface">{item.label}:</span> {item.text}
            </li>
          ))}
        </ul>
      </GuideCard>
    </div>
  );
}
