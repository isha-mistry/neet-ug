"use client";

import { useState } from "react";
import Link from "next/link";
import { QuotaHeader, QuotaPageShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel } from "./QuotaShared";

import { quotaTheoryContent, reservationCategoriesData as tableData, type CategoryTab } from "./content";

export function ReservationCategoriesView() {
  const [activeTab, setActiveTab] = useState<CategoryTab>("national");
  const currentTable = tableData[activeTab];

  return (
    <QuotaPageShell current="Reservation Categories" className="pb-8 text-on-background" containerClassName="py-12 animate-fadeIn">
      <div className="mb-10">
        <QuotaHeader
          eyebrow="Reservation Policy"
          title="Medical Reservation"
          highlightedText="Guide"
          description="Understanding the complex landscape of seat reservations in Indian medical admissions. Precision data on vertical and horizontal quotas for AIQ and State rounds."
          eyebrowIcon="gavel"
          watermarkIcon="gavel"
        />
      </div>

      <section className="mb-8">
        <QuotaInfoGrid
          items={[
            {
              icon: "vertical_split",
              title: "Vertical reservations compete separately",
              body: "OBC-NCL, SC, ST, EWS, and UR seats are treated as primary seat pools. Category movement follows the counselling body's conversion rules.",
            },
            {
              icon: "splitscreen",
              title: "Horizontal reservations cut across pools",
              body: "PwD, defence, women, and other horizontal quotas operate inside vertical categories rather than replacing them.",
            },
            {
              icon: "badge",
              title: "Certificate validity is decisive",
              body: "A correct certificate type is not enough; issuing authority, financial year, central versus state list, and prescribed format all matter.",
            },
          ]}
        />
      </section>

      <QuotaTheoryPanel className="mb-8" {...quotaTheoryContent.reservation} />

      <div className="grid grid-cols-12 gap-6">
        {/* Left Content Column (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">

          {/* Vertical Reservation Section */}
          <section className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-6 shadow-clinical-soft transition-all duration-200 hover:shadow-clinical-hover" id="vertical">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#004ac6] to-[#2563eb] flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined leading-none" style={{ fontVariationSettings: "'FILL' 0" }}>layers</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm">Vertical Reservation</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Primary reservation tiers based on social and economic backgrounds.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant">
                <span className="font-label-md text-label-md text-primary mb-1 block uppercase tracking-wider">OBC-NCL</span>
                <div className="text-2xl font-bold mb-1">27.0%</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Central list non-creamy layer candidates.</p>
              </div>
              <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant">
                <span className="font-label-md text-label-md text-primary mb-1 block uppercase tracking-wider">SC / ST</span>
                <div className="text-2xl font-bold mb-1">15% / 7.5%</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Scheduled Castes and Scheduled Tribes.</p>
              </div>
              <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant">
                <span className="font-label-md text-label-md text-primary mb-1 block uppercase tracking-wider">GEN-EWS</span>
                <div className="text-2xl font-bold mb-1">10.0%</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Economically Weaker Section (General).</p>
              </div>
            </div>
          </section>

          {/* Detailed Category Breakdown Table */}
          <section className="overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-6 shadow-clinical-soft transition-all duration-200 hover:shadow-clinical-hover" id="breakdown">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h3 className="font-headline-sm text-headline-sm">Detailed Category Breakdown</h3>
              {/* State switch tabs */}
              <div className="flex gap-1 bg-surface-container-low p-1 rounded-xl w-fit overflow-x-auto scrollbar-none">
                {(["national", "gujarat", "maharashtra", "mp", "rajasthan"] as CategoryTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === tab
                        ? "bg-primary text-on-primary shadow-sm"
                        : "text-on-surface-variant hover:text-primary"
                      }`}
                  >
                    {tab === "national" ? "AIQ" : tab === "mp" ? "MP" : tab.charAt(0).toUpperCase() + tab.slice(1, 3)}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant border-b border-outline-variant">
                    <th className="px-4 py-3 font-label-sm text-label-sm uppercase tracking-wider font-bold">Category</th>
                    <th className="px-4 py-3 font-label-sm text-label-sm uppercase tracking-wider font-bold">Reservation %</th>
                    <th className="px-4 py-3 font-label-sm text-label-sm uppercase tracking-wider font-bold">Typical Rank Range</th>
                    <th className="px-4 py-3 font-label-sm text-label-sm uppercase tracking-wider font-bold">Mandatory Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {currentTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-4 py-4">
                        <div className="font-title-lg text-title-lg text-on-surface font-bold">{row.category}</div>
                        <div className="text-label-sm text-on-surface-variant mt-0.5">Category Reservation</div>
                      </td>
                      <td className="px-4 py-4 font-body-md text-body-md font-bold text-primary">{row.percentage}</td>
                      <td className="px-4 py-4 font-body-md text-body-md font-medium text-on-surface-variant">{row.rankRange}</td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-label-sm font-bold uppercase tracking-wider ${row.certificate.toLowerCase() === 'none required' ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-secondary-container text-on-secondary-container'}`}>
                          {row.certificate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Horizontal Reservation Section */}
          <section className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-6 shadow-clinical-soft transition-all duration-200 hover:shadow-clinical-hover" id="horizontal">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-tertiary flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined leading-none" style={{ fontVariationSettings: "'FILL' 0" }}>splitscreen</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-md">Horizontal Reservation</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Reservation categories that apply within each vertical tier.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4 p-4 rounded-xl bg-surface-container-low border border-transparent hover:border-outline-variant/50 transition-colors">
                <div className="text-tertiary">
                  <span className="material-symbols-outlined text-4xl leading-none">accessible</span>
                </div>
                <div>
                  <h4 className="font-title-lg text-title-lg mb-1 font-bold text-on-surface">PwD (5%)</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">5% horizontal reservation for Persons with Disability in each category as per MCI norms.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-surface-container-low border border-transparent hover:border-outline-variant/50 transition-colors">
                <div className="text-tertiary">
                  <span className="material-symbols-outlined text-4xl leading-none">shield_person</span>
                </div>
                <div>
                  <h4 className="font-title-lg text-title-lg mb-1 font-bold text-on-surface">Wards of Defence</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Priority-based reservation for children of ex-servicemen and serving personnel in state quotas.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-surface-container-low border border-transparent hover:border-outline-variant/50 transition-colors">
                <div className="text-tertiary">
                  <span className="material-symbols-outlined text-4xl leading-none">woman</span>
                </div>
                <div>
                  <h4 className="font-title-lg text-title-lg mb-1 font-bold text-on-surface">Women (State Specific)</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Some states (e.g., Bihar, Rajasthan) offer 30-33% horizontal reservation for female candidates.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-surface-container-low border border-transparent hover:border-outline-variant/50 transition-colors">
                <div className="text-tertiary">
                  <span className="material-symbols-outlined text-4xl leading-none">health_metrics</span>
                </div>
                <div>
                  <h4 className="font-title-lg text-title-lg mb-1 font-bold text-on-surface">Freedom Fighters</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Horizontal seats reserved for the children/grandchildren of recognised freedom fighters.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Info Alert */}
          <div className="bg-primary-container/10 border-l-4 border-primary p-6 rounded-r-xl border border-outline-variant/10 shadow-sm space-y-4">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-primary text-2xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
              <div>
                <p className="font-title-lg text-title-lg text-primary mb-1 font-bold">Crucial Verification Step & Validity Rules</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Always verify the validity period of your category certificates. Under MCC rules, OBC-NCL and EWS certificates <strong>must be issued on or after April 1 of the admission year</strong>. The family income threshold for EWS is ₹8 Lakhs per annum, and the certificate must state validity for the current financial year. Failure to produce a valid document results in immediate seat cancellation or conversion to the General/Open category.
                </p>
              </div>
            </div>
            <div className="border-t border-outline-variant/35 pt-4 text-xs text-on-surface-variant space-y-2">
              <p><strong>PwD Evaluation Rule:</strong> Physical disability certificates are only valid if issued by one of the 16 designated MCC medical boards after physical evaluation during the counselling window. General district hospital certificates are not accepted.</p>
            </div>
          </div>

          <QuotaProcessList
            title="Category Claim Review"
            subtitle="A document-first way to avoid losing reservation benefit during reporting."
            steps={[
              { title: "Match the correct list", body: "For AIQ, OBC-NCL must be on the central list. For state quota, confirm whether state-specific caste lists apply." },
              { title: "Check issue date rules", body: "EWS and OBC-NCL certificates often require current financial-year validity or a specific issue-date window." },
              { title: "Verify horizontal proof", body: "PwD and defence claims may require designated boards or priority certificates beyond ordinary district documents." },
              { title: "Carry originals and copies", body: "Keep originals, self-attested copies, online application receipts, and uploaded scans consistent across registration and reporting." },
            ]}
          />
        </div>

        {/* Right Sidebar Column (4 Cols) */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Quick Actions Card */}
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary via-primary to-primary-hover p-6 text-on-primary shadow-[0_18px_42px_-22px_color-mix(in_srgb,var(--color-primary)_55%,transparent)]">
              <h3 className="font-headline-sm text-headline-sm mb-4 font-bold text-white">Book a Counselling Session</h3>
              <p className="font-body-sm text-body-sm mb-6 text-white/90 leading-relaxed">Talk to our medical admission experts for personalized category-based strategy.</p>
              <button className="w-full rounded-xl bg-on-primary py-3 font-title-lg text-title-lg font-bold text-primary shadow-sm transition-all hover:bg-on-primary/95 active:scale-[0.98]">Start Registration</button>
              <div className="flex items-center justify-center gap-2 mt-4 text-label-sm text-white/80 font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>Expert Verification of Documents</span>
              </div>
            </div>

            {/* Navigation Shortcut Card */}
            <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-6 shadow-clinical-soft transition-shadow hover:shadow-clinical-hover">
              <h3 className="font-label-md text-label-md text-outline uppercase mb-4 font-bold tracking-widest">On this page</h3>
              <nav className="flex flex-col gap-3">
                <a className="flex items-center justify-between group p-2 rounded-lg hover:bg-surface-container-low transition-colors" href="#vertical">
                  <span className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">Vertical Quotas</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:translate-x-1 group-hover:text-primary transition-all">arrow_forward</span>
                </a>
                <a className="flex items-center justify-between group p-2 rounded-lg hover:bg-surface-container-low transition-colors" href="#breakdown">
                  <span className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">Detailed Matrix</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:translate-x-1 group-hover:text-primary transition-all">arrow_forward</span>
                </a>
                <a className="flex items-center justify-between group p-2 rounded-lg hover:bg-surface-container-low transition-colors" href="#horizontal">
                  <span className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">Horizontal Layers</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:translate-x-1 group-hover:text-primary transition-all">arrow_forward</span>
                </a>
              </nav>
            </div>

            {/* Predictor Ad Card */}
            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-primary/30 bg-surface-container-lowest p-6 text-center shadow-clinical-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Medical College Prediction" className="w-full h-32 object-cover rounded-lg mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD29W2rgl-CUbBSlW1Vxee0GmpiIAyskz3w5-gM3N4zYPrmTFIC4tNdkOQsPVpUUYM1crgczeBrwmkzwtNr46KB5iLgK0wKTzwjo5A93jyjSo4d-fWucVF108mn6WAYm5waCudSYxWaJIv5gLqhKIILzdf2UbQSG-SEllrUOHQRLRJ-3lhO_WQX_LJSFhNCPE8lhb0GTkeMKeyDvyLHdkJTTs8Qbpi2H1JdPETEiHvaCLyQYsVHN0KTh2rv246qXnkeBzYo1Yrnsp0" />
              <h4 className="font-headline-sm text-headline-sm mb-2 font-bold text-on-surface">College Predictor</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed">Use your rank and category to find out which college you can get into.</p>
              <Link href="/rank-predictor" className="text-primary font-label-md text-label-md border border-primary px-6 py-2 rounded-full hover:bg-primary-container/10 transition-colors font-bold uppercase tracking-wider">Launch Tool</Link>
            </div>

            {/* Related Topics */}
            <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-6 shadow-clinical-soft transition-shadow hover:shadow-clinical-hover">
              <h3 className="font-label-md text-label-md text-outline uppercase mb-4 font-bold tracking-widest">Related Topics</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-primary mt-1 group-hover:scale-110 transition-transform">description</span>
                  <div>
                    <div className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors font-bold">State Certificate Formats</div>
                    <div className="text-label-sm text-on-surface-variant">Download official templates</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-primary mt-1 group-hover:scale-110 transition-transform">account_balance</span>
                  <div>
                    <div className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors font-bold">Deemed Universities Quota</div>
                    <div className="text-label-sm text-on-surface-variant">NRI &amp; Management seats</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* FAQs on Reservation & Category Claims */}
      <section className="mt-12 rounded-3xl border border-outline-variant bg-gradient-to-br from-surface-container-lowest via-surface-container-lowest to-primary/[0.03] p-6 shadow-clinical-soft md:p-8">
        <h3 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-2 font-bold">
          <span className="material-symbols-outlined text-primary text-[28px]">quiz</span>
          Reservation & Category FAQs
        </h3>
        <div className="space-y-4">
          <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-5 shadow-xs transition-all hover:shadow-clinical-hover">
            <h4 className="text-sm font-bold text-on-surface mb-1.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">help_center</span>
              1. Can I change my category from OBC/SC/ST to General in later rounds?
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed pl-6.5">
              Yes. If you fail to produce a valid category certificate during reporting, your allotment is cancelled and you are converted to General/Open category for subsequent rounds.
            </p>
          </div>

          <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-5 shadow-xs transition-all hover:shadow-clinical-hover">
            <h4 className="text-sm font-bold text-on-surface mb-1.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">help_center</span>
              2. What happens if my EWS or OBC-NCL certificate is issued before April 1, 2026?
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed pl-6.5">
              For MCC (AIQ) counselling, certificates must be issued on or after April 1 of the admission year. Older certificates are rejected during document verification, and your category claim is cancelled.
            </p>
          </div>

          <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-5 shadow-xs transition-all hover:shadow-clinical-hover">
            <h4 className="text-sm font-bold text-on-surface mb-1.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">help_center</span>
              3. How does horizontal reservation work inside vertical categories?
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed pl-6.5">
              Horizontal seats (e.g. PwD, Defence) are filled first within the respective vertical category (e.g. OBC-PwD, UR-PwD). If no eligible candidate is found, the seat merges back into the vertical category.
            </p>
          </div>
        </div>
      </section>

    </QuotaPageShell>
  );
}
