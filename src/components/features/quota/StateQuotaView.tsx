"use client";

import { useState } from "react";
import { QuotaHeader, QuotaCta } from "./QuotaShared";
import { Container } from "@/components/common/Container";
import { FiMapPin, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

import { stateDetailsData as stateDetails, stateQuotaHighlights, type StateTab, type StateContent } from "./content";

export function StateQuotaView() {
  const [activeTab, setActiveTab] = useState<StateTab>("gujarat");
  const content = stateDetails[activeTab];

  return (
    <div className="py-10 bg-background animate-fadeIn">
      <Container size="page">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas", href: "/quota" },
              { label: "State Quota" },
            ]}
          />
        </div>

        {/* Header */}
        <QuotaHeader
          eyebrow="MEDICAL COUNSELLING GUIDE"
          title="State Quota"
          highlightedText="(SQ)"
          titleSuffix="Overview"
          description="The State Quota is the most critical pathway for medical aspirants, reserving the vast majority of seats for local residents. It is governed by state-specific medical counseling bodies and offers a significant advantage to domicile candidates."
          imageSrc="/brand/home/hero.png"
          imageAlt="State Quota counselling discussion"
        />

        {/* Highlight Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stateQuotaHighlights.map((highlight) => (
            <div key={highlight.title} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex items-start gap-4">
              <div className="p-3 bg-primary-fixed text-primary rounded-xl shrink-0">
                <span className="material-symbols-outlined text-xl">{highlight.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-on-surface mb-1">{highlight.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {highlight.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Interactive State Switcher Section */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold font-headline-md text-on-surface">Explore State-Specific Quotas</h2>
            <p className="text-sm text-on-surface-variant mt-2 max-w-xl mx-auto">
              Admission rules, seat matrices, and reservation policies vary significantly by state. Select your domicile state for detailed insights.
            </p>
          </div>

          {/* State switcher tabs */}
          <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
            {(["gujarat", "maharashtra", "mp", "rajasthan"] as StateTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all border shrink-0 cursor-pointer ${
                  activeTab === tab
                    ? "bg-primary border-primary text-on-primary shadow-md"
                    : "bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary"
                }`}
              >
                <FiMapPin className="text-sm" />
                {tab === "mp" ? "Madhya Pradesh" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Info table */}
            <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-2xl text-primary">account_balance</span>
                  <h3 className="text-lg font-bold text-on-surface font-headline-md">
                    {content.title}
                  </h3>
                </div>

                <div className="divide-y divide-outline-variant/60 text-sm">
                  {content.rows.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 py-4 gap-2">
                      <span className="font-semibold text-on-surface-variant">{row.parameter}</span>
                      <span className="md:col-span-2 text-on-surface">{row.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/50">
                <a
                  href={content.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  Official Portal: {content.portalName} <FiArrowRight />
                </a>
              </div>
            </div>

            {/* Sidebar Callouts */}
            <div className="flex flex-col gap-6">
              {/* Callout 1 */}
              <div className="bg-gradient-to-br from-primary-pressed to-primary text-on-primary rounded-3xl p-6 relative overflow-hidden flex-1 shadow-md">
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-9xl">
                  <FiAlertCircle />
                </div>
                <h4 className="font-bold text-base text-white mb-2">{content.sidebarTitle}</h4>
                <p className="text-xs text-white/90 leading-relaxed">{content.sidebarText}</p>
              </div>

              {/* Callout 2 */}
              <div className="bg-primary-fixed border border-outline-variant rounded-3xl p-6 flex-1 shadow-sm">
                <h4 className="font-bold text-base text-primary mb-2">{content.tipTitle}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">{content.tipText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
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
            },
          ]}
        />
      </Container>
    </div>
  );
}
