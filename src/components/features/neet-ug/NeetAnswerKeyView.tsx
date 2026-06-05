"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { NeetScoreCalculator } from "@/components/features/neet-ug/NeetScoreCalculator";
import { SubjectAnswerKeys } from "@/components/features/neet-ug/SubjectAnswerKeys";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";

export function NeetAnswerKeyView() {
  return (
    <>
      <Section tone="default" className="py-8 md:py-12 bg-gradient-to-b from-brand-50/30 to-background">
        <Container size="2xl" className="flex flex-col gap-8">
          
          {/* Breadcrumbs */}
          <nav className="flex text-xs font-medium text-text-muted">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2 text-border">/</span>
            <Link href="/neet-ug-2026" className="hover:text-primary">NEET UG 2026</Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-text-secondary">Answer Key & Calculator</span>
          </nav>

          <PageHeader
            eyebrow="NEET UG 2026 ANSWER CORES"
            title="NEET 2026 Answer Key & Score Calculator"
            description="Assess your performance with our interactive score estimation calculator. Compare answers with provisional codes and predict your counselling rank instantly."
          />

          {/* Main Content Split: Calculator & Sidebar Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Score Calculator Card */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <NeetScoreCalculator />
            </div>

            {/* Lead Download Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-surface-elevated border border-border p-6 rounded-2xl shadow-level-1 hover:shadow-level-2 transition-shadow">
                <div className="flex flex-col gap-4">
                  <div className="bg-emerald-50 text-emerald-700 w-12 h-12 rounded-xl flex items-center justify-center">
                    <MaterialSymbol name="download" size="lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text">Download Answer Key PDF</h3>
                    <p className="text-xs text-text-secondary mt-1">Get the official NTA Answer Key and OMR guidelines delivered to your WhatsApp number.</p>
                  </div>

                  <NeetLeadForm
                    type="phone-whatsapp"
                    ctaText="Get PDF on WhatsApp"
                    successTitle="PDF Code Request Sent!"
                    successDesc="Check your mobile. We are triggering the download link via WhatsApp/SMS."
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Interactive Answer Key Directory */}
          <div className="flex flex-col gap-6 mt-4">
            <div>
              <h3 className="text-2xl font-bold text-text flex items-center gap-2">
                <MaterialSymbol name="rule_folder" className="text-primary text-2xl" />
                NEET 2026 Subject Answer Keys
              </h3>
              <p className="text-sm text-text-secondary mt-1">Review official correct answers for Set Q1-Q10 across Physics, Chemistry, and Biology keys.</p>
            </div>

            <SubjectAnswerKeys />
          </div>

        </Container>
      </Section>
    </>
  );
}
