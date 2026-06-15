import type { QuotaMetricItem } from "./QuotaShared";
import {
  mccCounsellingGuide as originalMccCounsellingGuide,
  getMccChapterConversionRules as originalGetMccChapterConversionRules,
  getCentralReservationCategories as originalGetCentralReservationCategories,
} from "@/lib/data/mcc-counselling";

export const mccCounsellingGuide = originalMccCounsellingGuide;
export const getMccChapterConversionRules = originalGetMccChapterConversionRules;
export const getCentralReservationCategories = originalGetCentralReservationCategories;

// ============================================================================
// 1. All India Quota (AIQ) Data
// ============================================================================
export const aiqMetrics: QuotaMetricItem[] = [
  {
    icon: "event_seat",
    label: "Seats",
    value: "15% AIQ",
    caption: "State govt colleges",
  },
  {
    icon: "how_to_reg",
    label: "Eligibility",
    value: "NEET UG",
    caption: "AIQ qualified only",
  },
  {
    icon: "public",
    label: "Domicile",
    value: "No",
    caption: "Domicile free",
  },
  {
    icon: "corporate_fare",
    label: "Body",
    value: "MCC",
    caption: "DGHS, MoHFW",
  },
  {
    icon: "layers",
    label: "Rounds",
    value: "4 Online",
    caption: "R1, R2, R3, Stray",
  },
];

// ============================================================================
// 2. NRI Quota Data
// ============================================================================
export const nriDocumentationCards = [
  {
    icon: "badge",
    title: "Relative's Card",
    desc: "Passport/Green Card/Visa copy of the NRI sponsor.",
  },
  {
    icon: "diversity_3",
    title: "Relationship Proof",
    desc: "Family tree or embassy certificate proving sponsorship link.",
  },
  {
    icon: "history_edu",
    title: "Sponsor Affidavit",
    desc: "Legal undertaking by NRI to fund the entire course duration.",
  },
  {
    icon: "assignment_turned_in",
    title: "NEET Scorecard",
    desc: "Valid qualifying marks in NEET UG for the current session.",
  },
  {
    icon: "payments",
    title: "Demand Draft",
    desc: "Payment in USD/INR as per state-specific counselling rules.",
  },
];

export const nriStatesData = [
  {
    state: "Gujarat",
    seats: "838 Seats",
    rank: "Expected Rank: 2L - 5L+",
    financials: "DD at GMERS Gandhinagar required",
    characteristic: "High volume of semi-govt (GMERS) seats",
    link: "/quota/state?tab=gujarat",
  },
  {
    state: "Rajasthan",
    seats: "Highest Govt Quota",
    rank: "Managed by RUHS",
    financials: "Approx. ₹25.12L Fee",
    characteristic: "Only state with large Govt NRI pool",
    link: "/quota/state?tab=rajasthan",
  },
  {
    state: "Maharashtra",
    seats: "Multiple Routes",
    rank: "Expected Rank: 2.5L - 6L+",
    financials: "Private Colleges + MCC Deemed routes",
    characteristic: "Diverse options in Deemed Universities",
    link: "/quota/state?tab=maharashtra",
  },
  {
    state: "Madhya Pradesh",
    seats: "Selective Seats",
    rank: "Expected Rank: 2L - 4.5L",
    financials: "Fees often in USD",
    characteristic: "Strict relationship verification rules",
    link: "/quota/state?tab=mp",
  },
];

// ============================================================================
// 3. Management Quota (MQ) Data
// ============================================================================
export const mqStatesData = [
  {
    state: "Gujarat (GJ)",
    seats: "380 seats",
    rankRange: "80k - 200k",
    notes: "Highly regulated fee structure (FRC). Mostly Trust-run institutions.",
    link: "/quota/state?tab=gujarat",
  },
  {
    state: "Maharashtra (MH)",
    seats: "~1,800 seats",
    rankRange: "60k - 180k",
    notes: "Fees determined by FRA. Extensive clinical exposure and infrastructure.",
    link: "/quota/state?tab=maharashtra",
  },
  {
    state: "Madhya Pradesh (MP)",
    seats: "~15% Private",
    rankRange: "70k - 150k",
    notes: "Most affordable private options. Central location with growing medical hubs.",
    link: "/quota/state?tab=mp",
  },
  {
    state: "Rajasthan (RJ)",
    seats: "~15% Private",
    rankRange: "60k - 160k",
    notes: "Mop-up round details are crucial for higher rank aspirants. Top-tier Jaipur colleges.",
    link: "/quota/state?tab=rajasthan",
  },
];

