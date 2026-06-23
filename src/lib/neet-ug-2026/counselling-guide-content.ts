import type { GuideJumpItem } from "@/components/features/mbbs-india/GuidePageJumpNav";

export const NEET_UG_COUNSELLING_HERO = {
  title: "NEET UG ",
  titleEmphasis: "Counselling Process",
  lede:
    "AIQ and Deemed University admissions decoded — registration, choice filling, round-wise exit rules, security deposits, and reporting — so you stay ahead of forfeitures and disqualification.",
  fine:
    "Rules follow the MCC information bulletin and state CET cells. Confirm dates and fees on mcc.nic.in before you pay.",
  trio: [
    { key: "MCC AIQ", value: "15% govt seats" },
    { key: "Rounds", value: "R1 · R2 · R3 · Stray" },
    { key: "State quota", value: "85% + private" },
  ],
} as const;

export const NEET_UG_COUNSELLING_LEAD_MAGNET = {
  formTitle: "Counselling alerts",
  formSubtitle: "Name and mobile — we notify you when MCC registration, seat matrix, or round dates go live.",
  submitLabel: "Get counselling alerts",
  whatsappIntro:
    "Hi Dravio, I'd like NEET UG 2026 MCC and counselling alerts on WhatsApp.",
} as const;

export const NEET_UG_COUNSELLING_JUMP_SECTIONS: readonly GuideJumpItem[] = [
  { id: "at-a-glance", label: "At a glance" },
  { id: "overview", label: "Overview" },
  { id: "process", label: "Roadmap" },
  { id: "fees", label: "Fees" },
  { id: "comparison", label: "AIQ vs state" },
  { id: "mcc-coverage", label: "MCC seats" },
  { id: "rounds", label: "Rounds" },
  { id: "seat-matrix", label: "Seat matrix" },
  { id: "documents", label: "Documents" },
  { id: "official-links", label: "Portals" },
  { id: "related", label: "Guides" },
  { id: "tools-cta", label: "Predictors" },
];

export const NEET_UG_COUNSELLING_KEY_STATS = [
  { label: "MCC rounds", value: "4 rounds\n+ stray" },
  { label: "Document pack", value: "8 core\ndocuments" },
  { label: "AIQ share", value: "15% state\ngovt seats" },
  { label: "Source", value: "MCC\nbulletin" },
] as const;

export const NEET_UG_COUNSELLING_STREAMS = [
  {
    title: "MCC central quota (15%)",
    desc: "AIQ govt seats, AIIMS, JIPMER, Deemed & central universities — open to all India.",
  },
  {
    title: "State quota (85%)",
    desc: "State government and private colleges — domicile rules apply for govt quota.",
  },
] as const;

export const NEET_UG_COUNSELLING_INTRO_PARAS = [
  "NEET UG counselling is the official process that allocates medical, dental, AYUSH, and veterinary seats based on your All India Rank (AIR). Qualifying NEET does not guarantee a seat — you must register and participate in counselling.",
  "Allotment is computerized from your rank, category reservation, and the priority order of choices you submit.",
] as const;

export const NEET_UG_COUNSELLING_COMPARISON = [
  {
    icon: "account_balance",
    title: "MCC central counselling (15% AIQ)",
    desc: "Covers AIIMS, JIPMER, Deemed universities, and 15% of seats in each state government medical college. No domicile certificate for AIQ — any state can claim seats on AIR.",
  },
  {
    icon: "map",
    title: "State quota counselling (85%)",
    desc: "Remaining 85% in state government colleges and private colleges under each state's DME/CET Cell. Valid domicile or residence proof is usually required for government quota seats.",
  },
] as const;

