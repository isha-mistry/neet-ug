"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

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
  return (
    <div className="flex flex-col gap-6">
      {/* Table container */}
      <div className="-mx-4 overflow-x-auto border-y border-clinical-outline bg-clinical-surface shadow-sm sm:mx-0 sm:rounded-lg sm:border">
        <div className="min-w-[700px]">
          <table className="w-full border-collapse text-left text-xs tabular-nums sm:text-sm">
            <thead>
              <tr className="border-b border-clinical-outline bg-clinical-surface-low text-[10px] font-extrabold uppercase tracking-widest text-clinical-muted/75">
                <th className="py-4 px-4 sm:px-6">Quota / Type</th>
                <th className="py-4 px-4 sm:px-6">Category</th>
                <th className="py-4 px-4 sm:px-6 text-right">Registration Fee (Non-Refundable)</th>
                <th className="py-4 px-4 sm:px-6 text-right">Security Deposit (Refundable)</th>
                <th className="py-4 px-4 sm:px-6 text-right font-extrabold text-clinical-navy">Total Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-clinical-outline">
              {feeData.map((item, index) => {
                const total = item.registrationFee + item.securityDeposit;
                return (
                  <tr
                    key={index}
                    className="hover:bg-clinical-surface-low/45 transition-colors"
                  >
                    <td className="py-4 px-4 font-extrabold text-clinical-navy sm:px-6">
                      {item.quota}
                    </td>
                    <td className="py-4 px-4 font-semibold text-clinical-muted sm:px-6">{item.category}</td>
                    <td className="py-4 px-4 text-right font-mono font-medium text-clinical-muted sm:px-6">
                      ₹{formatNumber(item.registrationFee)}
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-medium text-clinical-muted sm:px-6">
                      ₹{formatNumber(item.securityDeposit)}
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-extrabold text-clinical-navy sm:px-6">
                      ₹{formatNumber(total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Warning/Refund Alert Card */}
      <Card
        padded={false}
        className="flex flex-col gap-3.5 rounded-lg border border-rose-100 bg-rose-50/20 p-5 shadow-sm w-full"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-600 ring-1 ring-rose-150">
            <MaterialSymbol name="warning" size="sm" />
          </span>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-800">
            MCC Refund Policy
          </h4>
        </div>
        <div className="text-[11px] leading-relaxed text-clinical-muted space-y-2">
          <p>
            <strong>Financial Custodian:</strong> HLL Lifecare Ltd manages all payments &amp; refunds. Contact: <em>financemcc@lifecarehll.com</em>.
          </p>
          <p>
            <strong>Refund Account:</strong> Refundable deposits are sent back ONLY to the exact card/bank account used during registration. Keep the account active for 1-2 years. Never pay using cyber cafe cards.
          </p>
          <p>
            <strong>Chargebacks:</strong> Do NOT initiate chargeback claims through your bank; doing so blocks direct refund and requires an NOC from the bank, delaying refunds significantly.
          </p>
          <p>
            <strong>NRI Payments:</strong> Deposits cannot be refunded to NRI Accounts under RBI rules. You must transfer funds NRI → NRO Account, pay via NRO, and receive the refund back into NRO.
          </p>
          <p>
            <strong>Duplicate Payments:</strong> Refunded within 30 days of registration closing. HLL will deduct 50% of the registration fee or ₹500 (whichever is less) for administrative expenses.
          </p>
        </div>
      </Card>
    </div>
  );
}
