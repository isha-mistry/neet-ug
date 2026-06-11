"use client";

import React from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { CounsellingTimeline } from "@/components/features/neet-ug/counselling/CounsellingTimeline";
import { CounsellingRounds } from "@/components/features/neet-ug/counselling/CounsellingRounds";
import { DocumentChecklist } from "@/components/features/neet-ug/counselling/DocumentChecklist";
import { CounsellingFeeTable } from "@/components/features/neet-ug/counselling/CounsellingFeeTable";
import { neetUg2026Data } from "@/lib/data/neet-ug-2026";
import { SidebarLeadCard } from "@/components/features/neet-ug/shared/SidebarLeadCard";

export function UgCounsellingGuideView() {
  const { seatStatistics } = neetUg2026Data;

  const counsellingStreams = [
    {
      title: "MCC Central Quota (15%)",
      desc: "AIQ govt seats, AIIMS, JIPMER, Deemed & Central Universities. Open to all India.",
    },
    {
      title: "State Quota (85%)",
      desc: "Respective state government and private colleges. Domicile certificates required.",
    },
  ];

  const comparisonCards = [
    {
      title: "MCC Central Counselling (15% AIQ)",
      desc: "Covers all central institutions (AIIMS, JIPMER), Deemed Universities, and 15% of seats in every state-run government medical college. No domicile certificate is needed. Anyone from any state can claim these seats based purely on their NEET AIR.",
      icon: "account_balance",
      border: "border-blue-100",
      bgGradient: "from-mg-surface to-blue-50",
      iconBg: "bg-mg-primary",
    },
    {
      title: "State Quota Counselling (85% State)",
      desc: "Covers the remaining 85% of seats in state government colleges and 100% of seats in state private colleges. Managed by each state's DME/CET Cell. Requires a valid State Domicile/Residence proof to apply for government quota seats.",
      icon: "map",
      border: "border-green-100",
      bgGradient: "from-mg-surface to-green-50",
      iconBg: "bg-green-600",
    },
  ];

  return (
    <>
      <Section tone="default" className=" py-7 md:py-10">
        <Container size="2xl" className="flex flex-col gap-10">
          {/* Breadcrumb */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "NEET UG 2026", href: "/neet-ug-2026" },
              { label: "Counselling Guide" },
            ]}
          />

          {/* Hero */}
          <header className="max-w-3xl text-left">
            <h1 className="mt-4 text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-clinical-navy md:text-[44px]">
              NEET UG Counselling Step-by-Step Guide
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-clinical-muted md:text-[15px]">
              Navigate NEET UG counselling with a clearer view of registration, choice locking, allotment, reporting, and seat matrix rules across MCC and state rounds.
            </p>
          </header>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* ── Left Content Column ── */}
            <div className="flex-1 space-y-8">

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { icon: "event", label: "MCC Round", value: "Upcoming", bg: "bg-green-50", text: "text-green-600" },
                  { icon: "fact_check", label: "Checklist", value: "8 Docs Required", bg: "bg-blue-50", text: "text-blue-600" },
                  { icon: "grid_view", label: "Seat Matrix", value: `${Math.round(seatStatistics.mbbs.total / 1000)}K+ MBBS`, bg: "bg-purple-50", text: "text-purple-600" },
                  { icon: "source", label: "Source", value: "MCC Data", bg: "bg-orange-50", text: "text-orange-600" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-3 rounded-lg border border-mg-border/40 bg-mg-surface p-4">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${m.bg} ${m.text}`}>
                      <span className="material-symbols-outlined text-[18px]">{m.icon}</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-mg-on-surface">{m.label}</p>
                      <p className="mt-0.5 text-sm font-bold text-mg-on-bg">{m.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Intro Section */}
              <section className="rounded-xl border border-mg-border/40 bg-mg-surface p-6 shadow-sm">
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mg-primary-bright text-white">
                    <span className="material-symbols-outlined text-[19px]">help_center</span>
                  </div>
                  <div>
                    <h2 className="text-[22px] font-semibold text-mg-on-bg">What is NEET UG Counselling?</h2>
                    <p className="text-sm text-mg-on-surface">Essential introduction for medical aspirants</p>
                  </div>
                </div>
                <div className="pt-3 grid gap-6 lg:grid-cols-3">
                  <div className="space-y-4 lg:col-span-2">
                    <p className="text-[16px] leading-relaxed text-mg-on-bg">
                      <strong>NEET UG Counselling</strong> is the official, centralized process that allocates medical, dental, AYUSH, and veterinary seats in Indian colleges based on your <strong>NEET All India Rank (AIR)</strong>. Just qualifying the NEET UG exam does not guarantee a seat; every candidate must actively register and participate in counselling to secure admission.
                    </p>
                    <p className="text-[16px] leading-relaxed text-mg-on-bg">
                      The allotment is fully computerized and proceeds dynamically based on a student&apos;s rank, selected category reservation, and their submitted priority order of college choices.
                    </p>
                  </div>
                  <div className="space-y-4 rounded-lg bg-mg-surface-container p-4">
                    <p className="text-[12px] font-semibold uppercase tracking-wider text-mg-on-surface">Counselling Streams</p>
                    {counsellingStreams.map((stream, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="material-symbols-outlined shrink-0 text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <p className="text-sm">
                          <strong>{stream.title}:</strong> {stream.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Process Section */}
              <section id="process">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-[13px] font-semibold uppercase tracking-widest text-mg-primary">Process</span>
                  <div className="h-px flex-1 bg-mg-border/40" />
                </div>
                <h2 className="mb-2 flex items-center gap-2 text-[28px] font-semibold leading-[1.3] text-mg-on-bg">
                  <span className="material-symbols-outlined text-mg-primary">account_tree</span>
                  Official Six Stages of Seat Counselling
                </h2>
                <p className="mb-6 text-[16px] text-mg-on-surface">Follow the centralized counselling roadmap step-by-step to secure your medical seat.</p>
                <CounsellingTimeline />
              </section>

              {/* Fees Section */}
              <section id="fees">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-[13px] font-semibold uppercase tracking-widest text-mg-primary">Counselling Fees</span>
                  <div className="h-px flex-1 bg-mg-border/40" />
                </div>
                <h2 className="mb-4 flex items-center gap-2 text-[28px] font-semibold leading-[1.3] text-mg-on-bg">
                  <span className="material-symbols-outlined text-mg-primary">payments</span>
                  Registration &amp; Security Fees
                </h2>
                <CounsellingFeeTable />
              </section>

              {/* AIQ vs State Comparison */}
              <section id="comparison">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-[13px] font-semibold uppercase tracking-widest text-mg-primary">Comparison</span>
                  <div className="h-px flex-1 bg-mg-border/40" />
                </div>
                <h2 className="mb-4 flex items-center gap-2 text-[28px] font-semibold leading-[1.3] text-mg-on-bg">
                  <span className="material-symbols-outlined text-mg-primary">compare_arrows</span>
                  AIQ Central vs. State Quota Counselling
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {comparisonCards.map((card, i) => (
                    <div key={i} className={`flex flex-col rounded-xl border ${card.border} bg-gradient-to-br ${card.bgGradient} p-6 shadow-sm`}>
                      <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-lg ${card.iconBg} text-white`}>
                        <span className="material-symbols-outlined text-[19px]">{card.icon}</span>
                      </div>
                      <h3 className="mb-2 text-[22px] font-semibold text-mg-on-bg">{card.title}</h3>
                      <p className="mb-6 flex-1 text-[14px] leading-relaxed text-mg-on-surface">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Seats Covered Under MCC */}
              <section id="mcc-coverage">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-[13px] font-semibold uppercase tracking-widest text-mg-primary">Coverage</span>
                  <div className="h-px flex-1 bg-mg-border/40" />
                </div>
                <h2 className="mb-4 flex items-center gap-2 text-[28px] font-semibold leading-[1.3] text-mg-on-bg">
                  <span className="material-symbols-outlined text-mg-primary">layers</span>
                  Seats Covered Under Central MCC Counselling
                </h2>
                <div className="overflow-hidden rounded-xl border border-mg-border/40 bg-mg-surface">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-mg-border/40 bg-mg-surface-container text-[11px] font-semibold uppercase tracking-widest text-mg-on-surface">
                          <th className="px-6 py-4">Seat Category</th>
                          <th className="px-6 py-4">Quota Percentage</th>
                          <th className="px-6 py-4">Conducted By</th>
                          <th className="px-6 py-4">Institutions Included</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-mg-border/30 text-sm">
                        {[
                          { cat: "Government Medical & Dental Colleges", quota: "15% All India Quota (AIQ)", by: "MCC (Central)", inst: "All state government medical/dental colleges across India" },
                          { cat: "Central Universities & National Institutes", quota: "100% Seats", by: "MCC (Central)", inst: "AIIMS (all campuses), JIPMER Puducherry, BHU, AMU, JMI, and DU colleges" },
                          { cat: "Deemed Universities", quota: "100% Seats", by: "MCC (Central)", inst: "All private Deemed medical and dental colleges nationwide" },
                          { cat: "Special Pools (ESIC & AFMC)", quota: "Specific Quotas", by: "MCC (Central)", inst: "ESIC Insured Persons quota seats and AFMC Pune initial registration" },
                        ].map((row, i) => (
                          <tr key={i} className="transition-colors hover:bg-mg-surface-low/50">
                            <td className="px-6 py-4 font-bold text-mg-on-bg">{row.cat}</td>
                            <td className="px-6 py-4 font-medium text-mg-on-surface">{row.quota}</td>
                            <td className="px-6 py-4 text-mg-on-surface">{row.by}</td>
                            <td className="px-6 py-4 text-mg-on-surface">{row.inst}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Rounds Section */}
              <section id="rounds">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-[13px] font-semibold uppercase tracking-widest text-mg-primary">Round Actions</span>
                  <div className="h-px flex-1 bg-mg-border/40" />
                </div>
                <h2 className="mb-4 flex items-center gap-2 text-[28px] font-semibold leading-[1.3] text-mg-on-bg">
                  <span className="material-symbols-outlined text-mg-primary">layers</span>
                  Counselling Rounds &amp; Rules
                </h2>
                <CounsellingRounds />
              </section>

              {/* Seat Matrix 2026 */}
              <section id="seat-matrix">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-[13px] font-semibold uppercase tracking-widest text-mg-primary">Seat Matrix 2026</span>
                  <div className="h-px flex-1 bg-mg-border/40" />
                </div>
                <h2 className="mb-4 flex items-center gap-2 text-[28px] font-semibold leading-[1.3] text-mg-on-bg">
                  <span className="material-symbols-outlined text-mg-primary">analytics</span>
                  Total Seats Under NEET UG 2026
                </h2>

                {/* Seat summary cards */}
                <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
                  {[
                    { icon: "add_home_work", label: "Total MBBS Seats", value: "1,08,940", sub: "Govt + Private + Deemed", text: "text-blue-600" },
                    { icon: "medication_liquid", label: "BDS Seats", value: "26,949", sub: "Govt + Private", text: "text-green-600" },
                    { icon: "eco", label: "AYUSH Seats", value: "52,720+", sub: "BAMS, BHMS, BSMS, BUMS", text: "text-teal-600" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-mg-border/40 bg-mg-surface p-5 shadow-sm">
                      <span className={`material-symbols-outlined mb-2 text-[18px] ${s.text}`}>{s.icon}</span>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-mg-on-surface">{s.label}</p>
                      <p className="mt-1 text-2xl font-bold text-mg-on-bg">{s.value}</p>
                      <p className="text-[10px] text-mg-on-surface">{s.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Detailed seat table */}
                <div className="overflow-hidden rounded-xl border border-mg-border/40 bg-mg-surface">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-mg-border/40 bg-mg-surface-container text-[11px] font-semibold uppercase tracking-widest text-mg-on-surface">
                          <th className="px-6 py-4">Programme</th>
                          <th className="px-6 py-4 text-right">Government</th>
                          <th className="px-6 py-4 text-right">Private / Deemed</th>
                          <th className="px-6 py-4 text-right">Central / AIIMS</th>
                          <th className="px-6 py-4 text-right">Total Seats</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-mg-border/30 text-sm">
                        {[
                          { prog: "MBBS", govt: "56,943", private: "48,012", central: "3,985+", total: "1,08,940+" },
                          { prog: "BDS", govt: "8,870", private: "18,079", central: "—", total: "26,949" },
                          { prog: "BAMS (Ayurveda)", govt: "13,516", private: "26,200+", central: "—", total: "39,716+" },
                          { prog: "BHMS (Homeopathy)", govt: "3,280", private: "9,724", central: "—", total: "13,004" },
                          { prog: "BVSc & AH", govt: "3,489", private: "—", central: "—", total: "3,489" },
                        ].map((row, i) => (
                          <tr key={i} className="transition-colors hover:bg-mg-surface-low/50">
                            <td className="px-6 py-4 font-bold text-mg-on-bg">{row.prog}</td>
                            <td className="px-6 py-4 text-right text-mg-on-surface">{row.govt}</td>
                            <td className="px-6 py-4 text-right text-mg-on-surface">{row.private}</td>
                            <td className="px-6 py-4 text-right font-medium text-mg-on-surface">{row.central}</td>
                            <td className="px-6 py-4 text-right font-bold text-mg-primary">{row.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="mt-3 pl-1 text-[11px] text-mg-on-surface/70">
                  * Seat counts are based on MCC, AACCC, and VCI official data for AY 2025–26. Final 2026 seat matrix will be published before Round 1 registration.
                </p>
              </section>

              {/* Official Links */}
              <section id="official-links">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-[13px] font-semibold uppercase tracking-widest text-mg-primary">Official Resources</span>
                  <div className="h-px flex-1 bg-mg-border/40" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { icon: "link", title: "MCC — Medical Counselling Committee", desc: "Central counselling for AIQ 15% seats, AIIMS, JIPMER, Deemed, and Central Universities.", url: "https://mcc.nic.in", label: "mcc.nic.in", hover: "hover:bg-blue-50", iconBg: "bg-blue-100 text-blue-700", labelColor: "text-mg-primary" },
                    { icon: "link", title: "AACCC — Ayush Admissions Central", desc: "Centralized AYUSH seat allotment for BAMS, BHMS, BUMS, and BSMS programmes under MCC.", url: "https://aaccc.gov.in", label: "aaccc.gov.in", hover: "hover:bg-green-50", iconBg: "bg-green-100 text-green-700", labelColor: "text-green-700" },
                    { icon: "link", title: "VCI — Veterinary Council of India", desc: "BVSc & AH seat counselling for government veterinary colleges across India.", url: "https://vci.admissions.nic.in", label: "vci.admissions.nic.in", hover: "hover:bg-orange-50", iconBg: "bg-orange-100 text-orange-700", labelColor: "text-orange-700" },
                    { icon: "map", title: "State Counselling Authority Directory", desc: "All 28 state DME / CET Cell portals for MBBS, BDS, and private college admissions.", url: "/neet-ug-2026/counselling-websites", label: "View State Portals", hover: "hover:bg-teal-50", iconBg: "bg-teal-100 text-teal-700", labelColor: "text-teal-700", internal: true },
                  ].map((link) => (
                    <a
                      key={link.title}
                      href={link.url}
                      target={link.internal ? undefined : "_blank"}
                      rel={link.internal ? undefined : "noopener noreferrer"}
                      className={`group flex items-start gap-4 rounded-lg border border-mg-border/40 bg-mg-surface p-4 no-underline transition-colors ${link.hover}`}
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${link.iconBg}`}>
                        <span className="material-symbols-outlined text-[17px]">{link.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-mg-on-bg">{link.title}</h4>
                        <p className="text-xs text-mg-on-surface">{link.desc}</p>
                        <span className={`mt-1 flex items-center gap-1 text-xs font-bold ${link.labelColor}`}>
                          {link.label}
                          <span className="material-symbols-outlined text-[14px]">{link.internal ? "chevron_right" : "open_in_new"}</span>
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </div>

            {/* ── Right Sidebar Column ── */}
            <aside className="w-full shrink-0 space-y-6 lg:sticky lg:top-24 lg:w-80">
              {/* Document Checklist */}
              <DocumentChecklist />

              {/* Expert Help Card */}
              <SidebarLeadCard
                theme="dark"
                iconName="psychology"
                title="Need Expert Help?"
                description="Talk to our medical counsellors for personalized seat guidance."
                ctaText="Book Session"
                successTitle="Request Registered!"
                successDesc="Our expert will contact you shortly."
                showWhatsappHelp
              />
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
