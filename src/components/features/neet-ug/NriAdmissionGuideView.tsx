"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { NriCollegesGrid } from "@/components/features/neet-ug/NriCollegesGrid";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";

export function NriAdmissionGuideView() {
  const eligibilityCriteria = [
    {
      title: "Category A: True NRI Candidates",
      rules: [
        "Candidate must hold a valid Indian passport and reside outside India (having NRI status).",
        "Must have qualified in the NEET UG 2026 examination by scoring above the minimum qualifying cutoffs.",
        "Must have completed 10+2 outside India with Physics, Chemistry, Biology, and English subjects.",
      ],
    },
    {
      title: "Category B: NRI-Sponsored Candidates",
      rules: [
        "Candidate is an Indian resident, but sponsored by a first-degree NRI relative (parents, siblings, first cousins, or direct uncles/aunts).",
        "Sponsor must provide a relationship affidavit, family tree verified by revenue officials, and copy of passport/visa.",
        "Sponsor must undertake full responsibility to pay the college fees in foreign currency (USD or equivalent).",
      ],
    },
  ];

  return (
    <>
      {/* Hero Header with gold-indigo premium layout styling */}
      <Section tone="default" className="py-8 md:py-12 bg-gradient-to-b from-tertiary-fixed/30 via-background to-background">
        <Container size="2xl" className="flex flex-col gap-8">
          
          {/* Breadcrumbs */}
          <nav className="flex text-xs font-medium text-text-muted">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2 text-border">/</span>
            <Link href="/neet-ug-2026" className="hover:text-primary">NEET UG 2026</Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-text-secondary">NRI MBBS Admission Guide</span>
          </nav>

          <PageHeader
            eyebrow="PREMIUM ADMISSION PATHWAY"
            title="NRI MBBS Admission & Counselling Guide"
            description="Complete blueprint for Non-Resident Indians (NRIs) and NRI-sponsored candidates seeking medical seats in Deemed & Private institutions."
          />

          {/* Premium Showcase Banner */}
          <Card className="bg-gradient-to-r from-tertiary to-tertiary-container text-white p-6 md:p-8 rounded-2xl shadow-level-2 border border-tertiary-container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-2 max-w-xl">
                <span className="text-on-tertiary-fixed text-xs font-bold uppercase tracking-widest block">Premium Counselling Support</span>
                <h2 className="text-2xl font-bold tracking-tight text-white">Targeting Deemed & NRI Quota Medical Seats?</h2>
                <p className="text-tertiary-fixed text-sm md:text-base">NRI fee structures, relationship verification affidavits, and institutional counseling rounds require precise compliance to prevent seat cancellation.</p>
              </div>
              <Button
                as="link"
                href="#nri-counseling-form"
                variant="outline"
                className="bg-white text-tertiary hover:bg-slate-50 border-none px-6 py-3 rounded-xl shadow font-bold text-sm"
              >
                Request Callback
              </Button>
            </div>
          </Card>

          {/* Eligibility Sections */}
          <div className="flex flex-col gap-6 mt-4">
            <h3 className="text-2xl font-bold text-text flex items-center gap-2">
              <MaterialSymbol name="manage_accounts" className="text-tertiary text-2xl" />
              NRI Eligibility & Sponsor Framework
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eligibilityCriteria.map((crit, idx) => (
                <Card key={idx} padded bordered className="bg-white/90 border border-border/80 rounded-2xl shadow-sm">
                  <h4 className="text-base font-bold text-tertiary flex items-center gap-2 mb-3">
                    <MaterialSymbol name="check_circle" className="text-tertiary" />
                    {crit.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {crit.rules.map((rule, ruleIdx) => (
                      <li key={ruleIdx} className="text-xs md:text-sm text-text-secondary leading-relaxed list-disc ml-4 pl-1">
                        {rule}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          {/* Premium Colleges & Fees Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 items-start">
            
            {/* College grid list */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold text-text flex items-center gap-2">
                  <MaterialSymbol name="domain_add" className="text-tertiary text-2xl" />
                  Top Deemed Universities for NRI Quota
                </h3>
                <p className="text-sm text-text-secondary">Average tuition fee structure and NRI seat availability for highly-rated medical colleges.</p>
              </div>

              <NriCollegesGrid />
            </div>

            {/* Premium Lead Form */}
            <div id="nri-counseling-form" className="lg:col-span-1">
              <Card className="bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl shadow-xl sticky top-24">
                <div className="flex flex-col gap-4">
                  <div className="bg-tertiary text-white w-12 h-12 rounded-xl flex items-center justify-center">
                    <MaterialSymbol name="gold_medal" size="lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Book NRI Consultation</h3>
                    <p className="text-xs text-slate-400 mt-1">Get custom admissions guidance from premium mentors specialized in NRI documentation & budgets.</p>
                  </div>

                  <NeetLeadForm
                    type="phone-whatsapp"
                    ctaText="Request Premium Help"
                    successTitle="Admissions Request Logged!"
                    successDesc="A senior executive from our premium counseling cell will reach out to address your options within 12 business hours."
                  />
                </div>
              </Card>
            </div>
          </div>

        </Container>
      </Section>
    </>
  );
}
