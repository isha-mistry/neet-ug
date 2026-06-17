"use client";

import { useState } from "react";
import type { MccConversionRule, MccReservationCategory } from "@/lib/data/mcc-counselling";
import { counsellingDocumentsChecklist } from "./content";
import { FiCheckCircle, FiFileText } from "react-icons/fi";
import { PremiumSectionHeader } from "./QuotaShared";

// ----------------------------------------------------
// 1. Reservation Policy Table
// ----------------------------------------------------
interface ReservationPolicyTableProps {
  categories: MccReservationCategory[];
  title?: string;
  note?: string;
}

export function ReservationPolicyTable({
  categories,
  title = "Reservation Policy",
  note,
}: ReservationPolicyTableProps) {
  return (
    <div className="w-full">
      <PremiumSectionHeader icon="rule" title={title} subtitle={note || undefined} />
      <div className="overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface-container-lowest shadow-clinical-soft transition-shadow duration-300 hover:shadow-clinical-hover">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-bold text-[10px] uppercase tracking-wider border-b border-outline-variant/60">
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Quota %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 text-xs">
              {categories.map((row) => (
                <tr key={row.category} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-6 py-3.5 font-semibold text-on-surface">{row.category}</td>
                  <td className="px-6 py-3.5 text-primary font-bold">{row.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. Conversion Algorithm Grid
// ----------------------------------------------------
interface ConversionAlgorithmGridProps {
  rules: MccConversionRule[];
  title?: string;
  note?: string;
  extraRules?: MccConversionRule[];
}

export function ConversionAlgorithmGrid({
  rules,
  title = "Round 3 Seat Conversion",
  note,
  extraRules,
}: ConversionAlgorithmGridProps) {
  const allRules = extraRules ? [...rules, ...extraRules] : rules;

  return (
    <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-6 shadow-clinical-soft transition-shadow duration-300 hover:shadow-clinical-hover">
      <PremiumSectionHeader icon="published_with_changes" title={title} subtitle={note || undefined} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[10px] font-bold text-on-surface-variant">
        {allRules.map((rule) => (
          <div
            key={`${rule.from}-${rule.to}`}
            className="flex items-center justify-between rounded-xl border border-outline-variant/50 bg-surface-container-low/40 p-3 transition-colors hover:bg-surface-container-lowest"
          >
            <span className="text-primary font-bold uppercase">{rule.from}</span>
            <span className="material-symbols-outlined text-[12px] text-outline">arrow_forward</span>
            <span className="text-on-surface font-bold uppercase">{rule.to}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. Eligibility Checklist
// ----------------------------------------------------
interface EligibilityChecklistProps {
  items: string[];
  title?: string;
}

export function EligibilityChecklist({ items, title = "Eligibility Conditions" }: EligibilityChecklistProps) {
  return (
    <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-6 shadow-clinical-soft transition-shadow duration-300 hover:shadow-clinical-hover">
      <PremiumSectionHeader icon="assignment_turned_in" title={title} />
      <ul className="space-y-3.5 mt-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-xs text-on-surface-variant leading-relaxed">
            <FiCheckCircle className="text-primary text-sm shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ----------------------------------------------------
// 4. MCC Counselling Rounds
// ----------------------------------------------------
interface MccCounsellingRoundsProps {
  rounds: { name: string; description: string }[];
}

export function MccCounsellingRounds({ rounds }: MccCounsellingRoundsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {rounds.map((round, idx) => (
        <div
          key={round.name}
          className="flex flex-col rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-5 shadow-clinical-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-clinical-hover"
        >
          <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center mb-4 border border-primary/10 shadow-sm">
            {idx + 1}
          </div>
          <h4 className="text-xs font-bold text-on-surface mb-2 font-headline-md tracking-tight">{round.name}</h4>
          <p className="text-[11px] text-on-surface-variant/90 leading-relaxed">{round.description}</p>
        </div>
      ))}
    </div>
  );
}

// ----------------------------------------------------
// 5. Document Checklist Tabbed Widget
// ----------------------------------------------------
export function DocumentChecklistWidget() {
  const [activeTab, setActiveTab] = useState<"general" | "category" | "nri">("general");
  const lists = counsellingDocumentsChecklist;

  return (
    <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-6 shadow-clinical-soft transition-shadow duration-300 hover:shadow-clinical-hover md:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm border border-primary/10">
            <FiFileText className="text-base" />
          </div>
          <div>
            <h3 className="text-base font-bold text-on-surface font-headline-md tracking-tight">Required Counselling Documents</h3>
            <p className="text-[11px] text-on-surface-variant/85 mt-0.5">Keep original certificates and self-attested copies ready.</p>
          </div>
        </div>
        <div className="flex gap-1 bg-surface-container-low p-1 rounded-xl w-fit">
          {(["general", "category", "nri"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {tab === "general" ? "General" : tab === "category" ? "Category" : "NRI"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lists[activeTab].map((doc, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl border border-outline-variant/40 bg-surface-container-low/40 p-3 transition-colors hover:bg-surface-container-lowest"
          >
            <FiCheckCircle className="text-primary text-sm shrink-0 mt-0.5" />
            <span className="text-xs text-on-surface-variant leading-relaxed">{doc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
