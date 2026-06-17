"use client";

import { useState } from "react";
import { QuotaHeader, QuotaCta, QuotaPageShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel } from "./QuotaShared";

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

export function StateQuotaView() {
  const [activeTab, setActiveTab] = useState<StateTab>("gujarat");
  const content = stateDetails[activeTab];
  const matrix = stateSeatMatrix[activeTab];
  const docs = stateDocumentation[activeTab];

  // Eligibility Checker State
  const [name, setName] = useState("");
  const [tenthState, setTenthState] = useState("Gujarat");
  const [twelfthState, setTwelfthState] = useState("Gujarat");
  const [rank, setRank] = useState("");
  const [isDomicile, setIsDomicile] = useState(false);
  const [checkerResult, setCheckerResult] = useState<string | null>(null);

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    const activeStateName = activeTab === "mp" ? "Madhya Pradesh" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

    if (!isDomicile) {
      setCheckerResult(`❌ Domicile Certificate is mandatory for ${activeStateName} State Quota. You are not eligible without it.`);
      return;
    }

    if (activeTab === "gujarat") {
      if (tenthState === "Gujarat" && twelfthState === "Gujarat") {
        setCheckerResult(`✅ Eligible! You meet the criteria for Gujarat State Quota (Passed 10th & 12th in GJ with Domicile).`);
      } else {
        setCheckerResult(`❌ Not Eligible. Gujarat State Quota requires passing both Std 10th and 12th from Gujarat schools.`);
      }
    } else if (activeTab === "maharashtra") {
      if (tenthState === "Maharashtra" || isDomicile) {
        setCheckerResult(`✅ Eligible! You meet Maharashtra State Quota criteria (Domicile or passed 10th from Maharashtra).`);
      } else {
        setCheckerResult(`❌ Not Eligible. Maharashtra State Quota requires domicile status or passing 10th from Maharashtra.`);
      }
    } else {
      setCheckerResult(`✅ Eligible! You possess the domicile certificate required for ${activeStateName} State Quota.`);
    }
  };

  return (
    <QuotaPageShell current="State Quota" className="pb-8" containerClassName="py-8 animate-fadeIn">
        <div className="grid grid-cols-12 items-start gap-8">
          {/* Left Content Area (8 Columns) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">

            {/* Hero Overview Card */}
            <QuotaHeader
              eyebrow="Medical Counselling Guide"
              title="State Quota"
              highlightedText="(SQ) Overview"
              description="The State Quota is the most critical pathway for medical aspirants, reserving the vast majority of seats for local residents. It is governed by state-specific medical counseling bodies and offers a significant advantage to domicile candidates."
              eyebrowIcon="verified"
              watermarkIcon="location_on"
            />

            <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft md:grid-cols-3">
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
            </div>

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

            {/* State Selection Filter */}
            <section className="flex flex-col items-center gap-6 py-8">
              <h2 className="text-headline-md font-headline-md text-on-surface font-bold">Explore State-Specific Quotas</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {([
                  { id: "gujarat", label: "Gujarat" },
                  { id: "maharashtra", label: "Maharashtra" },
                  { id: "mp", label: "Madhya Pradesh" },
                  { id: "rajasthan", label: "Rajasthan" },
                ] as const).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCheckerResult(null);
                    }}
                    className={`px-6 py-2 rounded-full border font-label-md flex items-center gap-2 transition-colors active:scale-95 font-bold uppercase tracking-wider ${
                      activeTab === tab.id
                        ? "border-primary bg-primary text-on-primary shadow-sm"
                        : "border-outline text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeTab === tab.id ? "'FILL' 1" : "'FILL' 0" }}>location_on</span> {tab.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Detailed View */}
            <section className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft transition-shadow hover:shadow-clinical-hover">
              <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-on-surface text-surface flex items-center justify-center rounded-full font-bold text-lg">
                    {activeTab.charAt(0).toUpperCase()}
                  </div>
                  <h2 className="text-headline-sm font-headline-sm flex items-center gap-2 font-bold">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
                    {content.title}
                  </h2>
                </div>
                <a className="text-primary font-label-md hover:underline flex items-center gap-1 font-bold uppercase tracking-wider" href={content.portalUrl} target="_blank" rel="noopener noreferrer">
                  Official Portal <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>
              </div>
              <div className="divide-y divide-outline-variant">
                {content.rows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-3 p-4 items-center hover:bg-surface-container-low/50 transition-colors">
                    <div className="font-label-md text-on-surface-variant font-bold uppercase tracking-wider">{row.parameter}</div>
                    <div className="col-span-2 text-body-md font-medium leading-relaxed">{row.detail}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Seat Matrix Distribution */}
            <section className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft transition-shadow hover:shadow-clinical-hover">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-headline-sm font-headline-sm font-bold">Seat Matrix Distribution</h3>
                <span className="text-label-sm bg-surface-container-high px-2 py-1 rounded font-bold uppercase tracking-wider">
                  {activeTab === "mp" ? "MADHYA PRADESH" : activeTab.toUpperCase()} STATE
                </span>
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
                <div className="relative flex items-center justify-center p-4 border border-outline-variant rounded-xl bg-surface-bright overflow-hidden">
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
            </section>

            {/* Comparison Tool */}
            <section className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft">
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
                <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4 transition-shadow hover:shadow-md">
                  <h4 className="font-bold mb-2 flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-blue-500" style={{ fontVariationSettings: "'FILL' 1" }}>public</span> AIQ (15%)
                  </h4>
                  <ul className="text-body-sm space-y-2 text-on-surface-variant">
                    <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> Higher cutoff scores required</li>
                    <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> Any Indian citizen can apply</li>
                    <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> Centralized MCC Counseling</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 transition-shadow hover:shadow-md">
                  <h4 className="font-bold mb-2 flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span> State Quota (85%)
                  </h4>
                  <ul className="text-body-sm space-y-2 text-on-surface-variant">
                    <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Significant rank advantage</li>
                    <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Strict domicile requirements</li>
                    <li className="flex gap-2"><span className="text-primary font-bold">✓</span> Specific state-wise rules</li>
                  </ul>
                </div>
              </div>
            </section>

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

          {/* Right Sidebar Area (4 Columns) */}
          <aside className="col-span-12 lg:col-span-4 space-y-6 lg:sticky lg:top-24">

            {/* Eligibility Checker Form */}
            <section className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft">
              <div className="bg-primary p-4 text-on-primary">
                <h3 className="text-title-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rule</span> State Eligibility Checker
                </h3>
              </div>
              <form onSubmit={handleCheckEligibility} className="p-6 space-y-4">
                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block font-bold">Full Name</label>
                  <input
                    className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary text-body-sm py-2 px-3 bg-surface-bright"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-label-md text-on-surface-variant mb-1 block font-bold">10th State</label>
                    <select
                      className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary text-body-sm py-2 px-3 bg-surface-bright"
                      value={tenthState}
                      onChange={(e) => setTenthState(e.target.value)}
                    >
                      <option value="Gujarat">Gujarat</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-label-md text-on-surface-variant mb-1 block font-bold">12th State</label>
                    <select
                      className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary text-body-sm py-2 px-3 bg-surface-bright"
                      value={twelfthState}
                      onChange={(e) => setTwelfthState(e.target.value)}
                    >
                      <option value="Gujarat">Gujarat</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block font-bold">NEET Category Rank</label>
                  <input
                    className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary text-body-sm py-2 px-3 bg-surface-bright"
                    placeholder="e.g. 15400"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="flex items-start gap-2 pt-2">
                  <input
                    className="mt-1 rounded text-primary focus:ring-primary border-outline-variant cursor-pointer"
                    id="domicile"
                    checked={isDomicile}
                    onChange={(e) => setIsDomicile(e.target.checked)}
                    type="checkbox"
                  />
                  <label className="text-body-sm text-on-surface-variant cursor-pointer font-medium" htmlFor="domicile">
                    I possess a valid State Domicile Certificate.
                  </label>
                </div>
                <button
                  className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold shadow-md hover:bg-primary/90 transition-all active:scale-[0.98] uppercase tracking-wider text-sm mt-2"
                  type="submit"
                >
                  Check Eligibility
                </button>
                {checkerResult && (
                  <div className={`p-3 rounded-lg mt-4 text-sm font-medium ${checkerResult.includes("✅") ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                    {checkerResult}
                  </div>
                )}
              </form>
            </section>

            {/* Warning Card */}
            <section className="relative overflow-hidden rounded-2xl border border-primary/15 bg-primary-container p-6 text-on-primary-container shadow-clinical-soft">
              <div className="relative z-10">
                <h4 className="font-bold text-headline-sm mb-2">SEBC Rule</h4>
                <p className="text-body-sm opacity-90 mb-4 leading-relaxed">
                  Gujarat follows strict SEBC (Socially and Educationally Backward Classes) norms. A valid Non-Creamy Layer (NCL) certificate from Gujarat is mandatory.
                </p>
                <div className="flex items-center gap-2 text-label-md font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">info</span>
                  Check validity before Aug 2026
                </div>
              </div>
              {/* Decorative Icon */}
              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] opacity-10 rotate-12 pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </section>

            {/* Documentation Sticky */}
            <section className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft transition-shadow hover:shadow-clinical-hover">
              <h3 className="text-title-lg mb-4 flex items-center gap-2 font-bold text-on-surface">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                Mandatory Documentation
              </h3>
              <ul className="space-y-3">
                {docs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-600 text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="text-body-sm text-on-surface-variant font-medium leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-surface-container-highest rounded-lg border border-outline-variant/30">
                <p className="text-label-sm text-on-surface-variant flex items-center gap-2 font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                  Tip: Document verification requires physical presence at Help Centers.
                </p>
              </div>
            </section>

          </aside>
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
