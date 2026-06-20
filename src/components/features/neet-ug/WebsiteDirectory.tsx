"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

export interface WebsiteLink {
  id: string;
  name: string;
  state: string;
  authority: string;
  url: string;
  scope: "Central" | "State";
  status: "Active" | "Not Started" | "Counselling Live";
}

interface WebsiteDirectoryProps {
  links?: WebsiteLink[];
}

const defaultLinks: WebsiteLink[] = [
  {
    id: "1",
    name: "Medical Counselling Committee (MCC)",
    state: "All India (AIQ)",
    authority: "Directorate General of Health Services (DGHS)",
    url: "https://mcc.nic.in",
    scope: "Central",
    status: "Active",
  },
  {
    id: "2",
    name: "AYUSH Admissions Central Counseling Committee (AACCC)",
    state: "All India (BAMS/BHMS)",
    authority: "Ministry of AYUSH",
    url: "https://aaccc.gov.in",
    scope: "Central",
    status: "Not Started",
  },
  {
    id: "3",
    name: "State Common Entrance Test Cell, Maharashtra",
    state: "Maharashtra",
    authority: "State CET Cell, Mumbai",
    url: "https://cetcell.mahacet.org",
    scope: "State",
    status: "Counselling Live",
  },
  {
    id: "4",
    name: "Karnataka Examinations Authority (KEA)",
    state: "Karnataka",
    authority: "KEA, Bangalore",
    url: "https://cetonline.karnataka.gov.in/kea",
    scope: "State",
    status: "Active",
  },
  {
    id: "5",
    name: "Directorate of Medical Education (DME), Tamil Nadu",
    state: "Tamil Nadu",
    authority: "DME Selection Committee",
    url: "https://tnmedicalselection.net",
    scope: "State",
    status: "Active",
  },
  {
    id: "6",
    name: "Department of Medical Education (DME), Madhya Pradesh",
    state: "Madhya Pradesh",
    authority: "DME MP",
    url: "https://dme.mponline.gov.in",
    scope: "State",
    status: "Not Started",
  },
  {
    id: "7",
    name: "Faculty of Medical Sciences, Delhi University (DU)",
    state: "Delhi (DU Quota)",
    authority: "FMSC, DU",
    url: "https://fmsc.ac.in",
    scope: "State",
    status: "Active",
  },
  {
    id: "8",
    name: "Baba Farid University of Health Sciences (BFUHS)",
    state: "Punjab",
    authority: "BFUHS, Faridkot",
    url: "https://bfuhs.ac.in",
    scope: "State",
    status: "Active",
  },
];

export function WebsiteDirectory({ links = defaultLinks }: WebsiteDirectoryProps) {
  const [activeType, setActiveType] = useState<"all" | "central" | "state">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSites = links.filter((site) => {
    if (activeType === "central" && site.scope !== "Central") return false;
    if (activeType === "state" && site.scope !== "State") return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        site.name.toLowerCase().includes(q) ||
        site.state.toLowerCase().includes(q) ||
        site.authority.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const statusBadgeColors = {
    Active: "bg-primary-fixed/50 text-primary border-primary/20",
    "Not Started": "bg-surface-container-high text-on-surface-variant border-outline-variant",
    "Counselling Live": "bg-tertiary-fixed/50 text-tertiary border-tertiary/25",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-border pb-4">
        {/* Search Bar */}
        <div className="w-full md:w-80">
          <Input
            placeholder="Search by state, name..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leadingIcon={<MaterialSymbol name="search" />}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 bg-surface-muted/50 p-1.5 border border-border rounded-xl w-full md:w-auto overflow-x-auto">
          {(["all", "central", "state"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl capitalize transition-colors ${
                activeType === type
                  ? "bg-surface-container-lowest text-primary shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-outline-variant"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              {type} Links
            </button>
          ))}
        </div>
      </div>

      {/* Link Cards Grid */}
      <div className="flex flex-col gap-4">
        {filteredSites.length > 0 ? (
          filteredSites.map((site) => (
            <Card key={site.id} padded bordered className="bg-surface-container-lowest hover:bg-surface-container-lowest hover:shadow-[0_2px_6px_rgba(0,0,0,0.04),0_30px_70px_-30px_rgba(37,70,208,0.28)] transition-all rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    site.scope === "Central" ? "bg-primary-fixed text-primary border-primary/15" : "bg-secondary-fixed/80 text-secondary border-secondary/25"
                  }`}>
                    {site.scope}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusBadgeColors[site.status]}`}>
                    {site.status}
                  </span>
                </div>
                <h4 className="font-bold text-text text-base md:text-lg leading-snug">
                  {site.name}
                </h4>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted font-medium mt-0.5">
                  <span className="flex items-center gap-1">
                    <MaterialSymbol name="public" size="sm" />
                    Jurisdiction: {site.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <MaterialSymbol name="account_balance" size="sm" />
                    {site.authority}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-stretch gap-2 shrink-0 sm:w-36">
                <Button
                  as="link"
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  fullWidth
                  trailingIcon={<MaterialSymbol name="open_in_new" size="sm" />}
                >
                  Visit Portal
                </Button>
                <Button
                  onClick={() => handleCopy(site.id, site.url)}
                  variant="subtle"
                  size="sm"
                  fullWidth
                  className={copiedId === site.id ? "text-tertiary bg-tertiary-fixed/50 border border-tertiary/25" : ""}
                  leadingIcon={<MaterialSymbol name={copiedId === site.id ? "check" : "content_copy"} size="sm" />}
                >
                  {copiedId === site.id ? "Copied!" : "Copy Link"}
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-surface-container-lowest border border-outline-variant border-dashed rounded-2xl">
            <MaterialSymbol name="search_off" className="text-text-muted text-4xl block mb-2" />
            <h4 className="font-bold text-text">No Counselling Boards Found</h4>
            <p className="text-xs text-text-secondary mt-1">Try modifying your search query or switching filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
