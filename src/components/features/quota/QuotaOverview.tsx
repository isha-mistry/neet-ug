"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheckCircle, FiGlobe, FiBookOpen } from "react-icons/fi";
import { Container } from "@/components/common/Container";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { quotaTypesOverviewData as quotaTypes, quotaOverviewHeroRules, mccCounsellingGuide } from "./content";

export function QuotaOverview() {
  const { roleOfMcc, candidateGuidelines } = mccCounsellingGuide;
  const keyGuidelines = candidateGuidelines.slice(0, 4);

  return (
    <div className="py-10 bg-background">
      <Container size="page">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary-fixed">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              Medical Admission Guide
            </div>
            
            <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight">
              Understanding the <span className="text-primary">Seat Quota</span> System
            </h1>
            
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              {roleOfMcc.summary} Quotas determine where you register, who conducts counselling, and which eligibility rules apply. Plan your NEET-UG admission strategy using our detailed guidelines.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {quotaOverviewHeroRules.map((rule) => (
                <div key={rule.title} className="flex gap-4 p-4 rounded-lg border border-outline-variant bg-surface-container-lowest">
                  <div className="flex-shrink-0 text-primary mt-1">
                    <span className="material-symbols-outlined text-2xl">{rule.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm mb-1">{rule.title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-fixed to-secondary-fixed rounded-2xl blur opacity-30"></div>
            <div className="relative rounded-2xl overflow-hidden border border-outline-variant shadow-lg bg-surface-container-lowest">
              <Image
                src="/brand/home/hero.png"
                alt="Medical Admissions Counselling Guide"
                width={500}
                height={380}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Quota Types Grid */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline-xl text-on-surface tracking-tight">
              Primary{" "}
              <span className="relative inline-block text-primary">
                Quota
                <span className="absolute bottom-1 left-0 w-full h-[3px] bg-primary rounded-full"></span>
              </span>{" "}
              Types
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotaTypes.map((quota) => (
              <div
                key={quota.slug}
                className="flex flex-col bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-flex px-3 py-1 rounded-lg text-xs font-bold bg-primary-fixed text-primary">
                    {quota.abbreviation}
                  </span>
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      quota.domicileStatus === "DOMICILE YES"
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container text-on-surface-variant border border-outline-variant"
                    }`}
                  >
                    {quota.domicileStatus === "SPECIFIC" ? "SPECIFIC" : quota.domicileStatus}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-on-surface mb-6 font-headline-md">
                  {quota.name}
                </h3>

                <div className="space-y-3.5 mb-6 text-sm flex-1">
                  <div className="flex justify-between items-center pb-2 border-b border-surface-container">
                    <span className="text-on-surface-variant font-medium">Seats %</span>
                    <span className="font-semibold text-on-surface">{quota.seats}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-surface-container">
                    <span className="text-on-surface-variant font-medium">Counseling</span>
                    <span className="font-semibold text-on-surface text-right max-w-[180px] truncate">
                      {quota.counseling}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant font-medium">Fee Range</span>
                    <span className="font-bold text-primary">{quota.feeRange}</span>
                  </div>
                </div>

                <Link
                  href={`/quota/${quota.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:gap-2 transition-all"
                >
                  View details <FiArrowRight className="text-sm" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Key Rules & Eligibility Callout Box */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-pressed to-primary text-on-primary p-8 md:p-12 shadow-2xl">
          {/* Wave illustration overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
            <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 400 C 150 450, 350 350, 500 400 C 650 450, 750 420, 800 400 L 800 600 L 0 600 Z" fill="currentColor" />
              <path d="M0 300 C 200 250, 400 380, 600 300 C 700 260, 750 280, 800 300 L 800 600 L 0 600 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-white/10 rounded-2xl text-white">
                <FiBookOpen className="text-3xl" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-headline-xl text-white">
                  Key Rules &amp; Eligibility
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  Critical protocols for valid registration and seat retention.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {keyGuidelines.map((guideline) => (
                <div key={guideline} className="flex gap-4">
                  <FiCheckCircle className="text-xl text-white mt-1 flex-shrink-0" />
                  <p className="text-sm text-white/85 leading-relaxed">{guideline}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/neet-ug-2026/counselling-guide"
                className="px-8 py-3.5 bg-white text-primary font-bold rounded-xl text-sm transition-all hover:bg-opacity-95 hover:shadow-lg active:scale-95"
              >
                Full MCC Counselling Guide
              </Link>
              <a
                href="https://mcc.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white font-bold rounded-xl text-sm transition-all hover:bg-white/10"
              >
                <FiGlobe /> Official MCC Portal
              </a>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
