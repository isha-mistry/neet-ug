"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { neetBadgeClass, neetIconTileClass, neetLabelClass } from "@/lib/neet-ug-2026/design-system";
import { cn } from "@/lib/utils";

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
    <Card padded={false} className="p-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className={cn(neetIconTileClass, "h-10 w-10 bg-tertiary-fixed text-tertiary")}>
              <MaterialSymbol name="checklist" size="sm" />
            </span>
            <div>
              <h3 className="text-[16.5px] font-extrabold tracking-[-0.01em] text-on-surface">
                Documents checklist
              </h3>
              <p className="mt-2 text-sm leading-[1.6] text-on-surface-variant">
                Keep original papers ready before college reporting.
              </p>
            </div>
          </div>
          <span className={cn(neetBadgeClass, "shrink-0 bg-tertiary-fixed text-tertiary ring-1 ring-tertiary/15")}>
            {checkedCount} / {items.length}
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-low">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <label
              key={item.id}
              className={cn(
                "flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-sm font-semibold leading-5 transition-colors",
                checklist[item.id]
                  ? "border-tertiary/25 bg-tertiary-fixed/30 text-on-surface"
                  : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-primary-fixed/20"
              )}
            >
              <input
                type="checkbox"
                checked={!!checklist[item.id]}
                onChange={() => toggleCheck(item.id)}
                className="mt-0.5 h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
              />
              {item.label}
            </label>
          ))}
        </div>
        <p className={cn(neetLabelClass, "text-outline")}>Progress saves during this page session.</p>
      </div>
    </Card>
  );
}