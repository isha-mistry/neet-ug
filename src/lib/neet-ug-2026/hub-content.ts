import type { GuideJumpItem } from "@/components/features/mbbs-india/GuidePageJumpNav";
import type { TimelineEvent } from "@/components/features/neet-ug/NeetTimeline";

export const NEET_UG_HUB_HERO = {
  title: "NEET UG 2026 — your ",
  titleEmphasis: "exam & counseling hub.",
  lede:
    "Official timeline, eligibility, exam pattern, expected cutoffs, and deep links to MCC AIQ and state counseling — kept current for the 2026–27 admission season.",
  fine:
    "Indicative dates and cutoffs follow NTA and historical trends. Always confirm on nta.ac.in and mcc.nic.in before registering or reporting.",
  trio: [
    { key: "ReNEET", value: "21 June 2026" },
    { key: "Applicants", value: "22.09 lakh" },
    { key: "MBBS seats", value: "1,29,753+" },
  ],
} as const;

export const NEET_UG_HUB_LEAD_MAGNET = {
  formTitle: "NEET 2026 information",
  formSubtitle: "Get exam dates, counselling alerts, and checklist updates from our team.",
  submitLabel: "Send me updates →",
  whatsappIntro: "Hi MedSeat, I'd like NEET UG 2026 information and counselling updates.",
} as const;

export const NEET_UG_HUB_SIDEBAR_TOOLS = [
  {
    eyebrow: "Rank predictor",
    icon: "insights",
    title: "Know your estimated All India Rank",
    description:
      "Enter your NEET score and get an indicative AIR band in seconds — built from official 2024 and 2025 score–rank data, so you can plan before NTA declares results.",
    cta: "Get my rank estimate",
    href: "/rank-predictor",
  },
  {
    eyebrow: "College predictor",
    icon: "school",
    title: "Shortlist MBBS colleges for your rank",
    description:
      "Use your official AIR to unlock Likely, Possible, and Reach college lists with historical closing ranks and fees — the same logic counselors use for choice filling.",
    cta: "Find colleges for my rank",
    href: "/college-predictor",
  },
  {
    eyebrow: "Cutoff analyser",
    icon: "query_stats",
    title: "See Safe, Borderline & Reach by state",
    description:
      "Map your score against AIQ and state-quota cutoffs in Gujarat, Rajasthan, Madhya Pradesh, and Maharashtra — and build a preference list you can act on.",
    cta: "Analyse my score now",
    href: "/cutoff-analyser",
  },
] as const;

export const NEET_UG_NTA_HELPDESK = {
  title: "NTA Official Helpdesk",
  description:
    "For technical support downloading the City Intimation slip or Admit Cards.",
  phones: ["011-40759000", "011-69227700"] as const,
  email: "neetug2026@nta.ac.in",
  portalLinks: [
    { label: "NTA NEET Portal", href: "https://neet.nta.nic.in" },
    { label: "MCC Counselling Site", href: "https://mcc.nic.in" },
  ] as const,
} as const;

export const NEET_UG_HUB_JUMP_SECTIONS: readonly GuideJumpItem[] = [
  { id: "hub-guides", label: "Guides & tools" },
  { id: "timeline", label: "Key dates" },
  { id: "eligibility", label: "Eligibility" },
  { id: "exam-pattern", label: "Exam pattern" },
  { id: "study-plan", label: "Study plan" },
  { id: "cutoffs", label: "Cutoffs" },
  { id: "next-steps", label: "Next steps" },
];

export const NEET_UG_HUB_RESOURCE_LINKS = [
  {
    label: "Rank predictor",
    href: "/rank-predictor",
    icon: "insights",
    desc: "Score → estimated AIR and state merit band.",
  },
  {
    label: "Live updates & NTA alerts",
    href: "/neet-ug-2026/updates",
    icon: "notifications_active",
    desc: "ReNEET notices, result alerts, and counseling windows.",
  },
  {
    label: "Application & admit card",
    href: "/neet-ug-2026/application-form",
    icon: "assignment",
    desc: "Registration steps, documents, and hall ticket.",
  },
  {
    label: "Answer key & results",
    href: "/neet-ug-2026/answer-key",
    icon: "fact_check",
    desc: "Provisional keys, challenges, and scorecard.",
  },
  {
    label: "MCC counselling guide",
    href: "/neet-ug-2026/counselling-guide",
    icon: "account_balance",
    desc: "AIQ rounds, choice filling, and reporting.",
  },
  {
    label: "Reservation & NRI guide",
    href: "/neet-ug-2026/nri-guide",
    icon: "public",
    desc: "Category certificates, NRI quota, and domicile.",
  },
] as const;

export const NEET_UG_HUB_TIMELINE: TimelineEvent[] = [
  {
    event: "Official notification & registration",
    date: "Feb 9, 2026",
    status: "Completed",
    description: "NTA portal opened for online registrations.",
  },
  {
    event: "Last date to apply",
    date: "Mar 16, 2026",
    status: "Completed",
    description: "Application window closed for fee submissions.",
  },
  {
    event: "Admit card release",
    date: "Apr 28, 2026",
    status: "Completed",
    description: "Download revised hall tickets from the NTA site.",
  },
  {
    event: "Original exam (cancelled)",
    date: "May 3, 2026",
    status: "Completed",
    description: "Original date cancelled by official order.",
  },
  {
    event: "ReNEET exam date",
    date: "June 21, 2026",
    status: "Upcoming",
    description: "Rescheduled pen-and-paper exam announced by NTA.",
  },
  {
    event: "Expected results",
    date: "July 2026 (est.)",
    status: "Upcoming",
    description: "Scorecards, percentiles, and All India Rank.",
  },
];

export const NEET_UG_HUB_ELIGIBILITY = [
  {
    title: "Minimum age",
    desc: "At least 17 years as on 31 December 2026. No upper age limit per current Supreme Court guidance.",
  },
  {
    title: "Qualifying exam",
    desc: "Class 12 (or equivalent) with Physics, Chemistry, Biology/Biotechnology, and English.",
  },
  {
    title: "Minimum PCB marks",
    desc: "50% aggregate in PCB for General; 40% for SC/ST/OBC; 45% for General-PwBD.",
  },
  {
    title: "Nationality",
    desc: "Indian nationals, NRIs, OCIs, PIOs, and eligible foreign nationals may appear.",
  },
] as const;

export const NEET_UG_HUB_EXAM_PATTERN = [
  { label: "Exam mode", val: "Offline (pen & paper / OMR)" },
  { label: "Duration", val: "3 hours 20 minutes" },
  { label: "Questions", val: "200 total (attempt any 180)" },
  { label: "Maximum marks", val: "720" },
  { label: "Subjects", val: "Physics, Chemistry, Botany, Zoology" },
  { label: "Marking", val: "+4 correct\n−1 incorrect" },
] as const;
