"use client";

import { useState } from "react";
import Link from "next/link";
import { DetailSectionHeader } from "@/components/features/colleges/shared/DetailSectionHeader";
import { DetailPanel } from "@/components/features/colleges/shared/DetailPanel";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

interface GlossaryItem {
  code: string;
  category: "Core" | "Quotas" | "Special & Horizontal" | "Prefixes";
  full: string;
  desc: string;
}

const GLOSSARY_ITEMS: GlossaryItem[] = [
  // Core Categories
  { code: "OPEN / UR / GEN", category: "Core", full: "Open / Unreserved / General", desc: "Seats open to all candidates based purely on merit rank without social reservation." },
  { code: "OBC / OBC-NCL", category: "Core", full: "Other Backward Classes (Non-Creamy Layer)", desc: "Backward class candidates eligible for central or state-level reservation benefits." },
  { code: "SC", category: "Core", full: "Scheduled Caste", desc: "Scheduled Caste category seats as per constitutional reservation guidelines." },
  { code: "ST", category: "Core", full: "Scheduled Tribe", desc: "Scheduled Tribe category seats as per constitutional reservation guidelines." },
  { code: "EW / EWS", category: "Core", full: "Economically Weaker Section", desc: "10% reservation for General category candidates from economically weaker backgrounds." },
  { code: "SE / SEBC", category: "Core", full: "Socially & Educationally Backward Class", desc: "State-level reservation for socially and educationally backward classes (e.g. Maratha reservation in Maharashtra)." },
  { code: "VJA / VJ-A", category: "Core", full: "Vimukta Jati (A)", desc: "Denotified Tribes (A) reservation category, commonly used in Maharashtra counselling." },
  { code: "NTB / NT-B", category: "Core", full: "Nomadic Tribes (B)", desc: "Nomadic Tribes category B seats under Maharashtra state counselling." },
  { code: "NTC / NT-C", category: "Core", full: "Nomadic Tribes (C)", desc: "Nomadic Tribes category C seats (typically representing Dhangar community in Maharashtra)." },
  { code: "NTD / NT-D", category: "Core", full: "Nomadic Tribes (D)", desc: "Nomadic Tribes category D seats (typically representing Vanjari community in Maharashtra)." },
  { code: "SOBC", category: "Core", full: "Special Other Backward Class", desc: "State-specific sub-quota for Special Other Backward Classes in certain states like Rajasthan." },

  // Quotas & Seat Types
  { code: "GQ / SQ", category: "Quotas", full: "Government Quota / State Quota", desc: "State quota seats in government and private colleges allotted by state counselling bodies." },
  { code: "MQ", category: "Quotas", full: "Management Quota", desc: "Private college seats open to candidates from all states, typically with higher tuition fees." },
  { code: "NRI / NQ", category: "Quotas", full: "Non-Resident Indian Quota", desc: "Seats reserved for NRI candidates or sponsored wards, paid in USD or equivalent INR." },
  { code: "AIQ", category: "Quotas", full: "All India Quota", desc: "15% of MBBS seats in all government colleges nationwide, filled centrally by MCC." },
  { code: "ESIC / IP", category: "Quotas", full: "Insured Persons Quota", desc: "Special reservation in ESIC medical colleges for wards of individuals covered under the ESI scheme." },
  { code: "IQ", category: "Quotas", full: "Institutional Quota", desc: "Seats reserved for candidates who completed schooling or qualifying exams from the same institution." },
  { code: "GOI", category: "Quotas", full: "Government of India nominee pool", desc: "Central government nominated seats for students from states/UTs without medical colleges." },

  // Special & Horizontal
  { code: "PH / PwD / PwBD", category: "Special & Horizontal", full: "Physically Handicapped / Persons with Disability", desc: "5% horizontal reservation within vertical categories for physically disabled candidates." },
  { code: "(W) / W Suffix", category: "Special & Horizontal", full: "Women / Female Quota", desc: "Female-only seat allocation (e.g. OPEN (W), SC (W), ST (W), OBC (W), SEBC(W), HSCW) as per state gender reservation rules." },
  { code: "(HA) Suffix", category: "Special & Horizontal", full: "Hilly Area Quota", desc: "Candidates originating from notified Hilly Areas (e.g. OBC (HA), EWS HA, NTD HA, SEBCHA) in Maharashtra." },
  { code: "DEF / DEF1", category: "Special & Horizontal", full: "Defence Quota", desc: "Horizontal reservation for children of active-duty defence personnel, ex-servicemen, or disabled veterans (Def-1, Def-2, Def-3)." },
  { code: "SN (Sainik)", category: "Special & Horizontal", full: "Sainik School / Wards of Ex-Servicemen", desc: "State-specific quota reserved for students from Sainik schools or wards of defence personnel." },
  { code: "GS / Govt Servant", category: "Special & Horizontal", full: "Government Servant / School", desc: "Special reservation for children of Government Servants or students who completed schooling from Government Schools." },
  { code: "OrphanC / ORP-C / ORPHANC", category: "Special & Horizontal", full: "Orphan Candidates", desc: "Horizontal reservation for orphan children meeting the criteria set by state governments." },
  { code: "Inter-se Orphan", category: "Special & Horizontal", full: "Inter-se Orphan Merit Allocation", desc: "Merit-based selection priority applied specifically within orphan candidates." },

  // Prefixes & Status
  { code: "EM- Prefix", category: "Prefixes", full: "Earmarked Seats", desc: "Prefix (e.g. EMOBC, EMNTD, EMSEBC, EMVJA) meaning seat allocated to a category candidate who qualified on general merit but preferred their category seat." },
  { code: "H- Prefix", category: "Prefixes", full: "Hilly Area Regional Category", desc: "Prefix (e.g. HOPEN, HEWS, HOBC, HSC, HST) designating candidates claiming Hilly Area benefits within their category." },
  { code: "D1 / D2 / D3", category: "Prefixes", full: "Defence Priority Levels", desc: "Sub-priority lists inside defence quota based on status (e.g. deceased in service vs. ex-servicemen vs. active)." },
];

