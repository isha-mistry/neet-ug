"use client";

import Image from "next/image";
import { QuotaHeader, QuotaMetrics, QuotaCta, type QuotaMetricItem } from "./QuotaShared";
import {
  ConversionAlgorithmGrid,
  EligibilityChecklist,
  MccCounsellingRounds,
  ReservationPolicyTable,
} from "./MccContentBlocks";
import { Container } from "@/components/common/Container";
import { FiAlertTriangle } from "react-icons/fi";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import {
  aiqMetrics,
  premiumInstitutionsData,
  mccCounsellingGuide,
  getMccChapterConversionRules,
  getCentralReservationCategories,
} from "./content";

const { chapters, counsellingRounds, ociParity } = mccCounsellingGuide;
const aiqChapter = chapters.aiq;

export function AllIndiaQuotaView() {
  const conversionRules = getMccChapterConversionRules(aiqChapter);
  const reservationCategories = getCentralReservationCategories();

  return (
    <div className="py-10 bg-background">
      <Container size="page">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas", href: "/quota" },
              { label: "All India Quota" },
            ]}
          />
        </div>

        <QuotaHeader
          eyebrow={`INFORMATION BULLETIN`}
          title="All India Quota"
          highlightedText="(AIQ)"
          titleSuffix="Explained"
          description={aiqChapter.summary}
          imageSrc="/brand/home/illustration.png"
          imageAlt="All India Quota admissions illustration"
        />

        <QuotaMetrics metrics={aiqMetrics} />

        <section className="mb-16">
          <ReservationPolicyTable
            categories={reservationCategories}
            title="Reservation Policy for 15% AIQ Seats"
            note={aiqChapter.roster}
          />

          <div className="flex gap-3 p-4 rounded-xl bg-error-container/10 border border-error/20 text-error text-xs md:text-sm mt-6">
            <FiAlertTriangle className="text-lg shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              <strong>Important:</strong> AIQ uses the <strong>Central OBC-NCL list</strong>. State-only OBC certificates are not valid. PwD reservation is 5% horizontal on AIQ seats.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-2xl text-primary">gavel</span>
              <h3 className="text-lg font-bold text-on-surface font-headline-md">OCI/PIO Candidate Rules</h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
              Overseas Citizens of India (OCI) and Persons of Indian Origin (PIO) candidates registered before <strong>March 4, 2021</strong> are treated exactly like Indian citizens. They can claim open general seats as well as NRI seats. Candidates registered after this date are treated as foreign nationals and are only eligible for NRI quota seats.
            </p>
          </div>
          
          <ConversionAlgorithmGrid
            rules={conversionRules}
            note={aiqChapter.conversionNote}
          />
        </section>

        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-headline-md text-on-surface">Open (Domicile-Free) Seat Pools</h2>
            <p className="text-sm text-on-surface-variant mt-1">Included under MCC AIQ counselling per the official bulletin</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aiqChapter.openSeatsDomicileFree?.map((seat) => (
              <div
                key={seat}
                className="flex items-start gap-3 p-4 rounded-xl border border-outline-variant bg-surface-container-lowest"
              >
                <span className="material-symbols-outlined text-primary text-lg shrink-0">check_circle</span>
                <span className="text-sm text-on-surface-variant leading-relaxed">{seat}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <EligibilityChecklist items={aiqChapter.eligibility ?? []} />
          {aiqChapter.stateQuotaNote && (
            <p className="mt-4 text-xs text-on-surface-variant leading-relaxed p-4 rounded-xl bg-surface-container-low border border-outline-variant">
              {aiqChapter.stateQuotaNote}
            </p>
          )}
        </section>

        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-headline-md text-on-surface">Premium Central Institutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumInstitutionsData.map((inst, idx) => (
              <div key={idx} className="flex gap-4 p-5 rounded-2xl border border-outline-variant bg-surface-container-lowest hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-outline-variant">
                  <Image src={inst.image} alt={inst.title} width={64} height={64} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-base mb-1.5">{inst.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {idx === 0 
                      ? `${chapters.aiims.summary} ${chapters.jipmer.summary}`
                      : `${chapters.esic.summary} AFMC: ${chapters.afmc.summary}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold font-headline-md text-on-surface">AIQ Counselling Rounds</h2>
            <p className="text-sm text-on-surface-variant mt-1">Four online rounds — no seats revert to states after Round 2</p>
          </div>
          <MccCounsellingRounds rounds={counsellingRounds.rounds} />
        </section>

        <QuotaCta
          title="Ready to apply?"
          description="Registration for AIQ counselling occurs exclusively on the official Medical Counselling Committee portal."
          actions={[
            {
              label: "Visit Official MCC Portal",
              href: "https://mcc.nic.in",
              variant: "primary",
              isExternal: true,
            },
          ]}
          footerNote="Redirects to mcc.nic.in · Secure Official Govt Link"
        />
      </Container>
    </div>
  );
}
