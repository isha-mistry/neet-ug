"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

export interface RoundRule {
  title: string;
  exitRule: string;
  desc: string;
  upgradation: string;
  upgradationDesc: string;
}

interface CounsellingRoundsProps {
  rules?: Record<string, RoundRule>;
}

const defaultRules: Record<string, RoundRule> = {
  round1: {
    title: "Round 1: Initial Allotment & Options",
    exitRule: "Free Exit Allowed",
    desc: "If you are allotted a seat in Round 1 but do not wish to join, you can simply ignore it. There will be no forfeiture of your security deposit. You remain eligible to participate in Round 2.",
    upgradation: "Upgrade Request",
    upgradationDesc: "If you join the allotted college, you can opt for 'upgradation' to Round 2. If upgraded, your Round 1 seat is auto-canceled; if not upgraded, you retain your Round 1 seat.",
  },
  round2: {
    title: "Round 2: Mandatory Report or Penalty",
    exitRule: "Exit with Forfeiture of Deposit",
    desc: "If you are allotted a seat in Round 2 and fail to join, your security deposit will be forfeited. You can re-register in subsequent rounds by paying the security deposit again.",
    upgradation: "Upgradation to Round 3",
    upgradationDesc: "Joined candidates in Round 2 can opt for upgradation in Round 3. Once upgraded, you must report to the new college; the previous seat is immediately allocated to another candidate.",
  },
  round3: {
    title: "Round 3: Strict Seat Allotment",
    exitRule: "Seat Joining Compulsory",
    desc: "If you are allotted a seat in Round 3, you MUST join. If you do not join, you will be disqualified from counselling for the current academic session, and your security deposit will be forfeited.",
    upgradation: "No Upgradation to Stray Round",
    upgradationDesc: "Candidates holding a seat in Round 3 are locked in and are not allowed to vacate their seats, nor can they participate in the Stray Vacancy Round.",
  },
  stray: {
    title: "Stray Vacancy Round: final mop-up",
    exitRule: "Compulsory Join or 2-Year Ban",
    desc: "Conducted for remaining vacant seats. No fresh choice filling is allowed in some instances (choices from Round 3 are used). Candidates allotted a seat must join; failing to do so will result in a 2-year ban from NEET exams.",
    upgradation: "Final Allotment Only",
    upgradationDesc: "No upgrades are possible. This is the absolute final phase of seat allocation for the academic session.",
  },
};

export function CounsellingRounds({ rules = defaultRules }: CounsellingRoundsProps) {
  const [activeRound, setActiveRound] = useState<string>("round1");

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div className="flex border-b border-border gap-1 overflow-x-auto scrollbar-none">
        {Object.keys(rules).map((roundKey) => (
          <button
            key={roundKey}
            onClick={() => setActiveRound(roundKey)}
            className={`px-5 py-3 font-semibold text-xs capitalize whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${
              activeRound === roundKey
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text"
            }`}
          >
            {roundKey === "stray" ? "Stray Vacancy" : `Round ${roundKey.replace("round", "")}`}
          </button>
        ))}
      </div>

      {/* Round Details */}
      <Card padded bordered className="bg-white/80 shadow-sm rounded-2xl flex flex-col gap-5 animate-fadeIn">
        <div>
          <h4 className="text-lg font-extrabold text-text capitalize">
            {rules[activeRound].title}
          </h4>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-red-50 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded border border-red-100">
              {rules[activeRound].exitRule}
            </span>
            <span className="bg-brand-50 text-primary text-xs font-bold px-2.5 py-0.5 rounded border border-brand-100">
              {rules[activeRound].upgradation}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-border/50">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Exit & Refund Rules</span>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              {rules[activeRound].desc}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Upgradation Rules</span>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              {rules[activeRound].upgradationDesc}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
