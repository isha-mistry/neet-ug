"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";

interface LiveAlert {
  id: string;
  title: string;
  category: "Counselling" | "Official Notice" | "State Updates" | "Result Info";
  date: string;
  description: string;
  isBreaking: boolean;
  linkText?: string;
  linkUrl?: string;
}

export default function NeetUgUpdatesPage() {
  const alerts: LiveAlert[] = [
    {
      id: "1",
      title: "MCC releases tentative dates for AIQ counselling registration",
      category: "Counselling",
      date: "June 4, 2026 at 11:30 AM",
      description: "Medical Counselling Committee (MCC) has published the tentative registration schedule for 15% All India Quota (AIQ) seats. Registrations are expected to commence in the third week of June.",
      isBreaking: true,
      linkText: "View Tentative Schedule",
      linkUrl: "/neet-ug-2026/counselling-guide",
    },
    {
      id: "2",
      title: "Karnataka State CET Cell opens portal for document verification uploads",
      category: "State Updates",
      date: "June 3, 2026 at 04:15 PM",
      description: "KEA has enabled the document upload link for Karnataka MBBS state quota aspirants. Domicile papers, NEET scores, and category certifications are required for online clearance.",
      isBreaking: false,
      linkText: "Official KEA Website",
      linkUrl: "/neet-ug-2026/counselling-websites",
    },
    {
      id: "3",
      title: "NTA provisional answer key challenge window closes officially",
      category: "Official Notice",
      date: "June 2, 2026 at 11:59 PM",
      description: "The official answer key challenge submission window ended last night. Over 2.4 million candidates registered for challenges. NTA is reviewing inputs for final key preparation.",
      isBreaking: false,
      linkText: "Calculate score using provisional key",
      linkUrl: "/neet-ug-2026/answer-key",
    },
    {
      id: "4",
      title: "NEET UG 2026 Official Results & Final Answer Keys release date updates",
      category: "Result Info",
      date: "May 30, 2026 at 02:00 PM",
      description: "Officials suggest that the final answer key and compilation of NEET UG 2026 merit lists are in the final stages. Results are expected to release on NTA portal by June 15, 2026.",
      isBreaking: true,
    },
    {
      id: "5",
      title: "State counselling portal links updated for 2026 session admissions",
      category: "State Updates",
      date: "May 25, 2026 at 09:00 AM",
      description: "State authorities in Maharashtra, Tamil Nadu, Kerala, and Madhya Pradesh have updated their official websites and registration rules. Link mapping has been fully synced.",
      isBreaking: false,
      linkText: "Browse State Portals",
      linkUrl: "/neet-ug-2026/counselling-websites",
    },
  ];

  const categoryColorMap: Record<LiveAlert["category"], string> = {
    Counselling: "bg-indigo-50 text-indigo-700 border-indigo-100",
    "Official Notice": "bg-red-50 text-red-700 border-red-100",
    "State Updates": "bg-amber-50 text-amber-700 border-amber-100",
    "Result Info": "bg-green-50 text-green-700 border-green-100",
  };

  return (
    <>
      <Section tone="default" className="py-8 md:py-12 bg-gradient-to-b from-brand-50/30 to-background">
        <Container size="2xl" className="flex flex-col gap-8">
          <BreadcrumbHeader />
          
          <PageHeader
            eyebrow="DAILY NEWS & ANNOUNCEMENTS"
            title="NEET UG 2026 Live Updates & Alert Portal"
            description="Real-time notifications, official NTA circulars, state counselling changes, and counseling schedule trackers updated daily."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Live Feed Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-2xl font-bold text-text flex items-center gap-2.5">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
                  </span>
                  Live Updates Timeline
                </h3>
                <span className="text-xs font-semibold text-text-muted bg-surface-muted border border-border/80 px-3 py-1 rounded-full">
                  Auto-refreshing
                </span>
              </div>

              <div className="flex flex-col gap-6">
                {alerts.map((alert) => (
                  <Card
                    key={alert.id}
                    padded
                    bordered
                    className={`bg-white/80 hover:bg-white hover:shadow-md transition-all relative ${
                      alert.isBreaking ? "border-l-4 border-l-red-500" : ""
                    }`}
                  >
                    {alert.isBreaking && (
                      <span className="absolute top-4 right-4 bg-red-100 text-red-800 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded tracking-wide border border-red-200">
                        Breaking
                      </span>
                    )}
                    
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${categoryColorMap[alert.category]}`}>
                          {alert.category}
                        </span>
                        <span className="text-xs text-text-muted flex items-center gap-1 font-medium">
                          <MaterialSymbol name="schedule" size="sm" />
                          {alert.date}
                        </span>
                      </div>
                      
                      <h4 className="font-bold text-text text-base md:text-lg leading-snug">
                        {alert.title}
                      </h4>
                      <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                        {alert.description}
                      </p>
                      
                      {alert.linkText && alert.linkUrl && (
                        <div className="mt-1">
                          <Link
                            href={alert.linkUrl}
                            className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline hover:text-brand-900"
                          >
                            {alert.linkText}
                            <MaterialSymbol name="arrow_right_alt" size="sm" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Subscriptions / WhatsApp CTA Sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-6 sticky top-24">
              {/* WhatsApp Premium CTA */}
              <Card className="bg-emerald-500/10 border border-emerald-500/25 p-6 rounded-2xl flex flex-col gap-4 text-center items-center shadow-sm">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <MaterialSymbol name="forum" size="lg" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-950">Join WhatsApp Community</h3>
                  <p className="text-xs text-emerald-800 mt-1">Get immediate push alerts, merit lists, PDF notices, and choice-filling guidelines directly on your phone.</p>
                </div>
                <Button
                  as="link"
                  href="https://wa.me/mock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:shadow-emerald-600/10 active:bg-emerald-800"
                >
                  Join Channel Now
                </Button>
              </Card>

              {/* Push Opt-In Lead Form */}
              <Card className="bg-surface-elevated border border-border p-6 rounded-2xl shadow-level-1">
                <div className="flex flex-col gap-4">
                  <div className="bg-brand-50 text-primary w-12 h-12 rounded-xl flex items-center justify-center">
                    <MaterialSymbol name="notifications_active" size="lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text">Subscribe to Live SMS/WA Alerts</h3>
                    <p className="text-xs text-text-secondary mt-1">Select topics below to get instant WhatsApp updates direct from official sources.</p>
                  </div>

                  <NeetLeadForm
                    type="whatsapp-alerts"
                    ctaText="Activate Alerts"
                    successTitle="Subscription Active!"
                    successDesc="Awesome! You have been successfully enrolled for real-time notifications on your WhatsApp."
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

function BreadcrumbHeader() {
  return (
    <nav className="flex text-xs font-medium text-text-muted">
      <Link href="/" className="hover:text-primary">Home</Link>
      <span className="mx-2 text-border">/</span>
      <Link href="/neet-ug-2026" className="hover:text-primary">NEET UG 2026</Link>
      <span className="mx-2 text-border">/</span>
      <span className="text-text-secondary">Live Updates</span>
    </nav>
  );
}
