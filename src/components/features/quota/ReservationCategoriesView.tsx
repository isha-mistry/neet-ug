"use client";

import { useState } from "react";
import { QuotaHeader, QuotaPageShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel } from "./QuotaShared";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

import { quotaTheoryContent, reservationCategoriesData as tableData, type CategoryTab } from "./content";

const RESERVATION_CATEGORIES_JUMP_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "vertical", label: "Vertical Quotas" },
  { id: "breakdown", label: "Detailed Matrix" },
  { id: "horizontal", label: "Horizontal Layers" },
  { id: "verification-step", label: "Verification Step" },
  { id: "claim-review", label: "Claim Review" },
] as const;

export function ReservationCategoriesView() {
  const [activeTab, setActiveTab] = useState<CategoryTab>("national");
  const currentTable = tableData[activeTab];

  const header = (
    <QuotaHeader
      eyebrow="Reservation Policy"
      title="Medical Reservation"
      highlightedText="Guide"
      description="Understanding the complex landscape of seat reservations in Indian medical admissions. Precision data on vertical and horizontal quotas for AIQ and State rounds."
      eyebrowIcon="gavel"
      watermarkIcon="gavel"
    />
  );

  const sidebar = (
    <aside className="space-y-6">
      {/* Quick Actions Card */}
      <Card padded={false} bordered={false} className="group relative flex flex-col justify-between overflow-hidden bg-linear-to-br from-primary to-primary-pressed p-6 text-on-primary shadow-[0_18px_42px_-22px_color-mix(in_srgb,var(--color-primary)_55%,transparent)]">
        <h3 className="font-headline-sm text-headline-sm mb-4 font-bold text-white">Book a Counselling Session</h3>
        <p className="font-body-sm text-body-sm mb-6 text-white/90 leading-relaxed">Talk to our medical admission experts for personalized category-based strategy.</p>
        <Button
          variant="inverse"
          fullWidth
        >
          Start Registration
        </Button>
        <div className="flex items-center justify-center gap-2 mt-4 text-label-sm text-white/80 font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>Expert Verification of Documents</span>
        </div>
      </Card>

      {/* Predictor Ad Card */}
      <Card className="flex flex-col items-center text-center border-2 border-dashed border-outline-variant/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="Medical College Prediction" className="w-full h-32 object-cover rounded-xl mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD29W2rgl-CUbBSlW1Vxee0GmpiIAyskz3w5-gM3N4zYPrmTFIC4tNdkOQsPVpUUYM1crgczeBrwmkzwtNr46KB5iLgK0wKTzwjo5A93jyjSo4d-fWucVF108mn6WAYm5waCudSYxWaJIv5gLqhKIILzdf2UbQSG-SEllrUOHQRLRJ-3lhO_WQX_LJSFhNCPE8lhb0GTkeMKeyDvyLHdkJTTs8Qbpi2H1JdPETEiHvaCLyQYsVHN0KTh2rv246qXnkeBzYo1Yrnsp0" />
        <h4 className="font-headline-sm text-headline-sm mb-2 font-bold text-on-surface">College Predictor</h4>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed">Use your rank and category to find out which college you can get into.</p>
        <Button
          as="link"
          href="/rank-predictor"
          variant="secondary"
          size="sm"
        >
          Launch Tool
        </Button>
      </Card>

      {/* Related Topics */}
      <Card>
        <h3 className="font-label-md text-label-md text-outline uppercase mb-4 font-bold tracking-widest">Related Topics</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3 p-2 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-primary mt-1 group-hover:scale-110 transition-transform">description</span>
            <div>
              <div className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors font-bold">State Certificate Formats</div>
              <div className="text-label-sm text-on-surface-variant">Download official templates</div>
            </div>
          </li>
          <li className="flex items-start gap-3 p-2 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-primary mt-1 group-hover:scale-110 transition-transform">account_balance</span>
            <div>
              <div className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors font-bold">Deemed Universities Quota</div>
              <div className="text-label-sm text-on-surface-variant">NRI &amp; Management seats</div>
            </div>
          </li>
        </ul>
      </Card>
    </aside>
  );

  return (
    <QuotaPageShell
      current="Reservation Categories"
      header={header}
      sidebar={sidebar}
      jumpSections={RESERVATION_CATEGORIES_JUMP_SECTIONS}
    >
      {/* Overview Group */}
      <div id="overview" className="space-y-10">
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

        <QuotaTheoryPanel className="" {...quotaTheoryContent.reservation} />
      </div>

      {/* Vertical Reservation Section */}
      <Card id="vertical" as="section" className="scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-primary-pressed flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined leading-none" style={{ fontVariationSettings: "'FILL' 0" }}>layers</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm">Vertical Reservation</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Primary reservation tiers based on social and economic backgrounds.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-surface-container-low">
            <span className="font-label-md text-label-md text-primary mb-1 block uppercase tracking-wider">OBC-NCL</span>
            <div className="text-2xl font-bold mb-1">27.0%</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Central list non-creamy layer candidates.</p>
          </Card>
          <Card className="bg-surface-container-low">
            <span className="font-label-md text-label-md text-primary mb-1 block uppercase tracking-wider">SC / ST</span>
            <div className="text-2xl font-bold mb-1">15% / 7.5%</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Scheduled Castes and Scheduled Tribes.</p>
          </Card>
          <Card className="bg-surface-container-low">
            <span className="font-label-md text-label-md text-primary mb-1 block uppercase tracking-wider">GEN-EWS</span>
            <div className="text-2xl font-bold mb-1">10.0%</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Economically Weaker Section (General).</p>
          </Card>
        </div>
      </Card>

      {/* Detailed Category Breakdown Table */}
      <Card id="breakdown" as="section" className="scroll-mt-20 overflow-hidden" padded={false}>
        <div className="p-6 border-b border-outline-variant/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-headline-sm text-headline-sm">Detailed Category Breakdown</h3>
          {/* State switch tabs */}
          <div className="flex gap-1 bg-surface-container-low p-1 rounded-xl w-fit overflow-x-auto scrollbar-none">
            {(["national", "gujarat", "maharashtra", "mp", "rajasthan"] as CategoryTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer duration-150 active:scale-95",
                  activeTab === tab
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-primary"
                )}
              >
                {tab === "national" ? "AIQ" : tab === "mp" ? "MP" : tab.charAt(0).toUpperCase() + tab.slice(1, 3)}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="quota-table">
            <thead>
              <tr>
                <th className="pl-6">Category</th>
                <th>Reservation %</th>
                <th>Typical Rank Range</th>
                <th className="pr-6">Mandatory Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {currentTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-title-lg text-title-lg text-on-surface font-bold">{row.category}</div>
                    <div className="text-label-sm text-on-surface-variant mt-0.5">Category Reservation</div>
                  </td>
                  <td className="px-6 py-4 font-body-md text-body-md font-bold text-primary">{row.percentage}</td>
                  <td className="px-6 py-4 font-body-md text-body-md font-medium text-on-surface-variant">{row.rankRange}</td>
                  <td className="px-6 py-4">
                    <Badge tone={row.certificate.toLowerCase() === 'none required' ? 'neutral' : 'warn'}>
                      {row.certificate}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Horizontal Reservation Section */}
      <Card id="horizontal" as="section" className="scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-tertiary flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined leading-none" style={{ fontVariationSettings: "'FILL' 0" }}>splitscreen</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm">Horizontal Reservation</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Reservation categories that apply within each vertical tier.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card hover={true} className="flex gap-4 bg-surface-container-low border-transparent">
            <div className="text-tertiary">
              <span className="material-symbols-outlined text-4xl leading-none">accessible</span>
            </div>
            <div>
              <h4 className="font-title-lg text-title-lg mb-1 font-bold text-on-surface">PwD (5%)</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">5% horizontal reservation for Persons with Disability in each category as per MCI norms.</p>
            </div>
          </Card>
          <Card hover={true} className="flex gap-4 bg-surface-container-low border-transparent">
            <div className="text-tertiary">
              <span className="material-symbols-outlined text-4xl leading-none">shield_person</span>
            </div>
            <div>
              <h4 className="font-title-lg text-title-lg mb-1 font-bold text-on-surface">Wards of Defence</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Priority-based reservation for children of ex-servicemen and serving personnel in state quotas.</p>
            </div>
          </Card>
          <Card hover={true} className="flex gap-4 bg-surface-container-low border-transparent">
            <div className="text-tertiary">
              <span className="material-symbols-outlined text-4xl leading-none">woman</span>
            </div>
            <div>
              <h4 className="font-title-lg text-title-lg mb-1 font-bold text-on-surface">Women (State Specific)</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Some states (e.g., Bihar, Rajasthan) offer 30-33% horizontal reservation for female candidates.</p>
            </div>
          </Card>
          <Card hover={true} className="flex gap-4 bg-surface-container-low border-transparent">
            <div className="text-tertiary">
              <span className="material-symbols-outlined text-4xl leading-none">health_metrics</span>
            </div>
            <div>
              <h4 className="font-title-lg text-title-lg mb-1 font-bold text-on-surface">Freedom Fighters</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Horizontal seats reserved for the children/grandchildren of recognised freedom fighters.</p>
            </div>
          </Card>
        </div>
      </Card>

      {/* Info Alert */}
      <Card id="verification-step" padded={true} className="scroll-mt-20 bg-primary-fixed/20 shadow-sm space-y-4">
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
      </Card>

      <div id="claim-review" className="scroll-mt-20">
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

      {/* FAQs on Reservation & Category Claims */}
      <Card as="section" className="mt-12 p-6 md:p-8">
        <h3 className="font-headline-md text-xl font-bold md:text-2xl text-on-surface mb-6 flex items-center gap-2 font-bold">
          <span className="material-symbols-outlined text-primary text-[28px]">quiz</span>
          Reservation & Category FAQs
        </h3>
        <div className="space-y-4">
          <Card hover={true} className="bg-surface">
            <h4 className="text-sm font-bold text-on-surface mb-1.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">help_center</span>
              1. Can I change my category from OBC/SC/ST to General in later rounds?
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed pl-6.5">
              Yes. If you fail to produce a valid category certificate during reporting, your allotment is cancelled and you are converted to General/Open category for subsequent rounds.
            </p>
          </Card>

          <Card hover={true} className="bg-surface">
            <h4 className="text-sm font-bold text-on-surface mb-1.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">help_center</span>
              2. What happens if my EWS or OBC-NCL certificate is issued before April 1, 2026?
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed pl-6.5">
              For MCC (AIQ) counselling, certificates must be issued on or after April 1 of the admission year. Older certificates are rejected during document verification, and your category claim is cancelled.
            </p>
          </Card>

          <Card hover={true} className="bg-surface">
            <h4 className="text-sm font-bold text-on-surface mb-1.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">help_center</span>
              3. How does horizontal reservation work inside vertical categories?
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed pl-6.5">
              Horizontal seats (e.g. PwD, Defence) are filled first within the respective vertical category (e.g. OBC-PwD, UR-PwD). If no eligible candidate is found, the seat merges back into the vertical category.
            </p>
          </Card>
        </div>
      </Card>
    </QuotaPageShell>
  );
}
