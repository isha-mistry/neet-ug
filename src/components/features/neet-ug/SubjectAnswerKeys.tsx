"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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
      <div className="flex gap-6 border-b border-outline-variant">
        {(["physics", "chemistry", "biology"] as const).map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => setActiveTab(sub)}
            className={cn(
              "-mb-px border-b-2 px-0 py-3 text-sm font-bold capitalize transition-colors",
              activeTab === sub
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            )}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)]">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm tabular-nums">
          <thead className="bg-primary">
            <tr>
              <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-on-primary">Question No.</th>
              <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-on-primary">Set Code A Answer</th>
              <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-on-primary">Set Code B Answer</th>
              <th className="px-5 py-4 text-right text-[10px] font-bold uppercase tracking-[0.14em] text-on-primary">Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleAnswerKey[activeTab].map((item) => (
              <tr key={item.qNo} className="border-b border-outline-variant transition-colors last:border-b-0 hover:bg-primary-fixed/20">
                <td className="bg-surface-container-low/60 px-5 py-4 font-bold text-on-surface">
                  Question {item.qNo}
                </td>
                <td className="px-5 py-4 font-bold text-primary">{item.codeA}</td>
                <td className="px-5 py-4 font-bold text-primary">{item.codeB}</td>
                <td className="px-5 py-4 text-right">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
                      item.status === "Challenged"
                        ? "border-tertiary-fixed-dim/60 bg-tertiary-fixed text-on-tertiary-fixed-variant"
                        : "border-secondary/25 bg-secondary-fixed/80 text-secondary"
                    )}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-outline-variant py-4 text-center">
          <Button variant="text" size="sm" type="button">
            View all 180 questions +
          </Button>
        </div>
      </div>
    </div>
  );
}