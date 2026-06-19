"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";
import { guideCardClass } from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

const SCORE_RANGES = [
  { id: "all", label: "Show All Ranks", score: "All Scores", desc: "View all pathways" },
  { id: "650", label: "Top Rankers", score: "650+", desc: "Premier institutions (AIIMS, JIPMER, Central Gov)" },
  { id: "550", label: "High Scorers", score: "550 - 650", desc: "Government & Semi-Gov Medical Colleges" },
  { id: "450", label: "Mid Range", score: "450 - 550", desc: "BDS, AYUSH, Private Medical Colleges" },
  { id: "below450", label: "Alternative Paths", score: "Below 450", desc: "Allied Health, Veterinary, Nursing" },
];

export function ScoreGuidance() {
  const [selectedScoreRange, setSelectedScoreRange] = useState<string>("all");

  return (
    <section id="score-guidance" className="py-16 bg-surface">
      <Container size="page">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-black text-on-surface md:text-4xl tracking-tight">
            NEET Score-Based Career Mapping
          </h2>
          <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
            Every score range opens up meaningful healthcare pathways. Filter by your expected NEET UG score to view realistic, premium course choices in India.
          </p>
        </div>

        {/* Interactive Score Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {SCORE_RANGES.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedScoreRange(range.id)}
              className={cn(
                "px-5 py-3 rounded-2xl border text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer",
                selectedScoreRange === range.id
                  ? "bg-primary text-on-primary border-primary shadow-sm"
                  : "border-outline-variant/60 bg-surface-container-lowest text-on-surface-variant hover:border-primary/40 hover:bg-surface-container-low"
              )}
            >
              <span className="block text-[10px] font-black uppercase tracking-wider opacity-75">{range.label}</span>
              <span className="text-sm font-black mt-0.5 block">{range.score}</span>
            </button>
          ))}
        </div>

        {/* Score Range Content Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* 650+ Card */}
          <div className={cn(
            guideCardClass,
            "transition-all duration-300",
            selectedScoreRange === "650" || selectedScoreRange === "all"
              ? "border-primary bg-primary/[0.02] scale-100 opacity-100"
              : "opacity-55 scale-98"
          )}>
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-md mb-4 font-semibold">Score: 650+</span>
            <h3 className="text-lg font-black text-on-surface mb-2">Premier MBBS Opportunities</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
              Direct entry into top tier national institutions, premier research centers, and elite government medical universities.
            </p>
            <ul className="space-y-3 text-xs font-semibold text-on-surface">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check_circle</span> AIIMS New Delhi &amp; Rishikesh</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check_circle</span> JIPMER Puducherry</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check_circle</span> Top Government Medical Colleges</li>
            </ul>
          </div>

          {/* 550 - 650 Card */}
          <div className={cn(
            guideCardClass,
            "transition-all duration-300",
            selectedScoreRange === "550" || selectedScoreRange === "all"
              ? "border-primary bg-primary/[0.02] scale-100 opacity-100"
              : "opacity-55 scale-98"
          )}>
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-md mb-4 font-semibold">Score: 550 - 650</span>
            <h3 className="text-lg font-black text-on-surface mb-2">Government &amp; Semi-Gov MBBS</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
              Excellent chances for state-quota government MBBS seats and highly reputed semi-government trust institutions.
            </p>
            <ul className="space-y-3 text-xs font-semibold text-on-surface">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check_circle</span> State Government Colleges</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check_circle</span> Reputed Municipal/Trust Colleges</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check_circle</span> High-end Private Institutions</li>
            </ul>
          </div>

          {/* 450 - 550 Card */}
          <div className={cn(
            guideCardClass,
            "transition-all duration-300",
            selectedScoreRange === "450" || selectedScoreRange === "all"
              ? "border-primary bg-primary/[0.02] scale-100 opacity-100"
              : "opacity-55 scale-98"
          )}>
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-md mb-4 font-semibold">Score: 450 - 550</span>
            <h3 className="text-lg font-black text-on-surface mb-2">BDS, AYUSH &amp; Private MBBS</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
              Perfect score range for dental surgery clinical roles, top-tier traditional medicines (AYUSH), or budget private MBBS.
            </p>
            <ul className="space-y-3 text-xs font-semibold text-on-surface">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check_circle</span> Government Dental Colleges (BDS)</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check_circle</span> BAMS &amp; BHMS Top Institutions</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check_circle</span> Private MBBS via State Quotas</li>
            </ul>
          </div>

          {/* Below 450 Card */}
          <div className={cn(
            guideCardClass,
            "transition-all duration-300",
            selectedScoreRange === "below450" || selectedScoreRange === "all"
              ? "border-primary bg-primary/[0.02] scale-100 opacity-100"
              : "opacity-55 scale-98"
          )}>
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-md mb-4 font-semibold">Score: Below 450</span>
            <h3 className="text-lg font-black text-on-surface mb-2">Allied Health &amp; Specialized Care</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
              Immense career options in rehabilitation, high-demand diagnostic technologies, nursing sciences, and veterinary clinics.
            </p>
            <ul className="space-y-3 text-xs font-semibold text-on-surface">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check_circle</span> Physiotherapy (BPT) &amp; Optometry</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check_circle</span> B.Sc Nursing &amp; Lab Sciences</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">check_circle</span> Veterinary Medicine (BVSc)</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

