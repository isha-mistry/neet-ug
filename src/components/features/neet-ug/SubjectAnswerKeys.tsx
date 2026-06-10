"use client";

import React, { useState } from "react";

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
    <div className="mt-2 flex flex-col gap-4">
      <div className="flex gap-6 border-b border-clinical-outline">
        {(["physics", "chemistry", "biology"] as const).map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveTab(sub)}
            className={`-mb-px border-b-2 px-0 py-3 text-[12px] font-bold capitalize transition-colors ${
              activeTab === sub
                ? "border-clinical-navy text-clinical-navy"
                : "border-transparent text-clinical-muted/60 hover:text-clinical-muted"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-clinical-outline bg-clinical-surface shadow-clinical-soft transition-opacity duration-200">
        <table className="w-full min-w-[680px] border-collapse text-left tabular-nums">
          <thead>
            <tr className="border-b border-clinical-outline bg-clinical-surface-low text-[10px] font-extrabold uppercase tracking-[0.16em] text-clinical-muted/75">
              <th className="p-4 pl-7">Question No.</th>
              <th className="p-4">Set Code A Answer</th>
              <th className="p-4">Set Code B Answer</th>
              <th className="p-4 pr-7 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-clinical-outline text-[13px]">
            {sampleAnswerKey[activeTab].map((item) => (
              <tr key={item.qNo} className="transition-colors hover:bg-clinical-surface-low/45">
                <td className="p-4 pl-7 font-extrabold text-clinical-navy">
                  Question {item.qNo}
                </td>
                <td className="p-4 font-bold text-clinical-blue">{item.codeA}</td>
                <td className="p-4 font-bold text-clinical-blue">{item.codeB}</td>
                <td className="p-4 pr-7 text-right">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] ${
                    item.status === "Challenged"
                      ? "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
                      : "bg-emerald-50 text-clinical-green ring-1 ring-emerald-100"
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-clinical-outline py-4 text-center">
          <button className="text-[12px] font-extrabold text-clinical-blue transition-colors hover:text-clinical-navy">
            View All 180 Questions +
          </button>
        </div>
      </div>
    </div>
  );
}
