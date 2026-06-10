"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { NeetTimeline } from "@/components/features/neet-ug/NeetTimeline";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";
import { neetUg2026Data } from "@/lib/data/neet-ug-2026";
import { AdvisoryAlertCard } from "@/components/features/neet-ug/shared/AdvisoryAlertCard";
import { HighYieldChaptersWidget } from "@/components/features/neet-ug/shared/HighYieldChaptersWidget";

export function NeetUg2026View() {
  const { syllabus, expectedCutoffs } = neetUg2026Data;

  const dates = [
    { event: "Official Notification & Registration", date: "Feb 9, 2026", status: "Completed", icon: "assignment", description: "NTA Portal Opens for online registrations" },
    { event: "Last Date to Apply", date: "Mar 16, 2026", status: "Completed", icon: "event_busy", description: "Application window closes for fee submissions" },
    { event: "Admit Card Release Date", date: "Apr 28, 2026", status: "Completed", icon: "badge", description: "Download revised hall tickets from NTA site" },
    { event: "NEET UG 2026 Original Exam (Cancelled)", date: "May 3, 2026", status: "Completed", icon: "event_busy", description: "Original exam date cancelled by official order" },
    { event: "NTA ReNEET Exam Date (Rescheduled)", date: "June 21, 2026", status: "Upcoming", icon: "draw", description: "New exam date announced by NTA" },
    { event: "NEET UG 2026 Expected Results", date: "Expected July 2026", status: "Upcoming", icon: "campaign", description: "Results compilation and rank listings" },
  ];

  const eligibility = [
    { title: "Minimum Age Requirement", desc: "Must be at least 17 years old as of December 31, 2026. No upper age limit restriction per Supreme Court ruling.", icon: "calendar_month" },
    { title: "Qualifying Examination", desc: "Must have passed Class 12 (10+2) or equivalent with Physics, Chemistry, Biology/Biotechnology, and English as core subjects.", icon: "school" },
    { title: "Minimum Marks in 12th Board", desc: "General category requires minimum aggregate of 50% in Physics, Chemistry, and Biology. OBC/SC/ST requires 40%; PwBD requires 45%.", icon: "workspace_premium" },
    { title: "Nationality Eligibility", desc: "Indian Nationals, Non-Resident Indians (NRIs), Overseas Citizens of India (OCIs), Persons of Indian Origin (PIOs), and Foreign Nationals are eligible.", icon: "public" },
  ];

  const examPattern = [
    { label: "Exam Mode", val: "Offline (Pen & Paper / OMR)", icon: "edit_note" },
    { label: "Duration", val: "3 Hours & 20 Minutes (200 mins)", icon: "hourglass_empty" },
    { label: "Total Questions", val: "200 Questions (Attempt any 180)", icon: "quiz" },
    { label: "Maximum Marks", val: "720 Marks", icon: "workspace_premium" },
    { label: "Subjects Covered", val: "Physics, Chemistry, Botany, Zoology", icon: "menu_book" },
    { label: "Marking Scheme", val: "+4 for Correct | -1 for Incorrect", icon: "rule" },
  ];

  return (
    <>
      <Section tone="default" className="py-12 md:py-16">
        <Container size="2xl" className="flex flex-col gap-12 md:gap-16">
          
          {/* Custom Premium Header */}
          <header className="flex flex-col gap-3 items-start text-left max-w-4xl">
            <span className="inline-flex items-center rounded-full bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 border border-blue-100/50 shadow-sm">
              NEET UG 2026 INFO HUB
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl leading-tight">
              NEET UG 2026 Complete Examination Guide
            </h1>
            <p className="text-base leading-relaxed text-slate-500 font-normal md:text-lg max-w-3xl mt-1">
              Access latest examination schedules, qualifying eligibility criteria, exam paper pattern, and category-wise expected cutoff guidelines in one place.
            </p>
          </header>

          {/* Official Advisory Banner */}
          <AdvisoryAlertCard showFeedLink={true} />
 
          {/* Key Dates Timeline & Lead Download Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                  <MaterialSymbol name="calendar_month" size="md" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-none m-0">
                  NEET 2026 Official Timeline
                </h3>
              </div>
              
              <NeetTimeline dates={dates} />
            </div>
 
            {/* Lead Download Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 border border-slate-100 shadow-md shadow-slate-100/35 rounded-3xl p-8 sticky top-24 hover:shadow-lg transition-all duration-300 backdrop-blur-md">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/40 flex items-center justify-center shrink-0">
                    <MaterialSymbol name="download" size="md" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">NEET 2026 Counselling Guide</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">Get an expert-curated PDF guide covering seat matrices, state quotas, and choices strategy.</p>
                  </div>
 
                  <NeetLeadForm
                    type="email-guide"
                    ctaText="Download Free Guide"
                    successTitle="Guide Sent to Email!"
                    successDesc="Please check your inbox. We have sent the PDF download link to your address."
                  />
                  
                  <div className="border-t border-slate-100 mt-4 pt-5 text-center">
                    <span className="text-[10px] text-slate-400 tracking-widest font-extrabold uppercase block mb-1.5">Already have your score?</span>
                    <Link href="/rank-predictor" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-700 transition-colors group no-underline cursor-pointer">
                      Go to Rank Predictor
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                <MaterialSymbol name="shield" size="md" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-none m-0">
                NEET UG 2026 Eligibility Criteria
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eligibility.map((el, index) => (
                <div key={index} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-blue-100/60 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100/50 flex items-center justify-center shrink-0">
                    <MaterialSymbol name={el.icon} size="md" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="font-extrabold text-slate-900 text-base leading-snug">{el.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{el.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Pattern Grid */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                <MaterialSymbol name="assignment" size="md" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-none m-0">
                Examination Pattern
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {examPattern.map((pat, index) => (
                <div key={index} className="bg-white border border-slate-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md hover:border-blue-100/50 transition-all duration-200">
                  <div className="w-11 h-11 rounded-xl bg-blue-50/50 text-blue-600 border border-blue-100/30 flex items-center justify-center shrink-0">
                    <MaterialSymbol name={pat.icon} size="md" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                      {pat.label}
                    </span>
                    <span className="text-slate-900 font-extrabold text-sm md:text-base mt-0.5 block">
                      {pat.val}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High-Yield Chapters & Smart PCB Study Plan */}
          <HighYieldChaptersWidget showExplanatoryText={true} />

          {/* Expected Cutoffs & Competition Table */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                <MaterialSymbol name="trending_up" size="md" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-none m-0">
                NEET 2026 Expected Cutoffs
              </h3>
            </div>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">Qualifying percentile criteria and expected NEET score bands as per historical trends.</p>
            
            <div className="border border-slate-100 rounded-3xl bg-white overflow-hidden shadow-sm shadow-slate-100/30">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    <th className="py-4.5 px-6 font-extrabold">Category</th>
                    <th className="py-4.5 px-6 font-extrabold">Required Percentile</th>
                    <th className="py-4.5 px-6 font-extrabold">Expected Score Range</th>
                    <th className="py-4.5 px-6 text-right font-extrabold">Competition Intensity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {expectedCutoffs.map((cut, index) => (
                    <tr key={index} className="hover:bg-slate-50/30 transition-colors">
                      <td className="py-4.5 px-6 font-extrabold text-slate-900">{cut.category}</td>
                      <td className="py-4.5 px-6 text-slate-500 font-medium">{cut.percentile}</td>
                      <td className="py-4.5 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100/60">
                          {cut.score}
                        </span>
                      </td>
                      <td className="py-4.5 px-6 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          cut.status === "High Competition"
                            ? "bg-rose-50 text-rose-600 border-rose-100/50"
                            : cut.status === "Moderate"
                            ? "bg-amber-50 text-amber-700 border-amber-100/50"
                            : "bg-emerald-50 text-emerald-700 border-emerald-100/50"
                        }`}>
                          {cut.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Predict Call to Action */}
          <div className="bg-gradient-to-br from-[#0c4baf] via-[#003d9b] to-[#00687b] text-white rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-6 mt-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full -ml-24 -mb-24 blur-3xl pointer-events-none"></div>
            
            <span className="bg-white/10 border border-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-blue-100">
              Rank Predictor 2026
            </span>
            <div className="max-w-2xl flex flex-col gap-3 z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Want to know where you stand?
              </h2>
              <p className="text-blue-100/90 text-sm md:text-base leading-relaxed">
                Estimate your NEET 2026 All India Rank instantly using our data-backed predictor model. Filter available colleges based on category, state, and seats.
              </p>
            </div>
            
            <Link
              href="/rank-predictor"
              className="z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-bold tracking-wide transition-all h-12 px-8 text-base bg-white hover:bg-slate-50 text-[#003d9b] active:scale-[0.98] shadow-lg mt-2 cursor-pointer no-underline"
            >
              <span>Predict Your Rank Now</span>
              <MaterialSymbol name="arrow_forward" size="md" />
            </Link>
          </div>

        </Container>
      </Section>
    </>
  );
}