// ============================================================================
// 4. State Quota Data
// ============================================================================
export interface StateContent {
  title: string;
  portalName: string;
  portalUrl: string;
  rows: { parameter: string; detail: string }[];
  sidebarTitle: string;
  sidebarText: string;
  tipTitle: string;
  tipText: string;
}

export type StateTab = "gujarat" | "maharashtra" | "mp" | "rajasthan";

export const stateDetailsData: Record<StateTab, StateContent> = {
  gujarat: {
    title: "ACPUGMEC Info & Guidelines",
    portalName: "ACPUGMEC",
    portalUrl: "https://medadmgujarat.org",
    rows: [
      { parameter: "Total Govt. Seats", detail: "~5,664 Seats (Approx. 2024 Matrix)" },
      { parameter: "Eligibility Rule", detail: "Mandatory passing of both Std 10th and 12th from Gujarat Schools." },
      { parameter: "Local Sub-Quotas", detail: "Specific local residency quotas for NHL (Ahmedabad) and SMIMER (Surat)." },
      { parameter: "Qualifying Marks", detail: "SC/ST candidates require 40% in NEET for eligibility." },
    ],
    sidebarTitle: "SEBC Rule",
    sidebarText: "Gujarat follows strict SEBC (Socially and Educationally Backward Classes) norms. A valid Non-Creamy Layer (NCL) certificate from Gujarat is mandatory.",
    tipTitle: "Process Tip",
    tipText: "Document verification often requires physical presence at designated Help Centers within Gujarat. Check official schedules regularly.",
  },
  maharashtra: {
    title: "CET Cell Maharashtra Guidelines",
    portalName: "CET Cell Maharashtra",
    portalUrl: "https://cetcell.mahacet.org",
    rows: [
      { parameter: "Total Govt. Seats", detail: "~10,900 Seats across 73+ Colleges" },
      { parameter: "Eligibility Rule", detail: "Maharashtra domicile certificate OR passed Class 10 from Maharashtra board." },
      { parameter: "Local Sub-Quotas", detail: "Institute Quota: Govt-aided private colleges have separate local preference pool." },
      { parameter: "Qualifying Marks", detail: "Includes multiple sub-categories (OBC-A, OBC-B, VJ/NT, SBC)." },
    ],
    sidebarTitle: "VJ/NT Category Rule",
    sidebarText: "VJ/NT is further split: VJ-A (~1%), NT-B (~0.5%), NT-C (~1%), NT-D (~0.5%). Check category codes during choice filling.",
    tipTitle: "Process Tip",
    tipText: "Requires category document verification at local centers. Keep validation records and income certificates ready.",
  },
  mp: {
    title: "DME MP Guidelines",
    portalName: "DME MP",
    portalUrl: "https://dme.mponline.gov.in",
    rows: [
      { parameter: "Total Govt. Seats", detail: "85% of all 13 Govt medical college seats in MP" },
      { parameter: "Domicile Rule", detail: "MP domicile certificate mandatory." },
      { parameter: "Local Sub-Quotas", detail: "Tribal Sub-Plan (TSP): Separate seat pool for ST candidates from 89 notified tribal belt districts." },
      { parameter: "Qualifying Marks", detail: "ST reservation at 20% — highest among 4 states." },
    ],
    sidebarTitle: "TSP Advantage",
    sidebarText: "TSP ST cutoffs are significantly lower than standard ST ranges. Excellent route for tribal districts.",
    tipTitle: "Process Tip",
    tipText: "Allotment includes parallel seat allocation rounds. Choice preference lock is absolute.",
  },
  rajasthan: {
    title: "Rajugneet Guidelines",
    portalName: "Rajasthan Medical Education Dept.",
    portalUrl: "https://rajugneet.rajasthan.gov.in",
    rows: [
      { parameter: "Total Govt. Seats", detail: "85% of all Govt medical college seats in Rajasthan" },
      { parameter: "Domicile Rule", detail: "Rajasthan domicile mandatory." },
      { parameter: "Local Sub-Quotas", detail: "80:20 Gender Ratio: 80% open to all genders / 20% reserved for female candidates." },
      { parameter: "Qualifying Marks", detail: "Highest overall state quota cutoffs among the 4 states." },
    ],
    sidebarTitle: "80:20 Rule",
    sidebarText: "Within each category, 20% of seats are exclusively reserved for female candidates, altering cutoff trends.",
    tipTitle: "Process Tip",
    tipText: "Private college seats have 85:15 domicile rule (85% RJ domicile / 15% open). Mop-up rounds are held physically.",
  },
};

