"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import Link from "next/link";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { NeetTimeline } from "@/components/features/neet-ug/NeetTimeline";
import { neetUg2026Data } from "@/lib/data/neet-ug-2026";
import { AdvisoryAlertCard } from "@/components/features/neet-ug/shared/AdvisoryAlertCard";
import { HighYieldChaptersWidget } from "@/components/features/neet-ug/shared/HighYieldChaptersWidget";
import { SectionHeading } from "@/components/features/neet-ug/shared/SectionHeading";
import { SidebarLeadCard } from "@/components/features/neet-ug/shared/SidebarLeadCard";
import { DataTable } from "@/components/features/neet-ug/shared/DataTable";

const TIMELINE_DATES = [
  { event: "Official Notification & Registration", date: "Feb 9, 2026", status: "Completed", description: "NTA Portal Opens for online registrations" },
  { event: "Last Date to Apply", date: "Mar 16, 2026", status: "Completed", description: "Application window closes for fee submissions" },
  { event: "Admit Card Release Date", date: "Apr 28, 2026", status: "Completed", description: "Download revised hall tickets from NTA site" },
  { event: "NEET UG 2026 Original Exam (Cancelled)", date: "May 3, 2026", status: "Completed", description: "Original exam date cancelled by official order" },
  { event: "NTA ReNEET Exam Date (Rescheduled)", date: "June 21, 2026", status: "Upcoming", description: "New exam date announced by NTA" },
  { event: "NEET UG 2026 Expected Results", date: "Expected July 2026", status: "Upcoming", description: "Results compilation and rank listings" },
];

const ELIGIBILITY = [
  { title: "Minimum Age Requirement", desc: "Must be at least 17 years old as of December 31, 2026. No upper age limit restriction per Supreme Court ruling." },
  { title: "Qualifying Examination", desc: "Must have passed Class 12 (10+2) or equivalent with Physics, Chemistry, Biology/Biotechnology, and English as core subjects." },
  { title: "Minimum Marks in 12th Board", desc: "General category requires minimum aggregate of 50% in Physics, Chemistry, and Biology. OBC/SC/ST requires 40%; PwBD requires 45%." },
  { title: "Nationality Eligibility", desc: "Indian Nationals, Non-Resident Indians (NRIs), Overseas Citizens of India (OCIs), Persons of Indian Origin (PIOs), and Foreign Nationals are eligible." },
];

const EXAM_PATTERN = [
  { label: "Exam Mode", val: "Offline (Pen & Paper / OMR)" },
  { label: "Duration", val: "3 Hours & 20 Minutes (200 mins)" },
  { label: "Total Questions", val: "200 Questions (Attempt any 180)" },
  { label: "Maximum Marks", val: "720 Marks" },
  { label: "Subjects Covered", val: "Physics, Chemistry, Botany, Zoology" },
  { label: "Marking Scheme", val: "+4 for Correct | -1 for Incorrect" },
];

