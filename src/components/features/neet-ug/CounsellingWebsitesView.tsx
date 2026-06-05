"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { WebsiteDirectory } from "@/components/features/neet-ug/WebsiteDirectory";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";

export function CounsellingWebsitesView() {
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
            <span className="text-text-secondary">Official Counselling Websites</span>
          </nav>

          <PageHeader
            eyebrow="OFFICIAL LINK DIRECTORY"
            title="NEET UG State & Central Counselling Websites"
            description="Directory of verified state counselling authorities, merit list portals, and central seat allotment boards. Avoid duplicate fake links and bookmark official urls."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Links Directory column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <WebsiteDirectory />
            </div>

            {/* Subscribe WhatsApp Form Sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-6 sticky top-24">
              {/* WhatsApp alerts widget */}
              <Card className="bg-emerald-500/10 border border-emerald-500/25 p-6 rounded-2xl flex flex-col gap-4 shadow-sm text-center items-center">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow shadow-emerald-500/20">
                  <MaterialSymbol name="notifications_active" size="lg" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-950">Join Registration Alerts</h3>
                  <p className="text-xs text-emerald-800 mt-1">Get instant WhatsApp alerts the moment registration portals open or merit lists are released.</p>
                </div>

                <NeetLeadForm
                  type="whatsapp-alerts"
                  ctaText="Join Alerts Group"
                  successTitle="Subscription Confirmed!"
                  successDesc="We will alert you for updates on target counselling boards on your WhatsApp number."
                />
              </Card>
            </div>
          </div>

        </Container>
      </Section>
    </>
  );
}
