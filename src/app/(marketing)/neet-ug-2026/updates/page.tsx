"use client";

import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";
import { AdvisoryAlertCard } from "@/components/features/neet-ug/shared/AdvisoryAlertCard";
import { HighYieldChaptersWidget } from "@/components/features/neet-ug/shared/HighYieldChaptersWidget";
import { NtaHelpdeskCard } from "@/components/features/neet-ug/shared/NtaHelpdeskCard";
import { WhatsAppCommunityCard } from "@/components/features/neet-ug/shared/WhatsAppCommunityCard";
import { SectionHeading } from "@/components/features/neet-ug/shared/SectionHeading";

// ── Verified data sourced from v4edusolution.com/neet-ug-updates ──
const importantDates = [
  { event: "Official Notification & Info Bulletin Released", date: "8 February 2026", status: "Done" },
  { event: "Application Form Window Opens", date: "8 February 2026", status: "Done" },
  { event: "Last Date to Apply", date: "12 March 2026", status: "Done" },
  { event: "Application Correction Window", date: "12–14 March 2026", status: "Done" },
  { event: "Admit Card Released", date: "26 April 2026", status: "Done" },
  { event: "NEET UG 2026 Exam Day", date: "03 May 2026 (Sunday) · 2:00 PM – 5:00 PM", status: "Done" },
  { event: "ReNEET UG 2026 Exam Day", date: "21 June 2026 (Sunday) · 2:00 PM – 5:00 PM", status: "Upcoming" },
  { event: "Answer Key Release", date: "First Week of July 2026 (Tentative)", status: "Tentative" },
  { event: "Result Declaration", date: "By 15 July 2026 (Tentative)", status: "Tentative" },
  { event: "All India Quota (MCC) Counselling", date: "By 25 July 2026 (Tentative)", status: "Tentative" },
  { event: "State Quota Counselling Starts", date: "By 10 August 2026 (Tentative)", status: "Tentative" },
];

