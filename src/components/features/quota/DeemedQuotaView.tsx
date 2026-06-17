"use client";

import { QuotaHeader, QuotaCta, SeatMatrixDonut, PremiumSectionHeader, QuotaPageShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel } from "./QuotaShared";
import { MccCounsellingRounds } from "./MccContentBlocks";
import {
  mccCounsellingGuide,
  quotaTheoryContent,
  securityDepositsData,
} from "./content";

const { counsellingRounds } = mccCounsellingGuide;

export function DeemedQuotaView() {
  const deemedDeposit = securityDepositsData.find(d => d.type === "Deemed Universities");

  return (
    <QuotaPageShell current="Deemed Universities" className="pb-8" containerClassName="py-8 animate-fadeIn">
        {/* Page Header */}
        <QuotaHeader
          eyebrow="Information Bulletin"
          title="Deemed University"
          highlightedText="Quota"
          description="MCC conducts four online rounds for 100% Deemed University seats per Supreme Court directions (Dar-Us-Slam, 12.12.2022). Access detailed matrix, fee structures, and round-wise progression rules."
          eyebrowIcon="info"
          watermarkIcon="account_balance"
        />

        {/* Security Deposit Callout Box */}
        {deemedDeposit && (
          <section className="mb-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-error/20 bg-error-container/15 p-5 shadow-clinical-soft md:flex-row md:items-center md:p-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-error text-[24px] shrink-0 mt-0.5">warning</span>
              <div>
                <h4 className="text-body-sm font-bold text-error">Mandatory Refundable Security Deposit: {deemedDeposit.amount}</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed mt-1">{deemedDeposit.rules}</p>
              </div>
            </div>
            <div className="text-[10px] font-bold text-on-surface-variant bg-surface-container-high px-3 py-1.5 rounded-full border border-outline-variant/60 shrink-0 uppercase tracking-wider">
              Refundable Status: {deemedDeposit.refundable}
            </div>
          </section>
        )}

        {/* Overview Section (Bento Grid) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Management % */}
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 block font-bold">Management</span>
              <div className="text-headline-md font-headline-md font-bold text-on-surface mb-1">100% MCC</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">All seats are filled via centralized MCC counselling rounds.</p>
            </div>

            {/* Domicile Rule */}
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 block font-bold">Domicile Rule</span>
              <div className="text-headline-md font-headline-md font-bold text-on-surface mb-1">No Restrictions</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Open to all NEET-UG qualified candidates from across India.</p>
            </div>

            {/* Seat Matrix Placeholder */}
            <div className="flex items-center justify-between rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft md:col-span-2">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 block font-bold">Data Authority</span>
                <div className="font-title-lg text-title-lg text-on-surface font-bold">Prepared by MCC/DGHS, MoHFW</div>
              </div>
              <span className="material-symbols-outlined text-primary text-[40px]">verified_user</span>
            </div>

            {/* Critical Alert */}
            <div className="flex gap-4 rounded-2xl border border-error/20 bg-error-container p-6 shadow-clinical-soft md:col-span-2">
              <span className="material-symbols-outlined text-error text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              <div>
                <p className="font-label-md text-label-md text-on-error-container font-bold mb-1 tracking-wider uppercase">Critical Notice</p>
                <p className="font-body-sm text-body-sm text-on-error-container">Deemed Universities are strictly under MCC — not state counselling. OCI cardholders are treated at par with Indian citizens for UR (General) and NRI seats as per Supreme Court directions.</p>
              </div>
            </div>
          </div>

          {/* Round 3 Conversion Logic */}
          <div className="flex h-full flex-col justify-between rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft md:col-span-4">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">analytics</span>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface">Round 3 Seat Conversion</h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                During Round 3, unutilized Minority/NRI seats convert to Private Deemed UR seats to prevent vacancy after category exhaustion.
              </p>
            </div>

            <div className="flex items-center justify-between bg-surface-container rounded-lg p-4 relative overflow-hidden">
              <div className="text-center z-10">
                <p className="font-label-sm text-label-sm text-primary mb-1 uppercase tracking-wider font-bold">Reserved</p>
                <p className="font-label-md text-label-md leading-tight text-on-surface font-bold">NRI / Jain /<br/>Muslim</p>
              </div>
              <div className="relative flex items-center justify-center flex-grow">
                <span className="material-symbols-outlined text-outline-variant text-[36px]">arrow_forward</span>
              </div>
              <div className="text-center z-10">
                <p className="font-label-sm text-label-sm text-primary mb-1 uppercase tracking-wider font-bold">Converted</p>
                <p className="font-headline-sm text-headline-sm font-bold text-on-surface">UR</p>
              </div>
              {/* Subtle background graphic */}
              <div className="absolute -right-4 top-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <QuotaInfoGrid
            items={[
              {
                icon: "payments",
                title: "Fee visibility is essential",
                body: "Deemed universities can differ widely in tuition, hostel charges, bank guarantee rules, and annual escalation clauses. Compare full-course cost before filling choices.",
              },
              {
                icon: "verified_user",
                title: "MCC is the only allotment route",
                body: "For MBBS/BDS deemed seats, state counselling portals do not allot seats. Registration, choice filling, allotment, and reporting instructions flow through MCC.",
              },
              {
                icon: "groups",
                title: "Minority seats need proof",
                body: "Jain, Muslim, or other institutional minority claims require valid documents uploaded during the MCC window and verified during reporting.",
              },
            ]}
          />
        </section>

        <QuotaTheoryPanel className="mb-12" {...quotaTheoryContent.deemed} />

        {/* Enriched Deemed Reservation details */}
        <section className="mb-12 space-y-4 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-6 shadow-clinical-soft">
          <PremiumSectionHeader icon="gavel" title="Deemed University Reservation & Fee Structure Rules" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 rounded-xl border border-outline-variant bg-surface-container-low p-5">
              <h4 className="font-bold text-on-surface flex items-center gap-1.5 text-body-md">
                <span className="material-symbols-outlined text-primary">cancel</span>
                No Standard Caste-Based Reservations
              </h4>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Deemed Universities do not offer reservations for OBC, SC, ST, or EWS categories on standard seats. All seats (apart from NRI and institutional minority seats) are classified as general/open unreserved seats and allotted purely based on NEET-UG score rank.
              </p>
            </div>
            <div className="space-y-2 rounded-xl border border-outline-variant bg-surface-container-low p-5">
              <h4 className="font-bold text-on-surface flex items-center gap-1.5 text-body-md">
                <span className="material-symbols-outlined text-primary">groups</span>
                Minority Sub-Categories
              </h4>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Certain Deemed universities have minority quota reservations (e.g., Muslim Minority seats in Hamdard, Delhi; Jain Minority seats in Sumandeep, Vadodara). Candidates claiming these seats must upload valid community certificates during the MCC registration window.
              </p>
            </div>
          </div>
        </section>

        {/* Eligibility Conditions */}
        <section className="mb-12">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined text-primary text-[28px]">rule</span>
            Eligibility Conditions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft transition-colors hover:border-primary/50">
              <span className="material-symbols-outlined text-primary mb-4 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <h4 className="font-title-lg text-title-lg mb-2 font-bold text-on-surface">NEET Qualified</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Candidate must have qualified NEET-UG with the minimum percentile prescribed by NTA for the current year.</p>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft transition-colors hover:border-primary/50">
              <span className="material-symbols-outlined text-primary mb-4 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <h4 className="font-title-lg text-title-lg mb-2 font-bold text-on-surface">No Domicile Bar</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Residential status of any state does not affect eligibility for Deemed Quota seats via MCC.</p>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft transition-colors hover:border-primary/50">
              <span className="material-symbols-outlined text-primary mb-4 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <h4 className="font-title-lg text-title-lg mb-2 font-bold text-on-surface">UT Eligibility</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">All India Quota qualified candidates including J&amp;K and Ladakh UT are eligible for Deemed seats.</p>
            </div>
          </div>
        </section>

        <QuotaProcessList
          className="mb-12"
          title="Deemed University Choice Checklist"
          subtitle="Use this before submitting or locking MCC preferences."
          steps={[
            { title: "Read fee annexures", body: "Check official tuition, hostel, one-time fee, bank guarantee, refund, and penalty clauses for every deemed university on your list." },
            { title: "Separate management and NRI seats", body: "Keep management, NRI, and minority seat choices distinct because eligibility proof and financial commitment differ." },
            { title: "Track reporting deadlines", body: "After allotment, download the letter and complete college reporting within the MCC schedule to avoid forfeiture risk." },
            { title: "Review conversion impact", body: "Round 3 and stray vacancies can convert unfilled NRI or minority seats to UR management, changing realistic options." },
          ]}
        />

        {/* Counselling Rounds Flow */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">Deemed Counselling Rounds</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Step-by-step progression of the MCC counselling process for Deemed seats.</p>
          </div>
          <MccCounsellingRounds rounds={counsellingRounds.rounds} />
        </section>

        {/* Seat Matrix Breakdown Section (Analytical Card) */}
        <section className="mb-12">
          <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft">
            <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-title-lg text-title-lg font-bold text-on-surface">Deemed University Seat Distribution</h3>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider">
                  <div className="w-3 h-3 bg-primary rounded-full"></div> Management
                </span>
                <span className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider">
                  <div className="w-3 h-3 bg-tertiary-container rounded-full"></div> NRI Quota
                </span>
              </div>
            </div>
            <div className="p-6 flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/3 flex justify-center relative">
                {/* Progress Circle Chart via Component */}
                <SeatMatrixDonut percent={85} total="100%" label="Total Capacity" />
              </div>
              <div className="w-full md:w-2/3">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-label-md text-label-md font-bold uppercase text-on-surface tracking-wider">Management Seats</span>
                      <span className="font-label-md text-label-md font-bold text-primary">85% of Total</span>
                    </div>
                    <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden border border-outline-variant/20">
                      <div className="bg-primary h-full rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">Open to all Indian candidates. Fees are generally higher than government quotas.</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-label-md text-label-md font-bold uppercase text-on-surface tracking-wider">NRI Quota Seats</span>
                      <span className="font-label-md text-label-md font-bold text-tertiary">15% of Total</span>
                    </div>
                    <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden border border-outline-variant/20">
                      <div className="bg-tertiary-container h-full rounded-full" style={{ width: "15%" }}></div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">Reserved for candidates under NRI status. Documents verification is critical.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <QuotaCta
          title="Register on MCC for Deemed Seats"
          description="100% of Deemed University MBBS/BDS seats are allotted exclusively through the MCC online portal. Ensure you have your NEET UG credentials ready for the registration window."
          actions={[
            {
              label: "Visit MCC Portal",
              href: "https://mcc.nic.in",
              variant: "primary",
              isExternal: true,
            },
            {
              label: "All India Quota Guide",
              href: "/quota/all-india",
              variant: "secondary",
            }
          ]}
        />

    </QuotaPageShell>
  );
}
