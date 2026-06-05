"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { NeetTimeline } from "@/components/features/neet-ug/NeetTimeline";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";

export function NeetUg2026View() {
  const dates = [
    { event: "Official Notification & Registration", date: "Feb 9, 2026", status: "Completed", icon: "assignment" },
    { event: "Last Date to Apply", date: "Mar 16, 2026", status: "Completed", icon: "event_busy" },
    { event: "Admit Card Release Date", date: "Apr 28, 2026", status: "Completed", icon: "badge" },
    { event: "NEET UG 2026 Exam Date", date: "May 3, 2026", status: "Completed", icon: "draw" },
    { event: "Provisional Answer Key & OMR", date: "May 28, 2026", status: "Completed", icon: "flaky" },
    { event: "NEET UG 2026 Result Declaration", date: "Expected June 15, 2026", status: "Upcoming", icon: "campaign" },
  ];

  const eligibility = [
    { title: "Minimum Age Requirement", desc: "Must be at least 17 years old as of December 31, 2026. No upper age limit restriction per Supreme Court ruling." },
    { title: "Qualifying Examination", desc: "Must have passed Class 12 (10+2) or equivalent with Physics, Chemistry, Biology/Biotechnology, and English as core subjects." },
    { title: "Minimum Marks in 12th Board", desc: "General category requires minimum aggregate of 50% in Physics, Chemistry, and Biology. OBC/SC/ST requires 40%; PwBD requires 45%." },
    { title: "Nationality Eligibility", desc: "Indian Nationals, Non-Resident Indians (NRIs), Overseas Citizens of India (OCIs), Persons of Indian Origin (PIOs), and Foreign Nationals are eligible." },
  ];

  const examPattern = [
    { label: "Exam Mode", val: "Offline (Pen & Paper / OMR)", icon: "edit_note" },
    { label: "Duration", val: "3 Hours & 20 Minutes (200 mins)", icon: "hourglass_empty" },
    { label: "Total Questions", val: "200 Questions (Attempt any 180)", icon: "quiz" },
    { label: "Maximum Marks", val: "720 Marks", icon: "workspace_premium" },
    { label: "Subjects Covered", val: "Physics, Chemistry, Botany, Zoology", icon: "menu_book" },
    { label: "Marking Scheme", val: "+4 for Correct | -1 for Incorrect", icon: "rule" },
  ];

  const expectedCutoffs = [
    { category: "UR / EWS", percentile: "50th Percentile", score: "720 - 164", status: "High Competition" },
    { category: "OBC-NCL", percentile: "40th Percentile", score: "163 - 129", status: "Moderate" },
    { category: "SC", percentile: "40th Percentile", score: "163 - 129", status: "Moderate" },
    { category: "ST", percentile: "40th Percentile", score: "163 - 129", status: "Moderate" },
    { category: "UR / EWS - PwBD", percentile: "45th Percentile", score: "163 - 146", status: "Relaxed" },
    { category: "OBC / SC / ST - PwBD", percentile: "40th Percentile", score: "145 - 129", status: "Relaxed" },
  ];

  return (
    <>
      <Section tone="default" className="py-8 md:py-12 bg-gradient-to-b from-brand-50/50 to-background">
        <Container size="2xl" className="flex flex-col gap-8">
          <PageHeader
            eyebrow="NEET UG 2026 INFO HUB"
            title="NEET UG 2026 Complete Examination Guide"
            description="Access latest examination schedules, qualifying eligibility criteria, exam paper pattern, and category-wise expected cutoff guidelines in one place."
          />

          {/* Countdown / Status Banner */}
          <Card className="bg-gradient-to-r from-brand-700 to-primary text-text-on-brand shadow-lg p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <span className="text-brand-300 font-label-md text-xs uppercase tracking-wider block">NEET UG 2026 Result Countdown</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Results announcement expected shortly</h2>
              <p className="text-brand-100 text-sm md:text-base">Check updates, challenge provisional answer keys, and keep your documents ready.</p>
            </div>
            
            <div className="flex gap-4">
              <Button as="link" href="/neet-ug-2026/updates" variant="secondary" size="lg" leadingIcon={<MaterialSymbol name="notifications_active" />}>
                Live Updates Feed
              </Button>
            </div>
          </Card>

          {/* Key Dates Timeline & Lead Download Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-text flex items-center gap-2">
                <MaterialSymbol name="calendar_month" className="text-primary text-2xl" />
                NEET 2026 Official Timeline
              </h3>
              
              <NeetTimeline dates={dates} />
            </div>

            {/* Lead Download Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-surface-elevated border border-border rounded-2xl p-6 sticky top-24 shadow-level-1 hover:shadow-level-2">
                <div className="flex flex-col gap-4">
                  <div className="bg-brand-50 text-primary w-12 h-12 rounded-2xl flex items-center justify-center">
                    <MaterialSymbol name="download_for_offline" size="lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">NEET 2026 Counselling Guide</h3>
                    <p className="text-sm text-text-secondary mt-1">Get an expert-curated PDF guide covering seat matrices, state quotas, and choices strategy.</p>
                  </div>

                  <NeetLeadForm
                    type="email-guide"
                    ctaText="Download Free Guide"
                    successTitle="Guide Sent to Email!"
                    successDesc="Please check your inbox. We have sent the PDF download link to your address."
                  />
                  
                  <div className="border-t border-border mt-2 pt-4 text-center">
                    <span className="text-xs text-text-muted">Already have your score?</span>
                    <Button as="link" href="/rank-predictor" variant="ghost" className="mt-1 w-full text-xs" trailingIcon={<MaterialSymbol name="arrow_forward" size="sm" />}>
                      Go to Rank Predictor
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="flex flex-col gap-6 mt-4">
            <h3 className="text-2xl font-bold text-text flex items-center gap-2">
              <MaterialSymbol name="how_to_reg" className="text-primary text-2xl" />
              NEET UG 2026 Eligibility Criteria
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eligibility.map((el, index) => (
                <Card key={index} padded bordered className="bg-white/80 hover:bg-white hover:shadow-md transition-all flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-primary">
                      <MaterialSymbol name="verified" size="sm" />
                    </span>
                    <h4 className="font-bold text-text text-base">{el.title}</h4>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed pl-9">{el.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Exam Pattern Grid */}
          <div className="flex flex-col gap-6 mt-4">
            <h3 className="text-2xl font-bold text-text flex items-center gap-2">
              <MaterialSymbol name="assignment_turned_in" className="text-primary text-2xl" />
              Examination Pattern
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {examPattern.map((pat, index) => (
                <div key={index} className="bg-surface-elevated border border-border p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-brand-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <MaterialSymbol name={pat.icon} size="md" />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted font-medium block">{pat.label}</span>
                    <span className="text-sm md:text-base font-bold text-text mt-0.5 block">{pat.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cutoffs & Competition Table */}
          <div className="flex flex-col gap-6 mt-4">
            <div>
              <h3 className="text-2xl font-bold text-text flex items-center gap-2">
                <MaterialSymbol name="monitoring" className="text-primary text-2xl" />
                NEET 2026 Expected Cutoffs
              </h3>
              <p className="text-sm text-text-secondary mt-1">Qualifying percentile criteria and expected NEET score bands as per historical trends.</p>
            </div>
            
            <div className="ms-table-container shadow-sm border border-border rounded-2xl bg-white overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-border text-xs font-bold uppercase tracking-wider text-text-secondary">
                    <th className="p-4 pl-6">Category</th>
                    <th className="p-4">Required Percentile</th>
                    <th className="p-4">Expected Score Range</th>
                    <th className="p-4 pr-6 text-right">Competition Intensity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50 text-sm">
                  {expectedCutoffs.map((cut, index) => (
                    <tr key={index} className="hover:bg-brand-50/20 transition-colors">
                      <td className="p-4 pl-6 font-bold text-text">{cut.category}</td>
                      <td className="p-4 text-text-secondary">{cut.percentile}</td>
                      <td className="p-4"><span className="ms-cutoff-chip">{cut.score}</span></td>
                      <td className="p-4 pr-6 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          cut.status === "High Competition"
                            ? "bg-red-50 text-red-700 border border-red-100"
                            : cut.status === "Moderate"
                            ? "bg-amber-50 text-amber-700 border border-amber-100"
                            : "bg-green-50 text-green-700 border border-green-100"
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
          <div className="bg-gradient-to-r from-brand-700 via-primary to-brand-800 text-text-on-brand rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-6 mt-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-20 -mb-20 blur-3xl"></div>
            
            <span className="bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-300">
              Rank Predictor 2026
            </span>
            <div className="max-w-2xl flex flex-col gap-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Want to know where you stand?
              </h2>
              <p className="text-brand-100 text-sm md:text-base leading-relaxed">
                Estimate your NEET 2026 All India Rank instantly using our data-backed predictor model. Filter available colleges based on category, state, and seats.
              </p>
            </div>
            <Button as="link" href="/rank-predictor" variant="secondary" size="lg" className="px-8 mt-2" trailingIcon={<MaterialSymbol name="arrow_forward" />}>
              Predict Your Rank Now
            </Button>
          </div>

        </Container>
      </Section>
    </>
  );
}