export const NEET_UG_COUNSELLING_MCC_COVERAGE_ROWS = [
  {
    cat: "Central universities & national institutes",
    quota: "AIQ + institutional quota",
    by: "MCC (Central)",
    inst: "DU, AMU, BHU, JMI, VMMC, ABVIMS, ESIC Dental",
  },
  {
    cat: "AIIMS & JIPMER",
    quota: "100% / open + state quota",
    by: "MCC (Central)",
    inst: "All AIIMS campuses; JIPMER Puducherry & Karaikal",
  },
  {
    cat: "Deemed universities",
    quota: "100% seats",
    by: "MCC (Central)",
    inst: "All participating Deemed medical and dental colleges",
  },
  {
    cat: "Special pools (ESIC & AFMC)",
    quota: "IP quota / registration",
    by: "MCC + institute",
    inst: "ESIC Insured Persons quota; AFMC registration on MCC",
  },
] as const;

export const NEET_UG_COUNSELLING_SEAT_SUMMARY = [
  {
    icon: "add_home_work",
    label: "Total MBBS seats",
    value: "1,08,940",
    sub: "Govt + private + deemed",
  },
  {
    icon: "medication_liquid",
    label: "BDS seats",
    value: "26,949",
    sub: "Govt + private",
  },
  {
    icon: "eco",
    label: "AYUSH seats",
    value: "52,720+",
    sub: "BAMS, BHMS, BSMS, BUMS",
  },
] as const;

export const NEET_UG_COUNSELLING_SEAT_MATRIX_ROWS = [
  {
    prog: "MBBS",
    govt: "56,943",
    private: "48,012",
    central: "3,985+",
    total: "1,08,940+",
  },
  { prog: "BDS", govt: "8,870", private: "18,079", central: "—", total: "26,949" },
  {
    prog: "BAMS (Ayurveda)",
    govt: "13,516",
    private: "26,200+",
    central: "—",
    total: "39,716+",
  },
  { prog: "BHMS (Homeopathy)", govt: "3,280", private: "9,724", central: "—", total: "13,004" },
  { prog: "BVSc & AH", govt: "3,489", private: "—", central: "—", total: "3,489" },
] as const;

export const NEET_UG_COUNSELLING_SEAT_MATRIX_FOOTNOTE =
  "Seat counts follow MCC, AACCC, and VCI data for AY 2025–26. Final 2026 matrix is published before Round 1 registration.";

export const NEET_UG_COUNSELLING_OFFICIAL_LINKS = [
  {
    icon: "link",
    title: "MCC — Medical Counselling Committee",
    desc: "Central counselling for AIQ 15%, AIIMS, JIPMER, Deemed, and central universities.",
    href: "https://mcc.nic.in",
    label: "mcc.nic.in",
    external: true,
  },
  {
    icon: "link",
    title: "AACCC — Ayush admissions",
    desc: "Centralized AYUSH allotment for BAMS, BHMS, BUMS, and BSMS under MCC.",
    href: "https://aaccc.gov.in",
    label: "aaccc.gov.in",
    external: true,
  },
  {
    icon: "link",
    title: "VCI — Veterinary Council of India",
    desc: "BVSc & AH counselling for government veterinary colleges.",
    href: "https://vci.admissions.nic.in",
    label: "vci.admissions.nic.in",
    external: true,
  },
  {
    icon: "map",
    title: "State counselling directory",
    desc: "DME / CET Cell portals for MBBS, BDS, and private college admissions.",
    href: "/state-counselling",
    label: "View state portals",
    external: false,
  },
] as const;

export const NEET_UG_COUNSELLING_RELATED_LINKS = [
  {
    label: "Live updates & alerts",
    href: "/neet-ug-2026/updates",
    desc: "MCC windows, results, and state dates.",
    icon: "notifications",
  },
  {
    label: "NEET UG 2026 hub",
    href: "/neet-ug-2026",
    desc: "Timeline, eligibility, and cut-offs.",
    icon: "hub",
  },
  {
    label: "Answer key & results",
    href: "/neet-ug-2026/answer-key",
    desc: "Scorecard, qualifying cut-offs, and rank.",
    icon: "fact_check",
  },
  {
    label: "College predictor",
    href: "/college-predictor",
    desc: "Likely, Possible & Reach from your AIR.",
    icon: "school",
  },
] as const;