export function NeetUg2026View() {
  const { expectedCutoffs } = neetUg2026Data;

  const tableRows = expectedCutoffs.map((cut) => {
    let badgeColor = "blue";
    if (cut.status === "High Competition") {
      badgeColor = "rose";
    } else if (cut.status === "Moderate") {
      badgeColor = "amber";
    } else if (cut.status === "Low" || cut.status === "Low Competition" || cut.status === "Normal") {
      badgeColor = "emerald";
    }
    return {
      ...cut,
      statusColor: badgeColor,
    };
  });

  const tableColumns = [
    { key: "category", label: "Category" },
    { key: "percentile", label: "Required Percentile" },
    { key: "score", label: "Expected Score Range", badge: true, badgeVariant: "blue" as const },
    { key: "status", label: "Competition Intensity", align: "right" as const, badge: true, badgeColorKey: "statusColor" },
  ];

  return (
    <>
      <Section tone="default" className="py-12 md:py-16">
        <Container size="page" className="flex flex-col gap-12 md:gap-16">
          
          {/* Custom Premium Header */}
          <header className="flex flex-col gap-3 items-start text-left max-w-4xl">
            <span className="inline-flex items-center rounded-full bg-clinical-surface-low px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-clinical-blue border border-clinical-blue/20 shadow-sm">
              NEET UG 2026 INFO HUB
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-clinical-navy md:text-4xl lg:text-5xl leading-tight">
              NEET UG 2026 Complete Examination Guide
            </h1>
            <p className="text-base leading-relaxed text-clinical-muted font-normal md:text-lg max-w-3xl mt-1">
              Access latest examination schedules, qualifying eligibility criteria, exam paper pattern, and category-wise expected cutoff guidelines in one place.
            </p>
          </header>

          {/* Official Advisory Banner */}
          <AdvisoryAlertCard showFeedLink={true} />
 
          {/* Key Dates Timeline & Lead Download Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <SectionHeading variant="alt" title="NEET 2026 Official Timeline" />
              <NeetTimeline dates={TIMELINE_DATES} />
            </div>
 
            {/* Lead Download Sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              <SidebarLeadCard
                theme="light"
                title="NEET 2026 Counselling Guide"
                description="Get an expert-curated PDF guide covering seat matrices, state quotas, and choices strategy."
                formType="email-guide"
                ctaText="Download Free Guide"
                successTitle="Guide Sent to Email!"
                successDesc="Please check your inbox. We have sent the PDF download link to your address."
              />
              <div className="relative overflow-hidden rounded-lg border border-clinical-outline bg-gradient-to-br from-clinical-navy to-clinical-blue p-5 shadow-clinical-soft hover:shadow-clinical-hover transition-all duration-300">
                <div className="flex flex-col gap-5 items-center text-center">
                  <span className="text-[9px] font-bold tracking-[0.08em] text-clinical-blue uppercase px-2 py-0.5 bg-clinical-surface-low border border-clinical-blue/20 rounded-full">
                    Rank Predictor
                  </span>
                  <p className="text-md text-clinical-surface font-extrabold leading-tight">
                    Already have your NEET score?
                  </p>
                  <Link 
                    href="/rank-predictor" 
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-clinical-surface/20 hover:bg-clinical-blue-bright text-white text-xs font-bold py-2 px-4 transition-all duration-200 no-underline shadow-sm active:scale-[0.98] cursor-pointer"
                  >
                    <span>Go to Predictor</span>
                    <MaterialSymbol name="arrow_forward" size="sm" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="flex flex-col gap-6">
            <SectionHeading variant="alt" title="NEET UG 2026 Eligibility Criteria" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ELIGIBILITY.map((el, index) => (
                <div key={index} className="bg-white border border-clinical-outline rounded-3xl p-6 md:p-8 shadow-clinical-soft hover:shadow-clinical-hover hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-5">
                  <div className="text-2xl font-extrabold text-clinical-blue select-none tracking-tight shrink-0 mt-0.5 font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="font-extrabold text-clinical-navy text-base leading-snug">{el.title}</h4>
                    <p className="text-clinical-muted text-sm leading-relaxed">{el.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Pattern Grid */}
          <div className="flex flex-col gap-6">
            <SectionHeading variant="alt" title="Examination Pattern" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {EXAM_PATTERN.map((pat, index) => (
                <div key={index} className="bg-clinical-surface-low/50 border border-clinical-outline p-6 rounded-2xl flex flex-col gap-2 transition-all duration-200 hover:border-clinical-blue/20 hover:bg-white hover:shadow-clinical-soft">
                  <span className="text-[10px] font-bold text-clinical-muted tracking-wider uppercase">
                    {pat.label}
                  </span>
                  <span className="text-clinical-navy font-extrabold text-base md:text-lg tracking-tight">
                    {pat.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* High-Yield Chapters & Smart PCB Study Plan */}
          <HighYieldChaptersWidget showExplanatoryText={true} />

          {/* Expected Cutoffs & Competition Table */}
          <div className="flex flex-col gap-6">
            <SectionHeading 
              variant="alt"
              title="NEET 2026 Expected Cutoffs" 
              description="Qualifying percentile criteria and expected NEET score bands as per historical trends." 
            />
            
            <DataTable columns={tableColumns} rows={tableRows} />
          </div>

          {/* Quick Predict Call to Action */}
          <div className="bg-gradient-to-br from-clinical-dark via-[#003d9b] to-[#00687b] text-white rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-6 mt-6 shadow-xl relative overflow-hidden">
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
