import type { GuideJumpItem } from "@/components/features/mbbs-india/GuidePageJumpNav";

export const NEET_UG_NRI_HERO = {
  title: "NRI MBBS ",
  titleEmphasis: "Admission Guide",
  lede:
    "NEET UG 2026 reservation rules, category certificate formats, AIQ vs state quota differences, and the NRI / NRI-sponsored pathway for Deemed and private MBBS seats.",
  fine:
    "Central list certificates apply for MCC AIQ. State DME rules govern 85% quota — verify formats before counselling registration.",
  trio: [
    { key: "AIQ reservation", value: "SC · ST · OBC · EWS" },
    { key: "PwBD", value: "5% horizontal" },
    { key: "NRI fees", value: "USD / FCY" },
  ],
} as const;

export const NEET_UG_NRI_LEAD_MAGNET = {
  formTitle: "NRI counselling support",
  formSubtitle: "Name and mobile — our team reaches out for NRI quota, documents, and MCC registration.",
  submitLabel: "Request NRI guidance",
  whatsappIntro:
    "Hi Dravio, I'd like help with NEET UG 2026 NRI MBBS admission and counselling.",
} as const;

export const NEET_UG_NRI_JUMP_SECTIONS: readonly GuideJumpItem[] = [
  { id: "at-a-glance", label: "At a glance" },
  { id: "reservation", label: "Reservation" },
  { id: "certificates", label: "Certificates" },
  { id: "nri-eligibility", label: "NRI eligibility" },
  { id: "nri-documents", label: "NRI documents" },
  { id: "related", label: "Guides" },
  { id: "tools-cta", label: "Predictors" },
];

export const NEET_UG_NRI_KEY_STATS = [
  { label: "OBC-NCL (AIQ)", value: "27%\nvertical" },
  { label: "SC / ST", value: "15% / 7.5%" },
  { label: "EWS (central)", value: "10%\nAIQ" },
  { label: "PwBD", value: "5%\nhorizontal" },
] as const;

export const NEET_UG_NRI_RESERVATION_ROWS = [
  {
    category: "OBC-NCL (Other Backward Classes)",
    quota: "27%",
    type: "Vertical",
    typeColor: "emerald" as const,
    scope: "AIQ + state quota",
    note: "Central list OBC only; state lists differ",
  },
  {
    category: "Scheduled Castes (SC)",
    quota: "15%",
    type: "Vertical",
    typeColor: "emerald" as const,
    scope: "AIQ + state quota",
    note: "Certificate from competent state authority",
  },
  {
    category: "Scheduled Tribes (ST)",
    quota: "7.5%",
    type: "Vertical",
    typeColor: "emerald" as const,
    scope: "AIQ + state quota",
    note: "Certificate from competent state authority",
  },
  {
    category: "Economically Weaker Section (EWS)",
    quota: "10%",
    type: "Vertical",
    typeColor: "emerald" as const,
    scope: "AIQ (central institutions)",
    note: "Family income below ₹8 lakh; central format",
  },
  {
    category: "Persons with Benchmark Disability (PwBD)",
    quota: "5%",
    type: "Horizontal",
    typeColor: "amber" as const,
    scope: "All categories",
    note: "Minimum 40% benchmark disability",
  },
] as const;

export const NEET_UG_NRI_AIQ_RULES = [
  "SC 15%, ST 7.5%, OBC-NCL 27%, EWS 10% on AIQ seats in government colleges",
  "Only Central list OBC (not state list) is valid for AIQ OBC reservation",
  "No domicile required — open to all India for AIQ",
  "PwBD 5% horizontal reservation across vertical categories",
  "Covers AIIMS, JIPMER, central universities, and deemed universities via MCC",
] as const;

export const NEET_UG_NRI_STATE_RULES = [
  "Domicile or residence certificate usually required for state government quota",
  "State OBC lists may differ from the central list — verify with state DME",
  "EWS income limits and certificate formats can vary by state notification",
  "Some states add local reservations (NCC, sports, defence, etc.)",
  "Managed by state DME / CET Cell with separate eligibility norms",
] as const;

