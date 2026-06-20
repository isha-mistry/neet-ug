"use client";

import { useState } from "react";
import { GuideCard } from "@/components/features/neet-ug/shared/NeetUgSharedParts";
import { cn } from "@/lib/utils";

export interface RoundRule {
  title: string;
  exitRule: string;
  exitTone: "emerald" | "amber" | "rose" | "indigo";
  desc: string;
  upgradation: string;
  upgradationDesc: string;
  icon: string;
}

interface CounsellingRoundsProps {
  rules?: Record<string, RoundRule>;
}

const defaultRules: Record<string, RoundRule> = {
  round1: {
    title: "Round 1: Initial Allotment & Upgradation Option",
    exitRule: "Free exit allowed",
    exitTone: "emerald",
    desc: "If you are allotted a seat in Round 1 but do not wish to join, you can safely ignore it. There will be no forfeiture of your security deposit and no penalty. You automatically remain eligible to participate in Round 2.",
    upgradation: "Upgradation request",
    upgradationDesc:
      "If you report and join the allotted college, you can opt for upgradation to Round 2. If you are upgraded in Round 2, your Round 1 seat is automatically canceled; if not, you retain your Round 1 seat.",
    icon: "filter_1",
  },
  round2: {
    title: "Round 2: Seat joining or deposit forfeiture",
    exitRule: "Exit with deposit forfeiture",
    exitTone: "amber",
    desc: "If you are allotted a seat in Round 2 and fail to join, your security deposit will be forfeited (₹10,000 for AIQ, or ₹2,00,000 for Deemed). To participate in subsequent rounds, you must register again and pay the security deposit.",
    upgradation: "Upgradation to Round 3",
    upgradationDesc:
      "Joined candidates in Round 2 can opt for upgradation in Round 3. Once upgraded in Round 3, you must report to the new college; the previous college seat is immediately allocated to another candidate.",
    icon: "filter_2",
  },
  round3: {
    title: "Round 3: Strict seat allotment (compulsory joining)",
    exitRule: "Compulsory join / disqualification",
    exitTone: "rose",
    desc: "If you are allotted a seat in Round 3, joining is mandatory. If you fail to join the allotted seat, you will be disqualified from counselling for the current academic session, and your security deposit will be forfeited.",
    upgradation: "No upgradation to stray round",
    upgradationDesc:
      "Candidates holding or joining a seat in Round 3 are locked in. They cannot vacate their seats or participate in subsequent rounds (including the stray vacancy round).",
    icon: "filter_3",
  },
  stray: {
    title: "Stray vacancy round: Final seat clearance",
    exitRule: "Compulsory join + 2-year NEET ban",
    exitTone: "rose",
    desc: "Conducted for remaining vacant seats. If you are allotted a seat in this round, you must join. Failing to do so can result in a 2-year ban from NEET exam/admissions and security deposit forfeiture.",
    upgradation: "Final allotment only",
    upgradationDesc:
      "No further upgrades are possible. This is the final phase of seat allocation for the current academic session.",
    icon: "filter_4",
  },
};

const ROUND_ORDER = ["round1", "round2", "round3", "stray"] as const;

function roundTabLabel(roundKey: string) {
  if (roundKey === "stray") return "Stray vacancy";
  return `Round ${roundKey.replace("round", "")}`;
}

const exitBadgeClasses: Record<RoundRule["exitTone"], string> = {
  emerald: "border-secondary/25 bg-secondary-fixed/80 text-on-secondary-fixed-variant",
  amber: "border-tertiary-fixed-dim/60 bg-tertiary-fixed text-on-tertiary-fixed-variant",
  rose: "border-error/30 bg-error-container text-on-error-container",
  indigo: "border-primary/15 bg-primary-fixed text-primary",
};

export function CounsellingRounds({ rules = defaultRules }: CounsellingRoundsProps) {
  const [activeRound, setActiveRound] = useState<string>("round1");
  const active = rules[activeRound];
  if (!active) return null;

  return (
    <div className="flex flex-col gap-5">
      <div
        className="inline-flex w-fit max-w-full self-start gap-1 overflow-x-auto rounded-xl border border-outline-variant bg-surface-container-high p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Counselling rounds"
      >
        {ROUND_ORDER.filter((key) => key in rules).map((roundKey) => {
          const isActive = activeRound === roundKey;
          return (
            <button
              key={roundKey}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveRound(roundKey)}
              className={cn(
                "cursor-pointer whitespace-nowrap rounded-lg px-5 py-2 text-xs font-semibold transition-all",
                isActive
                  ? "bg-surface font-bold text-primary shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {roundTabLabel(roundKey)}
            </button>
          );
        })}
      </div>

      <GuideCard role="tabpanel">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3.5">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary"
              aria-hidden
            >
              <span className="material-symbols-outlined text-[22px] leading-none">
                {active.icon}
              </span>
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-bold leading-snug text-on-surface md:text-lg">
                {active.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold",
                    exitBadgeClasses[active.exitTone]
                  )}
                >
                  {active.exitRule}
                </span>
                <span className="inline-flex items-center rounded-full border border-outline-variant bg-surface-container-high px-2.5 py-0.5 text-[11px] font-bold text-on-surface-variant">
                  {active.upgradation}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 border-t border-outline-variant pt-6 md:grid-cols-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              Exit &amp; forfeiture rules
            </p>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{active.desc}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              Upgradation &amp; locking behavior
            </p>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              {active.upgradationDesc}
            </p>
          </div>
        </div>
      </GuideCard>
    </div>
  );
}
