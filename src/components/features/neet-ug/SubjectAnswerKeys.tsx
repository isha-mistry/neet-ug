"use client";

import React, { useState } from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

export interface AnswerKeyItem {
  qNo: number;
  codeA: string;
  codeB: string;
  status: string;
}

interface SubjectAnswerKeysProps {
  physics?: AnswerKeyItem[];
  chemistry?: AnswerKeyItem[];
  biology?: AnswerKeyItem[];
}

const defaultPhysics = [
  { qNo: 1, codeA: "3", codeB: "3", status: "Official" },
  { qNo: 2, codeA: "1", codeB: "2", status: "Challenged" },
  { qNo: 3, codeA: "4", codeB: "4", status: "Official" },
  { qNo: 4, codeA: "2", codeB: "2", status: "Official" },
  { qNo: 5, codeA: "1", codeB: "1", status: "Official" },
  { qNo: 6, codeA: "3", codeB: "4", status: "Challenged" },
  { qNo: 7, codeA: "2", codeB: "2", status: "Official" },
  { qNo: 8, codeA: "4", codeB: "4", status: "Official" },
  { qNo: 9, codeA: "Bonus", codeB: "Bonus", status: "Official" },
  { qNo: 10, codeA: "2", codeB: "3", status: "Official" },
];

const defaultChemistry = [
  { qNo: 1, codeA: "4", codeB: "4", status: "Official" },
  { qNo: 2, codeA: "2", codeB: "2", status: "Official" },
  { qNo: 3, codeA: "1", codeB: "1", status: "Official" },
  { qNo: 4, codeA: "3", codeB: "3", status: "Official" },
  { qNo: 5, codeA: "4", codeB: "2", status: "Challenged" },
  { qNo: 6, codeA: "1", codeB: "1", status: "Official" },
  { qNo: 7, codeA: "3", codeB: "3", status: "Official" },
  { qNo: 8, codeA: "2", codeB: "2", status: "Official" },
  { qNo: 9, codeA: "4", codeB: "4", status: "Official" },
  { qNo: 10, codeA: "1", codeB: "1", status: "Official" },
];

const defaultBiology = [
  { qNo: 1, codeA: "2", codeB: "2", status: "Official" },
  { qNo: 2, codeA: "4", codeB: "4", status: "Official" },
  { qNo: 3, codeA: "3", codeB: "3", status: "Official" },
  { qNo: 4, codeA: "1", codeB: "1", status: "Official" },
  { qNo: 5, codeA: "2", codeB: "2", status: "Official" },
  { qNo: 6, codeA: "4", codeB: "4", status: "Official" },
  { qNo: 7, codeA: "3", codeB: "3", status: "Official" },
  { qNo: 8, codeA: "1", codeB: "1", status: "Official" },
  { qNo: 9, codeA: "2", codeB: "2", status: "Official" },
  { qNo: 10, codeA: "3", codeB: "4", status: "Challenged" },
];

export function SubjectAnswerKeys({
  physics = defaultPhysics,
  chemistry = defaultChemistry,
  biology = defaultBiology,
}: SubjectAnswerKeysProps) {
  const [activeTab, setActiveTab] = useState<"physics" | "chemistry" | "biology">("physics");

  const sampleAnswerKey = { physics, chemistry, biology };

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* Tabs */}
      <div className="flex border-b border-border gap-2">
        {(["physics", "chemistry", "biology"] as const).map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveTab(sub)}
            className={`px-6 py-3 font-semibold text-sm capitalize transition-colors border-b-2 -mb-[2px] ${
              activeTab === sub
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Answer Key Table */}
      <div className="ms-table-container shadow-sm border border-border rounded-2xl bg-white overflow-hidden animate-fadeIn">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-border text-xs font-bold uppercase tracking-wider text-text-secondary">
              <th className="p-4 pl-6">Question No.</th>
              <th className="p-4">Set Code A Answer</th>
              <th className="p-4">Set Code B Answer</th>
              <th className="p-4 pr-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 text-sm">
            {sampleAnswerKey[activeTab].map((item) => (
              <tr key={item.qNo} className="hover:bg-brand-50/10 transition-colors">
                <td className="p-4 pl-6 font-bold text-text">Question {item.qNo}</td>
                <td className="p-4 font-semibold text-brand-700">{item.codeA}</td>
                <td className="p-4 font-semibold text-brand-700">{item.codeB}</td>
                <td className="p-4 pr-6 text-right">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    item.status === "Challenged"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
