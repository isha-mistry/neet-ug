"use client";

import { useState } from "react";
import { QuotaHeader, QuotaCta, QuotaPageShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel } from "./QuotaShared";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

import { quotaTheoryContent, stateDetailsData as stateDetails, type StateTab } from "./content";

// Helper data for seat matrix distribution per state
const stateSeatMatrix: Record<StateTab, { total: string; govt: number; mq: number; nri: number }> = {
  gujarat: { total: "5,664", govt: 75, mq: 15, nri: 10 },
  maharashtra: { total: "10,900", govt: 70, mq: 15, nri: 15 },
  mp: { total: "4,500", govt: 85, mq: 10, nri: 5 },
  rajasthan: { total: "5,000", govt: 60, mq: 25, nri: 15 },
};

// Helper data for mandatory documentation checklist
const stateDocumentation: Record<StateTab, string[]> = {
  gujarat: [
    "Class 10th & 12th Marksheets",
    "School Leaving Certificate",
    "Domicile Certificate (GUJ)",
    "NEET Admit & Result Card",
    "Caste/NCL (if applicable)",
  ],
  maharashtra: [
    "Class 10th & 12th Marksheets",
    "Maharashtra Domicile Certificate",
    "College Leaving Certificate (LC)",
    "NEET UG Admit Card & Scorecard",
    "Caste Certificate & Validity",
  ],
  mp: [
    "Class 10th & 12th Marksheets",
    "MP State Domicile Certificate",
    "NEET UG Admit Card & Scorecard",
    "Caste / Category Certificate",
    "Income Certificate",
  ],
  rajasthan: [
    "Class 10th & 12th Marksheets",
    "Rajasthan State Domicile Certificate",
    "NEET UG Admit Card & Scorecard",
    "Caste Certificate",
    "Income Certificate / EWS Asset Proof",
  ],
};

const STATE_QUOTA_JUMP_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "state-directory", label: "State Directory" },
  { id: "seat-matrix", label: "Seat Matrix" },
  { id: "comparison", label: "State vs AIQ" },
  { id: "prep-flow", label: "Preparation Flow" },
];

