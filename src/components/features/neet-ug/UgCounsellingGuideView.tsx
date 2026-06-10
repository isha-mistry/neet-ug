"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { CounsellingTimeline } from "@/components/features/neet-ug/counselling/CounsellingTimeline";
import { CounsellingRounds } from "@/components/features/neet-ug/counselling/CounsellingRounds";
import { DocumentChecklist } from "@/components/features/neet-ug/counselling/DocumentChecklist";
import { CounsellingFeeTable } from "@/components/features/neet-ug/counselling/CounsellingFeeTable";
import { neetUg2026Data } from "@/lib/data/neet-ug-2026";

export function UgCounsellingGuideView() {
  const { seatStatistics } = neetUg2026Data;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <>
      <Section tone="default" className=" py-7 md:py-10">
        <Container size="2xl">
          {/* Breadcrumb */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "NEET UG 2026", href: "/neet-ug-2026" },
              { label: "Counselling Guide" },
            ]}
          />

          {/* Hero */}
          <section className="mb-6 mt-4">
            <h1 className="text-[2.8rem] font-bold leading-[1.1] tracking-[-0.02em] text-mg-on-bg">
              NEET UG Counselling Step-by-Step Guide
            </h1>
            <p className="mt-3 max-w-3xl text-[18px] leading-[1.6] text-mg-on-surface">
              Navigate NEET UG counselling with a clearer view of registration, choice locking, allotment, reporting, and seat matrix rules across MCC and state rounds.
            </p>
          </section>

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
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${m.bg} ${m.text}`}>
                      <span className="material-symbols-outlined text-[22px]">{m.icon}</span>
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-mg-primary-bright text-white">
                    <span className="material-symbols-outlined text-[28px]">help_center</span>
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
                    <div className="flex gap-3">
                      <span className="material-symbols-outlined shrink-0 text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <p className="text-sm">
                        <strong>MCC Central Quota (15%):</strong> AIQ govt seats, AIIMS, JIPMER, Deemed &amp; Central Universities. Open to all India.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="material-symbols-outlined shrink-0 text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <p className="text-sm">
                        <strong>State Quota (85%):</strong> Respective state government and private colleges. Domicile certificates required.
                      </p>
                    </div>
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
                  {/* MCC Card */}
                  <div className="flex flex-col rounded-xl border border-blue-100 bg-gradient-to-br from-mg-surface to-blue-50 p-6 shadow-sm">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-mg-primary text-white">
                      <span className="material-symbols-outlined text-[28px]">account_balance</span>
                    </div>
                    <h3 className="mb-2 text-[22px] font-semibold text-mg-on-bg">MCC Central Counselling (15% AIQ)</h3>
                    <p className="mb-6 flex-1 text-[14px] leading-relaxed text-mg-on-surface">
                      Covers all central institutions (AIIMS, JIPMER), Deemed Universities, and 15% of seats in every state-run government medical college. No domicile certificate is needed. Anyone from any state can claim these seats based purely on their NEET AIR.
                    </p>
                    {/* <button className="w-full rounded-lg bg-mg-primary py-3 font-bold text-white transition-colors hover:bg-mg-primary/90">
                      View MCC Guidelines
                    </button> */}
                  </div>
                  {/* State Card */}
                  <div className="flex flex-col rounded-xl border border-green-100 bg-gradient-to-br from-mg-surface to-green-50 p-6 shadow-sm">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 text-white">
                      <span className="material-symbols-outlined text-[28px]">map</span>
                    </div>
                    <h3 className="mb-2 text-[22px] font-semibold text-mg-on-bg">State Quota Counselling (85% State)</h3>
                    <p className="mb-6 flex-1 text-[14px] leading-relaxed text-mg-on-surface">
                      Covers the remaining 85% of seats in state government colleges and 100% of seats in state private colleges. Managed by each state&apos;s DME/CET Cell. Requires a valid State Domicile/Residence proof to apply for government quota seats.
                    </p>
                    {/* <Link
                      href="/neet-ug-2026/counselling-websites"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-bold text-white no-underline transition-colors hover:bg-green-700"
                    >
                      View State Portals Directory
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link> */}
                  </div>
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
                    <div key={s.label} className="rounded-xl border border-mg-border/40 bg-mg-surface p-5">
                      <span className={`material-symbols-outlined mb-2 ${s.text}`}>{s.icon}</span>
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
                      className={`group flex items-start gap-4 rounded-xl border border-mg-border/40 bg-mg-surface p-4 no-underline transition-colors ${link.hover}`}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${link.iconBg}`}>
                        <span className="material-symbols-outlined">{link.icon}</span>
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
              <div className="overflow-hidden rounded-xl bg-mg-dark text-white">
                {/* Header area */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-300">psychology</span>
                    <h3 className="font-bold text-white">Need Expert Help?</h3>
                  </div>
                  <p className="text-xs text-blue-100">Talk to our medical counsellors for personalized seat guidance.</p>
                </div>

                {/* Form area */}
                {submitted ? (
                  <div className="flex flex-col items-center gap-3 p-6 text-center">
                    <span className="material-symbols-outlined text-[40px] text-emerald-400">check_circle</span>
                    <h4 className="font-bold text-white">Request Registered!</h4>
                    <p className="text-xs text-blue-100">Our expert will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 p-6">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Priyesh Patel"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-blue-200">WhatsApp Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 font-bold text-blue-900 shadow-lg shadow-blue-900/50 transition-all hover:bg-blue-50 active:scale-95 disabled:opacity-60"
                    >
                      {loading ? "Processing..." : "Book Session"}
                      {!loading && <span className="material-symbols-outlined text-sm">verified</span>}
                    </button>
                  </form>
                )}

                {/* WhatsApp row */}
                <div className="p-6 pt-0">
                  <div className="flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500">
                      <span className="material-symbols-outlined text-sm text-white">chat</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase leading-none text-green-400">WhatsApp Help</p>
                      <p className="mt-1 text-[12px] font-medium leading-tight text-white">Enquire via WhatsApp</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
