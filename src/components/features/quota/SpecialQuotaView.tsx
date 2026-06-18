"use client";

import Link from "next/link";
import { QuotaHeader, QuotaPageShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel } from "./QuotaShared";
import { quotaTheoryContent } from "./content";
import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";

export function SpecialQuotaView() {
  return (
    <QuotaPageShell current="Special & Institutional Quotas">
      <QuotaHeader
        eyebrow="Special Guidelines"
        title="Special &amp; Institutional"
        highlightedText="Quotas"
        description="Detailed guide for Medical Counselling Committee (MCC) conducted seats in Central Universities, AIIMS, JIPMER, and specialized institutional quotas. Precision data for informed medical admissions."
        eyebrowIcon="verified"
        watermarkIcon="school"
      />

      <section className="mb-8">
        <QuotaInfoGrid
          items={[
            {
              icon: "assignment_ind",
              title: "Eligibility is narrowly defined",
              body: "Institutional, ESIC, DU, AMU, JIPMER, and AFMC claims require precise certificates and usually cannot be corrected after the registration window.",
            },
            {
              icon: "military_tech",
              title: "AFMC is not simple allotment",
              body: "MCC registration only places candidates into the AFMC process. Final selection depends on screening, aptitude testing, medical fitness, and interview stages.",
            },
            {
              icon: "rule_folder",
              title: "Conversion rules matter",
              body: "Unfilled special seats can convert in later rounds, so candidates outside the original pool should still understand round-wise vacancy movement.",
            },
          ]}
        />
      </section>

      <QuotaTheoryPanel className="mb-8" {...quotaTheoryContent.special} />

      {/* Main Content Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Content: Primary Information (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-8">

          {/* Central Institutions Overview */}
          <section className="rounded-2xl border border-outline-variant/40 bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)] p-5 md:p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
              <h2 className="font-headline-md text-headline-md">Central Institutions &amp; AFMC</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-low p-4">
                <div>
                  <h3 className="font-title-lg text-title-lg mb-2 font-bold">AIIMS &amp; JIPMER</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">100% seats are contributed to MCC. JIPMER includes Internal Quota for Puducherry residents.</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 bg-tertiary-container text-on-tertiary-container rounded text-label-sm font-label-sm font-bold uppercase tracking-wider">High Priority</span>
                  <span className="px-2 py-1 bg-secondary-container text-on-secondary-container rounded text-label-sm font-label-sm font-bold uppercase tracking-wider">Central Gov</span>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-low p-4">
                <div>
                  <h3 className="font-title-lg text-title-lg mb-2 font-bold">AFMC Pune Selection Rules</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">MCC registration is mandatory. Screened candidates (typical NEET score: 625+ for boys, 645+ for girls) must undergo the ToELR, PAT, and physical medical interview at Pune.</p>
                </div>
                <a href="#afmc-flow" className="mt-4 text-primary font-label-md text-label-md flex items-center gap-1 hover:underline font-bold uppercase tracking-wider">
                  View Registration Flow <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
            </div>
          </section>

          {/* Reservation & Conversion Logic Table */}
          <section className="rounded-2xl border border-outline-variant/40 bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)] p-5 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>rule</span>
                <h2 className="font-headline-md text-headline-md">Round 3 Seat Conversion Logic</h2>
              </div>
              <span className="material-symbols-outlined text-outline cursor-help text-[24px]" title="Policy as per latest MCC handbook">info</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm border-collapse">
                <thead>
                  <tr className="bg-surface-container-high text-on-surface-variant">
                    <th className="p-3 font-label-md text-label-md uppercase tracking-wider rounded-tl-lg font-bold">Original Category</th>
                    <th className="p-3 font-label-md text-label-md uppercase tracking-wider font-bold">Converted Category</th>
                    <th className="p-3 font-label-md text-label-md uppercase tracking-wider rounded-tr-lg font-bold">Condition</th>
                  </tr>
                </thead>
                <tbody className="[&>tr:nth-child(even)]:bg-surface-container-low/50">
                  <tr className="border-b border-outline-variant hover:bg-primary/5 transition-colors duration-200">
                    <td className="p-4 font-bold">ST (PwD)</td>
                    <td className="p-4 text-primary font-bold">ST</td>
                    <td className="p-4 text-on-surface-variant">Non-availability of ST PwD candidates</td>
                  </tr>
                  <tr className="border-b border-outline-variant hover:bg-primary/5 transition-colors duration-200">
                    <td className="p-4 font-bold">SC (PwD)</td>
                    <td className="p-4 text-primary font-bold">SC</td>
                    <td className="p-4 text-on-surface-variant">Non-availability of SC PwD candidates</td>
                  </tr>
                  <tr className="border-b border-outline-variant hover:bg-primary/5 transition-colors duration-200">
                    <td className="p-4 font-bold">OBC (PwD)</td>
                    <td className="p-4 text-primary font-bold">OBC</td>
                    <td className="p-4 text-on-surface-variant">Non-availability of OBC PwD candidates</td>
                  </tr>
                  <tr className="border-b border-outline-variant hover:bg-primary/5 transition-colors duration-200">
                    <td className="p-4 font-bold">UR (PwD)</td>
                    <td className="p-4 text-primary font-bold">UR</td>
                    <td className="p-4 text-on-surface-variant">Non-availability of UR PwD candidates</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors duration-200">
                    <td className="p-4 font-bold">NRI / OCI</td>
                    <td className="p-4 text-primary font-bold">UR Management</td>
                    <td className="p-4 text-on-surface-variant">Final conversion in Mop-up/Stray rounds</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ESIC Insured Persons Details */}
          <section className="relative overflow-hidden rounded-2xl border border-primary/15 bg-linear-to-br from-primary via-primary to-primary-hover p-6 text-on-primary shadow-[0_18px_42px_-22px_color-mix(in_srgb,var(--color-primary)_55%,transparent)]">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 text-white">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <h2 className="font-headline-md text-headline-md font-bold">ESIC Insured Persons (IP) Quota</h2>
              </div>
              <p className="font-body-md text-body-md mb-4 text-white/90 max-w-2xl leading-relaxed">
                Special reservation for children of Insured Persons (IP) who contribute to the ESIC scheme. Seats are allocated across 3 priority levels:
              </p>
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-white/80">
                <div className="bg-white/5 p-3 rounded border border-white/10">
                  <strong>Priority 1:</strong> Wards of active Insured Persons currently contributing and meeting threshold.
                </div>
                <div className="bg-white/5 p-3 rounded border border-white/10">
                  <strong>Priority 2:</strong> Wards of deceased/disabled Insured Persons who were under coverage.
                </div>
                <div className="bg-white/5 p-3 rounded border border-white/10">
                  <strong>Priority 3:</strong> Other eligible dependents as per ESIC medical board guidelines.
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 text-white">
                  <span className="font-label-md text-label-md block mb-1 text-white/70 uppercase tracking-wider font-bold text-[10px]">ELIGIBILITY</span>
                  <span className="font-title-lg text-title-lg font-bold">Ward of IP Certificate</span>
                </div>
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 text-white">
                  <span className="font-label-md text-label-md block mb-1 text-white/70 uppercase tracking-wider font-bold text-[10px]">ANNUAL FEE</span>
                  <span className="font-title-lg text-title-lg font-bold">₹ 24,000/yr*</span>
                </div>
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 text-white">
                  <span className="font-label-md text-label-md block mb-1 text-white/70 uppercase tracking-wider font-bold text-[10px]">TOTAL SEATS</span>
                  <span className="font-title-lg text-title-lg font-bold">~400+ Seats</span>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
          </section>

          {/* Central University Details (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-outline-variant/40 bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)] p-5 md:p-6">
              <h3 className="font-headline-sm text-headline-sm mb-4 border-b border-outline-variant pb-2 font-bold">Delhi University (DU)</h3>
              <ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="leading-relaxed">85% Institutional Quota for candidates who passed 11th &amp; 12th from Delhi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="leading-relaxed">Colleges: MAMC, LHMC, UCMS.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant/40 bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)] p-5 md:p-6">
              <h3 className="font-headline-sm text-headline-sm mb-4 border-b border-outline-variant pb-2 font-bold">AMU &amp; BHU</h3>
              <ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="leading-relaxed">BHU: 100% seats open to all India candidates based on merit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="leading-relaxed">AMU: 50% Institutional quota for internal students.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Right Sidebar: Utilities & Ads (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Live Counselling Lead Form */}
            <FreeCounsellingLeadForm
              pageLabel="Special Quota"
              title="Book Expert Counselling"
              submitLabel="Submit Details"
              fields="name-phone-only"
              className="border border-outline-variant shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)] bg-surface"
            />

            {/* Info Alert */}
            <div className="flex gap-3 rounded-2xl border border-l-4 border-outline-variant border-l-tertiary bg-surface-container-lowest p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)]">
              <span className="material-symbols-outlined text-tertiary text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
              <div>
                <span className="font-label-md text-label-md text-tertiary block font-bold mb-1 uppercase tracking-wider">LATEST UPDATE</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">JIPMER Internal Quota registration is now separate within the MCC portal. Ensure certificate uploads before Round 1.</p>
              </div>
            </div>

            {/* Featured Image Card */}
            <div className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl border border-outline-variant shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Seat Matrix" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNxCUIVz64YIs-V2XKvctakH_HtiwuYXw5TSHfn7yKQxT_ArXg3GuETefqpU4W81XHaKXWK5s2PiheukoI_JUXQX2jAH0NP6GocotyLqAXudJ4fhok2Wk-t-2o7OMXOugaO3LfsiuM0ZmdGcJfjmvOIhiBl4JOYisClGY9RWSnK4B_FZlpfPFKh8bQQTDu1NSZE3mQNTVP5Vg0U3bcpPYq3j1-5u_9I2bMVmfWNI0LUzK8u01_JLQINHOOy2IXx55kt86l_lH0Sw0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="text-white font-title-lg text-title-lg font-bold">Seat Matrix Analysis 2024</span>
                <p className="text-white/80 font-body-sm text-body-sm leading-relaxed">Deep dive into category-wise distributions.</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-outline-variant/40 bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)] p-5 md:p-6">
              <h4 className="font-label-md text-label-md text-outline uppercase tracking-widest mb-4 font-bold">Related Tools</h4>
              <ul className="space-y-4">
                <li>
                  <Link className="flex items-center gap-3 text-body-md hover:text-primary group transition-colors" href="/rank-predictor">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px]">analytics</span>
                    <span className="font-medium">AIQ Rank Predictor</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-3 text-body-md hover:text-primary group transition-colors" href="#">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px]">account_balance_wallet</span>
                    <span className="font-medium">Fee Structure Analyser</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-3 text-body-md hover:text-primary group transition-colors" href="#">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px]">description</span>
                    <span className="font-medium">Reservation Policy PDF</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* AFMC Registration Flow Section */}
      <section className="mt-12" id="afmc-flow">
        <h2 className="font-headline-md text-headline-md mb-8 text-center font-bold">AFMC Registration &amp; Selection Flow</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
          {/* Connectors for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-outline-variant -z-10"></div>

          <div className="w-full rounded-2xl border border-outline-variant bg-surface p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)] transition-colors hover:border-primary/50 md:w-1/4">
            <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">1</div>
            <p className="font-label-md text-label-md font-bold uppercase tracking-wider">Register on MCC Portal</p>
          </div>

          <div className="w-full rounded-2xl border border-outline-variant bg-surface p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)] transition-colors hover:border-primary/50 md:w-1/4">
            <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">2</div>
            <p className="font-label-md text-label-md font-bold uppercase tracking-wider">Select AFMC Option</p>
          </div>

          <div className="w-full rounded-2xl border border-outline-variant bg-surface p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)] transition-colors hover:border-primary/50 md:w-1/4">
            <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">3</div>
            <p className="font-label-md text-label-md font-bold uppercase tracking-wider">AFMC Screening Call</p>
          </div>

          <div className="w-full rounded-2xl border border-outline-variant bg-surface p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)] transition-colors hover:border-primary/50 md:w-1/4">
            <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">4</div>
            <p className="font-label-md text-label-md font-bold uppercase tracking-wider">ToELR &amp; Interview</p>
          </div>
        </div>
      </section>

      <QuotaProcessList
        className="mt-12"
        title="Special Quota Verification Flow"
        subtitle="Use this before claiming institutional or priority seats."
        steps={[
          { title: "Identify the exact quota code", body: "Match your eligibility to the counselling brochure terminology, such as DU internal, JIPMER Puducherry, ESIC IP, CW, or minority." },
          { title: "Collect issuing authority proof", body: "Certificates must come from the listed authority and match the format, date, and dependency requirements in the bulletin." },
          { title: "Upload proof early", body: "Special quota uploads often close with registration or choice filling. Missing uploads usually block the claim even if you are otherwise eligible." },
          { title: "Monitor conversion rounds", body: "If special seats remain vacant, later conversion can change available UR or category seats in MCC rounds." },
        ]}
      />
    </QuotaPageShell>
  );
}
