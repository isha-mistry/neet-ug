"use client";

import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { AdvisoryAlertCard } from "@/components/features/neet-ug/shared/AdvisoryAlertCard";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";
import { NtaHelpdeskCard } from "@/components/features/neet-ug/shared/NtaHelpdeskCard";
import { SectionHeading } from "@/components/features/neet-ug/shared/SectionHeading";
import { StepCard } from "@/components/features/neet-ug/shared/StepCard";
import { MetricCard } from "@/components/features/neet-ug/shared/MetricCard";
import { CtaBanner } from "@/components/features/neet-ug/shared/CtaBanner";
import { AllowedProhibitedCard } from "@/components/features/neet-ug/shared/AllowedProhibitedCard";
import { DataTable } from "@/components/features/neet-ug/shared/DataTable";
import { QuickLinksCard } from "@/components/features/neet-ug/shared/QuickLinksCard";

export function ApplicationFormView() {
  const applicationSteps = [
    {
      step: 1,
      icon: "person_add",
      title: "New Registration",
      desc: "Visit neet.nta.nic.in and click 'New Registration'. Enter your name, date of birth, gender, mobile number, and email ID to generate your Application Number and password.",
    },
    {
      step: 2,
      icon: "assignment",
      title: "Fill Application Form",
      desc: "Log in with your Application Number. Fill in personal details, parents' information, category, academic qualifications (10th and 12th details), and your preferred exam centre city.",
    },
    {
      step: 3,
      icon: "add_photo_alternate",
      title: "Upload Photo & Documents",
      desc: "Upload a recent passport-size photograph (10–200 KB, JPG format, white background), your signature (4–30 KB, JPG), and left-hand thumb impression (10–50 KB, JPG).",
    },
    {
      step: 4,
      icon: "payment",
      title: "Pay Application Fee",
      desc: "Pay the non-refundable application fee via credit/debit card, net banking, or UPI. Fee amounts vary by category. After payment, download the confirmation page.",
    },
    {
      step: 5,
      icon: "print",
      title: "Print Confirmation Page",
      desc: "After successful fee payment, download and print the confirmation page with your application number. Keep it safe for all future reference including admit card download.",
    },
  ];

  const applicationFeeRows = [
    { category: "General / EWS", fee: "₹1,700", note: "All centres including abroad" },
    { category: "OBC-NCL (Non-Creamy Layer)", fee: "₹1,600", note: "All centres" },
    { category: "SC / ST / PwBD / Third Gender", fee: "₹1,000", note: "All centres" },
    { category: "Foreign / NRI Candidates (India centres)", fee: "₹9,500", note: "India exam centres" },
    { category: "Foreign / NRI Candidates (Abroad centres)", fee: "USD 200", note: "Outside India centres" },
  ];

  const requiredDocuments = [
    {
      icon: "image",
      title: "Passport-Size Photograph",
      desc: "Recent colour photo, white/light background, size 10–200 KB, JPG format. Name and date of capture should be printed below the photo.",
    },
    {
      icon: "gesture",
      title: "Candidate's Signature",
      desc: "Sign on white paper with black/blue ink, scan/photograph it. Size 4–30 KB, JPG only. Do not use block letters or capital letters.",
    },
    {
      icon: "fingerprint",
      title: "Left-Hand Thumb Impression",
      desc: "Ink impression on white paper, scanned clearly. Size 10–50 KB, JPG. The impression must be clear and distinct.",
    },
    {
      icon: "badge",
      title: "Photo Identity Proof",
      desc: "Valid Aadhaar card, PAN card, passport, voter ID, or driving licence. Must match the name on the application form exactly.",
    },
    {
      icon: "school",
      title: "Class 10 Certificate",
      desc: "Marksheet or passing certificate for date of birth verification. Students with a secondary/matriculation board certificate are eligible.",
    },
    {
      icon: "workspace_premium",
      title: "Category Certificate (if applicable)",
      desc: "SC/ST/OBC-NCL/EWS/PwBD certificate issued by a competent authority. Must be on the official format as prescribed by the Government.",
    },
  ];

  const correctionAllowed = [
    { item: "Candidate's name (minor spelling correction)" },
    { item: "Father's / Mother's name (minor correction)" },
    { item: "Date of birth (with valid supporting documents)" },
    { item: "Category (General/OBC/SC/ST/EWS/PwBD)" },
    { item: "Gender" },
    { item: "Photograph and signature re-upload" },
    { item: "State of eligibility" },
    { item: "Exam centre city (subject to availability)" },
    { item: "Medium of question paper" },
    { item: "Nationality" },
  ];

  const correctionNotAllowed = [
    { item: "Application number (permanently fixed)" },
    { item: "Email ID used for registration" },
    { item: "Mobile number used for registration" },
    { item: "Already submitted and locked exam city (in some phases)" },
  ];

  const slipVsAdmitRows = [
    { feature: "When Released", slip: "~2 weeks before exam", admit: "~1 week before exam" },
    { feature: "Purpose", slip: "Know your exam city for travel planning", admit: "Entry pass to the examination hall" },
    { feature: "Mandatory at Centre", slip: "Not mandatory", admit: "Mandatory — without it entry is denied" },
    { feature: "Contains Hall No.?", slip: "No", admit: "Yes" },
    { feature: "Contains Venue Address?", slip: "City name only", admit: "Complete venue address & room number" },
    { feature: "Contains Photo?", slip: "No", admit: "Yes — photo printed on it" },
    { feature: "Download Source", slip: "neet.nta.nic.in", admit: "neet.nta.nic.in (same portal)" },
  ];

  const examDayAllowed = [
    { icon: "badge", item: "Admit Card (printed, A4 size)" },
    { icon: "credit_card", item: "Valid Photo ID Proof (original)" },
    { icon: "photo_camera", item: "One Passport-Size Photograph (same as on form)" },
    { icon: "edit", item: "Transparent/clear ballpoint pen (blue/black)" },
    { icon: "water_drop", item: "Transparent water bottle (no label)" },
    { icon: "medication", item: "Prescribed medication (with doctor's note)" },
  ];

  const examDayProhibited = [
    { icon: "phone_iphone", item: "Mobile phone, smartwatch, or any electronic device" },
    { icon: "watch", item: "Wrist watch of any kind" },
    { icon: "diamond", item: "Jewellery, metal ornaments, or hair clips/pins" },
    { icon: "calculate", item: "Calculator, log tables, or stationery items" },
    { icon: "fastfood", item: "Food items or eatables (except diabetic candidates)" },
    { icon: "backpack", item: "Bags, wallets, or pouches of any kind" },
  ];

  const quickLinks = [
    { label: "NTA Official NEET Portal", href: "https://neet.nta.nic.in", external: true },
    { label: "NEET 2026 Answer Key", href: "/neet-ug-2026/answer-key" },
    { label: "Live Updates & Alerts", href: "/neet-ug-2026/updates" },
    { label: "MCC Counselling Guide", href: "/neet-ug-2026/counselling-guide" },
  ];

  return (
    <>
      <Section tone="default" className="bg-[#f6f8fc] py-7 md:py-10">
        <Container size="2xl" className="flex flex-col gap-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "NEET UG 2026", href: "/neet-ug-2026" },
              { label: "Application & Admit Card" },
            ]}
          />

          <AdvisoryAlertCard />

          {/* Header */}
          <header className="max-w-3xl text-left">
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-[44px] leading-tight">
              Application Form, Admit Card<span className="block">& Exam Day Guide</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 font-normal">
              Step-by-step instructions for filling the NEET UG 2026 application, downloading your admit card, understanding the city intimation slip, and exam day protocols.
            </p>
          </header>

          {/* Metric Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard icon="edit_calendar" label="Application Fee" value="₹1,000 – ₹1,700" tone="blue" />
            <MetricCard icon="event_available" label="Correction Window" value="After form close" tone="amber" />
            <MetricCard icon="badge" label="Admit Card" value="June 14, 2026" tone="emerald" />
            <MetricCard icon="draw" label="Re-NEET Exam" value="June 21, 2026" tone="rose" />
          </div>

          {/* Main content + sidebar */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="flex flex-col gap-10">

              {/* ── How to Apply ─────────────────────────────────────────── */}
              <section className="flex flex-col gap-5">
                <SectionHeading
                  icon="how_to_reg"
                  eyebrow="Application Process"
                  title="How to Apply for NEET UG 2026"
                  description="Follow these five steps carefully on the official NTA portal to complete your NEET UG 2026 application."
                />
                <div className="grid grid-cols-1 gap-4">
                  {applicationSteps.map((s) => (
                    <StepCard key={s.step} {...s} />
                  ))}
                </div>
                <div className="flex items-center gap-2 bg-blue-50/60 border border-blue-100 rounded-2xl px-5 py-4 text-sm text-blue-800">
                  <MaterialSymbol name="info" size="sm" className="shrink-0 text-blue-600" />
                  <p>
                    <strong>Official Portal:</strong> All applications must be submitted only through{" "}
                    <Link href="https://neet.nta.nic.in" target="_blank" rel="noopener noreferrer" className="font-extrabold underline underline-offset-2 hover:text-blue-600">
                      neet.nta.nic.in
                    </Link>
                    . Third-party websites or agents cannot submit your NEET application.
                  </p>
                </div>
              </section>

              {/* ── Application Fee Table ─────────────────────────────────── */}
              <section className="flex flex-col gap-5">
                <SectionHeading
                  icon="account_balance_wallet"
                  eyebrow="Fee Structure"
                  title="NEET UG 2026 Application Fee"
                  description="Category-wise non-refundable fee as notified by NTA. Payment accepted via credit/debit card, net banking, or UPI only."
                />
                <DataTable
                  columns={[
                    { key: "category", label: "Category" },
                    { key: "fee", label: "Application Fee", badge: true, badgeVariant: "blue" },
                    { key: "note", label: "Remark", align: "right" },
                  ]}
                  rows={applicationFeeRows}
                  footnote="* Fee is non-refundable and non-transferable. Bank processing charges may apply additionally."
                />
              </section>

              {/* ── Documents Required ────────────────────────────────────── */}
              <section className="flex flex-col gap-5">
                <SectionHeading
                  icon="description"
                  eyebrow="Documents"
                  title="Documents Required for Application"
                  description="Prepare all documents before you begin. Uploads must be in JPG/JPEG format within the specified size limits."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {requiredDocuments.map((doc, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md hover:border-blue-100/60 hover:-translate-y-0.5 transition-all duration-200">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/50 flex items-center justify-center shrink-0">
                        <MaterialSymbol name={doc.icon} size="md" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-extrabold text-slate-900 text-sm leading-snug">{doc.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{doc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Correction Window ─────────────────────────────────────── */}
              <section className="flex flex-col gap-5">
                <SectionHeading
                  icon="edit_note"
                  eyebrow="Correction Window"
                  title="Application Correction Window"
                  description="NTA opens a limited correction window after the application period closes. Use it carefully — some fields cannot be changed at any stage."
                />
                <AllowedProhibitedCard
                  allowed={correctionAllowed}
                  prohibited={correctionNotAllowed}
                  allowedTitle="Can Be Edited"
                  prohibitedTitle="Cannot Be Changed"
                  footnote="Correction window fees (if any) must be paid during the same window period."
                />
              </section>

              {/* ── City Slip vs Admit Card ───────────────────────────────── */}
              <section className="flex flex-col gap-5">
                <SectionHeading
                  icon="compare_arrows"
                  eyebrow="Pre-Exam Documents"
                  title="City Intimation Slip vs Admit Card"
                  description="NTA releases two separate documents before the exam. Understanding the difference prevents confusion on exam day."
                />
                <div className="border border-slate-100 rounded-3xl bg-white overflow-hidden shadow-sm shadow-slate-100/30">
                  <div className="grid grid-cols-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-50/50 border-b border-slate-100">
                    <div className="py-4 px-6">Feature</div>
                    <div className="py-4 px-4 border-l border-slate-100">City Intimation Slip</div>
                    <div className="py-4 px-4 border-l border-slate-100">Official Admit Card</div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {slipVsAdmitRows.map((row, i) => (
                      <div key={i} className="grid grid-cols-3 text-xs hover:bg-slate-50/30 transition-colors">
                        <div className="py-3.5 px-6 font-extrabold text-slate-900">{row.feature}</div>
                        <div className="py-3.5 px-4 border-l border-slate-100 text-slate-600 font-medium">{row.slip}</div>
                        <div className="py-3.5 px-4 border-l border-slate-100 text-slate-600 font-medium">{row.admit}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50/60 border border-amber-100 rounded-2xl px-5 py-4 flex items-start gap-3">
                  <MaterialSymbol name="warning" size="sm" className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Admit card errors:</strong> If you spot errors (name, DOB, photo) on your admit card, immediately contact NTA helpdesk at{" "}
                    <span className="font-extrabold">011-40759000</span> or email{" "}
                    <span className="font-extrabold">neet@nta.ac.in</span> with supporting documents. Do not wait until exam day.
                  </p>
                </div>
              </section>

              {/* ── Exam Day ─────────────────────────────────────────────── */}
              <section className="flex flex-col gap-5">
                <SectionHeading
                  icon="fact_check"
                  eyebrow="Exam Day"
                  title="Exam Day Rules & Protocol"
                  description="Arrive at the exam centre at least 90 minutes before the exam. Gate closes strictly at 1:30 PM for the 2:00 PM slot."
                />

                {/* Timing bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: "login", label: "Gate Opens", value: "12:30 PM" },
                    { icon: "lock", label: "Gate Closes", value: "1:30 PM" },
                    { icon: "timer", label: "Exam Begins", value: "2:00 PM" },
                    { icon: "timer_off", label: "Exam Ends", value: "5:20 PM" },
                  ].map((t) => (
                    <div key={t.label} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <MaterialSymbol name={t.icon} size="sm" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.label}</span>
                        <span className="text-sm font-extrabold text-slate-900">{t.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <AllowedProhibitedCard
                  allowed={examDayAllowed}
                  prohibited={examDayProhibited}
                  allowedTitle="Items Allowed Inside"
                  prohibitedTitle="Prohibited Items"
                />

                {/* OMR Rules */}
                <Card padded={false} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                      <MaterialSymbol name="grid_on" size="sm" />
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-sm">OMR Sheet & Rough Work Rules</h3>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
                    {[
                      "Use only blue/black ballpoint pen to darken OMR bubbles — no pencil allowed",
                      "Once darkened, no bubble can be changed or erased — marks carefully",
                      "Rough work must be done only on the blank space inside the test booklet",
                      "OMR sheet must not be folded, torn, or tampered with under any circumstances",
                      "Biometric attendance (fingerprint) is mandatory before entry to the hall",
                      "You must submit the OMR sheet to the invigilator before leaving the hall",
                    ].map((rule, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <MaterialSymbol name="check" size="sm" className="text-blue-600 shrink-0 mt-0.5" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </Card>
              </section>

              {/* CTA Banner */}
              <CtaBanner
                eyebrow="Exam Day Checklist"
                title="Don't miss a step on exam day"
                description="Get WhatsApp alerts for admit card release, exam day reminders, and city intimation slip updates directly on your phone."
                ctaText="Subscribe to Live Alerts"
                ctaHref="/neet-ug-2026/updates"
                ctaIcon="notifications_active"
              />
            </div>

            {/* ── Sidebar ──────────────────────────────────────────────── */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
              <NtaHelpdeskCard />

              <Card
                padded={false}
                className="rounded-[14px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.045)]"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center rounded-[12px] bg-emerald-50 text-emerald-500 ring-8 ring-emerald-50/50">
                    <MaterialSymbol name="whatsapp" size="lg" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-extrabold tracking-[-0.01em] text-slate-950">
                      Get Admit Card Alerts
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Receive instant WhatsApp notification when NEET 2026 admit cards are released, with direct download link.
                    </p>
                  </div>
                  <NeetLeadForm
                    type="phone-whatsapp"
                    ctaText="Activate WhatsApp Alerts"
                    successTitle="Alerts Activated!"
                    successDesc="We'll notify you instantly on WhatsApp when the admit card is available for download."
                  />
                </div>
              </Card>

              <QuickLinksCard links={quickLinks} />
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