const statusStyle: Record<string, { badge: string; icon: string }> = {
  Done: { badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100", icon: "check_circle" },
  Upcoming: { badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-100", icon: "pending" },
  Tentative: { badge: "bg-slate-100 text-slate-600 ring-1 ring-slate-200", icon: "schedule" },
};

const keyStats = [
  { value: "21 June", label: "ReNEET 2026\nExam Date (Sun)" },
  { value: "720", label: "Total Marks\n180 Questions" },
  { value: "22.76L", label: "Registered\nCandidates 2026" },
  { value: "552", label: "Exam Cities\nIndia + Abroad" },
  { value: "1.29L+", label: "MBBS Seats\n822 Colleges" },
  { value: "13", label: "Question Paper\nLanguages" },
];

export default function NeetUgUpdatesPage() {
  return (
    <>
      <Section tone="default" className="py-7 md:py-9">
        <Container size="2xl" className="flex flex-col gap-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "NEET UG 2026", href: "/neet-ug-2026" },
              { label: "Live Updates" },
            ]}
          />


          <header className="max-w-3xl text-left">
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-clinical-navy md:text-4xl lg:text-5xl">
              NEET UG 2026 Live Updates & Alert Portal
            </h1>
            <p className="mt-3 max-w-2xl text-base font-normal leading-relaxed text-clinical-muted">
              All official announcements from NTA — exam date, application form, admit card, result and counselling schedule. Verified data last updated: <strong>May 2026</strong>.
            </p>
          </header>

          <AdvisoryAlertCard />

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* Left Column */}
            <div className="flex flex-col gap-8">

              {/* Key Stats Strip */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {keyStats.map((s) => (
                  <div key={s.value} className="flex flex-col items-center justify-center rounded-md border border-clinical-outline bg-clinical-surface p-3 text-center shadow-clinical-soft">
                    <span className="text-xl font-extrabold leading-tight text-clinical-navy">{s.value}</span>
                    <span className="mt-1 whitespace-pre-line text-[10px] leading-[1.4] text-clinical-muted">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Quick Summary Banner */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined mt-0.5 shrink-0 text-clinical-blue">info</span>
                  <div>
                    <h2 className="text-sm font-extrabold text-clinical-navy">Quick Summary</h2>
                    <p className="mt-1 text-[13px] leading-relaxed text-clinical-muted">
                      NEET UG 2026 was originally held on <strong className="text-clinical-navy">03 May 2026</strong>. A re-examination (ReNEET) has been scheduled for{" "}
                      <strong className="text-clinical-navy">21 June 2026</strong> (2:00 PM - 5:00 PM). Results are expected by{" "}
                      <strong className="text-clinical-navy">mid-July 2026</strong>, followed by MCC AIQ counselling from{" "}
                      <strong className="text-clinical-navy">end-July 2026</strong> and state counselling from{" "}
                      <strong className="text-clinical-navy">mid-August 2026</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Dates Table */}
              <div className="flex flex-col gap-5">
                <SectionHeading
                  icon="calendar_month"
                  title="NEET UG 2026 Important Dates & Status"
                />
                <div className="overflow-hidden rounded-2xl border border-clinical-outline bg-clinical-surface shadow-clinical-soft">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-clinical-outline bg-clinical-surface-low text-[11px] font-extrabold uppercase tracking-widest text-clinical-muted">
                          <th className="px-5 py-4">Event / Activity</th>
                          <th className="px-5 py-4">Date</th>
                          <th className="px-5 py-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-clinical-outline">
                        {importantDates.map((row, i) => {
                          const s = statusStyle[row.status];
                          return (
                            <tr key={i} className="transition-colors hover:bg-clinical-surface-low/40">
                              <td className="px-5 py-3.5 font-semibold text-clinical-navy">{row.event}</td>
                              <td className="px-5 py-3.5 text-clinical-muted">{row.date}</td>
                              <td className="px-5 py-3.5 text-right">
                                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${s.badge}`}>
                                  <span className="material-symbols-outlined text-[12px]">{s.icon}</span>
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="pl-1 text-[11px] text-clinical-muted/70">
                  Source: NTA official website & v4edusolution.com · Last verified May 2026
                </p>
              </div>

              {/* What to do after result */}
              <div className="rounded-lg border-l-4 border-l-clinical-blue bg-blue-50/50 p-5">
                <h3 className="flex items-center gap-2 text-sm font-extrabold text-clinical-navy">
                  <span className="material-symbols-outlined text-clinical-blue text-[18px]">link</span>
                  What to Do After the NEET UG 2026 Result
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-clinical-muted">
                  Once results are out, your next step is understanding the counselling process. Learn about{" "}
                  <Link href="/neet-ug-2026/counselling-guide" className="font-semibold text-clinical-blue no-underline hover:underline">
                    NEET UG 2026 Counselling Guide
                  </Link>{" "}
                  and find your{" "}
                  <Link href="/neet-ug-2026/counselling-websites" className="font-semibold text-clinical-blue no-underline hover:underline">
                    State-wise Counselling Authority
                  </Link>
                  . Shortlist colleges early using the{" "}
                  <Link href="/college-predictor" className="font-semibold text-clinical-blue no-underline hover:underline">
                    MBBS College Predictor
                  </Link>
                  .
                </p>
              </div>

              {/* High Yield Chapters Widget */}
              <div className="flex flex-col gap-5 border-t border-clinical-outline/60 pt-8 text-left">
                <HighYieldChaptersWidget showExplanatoryText={true} />
              </div>

            </div>

            {/* Right Column (Sidebar) */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-24">

              <NtaHelpdeskCard />
              <WhatsAppCommunityCard />

              {/* Subscribe to Live Alerts */}
              <Card className="rounded-2xl border border-clinical-outline bg-clinical-surface p-6 shadow-clinical-soft">
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                    <MaterialSymbol name="notifications_active" size="lg" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-extrabold text-clinical-navy">
                      Subscribe to Live SMS/WA Alerts
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-clinical-muted">
                      Get instant WhatsApp updates direct from official sources as soon as they are released.
                    </p>
                  </div>
                  <NeetLeadForm
                    type="whatsapp-alerts"
                    ctaText="Activate Alerts"
                    successTitle="Subscription Active!"
                    successDesc="You have been successfully enrolled for real-time notifications on your WhatsApp."
                  />
                </div>
              </Card>

              {/* 2026 College Predictor */}
              <Link
                href="/college-predictor"
                className="group relative overflow-hidden rounded-2xl border border-clinical-dark bg-clinical-dark p-5 text-left text-white no-underline shadow-clinical-panel"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.22),transparent_24%),linear-gradient(135deg,rgba(15,23,42,0.2),rgba(15,23,42,0.92))]" />
                <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-amber-300/30 blur-2xl" />
                <div className="relative flex min-h-32 flex-col justify-end">
                  <p className="text-[13px] font-extrabold tracking-[-0.01em] text-white">
                    2026 College Predictor
                  </p>
                  <p className="mt-1 max-w-[220px] text-[11px] leading-4 text-white/70">
                    Check likely admission chances in top medical colleges.
                  </p>
                  <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-extrabold text-slate-950 transition-transform group-hover:translate-x-0.5">
                    Try Predictor
                    <MaterialSymbol name="arrow_forward" size="sm" />
                  </span>
                </div>
              </Link>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
