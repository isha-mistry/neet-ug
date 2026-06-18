"use client";

import Link from "next/link";
import { QuotaHeader, QuotaMetrics, QuotaCta, SeatMatrixDonut, CategoryProgressBars, PremiumSectionHeader, QuotaPageShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel, LiveDecisionTools } from "./QuotaShared";
import { ConversionAlgorithmGrid, EligibilityChecklist, MccCounsellingRounds } from "./MccContentBlocks";
import { FiAlertTriangle } from "react-icons/fi";
import {
  aiqMetrics,
  quotaTheoryContent,
  mccCounsellingGuide,
  getMccChapterConversionRules,
  getCentralReservationCategories,
} from "./content";

const { chapters, counsellingRounds } = mccCounsellingGuide;
const aiqChapter = chapters.aiq;

const aiqCategoryShares = [
  { label: "OPEN", percentage: "50%", value: 50, color: "bg-primary" },
  { label: "OBC", percentage: "27%", value: 27, color: "bg-primary-container" },
  { label: "SC", percentage: "15%", value: 15, color: "bg-error" },
  { label: "EWS", percentage: "10%", value: 10, color: "bg-tertiary-container" },
  { label: "ST", percentage: "7.5%", value: 7.5, color: "bg-outline" },
];

export function AllIndiaQuotaView() {
  const conversionRules = getMccChapterConversionRules(aiqChapter);
  const reservationCategories = getCentralReservationCategories();

  return (
    <QuotaPageShell current="All India Quota" className="py-12" containerClassName="animate-fadeIn">
      {/* 12-Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">

        {/* Main Column */}
        <div className="lg:col-span-9 space-y-12">

          {/* Hero Header Card */}
          <QuotaHeader
            eyebrow="Information Bulletin"
            title="All India Quota"
            highlightedText="(AIQ) Explained"
            description="Four rounds of online AIQ counselling for NEET-UG qualified candidates. Domicile-free access to 15% seats in state government colleges and listed open pools nationwide."
            eyebrowIcon="info"
            watermarkIcon="public"
          />

          {/* Key Facts Grid */}
          <QuotaMetrics metrics={aiqMetrics} />

          <QuotaInfoGrid
            items={[
              {
                icon: "how_to_reg",
                title: "Who should prioritize AIQ",
                body: "Candidates with competitive all-India ranks should keep AIQ active because it opens government, AIIMS, JIPMER, and central institute choices beyond the home state.",
              },
              {
                icon: "fact_check",
                title: "Choice filling discipline",
                body: "Fill preferences in true desirability order. MCC allotment checks rank, category, eligibility, and vacancy against your submitted order, not against fee or distance assumptions.",
              },
              {
                icon: "sync_alt",
                title: "Upgrade strategy",
                body: "Round 1 reporting, willingness options, and Round 2 joining decisions can affect later eligibility. Track every allotment result before choosing exit, upgrade, or surrender.",
              },
            ]}
          />

          <QuotaTheoryPanel {...quotaTheoryContent.aiq} />

          {/* Detailed Counselling Policy & Warnings */}
          <section className="bg-surface-container-low/40 rounded-xl p-6 border border-outline-variant/50 space-y-4">
            <PremiumSectionHeader icon="gavel" title="Important Counselling Rules & Policies" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-clinical-soft">
                <h4 className="font-bold text-on-surface mb-2 flex items-center gap-1.5 text-body-md">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  Round 1 Free Exit Rule
                </h4>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                  Round 1 is a completely free exit round. If you are allotted a seat, you can choose not to report/join the college. Your registration and security deposit will remain completely safe, and you will automatically remain eligible for Round 2 without any penalty.
                </p>
              </div>
              <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-clinical-soft">
                <h4 className="font-bold text-on-surface mb-2 flex items-center gap-1.5 text-body-md">
                  <span className="material-symbols-outlined text-error text-lg">warning</span>
                  Round 2+ Security Deposit Forfeiture
                </h4>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                  From Round 2 onwards, if a seat is allotted and you fail to report/join, your security deposit (₹10,000 for UR/EWS or ₹5,000 for SC/ST/OBC) will be forfeited. In the Stray Vacancy round, non-joining candidates are also barred from appearing in NEET-UG the subsequent academic year.
                </p>
              </div>
            </div>
          </section>

          {/* Reservation Policy Table & Visual Charts */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-headline-md font-headline-md">Reservation Policy for 15% AIQ Seats</h2>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">15% AIQ roster applied by MCC/DGHS as per DoPT, MoHFW norms (2026 Updates).</p>
              </div>
              <div className="bg-surface-container-high px-4 py-1.5 rounded-full text-label-md font-label-md text-on-surface hidden sm:block">
                Updated: Jan 2026
              </div>
            </div>

            <div className="flex flex-col w-full gap-6 items-start">
              {/* Table Block */}
              <div className="overflow-hidden w-full rounded-2xl border border-outline-variant/60 bg-surface-container-lowest shadow-clinical-soft xl:col-span-2">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider text-right">Quota %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant text-body-md">
                    {reservationCategories.map((row) => (
                      <tr key={row.category} className="hover:bg-surface-container transition-colors">
                        <td className="px-6 py-4 font-semibold text-on-surface">{row.category}</td>
                        <td className="px-6 py-4 text-right text-primary font-bold">{row.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* SVG Visual Charts */}
              <div className="xl:col-span-1 flex gap-6 w-full">
                <SeatMatrixDonut percent={15} total="15%" label="Govt Seats Share" />
                <CategoryProgressBars items={aiqCategoryShares} />
              </div>
            </div>

            {/* Warning Alert Banner */}
            <div className="mt-6 p-4 rounded-xl bg-error-container text-on-error-container text-body-sm font-body-sm flex items-start gap-3 border border-error/25 shadow-sm">
              <FiAlertTriangle className="text-lg shrink-0 mt-0.5 text-error" />
              <p>
                <strong>Important:</strong> AIQ uses the <strong>Central OBC-NCL list</strong>. State-only OBC certificates are not valid. PwD reservation is 5% horizontal on AIQ seats.
              </p>
            </div>
          </section>

          {/* Domicile Free Seat Pools */}
          <section>
            <h2 className="text-headline-md font-headline-md text-center mb-8">Open (Domicile-Free) Seat Pools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiqChapter.openSeatsDomicileFree?.map((seat) => (
                <div key={seat} className="flex items-center gap-4 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-5 shadow-clinical-soft transition-shadow hover:shadow-clinical-hover">
                  <span className="material-symbols-outlined text-primary bg-primary/10 p-3 rounded-full" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-body-md font-body-md font-semibold text-on-surface">{seat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Counselling Rounds Horizontal journey flow */}
          <section>
            <h2 className="text-headline-md font-headline-md mb-8 text-center">AIQ Counselling Rounds</h2>
            <MccCounsellingRounds rounds={counsellingRounds.rounds} />
          </section>

          <QuotaProcessList
            title="AIQ Application Readiness"
            subtitle="Use this sequence before the MCC registration window closes."
            steps={[
              { title: "Verify NEET credentials", body: "Keep NEET roll number, application number, date of birth, category, and PwD status exactly as issued by NTA." },
              { title: "Prepare category proof", body: "Central OBC-NCL, EWS, SC, ST, and PwD documents must match MCC rules and validity dates for the current admission cycle." },
              { title: "Shortlist by closing rank", body: "Compare previous AIQ closing ranks across R1, R2, R3, and stray vacancy instead of relying on a single round's cutoff." },
              { title: "Save allotment evidence", body: "Download allotment letters, payment receipts, resignation slips, and joining confirmations after each round for dispute-free reporting." },
            ]}
          />

          {/* OCI Rules & Conversion side-by-side */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* OCI/PIO Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-l-4 border-outline-variant/60 border-l-tertiary bg-surface-container-lowest p-6 shadow-clinical-soft transition-shadow hover:shadow-clinical-hover">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-tertiary text-2xl">passkey</span>
                  <h3 className="text-title-lg font-title-lg text-on-surface">OCI/PIO Candidate Rules</h3>
                </div>
                <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  Overseas Citizens of India (OCI) and Persons of Indian Origin (PIO) candidates registered before <strong>March 4, 2021</strong> are treated exactly like Indian citizens. They can claim open general seats as well as NRI seats. Candidates registered after this date are treated as foreign nationals and are only eligible for NRI quota seats.
                </p>
              </div>
            </div>

            {/* R3 Conversion Card */}
            <ConversionAlgorithmGrid
              rules={conversionRules}
              note={aiqChapter.conversionNote}
            />
          </section>

          {/* Final CTA Banner */}
          <QuotaCta
            title="Ready to apply?"
            description="Registration for AIQ counselling occurs exclusively on the official Medical Counselling Committee portal. Prepare your documents early for a smooth process."
            actions={[
              {
                label: "Visit Official MCC Portal",
                href: "https://mcc.nic.in",
                variant: "primary",
                isExternal: true,
              }
            ]}
            footerNote="REDIRECTS TO MCC.NIC.IN • SECURE OFFICIAL GOVT LINK"
          />

        </div>

        {/* Sticky Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="sticky top-24 space-y-6">

            {/* Live Decision Tools Component */}
            <LiveDecisionTools highlightId="cutoff" />

            {/* Eligibility Checklist */}
            <EligibilityChecklist
              items={aiqChapter.eligibility || []}
              title="Eligibility Checklist"
            />

            {/* Disclaimer */}
            <div className="p-4 bg-surface-container-high/60 border border-outline-variant/40 rounded-xl text-center leading-relaxed italic text-[11px] text-on-surface-variant">
              For state quota and private colleges, contact the respective state government/admission authority — MCC cannot guide on state admissions.
            </div>

          </div>
        </aside>

      </div>
    </QuotaPageShell>
  );
}
