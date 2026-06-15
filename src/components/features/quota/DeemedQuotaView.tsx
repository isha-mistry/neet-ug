"use client";

import { QuotaHeader, QuotaCta } from "./QuotaShared";
import {
  ConversionAlgorithmGrid,
  EligibilityChecklist,
  MccCounsellingRounds,
} from "./MccContentBlocks";
import { Container } from "@/components/common/Container";
import { FiAlertTriangle } from "react-icons/fi";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import {
  getMccChapterConversionRules,
  mccCounsellingGuide,
} from "./content";

const { chapters, counsellingRounds, ociParity } = mccCounsellingGuide;
const deemedChapter = chapters.deemed;
const reservationNote =
  typeof deemedChapter.reservationPolicy === "object"
    ? deemedChapter.reservationPolicy
    : undefined;

export function DeemedQuotaView() {
  const conversionRules = getMccChapterConversionRules(deemedChapter);

  return (
    <div className="py-10 bg-background">
      <Container size="page">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas", href: "/quota" },
              { label: "Deemed Universities" },
            ]}
          />
        </div>

        <QuotaHeader
          eyebrow={`INFORMATION BULLETIN`}
          title="Deemed University"
          highlightedText="Quota"
          description={deemedChapter.summary}
          imageSrc="/brand/college_building.png"
          imageAlt="Deemed University medical campus illustration"
        />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-2xl text-primary">analytics</span>
                <h3 className="text-lg font-bold text-on-surface font-headline-md">Overview</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Management", value: "100% MCC", desc: "Four online rounds via mcc.nic.in" },
                  { label: "Domicile Rule", value: "No", desc: "Open to all NEET-UG qualified candidates" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-lg border border-outline-variant bg-surface-container-low">
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">{stat.label}</div>
                    <div className="font-bold text-on-surface text-sm">{stat.value}</div>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{stat.desc}</p>
                  </div>
                ))}
                <div className="p-4 rounded-lg border border-outline-variant bg-surface-container-low md:col-span-2">
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Seat Matrix</div>
                  <div className="font-bold text-on-surface text-sm">{deemedChapter.seatMatrix}</div>
                </div>
              </div>

              {reservationNote && (
                <div className="space-y-3 mb-6 text-sm text-on-surface-variant">
                  {reservationNote.note && <p>{reservationNote.note}</p>}
                  {reservationNote.minorityNote && (
                    <p className="p-3 rounded-xl bg-surface-container border border-outline-variant/60 text-xs">
                      {reservationNote.minorityNote}
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-3 p-4 rounded-xl bg-error-container/10 border border-error/20 text-error text-xs mb-6">
                <FiAlertTriangle className="text-base shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  <strong>CRITICAL:</strong> Deemed Universities are strictly under MCC — not state counselling. {ociParity.summary}
                </p>
              </div>

              <EligibilityChecklist items={deemedChapter.eligibility ?? []} />
            </div>
          </div>

          <div className="lg:col-span-4 h-fit">
            <ConversionAlgorithmGrid
              rules={conversionRules}
              note={deemedChapter.conversionNote}
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold font-headline-md text-on-surface mb-6">Deemed Counselling Rounds</h2>
          <MccCounsellingRounds rounds={counsellingRounds.rounds} />
        </section>

        <QuotaCta
          title="Register on MCC for Deemed Seats"
          description="100% Deemed University MBBS/BDS seats are allotted only through MCC online counselling."
          actions={[
            {
              label: "Visit MCC Portal",
              href: "https://mcc.nic.in",
              variant: "primary",
              isExternal: true,
            },
            {
              label: "All India Quota Guide",
              href: "/quota/all-india",
              variant: "secondary",
            },
          ]}
        />
      </Container>
    </div>
  );
}
