"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

export interface ChecklistItem {
  id: string;
  label: string;
}

interface DocumentChecklistProps {
  items?: ChecklistItem[];
}

const defaultItems: ChecklistItem[] = [
  { id: "admitCard", label: "NEET UG 2026 Admit Card (with passport photo affixed)" },
  { id: "scorecard", label: "NEET UG 2026 Scorecard / Official Rank Letter" },
  { id: "class10", label: "Class 10 Certificate & Marksheet (proof of birth date)" },
  { id: "class12", label: "Class 12 Passing Certificate & Marksheet" },
  { id: "domicile", label: "State Domicile / Residence Proof Certificate" },
  { id: "category", label: "Category Certificate (OBC-NCL, SC, ST, EWS if applicable)" },
  { id: "photos", label: "8 Passport-size Photographs (same as in NEET form)" },
  { id: "idProof", label: "Identity Proof (Aadhaar, Passport, PAN, or DL)" },
];

export function DocumentChecklist({ items = defaultItems }: DocumentChecklistProps) {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = items.filter((item) => checklist[item.id]).length;
  const progressPercent = Math.round((checkedCount / items.length) * 100);

  return (
    <Card padded bordered className="bg-surface-elevated border border-border rounded-2xl shadow-level-1">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-text">Documents Checklist</h3>
            <p className="text-xs text-text-secondary mt-1">Make sure you have all original papers ready for reporting.</p>
          </div>
          <span className="text-xs font-extrabold text-primary bg-brand-50 border border-brand-100 px-2 py-0.5 rounded">
            {checkedCount} / {items.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* List of items */}
        <div className="flex flex-col gap-2 mt-2">
          {items.map((item) => (
            <label
              key={item.id}
              className={`flex items-start gap-2.5 p-2 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                checklist[item.id]
                  ? "bg-brand-50/40 border-brand-100 text-text"
                  : "bg-background border-border hover:bg-slate-50 text-text-secondary"
              }`}
            >
              <input
                type="checkbox"
                checked={!!checklist[item.id]}
                onChange={() => toggleCheck(item.id)}
                className="mt-0.5 rounded text-primary border-border focus:ring-primary h-3.5 w-3.5"
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
    </Card>
  );
}
