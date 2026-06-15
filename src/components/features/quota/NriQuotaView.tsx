"use client";

import { QuotaHeader, QuotaCta } from "./QuotaShared";
import { Container } from "@/components/common/Container";
import { FiArrowRight, FiDownload, FiUser, FiDollarSign } from "react-icons/fi";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

import { nriDocumentationCards as documentationCards, nriStatesData as nriStates } from "./content";

export function NriQuotaView() {
  return (
    <div className="py-10 bg-background">
      <Container size="page">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas", href: "/quota" },
              { label: "NRI Quota" },
            ]}
          />
        </div>

        {/* Header */}
        <QuotaHeader
          eyebrow="GLOBAL ASPIRANTS"
          title="NRI Quota"
          highlightedText="Admission Portal"
          description="A comprehensive guide for Non-Resident Indians (NRI), Overseas Citizens of India (OCI), and Persons of Indian Origin (PIO) seeking medical admissions in India. Understand eligibility, documentation, and state-wise allocations."
          imageSrc="/brand/home/hero.png"
          imageAlt="NRI admissions guidance"
        />

        {/* Eligibility & Fees */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-headline-md text-on-surface">Eligibility &amp; Fees</h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Core requirements for NRI/OCI/PIO candidates and financial commitments for medical courses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 hover:shadow-md transition-all flex flex-col">
              <div className="p-3 bg-primary-fixed text-primary rounded-xl w-fit mb-6">
                <FiUser className="text-xl" />
              </div>
              <h3 className="font-bold text-lg text-on-surface mb-4">Applicant Profile</h3>
              <ul className="space-y-3 text-xs leading-relaxed text-on-surface-variant flex-1">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-primary mt-0.5">check_circle</span>
                  <span>Includes NRI, OCI, and PIO candidates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-primary mt-0.5">check_circle</span>
                  <span>Direct children or wards (Sponsorship rules vary by state)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-primary mt-0.5">check_circle</span>
                  <span>
                    <strong>OCI/PIO Rules:</strong> OCI/PIO candidates registered before March 4, 2021 have the same seat claims as Indian citizens (eligible for both General and NRI seats). Later registrants can apply for NRI seats only.
                  </span>
                </li>
                <li className="flex items-start gap-2 font-bold text-primary">
                  <span className="material-symbols-outlined text-sm text-primary mt-0.5">check_circle</span>
                  <span>NEET UG Qualification is Mandatory</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 hover:shadow-md transition-all flex flex-col">
              <div className="p-3 bg-primary-fixed text-primary rounded-xl w-fit mb-6">
                <FiDollarSign className="text-xl" />
              </div>
              <h3 className="font-bold text-lg text-on-surface mb-4">Financials</h3>
              <div className="space-y-4 text-xs leading-relaxed flex-1">
                <div>
                  <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Quota Restrictions</span>
                  <p className="font-bold text-primary text-sm">
                    No Categories (SC/ST/OBC)
                  </p>
                  <p className="text-on-surface-variant mt-0.5">All NRI seats are merit-based within the quota.</p>
                </div>
                <div className="pt-3 border-t border-outline-variant/60">
                  <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Course Fee Range</span>
                  <p className="font-bold text-on-surface text-sm">
                    ₹12 Lakhs – ₹45 Lakhs per annum
                  </p>
                  <p className="text-on-surface-variant mt-0.5">Typically paid in USD or equivalent INR depending on college policy.</p>
                </div>
                <div className="pt-3 border-t border-outline-variant/60">
                  <span className="block text-[10px] font-bold text-error uppercase tracking-wider mb-1">Refund Account Rule</span>
                  <p className="font-bold text-error text-[11px]">
                    NRO Account Required
                  </p>
                  <p className="text-on-surface-variant mt-0.5">Security deposits/fees refunds for NRI candidates must be routed through NRO accounts as per banking guidelines.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mandatory Documentation */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold font-headline-md text-on-surface">Mandatory Documentation</h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Ensure all sponsor documents are attested by the Indian Embassy or Consulate. Original Demand Draft (DD) details must be strictly followed.
              </p>
            </div>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary hover:underline bg-primary-fixed rounded-lg">
              <FiDownload className="text-sm" />
              Download PDF Checklist
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {documentationCards.map((card, idx) => (
              <div key={idx} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 hover:shadow-md transition-all text-center flex flex-col items-center">
                <div className="p-3 bg-primary-fixed text-primary rounded-xl mb-4">
                  <span className="material-symbols-outlined text-xl">{card.icon}</span>
                </div>
                <h4 className="font-bold text-xs text-on-surface mb-2">{card.title}</h4>
                <p className="text-[10px] text-on-surface-variant leading-relaxed text-center">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* State-wise Seat Distribution */}
        <section className="mb-20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-headline-md text-on-surface">State-wise Seat Distribution</h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Comparative analysis of NRI seat availability and expected NEET ranks for key medical hubs.
            </p>
          </div>

          <div className="overflow-hidden border border-outline-variant rounded-2xl bg-surface-container-lowest shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-bold text-xs uppercase border-b border-outline-variant">
                    <th className="px-6 py-4">State</th>
                    <th className="px-6 py-4">Seats &amp; Rank</th>
                    <th className="px-6 py-4">Financials / Authority</th>
                    <th className="px-6 py-4">Key Characteristic</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/60 text-sm">
                  {nriStates.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-on-surface">{row.state}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-on-surface">{row.seats}</div>
                        <div className="text-[10px] text-text-muted">{row.rank}</div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">{row.financials}</td>
                      <td className="px-6 py-4 text-on-surface-variant font-medium italic">{row.characteristic}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 hover:bg-surface-container-low rounded-lg transition-colors text-primary cursor-pointer">
                          <FiArrowRight />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <QuotaCta
          title="Confused about NRI Eligibility?"
          description="Get a 1-on-1 consultation with our medical admission experts to verify your documents and sponsorship status."
          actions={[
            {
              label: "Book Expert Call",
              href: "#",
              variant: "primary",
            },
          ]}
        />
      </Container>
    </div>
  );
}