// ============================================================================
// 5. Reservation Categories Data
// ============================================================================
export type CategoryTab = "national" | "gujarat" | "maharashtra" | "mp" | "rajasthan";

export interface ReservationRow {
  category: string;
  percentage: string;
  rankRange: string;
  certificate: string;
}

export const reservationCategoriesData: Record<CategoryTab, ReservationRow[]> = {
  national: [
    { category: "OPEN / Unreserved", percentage: "15% AIQ Seats", rankRange: "1 - 25,000", certificate: "Not Required" },
    { category: "OBC-NCL", percentage: "27%", rankRange: "25,000 - 35,000", certificate: "Central List NCL (Dated after April 1)" },
    { category: "EWS", percentage: "10%", rankRange: "25,000 - 40,000", certificate: "Income & Asset Certificate (Central)" },
    { category: "SC", percentage: "15%", rankRange: "80,000 - 1,50,000", certificate: "SC Certificate (Format as per MCC)" },
    { category: "ST", percentage: "7.5%", rankRange: "1,20,000 - 2,00,000", certificate: "ST Certificate (Format as per MCC)" },
    { category: "PwD", percentage: "5% (Horizontal)", rankRange: "Up to 8,000,000", certificate: "MCC Designated Disability Center Cert." },
  ],
  gujarat: [
    { category: "OPEN / Unreserved", percentage: "50%", rankRange: "40,000 - 1,20,000", certificate: "Pure merit" },
    { category: "SEBC", percentage: "27%", rankRange: "1,20,000 - 2,50,000", certificate: "Gujarat Mamlatdar SEBC Cert & NCL" },
    { category: "EWS", percentage: "10%", rankRange: "1,00,000 - 2,00,000", certificate: "Gujarat EWS Cert" },
    { category: "SC", percentage: "7%", rankRange: "2,50,000 - 4,00,000", certificate: "Gujarat SC Cert (min 40% NEET)" },
    { category: "ST", percentage: "14%", rankRange: "4,00,000 - 6,00,000", certificate: "Gujarat ST Cert (min 40% NEET)" },
    { category: "PwD", percentage: "5% (Horizontal)", rankRange: "Varies", certificate: "Across all categories" },
  ],
  maharashtra: [
    { category: "OPEN / Unreserved", percentage: "~50%", rankRange: "20,000 - 80,000", certificate: "Pure merit" },
    { category: "EWS", percentage: "10%", rankRange: "80,000 - 1,50,000", certificate: "SDO EWS Cert or higher" },
    { category: "OBC", percentage: "19%", rankRange: "1,50,000 - 3,00,000", certificate: "MH State OBC NCL Cert" },
    { category: "SC", percentage: "13%", rankRange: "3,00,000 - 5,00,000", certificate: "MH SC Cert" },
    { category: "ST", percentage: "7%", rankRange: "4,00,000 - 7,00,000", certificate: "MH ST Cert" },
    { category: "VJ / NT", percentage: "~3%", rankRange: "3,50,000 - 5,50,000", certificate: "Split: VJ-A, NT-B, NT-C, NT-D" },
    { category: "SBC", percentage: "~2%", rankRange: "2,50,000 - 4,00,000", certificate: "Special Backward Class Cert" },
    { category: "PwD", percentage: "5% (Horizontal)", rankRange: "Varies", certificate: "Horizontal across all categories" },
  ],
  mp: [
    { category: "OPEN / Unreserved", percentage: "50%", rankRange: "30,000 - 1,00,000", certificate: "Pure merit" },
    { category: "EWS", percentage: "10%", rankRange: "1,00,000 - 2,00,000", certificate: "MP EWS Cert" },
    { category: "OBC", percentage: "27%", rankRange: "1,00,000 - 2,50,000", certificate: "MP state OBC NCL Cert" },
    { category: "SC", percentage: "15%", rankRange: "2,50,000 - 4,50,000", certificate: "MP SC Cert" },
    { category: "ST", percentage: "20%", rankRange: "4,50,000 - 7,00,000", certificate: "MP ST Cert" },
    { category: "TSP", percentage: "Separate pool", rankRange: "6,00,000 - 9,00,000", certificate: "ST from 89 tribal districts" },
    { category: "PwD", percentage: "5% (Horizontal)", rankRange: "Varies", certificate: "MP PwD Cert" },
  ],
  rajasthan: [
    { category: "OPEN / Unreserved", percentage: "50%", rankRange: "15,000 - 60,000", certificate: "Pure merit" },
    { category: "EWS", percentage: "10%", rankRange: "60,000 - 1,20,000", certificate: "Tehsildar or SDO EWS Cert" },
    { category: "OBC", percentage: "21%", rankRange: "1,20,000 - 2,50,000", certificate: "RJ state OBC NCL Cert" },
    { category: "SC", percentage: "16%", rankRange: "2,50,000 - 4,50,000", certificate: "RJ SC Cert" },
    { category: "ST", percentage: "12%", rankRange: "4,00,000 - 6,50,000", certificate: "RJ ST Cert" },
    { category: "PwD", percentage: "5% (Horizontal)", rankRange: "Varies", certificate: "RJ PwD Cert" },
  ],
};

