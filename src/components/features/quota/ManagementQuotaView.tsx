"use client";

import { QuotaHeader, QuotaCta } from "./QuotaShared";
import { Container } from "@/components/common/Container";
import { FiArrowRight, FiDownload, FiCheck, FiCompass, FiShield, FiGlobe, FiLayers, FiMapPin, FiTrendingUp } from "react-icons/fi";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

import { mqStatesData as mqStates, managementQuotaSubHeaders, managementQuotaOverviewStats } from "./content";
import Link from "next/link";

const renderIcon = (name: string) => {
  if (name === "shield") return <FiShield className="text-lg" />;
  if (name === "compass") return <FiCompass className="text-lg" />;
  return null;
};

export function ManagementQuotaView() {
  return (
    <div className="py-10 bg-background">
      <Container size="page">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas", href: "/quota" },
              { label: "Management Quota" },
            ]}
          />
        </div>

        {/* Header */}
        <QuotaHeader
          eyebrow="ADMISSION GUIDE 2026"
          title="Understanding"
          highlightedText="Management Quota (MQ)"
          description="A strategic pathway for medical aspirants seeking admission into private institutions across India, offering flexibility without domicile restrictions."
          imageSrc="/brand/home/hero.png"
          imageAlt="Management Quota Admissions Guidance"
        />

        {/* Small info cards below header */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 -mt-8">
          {managementQuotaSubHeaders.map((sub) => (
            <div key={sub.title} className="flex items-center gap-3 p-4 rounded-lg border border-outline-variant bg-surface-container-lowest">
              <div className="p-2 bg-primary-fixed text-primary rounded-lg">
                {renderIcon(sub.icon)}
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-sm mb-0.5">{sub.title}</h4>
                <p className="text-xs text-on-surface-variant">{sub.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Overview Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Block */}
            <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <FiLayers className="text-xl text-primary" />
                  <h3 className="text-lg font-bold text-on-surface font-headline-md">Overview</h3>
                  <span className="text-xs text-on-surface-variant italic ml-auto">For private college admissions</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {managementQuotaOverviewStats.map((stat) => (
                    <div key={stat.label} className="p-4 rounded-lg border border-outline-variant bg-surface-container-low">
                      <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">{stat.label}</div>
                      <div className={`font-bold text-sm ${stat.isPrimaryValue ? "text-primary" : "text-on-surface"}`}>{stat.value}</div>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">{stat.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 p-4 rounded-xl bg-primary-fixed/30 border border-primary/20 text-on-surface-variant text-xs">
                  <FiCheck className="text-base shrink-0 mt-0.5 text-primary" />
                  <p className="leading-relaxed">
                    <strong>Process Note:</strong> Management quota registrations and fee submission details vary for each state authority. Candidates must register on the respective state DME portals during the scheduled windows.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Block */}
            <div className="lg:col-span-4 bg-gradient-to-br from-primary-pressed to-primary text-on-primary rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute right-[-30px] top-[-30px] opacity-10 text-[200px] pointer-events-none">
                MQ
              </div>
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white">
                  <FiGlobe className="text-2xl" />
                </div>
                <h3 className="font-bold text-xl text-white font-headline-md">Open State Advantage</h3>
                <p className="text-xs text-white/85 leading-relaxed">
                  Open states (like Karnataka, Rajasthan, Uttar Pradesh) allow candidates from any state to apply for their private college management quota seats, presenting excellent options for students with moderate NEET scores.
                </p>
              </div>
              <button
                type="button"
                className="mt-6 w-full py-3 bg-white text-primary font-bold rounded-xl text-xs hover:bg-opacity-95 transition-all cursor-pointer active:scale-95"
              >
                View Open States List
              </button>
            </div>
          </div>
        </section>

        {/* State-wise Management Quotas */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-headline-md text-on-surface">State-wise Management Quotas</h2>
            <p className="text-sm text-on-surface-variant mt-1">Highlights of key medical hubs and their estimated MQ cutoffs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mqStates.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative background accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-fixed/20 to-transparent rounded-bl-full pointer-events-none transition-transform duration-300 group-hover:scale-110" />

                <div>
                  {/* Header: State & Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-primary-fixed/50 text-primary rounded-xl flex items-center justify-center">
                        <FiMapPin className="text-base" />
                      </div>
                      <span className="font-bold text-base text-on-surface">
                        {item.state}
                      </span>
                    </div>
                    
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-surface-container text-on-surface-variant border border-outline-variant/60">
                      <FiTrendingUp className="text-xs text-primary" />
                      <span>Cutoff</span>
                    </span>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3 rounded-2xl bg-surface-container-low/70 border border-outline-variant/40">
                      <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Seats Available</span>
                      <span className="font-bold text-on-surface text-sm">{item.seats}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-surface-container-low/70 border border-outline-variant/40">
                      <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Expected Rank</span>
                      <span className="font-bold text-primary text-sm">{item.rankRange}</span>
                    </div>
                  </div>

                  {/* Notes / Descriptions */}
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    {item.notes}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-4 border-t border-outline-variant/40 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Estimated Cutoff</span>
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-primary bg-primary-fixed/40 hover:bg-primary-fixed transition-all duration-200"
                  >
                    <span>Counselling Details</span>
                    <FiArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <QuotaCta
          title="Compare Private College Fee Structures"
          description="Access the complete list of private medical colleges, management quota seat matrices, and actual year-wise fees for all states."
          actions={[
            {
              label: "Compare Colleges",
              href: "#",
              variant: "primary",
            },
            {
              label: "Download Brochure",
              href: "#",
              variant: "secondary",
            },
          ]}
        />
      </Container>
    </div>
  );
}
