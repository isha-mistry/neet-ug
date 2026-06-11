
import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { AdvisoryAlertCard } from "@/components/features/neet-ug/shared/AdvisoryAlertCard";
import { NtaHelpdeskCard } from "@/components/features/neet-ug/shared/NtaHelpdeskCard";
import { SectionHeading } from "@/components/features/neet-ug/shared/SectionHeading";
import { StepCard } from "@/components/features/neet-ug/shared/StepCard";
import { MetricCard } from "@/components/features/neet-ug/shared/MetricCard";
import { CtaBanner } from "@/components/features/neet-ug/shared/CtaBanner";
import { AllowedProhibitedCard } from "@/components/features/neet-ug/shared/AllowedProhibitedCard";
import { DataTable } from "@/components/features/neet-ug/shared/DataTable";
import { InfoListCard } from "@/components/features/neet-ug/shared/InfoListCard";
import { SidebarLeadCard } from "@/components/features/neet-ug/shared/SidebarLeadCard";
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
                <DataTable
                  columns={[
                    { key: "feature", label: "Feature" },
                    { key: "slip", label: "City Intimation Slip" },
                    { key: "admit", label: "Official Admit Card" },
                  ]}
                  rows={slipVsAdmitRows}
                />
                <div className="bg-amber-50/60 border border-amber-100 rounded-2xl px-5 py-4 flex items-start gap-3 mt-4">
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <MetricCard icon="login" label="Gate Opens" value="12:30 PM" tone="indigo" />
                  <MetricCard icon="lock" label="Gate Closes" value="1:30 PM" tone="rose" />
                  <MetricCard icon="timer" label="Exam Begins" value="2:00 PM" tone="emerald" />
                  <MetricCard icon="timer_off" label="Exam Ends" value="5:20 PM" tone="slate" />
                </div>

                <AllowedProhibitedCard
                  allowed={examDayAllowed}
                  prohibited={examDayProhibited}
                  allowedTitle="Items Allowed Inside"
                  prohibitedTitle="Prohibited Items"
                />

                {/* OMR Rules */}
                <InfoListCard
                  iconName="grid_on"
                  title="OMR Sheet & Rough Work Rules"
                  items={[
                    "Use only blue/black ballpoint pen to darken OMR bubbles — no pencil allowed",
                    "Once darkened, no bubble can be changed or erased — marks carefully",
                    "Rough work must be done only on the blank space inside the test booklet",
                    "OMR sheet must not be folded, torn, or tampered with under any circumstances",
                    "Biometric attendance (fingerprint) is mandatory before entry to the hall",
                    "You must submit the OMR sheet to the invigilator before leaving the hall",
                  ]}
                  listType="checkmarks"
                  layoutType="grid"
                />
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

              <SidebarLeadCard
                theme="light"
                // iconName="whatsapp"
                title="Get Admit Card Alerts"
                description="Receive instant WhatsApp notification when NEET 2026 admit cards are released, with direct download link."
                ctaText="Activate WhatsApp Alerts"
                successTitle="Alerts Activated!"
                successDesc="We'll notify you instantly on WhatsApp when the admit card is available for download."
              />

              <QuickLinksCard links={quickLinks} />
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
