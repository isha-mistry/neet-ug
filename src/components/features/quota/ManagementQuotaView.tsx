"use client";

import Link from "next/link";
import { QuotaHeader, QuotaCta, PremiumSectionHeader, QuotaPageShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel } from "./QuotaShared";
import {
  mqStatesData as mqStates,
  openClosedStatesData,
  quotaTheoryContent,
} from "./content";

export function ManagementQuotaView() {
  return (
    <QuotaPageShell current="Management Quota" className="pb-8" containerClassName="py-8 animate-fadeIn">
        {/* Hero Section: Management Quota Intro */}
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            <QuotaHeader
              eyebrow="Admission Guide 2026"
              title="Understanding"
              highlightedText="Management Quota (MQ)"
              description="A strategic pathway for medical aspirants seeking admission into private institutions across India, offering flexibility without domicile restrictions. We break down the complexities of MQ seats for the 2026 session."
              eyebrowIcon="verified"
              watermarkIcon="payments"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-clinical-soft">
                <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">person_check</span>
                <div>
                  <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Eligibility</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">NEET Qualified Candidates Only</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-clinical-soft">
                <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">public</span>
                <div>
                  <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Domicile Rules</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Open to all candidates across India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Open State Advantage: Glassmorphism / Vibrant CTA */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary via-primary to-primary-hover p-6 text-on-primary shadow-[0_18px_42px_-22px_color-mix(in_srgb,var(--color-primary)_55%,transparent)] lg:col-span-4 h-fit">
            <div className="absolute -right-12 -top-12 opacity-10 pointer-events-none select-none">
              <span className="material-symbols-outlined text-[180px]">public</span>
            </div>
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[36px] mb-4 text-white">language</span>
              <h2 className="font-headline-md text-headline-md mb-4 font-bold text-white">Open State Advantage</h2>
              <p className="font-body-sm text-body-sm mb-6 opacity-90 text-white/90 leading-relaxed">
                Open states allow candidates from any state to apply for their private college management quota seats, presenting excellent options for students with moderate NEET scores.
              </p>
            </div>
            <a href="#open-states" className="relative z-10 w-full rounded-xl bg-surface-container-lowest py-3 text-center font-label-md font-bold uppercase tracking-wider text-primary transition-colors hover:bg-surface-bright active:scale-95">
              View Open States List
            </a>
          </div>
        </div>

        {/* Overview Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline-md text-headline-md flex items-center gap-2 text-on-surface font-bold">
              <span className="material-symbols-outlined text-primary text-[28px]">analytics</span>
              Overview
            </h2>
            <span className="text-label-md text-secondary italic tracking-wider">For private college admissions</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft transition-all hover:border-primary/40 hover:shadow-clinical-hover">
              <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider font-bold">Scope</p>
              <p className="text-title-lg font-title-lg mb-2 text-on-surface font-bold">~35-50% seats</p>
              <p className="text-body-sm text-on-surface-variant">In private medical colleges</p>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft transition-all hover:border-primary/40 hover:shadow-clinical-hover">
              <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider font-bold">Counselling</p>
              <p className="text-title-lg font-title-lg mb-2 text-on-surface font-bold">State Authorities</p>
              <p className="text-body-sm text-on-surface-variant">Conducted by respective state DME</p>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft transition-all hover:border-primary/40 hover:shadow-clinical-hover">
              <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider font-bold">Annual Fees</p>
              <p className="text-title-lg font-title-lg mb-2 text-on-surface font-bold">8 Lakhs – 25 Lakhs</p>
              <p className="text-body-sm text-on-surface-variant">Varies widely by state and college</p>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft transition-all hover:border-primary/40 hover:shadow-clinical-hover">
              <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider font-bold">Domicile Rule</p>
              <p className="text-title-lg font-title-lg mb-2 text-primary font-bold">Open To All States</p>
              <p className="text-body-sm text-on-surface-variant">No residency restriction for MQ</p>
            </div>
          </div>
          <div className="mt-6 bg-surface-container-high/50 p-4 rounded-lg flex items-start gap-4 border-l-4 border-primary shadow-sm border-t border-b border-r border-outline-variant/40">
            <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            <p className="text-body-sm text-on-surface leading-relaxed">
              <strong className="tracking-wider">Process Note:</strong> Management quota registrations and fee submission details vary for each state authority. Candidates must register on the state DME portals during the scheduled windows.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <QuotaInfoGrid
            items={[
              {
                icon: "receipt_long",
                title: "Budget beyond tuition",
                body: "Add hostel, mess, university, examination, insurance, caution deposit, and one-time admission charges before comparing colleges.",
              },
              {
                icon: "policy",
                title: "State rules still matter",
                body: "Management quota is not a direct admission shortcut. Applications, merit lists, seat allotment, and fee payments are governed by state counselling authorities.",
              },
              {
                icon: "trending_up",
                title: "Cutoffs can move sharply",
                body: "Open-state demand changes with fee revisions, new colleges, bond terms, and stray-round vacancy, so shortlist a wide rank and fee band.",
              },
            ]}
          />
        </section>

        <QuotaTheoryPanel className="mb-12" {...quotaTheoryContent.management} />

        {/* State-wise Management Quota Directory */}
        <section id="open-states" className="mb-12 scroll-mt-24">
          <h2 className="font-headline-md text-headline-md mb-2 text-on-surface font-bold">State-wise Management Quotas</h2>
          <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed">Highlights of key medical hubs and their estimated MQ cutoffs.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {mqStates.map((item, idx) => {
              return (
                <div key={idx} className="group overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft transition-shadow hover:shadow-clinical-hover">
                  <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-bright group-hover:bg-primary/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">location_on</span>
                      <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{item.state}</h3>
                    </div>
                    <span className="flex items-center gap-1 text-label-sm text-secondary bg-secondary-container px-2 py-1 rounded font-bold uppercase tracking-wider">
                      <span className="material-symbols-outlined text-xs">trending_down</span> Cutoff
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-surface-container p-4 rounded-lg border border-outline-variant/40">
                        <p className="text-label-sm text-on-surface-variant mb-1 font-bold tracking-wider">SEATS AVAILABLE</p>
                        <p className="font-bold text-lg text-on-surface">{item.seats}</p>
                      </div>
                      <div className="bg-surface-container p-4 rounded-lg border border-outline-variant/40">
                        <p className="text-label-sm text-on-surface-variant mb-1 font-bold tracking-wider">EXPECTED RANK</p>
                        <p className="font-bold text-lg text-primary">{item.rankRange}</p>
                      </div>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mb-6 leading-relaxed min-h-[40px]">{item.notes}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-outline-variant/40">
                      <span className="text-label-md text-secondary font-bold tracking-wider">ESTIMATED CUTOFF</span>
                      <Link className="text-primary font-label-md flex items-center gap-1 hover:underline font-bold uppercase tracking-wider" href={item.link}>
                        Counselling Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Open vs Closed States Comparison */}
        <section className="mb-12">
          <PremiumSectionHeader icon="swap_horiz" title="Open States vs. Closed States Policies" subtitle="Understanding residency eligibility for Private Management seats" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Open States */}
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft">
              <h3 className="text-title-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">lock_open</span> Open States (Allows Non-Domicile Candidates)
              </h3>
              <div className="space-y-4">
                {openClosedStatesData.open.map((item) => (
                  <div key={item.state} className="p-3 bg-surface-container-low/40 rounded-lg border border-outline-variant/40 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-on-surface text-sm">{item.state}</div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">{item.seats} • {item.avgFee}</div>
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-wider">{item.remark}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Closed States */}
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft">
              <h3 className="text-title-lg font-bold text-error mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">lock</span> Closed/Restricted States (Domicile Mandatory)
              </h3>
              <div className="space-y-4">
                {openClosedStatesData.closed.map((item) => (
                  <div key={item.state} className="p-3 bg-surface-container-low/40 rounded-lg border border-outline-variant/40">
                    <div className="font-bold text-on-surface text-sm">{item.state}</div>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{item.rule}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <QuotaProcessList
          className="mb-12"
          title="Management Quota Decision Flow"
          subtitle="A cleaner way to compare private college options before locking choices."
          steps={[
            { title: "Confirm open or restricted status", body: "Check whether the state allows non-domicile candidates for private management seats in the current bulletin." },
            { title: "Map total payable cost", body: "Compare annual tuition, hostel, refundable deposits, bond penalty, and payment schedule across the full course duration." },
            { title: "Check college risk factors", body: "Review NMC recognition, permitted intake, hospital load, bond service terms, and recent fee fixation orders." },
            { title: "Rank choices by fit", body: "Order colleges by academics, affordability, location, and cutoff realism instead of placing the lowest fee option blindly first." },
          ]}
        />

        {/* Compare Fees Section */}
        <QuotaCta
          title="Compare Private College Fee Structures"
          description="Don't get overwhelmed by complex fee structures. Access our comprehensive database of management quota seat matrices and year-wise fees for all open states."
          actions={[
            {
              label: "Compare Colleges",
              href: "#",
              variant: "primary",
            },
            {
              label: "Download Brochure",
              href: "#",
              variant: "secondary",
            }
          ]}
        />

        {/* Confused about MQ? Card */}
        <section className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft md:flex-row md:p-8">
          <div className="flex-1">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-2">Not sure if this college fits your rank?</h2>
            <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Compare fees, bond, and cutoffs with similar colleges — or talk to our counselling team for a free second opinion.
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="w-full md:w-auto bg-surface-container-lowest border border-outline-variant px-6 py-3.5 rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-low transition-colors text-xs cursor-pointer flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-primary">view_quilt</span>
              Compare colleges
            </button>
            <button className="w-full md:w-auto bg-primary text-on-primary px-6 py-3.5 rounded-lg font-bold hover:bg-primary-hover transition-all shadow-md text-xs cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]">
              <span className="material-symbols-outlined text-white">chat_bubble</span>
              Free counselling
            </button>
          </div>
        </section>

    </QuotaPageShell>
  );
}
