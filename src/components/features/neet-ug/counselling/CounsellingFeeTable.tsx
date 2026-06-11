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
  const [selectedQuota, setSelectedQuota] = useState<number>(0);

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
                const isSelected = selectedQuota === index;
                return (
                  <tr
                    key={index}
                    onClick={() => setSelectedQuota(index)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-emerald-50/30" : "hover:bg-clinical-surface-low/45"
                    }`}
                  >
                    <td className="flex items-center gap-2 py-4 px-4 font-extrabold text-clinical-navy sm:px-6">
                      <span
                        className={`flex h-2.5 w-2.5 rounded-full ${
                          isSelected ? "scale-110 bg-clinical-green" : "border border-clinical-outline-strong bg-transparent"
                        } transition-all`}
                      />
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

      {/* Calculator Summary / Info Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dynamic Detail Card */}
        <Card
          padded={false}
          className="col-span-1 flex flex-col gap-4 rounded-lg border border-clinical-outline bg-clinical-surface p-5 shadow-sm md:col-span-2"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-clinical-green ring-1 ring-emerald-100/40">
              <MaterialSymbol name="calculate" size="sm" />
            </span>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-clinical-muted/70">
              Fee Structure Details
            </h4>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-clinical-outline pb-2 text-xs">
              <span className="text-clinical-muted">Selected Option:</span>
              <span className="font-extrabold text-clinical-navy">{feeData[selectedQuota].quota}</span>
            </div>
            <div className="flex items-center justify-between border-b border-clinical-outline pb-2 text-xs">
              <span className="text-clinical-muted">Category:</span>
              <span className="font-semibold text-clinical-navy">{feeData[selectedQuota].category}</span>
            </div>
            <div className="flex items-center justify-between border-b border-clinical-outline pb-2 text-xs">
              <span className="flex items-center gap-1 text-clinical-muted">
                Registration Fee
                <span className="text-[10px] font-normal text-clinical-muted/70">(Non-Refundable)</span>
              </span>
              <span className="font-mono font-extrabold text-clinical-navy">
                ₹{formatNumber(feeData[selectedQuota].registrationFee)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-clinical-muted">
                Security Deposit
                <span className="text-[10px] font-normal text-clinical-green">(Refundable)</span>
              </span>
              <span className="font-mono font-extrabold text-clinical-navy">
                ₹{formatNumber(feeData[selectedQuota].securityDeposit)}
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-clinical-outline pt-3">
            <span className="text-sm font-extrabold text-clinical-navy">Total Payment Required</span>
            <span className="font-mono text-lg font-black text-clinical-green">
              ₹{formatNumber(feeData[selectedQuota].registrationFee + feeData[selectedQuota].securityDeposit)}
            </span>
          </div>
        </Card>

        {/* Warning/Refund Alert Card */}
        <Card
          padded={false}
          className="col-span-1 flex flex-col gap-3.5 rounded-lg border border-rose-100 bg-rose-50/20 p-5 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-600 ring-1 ring-rose-150">
              <MaterialSymbol name="warning" size="sm" />
            </span>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-800">
              Security Deposit Notice
            </h4>
          </div>
            <p className="text-xs leading-relaxed text-clinical-muted">
            <strong>Refund Destination:</strong> Refundable deposits are sent back to the exact bank account used during registration.
          </p>
          <div className="text-[11px] leading-relaxed text-rose-950 font-medium bg-white/70 rounded-xl p-3 border border-rose-100/50">
            ⚠️ <strong>Crucial Rule:</strong> Never pay using cyber cafe cards or temporary payment wallets. Keep your payment account open for at least 1-2 years.
          </div>
        </Card>
      </div>
    </div>
  );
}
