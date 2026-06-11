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
    <Card
      padded={false}
      className="rounded-lg border border-clinical-outline bg-clinical-surface p-6 shadow-sm"
    >
      <div className="flex flex-col gap-5 ">
        <div className="grid grid-cols-9 items-start justify-between gap-4 ">
          <div className="col-span-7">
            <h3 className="flex items-center gap-2 text-[16px] font-extrabold tracking-[-0.01em] text-clinical-navy">
              <MaterialSymbol name="checklist" className="text-clinical-green" size="sm" />
              Documents Checklist
            </h3>
            <p className="mt-2 text-xs leading-5 text-clinical-muted">
              Keep original papers ready before college reporting.
            </p>
          </div>
          <span className="col-span-2 w-fit rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-clinical-green ring-1 ring-emerald-100">
            {checkedCount} / {items.length}
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-clinical-surface-low">
          <div
            className="h-full rounded-full bg-clinical-green transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <label
              key={item.id}
              className={`flex cursor-pointer items-start gap-2.5 rounded-[10px] border p-3 text-xs font-semibold leading-5 transition-colors ${
                checklist[item.id]
                  ? "border-emerald-100 bg-emerald-50/50 text-clinical-navy"
                  : "border-clinical-outline bg-clinical-surface-low/40 text-clinical-muted hover:bg-clinical-surface-low"
              }`}
            >
              <input
                type="checkbox"
                checked={!!checklist[item.id]}
                onChange={() => toggleCheck(item.id)}
                className="mt-0.5 h-4 w-4 rounded border-clinical-outline text-clinical-green focus:ring-clinical-green"
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
    </Card>
  );
}