// ============================================================================
// 6. Quota Types Overview
// ============================================================================
export interface QuotaCardProps {
  slug: string;
  abbreviation: string;
  name: string;
  seats: string;
  counseling: string;
  feeRange: string;
  domicileStatus: "NO DOMICILE" | "DOMICILE YES" | "SPECIFIC";
}

export const quotaTypesOverviewData: QuotaCardProps[] = [
  {
    slug: "all-india",
    abbreviation: "AIQ",
    name: "All India Quota",
    seats: "15% Seats",
    counseling: "MCC (Directorate Gen)",
    feeRange: "₹5k - ₹25k / yr",
    domicileStatus: "NO DOMICILE",
  },
  {
    slug: "state",
    abbreviation: "SQ",
    name: "State Quota",
    seats: "85% Govt Seats",
    counseling: "State DME Authorities",
    feeRange: "₹10k - ₹1.5L / yr",
    domicileStatus: "DOMICILE YES",
  },
  {
    slug: "management",
    abbreviation: "MQ",
    name: "Management Quota",
    seats: "Private Inst. Varies",
    counseling: "MCC / State DME",
    feeRange: "₹8L - ₹25L / yr",
    domicileStatus: "NO DOMICILE",
  },
  {
    slug: "nri",
    abbreviation: "NRI",
    name: "NRI Quota",
    seats: "15% Pvt/Deemed",
    counseling: "Central/State MCC",
    feeRange: "₹25L - ₹50L / yr",
    domicileStatus: "SPECIFIC",
  },
  {
    slug: "deemed",
    abbreviation: "DU",
    name: "Deemed Universities",
    seats: "100% Open",
    counseling: "MCC (Central)",
    feeRange: "₹12L - ₹28L / yr",
    domicileStatus: "NO DOMICILE",
  },
  {
    slug: "special",
    abbreviation: "SP",
    name: "Special Quotas",
    seats: "Varies (PWD/Def)",
    counseling: "State/Central Board",
    feeRange: "Subsidized Fees",
    domicileStatus: "DOMICILE YES",
  },
];

// ============================================================================
// 7. Counselling Resources Hub Data
// ============================================================================
export type ResourceKey = "central" | "gujarat" | "maharashtra" | "mp" | "rajasthan";

export interface ResourceRow {
  body: string;
  url: string;
  usage: string;
}