export const NEET_UG_NRI_CERTIFICATE_BLOCKS = [
  {
    icon: "account_balance",
    title: "EWS certificate",
    points: [
      "Issued by SDM / Tehsildar / BDO / District Magistrate",
      "Annual family income below ₹8 lakh from all sources",
      "Land / flat / plot limits per central EWS notification",
      "Valid for the financial year of issue — renew annually",
      "Used for central institutions / AIQ; state EWS rules vary",
    ],
  },
  {
    icon: "groups_2",
    title: "OBC-NCL certificate",
    points: [
      "Issued by SDM or equivalent — not Panchayat-only formats",
      "Must be on the Central Government OBC list",
      "Creamy layer: family income below ₹8 lakh",
      "Prescribed format per OM dated 14 October 2004",
      "State-only OBC certificates are not valid for MCC AIQ",
    ],
  },
  {
    icon: "accessible",
    title: "PwBD certificate",
    points: [
      "Minimum 40% benchmark disability for reservation",
      "Issued by central or state government specialist hospital",
      "Locomotor, visual, hearing, speech, intellectual disabilities covered",
      "Must also meet NEET qualifying percentile",
      "Counselling authorities may re-examine at reporting",
    ],
  },
  {
    icon: "supervised_user_circle",
    title: "SC / ST certificate",
    points: [
      "Issued by District Collector / SDM / Tehsildar of home district",
      "Central government-prescribed format for MCC verification",
      "Official seal and signature of competent revenue officer",
      "Carry originals plus self-attested copies for college reporting",
      "Verify format before MCC or state portal upload",
    ],
  },
] as const;

export const NEET_UG_NRI_ELIGIBILITY = [
  {
    icon: "flight",
    title: "Category A: NRI candidates",
    steps: [
      "Valid Indian passport and non-resident status as per Income Tax Act.",
      "Qualified NEET UG 2026 above the minimum qualifying percentile.",
      "Completed 10+2 abroad with Physics, Chemistry, Biology, and English.",
      "OCI and PIO cardholders may qualify under NRI rules per MCC / college policy.",
    ],
  },
  {
    icon: "family_restroom",
    title: "Category B: NRI-sponsored candidates",
    steps: [
      "Indian resident sponsored by a first-degree NRI relative (parents, siblings, cousins, uncles/aunts).",
      "Sponsor provides relationship affidavit, verified family tree, passport and visa copies.",
      "Sponsor undertakes fee payment in foreign currency (USD or equivalent).",
      "Sponsorship renewed and verified by the college NRI committee each year.",
    ],
  },
] as const;

export const NEET_UG_NRI_DOCUMENTS = [
  { icon: "badge", label: "Valid Indian passport (candidate)" },
  { icon: "card_membership", label: "OCI / PIO card (if applicable)" },
  { icon: "description", label: "NEET UG 2026 scorecard" },
  { icon: "school", label: "Class 10 & 12 marksheets (foreign board if applicable)" },
  { icon: "home_work", label: "NRI sponsor's passport and valid visa" },
  { icon: "gavel", label: "Relationship affidavit (notarised)" },
  { icon: "account_balance", label: "Sponsor's bank statement (USD / FCY account)" },
  { icon: "family_restroom", label: "Family tree certificate (revenue officer verified)" },
] as const;

export const NEET_UG_NRI_RELATED_LINKS = [
  {
    label: "MCC counselling guide",
    href: "/neet-ug-2026/counselling-guide",
    desc: "Rounds, fees, AIQ vs state, and document checklist.",
    icon: "menu_book",
  },
  {
    label: "NEET UG 2026 hub",
    href: "/neet-ug-2026",
    desc: "Timeline, eligibility, and cut-offs.",
    icon: "hub",
  },
  {
    label: "Application & admit card",
    href: "/neet-ug-2026/application-form",
    desc: "NTA form, admit card, and exam-day rules.",
    icon: "assignment",
  },
  {
    label: "College predictor",
    href: "/college-predictor",
    desc: "Deemed and private options from your AIR.",
    icon: "school",
  },
] as const;
