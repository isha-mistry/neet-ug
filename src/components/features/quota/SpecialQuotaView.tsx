"use client";

import Link from "next/link";
import { QuotaHeader, QuotaPageShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel } from "./QuotaShared";
import { quotaTheoryContent } from "./content";
import { QuotaBookCounsellingCard } from "./QuotaBookCounsellingCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const SPECIAL_QUOTA_JUMP_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "central-institutions", label: "Central Institutions" },
  { id: "conversion-logic", label: "Conversion Logic" },
  { id: "esic-quota", label: "ESIC Quota" },
  { id: "afmc-flow", label: "AFMC Flow" },
  { id: "verification-flow", label: "Verification Flow" },
] as const;

export function SpecialQuotaView() {
  const header = (
    <QuotaHeader
      eyebrow="Special Guidelines"
      title="Special &amp; Institutional"
      highlightedText="Quotas"
      description="Detailed guide for Medical Counselling Committee (MCC) conducted seats in Central Universities, AIIMS, JIPMER, and specialized institutional quotas. Precision data for informed medical admissions."
      eyebrowIcon="verified"
      watermarkIcon="school"
    />
  );

  const sidebar = (
    <aside className="space-y-6">
      {/* Live Counselling Lead Form */}
      <QuotaBookCounsellingCard source="Special Quota" />

      {/* Info Alert */}
      <Card padded={true} className="flex gap-3 bg-surface-container-low shadow-sm">
        <span className="material-symbols-outlined text-tertiary text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
        <div>
          <span className="font-label-md text-label-md text-tertiary block font-bold mb-1 uppercase tracking-wider">LATEST UPDATE</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">JIPMER Internal Quota registration is now separate within the MCC portal. Ensure certificate uploads before Round 1.</p>
        </div>
      </Card>

      {/* Featured Image Card */}
      <Card padded={false} className="group relative h-64 cursor-pointer overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Seat Matrix" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNxCUIVz64YIs-V2XKvctakH_HtiwuYXw5TSHfn7yKQxT_ArXg3GuETefqpU4W81XHaKXWK5s2PiheukoI_JUXQX2jAH0NP6GocotyLqAXudJ4fhok2Wk-t-2o7OMXOugaO3LfsiuM0ZmdGcJfjmvOIhiBl4JOYisClGY9RWSnK4B_FZlpfPFKh8bQQTDu1NSZE3mQNTVP5Vg0U3bcpPYq3j1-5u_9I2bMVmfWNI0LUzK8u01_JLQINHOOy2IXx55kt86l_lH0Sw0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
          <span className="text-white font-title-lg text-title-lg font-bold">Seat Matrix Analysis 2024</span>
          <p className="text-white/80 font-body-sm text-body-sm leading-relaxed">Deep dive into category-wise distributions.</p>
        </div>
      </Card>

      {/* Quick Links */}
      <Card padded={true}>
        <h4 className="font-label-md text-label-md text-outline uppercase tracking-widest mb-4 font-bold">Related Tools</h4>
        <ul className="space-y-4">
          <li>
            <Link className="flex items-center gap-3 text-body-md hover:text-primary group transition-colors text-on-surface" href="/rank-predictor">
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px]">analytics</span>
              <span className="font-medium">AIQ Rank Predictor</span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-3 text-body-md hover:text-primary group transition-colors text-on-surface" href="#">
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px]">account_balance_wallet</span>
              <span className="font-medium">Fee Structure Analyser</span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-3 text-body-md hover:text-primary group transition-colors text-on-surface" href="#">
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px]">description</span>
              <span className="font-medium">Reservation Policy PDF</span>
            </Link>
          </li>
        </ul>
      </Card>
    </aside>
  );

  return (
    <QuotaPageShell
      current="Special & Institutional Quotas"
      header={header}
      sidebar={sidebar}
      jumpSections={SPECIAL_QUOTA_JUMP_SECTIONS}
    >
      {/* Overview Group */}
      <div id="overview" className="space-y-10">
        <QuotaInfoGrid
          items={[
            {
              icon: "assignment_ind",
              title: "Eligibility is narrowly defined",
              body: "Institutional, ESIC, DU, AMU, JIPMER, and AFMC claims require precise certificates and usually cannot be corrected after the registration window.",
            },
            {
              icon: "military_tech",
              title: "AFMC is not simple allotment",
              body: "MCC registration only places candidates into the AFMC process. Final selection depends on screening, aptitude testing, medical fitness, and interview stages.",
            },
            {
              icon: "rule_folder",
              title: "Conversion rules matter",
              body: "Unfilled special seats can convert in later rounds, so candidates outside the original pool should still understand round-wise vacancy movement.",
            },
          ]}
        />

        <QuotaTheoryPanel className="" {...quotaTheoryContent.special} />
      </div>

      {/* Central Institutions Overview */}
      <Card id="central-institutions" as="section" className="scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
          <h2 className="font-headline-md text-headline-md text-on-surface">Central Institutions &amp; AFMC</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="flex flex-col justify-between bg-surface-container-low" padded={true}>
            <div>
              <h3 className="font-title-lg text-title-lg mb-2 font-bold text-on-surface">AIIMS &amp; JIPMER</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">100% seats are contributed to MCC. JIPMER includes Internal Quota for Puducherry residents.</p>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <Badge tone="safe">High Priority</Badge>
              <Badge tone="brand">Central Gov</Badge>
            </div>
          </Card>
          <Card className="flex flex-col justify-between bg-surface-container-low" padded={true}>
            <div>
              <h3 className="font-title-lg text-title-lg mb-2 font-bold text-on-surface">AFMC Pune Selection Rules</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">MCC registration is mandatory. Screened candidates (typical NEET score: 625+ for boys, 645+ for girls) must undergo the ToELR, PAT, and physical medical interview at Pune.</p>
            </div>
            <div className="flex justify-start">
              <Button
                as="link"
                variant="text"
                href="#afmc-flow"
                className="mt-4 font-bold uppercase tracking-wider text-xs"
                trailingIcon={<span className="material-symbols-outlined text-[16px]">arrow_forward</span>}
              >
                View Registration Flow
              </Button>
            </div>
          </Card>
        </div>
      </Card>

      {/* Reservation & Conversion Logic Table */}
      <div id="conversion-logic" className="scroll-mt-20 quota-table-wrap">
        <div className="flex justify-between items-center p-5 md:p-6 pb-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>rule</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Category Conversion Flow</h2>
          </div>
        </div>
        <table className="quota-table">
          <thead>
            <tr>
              <th className="pl-5 md:pl-6">Seat Pool</th>
              <th>Converted To</th>
              <th className="pr-5 md:pr-6">Condition</th>
            </tr>
          </thead>
            <tbody>
              <tr className="border-b border-outline-variant/40 hover:bg-primary/5 transition-colors duration-200">
                <td className="p-4 pl-5 md:pl-6 font-bold text-on-surface">
                  <Badge tone="brand">ST PwD</Badge>
                </td>
                <td className="p-4 text-primary font-bold">
                  <Badge tone="neutral">ST</Badge>
                </td>
                <td className="p-4 pr-5 md:pr-6 text-on-surface-variant">Non-availability of ST PwD candidates</td>
              </tr>
              <tr className="border-b border-outline-variant/40 hover:bg-primary/5 transition-colors duration-200">
                <td className="p-4 pl-5 md:pl-6 font-bold text-on-surface">
                  <Badge tone="brand">SC PwD</Badge>
                </td>
                <td className="p-4 text-primary font-bold">
                  <Badge tone="neutral">SC</Badge>
                </td>
                <td className="p-4 pr-5 md:pr-6 text-on-surface-variant">Non-availability of SC PwD candidates</td>
              </tr>
              <tr className="border-b border-outline-variant/40 hover:bg-primary/5 transition-colors duration-200">
                <td className="p-4 pl-5 md:pl-6 font-bold text-on-surface">
                  <Badge tone="brand">OBC PwD</Badge>
                </td>
                <td className="p-4 text-primary font-bold">
                  <Badge tone="neutral">OBC</Badge>
                </td>
                <td className="p-4 pr-5 md:pr-6 text-on-surface-variant">Non-availability of OBC PwD candidates</td>
              </tr>
              <tr className="border-b border-outline-variant/40 hover:bg-primary/5 transition-colors duration-200">
                <td className="p-4 pl-5 md:pl-6 font-bold text-on-surface">
                  <Badge tone="brand">UR PwD</Badge>
                </td>
                <td className="p-4 text-primary font-bold">
                  <Badge tone="neutral">UR</Badge>
                </td>
                <td className="p-4 pr-5 md:pr-6 text-on-surface-variant">Non-availability of UR PwD candidates</td>
              </tr>
              <tr className="hover:bg-primary/5 transition-colors duration-200">
                <td className="p-4 pl-5 md:pl-6 font-bold text-on-surface">
                  <Badge tone="brand">NRI / OCI</Badge>
                </td>
                <td className="p-4 text-primary font-bold">
                  <Badge tone="neutral">UR Management</Badge>
                </td>
                <td className="p-4 pr-5 md:pr-6 text-on-surface-variant">Final conversion in Mop-up/Stray rounds</td>
              </tr>
            </tbody>
          </table>
      </div>

      {/* ESIC Insured Persons Details */}
      <Card id="esic-quota" as="section" padded={false} bordered={false} className="scroll-mt-20 relative overflow-hidden bg-linear-to-br from-primary to-primary-pressed p-6 text-on-primary shadow-[0_18px_42px_-22px_rgba(37,70,208,0.25)]">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4 text-white">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <h2 className="font-headline-md text-headline-md font-bold">ESIC Insured Persons (IP) Quota</h2>
          </div>
          <p className="font-body-md text-body-md mb-4 text-white/90 max-w-2xl leading-relaxed">
            Special reservation for children of Insured Persons (IP) who contribute to the ESIC scheme. Seats are allocated across 3 priority levels:
          </p>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-white/80">
            <div className="bg-white/5 p-3 rounded border border-white/10">
              <strong>Priority 1:</strong> Wards of active Insured Persons currently contributing and meeting threshold.
            </div>
            <div className="bg-white/5 p-3 rounded border border-white/10">
              <strong>Priority 2:</strong> Wards of deceased/disabled Insured Persons who were under coverage.
            </div>
            <div className="bg-white/5 p-3 rounded border border-white/10">
              <strong>Priority 3:</strong> Other eligible dependents as per ESIC medical board guidelines.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 text-white">
              <span className="font-label-md text-label-md block mb-1 text-white/70 uppercase tracking-wider font-bold text-[10px]">ELIGIBILITY</span>
              <span className="font-title-lg text-title-lg font-bold">Ward of IP Certificate</span>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 text-white">
              <span className="font-label-md text-label-md block mb-1 text-white/70 uppercase tracking-wider font-bold text-[10px]">ANNUAL FEE</span>
              <span className="font-title-lg text-title-lg font-bold">₹ 24,000/yr*</span>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 text-white">
              <span className="font-label-md text-label-md block mb-1 text-white/70 uppercase tracking-wider font-bold text-[10px]">TOTAL SEATS</span>
              <span className="font-title-lg text-title-lg font-bold">~400+ Seats</span>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
      </Card>

      {/* Central University Details (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padded={true}>
          <h3 className="font-headline-sm text-headline-sm mb-4 border-b border-outline-variant/40 pb-2 font-bold text-on-surface">Delhi University (DU)</h3>
          <ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="leading-relaxed">85% Institutional Quota for candidates who passed 11th &amp; 12th from Delhi.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="leading-relaxed">Colleges: MAMC, LHMC, UCMS.</span>
            </li>
          </ul>
        </Card>
        <Card padded={true}>
          <h3 className="font-headline-sm text-headline-sm mb-4 border-b border-outline-variant/40 pb-2 font-bold text-on-surface">AMU &amp; BHU</h3>
          <ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="leading-relaxed">BHU: 100% seats open to all India candidates based on merit.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="leading-relaxed">AMU: 50% Institutional quota for internal students.</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* AFMC Registration Flow Section */}
      <section className="scroll-mt-20 mt-12" id="afmc-flow">
        <h2 className="font-headline-md text-headline-md mb-8 text-center font-bold text-on-surface">AFMC Registration &amp; Selection Flow</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
          {/* Connectors for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-outline-variant/40 -z-10"></div>

          <Card hover={true} className="w-full text-center md:w-1/4">
            <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">1</div>
            <p className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface">Register on MCC Portal</p>
          </Card>

          <Card hover={true} className="w-full text-center md:w-1/4">
            <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">2</div>
            <p className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface">Select AFMC Option</p>
          </Card>

          <Card hover={true} className="w-full text-center md:w-1/4">
            <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">3</div>
            <p className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface">AFMC Screening Call</p>
          </Card>

          <Card hover={true} className="w-full text-center md:w-1/4">
            <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">4</div>
            <p className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface">ToELR &amp; Interview</p>
          </Card>
        </div>
      </section>

      <div id="verification-flow" className="scroll-mt-20 mt-12">
        <QuotaProcessList
          title="Special Quota Verification Flow"
          subtitle="Use this before claiming institutional or priority seats."
          steps={[
            { title: "Identify the exact quota code", body: "Match your eligibility to the counselling brochure terminology, such as DU internal, JIPMER Puducherry, ESIC IP, CW, or minority." },
            { title: "Collect issuing authority proof", body: "Certificates must come from the listed authority and match the format, date, and dependency requirements in the bulletin." },
            { title: "Upload proof early", body: "Special quota uploads often close with registration or choice filling. Missing uploads usually block the claim even if you are otherwise eligible." },
            { title: "Monitor conversion rounds", body: "If special seats remain vacant, later conversion can change available UR or category seats in MCC rounds." },
          ]}
        />
      </div>
    </QuotaPageShell>
  );
}
