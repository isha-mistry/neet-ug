"use client";

import type { ReactNode } from "react";
import { QuotaHeader, QuotaCta } from "./QuotaShared";
import {
  ConversionAlgorithmGrid,
  EligibilityChecklist,
  MccCounsellingRounds,
  ReservationPolicyTable,
} from "./MccContentBlocks";
import { Container } from "@/components/common/Container";
import { FiArrowRight, FiShield, FiCalendar } from "react-icons/fi";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import {
  getCentralReservationCategories,
  getMccChapterConversionRules,
  mccCounsellingGuide,
} from "./content";
import type { MccChapterBase } from "@/lib/data/mcc-counselling";

const { chapters, counsellingRounds, meta } = mccCounsellingGuide;

function MccInstitutionSection({
  id,
  chapter,
  children,
}: {
  id: string;
  chapter: MccChapterBase;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-16 border-t border-outline-variant/60 pt-12 first:border-0 first:pt-0">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-2xl font-bold font-headline-md text-on-surface">{chapter.title}</h2>
      </div>
      <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{chapter.summary}</p>
      {children}
    </section>
  );
}

export function SpecialQuotaView() {
  const centralReservation = getCentralReservationCategories();
  const aiimsRules = getMccChapterConversionRules(chapters.aiims);
  const bhuRules = getMccChapterConversionRules(chapters.bhu);
  const jipmerRules = getMccChapterConversionRules(chapters.jipmer);
  const amuReservation =
    typeof chapters.amu.reservationPolicy === "object" ? chapters.amu.reservationPolicy : null;

  return (
    <div className="py-10 bg-background">
      <Container size="page">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas", href: "/quota" },
              { label: "Special & Institutional Quotas" },
            ]}
          />
        </div>

        <QuotaHeader
          eyebrow="INFORMATION BULLETIN"
          title="Special &amp; Institutional"
          highlightedText="Quotas"
          description="AIIMS, ESIC, Central Universities (DU, JMI, IP University), AMU, BHU, AFMC, and JIPMER — official MCC counselling scope from the information bulletin."
          imageSrc="/brand/college_building.png"
          imageAlt="Institutional medical campus buildings"
        />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 -mt-8">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
            <div className="p-2 bg-primary-fixed text-primary rounded-lg">
              <FiShield className="text-lg" />
            </div>
            <div>
              <h4 className="font-bold text-on-surface text-sm mb-0.5">Source</h4>
              <p className="text-sm text-on-surface-variant">{meta.source}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
            <div className="p-2 bg-primary-fixed text-primary rounded-lg">
              <FiCalendar className="text-lg" />
            </div>
            <div>
              <h4 className="font-bold text-on-surface text-sm mb-0.5">Academic Year</h4>
              <p className="text-xs text-on-surface-variant">{meta.academicYear}</p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-2 mb-12">
          {[
            { id: "aiims", label: "AIIMS" },
            { id: "esic", label: "ESIC" },
            { id: "central-universities", label: "Central Universities" },
            { id: "amu", label: "AMU" },
            { id: "bhu", label: "BHU" },
            { id: "afmc", label: "AFMC" },
            { id: "jipmer", label: "JIPMER" },
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border border-outline-variant bg-surface-container-lowest text-primary hover:bg-primary-fixed transition-colors"
            >
              {link.label}
              <FiArrowRight className="text-[10px]" />
            </a>
          ))}
        </div>

        <MccInstitutionSection id="aiims" chapter={chapters.aiims}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <ReservationPolicyTable
              categories={[
                ...centralReservation,
                { category: "Foreign National", percentage: "As per AIIMS" },
              ]}
              title="Reservation on MCC-Contributed AIIMS Seats"
            />
            <ConversionAlgorithmGrid rules={aiimsRules} note={chapters.aiims.conversionNote} />
          </div>
          {chapters.aiims.foreignNationalNote && (
            <p className="text-xs text-on-surface-variant mb-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant">
              {chapters.aiims.foreignNationalNote}
            </p>
          )}
          <EligibilityChecklist items={chapters.aiims.eligibility ?? []} />
          <p className="mt-4 text-xs text-on-surface-variant">{chapters.aiims.nominationNote}</p>
        </MccInstitutionSection>

        <MccInstitutionSection id="esic" chapter={chapters.esic}>
          <ReservationPolicyTable categories={centralReservation} title="ESIC Insured Persons Quota Reservation" />
          <div className="mt-6">
            <EligibilityChecklist items={chapters.esic.eligibility ?? []} />
          </div>
          {chapters.esic.advisory && (
            <p className="mt-4 text-xs text-on-surface-variant p-4 rounded-xl bg-primary-fixed/30 border border-primary/20">
              {chapters.esic.advisory}
            </p>
          )}
        </MccInstitutionSection>

        <MccInstitutionSection id="central-universities" chapter={chapters.centralUniversities}>
          {chapters.centralUniversities.disclaimers && (
            <ul className="space-y-2 mb-8">
              {chapters.centralUniversities.disclaimers.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-base shrink-0">info</span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="space-y-6 mb-8">
            {chapters.centralUniversities.institutes?.map((institute) => (
              <div
                key={institute.id}
                className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6"
              >
                <h3 className="text-base font-bold text-on-surface mb-1">{institute.name}</h3>
                {institute.colleges && (
                  <p className="text-xs text-text-muted mb-3">{institute.colleges}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-on-surface-variant mb-3">
                  {institute.aiqShare && (
                    <div>
                      <span className="font-bold text-on-surface">AIQ: </span>
                      {institute.aiqShare}
                    </div>
                  )}
                  {institute.institutionalShare && (
                    <div>
                      <span className="font-bold text-on-surface">Institutional: </span>
                      {institute.institutionalShare}
                    </div>
                  )}
                </div>
                {institute.institutionalRule && <p className="text-sm text-on-surface-variant mb-2">{institute.institutionalRule}</p>}
                {institute.cwNote && (
                  <p className="text-xs text-primary font-medium">{institute.cwNote}</p>
                )}
                {institute.roster && (
                  <p className="text-[10px] text-text-muted mt-2">{institute.roster}</p>
                )}
              </div>
            ))}
          </div>

          {chapters.centralUniversities.cwConversion && (
            <ConversionAlgorithmGrid
              rules={chapters.centralUniversities.cwConversion}
              title="CW Conversion Algorithm (State Quota)"
              note={chapters.centralUniversities.conversionNote}
            />
          )}
        </MccInstitutionSection>

        <MccInstitutionSection id="amu" chapter={chapters.amu}>
          {amuReservation && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {amuReservation.openSeats && (
                <div className="p-4 rounded-xl border border-outline-variant bg-surface-container-low">
                  <h4 className="text-xs font-bold uppercase text-text-muted mb-2">Open Seats</h4>
                  <p className="text-sm text-on-surface-variant">{amuReservation.openSeats}</p>
                </div>
              )}
              {amuReservation.internalQuota && (
                <div className="p-4 rounded-xl border border-outline-variant bg-surface-container-low">
                  <h4 className="text-xs font-bold uppercase text-text-muted mb-2">Internal Quota</h4>
                  <p className="text-sm text-on-surface-variant">{amuReservation.internalQuota}</p>
                </div>
              )}
            </div>
          )}
          {chapters.amu.internalProcess && (
            <p className="text-sm text-on-surface-variant mb-4">{chapters.amu.internalProcess}</p>
          )}
          <EligibilityChecklist items={chapters.amu.eligibility ?? []} />
        </MccInstitutionSection>

        <MccInstitutionSection id="bhu" chapter={chapters.bhu}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ReservationPolicyTable categories={centralReservation} />
            <ConversionAlgorithmGrid rules={bhuRules} note={chapters.bhu.conversionNote} />
          </div>
          <div className="mt-6">
            <EligibilityChecklist items={chapters.bhu.eligibility ?? []} />
          </div>
        </MccInstitutionSection>

        <MccInstitutionSection id="afmc" chapter={chapters.afmc}>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 mb-4">
            <h3 className="text-sm font-bold text-on-surface mb-4">Registration &amp; Counselling Flow</h3>
            <ol className="space-y-3">
              {chapters.afmc.process?.map((step, idx) => (
                <li key={step} className="flex gap-3 text-sm text-on-surface-variant">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          {chapters.afmc.advisory && (
            <p className="text-xs text-on-surface-variant p-4 rounded-xl bg-error-container/10 border border-error/20 text-error">
              {chapters.afmc.advisory}
            </p>
          )}
        </MccInstitutionSection>

        <MccInstitutionSection id="jipmer" chapter={chapters.jipmer}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <ReservationPolicyTable
              categories={centralReservation}
              note={chapters.jipmer.reservationNote}
            />
            <ConversionAlgorithmGrid rules={jipmerRules} note={chapters.jipmer.conversionNote} />
          </div>
          <EligibilityChecklist items={chapters.jipmer.eligibility ?? []} />
          {chapters.jipmer.advisory && (
            <p className="mt-4 text-xs text-on-surface-variant">{chapters.jipmer.advisory}</p>
          )}
        </MccInstitutionSection>

        <section className="mb-20">
          <h2 className="text-2xl font-bold font-headline-md text-on-surface mb-6">Common MCC Counselling Rounds</h2>
          <MccCounsellingRounds rounds={counsellingRounds.rounds} />
        </section>

        <QuotaCta
          title="Explore MCC Counselling Guide"
          description="Detailed round-wise counselling information, registration steps, and document checklist guidelines."
          actions={[
            {
              label: "MCC Counselling Guide",
              href: "/neet-ug-2026/counselling-guide",
              variant: "primary",
            },
            {
              label: "Quota Overview",
              href: "/quota",
              variant: "secondary",
            },
          ]}
        />
      </Container>
    </div>
  );
}
