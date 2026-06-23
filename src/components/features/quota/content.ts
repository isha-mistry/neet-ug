import type { QuotaMetricItem, QuotaTheoryContent } from "./QuotaShared";
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
      { parameter: "Bond Service", detail: "1 Year compulsory government rural service or ₹5 Lakhs penalty." },
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
      { parameter: "Bond Service", detail: "1 Year compulsory service in state government hospitals or ₹10 Lakhs penalty." },
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
      { parameter: "Bond Service", detail: "1 Year compulsory rural service or ₹10 Lakhs penalty (₹5 Lakhs for reserved categories)." },
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
      { parameter: "Bond Service", detail: "2 Years compulsory government service or ₹5 Lakhs penalty." },
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
    { category: "OPEN / Unreserved", percentage: "~40.5%", rankRange: "1 - 25,000", certificate: "Not Required" },
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
      url: "https://dghs.mohfw.gov.in/",
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
    desc: "Candidates can apply for multiple quotas simultaneously across different counselling rounds.",
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
    desc: "Independent Counselling for Each State.",
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

// ============================================================================
// 9. Enriched Datasets for Redesigned Pages
// ============================================================================

export const counsellingDocumentsChecklist = {
  general: [
    "NEET UG 2026 Admit Card (issued by NTA)",
    "NEET UG 2026 Scorecard / Rank Letter",
    "Provisional Allotment Letter (generated online)",
    "Class 10 Certificate & Mark Sheet (for DOB proof)",
    "Class 12 Certificate & Mark Sheet (PCB & English status)",
    "Eight Passport-sized photographs (same as NEET form)",
    "Proof of Identity (Aadhaar Card / PAN Card / Passport)",
    "Transfer / School Leaving Certificate & Conduct Certificate"
  ],
  category: [
    "Central OBC-NCL Certificate (issued after April 1 of the admission year)",
    "Income & Asset Certificate for EWS candidates (family income < ₹8 Lakhs)",
    "SC/ST Community Certificate in central prescribed format",
    "Disability Certificate issued by one of the 16 designated MCC screening centers (PwD)"
  ],
  nri: [
    "Passport & Visa copy of the NRI sponsor / parent",
    "Relationship Certificate (Birth Certificate or embassy-verified family tree)",
    "Sponsor Affidavit (undertaking to fund the entire course duration)",
    "Embassy Certificate of the sponsor's active NRI status",
    "Refund account details (domestic NRO account copy)"
  ]
};

export const securityDepositsData = [
  {
    type: "All India Quota (AIQ)",
    category: "UR / EWS",
    amount: "₹10,000",
    refundable: "Yes (post counselling)",
    rules: "Forfeited if seat is allotted in R2/R3/Stray and candidate fails to join."
  },
  {
    type: "All India Quota (AIQ)",
    category: "SC / ST / OBC / PwD",
    amount: "₹5,000",
    refundable: "Yes (post counselling)",
    rules: "Forfeited if seat is allotted in R2/R3/Stray and candidate fails to join."
  },
  {
    type: "Deemed Universities",
    category: "All Candidates",
    amount: "₹2,00,000",
    refundable: "Yes (post counselling)",
    rules: "Forfeited if allotted in R2/R3/Stray and candidate fails to join."
  },
  {
    type: "State Private Management",
    category: "All Categories",
    amount: "₹1,00,000 – ₹2,00,000",
    refundable: "Yes (varies by State DME)",
    rules: "Subject to state-specific exit and forfeiture rules."
  }
];

export const afmcScreeningSteps = [
  { step: 1, title: "Register on MCC", desc: "Select AFMC option during central counselling registration." },
  { step: 2, title: "AFMC Cutoffs", desc: "Report to AFMC Pune for physical screening if you meet cutoffs." },
  { step: 3, title: "ToELR Test", desc: "Test of English Language, Comprehension & Logic (40 MCQs, 80 marks)." },
  { step: 4, title: "PAT Assessment", desc: "Psychological Assessment Test (qualifying nature)." },
  { step: 5, title: "Interview & Medical", desc: "Personal Interview (50 marks) followed by strict physical fitness assessment." }
];

export const afmcMeritFormula = {
  formula: "Merit Score = (NEET Score + ToELR Score) / 4 + Interview Score",
  details: "Max NEET Score = 720, Max ToELR = 80 (Sum = 800, divided by 4 = 200). Interview = 50. Total Merit out of 250."
};

