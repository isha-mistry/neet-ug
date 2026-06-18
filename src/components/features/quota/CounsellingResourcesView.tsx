"use client";

import Link from "next/link";
import { QuotaHeader, QuotaCta, QuotaPageShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel } from "./QuotaShared";
import { DocumentChecklistWidget } from "./MccContentBlocks";
import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";

import { quotaTheoryContent, resourceData, topPortals } from "./content";

export function CounsellingResourcesView() {
  return (
    <QuotaPageShell current="Counselling Resources" className="pb-8" containerClassName="py-8 animate-fadeIn">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        {/* Left Content Area (8 Columns) */}
        <div className="lg:col-span-8 space-y-12">

          {/* Hero Section */}
          <QuotaHeader
            eyebrow="Verified Gateways"
            title="Official Counselling"
            highlightedText="Gateways"
            description="Access authenticated portals for medical admissions. We maintain live links to central and state authorities to ensure you never miss a deadline."
            eyebrowIcon="verified"
            watermarkIcon="map"
          />

          <QuotaInfoGrid
            items={[
              {
                icon: "security",
                title: "Use official domains only",
                body: "Before entering credentials or making payment, verify the domain, SSL certificate, and authority name against the admission bulletin.",
              },
              {
                icon: "notifications_active",
                title: "Track notices daily",
                body: "Counselling bodies may publish corrected schedules, revised seat matrices, and extension notices with little lead time.",
              },
              {
                icon: "folder_copy",
                title: "Keep evidence organized",
                body: "Save registration forms, payment receipts, choice-locking slips, allotment letters, and reporting acknowledgements round-wise.",
              },
            ]}
          />

          <QuotaTheoryPanel {...quotaTheoryContent.resources} />

          {/* Central Portals Section */}
          <section className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft" id="central-portals">
            <div className="p-6 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface m-0">Central &amp; National Portals</h2>
              </div>
              <span className="text-label-md text-on-surface-variant font-bold tracking-wider uppercase">{resourceData.central?.length || 0} Gateways Active</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-lowest border-b border-outline-variant">
                    <th className="px-6 py-4 font-label-md text-on-surface-variant tracking-wider uppercase">Authority</th>
                    <th className="px-6 py-4 font-label-md text-on-surface-variant tracking-wider uppercase">Primary Usage</th>
                    <th className="px-6 py-4 font-label-md text-on-surface-variant tracking-wider uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {resourceData.central?.map((row, idx) => {
                    const authorityParts = row.body.split(" ");
                    const abbr = authorityParts[0];
                    const fullForm = authorityParts.slice(1).join(" ").replace(/^\((.*)\)$/, "$1");
                    return (
                      <tr key={idx} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-6 py-5">
                          <div className="font-title-lg text-title-lg font-bold text-on-surface">{abbr}</div>
                          {fullForm && <div className="text-body-sm text-on-surface-variant max-w-[200px]">{fullForm}</div>}
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-body-sm text-on-surface-variant max-w-sm">{row.usage}</p>
                        </td>
                        <td className="px-6 py-5 text-right whitespace-nowrap">
                          <a className="inline-flex items-center gap-2 text-primary font-bold hover:underline" href={row.url} target="_blank" rel="noopener noreferrer">
                            Open Portal <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* State Portals Section */}
          <section className="space-y-6" id="state-portals">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-tertiary-container text-on-tertiary-container rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined">map</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface m-0">State-Specific Resources</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(resourceData)
                .filter(([key]) => key !== "central")
                .map(([key, rows]) => {
                  const stateName = key === "mp" ? "Madhya Pradesh" : key.charAt(0).toUpperCase() + key.slice(1);
                  return rows.map((row, idx) => (
                    <div key={`${key}-${idx}`} className="flex flex-col justify-between rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft transition-shadow hover:shadow-clinical-hover">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="font-headline-sm text-headline-sm font-bold text-primary">{stateName}</div>
                          <span className="bg-tertiary/10 text-tertiary text-label-md px-3 py-1 rounded-full whitespace-nowrap">State Quota</span>
                        </div>
                        <div className="space-y-4 mb-6">
                          <div>
                            <div className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Governing Body</div>
                            <div className="text-body-md font-medium text-on-surface">{row.body}</div>
                          </div>
                          <div>
                            <div className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Primary Usage</div>
                            <p className="text-body-sm text-on-surface-variant">{row.usage}</p>
                          </div>
                        </div>
                      </div>
                      <a className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-on-primary transition-colors hover:bg-primary-hover" href={row.url} target="_blank" rel="noopener noreferrer">
                        Open Portal
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      </a>
                    </div>
                  ));
                })}
            </div>
          </section>

          {/* State Counselling Hub Section */}
          <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-surface-container-lowest via-surface-container-lowest to-primary/[0.04] p-6 shadow-clinical-soft md:p-8">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl" aria-hidden />

            <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_220px] items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-primary">
                  <span className="material-symbols-outlined text-[12px] font-black">explore</span>
                  State counselling hub
                </div>
                <h3 className="mt-4 text-xl font-black leading-tight tracking-tight text-on-surface md:text-2xl">
                  Detailed State Counselling Guides
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  Compare eligibility rules, bond terms, and step-by-step counselling schedules across all states. Reserving 85% of government medical seats, state quotas are critical to your admission strategy.
                </p>

                {/* Quick state links */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/state-counselling/gujarat" className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-surface-container-low border border-outline-variant hover:bg-surface-container-lowest text-on-surface transition-all">Gujarat</Link>
                  <Link href="/state-counselling/maharashtra" className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-surface-container-low border border-outline-variant hover:bg-surface-container-lowest text-on-surface transition-all">Maharashtra</Link>
                  <Link href="/state-counselling/mp" className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-surface-container-low border border-outline-variant hover:bg-surface-container-lowest text-on-surface transition-all">Madhya Pradesh</Link>
                  <Link href="/state-counselling/rajasthan" className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-surface-container-low border border-outline-variant hover:bg-surface-container-lowest text-on-surface transition-all">Rajasthan</Link>
                </div>
              </div>

              <div className="w-full">
                <Link
                  href="/state-counselling"
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-on-primary transition hover:bg-primary-hover active:scale-95 shadow-sm text-center"
                >
                  View All States
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Document Checklist Integration */}
          <section id="documents" className="pt-4">
            <DocumentChecklistWidget />
          </section>

          <QuotaProcessList
            title="Portal Safety Workflow"
            subtitle="Use this every time you register, pay, or lock choices."
            steps={[
              { title: "Open from verified link", body: "Use the official portal link from MCC, state DME, or university bulletin rather than search ads or forwarded messages." },
              { title: "Check candidate details", body: "Confirm NEET roll number, category, PwD status, mobile number, and email before paying registration fees." },
              { title: "Download receipts", body: "Immediately save payment confirmation, application form, and locked-choice PDF after every submission." },
              { title: "Watch correction notices", body: "Revisit the notice board after submission because seat matrix and schedule changes can alter strategy." },
            ]}
          />

          {/* Help Banner */}
          <QuotaCta
            title="Need professional guidance?"
            description="Our expert counselors help you navigate these portals with choice filling strategies and merit list analysis."
            actions={[
              {
                label: "Free Counselling",
                href: "#",
                variant: "primary",
              },
              {
                label: "Compare Portals",
                href: "#",
                variant: "secondary",
              }
            ]}
          />
        </div>

        {/* Right Sidebar Area (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">

            {/* On this page Navigation */}
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-clinical-soft">
              <h3 className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold mb-4">On this page</h3>
              <nav className="space-y-1">
                <a className="block py-2 px-3 rounded-lg text-primary bg-primary/5 font-bold border-l-4 border-primary" href="#central-portals">Central Portals</a>
                <a className="block py-2 px-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-medium" href="#state-portals">State Resources</a>
                <a className="block py-2 px-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-medium" href="#documents">Document Checklist</a>
                <a className="block py-2 px-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-medium" href="#top-verified">Top Verified Portals</a>
              </nav>
            </div>

            {/* Live Counselling Lead Form */}
            <FreeCounsellingLeadForm
              pageLabel="Counselling Resources"
              title="Book free counselling"
              submitLabel="Book counselling"
              fields="name-phone-only"
              className="border border-outline-variant/60 shadow-clinical-soft bg-surface"
            />

            {/* Critical Notice */}
            <div className="space-y-4 rounded-2xl border border-error/20 bg-error-container/20 p-6 text-on-error-container shadow-clinical-soft">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-error mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                <div>
                  <div className="font-title-lg text-title-lg text-error mb-1 font-bold">Official Links Only</div>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">Always ensure you are on a .nic.in, .gov.in or official university domain before entering sensitive details.</p>
                </div>
              </div>
              <div className="border-t border-error/20 pt-4 text-xs text-on-surface-variant space-y-2">
                <p className="font-bold text-error">Phishing & Spoofing Warning:</p>
                <p>Multiple fake domains resembling official websites emerge during peak admission seasons. MCC/State DME will never ask for your password or SMS OTP, nor do they charge extra fees outside the official payment gateway.</p>
              </div>
            </div>

            {/* Additional Tools */}
            <div id="top-verified" className="mt-6 overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft">
              <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant">
                <h3 className="font-label-md text-on-surface-variant uppercase tracking-widest font-bold">Verified Portal Links</h3>
              </div>
              <div className="divide-y divide-outline-variant">
                {topPortals.map((portal, idx) => (
                  <a key={idx} className="flex items-start gap-4 px-6 py-4 hover:bg-surface-container-low transition-colors group" href={portal.url} target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform mt-0.5">open_in_new</span>
                    <div>
                      <div className="text-body-sm font-bold text-on-surface">{portal.title}</div>
                      <div className="text-label-sm text-on-surface-variant font-medium mt-1">{portal.badge}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </QuotaPageShell>
  );
}
