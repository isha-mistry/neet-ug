"use client";

import { useState } from "react";
import type { MccConversionRule, MccReservationCategory } from "@/lib/data/mcc-counselling";
import {
  guideTableClass,
  guideTableLabelNumericColsClass,
  guideTableWrapClass,
  summaryHighlightCardClass,
} from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";
import { counsellingDocumentsChecklist } from "./content";
import { FiCheckCircle, FiFileText } from "react-icons/fi";
import { PremiumSectionHeader } from "./QuotaShared";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

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
      <div className="quota-table-wrap">
        <table className="quota-table">
          <thead>
            <tr>
              <th className="pl-6">Category</th>
              <th className="pr-6 text-right">Quota %</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((row) => (
              <tr key={row.category}>
                <td className="font-semibold text-on-surface">{row.category}</td>
                <td className="font-bold text-primary text-right pr-6">{row.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
    <Card>
      <PremiumSectionHeader icon="published_with_changes" title={title} subtitle={note || undefined} />
      <div className="grid grid-cols-1 gap-2.5 text-[10px] font-bold text-on-surface-variant sm:grid-cols-2">
        {allRules.map((rule) => (
          <div
            key={`${rule.from}-${rule.to}`}
            className="flex items-center justify-between rounded-xl border border-outline-variant/40 bg-surface-container-low/40 p-3 transition-colors hover:bg-surface-container-lowest"
          >
            <span className="font-bold uppercase text-primary">{rule.from}</span>
            <span className="material-symbols-outlined text-[12px] text-outline">arrow_forward</span>
            <span className="font-bold uppercase text-on-surface">{rule.to}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

interface EligibilityChecklistProps {
  items: string[];
  title?: string;
}

export function EligibilityChecklist({ items, title = "Eligibility Conditions" }: EligibilityChecklistProps) {
  return (
    <Card>
      <PremiumSectionHeader icon="assignment_turned_in" title={title} />
      <ul className="mt-2 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-on-surface-variant">
            <FiCheckCircle className="mt-0.5 shrink-0 text-sm text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

interface MccCounsellingRoundsProps {
  rounds: { name: string; description: string }[];
}

export function MccCounsellingRounds({ rounds }: MccCounsellingRoundsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {rounds.map((round, idx) => (
        <Card
          key={round.name}
          hover={true}
          className="flex flex-col"
        >
          <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-primary/10 bg-primary text-xs font-bold text-on-primary">
            {idx + 1}
          </div>
          <h4 className="mb-2 font-headline-md text-xs font-bold tracking-tight text-on-surface">
            {round.name}
          </h4>
          <p className="text-[11px] leading-relaxed text-on-surface-variant">{round.description}</p>
        </Card>
      ))}
    </div>
  );
}

export function DocumentChecklistWidget() {
  const [activeTab, setActiveTab] = useState<"general" | "category" | "nri">("general");
  const lists = counsellingDocumentsChecklist;

  return (
    <Card className="md:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-primary text-on-primary shadow-sm">
            <FiFileText className="text-base" />
          </div>
          <div>
            <h3 className="font-headline-md text-base font-bold tracking-tight text-on-surface">
              Required counselling documents
            </h3>
            <p className="mt-0.5 text-[11px] text-on-surface-variant">
              Keep original certificates and self-attested copies ready.
            </p>
          </div>
        </div>
        <div className="flex w-fit gap-1 rounded-xl bg-surface-container-low p-1">
          {(["general", "category", "nri"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-150 active:scale-95",
                activeTab === tab
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              {tab === "general" ? "General" : tab === "category" ? "Category" : "NRI"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {lists[activeTab].map((doc, index) => (
          <Card
            key={index}
            padded={false}
            className="flex items-start gap-3 p-4 shadow-sm border-outline-variant/40"
          >
            <FiCheckCircle className="mt-0.5 shrink-0 text-sm text-primary" />
            <span className="text-xs leading-relaxed text-on-surface-variant">{doc}</span>
          </Card>
        ))}
      </div>
    </Card>
  );
}