export function StateQuotaView() {
  const [activeTab, setActiveTab] = useState<StateTab>("gujarat");
  const content = stateDetails[activeTab];
  const matrix = stateSeatMatrix[activeTab];
  const docs = stateDocumentation[activeTab];

  const header = (
    <QuotaHeader
      eyebrow="Medical Counselling Guide"
      title="State Quota"
      highlightedText="(SQ) Overview"
      description="The State Quota is the most critical pathway for medical aspirants, reserving the vast majority of seats for local residents. It is governed by state-specific medical counseling bodies and offers a significant advantage to domicile candidates."
      eyebrowIcon="verified"
      watermarkIcon="location_on"
    />
  );

  const sidebar = (
    <aside className="space-y-6">
      {/* Live College Predictor Card */}
      <Card hover={true}>
        <div className="flex items-center gap-3.5 mb-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary shadow-sm">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>
              online_prediction
            </span>
          </div>
          <div>
            <h3 className="text-base font-extrabold tracking-tight text-on-surface md:text-lg">NEET UG College Predictor</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">Our live predictor is ready for you</p>
          </div>
        </div>

        <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
          Don&apos;t guess your admission chances. Our live intelligent data engine cross-references your NEET Rank, Category, and State Domicile to give you a definitive prediction map.
        </p>

        <div className="space-y-3.5 mb-6">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-on-surface">
            <span className="material-symbols-outlined text-primary text-base">check_circle</span>
            Automatic 85% State Quota Logic
          </div>
          <div className="flex items-center gap-2.5 text-xs font-semibold text-on-surface">
            <span className="material-symbols-outlined text-primary text-base">check_circle</span>
            Real-time seat matrix & fees
          </div>
          <div className="flex items-center gap-2.5 text-xs font-semibold text-on-surface">
            <span className="material-symbols-outlined text-primary text-base">check_circle</span>
            Category conversion rules supported
          </div>
        </div>

        <Button
          as="link"
          href="/college-predictor"
          fullWidth
          trailingIcon={<span className="material-symbols-outlined text-sm">arrow_forward</span>}
        >
          Go to College Predictor
        </Button>
      </Card>

      {/* Warning Card */}
      <Card padded={true} bordered={false} className="relative overflow-hidden bg-clinical-blue! text-on-primary-container shadow-sm">
        <div className="relative z-10">
          <h4 className="font-bold text-headline-sm mb-2 text-on-primary-container">SEBC Rule</h4>
          <p className="text-body-sm opacity-90 mb-4 leading-relaxed text-on-primary-container">
            Gujarat follows strict SEBC (Socially and Educationally Backward Classes) norms. A valid Non-Creamy Layer (NCL) certificate from Gujarat is mandatory.
          </p>
          <div className="flex items-center gap-2 text-label-md font-bold uppercase tracking-wider text-on-primary-container">
            <span className="material-symbols-outlined text-[18px]">info</span>
            Check validity before Aug 2026
          </div>
        </div>
        {/* Decorative Icon */}
        <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] opacity-10 rotate-12 pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
      </Card>

      {/* Documentation Sticky */}
      <Card>
        <h3 className="text-title-lg mb-4 flex items-center gap-2 font-bold text-on-surface">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
          Mandatory Documentation
        </h3>
        <ul className="space-y-3">
          {docs.map((doc, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-body-sm text-on-surface-variant font-medium leading-relaxed">{doc}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 p-4 bg-surface-container-highest rounded-xl border border-outline-variant/30">
          <p className="text-label-sm text-on-surface-variant flex items-center gap-2 font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
            Tip: Document verification requires physical presence at Help Centers.
          </p>
        </div>
      </Card>
    </aside>
  );

  return (
    <QuotaPageShell
      current="State Quota"
      header={header}
      sidebar={sidebar}
      jumpSections={STATE_QUOTA_JUMP_SECTIONS}
    >
      {/* Hero Overview Card */}
      <div id="overview" className="space-y-6">
        <Card className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-outline-variant/60 bg-surface-container-low p-4">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
              <span className="material-symbols-outlined">percent</span>
            </div>
            <div>
              <h3 className="text-title-lg font-title-lg text-on-surface font-bold">85%</h3>
              <p className="text-label-sm font-label-sm text-on-surface-variant leading-tight">Seats reserved for Govt. candidates</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-outline-variant/60 bg-surface-container-low p-4">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
              <span className="material-symbols-outlined">description</span>
            </div>
            <div>
              <h3 className="text-title-lg font-title-lg text-on-surface font-bold">Mandatory</h3>
              <p className="text-label-sm font-label-sm text-on-surface-variant leading-tight">Domicile Certificate is essential</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-outline-variant/60 bg-surface-container-low p-4">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <div>
              <h3 className="text-title-lg font-title-lg text-on-surface font-bold">State Body</h3>
              <p className="text-label-sm font-label-sm text-on-surface-variant leading-tight">Independent state counseling</p>
            </div>
          </div>
        </Card>

        <QuotaInfoGrid
          items={[
            {
              icon: "home_pin",
              title: "Domicile is state-specific",
              body: "A certificate accepted in one state may not satisfy another state's medical admission rules. Always read the current state information bulletin.",
            },
            {
              icon: "school",
              title: "Schooling can matter",
              body: "Several states use Class 10, Class 12, parent service, or local education clauses in addition to domicile proof.",
            },
            {
              icon: "event_available",
              title: "State timelines are independent",
              body: "State counselling can begin after MCC rounds or overlap with them, so track registration, verification, merit list, and choice-locking dates separately.",
            },
          ]}
        />

        <QuotaTheoryPanel {...quotaTheoryContent.state} />
      </div>

      {/* State Selection Filter & Detailed View */}
      <div id="state-directory" className="space-y-6">
        <section className="flex flex-col items-center gap-6 py-8">
          <h2 className="font-headline-md text-xl font-bold md:text-2xl text-on-surface">Explore State-Specific Quotas</h2>
          <div className="flex flex-wrap justify-center gap-2 bg-surface-container-low p-1.5 rounded-full border border-outline-variant/40 w-fit mx-auto">
            {([
              { id: "gujarat", label: "Gujarat" },
              { id: "maharashtra", label: "Maharashtra" },
              { id: "mp", label: "Madhya Pradesh" },
              { id: "rajasthan", label: "Rajasthan" },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-xs flex items-center gap-2 transition-all duration-150 active:scale-95 font-bold uppercase tracking-wider cursor-pointer",
                  activeTab === tab.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high/60"
                )}
              >
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: activeTab === tab.id ? "'FILL' 1" : "'FILL' 0" }}>location_on</span> {tab.label}
              </button>
            ))}
          </div>
        </section>

        <Card padded={false} className="overflow-hidden">
          <div className="p-6 border-b border-outline-variant/40 flex justify-between items-center bg-surface-bright">
            <div className="flex items-center gap-3">
              <h2 className="text-headline-sm font-headline-sm flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
                {content.title}
              </h2>
            </div>
            <Button
              as="link"
              variant="text"
              href={content.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              trailingIcon={<span className="material-symbols-outlined text-[16px]">open_in_new</span>}
            >
              Official Portal
            </Button>
          </div>
          <div className="divide-y divide-outline-variant/40">
            {content.rows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 p-4 items-center hover:bg-surface-container-low/50 transition-colors">
                <div className="text-body-sm text-on-surface-variant font-bold uppercase tracking-wider">{row.parameter}</div>
                <div className="col-span-2 text-body-sm font-medium leading-relaxed">{row.detail}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Seat Matrix Distribution */}
      <Card id="seat-matrix" as="section">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-headline-sm font-headline-sm font-bold">Seat Matrix Distribution</h3>
          <Badge tone="neutral">
            {activeTab === "mp" ? "MADHYA PRADESH" : activeTab.toUpperCase()} STATE
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-body-sm text-on-surface-variant mb-4 leading-relaxed">A visual breakdown of how seats are allocated across different institutional categories in the state quota.</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-label-md mb-1">
                  <span className="font-bold text-on-surface">Government Seats</span>
                  <span className="font-bold text-primary">{matrix.govt}%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${matrix.govt}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-label-md mb-1">
                  <span className="font-bold text-on-surface">Management Quota</span>
                  <span className="font-bold text-secondary">{matrix.mq}%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
                  <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${matrix.mq}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-label-md mb-1">
                  <span className="font-bold text-on-surface">NRI Quota</span>
                  <span className="font-bold text-tertiary-container">{matrix.nri}%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
                  <div className="h-full bg-tertiary-container rounded-full transition-all duration-500" style={{ width: `${matrix.nri}%` }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center p-4 border border-outline-variant/40 rounded-xl bg-surface-bright overflow-hidden">
            <div className="text-center z-10">
              <div className="text-display-lg font-bold text-primary">{matrix.total}</div>
              <div className="text-label-md text-on-surface-variant font-bold uppercase tracking-wider mt-1">TOTAL STATE SEATS</div>
            </div>
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern height="20" id="grid" patternUnits="userSpaceOnUse" width="20">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                  </pattern>
                </defs>
                <rect fill="url(#grid)" height="100%" width="100%"></rect>
              </svg>
            </div>
          </div>
        </div>
      </Card>

      {/* Comparison Tool */}
      <Card id="comparison" as="section">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-container-low shadow-sm">
            <span className="material-symbols-outlined text-primary text-[32px]">compare_arrows</span>
          </div>
          <div>
            <h3 className="text-title-lg font-title-lg font-bold">State vs All India Quota (AIQ)</h3>
            <p className="text-body-sm text-on-surface-variant">Deciding where to apply? See the difference in cutoffs and fees.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card hover={true} className="bg-surface-container-low">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>public</span> AIQ (15%)
            </h4>
            <ul className="text-body-sm space-y-2 text-on-surface-variant">
              <li className="flex gap-2"><span className="text-tertiary font-bold">✓</span> Higher cutoff scores required</li>
              <li className="flex gap-2"><span className="text-tertiary font-bold">✓</span> Any Indian citizen can apply</li>
              <li className="flex gap-2"><span className="text-tertiary font-bold">✓</span> Centralized MCC Counseling</li>
            </ul>
          </Card>
          <Card hover={true} className="bg-primary-fixed/30">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span> State Quota (85%)
            </h4>
            <ul className="text-body-sm space-y-2 text-on-surface-variant">
              <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Significant rank advantage</li>
              <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Strict domicile requirements</li>
              <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Specific state-wise rules</li>
            </ul>
          </Card>
        </div>
      </Card>

      <div id="prep-flow">
        <QuotaProcessList
          title="State Quota Preparation Flow"
          subtitle="Complete these steps before the state registration window opens."
          steps={[
            { title: "Read the state bulletin", body: "Confirm eligibility clauses, document formats, verification centers, bond terms, and category certificate validity." },
            { title: "Build a college list", body: "Use state quota closing ranks by category, fee type, bond, and location instead of comparing only all-India rank." },
            { title: "Attend verification", body: "Many states require physical document verification or help-center confirmation before merit list publication." },
            { title: "Lock choices carefully", body: "Choice locking rules, upgrade options, and resignation windows vary by state and can affect later rounds." },
          ]}
        />
      </div>

      {/* Large CTA Section */}
      <QuotaCta
        title="Ready to find your State Seat?"
        description="Use our State-wise College Predictor to see which institutions you qualify for based on your NEET score, state rank, and category."
        actions={[
          {
            label: "Start Predictor",
            href: "/rank-predictor",
            variant: "primary",
          },
          {
            label: "Download Seat Matrix",
            href: "#",
            variant: "secondary",
          }
        ]}
      />
    </QuotaPageShell>
  );
}
