"use client";

import React from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";
import { SectionHeading } from "@/components/features/neet-ug/shared/SectionHeading";
import { StepCard } from "@/components/features/neet-ug/shared/StepCard";
import { CtaBanner } from "@/components/features/neet-ug/shared/CtaBanner";
import { DataTable } from "@/components/features/neet-ug/shared/DataTable";
import { QuickLinksCard } from "@/components/features/neet-ug/shared/QuickLinksCard";

export function NeetAnswerKeyView() {
  const omrSteps = [
    {
      step: 1,
      icon: "login",
      title: "Visit NTA NEET Portal",
      desc: "Go to neet.nta.nic.in and click on 'Answer Key & OMR Response Sheet' link under the Candidate Activity section.",
    },
    {
      step: 2,
      icon: "key",
      title: "Log In with Credentials",
      desc: "Enter your Application Number and Date of Birth (as registered) to access your personal OMR response sheet and answer key.",
    },
    {
      step: 3,
      icon: "compare",
      title: "Compare Your Responses",
      desc: "Your darkened OMR responses appear side-by-side with the provisional answer key. Verify each answer for all 200 questions.",
    },
    {
      step: 4,
      icon: "flag",
      title: "Challenge Incorrect Keys",
      desc: "If you believe an answer key is wrong, raise a formal challenge by paying ₹200 per question through the online portal within the window period.",
    },
  ];

  const cutoffTrendRows = [
    { year: "2019", general: "701–134", obc: "133–107", scSt: "133–107", pwd: "133–120" },
    { year: "2020", general: "720–147", obc: "146–113", scSt: "146–113", pwd: "146–129" },
    { year: "2021", general: "720–138", obc: "137–108", scSt: "137–108", pwd: "137–122" },
    { year: "2022", general: "715–117", obc: "116–93", scSt: "116–93", pwd: "116–105" },
    { year: "2023", general: "720–137", obc: "136–107", scSt: "136–107", pwd: "136–121" },
    { year: "2024", general: "720–164", obc: "163–129", scSt: "163–129", pwd: "163–146" },
    { year: "2025 (Expected)", general: "720–160", obc: "159–128", scSt: "159–128", pwd: "159–143" },
  ];

  const qualifyingCutoffRows = [
    { category: "UR / EWS (General)", percentile: "50th Percentile", score: "720–164", intensity: "High Competition", _color: "rose" },
    { category: "OBC-NCL", percentile: "40th Percentile", score: "163–129", intensity: "Moderate", _color: "amber" },
    { category: "SC", percentile: "40th Percentile", score: "163–129", intensity: "Moderate", _color: "amber" },
    { category: "ST", percentile: "40th Percentile", score: "163–129", intensity: "Moderate", _color: "amber" },
    { category: "UR / EWS – PwBD", percentile: "45th Percentile", score: "163–146", intensity: "Relaxed", _color: "emerald" },
    { category: "OBC / SC / ST – PwBD", percentile: "40th Percentile", score: "145–129", intensity: "Relaxed", _color: "emerald" },
  ];

  const scorecardFields = [
    { icon: "score", label: "Raw Score", desc: "Total marks earned. +4 per correct, −1 per wrong answer." },
    { icon: "percent", label: "Percentile Score", desc: "Percentage of candidates who scored equal to or below you." },
    { icon: "leaderboard", label: "All India Rank (AIR)", desc: "Overall rank across all NEET 2026 candidates in India." },
    { icon: "groups", label: "Category Rank", desc: "Rank within your reserved category (SC/ST/OBC/EWS/PwD)." },
    { icon: "menu_book", label: "Subject-wise Score", desc: "Individual marks in Physics, Chemistry, Botany, and Zoology." },
    { icon: "verified", label: "Qualifying Status", desc: "Whether you have crossed the minimum qualifying percentile." },
  ];

  const quickLinks = [
    { label: "Live Updates & NTA Alerts", href: "/neet-ug-2026/updates" },
    { label: "Counselling Guide", href: "/neet-ug-2026/counselling-guide" },
    { label: "NRI MBBS Admission Guide", href: "/neet-ug-2026/nri-guide" },
    { label: "Rank Predictor", href: "/rank-predictor" },
  ];

  return (
    <>
      <Section tone="default" className=" py-7 md:py-10">
        <Container size="2xl" className="flex flex-col gap-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "NEET UG 2026", href: "/neet-ug-2026" },
              { label: "Answer Key & Results" },
            ]}
          />

          {/* Header */}
          <header className="max-w-3xl text-left">
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-[-0.035em] text-clinical-navy md:text-[44px]">
              Answer Key, OMR Sheet
              <span className="block">Results & Cut-off Guide</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-clinical-muted md:text-[15px]">
              Official NTA answer key process, how to view your OMR response sheet, challenge answers, understand your scorecard, and interpret category-wise qualifying cut-offs.
            </p>
          </header>

          {/* Main two-column layout */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="flex flex-col gap-10">

              {/* ── OMR & Answer Key ───────────────────────────────────────── */}
              <section className="flex flex-col gap-8">
                <SectionHeading
                  variant="alt"
                  icon="fact_check"
                  eyebrow="Official Answer Key"
                  title="OMR Sheet & Official Answer Key"
                  description="NTA releases the provisional answer key 7–10 days after the exam. Candidates can view their scanned OMR responses and raise challenges within the window."
                />


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {omrSteps.map((s) => (
                    <StepCard key={s.step} {...s} variant="compact" />
                  ))}
                </div>

                <div className="rounded-2xl border border-amber-100 bg-amber-50/30 p-5 shadow-clinical-soft">
                  <div className="flex items-start gap-3">
                    <MaterialSymbol name="gavel" size="md" className="text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-extrabold text-amber-900">Challenging an Answer Key</h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        Pay <strong>₹200 per question</strong> challenged via online portal. If the challenge is accepted by the expert committee, the fee is refunded and the final key is updated accordingly. Challenges are non-refundable if rejected. The window is typically open for <strong>2–3 days</strong> after provisional key release.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Results Section ──────────────────────────────────────── */}
              <section className="flex flex-col gap-8">
                <SectionHeading
                  variant="alt"
                  icon="analytics"
                  eyebrow="Results"
                  title="NEET 2026 Result & Scorecard"
                  description="Results are expected to be declared in late July 2026 on the NTA portal. Here's what your scorecard will contain."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {scorecardFields.map((f, i) => (
                    <div key={i} className="flex flex-col gap-3 rounded-2xl border border-clinical-outline bg-clinical-surface p-5 shadow-clinical-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-clinical-blue/20 hover:shadow-clinical-hover">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-clinical-outline bg-clinical-surface-low text-clinical-blue">
                        <MaterialSymbol name={f.icon} size="md" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-clinical-navy">{f.label}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-clinical-muted">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* How to check results */}
                <div className="rounded-2xl border border-clinical-outline bg-clinical-surface p-6 shadow-clinical-soft">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-clinical-surface-low text-clinical-muted">
                      <MaterialSymbol name="how_to_reg" size="sm" />
                    </span>
                    <h3 className="text-sm font-extrabold text-clinical-navy">How to Check Your Result</h3>
                  </div>
                  <ol className="flex flex-col gap-2.5">
                    {[
                      "Visit neet.nta.nic.in and click 'NEET UG 2026 Result' link",
                      "Enter your Application Number and Date of Birth",
                      "Your scorecard will display on screen — save/print it",
                      "Download the scorecard PDF for counselling registration",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-clinical-muted">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clinical-blue text-[10px] font-extrabold text-white">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tie-breaking */}
                <div className="rounded-2xl border border-clinical-outline bg-clinical-surface p-6 shadow-clinical-soft">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                      <MaterialSymbol name="balance" size="sm" />
                    </span>
                    <h3 className="text-sm font-extrabold text-clinical-navy">Tie-Breaking Criteria</h3>
                  </div>
                  <p className="mb-3 text-xs leading-relaxed text-clinical-muted">
                    When two or more candidates score identical marks, NTA applies the following criteria in order of priority to determine rank:
                  </p>
                  <ol className="flex flex-col gap-2">
                    {[
                      "Higher marks in Biology (Botany + Zoology combined)",
                      "Higher marks in Chemistry",
                      "Higher ratio of correct to incorrect answers (across all subjects)",
                      "Higher marks in Physics",
                      "Older candidate (higher age) gets a better rank",
                    ].map((rule, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-clinical-muted">
                        <span className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-extrabold text-[10px] shrink-0 mt-0.5 border border-indigo-100">
                          {i + 1}
                        </span>
                        {rule}
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              {/* ── Cut-off & Qualification ──────────────────────────────── */}
              <section className="flex flex-col gap-8">
                <SectionHeading
                  variant="alt"
                  icon="trending_up"
                  eyebrow="Cut-off & Qualification"
                  title="Qualifying Cut-off 2026 — By Category"
                  description="The minimum qualifying percentile as per NTA regulations. Candidates below these thresholds are ineligible for counselling."
                />

                {/* Qualifying cut-off table */}
                <DataTable
                  columns={[
                    { key: "category", label: "Category" },
                    { key: "percentile", label: "Required Percentile" },
                    { key: "score", label: "Expected Score Range", badge: true, badgeVariant: "blue" },
                    { key: "intensity", label: "Competition", align: "right", badge: true, badgeColorKey: "_color" },
                  ]}
                  rows={qualifyingCutoffRows}
                />

                {/* Year-wise cut-off trend */}
                <div className="flex flex-col gap-3 mt-2">
                  <h3 className="flex items-center gap-2.5 text-base font-extrabold text-clinical-navy">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-clinical-surface text-clinical-muted ring-1 ring-clinical-outline">
                      <MaterialSymbol name="history" size="sm" />
                    </span>
                    Year-wise Qualifying Score Trend (2019–2025)
                  </h3>
                  <p className="pl-9 text-xs leading-relaxed text-clinical-muted">Score range (highest – qualifying threshold) for each category across years.</p>
                </div>

                <DataTable
                  columns={[
                    { key: "year", label: "Year" },
                    { key: "general", label: "General (UR/EWS)" },
                    { key: "obc", label: "OBC-NCL" },
                    { key: "scSt", label: "SC / ST" },
                    { key: "pwd", label: "PwBD (UR)" },
                  ]}
                  rows={cutoffTrendRows}
                  highlightLastRow
                  scrollable
                  footnote="* 2025 and 2026 values are estimates based on historical trends and NTA official qualifying percentile thresholds. Actual cut-offs may vary."
                />

                {/* CTA */}
                <CtaBanner
                  eyebrow="Rank Predictor 2026"
                  title="Know your rank from your score"
                  description="Instantly estimate your All India Rank and filter available MBBS colleges by category, state, and seats."
                  ctaText="Predict Your Rank Now"
                  ctaHref="/rank-predictor"
                />
              </section>

            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
              <Card
                padded={false}
                className="rounded-2xl border border-clinical-outline bg-clinical-surface p-6 shadow-clinical-soft"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-clinical-green ring-8 ring-emerald-50/50">
                    <MaterialSymbol name="download" size="lg" />
                  </div>
                  <div>
                    <h2 className="text-[17px] font-extrabold tracking-[-0.01em] text-clinical-navy">
                      Download Answer Key PDF
                    </h2>
                    <p className="mt-2 text-xs leading-5 text-clinical-muted">
                      Get official NTA answer keys and OMR guidelines delivered directly to your WhatsApp.
                    </p>
                  </div>
                  <NeetLeadForm
                    type="phone-whatsapp"
                    ctaText="Get PDF on WhatsApp"
                    successTitle="PDF Code Request Sent!"
                    successDesc="Check your mobile. We are triggering the download link via WhatsApp/SMS."
                  />
                </div>
              </Card>

              <div className="overflow-hidden rounded-2xl bg-[#131b2e] text-white shadow-clinical-panel">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-5">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-300 text-[20px]">psychology</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-blue-200">Expert Guidance</span>
                  </div>
                  <h3 className="text-[17px] font-extrabold leading-tight tracking-[-0.01em]">
                    Need Expert Help?
                  </h3>
                  <p className="mt-1 text-[11px] leading-5 text-blue-100/80">
                    Connect with our medical counsellors to plan your career path based on your rank.
                  </p>
                </div>

                {/* Form */}
                <div className="space-y-3 p-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Priyesh Patel"
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/35 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-blue-200">WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-white/35 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <Button
                    as="link"
                    href="/contact"
                    variant="ghost"
                    size="sm"
                    className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg bg-white py-2.5 text-[12px] font-extrabold text-blue-900 shadow-lg shadow-blue-900/40 transition-all hover:bg-blue-50 active:scale-95"
                    trailingIcon={<MaterialSymbol name="verified" size="sm" />}
                  >
                    Book Session
                  </Button>
                </div>

                {/* WhatsApp row */}
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500">
                      <span className="material-symbols-outlined text-[14px] text-white">chat</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase leading-none text-green-400">WhatsApp Help</p>
                      <p className="mt-0.5 text-[11px] font-medium leading-tight text-white">Enquire via WhatsApp</p>
                    </div>
                  </div>
                </div>
              </div>

              <QuickLinksCard title="Related Pages" links={quickLinks} />
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
