"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { NeetUg2026Shell } from "@/components/features/neet-ug/NeetUg2026Parts";
import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";
import { ScoreGuidance } from "./ScoreGuidance";
import { PredictorLeadSection } from "./PredictorLeadSection";
import { CareerExplorer } from "./CareerExplorer";
import { CareerCategories } from "./CareerCategories";
import { CareerRoadmaps } from "./CareerRoadmaps";
import { CareerComparisonTable } from "./CareerComparisonTable";
import { EmergingHealthcare } from "./EmergingHealthcare";
import { GeneralGuidanceContent } from "./GeneralGuidanceContent";
import { CareerFaqs } from "./CareerFaqs";

export function CareerGuidanceView() {
  return (
    <NeetUg2026Shell>
      {/* Premium Hero Section */}
      <section className="rp-hero rp-bleed">
        <div className="rp-hero-inner">
          <div className="rp-hero-grid">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-fixed px-3 py-1 text-primary">
                <span className="material-symbols-outlined text-sm">school</span>
                <span className="font-label-md text-label-sm uppercase tracking-wider font-semibold">NEET UG Career Hub</span>
              </div>

              <h1 className="rp-hero-title">
                Career Guidance <em>After NEET UG</em>
              </h1>

              <p className="rp-hero-lede">
                Explore MBBS, BDS, AYUSH, Nursing, Allied Health Sciences, Veterinary Sciences, Research, Public Health, and Emerging Healthcare Careers.
              </p>

              <p className="mb-10 max-w-2xl text-sm leading-relaxed text-on-surface-variant/85">
                Your NEET score is not the end of the journey. Discover career opportunities, understand future prospects, compare courses, and find the path that aligns with your interests and goals.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#score-guidance"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-on-primary shadow-sm transition-all hover:bg-primary-hover active:scale-[0.98]"
                >
                  Explore Career Paths
                  <span className="material-symbols-outlined text-base">arrow_downward</span>
                </a>
                <a
                  href="#counselling-form"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-8 py-4 text-base font-bold text-on-surface transition-all hover:border-primary hover:text-primary active:scale-[0.98]"
                >
                  Talk To A Counsellor
                  <span className="material-symbols-outlined text-base">support_agent</span>
                </a>
              </div>
            </div>

            <div className="rounded-4xl bg-linear-to-br from-primary/70 via-primary-fixed to-surface-container-low p-[1px] shadow-[0_24px_70px_-32px_color-mix(in_srgb,var(--color-primary)_60%,transparent)]">
              <div className="rounded-[calc(2rem-1px)] bg-surface-container-lowest p-5">
                <div className="rounded-3xl bg-linear-to-br from-primary-fixed via-surface-container-lowest to-surface-container-low p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
                        Career path map
                      </p>
                      <h2 className="mt-2 text-xl font-black tracking-tight text-on-surface">
                        Explore healthcare paths by interest and score
                      </h2>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-on-primary">
                      <span className="material-symbols-outlined text-[28px]">route</span>
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {["MBBS", "BDS", "AYUSH", "Nursing", "Allied Health", "Veterinary"].map((path) => (
                      <span key={path} className="rounded-2xl bg-surface-container-lowest/85 px-4 py-3 text-sm font-black text-on-surface shadow-sm">
                        {path}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl bg-primary px-4 py-4 text-on-primary">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-on-primary/70">
                      Compare courses
                    </p>
                    <p className="mt-1 text-sm font-bold leading-relaxed">
                      Discover career opportunities, understand future prospects, compare courses, and find the path that aligns with your interests and goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEET Score Based Guidance */}
      <ScoreGuidance />

      {/* College & Rank Predictor Lead Matcher */}
      <PredictorLeadSection />

      {/* Career Explorer */}
      <CareerExplorer />

      {/* Healthcare Career Categories */}
      <CareerCategories />

      {/* Progression Roadmaps */}
      <CareerRoadmaps />

      {/* Interactive Career Comparison */}
      <CareerComparisonTable />

      {/* Emerging Healthcare Frontiers */}
      <EmergingHealthcare />

      {/* General Scientific Career Content & Checklists */}
      <GeneralGuidanceContent />

      {/* Frequently Asked Questions */}
      <CareerFaqs />

      {/* Final CTA Section */}
      <section id="counselling-form" className="py-16 bg-surface border-t border-outline-variant/40">
        <Container size="page">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-linear-to-br from-primary via-primary to-primary/95 p-6 shadow-clinical-soft md:p-10 text-on-primary ring-1 ring-on-primary/15">
            {/* Subtle Glows */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.06] blur-2xl" aria-hidden />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/[0.04] blur-2xl" aria-hidden />

            <div className="grid gap-10 lg:grid-cols-12 lg:items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white border border-white/20">
                  <span className="material-symbols-outlined text-[12px] font-black">support_agent</span>
                  Personalised Counselling
                </div>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                  Still Confused About Your <span className="text-blue-200">Career Path?</span>
                </h2>
                <p className="text-sm leading-relaxed text-blue-100/90">
                  Get personalized guidance based on your NEET score, interests, budget, preferred state, and long-term career goals. Our experts will map out the best alternative options.
                </p>
                <div className="space-y-3 text-xs font-semibold text-white/95">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white text-base">check_circle</span>
                    Book Free Career Guidance Session
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white text-base">check_circle</span>
                    Talk To A Certified Counsellor
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white text-base">check_circle</span>
                    Explore Budget &amp; College Seat Options
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-clinical-soft overflow-hidden">
                  {/* Header Part */}
                  <div className="bg-surface-container-low/40 px-5 py-4 border-b border-outline-variant/40 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">support_agent</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-on-surface leading-none mb-1">Request guidance</h3>
                      <p className="text-[11px] text-on-surface-variant">Fill details and a career expert will call you back.</p>
                    </div>
                  </div>
                  {/* Form Part */}
                  <div className="p-5">
                    <FreeCounsellingLeadForm
                      pageLabel="NEET UG Career Guidance Page"
                      submitLabel="Book call →"
                      fields="name-phone-only"
                      variant="embedded"
                      className="border-none p-0 shadow-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </NeetUg2026Shell>
  );
}