export function AbbreviationsGlossary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Core" | "Quotas" | "Special" | "Prefixes">("All");

  const categoryMap: Record<string, string> = {
    All: "All",
    Core: "Core",
    Quotas: "Quotas",
    Special: "Special & Horizontal",
    Prefixes: "Prefixes",
  };

  const filteredItems = GLOSSARY_ITEMS.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.full.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "All") return matchesSearch;
    return matchesSearch && item.category === categoryMap[activeTab];
  });

  return (
    <section
      className="flex flex-col gap-6"
      aria-labelledby="college-glossary-heading"
    >
      <DetailSectionHeader
        id="college-glossary-heading"
        eyebrow="Help & Reference"
        title="Abbreviations Glossary"
        description="Decode seat types, admission quotas, and reservation category codes used in cutoff charts."
        icon="help"
      />

      <DetailPanel className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-on-surface">
          <div className="flex items-center gap-2.5">
            <MaterialSymbol name="menu_book" className="text-primary text-[20px] shrink-0" />
            <span>Looking for full definitions and rules behind each code? Explore our comprehensive 13-section counselling dictionary.</span>
          </div>
          <Link
            href="/neet-ug-2026/terms-explained#abbreviations"
            className="inline-flex items-center gap-1 shrink-0 font-bold text-primary hover:underline"
          >
            <span>Open Terms Explained</span>
            <MaterialSymbol name="arrow_forward" className="text-[15px]" />
          </Link>
        </div>

        {/* Quick decoder guide */}
        <div className="rounded-xl border flex border-primary/10 bg-linear-to-br from-primary-fixed-dim/5 to-surface-container-lowest p-4 md:p-5 shadow-xs">
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
            <div className="flex flex-col gap-1.5">
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">How to Decode Combined Codes</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Many cutoff sheets combine prefixes, categories, and suffixes to denote specific seat pools. Use the formula:
              </p>
              <div className="my-2 flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
                <span className="rounded bg-surface-container-high px-2 py-1 border border-outline-variant text-on-surface">Prefix (e.g. EM-, H-)</span>
                <span className="text-on-surface-variant">+</span>
                <span className="rounded bg-primary-fixed px-2 py-1 text-primary">Category (e.g. SC, OBC, EWS, NTD)</span>
                <span className="text-on-surface-variant">+</span>
                <span className="rounded bg-tertiary-fixed px-2 py-1 text-tertiary">Suffix (e.g. W, PH, HA)</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-[11px] text-on-surface-variant leading-normal">
                <div>
                  <strong className="text-on-surface">EMNTDW</strong> = Earmarked + Nomadic Tribe D + Women
                </div>
                <div>
                  <strong className="text-on-surface">SEBCHA</strong> = SEBC Category + Hilly Area Suffix
                </div>
                <div>
                  <strong className="text-on-surface">HEWS</strong> = Hilly Area Prefix + Economically Weaker Section
                </div>
                <div>
                  <strong className="text-on-surface">EWPH / SEPH</strong> = EWS/SEBC Category + Physically Handicapped
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Tabs Controls */}
        <div className="flex flex-col gap-6 mt-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search abbreviation or full form (e.g. VJA, Earmarked, Hilly)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[14px] border border-outline-variant bg-surface-container-low py-3 pl-10 pr-4 text-sm font-medium text-on-surface placeholder:text-on-surface-variant focus:border-primary/50 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
            <MaterialSymbol
              name="search"
              className="absolute left-3.5 top-3 text-[18px] text-on-surface-variant"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-3.5 text-on-surface-variant hover:text-on-surface"
              >
                <MaterialSymbol name="close" className="text-base" />
              </button>
            )}
          </div>

          <div className="flex gap-1 overflow-x-auto scrollbar-none border-b border-border/10 pb-1">
            {(["All", "Core", "Quotas", "Special", "Prefixes"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === tab
                    ? "bg-primary text-on-primary shadow-xs"
                    : "text-on-surface-variant hover:text-primary"
                  }`}
              >
                {tab === "Special" ? "Horizontal / Special" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid List of Definitions */}
        {filteredItems.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredItems.map((item) => (
              <div
                key={item.code}
                className="flex flex-col gap-1.5 rounded-xl border border-outline-variant/50 bg-surface-container-low/40 p-4 transition-all duration-200 hover:border-primary/25 hover:bg-surface-container-low"
              >
                <div className="flex items-center gap-2">
                  <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${item.category === "Core"
                      ? "bg-primary-fixed text-primary"
                      : item.category === "Quotas"
                        ? "bg-secondary-container text-on-secondary-container"
                        : item.category === "Special & Horizontal"
                          ? "bg-tertiary-fixed text-tertiary"
                          : "bg-surface-container-highest text-on-surface-variant"
                    }`}>
                    {item.code}
                  </span>
                  <span className="text-xs font-bold text-on-surface">
                    {item.full}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-on-surface-variant">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-outline-variant py-10 text-center">
            <MaterialSymbol name="search_off" className="text-3xl text-on-surface-variant" />
            <h4 className="text-xs font-bold text-on-surface">No matching codes found</h4>
            <p className="text-[10px] text-on-surface-variant max-w-xs leading-normal">
              Try searching for a simpler keyword or checking the prefix decoders card.
            </p>
          </div>
        )}
      </DetailPanel>
    </section>
  );
}
