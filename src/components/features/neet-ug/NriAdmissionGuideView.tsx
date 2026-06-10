"use client";

import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { NriCollegesGrid } from "@/components/features/neet-ug/NriCollegesGrid";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";
import { SectionHeading } from "@/components/features/neet-ug/shared/SectionHeading";
import { DataTable } from "@/components/features/neet-ug/shared/DataTable";

export function NriAdmissionGuideView() {
  const reservationPolicyRows = [
    { category: "OBC-NCL (Other Backward Classes)", quota: "27%", type: "Vertical", _typeColor: "emerald", scope: "AIQ + State Quota", note: "Central list OBC only; state OBC lists differ" },
    { category: "Scheduled Castes (SC)", quota: "15%", type: "Vertical", _typeColor: "emerald", scope: "AIQ + State Quota", note: "Certificate from competent state authority" },
    { category: "Scheduled Tribes (ST)", quota: "7.5%", type: "Vertical", _typeColor: "emerald", scope: "AIQ + State Quota", note: "Certificate from competent state authority" },
    { category: "Economically Weaker Section (EWS)", quota: "10%", type: "Vertical", _typeColor: "emerald", scope: "AIQ only (Central Institutions)", note: "Annual family income below ₹8 lakh; central list" },
    { category: "Persons with Benchmark Disability (PwBD)", quota: "5%", type: "Horizontal", _typeColor: "amber", scope: "All categories", note: "Minimum 40% benchmark disability; must be NEET-eligible" },
  ];

  const certificateRequirements = [
    {
      icon: "account_balance",
      title: "EWS Certificate",
      color: "amber",
      points: [
        "Issued by Sub-Divisional Magistrate (SDM) / Tehsildar / BDO / District Magistrate",
        "Annual family income below ₹8 lakh (all sources combined)",
        "Family must not own agricultural land above 5 acres, residential flat above 1000 sq ft, or plot above 100 sq yd in notified municipalities",
        "Valid for the financial year of issue only — must be renewed annually",
        "Applicable only for Central institutions / AIQ; EWS state quota varies by state",
      ],
    },
    {
      icon: "groups_2",
      title: "OBC-NCL Certificate",
      color: "blue",
      points: [
        "Must be issued by Sub-Divisional Magistrate or equivalent — not Panchayat/Municipality",
        "Must fall under the Central Government's OBC list (not just state list)",
        "Creamy layer exclusion applies: annual family income must be below ₹8 lakh",
        "Certificate must be in the prescribed format as per OM dated 14th October 2004",
        "State-specific OBC certificates are not valid for Central institutions / AIQ counselling",
      ],
    },
    {
      icon: "accessible",
      title: "PwBD Certificate",
      color: "emerald",
      points: [
        "Minimum benchmark disability of 40% required for reservation eligibility",
        "Certificate must be issued by a Central/State Government specialist hospital",
        "Disability types: locomotor, visual, hearing, speech/language, intellectual disability",
        "Candidates with benchmark disability must also clear NEET's minimum qualifying percentile",
        "Medical Board of respective exam authorities may re-examine candidates at counselling",
      ],
    },
    {
      icon: "supervised_user_circle",
      title: "SC / ST Certificate",
      color: "rose",
      points: [
        "Must be issued by the District Collector / SDM / Tehsildar of the home district",
        "Certificate must be in the central government-prescribed format for the respective category",
        "State-specific formats may not be accepted at central counselling (MCC) — verify format",
        "Must carry the official seal/stamp and be signed by a competent revenue officer",
        "Carry original + minimum 2 self-attested copies for document verification at allotted college",
      ],
    },
  ];

  const colorMap: Record<string, string> = {
    amber: "bg-amber-50 text-amber-600 ring-amber-100 border-amber-100",
    blue: "bg-blue-50 text-blue-600 ring-blue-100 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 ring-rose-100 border-rose-100",
  };
  const cardBorderMap: Record<string, string> = {
    amber: "border-amber-100 bg-amber-50/20",
    blue: "border-blue-100 bg-blue-50/20",
    emerald: "border-emerald-100 bg-emerald-50/20",
    rose: "border-rose-100 bg-rose-50/20",
  };

  const nriEligibilityCriteria = [
    {
      icon: "flight",
      title: "Category A: True NRI Candidates",
      points: [
        "Candidate holds a valid Indian passport and resides outside India (non-resident status as per IT Act).",
        "Must have qualified NEET UG 2026 by scoring above the minimum qualifying percentile.",
        "Must have completed 10+2 outside India with Physics, Chemistry, Biology, and English.",
        "OCI (Overseas Citizens of India) and PIO (Persons of Indian Origin) cardholders are also eligible under this category.",
      ],
    },
    {
      icon: "family_restroom",
      title: "Category B: NRI-Sponsored Candidates",
      points: [
        "Candidate is an Indian resident but sponsored by a first-degree NRI relative (parents, siblings, first cousins, or direct uncles/aunts).",
        "Sponsor must provide a relationship affidavit, family tree verified by revenue officials, and copy of passport/visa.",
        "Sponsor undertakes full responsibility to pay college fees in foreign currency (USD or equivalent).",
        "Sponsorship must be renewed each academic year and verified by the concerned college's NRI committee.",
      ],
    },
  ];

  const nriDocuments = [
    { icon: "badge", doc: "Valid Indian Passport (candidate's)" },
    { icon: "card_membership", doc: "OCI / PIO Card (if applicable)" },
    { icon: "description", doc: "NEET UG 2026 Scorecard" },
    { icon: "school", doc: "10th & 12th Marksheets (foreign board, if applicable)" },
    { icon: "home_work", doc: "NRI Sponsor's Passport & Valid Visa" },
    { icon: "gavel", doc: "Relationship Affidavit (notarised)" },
    { icon: "account_balance", doc: "Sponsor's Bank Statement (USD account)" },
    { icon: "family_restroom", doc: "Family Tree Certificate (revenue officer verified)" },
  ];

  return (
    <>
      <Section tone="default" className=" py-7 md:py-10">
        <Container size="2xl" className="flex flex-col gap-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "NEET UG 2026", href: "/neet-ug-2026" },
              { label: "Reservation & NRI Guide" },
            ]}
          />

          {/* Header */}
          <header className="max-w-3xl text-left">
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-clinical-navy md:text-4xl lg:text-[44px]">
              Reservation, Category Certificates<span className="block">& NRI MBBS Admission</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base font-normal leading-relaxed text-clinical-muted">
              Understand NEET UG 2026 reservation policy, required category certificates, AIQ vs State quota differences, and the complete NRI MBBS admission process for Deemed & Private institutions.
            </p>
          </header>

          {/* ── Reservation Policy ─────────────────────────────────────── */}
          <section className="flex flex-col gap-8">
            <SectionHeading
              icon="balance"
              eyebrow="Reservation Policy"
              title="Category & Reservation Framework"
              description="Seat reservation in NEET UG 2026 is governed by central government rules for AIQ seats and respective state rules for state quota seats."
            />

            <DataTable
              columns={[
                { key: "category", label: "Category" },
                { key: "quota", label: "Quota", badge: true, badgeVariant: "blue" },
                { key: "type", label: "Type", badge: true, badgeColorKey: "_typeColor" },
                { key: "scope", label: "Scope" },
                { key: "note", label: "Note" },
              ]}
              rows={reservationPolicyRows}
              scrollable
            />

            {/* AIQ vs State quota reservation */}
            <div className="rounded-2xl border border-clinical-outline bg-clinical-surface p-6 shadow-clinical-soft">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                  <MaterialSymbol name="compare_arrows" size="sm" />
                </span>
                <h3 className="text-sm font-extrabold text-clinical-navy">AIQ vs State Quota Reservation Rules</h3>
              </div>
              <div className="grid grid-cols-1 gap-6 divide-y divide-clinical-outline md:grid-cols-2 md:divide-x md:divide-y-0">
                <div className="flex flex-col gap-3 pr-0 md:pr-6">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600 text-xs font-bold shrink-0">15%</span>
                    <h4 className="text-sm font-extrabold text-clinical-navy">All India Quota (AIQ) — Central</h4>
                  </div>
                  <ul className="flex flex-col gap-2 text-xs text-clinical-muted">
                    {[
                      "SC 15%, ST 7.5%, OBC-NCL 27%, EWS 10% applied on AIQ seats in government colleges",
                      "Only Central list OBC (not state list) is valid for AIQ OBC reservation",
                      "No domicile or state residence required — open to all India",
                      "PwBD 5% horizontal reservation applied across all vertical categories",
                      "Eligible for AIIMS, JIPMER, Central Universities, Deemed universities",
                    ].map((pt, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <MaterialSymbol name="check_circle" size="sm" className="text-blue-500 shrink-0 mt-0.5" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3 pt-5 md:pt-0 pl-0 md:pl-6">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-50 text-teal-600 text-xs font-bold shrink-0">85%</span>
                    <h4 className="text-sm font-extrabold text-clinical-navy">State Quota — State-Specific Rules</h4>
                  </div>
                  <ul className="flex flex-col gap-2 text-xs text-clinical-muted">
                    {[
                      "Domicile / residence certificate required for most states' government quota seats",
                      "State-specific OBC lists may differ from the central list — verify with DME",
                      "EWS income limit and certificate format may vary by state government notification",
                      "Some states have additional local reservations (e.g., NCC, sports, defence quota)",
                      "Managed by state DME / CET Cell — each has its own eligibility & document norms",
                    ].map((pt, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <MaterialSymbol name="check_circle" size="sm" className="text-teal-500 shrink-0 mt-0.5" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ── Certificate Requirements ──────────────────────────────────── */}
          <section className="flex flex-col gap-8">
            <SectionHeading
              icon="verified_user"
              eyebrow="Documents"
              title="Category Certificate Requirements"
              description="Category certificates must be in the correct format and issued by the correct authority. Incorrect certificates lead to seat cancellation during verification."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {certificateRequirements.map((cert, i) => (
                <div key={i} className={`rounded-2xl border bg-clinical-surface p-6 shadow-clinical-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-clinical-hover ${cardBorderMap[cert.color]}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ring-1 ${colorMap[cert.color]}`}>
                      <MaterialSymbol name={cert.icon} size="md" />
                    </div>
                    <h4 className="text-sm font-extrabold text-clinical-navy">{cert.title}</h4>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {cert.points.map((pt, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-clinical-muted">
                        <MaterialSymbol name="chevron_right" size="sm" className="text-slate-400 shrink-0 mt-0.5" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── Divider ──────────────────────────────────────────────────── */}
          <div className="relative">
            <div className="border-t border-clinical-outline" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-clinical-background px-4 text-xs font-extrabold uppercase tracking-[0.16em] text-clinical-muted/70">
              NRI Admission Section
            </span>
          </div>

          {/* ── NRI Section Header ──────────────────────────────────────── */}
          <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-r from-clinical-dark to-clinical-blue p-6 text-white shadow-clinical-panel md:flex-row md:p-8">
            <div className="pointer-events-none absolute right-0 top-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
            <div className="flex flex-col gap-2 max-w-xl z-10">
              <span className="inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase leading-none tracking-[0.14em] text-blue-100 ring-1 ring-white/20">Premium Admission Pathway</span>
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white">NRI MBBS Admission & Counselling Guide</h2>
              <p className="text-blue-100/80 text-sm leading-relaxed">
                Complete blueprint for Non-Resident Indians and NRI-sponsored candidates seeking MBBS seats in Deemed & Private institutions.
              </p>
            </div>
            <Link
              href="#nri-counseling-form"
              className="z-10 inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-6 text-sm font-bold tracking-wide text-clinical-blue no-underline shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-50 active:scale-[0.98]"
            >
              Book NRI Consultation
              <MaterialSymbol name="arrow_forward" size="sm" />
            </Link>
          </div>

          {/* ── NRI Eligibility ──────────────────────────────────────────── */}
          <section className="flex flex-col gap-8">
            <SectionHeading
              icon="manage_accounts"
              eyebrow="NRI Eligibility"
              title="NRI Eligibility & Sponsor Framework"
              description="Two categories of candidates qualify for the NRI quota in Indian medical colleges. Both must have qualified NEET UG 2026."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {nriEligibilityCriteria.map((crit, i) => (
                <div key={i} className="rounded-2xl border border-clinical-outline bg-clinical-surface p-6 shadow-clinical-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-clinical-blue/20 hover:shadow-clinical-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-clinical-outline bg-clinical-surface-low text-clinical-blue">
                      <MaterialSymbol name={crit.icon} size="md" />
                    </div>
                    <h4 className="text-sm font-extrabold leading-snug text-clinical-navy">{crit.title}</h4>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {crit.points.map((pt, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-clinical-muted">
                        <MaterialSymbol name="check_circle" size="sm" className="mt-0.5 shrink-0 text-clinical-green" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── NRI Colleges & Lead Form ──────────────────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
            <div className="flex flex-col gap-6">
              <SectionHeading
                icon="domain_add"
                eyebrow="NRI Quota Colleges"
                title="Top Deemed Universities for NRI Quota"
                description="Average tuition fee structure and NRI seat availability for highly-rated private medical colleges."
              />
              {/* <NriCollegesGrid /> */}

              {/* NRI Documents */}
              <div className="flex flex-col gap-4 mt-2">
                <h3 className="flex items-center gap-2.5 text-base font-extrabold text-clinical-navy">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-clinical-surface text-clinical-muted ring-1 ring-clinical-outline">
                    <MaterialSymbol name="description" size="sm" />
                  </span>
                  Documents Required for NRI Admission
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {nriDocuments.map((d, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-2xl border border-clinical-outline bg-clinical-surface p-4 shadow-clinical-soft">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-clinical-outline bg-clinical-surface-low text-clinical-blue">
                        <MaterialSymbol name={d.icon} size="sm" />
                      </div>
                      <span className="text-xs font-semibold text-clinical-muted">{d.doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lead Form Sidebar */}
            <div id="nri-counseling-form" className="lg:sticky lg:top-24">
              <Card padded={false} className="relative overflow-hidden rounded-2xl border border-clinical-dark bg-clinical-dark p-5 text-white shadow-clinical-panel">
                {/* <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-teal-400/20 blur-2xl" /> */}
                <div className="relative flex flex-col gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-200 ring-1 ring-white/10 w-fit">
                    <MaterialSymbol name="star" size="sm" />
                    Premium NRI Support
                  </span>
                  <div>
                    <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.02em]">
                      Book NRI Consultation
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-white/65">
                      Get custom admissions guidance from premium mentors specialized in NRI documentation & budgets.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <NeetLeadForm
                      variant="dark"
                      type="phone-whatsapp"
                      ctaText="Request Premium Help"
                      successTitle="Admissions Request Logged!"
                      successDesc="A senior executive from our premium counseling cell will reach out within 12 business hours."
                    />
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </Container>
      </Section>
    </>
  );
}
