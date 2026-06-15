"use client";

import { useState } from "react";
import { QuotaHeader, QuotaCta } from "./QuotaShared";
import { Container } from "@/components/common/Container";
import { FiLayers, FiList } from "react-icons/fi";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

import { reservationCategoriesData as tableData, type CategoryTab, type ReservationRow } from "./content";

export function ReservationCategoriesView() {
  const [activeTab, setActiveTab] = useState<CategoryTab>("national");
  const currentTable = tableData[activeTab];

  return (
    <div className="py-10 bg-background animate-fadeIn">
      <Container size="page">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas", href: "/quota" },
              { label: "Reservation Categories" },
            ]}
          />
        </div>

        {/* Header */}
        <QuotaHeader
          eyebrow="NEET UG ADMISSION GUIDE"
          title="Reservation Categories &amp;"
          highlightedText="Eligibility"
          description="Navigating the complex landscape of medical reservations. We simplify quotas, state-specific rules, and document requirements for your dream college."
          imageSrc="/brand/home/illustration.png"
          imageAlt="Reservation categories illustration"
        />

        {/* Status badges below header */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 -mt-8">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-outline-variant bg-surface-container-lowest">
            <span className="material-symbols-outlined text-sm text-primary">verified</span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">NMC Certified Info</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-outline-variant bg-surface-container-lowest">
            <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">Updated 2024-25</span>
          </div>
        </section>

        {/* Understanding Reservation Structures */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold font-headline-md text-on-surface">Understanding Reservation Structures</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vertical Reservation */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FiList className="text-xl text-primary" />
                  <h3 className="text-base font-bold text-on-surface">Vertical Reservation</h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                  These are primary social reservations provided under Article 15(4) and 16(4) of the Constitution. They are mutually exclusive, meaning a candidate can only belong to one vertical category.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>SC, ST, and OBC Categories</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>EWS (Economically Weaker Section)</span>
                </li>
              </ul>
            </div>

            {/* Horizontal Reservation */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FiLayers className="text-xl text-primary" />
                  <h3 className="text-base font-bold text-on-surface">Horizontal Reservation</h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                  These reservations cut across vertical categories. A person selected under this quota will be placed in the respective vertical category they belong to (e.g., a PwD student in OBC).
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full border border-primary bg-transparent"></span>
                  <span>PwD (Persons with Disabilities)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full border border-primary bg-transparent"></span>
                  <span>Women, Defence, and Freedom Fighters</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Category Breakdown */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold font-headline-md text-on-surface">Detailed Category Breakdown</h2>
            <p className="text-sm text-on-surface-variant mt-2">
              Select a state to view specific reservation percentages and requirements.
            </p>
          </div>

          {/* State switch tabs */}
          <div className="flex justify-center gap-6 border-b border-outline-variant mb-8 overflow-x-auto pb-2 scrollbar-none">
            {(["national", "gujarat", "maharashtra", "mp", "rajasthan"] as CategoryTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-xs font-bold transition-all relative shrink-0 cursor-pointer ${
                  activeTab === tab
                    ? "text-primary font-bold"
                    : "text-on-surface-variant font-medium hover:text-primary"
                }`}
              >
                {tab === "national" ? "National (AIQ)" : tab === "mp" ? "Madhya Pradesh" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Reservation details table */}
          <div className="overflow-hidden border border-outline-variant rounded-2xl bg-surface-container-lowest shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-bold text-xs uppercase border-b border-outline-variant">
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Reservation %</th>
                    <th className="px-6 py-4">Typical Rank Range</th>
                    <th className="px-6 py-4">Mandatory Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/60 text-sm">
                  {currentTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-on-surface">{row.category}</td>
                      <td className="px-6 py-4 text-on-surface-variant font-semibold">{row.percentage}</td>
                      <td className="px-6 py-4 text-on-surface-variant font-bold">{row.rankRange}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{row.certificate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <QuotaCta
          title="Confused about your eligibility?"
          description="Our expert counselors help you verify documents and calculate your state-specific category rank across all states."
          actions={[
            {
              label: "Talk to an Expert",
              href: "#",
              variant: "primary",
            },
          ]}
        />
      </Container>
    </div>
  );
}
