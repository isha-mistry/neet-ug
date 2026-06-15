"use client";

import { QuotaHeader } from "./QuotaShared";
import { Container } from "@/components/common/Container";
import { FiExternalLink } from "react-icons/fi";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

import { resourceData, topPortals } from "./content";

export function CounsellingResourcesView() {
  return (
    <div className="py-10 bg-background animate-fadeIn">
      <Container size="page">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas", href: "/quota" },
              { label: "Counselling Resources" },
            ]}
          />
        </div>

        {/* Header */}
        <QuotaHeader
          eyebrow="OFFICIAL PORTALS HUB"
          title="Counselling"
          highlightedText="Resources"
          description="Your authoritative gateway to medical admissions in India. Access verified official portals for Central and State-level NEET UG counselling in one streamlined hub."
          imageSrc="/brand/home/hero.png"
          imageAlt="Admissions Portal Counselling Resources"
        />

        {/* Status badges below header */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 -mt-8">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-outline-variant bg-surface-container-lowest">
            <span className="material-symbols-outlined text-sm text-primary">link</span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">Official Portals</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-outline-variant bg-surface-container-lowest">
            <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">2026 Cycle Active</span>
          </div>
        </section>

        {/* All Counselling Resources List */}
        <section className="mb-20 space-y-12">
          {Object.entries(resourceData).map(([key, rows]) => {
            const title =
              key === "central"
                ? "Central & National Portals"
                : key === "mp"
                ? "Madhya Pradesh Counselling Resources"
                : `${key.charAt(0).toUpperCase() + key.slice(1)} State Counselling Resources`;

            return (
              <div key={key} className="space-y-4">
                <h3 className="text-lg font-bold text-on-surface pb-2">
                  {title}
                </h3>
                <div className="overflow-hidden border border-outline-variant rounded-2xl bg-surface-container-lowest shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low text-on-surface-variant font-bold text-xs uppercase border-b border-outline-variant">
                          <th className="px-6 py-4">Governing Body</th>
                          <th className="px-6 py-4">Official URL</th>
                          <th className="px-6 py-4">Primary Usage</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/60 text-sm">
                        {rows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-surface-container-lowest/50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-on-surface">{row.body}</td>
                            <td className="px-6 py-4">
                              <a
                                href={row.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary font-medium hover:underline break-all"
                              >
                                {row.url.replace("https://", "").replace("http://", "")}
                              </a>
                            </td>
                            <td className="px-6 py-4 text-on-surface-variant max-w-sm">{row.usage}</td>
                            <td className="px-6 py-4 text-right">
                              <a
                                href={row.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
                              >
                                Open Portal <FiExternalLink />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Top Verified Portals */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-2 border-l-4 border-primary pl-4">
            <h2 className="text-xl font-bold font-headline-md text-on-surface">Top Verified Portals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topPortals.map((portal, idx) => (
              <div key={idx} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="p-3 bg-primary-fixed text-primary rounded-xl">
                      <span className="material-symbols-outlined text-lg">{portal.icon}</span>
                    </div>
                    <span className="text-[9px] font-bold text-text-muted bg-surface-container px-2 py-0.5 rounded-full border border-outline-variant/40">
                      {portal.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface mb-2">{portal.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                    {portal.desc}
                  </p>
                </div>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-on-primary font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 text-center"
                >
                  Open Portal <FiExternalLink />
                </a>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
