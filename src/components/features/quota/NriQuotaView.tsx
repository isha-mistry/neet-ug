"use client";

import Link from "next/link";
import { QuotaHeader, PremiumSectionHeader, QuotaPageShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel, QuotaCta, LiveDecisionTools } from "./QuotaShared";

import { nriDocumentationCards as documentationCards, nriStatesData as nriStates, quotaTheoryContent } from "./content";

export function NriQuotaView() {
  return (
    <QuotaPageShell current="NRI Quota" className="pb-8" containerClassName="py-8 animate-fadeIn">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        {/* Left Content Area (8 Columns) */}
        <div className="lg:col-span-8 space-y-12">
          <QuotaHeader
            eyebrow="Global Aspirants"
            title="NRI Quota"
            highlightedText="Admission Portal"
            description="A comprehensive guide for Non-Resident Indians (NRI), Overseas Citizens of India (OCI), and Persons of Indian Origin (PIO) seeking medical admissions in India. Understand eligibility, documentation, and state-wise allocations."
            eyebrowIcon="public"
            watermarkIcon="public"
          />

          {/* Eligibility & Fees */}
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">Eligibility &amp; Fees</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Core requirements for NRI/OCI/PIO candidates and financial commitments for medical courses.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Applicant Profile */}
              <div className="flex h-full flex-col rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft transition-colors hover:border-primary/50">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mb-6 border border-primary-fixed-dim/20">
                  <span className="material-symbols-outlined text-primary text-[24px]">person</span>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-4 font-bold">Applicant Profile</h3>
                <ul className="space-y-4 flex-grow">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Includes NRI, OCI, and PIO candidates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Direct children or wards (Sponsorship rules vary by state)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"><strong>OCI/PIO Rules:</strong> OCI/PIO candidates registered before March 4, 2021 have the same seat claims as Indian citizens. Later registrants are eligible for NRI seats only.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-body-sm text-body-sm text-primary font-bold leading-relaxed">NEET UG Qualification is Mandatory</span>
                  </li>
                </ul>
              </div>

              {/* Financials */}
              <div className="flex h-full flex-col rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft transition-colors hover:border-tertiary/50">
                <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center mb-6 border border-tertiary-fixed-dim/20">
                  <span className="material-symbols-outlined text-tertiary text-[24px]">payments</span>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-4 font-bold">Financials</h3>
                <div className="space-y-6">
                  <div>
                    <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1 font-bold">Quota Restrictions</p>
                    <p className="font-title-lg text-title-lg text-primary font-bold">No Categories (SC/ST/OBC)</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">All NRI seats are merit-based within the quota.</p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/60">
                    <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1 font-bold">Course Fee Range</p>
                    <p className="font-title-lg text-title-lg text-on-surface font-bold">₹12 Lakhs – ₹45 Lakhs per annum</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">Typically paid in USD or equivalent INR depending on college policy.</p>
                  </div>
                  <div className="p-4 bg-error-container/15 border border-error/20 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-error text-[20px] shrink-0">warning</span>
                      <p className="font-label-md text-label-md text-error uppercase tracking-wider font-bold">Refund Account Rule</p>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"><strong>NRO Account Required:</strong> Security deposits/fees refunds for NRI candidates must be routed through NRO accounts as per banking guidelines.</p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <section className="mb-12">
            <QuotaInfoGrid
              columns="three"
              items={[
                {
                  icon: "family_restroom",
                  title: "Sponsor link must be defensible",
                  body: "Keep relationship documents, passports, visa records, and sponsor undertaking ready. Weak or distant sponsorship claims are commonly rejected.",
                },
                {
                  icon: "account_balance_wallet",
                  title: "Payment mode varies",
                  body: "Some colleges ask for USD, some allow equivalent INR, and refund routing may require NRO banking details. Confirm before allotment reporting.",
                },
                {
                  icon: "travel_explore",
                  title: "State policies differ",
                  body: "NRI quota eligibility, sponsor definitions, embassy attestation, and priority order are not identical across states and deemed universities.",
                },
              ]}
            />
          </section>

          <QuotaTheoryPanel className="mb-12" {...quotaTheoryContent.nri} />

          {/* Enriched Sponsor Relationship Section */}
          <section className="mb-12 space-y-4 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-6 shadow-clinical-soft">
            <PremiumSectionHeader icon="family_history" title="Supreme Court Sponsorship Relationship Rules" subtitle="As per the landmark Anshul Tomar judgment" />
            <div className="space-y-4 rounded-xl border border-outline-variant bg-surface-container-low p-5">
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                To claim a seat under the NRI Quota, the sponsor must be a first-degree relative or a close relative who can demonstrate clear kinship and intent to support the candidate. Acceptable relationships include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-on-surface-variant">
                <div className="p-3 bg-surface-container rounded-lg border border-outline-variant/35">
                  <strong className="text-on-surface block mb-1">Direct Family</strong>
                  Parents, step-parents, real brothers, real sisters, and spouse.
                </div>
                <div className="p-3 bg-surface-container rounded-lg border border-outline-variant/35">
                  <strong className="text-on-surface block mb-1">Paternal / Maternal</strong>
                  Grandparents, real paternal/maternal uncles, and real paternal/maternal aunts.
                </div>
                <div className="p-3 bg-surface-container rounded-lg border border-outline-variant/35">
                  <strong className="text-on-surface block mb-1">Cousins</strong>
                  Direct children of your father&apos;s or mother&apos;s real siblings (first-cousins).
                </div>
              </div>
              <div className="p-3 bg-error-container/10 border-l-4 border-error text-xs text-on-error-container">
                <strong>Caution:</strong> Sponsorships from distant relatives, family friends, or corporate entities are strictly rejected during online and physical document verification.
              </div>
            </div>
          </section>

          {/* Mandatory Documentation Grid */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">Mandatory Documentation</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Ensure all sponsor documents are attested by the Indian Embassy or Consulate.</p>
              </div>
              <button className="flex items-center gap-2 text-primary font-label-md text-label-md hover:underline font-bold uppercase tracking-wider bg-primary/5 px-4 py-2 rounded-lg border border-primary/20 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Download PDF Checklist
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {documentationCards.map((card, idx) => (
                <div key={idx} className="cursor-default rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 text-center shadow-clinical-soft transition-colors duration-300 hover:border-primary/40 hover:bg-surface-container-low">
                  <span className="material-symbols-outlined text-primary mb-4 text-[32px]">{card.icon}</span>
                  <h4 className="font-label-md text-label-md text-on-surface mb-2 font-bold tracking-wide">{card.title}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-tight">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <QuotaProcessList
            className="mb-12"
            title="NRI Documentation Flow"
            subtitle="A practical sequence for avoiding verification delays."
            steps={[
              { title: "Establish candidate status", body: "Identify whether the applicant is NRI, OCI, PIO, or sponsored ward, because each route has different proof requirements." },
              { title: "Prove sponsor relationship", body: "Collect birth certificates, passports, family tree affidavits, and embassy-attested declarations that show a clear relationship chain." },
              { title: "Confirm financial support", body: "Keep sponsor income proof, bank statements, undertaking, and fee payment readiness aligned with the college's permitted currency." },
              { title: "Upload and carry originals", body: "Upload legible scans during registration and carry originals plus notarized or embassy-attested copies during physical reporting." },
            ]}
          />

          {/* State-wise Seat Distribution Table */}
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">State-wise Seat Distribution</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Comparative analysis of NRI seat availability and expected NEET ranks for key medical hubs.</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high">
                      <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">State</th>
                      <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">Seats &amp; Rank</th>
                      <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">Financials / Authority</th>
                      <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">Key Characteristic</th>
                      <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {nriStates.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-low transition-colors group cursor-pointer even:bg-surface-bright">
                        <td className="px-6 py-4 font-title-lg text-title-lg text-on-surface font-bold">{row.state}</td>
                        <td className="px-6 py-4">
                          <p className="font-title-lg text-title-lg text-primary font-bold">{row.seats}</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">{row.rank}</p>
                        </td>
                        <td className="px-6 py-4 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{row.financials}</td>
                        <td className="px-6 py-4 italic font-body-sm text-body-sm text-secondary">{row.characteristic}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* NRI Embassy Attestation Step-by-Step Guide */}
          <section className="mt-12 rounded-3xl border border-outline-variant bg-gradient-to-br from-surface-container-lowest via-surface-container-lowest to-primary/[0.03] p-6 shadow-clinical-soft md:p-8">
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-primary">
                <span className="material-symbols-outlined text-[12px] font-black">gavel</span>
                Embassy Attestation
              </span>
              <h3 className="mt-4 text-xl font-black leading-tight tracking-tight text-on-surface md:text-2xl">
                Sponsor Embassy Attestation Guide
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                According to MCC guidelines, all documents submitted by the NRI sponsor (specifically the relationship affidavit and financial undertaking) must be attested by the Indian Embassy or Consulate in their country of residence. Follow this step-by-step verification flow:
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-xs transition-all hover:shadow-clinical-hover">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <span className="material-symbols-outlined text-[20px]">edit_note</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-2">1. Draft the Affidavit</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Prepare the Sponsorship Affidavit and Relationship Undertaking as per the formats specified in the MCC bulletin. Avoid spelling discrepancies in names.
                </p>
              </div>

              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-xs transition-all hover:shadow-clinical-hover">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-2">2. Assemble Sponsor KYC</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Sponsor must gather their original Indian/Foreign Passport, valid Visa or Resident Permit, and utility bills showing foreign address proof.
                </p>
              </div>

              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-xs transition-all hover:shadow-clinical-hover">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <span className="material-symbols-outlined text-[20px]">person_pin</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-2">3. Physical Consulate Visit</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  The sponsor must physically visit the Indian Consulate/Embassy. Some jurisdictions require prior appointment scheduling on the Consular portal.
                </p>
              </div>

              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-xs transition-all hover:shadow-clinical-hover">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <span className="material-symbols-outlined text-[20px]">draw</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-2">4. Signing & Attestation</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Sign the documents in the presence of the Consular Officer. The consulate will verify, seal, and stamp the undertaking page.
                </p>
              </div>

              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-xs transition-all hover:shadow-clinical-hover">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <span className="material-symbols-outlined text-[20px]">scanner</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-2">5. High-Resolution Scan</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Scan the attested papers in a high-resolution PDF format (no mobile snapshots). The Consulate stamp and officer signature must be clearly legible.
                </p>
              </div>

              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-xs transition-all hover:shadow-clinical-hover bg-primary-fixed/20 border-primary/20">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-on-primary mb-4">
                  <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-2 text-primary">6. Courier Original Copies</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Courier the physical stamped documents to the candidate in India. Original attested copies are mandatory during physical reporting at Helplines.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar Area (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Live Decision Tools Component */}
            <LiveDecisionTools highlightId="predictor" />

            {/* Document Warning Alert Card */}
            <div className="flex gap-3 rounded-2xl border border-l-4 border-outline-variant border-l-tertiary bg-surface-container-lowest p-4 shadow-clinical-soft">
              <span className="material-symbols-outlined text-tertiary text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              <div>
                <span className="font-label-md text-label-md text-tertiary block font-bold mb-1 uppercase tracking-wider">OCI Cut-off Warning</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  OCI cardholders registered after March 4, 2021 are treated as foreign nationals and are only eligible for NRI seats, not general seats.
                </p>
              </div>
            </div>

            {/* Document Check Reminder */}
            <div className="p-4 bg-surface-container-high/60 border border-outline-variant/40 rounded-xl text-center leading-relaxed italic text-[11px] text-on-surface-variant">
              Embassy attestation is mandatory for both the relationship affidavit and physical financial undertaking.
            </div>
          </div>
        </div>
      </div>
    </QuotaPageShell>
  );
}
