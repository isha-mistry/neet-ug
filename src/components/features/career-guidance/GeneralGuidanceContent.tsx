"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";
import { guideCardClass, summaryHighlightCardClass } from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

const ASSESSMENT_PILLARS = [
  {
    title: "1. Cognitive Aptitude",
    desc: "Measures functional capabilities. Are you naturally skilled at logical deductions, diagnostics, visual-spatial tasks (crucial for surgeries), or verbal expression?"
  },
  {
    title: "2. Personality Profiling",
    desc: "Establishes psychological resilience, empathy levels, and stress tolerance. Healthcare environments demand high emotional stamina and stable crisis management."
  },
  {
    title: "3. Interest Mapping",
    desc: "Aligns your core academic and work interests (e.g. research vs. bedside patient interaction) to predict long-term satisfaction and prevent career burnout."
  }
];

const APTITUDE_PARAMETERS = [
  { name: "Analytical & Logical Reasoning", desc: "Essential for clinical diagnosis, identifying disease symptoms, and drafting drug regimens." },
  { name: "Verbal Ability & Presentation", desc: "Critical for clear communication with patients, active listening, and bedside empathy." },
  { name: "Spatial & Mechanical Reasoning", desc: "Vital for dentists, surgeons, and professionals operating high-tech diagnostic machinery (MRI/CT scans)." },
  { name: "Numerical Reasoning & Research", desc: "Required for compiling medical data, epidemiological research, and administering healthcare budgets." }
];

const DOCUMENTS_CHECKLIST = [
  { doc: "NEET UG Admit Card", detail: "Downloaded from the NTA portal; must have the same photograph attached." },
  { doc: "NEET UG Scorecard / Rank Letter", detail: "Specifying your All India Rank (AIR), category, and qualifying status." },
  { doc: "Class 10 & 12 Marksheets & Certificates", detail: "Proof of date of birth and physics, chemistry, biology marks eligibility." },
  { doc: "Category Certificate (SC/ST/OBC-NCL/EWS)", detail: "If applicable, issued by competent authorities in the official format." },
  { doc: "Domicile & Nationality Certificate", detail: "Required for state quota (85% seats) counseling rounds." },
  { doc: "Identity Proof (Aadhaar/PAN/Passport)", detail: "Used for verification at reporting centers." }
];

export function GeneralGuidanceContent() {
  const [openDoc, setOpenDoc] = useState<number | null>(null);

  return (
    <section className="py-16 bg-surface">
      <Container size="page" className="max-w-5xl space-y-16">

        {/* Scientific Career Decision Section */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-on-surface md:text-4xl tracking-tight">
              A Scientific Framework for Career Planning
            </h2>
            <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
              Choosing a career path in medicine should not follow simple guesswork or peer influence. Modern admissions counseling recommends a multi-step assessment model.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {ASSESSMENT_PILLARS.map((p, idx) => (
              <div key={idx} className={cn(guideCardClass, "space-y-3 bg-surface border-outline-variant/40")}>
                <h3 className="font-black text-sm text-primary">{p.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Aptitude Parameters Section */}
        <div className={cn(guideCardClass, "bg-linear-to-br from-surface-container-lowest via-surface-container-lowest to-primary/[0.02] border-outline-variant/40 md:p-10")}>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-black text-primary bg-primary/10 px-2.5 py-1 rounded-md uppercase tracking-wider font-semibold">Assessment Parameters</span>
              <h3 className="text-xl font-black text-on-surface">Core Aptitudes Verified for Healthcare Careers</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Before locking in a course or counseling preference, it is highly advisable to evaluate your strengths against the primary cognitive demands of medical professionals:
              </p>
            </div>
            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {APTITUDE_PARAMETERS.map((ap, idx) => (
                <div key={idx} className={cn(summaryHighlightCardClass, "border-outline-variant/40 bg-surface-container-lowest")}>
                  <h4 className="text-xs font-black text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-primary">psychology</span>
                    {ap.name}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed mt-1.5">{ap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Counselling Preparations & Documents */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl font-black text-on-surface">Preparing for MCC &amp; State Counselling</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Every year, thousands of qualified candidates lose out on their desired seats due to documentation errors or choice-filling mistakes. A systematic preparation ensures you optimize your NEET score.
            </p>

            <div className="space-y-4.5">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[14px] bg-primary text-on-primary font-bold text-xs">A</div>
                <div>
                  <h4 className="text-xs font-black text-on-surface">Understand Quota Splits</h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                    Familiarize yourself with the 15% All India Quota (AIQ) run by MCC, and the 85% Domicile State Quotas run by respective state DME/CET cells.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[14px] bg-primary text-on-primary font-bold text-xs">B</div>
                <div>
                  <h4 className="text-xs font-black text-on-surface">Analyze Seat Matrices Early</h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                    Verify government, private, and management seats across 550+ medical colleges to avoid locking in options out of your score ballpark.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h4 className="text-xs font-black text-on-surface uppercase tracking-wider">Verification Document Checklist</h4>
            <div className="space-y-2.5">
              {DOCUMENTS_CHECKLIST.map((d, idx) => (
                <div key={idx} className="border border-outline-variant/40 rounded-2xl bg-surface-container-lowest overflow-hidden">
                  <button
                    onClick={() => setOpenDoc(openDoc === idx ? null : idx)}
                    className="w-full text-left px-4.5 py-3.5 flex items-center justify-between text-xs font-bold text-on-surface hover:bg-surface-container-low cursor-pointer transition-colors"
                  >
                    <span>{d.doc}</span>
                    <span className="material-symbols-outlined transition-transform duration-200">
                      {openDoc === idx ? "expand_less" : "expand_more"}
                    </span>
                  </button>
                  {openDoc === idx && (
                    <div className="px-4.5 pb-3.5 pt-1 text-[11px] text-on-surface-variant leading-relaxed border-t border-outline-variant/40 bg-surface-container-low/20">
                      {d.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}

