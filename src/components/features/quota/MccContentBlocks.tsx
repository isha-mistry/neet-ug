"use client";

import type { MccConversionRule, MccReservationCategory } from "@/lib/data/mcc-counselling";

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
    <div>
      <h3 className="text-lg font-bold text-on-surface font-headline-md mb-4">{title}</h3>
      {note && (
        <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{note}</p>
      )}
      <div className="overflow-hidden border border-outline-variant rounded-2xl bg-surface-container-lowest shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-bold text-xs uppercase border-b border-outline-variant">
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Quota %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60 text-sm">
              {categories.map((row) => (
                <tr key={row.category} className="hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-on-surface">{row.category}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{row.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 ">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-2xl text-primary">published_with_changes</span>
        <h3 className="text-lg font-bold text-on-surface font-headline-md">{title}</h3>
      </div>
      {note && (
        <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{note}</p>
      )}
      <div className="grid grid-cols-2 gap-3 text-[11px] font-medium text-on-surface-variant">
        {allRules.map((rule) => (
          <div
            key={`${rule.from}-${rule.to}`}
            className="flex items-center gap-2 p-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl"
          >
            <span className="text-primary font-bold">{rule.from}</span>
            <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
            <span className="text-on-surface font-bold">{rule.to}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface EligibilityChecklistProps {
  items: string[];
  title?: string;
}

export function EligibilityChecklist({ items, title = "Eligibility Conditions" }: EligibilityChecklistProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 ">
      <h3 className="text-lg font-bold text-on-surface font-headline-md mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-on-surface-variant leading-relaxed">
            <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface MccCounsellingRoundsProps {
  rounds: { name: string; description: string }[];
}

export function MccCounsellingRounds({ rounds }: MccCounsellingRoundsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {rounds.map((round, idx) => (
        <div
          key={round.name}
          className="flex flex-col bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 hover:shadow-md transition-all"
        >
          <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center mb-3">
            {idx + 1}
          </div>
          <h4 className="text-sm font-bold text-on-surface mb-2">{round.name}</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">{round.description}</p>
        </div>
      ))}
    </div>
  );
}