export const resourceData: Record<ResourceKey, ResourceRow[]> = {
  central: [
    {
      body: "Medical Counselling Committee (MCC)",
      url: "https://mcc.nic.in",
      usage:
        "15% AIQ, 100% Deemed Universities, Central Universities (DU, AMU, BHU, JMI), ESIC IP Quota, AFMC registration, IP University institutes (VMMC, ABVIMS, ESIC Dental), 100% AIIMS, 100% JIPMER. Four online rounds: R1, R2, R3, Stray Vacancy.",
    },
    {
      body: "National Testing Agency",
      url: "https://exams.nta.ac.in/NEET/",
      usage: "NEET UG Entrance Exam conduct, registration, admit cards, and result scorecard declaration.",
    },
    {
      body: "National Medical Commission",
      url: "https://nmc.org.in",
      usage: "Official college databases, seat matrix verification, regulations, and institutional recognition status.",
    },
    {
      body: "Dir. General of Health Services",
      url: "https://dghs.gov.in",
      usage: "Policy updates, historical seat data, and high-level counselling guidelines for medical seats.",
    },
  ],
  gujarat: [
    {
      body: "ACPUGMEC",
      url: "https://medadmgujarat.org",
      usage: "Registration, choice filling, seat allotment, GQ + MQ + NRI quota.",
    },
  ],
  maharashtra: [
    {
      body: "CET Cell",
      url: "https://cetcell.mahacet.org",
      usage: "State quota counselling, registration, merit list, allotment.",
    },
    {
      body: "DMER",
      url: "https://dmer.maharashtra.gov.in",
      usage: "NRI quota, policy, fee structure, aided college rules.",
    },
  ],
  mp: [
    {
      body: "DME MP",
      url: "https://dme.mponline.gov.in",
      usage: "Registration, seat allotment, TSP sub-quota, MP counselling.",
    },
  ],
  rajasthan: [
    {
      body: "Raj. Med. Dept.",
      url: "https://rajugneet.rajasthan.gov.in",
      usage: "State quota registration, allotment, domicile & gender ratio info.",
    },
    {
      body: "RUHS",
      url: "https://ruhsraj.org",
      usage: "NRI quota in Govt college seats (unique to Rajasthan).",
    },
  ],
};

export const topPortals = [
  {
    icon: "account_balance",
    badge: "NATIONAL",
    title: "MCC Counselling",
    desc: "AIQ, Deemed & Central University seats registration portal.",
    url: "https://mcc.nic.in",
  },
  {
    icon: "assignment",
    badge: "EXAMINATION",
    title: "NTA NEET Portal",
    desc: "Official NEET (UG) application, correction window, and results.",
    url: "https://exams.nta.ac.in/NEET/",
  },
];

// ============================================================================
// 8. Shared UI Card Maps
// ============================================================================
export const quotaOverviewHeroRules = [
  {
    icon: "rule",
    title: "Application Rules",
    desc: "Candidates can apply for multiple quotas simultaneously across different counseling rounds.",
  },
  {
    icon: "domain",
    title: "Domicile Lock",
    desc: "State Quotas (SQ) are strictly bound to residency, while AIQ is open to all Indian nationals.",
  },
];

export const premiumInstitutionsData = [
  {
    image: "/brand/college_building.png",
    title: "AIIMS & JIPMER",
  },
  {
    image: "/brand/home/hero.png",
    title: "AFMC & ESIC",
  },
];

export const stateQuotaHighlights = [
  {
    icon: "percent",
    title: "85%",
    desc: "Seats reserved in Govt. Colleges for local candidates.",
  },
  {
    icon: "verified",
    title: "Mandatory",
    desc: "Domicile Certificate is Essential for Eligibility.",
  },
  {
    icon: "corporate_fare",
    title: "State Body",
    desc: "Independent Counseling for Each State.",
  },
];

export const managementQuotaSubHeaders = [
  {
    icon: "shield",
    title: "Eligibility",
    desc: "NEET Qualified Candidates Only",
  },
  {
    icon: "compass",
    title: "Domicile Rules",
    desc: "Open to all candidates across India",
  },
];

export const managementQuotaOverviewStats = [
  {
    label: "Scope",
    value: "~35-50% seats",
    desc: "In private medical colleges",
  },
  {
    label: "Counselling",
    value: "State Authorities",
    desc: "Conducted by respective state DME",
  },
  {
    label: "Annual Fees",
    value: "8 Lakhs – 25 Lakhs",
    desc: "Varies widely by state and college",
  },
  {
    label: "Domicile Rule",
    value: "Open to All States",
    desc: "No residency restriction for MQ",
    isPrimaryValue: true,
  },
];


