import type { StateDistrictMapSlug } from "@/lib/maps/state-district-topology";

export const HOME_05_METADATA = {
  title: "Clinical-Grade 2026 NEET Counseling & Resource Hub",
  description:
    "Use India's most advanced AI-driven NEET 2026 predictor to map your path to top Government and Private colleges.",
};

export const HERO_TRUST_STATS = [
  { value: "45k+", label: "Students guided" },
  { value: "99.8%", label: "Prediction accuracy" },
  { value: "4 hubs", label: "Deep state coverage" },
] as const;

/** Hero portrait — same asset as medseat_home_05/code.html */
export const HOME_05_HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB7Z0y6ohclQXSVA_FSZ_pVbxUkZahZ5NIUG_2lX_BWogN13dHTx9CLxBMO-uF_zkBLaMuypECIYrjuh7FJ1ILh7yjGmqbmPr76MbxTfzy9pQ4g2gcq6GwITkCgu_Omuk_MS3yPGh8VJUdzbWo1viF4r9xjy27p6Q77v6qPxb23Y20ZxbpA9CcOUSXMtl7tGWkO_5L1lJ7Aws2U_qE08LYgE7c6u-ntqZbaY4GcYT3-duz3rC7zkF6qt9Ccg_SQxdbSul-q-CYKLUE";

export const STATE_HUB_CARDS: ReadonlyArray<{
  name: string;
  slug: StateDistrictMapSlug;
  subtitle: string;
  cutoff: string;
}> = [
  {
    name: "Gujarat",
    slug: "gujarat",
    subtitle: "32 Government Colleges",
    cutoff: "R1 Cut-off: 615+",
  },
  {
    name: "Maharashtra",
    slug: "maharashtra",
    subtitle: "58 Total Colleges",
    cutoff: "R1 Cut-off: 585+",
  },
  {
    name: "Rajasthan",
    slug: "rajasthan",
    subtitle: "24 Govt Colleges",
    cutoff: "R1 Cut-off: 630+",
  },
  {
    name: "MP",
    slug: "madhya-pradesh",
    subtitle: "14 Govt + 11 Pvt",
    cutoff: "R1 Cut-off: 565+",
  },
];

export const STATE_NUANCES = [
  {
    state: "Gujarat",
    items: [
      { label: "Bond", value: "1 year / ₹40L" },
      { label: "GMERS", value: "Self-financed quotas available" },
      { label: "Domicile", value: "Strict 10+2 requirement" },
    ],
  },
  {
    state: "Maharashtra",
    items: [
      { label: "Stipend", value: "High (₹65k+ in Govt)" },
      { label: "Internal", value: "50% PG Quota" },
      { label: "Private", value: "85% State Quota seats" },
    ],
  },
  {
    state: "Rajasthan",
    items: [
      { label: "Clinical", value: "Massive patient load" },
      { label: "Bond", value: "2 years (Flexible service)" },
      { label: "Management", value: "High merit cutoff" },
    ],
  },
  {
    state: "MP",
    items: [
      { label: "MMJKY", value: "Tuition free for residents" },
      { label: "Upgrade", value: "Auto-upgrade system rules" },
      { label: "Private", value: "Centralized merit list" },
    ],
  },
] as const;

export const STRATEGY_PILLARS = [
  {
    title: "PG Internal Quota",
    body: "Future-proofing your MD/MS prospects with 50% state/institutional preference.",
    icon: "school",
  },
  {
    title: "Clinical Exposure",
    body: "Quantitative assessment of bed occupancy ratio and surgery volumes.",
    icon: "local_hospital",
  },
  {
    title: "Financial Viability",
    body: "Bond liability vs. stipend earnings over 5.5 years calculated as ROI.",
    icon: "account_balance",
  },
  {
    title: "Faculty Index",
    body: "NMC compliance history and senior residency retention rates.",
    icon: "groups",
  },
] as const;

export const PREDICTOR_METRICS = [
  { label: "AIQ Round 1 Accuracy", value: "85% Match", width: "85%" },
  { label: "State Merit Rank Prediction", value: "98.2% Accuracy", width: "98%" },
] as const;

export const MILESTONES = [
  {
    period: "MAY - JUNE",
    title: "NEET Exam",
    body: "Result declaration & AIR rankings release.",
    active: true,
  },
  {
    period: "JULY WK 1",
    title: "AIQ Round 1",
    body: "MCC registration & central choice filling.",
    active: true,
  },
  {
    period: "JULY WK 3",
    title: "State Merit",
    body: "GJ, MH, RJ, MP release state-specific lists.",
    active: false,
  },
  {
    period: "AUGUST",
    title: "Round 2 & 3",
    badge: "UPGRADE WINDOW",
    active: false,
  },
  {
    period: "SEPTEMBER",
    title: "Mop-up / Stray",
    body: "Final vacant seat filling across India.",
    active: false,
  },
] as const;

export const WHITEPAPERS = [
  {
    icon: "menu_book",
    title: "The Gujarat GMERS Strategy",
    body: "A 40-page deep dive into institutional vs govt seat selection economics in Gujarat.",
    topic: "Gujarat GMERS Strategy",
  },
  {
    icon: "verified_user",
    title: "MH Private Quota Secrets",
    body: "Optimizing the 85% state quota in top-tier private colleges of Maharashtra.",
    topic: "MH Private Quota",
  },
  {
    icon: "clinical_notes",
    title: "Post-MBBS Roadmap 2030",
    body: "Analyzing NEXT exam impacts on current undergraduate college choices.",
    topic: "Post-MBBS Roadmap 2030",
  },
] as const;

export const DIY_PAIN_POINTS = [
  "Relying on outdated 2024 YouTube cut-off data.",
  "Confusing state vs national quota reservation rules.",
  "Missing document deadlines or round upgrades.",
] as const;

export const EXPERT_PATH_POINTS = [
  "Live 2026 Seat Matrix & real-time rank analyzers.",
  "Automated Bond & Fee structural breakdowns.",
  "1-on-1 advisor support for Round 3 & Mop-up strategies.",
] as const;

export const NEWS_UPDATES = [
  {
    month: "OCT",
    day: "24",
    tags: ["Gujarat", "State Quota"],
    title: "ACPC Medical releases preliminary merit list rules.",
    excerpt:
      "New eligibility criteria for NRI seats and institutional quota updated for 2026 session...",
  },
  {
    month: "OCT",
    day: "22",
    tags: ["National", "NMC Update"],
    title: "NMC adds 4,500 new MBBS seats for 2026.",
    excerpt:
      "List of 12 new Government Medical Colleges approved across MP, Rajasthan, and UP...",
  },
] as const;
