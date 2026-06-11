"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

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
    exitRule: "Free Exit Allowed",
    exitTone: "emerald",
    desc: "If you are allotted a seat in Round 1 but do not wish to join, you can safely ignore it. There will be no forfeiture of your security deposit and no penalty. You automatically remain eligible to participate in Round 2.",
    upgradation: "Upgradation Request",
    upgradationDesc: "If you report and join the allotted college, you can opt for 'Upgradation' to Round 2. If you are upgraded in Round 2, your Round 1 seat is automatically canceled; if not, you retain your Round 1 seat.",
    icon: "filter_1",
  },
  round2: {
    title: "Round 2: Seat Joining or Deposit Forfeiture",
    exitRule: "Exit with Deposit Forfeiture",
    exitTone: "amber",
    desc: "If you are allotted a seat in Round 2 and fail to join, your security deposit will be forfeited (₹10,000 for AIQ, or ₹2,00,000 for Deemed). To participate in subsequent rounds, you must register again and pay the security deposit.",
    upgradation: "Upgradation to Round 3",
    upgradationDesc: "Joined candidates in Round 2 can opt for upgradation in Round 3. Once upgraded in Round 3, you must report to the new college; the previous college seat is immediately allocated to another candidate.",
    icon: "filter_2",
  },
  round3: {
    title: "Round 3: Strict Seat Allotment (Compulsory Joining)",
    exitRule: "Compulsory Join / Disqualification",
    exitTone: "rose",
    desc: "If you are allotted a seat in Round 3, joining is mandatory. If you fail to join the allotted seat, you will be disqualified from counselling for the current academic session, and your security deposit will be forfeited.",
    upgradation: "No Upgradation to Stray Round",
    upgradationDesc: "Candidates holding or joining a seat in Round 3 are locked in. They are not allowed to vacate their seats or participate in any subsequent rounds (including the Stray Vacancy Round).",
    icon: "filter_3",
  },
  stray: {
    title: "Stray Vacancy Round: Final Seat Clearance",
    exitRule: "Compulsory Join + 2-Year NEET Ban",
    exitTone: "rose",
    desc: "Conducted for remaining vacant seats. No fresh choice filling is allowed in some instances (choices from Round 3 are carried over). If you are allotted a seat in this round, you MUST join. Failing to do so results in a 2-year ban from NEET exam/admissions and security deposit forfeiture.",
    upgradation: "Final Allotment Only",
    upgradationDesc: "No further upgrades are possible. This is the absolute final phase of seat allocation for the current academic session.",
    icon: "filter_4",
  },
};

export function CounsellingRounds({ rules = defaultRules }: CounsellingRoundsProps) {
  const [activeRound, setActiveRound] = useState<string>("round1");

  const badgeTones = {
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    rose: "bg-rose-50 text-rose-700 ring-rose-100",
    indigo: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Round Tabs switcher */}
      <div className="-mx-4 flex gap-6 overflow-x-auto border-b border-clinical-outline px-4 sm:mx-0 sm:px-0">
        {Object.keys(rules).map((roundKey) => {
          const isActive = activeRound === roundKey;
          const label = roundKey === "stray" ? "Stray Vacancy" : `Round ${roundKey.replace("round", "")}`;
          return (
            <button
              key={roundKey}
              onClick={() => setActiveRound(roundKey)}
              className={`-mb-px border-b-2 px-3 py-3 text-xs font-extrabold capitalize whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? "border-clinical-green text-clinical-green"
                  : "border-transparent text-clinical-muted/65 hover:text-clinical-muted"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Round detail display */}
      <Card
        padded={false}
        className="flex flex-col gap-6 rounded-lg border border-clinical-outline bg-clinical-surface p-6 shadow-sm transition-opacity duration-200"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-clinical-surface-low text-clinical-muted ring-1 ring-clinical-outline">
              <MaterialSymbol name={rules[activeRound].icon} size="sm" />
            </span>
            <div>
              <h3 className="text-base font-extrabold tracking-tight text-clinical-navy">
                {rules[activeRound].title}
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${
                    badgeTones[rules[activeRound].exitTone]
                  }`}
                >
                  {rules[activeRound].exitRule}
                </span>
                <span className="inline-flex items-center rounded-md bg-clinical-surface-low px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-clinical-muted ring-1 ring-clinical-outline">
                  {rules[activeRound].upgradation}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 border-t border-clinical-outline pt-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-clinical-muted/70">
              Exit & Forfeiture Rules
            </span>
            <p className="text-sm leading-relaxed text-clinical-muted">
              {rules[activeRound].desc}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-clinical-muted/70">
              Upgradation & Locking Behavior
            </span>
            <p className="text-sm leading-relaxed text-clinical-muted">
              {rules[activeRound].upgradationDesc}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
