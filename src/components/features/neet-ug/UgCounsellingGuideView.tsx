"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { CounsellingTimeline } from "@/components/features/neet-ug/CounsellingTimeline";
import { CounsellingRounds } from "@/components/features/neet-ug/CounsellingRounds";
import { DocumentChecklist } from "@/components/features/neet-ug/DocumentChecklist";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";

export function UgCounsellingGuideView() {
  return (
    <>
      <Section tone="default" className="py-8 md:py-12 bg-gradient-to-b from-brand-50/20 to-background">
        <Container size="2xl" className="flex flex-col gap-8">
          
          {/* Breadcrumbs */}
          <nav className="flex text-xs font-medium text-text-muted">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2 text-border">/</span>
            <Link href="/neet-ug-2026" className="hover:text-primary">NEET UG 2026</Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-text-secondary">Counselling Process Guide</span>
          </nav>

          <PageHeader
            eyebrow="COUNSELLING WALKTHROUGH"
            title="NEET UG Counselling Step-by-Step Guide"
            description="Explore All India Quota (MCC) and State counseling stages. Understand registration, choice locks, and complex seat allocation rules across rounds."
          />

          {/* Interactive Steps Visualizer */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-text flex items-center gap-2">
              <MaterialSymbol name="route" className="text-primary" />
              Four Stages of Seat Counselling
            </h3>

            <CounsellingTimeline />
          </div>

          {/* Split Section: Rounds Tab & Document Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Rounds Rules column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-text flex items-center gap-2">
                  <MaterialSymbol name="gavel" className="text-primary" />
                  Counselling Rounds & Rules
                </h3>
                <p className="text-xs text-text-muted">Rules governing exit options, security fees, and upgrades vary across counseling cycles.</p>
              </div>

              <CounsellingRounds />
            </div>

            {/* Document Checklist Sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <DocumentChecklist />
            </div>
          </div>

          {/* Expert Counselling Help Request */}
          <div className="bg-surface-elevated border border-border rounded-3xl p-8 md:p-12 shadow-sm flex flex-col lg:flex-row items-center gap-8 mt-4">
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-primary text-text-on-brand w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
                <MaterialSymbol name="contact_phone" size="lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text">Get 1-on-1 Counselling Guidance</h3>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                  Confused about round upgrades, private vs deemed budgets, or choice preference order? Schedule a direct callback from our professional admission counselling mentors.
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                  <MaterialSymbol name="verified" className="text-green-500" />
                  Verified Mentors
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                  <MaterialSymbol name="schedule" className="text-green-500" />
                  Within 24 Hours SLA
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96 bg-white p-6 rounded-2xl border border-border shadow-sm">
              <NeetLeadForm
                type="phone-whatsapp"
                ctaText="Request Expert Call"
                successTitle="Request Registered!"
                successDesc="Our counseling executive will call you within 24 business hours to address your NEET counseling doubts."
              />
            </div>
          </div>

        </Container>
      </Section>
    </>
  );
}