export const openClosedStatesData = {
  open: [
    { state: "Karnataka (KEA)", seats: "~3,000 private seats", avgFee: "₹10.9L/yr", remark: "High demand, low fees" },
    { state: "Uttar Pradesh (UPDGME)", seats: "~4,500 private seats", avgFee: "₹11.5L - ₹16L/yr", remark: "No security deposit in R1" },
    { state: "Rajasthan (Rajugneet)", seats: "~1,200 private seats", avgFee: "₹18L - ₹28L/yr", remark: "Open from Round 3 onwards" },
    { state: "Bihar (BCECEB)", seats: "~950 private seats", avgFee: "₹12L - ₹18L/yr", remark: "High clinical exposure" }
  ],
  closed: [
    { state: "Gujarat (ACPUGMEC)", rule: "Strict local domicile mandatory for government, semi-govt (GMERS) and private college management seats." },
    { state: "Maharashtra (CET Cell)", rule: "Private college state quota seats reserved for local domicile candidates. Institutional seats (~15%) open via separate registration." },
    { state: "Madhya Pradesh (DME MP)", rule: "Private colleges are closed for non-domiciles in Round 1 & 2. Open to other states in later rounds only if seats remain vacant." }
  ]
};

export const quotaTheoryContent = {
  quotaTheoryContent: {
    title: "The theory behind medical seat quotas",
    intro:
      "A quota is not a shortcut or a separate admission process. It is the seat pool under which your NEET rank, category, domicile, fee type, and document proof are evaluated by the appropriate counselling authority.",
    points: [
      {
        icon: "hub",
        title: "Quota decides the authority",
        body: "MCC handles 15% AIQ seats and central pools such as deemed universities, AIIMS, JIPMER, ESIC and central universities. State authorities handle most 85% state quota, private, management and NRI seats.",
      },
      {
        icon: "fact_check",
        title: "Eligibility decides access",
        body: "A candidate can be NEET-qualified but still blocked from a quota if domicile, schooling, category, minority, NRI or institutional proof does not match the current bulletin.",
      },
      {
        icon: "format_list_numbered",
        title: "Allotment follows rank plus choices",
        body: "Counselling software checks your rank, category, eligibility and submitted choice order against available seats. Preference order matters because the system does not infer your budget or location priorities.",
      },
      {
        icon: "sync",
        title: "Round rules change strategy",
        body: "Vacant seats, conversion rules, resignation windows and security-deposit forfeiture rules can alter your realistic options between Round 1, Round 2, Round 3 and stray vacancy.",
      },
    ],
    note: "Use quota pages as planning guides, but verify final dates, certificates and payment rules from the latest MCC or state counselling bulletin before registration.",
  },
  aiq: {
    title: "How All India Quota works in practice",
    intro:
      "AIQ is the national merit pool for candidates who want access beyond their home state. MCC conducts four online AIQ rounds for NEET-qualified candidates, and the 15% AIQ government-college roster is domicile-free.",
    points: [
      {
        icon: "public",
        title: "Domicile-free government seats",
        body: "AIQ opens a portion of participating government medical and dental college seats to eligible candidates across India, so your home-state domicile is not the main gatekeeper.",
      },
      {
        icon: "account_balance",
        title: "Central reservation roster",
        body: "AIQ uses Government of India reservation rules: SC 15%, ST 7.5%, OBC-NCL 27% on the Central OBC list, EWS 10%, and PwD as a 5% horizontal reservation.",
      },
      {
        icon: "badge",
        title: "Central certificate discipline",
        body: "State-only OBC or EWS documents can fail for AIQ. OBC-NCL, EWS, SC, ST and PwD claims must match the format, authority and validity required by MCC.",
      },
      {
        icon: "published_with_changes",
        title: "Conversion protects vacancy",
        body: "Later rounds can convert unfilled reserved or horizontal seats according to MCC conversion logic, so the Round 3 and stray vacancy matrix can differ from early-round assumptions.",
      },
    ],
    note: "AIQ choice filling should be based on all-India rank trends, category validity and reporting readiness, not only on the opening seat matrix.",
  },
  state: {
    title: "Why State Quota is different from AIQ",
    intro:
      "State Quota is usually the strongest route for domicile candidates because most government college seats outside AIQ are reserved for residents or locally eligible candidates. The rules are not uniform across India.",
    points: [
      {
        icon: "location_on",
        title: "Domicile is locally defined",
        body: "Each state can define residence through domicile certificates, schooling clauses, parent service rules, nativity requirements or institutional eligibility conditions.",
      },
      {
        icon: "domain",
        title: "State authority controls the portal",
        body: "For ordinary state government and private colleges, registration, merit list, verification, choice filling and allotment are run by the state counselling body, not MCC.",
      },
      {
        icon: "rule_folder",
        title: "Reservation lists may change",
        body: "State OBC, SEBC, EWS, SC, ST, PwD, women, defence and local sub-quota rules can differ from central AIQ rules. Category proof should be matched to the state list.",
      },
      {
        icon: "event_note",
        title: "Timelines run independently",
        body: "State rounds may overlap with MCC rounds or begin later. Missing a state registration, verification or choice-locking window can close the route even if your rank is competitive.",
      },
    ],
    note: "For central universities with an internal or state quota, MCC may run counselling while the institution defines eligibility. Always read the institute-specific clause.",
  },
  management: {
    title: "Management Quota is still merit counselling",
    intro:
      "Management Quota seats are paid private-college seats, but they are not direct admission seats. Candidates still need NEET qualification and must follow the notified counselling authority, merit list and fee-payment process.",
    points: [
      {
        icon: "gavel",
        title: "No donation shortcut",
        body: "A legitimate management seat is allotted through counselling or an authorized institutional process. Any claim of admission without NEET or outside the notified process is a major red flag.",
      },
      {
        icon: "lock_open",
        title: "Open and closed states differ",
        body: "Some states allow non-domicile candidates into private management seats, while others restrict early rounds or specific seat types to local candidates.",
      },
      {
        icon: "payments",
        title: "Total cost is broader than tuition",
        body: "Compare tuition, hostel, mess, caution deposit, bank guarantee, university fees, bond penalties and annual escalation before ranking choices.",
      },
      {
        icon: "verified_user",
        title: "Fee regulation is state-linked",
        body: "Private college fee structures may be controlled by state fee regulatory committees. The same rank can have very different financial outcomes across states.",
      },
    ],
    note: "Treat management quota planning as a rank-plus-budget decision: shortlist a wider college band and verify full-course payable cost before allotment.",
  },
  nri: {
    title: "NRI Quota depends on proof, not only payment capacity",
    intro:
      "NRI seats exist in deemed universities and many state/private systems, but the claim is document-heavy. The sponsor relationship, NRI status and financial undertaking must survive verification.",
    points: [
      {
        icon: "passport",
        title: "NRI status must be documented",
        body: "MCC notices list proof such as valid passport, visa or residence/work permit, OCI/PIO card where applicable, and an NRI certificate from an Indian Embassy, High Commission or Consulate.",
      },
      {
        icon: "family_restroom",
        title: "Relationship chain matters",
        body: "A family tree or relationship certificate from a competent revenue authority is commonly required to prove the link between candidate and sponsor.",
      },
      {
        icon: "history_edu",
        title: "Sponsor affidavit is central",
        body: "A notarized affidavit should state that the NRI relative will sponsor the full course fee and living expenses, often supported by NRE banking proof.",
      },
      {
        icon: "travel_explore",
        title: "OCI rules need careful reading",
        body: "MCC's 2025 bulletin notes OCI cardholders are treated at par with Indian citizens for UR seats and are also eligible for NRI seats for MCC counselling purposes, subject to the current rules.",
      },
    ],
    note: "NRI document windows can be short and format-sensitive. Prepare scans and originals before choice filling, not after allotment.",
  },
  deemed: {
    title: "Deemed University quota theory",
    intro:
      "Deemed University seats are filled centrally through MCC. They are domicile-free, fee-heavy, and behave differently from government AIQ seats because community reservation is generally not applied.",
    points: [
      {
        icon: "account_balance",
        title: "100% MCC counselling",
        body: "MCC prepares the deemed university seat matrix and conducts counselling for the full deemed seat pool, including stray vacancy rounds as directed by the Supreme Court.",
      },
      {
        icon: "block",
        title: "No standard caste reservation",
        body: "MCC bulletins state there is no OBC, SC, ST, PwD or EWS reservation in deemed universities. Candidates compete as open seats unless they claim a notified NRI or minority pool.",
      },
      {
        icon: "groups",
        title: "Minority seats are institution-specific",
        body: "Some deemed institutions may have Jain or Muslim minority seats. Eligibility must be verified directly against the institution and current MCC seat matrix.",
      },
      {
        icon: "currency_rupee",
        title: "Deposit and fee risk are higher",
        body: "Deemed counselling usually has a much larger refundable security deposit than AIQ government seats, so non-reporting and resignation rules must be reviewed before locking choices.",
      },
    ],
    note: "A deemed seat can be academically strong but financially demanding. Compare fee annexures and refund clauses before preference locking.",
  },
  special: {
    title: "Special and institutional quotas are narrow claims",
    intro:
      "Special quota seats are not broad fallback options. They are tightly defined institutional or priority pools where certificate format, issuing authority and registration timing decide whether the claim is valid.",
    points: [
      {
        icon: "school",
        title: "Institutional quotas are rule-bound",
        body: "DU, AMU, JIPMER internal, IP University and similar pools can depend on specific schooling, institutional or local eligibility clauses rather than general domicile alone.",
      },
      {
        icon: "military_tech",
        title: "AFMC has post-MCC screening",
        body: "MCC registration is only part of the AFMC pathway. Final selection involves AFMC screening, aptitude or language testing, interview and medical fitness requirements.",
      },
      {
        icon: "health_and_safety",
        title: "ESIC/IP claims need priority proof",
        body: "ESIC insured-person seats usually require ward-of-IP certificates and priority-level verification. Candidates should confirm eligibility before adding the option.",
      },
      {
        icon: "sync_alt",
        title: "Unfilled special seats can convert",
        body: "If eligible candidates are unavailable, special or minority seats may be converted in later rounds according to the counselling body's rules.",
      },
    ],
    note: "For special quotas, read the exact brochure wording and upload proof during the first eligible window. Late correction is often not allowed.",
  },
  reservation: {
    title: "Reservation theory: vertical vs horizontal",
    intro:
      "Reservation is not one single list. Medical counselling combines vertical category pools with horizontal overlays, and the accepted certificate depends on whether the seat is AIQ, state, central institute or private.",
    points: [
      {
        icon: "vertical_split",
        title: "Vertical pools are primary",
        body: "UR, OBC-NCL, EWS, SC and ST seats are vertical categories. Candidates compete within their eligible category while also remaining subject to merit movement rules.",
      },
      {
        icon: "splitscreen",
        title: "Horizontal quotas cut across pools",
        body: "PwD, defence, women, freedom fighter and local priority quotas are usually applied within vertical categories rather than replacing them.",
      },
      {
        icon: "badge",
        title: "Certificate source matters",
        body: "For AIQ, OBC-NCL must follow the Central OBC list. For state quota, the state list and state certificate format may be the decisive proof.",
      },
      {
        icon: "warning",
        title: "Invalid proof can cancel joining",
        body: "If a candidate cannot produce the required caste, EWS, PwD or priority certificate at reporting, the allotted seat can be cancelled or the candidate may be treated as open category.",
      },
    ],
    note: "Use reservation benefits only when the document trail is complete, current and valid for the exact counselling authority.",
  },
  resources: {
    title: "How to use counselling resources safely",
    intro:
      "Counselling information is time-sensitive. Official portals, notices and seat matrices should be treated as the source of truth for registration, payment, allotment and reporting decisions.",
    points: [
      {
        icon: "language",
        title: "Use official portals first",
        body: "MCC and state counselling authorities publish schedules, bulletins, seat matrices and notices on their own domains. Avoid relying only on forwarded PDFs or search ads.",
      },
      {
        icon: "download",
        title: "Save every document",
        body: "Download registration forms, payment receipts, choice-locking slips, allotment letters, joining confirmations and resignation documents immediately after submission.",
      },
      {
        icon: "notifications_active",
        title: "Watch correction notices",
        body: "Seat matrices, document requirements, schedules and conversion rules can be revised during active counselling. Recheck notices before every round.",
      },
      {
        icon: "security",
        title: "Protect credentials and payment",
        body: "Only enter NEET credentials, passwords, OTPs and payment details on the verified official portal. Fake domains often appear during peak admission season.",
      },
    ],
    note: "When information conflicts, prefer the latest notice from MCC, NTA, NMC or the relevant state counselling authority.",
  },
} satisfies Record<string, QuotaTheoryContent>;
