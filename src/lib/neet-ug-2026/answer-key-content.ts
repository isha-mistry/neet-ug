import type { GuideJumpItem } from "@/components/features/mbbs-india/GuidePageJumpNav";

export const NEET_UG_ANSWER_KEY_HERO = {
  title: "Answer key, OMR & ",
  titleEmphasis: "results guide.",
  lede:
    "How NTA releases the provisional answer key, view your OMR response sheet, challenge answers, read your scorecard, and interpret category-wise qualifying cut-offs for NEET UG 2026.",
  fine:
    "ReNEET on 21 June 2026 may shift answer-key and result dates. Confirm every milestone on neet.nta.nic.in.",
  trio: [
    { key: "Provisional key", value: "~7–10 days post exam" },
    { key: "Challenge fee", value: "₹200 / question" },
    { key: "Result (est.)", value: "Mid-Jul 2026" },
  ],
} as const;

export const NEET_UG_ANSWER_KEY_LEAD_MAGNET = {
  formTitle: "Answer key & result alerts",
  formSubtitle: "Name and mobile — we ping you when the provisional key, final key, or scorecard is out.",
  submitLabel: "Get result alerts",
  whatsappIntro:
    "Hi Dravio, I'd like NEET UG 2026 answer key and result alerts on WhatsApp.",
} as const;

export const NEET_UG_ANSWER_KEY_JUMP_SECTIONS: readonly GuideJumpItem[] = [
  { id: "at-a-glance", label: "At a glance" },
  { id: "omr-answer-key", label: "OMR & key" },
  { id: "results", label: "Results" },
  { id: "cutoffs", label: "Cut-offs" },
  { id: "related", label: "Guides" },
  { id: "tools-cta", label: "Predictors" },
];

export const NEET_UG_ANSWER_KEY_KEY_STATS = [
  { label: "Provisional key", value: "7–10 days\nafter exam" },
  { label: "Challenge window", value: "2–3 days\n(typical)" },
  { label: "Challenge fee", value: "₹200 per\nquestion" },
  { label: "Result (est.)", value: "By mid-Jul\n2026" },
] as const;

export const NEET_UG_ANSWER_KEY_OMR_STEPS = [
  "Visit NTA NEET portal — Go to neet.nta.nic.in and open Answer Key & OMR Response Sheet under Candidate Activity.",
  "Log in — Use your application number and date of birth (as registered) to access your OMR sheet and provisional key.",
  "Compare responses — Your darkened OMR answers appear alongside the provisional key for all questions in your paper.",
  "Challenge if needed — Pay ₹200 per question through the portal within the challenge window if you believe a key is wrong.",
] as const;

export const NEET_UG_ANSWER_KEY_CHALLENGE_NOTE =
  "Pay ₹200 per question challenged via the online portal. If the expert committee accepts your challenge, the fee is refunded and the final key is updated. Rejected challenges are non-refundable. The window is typically open for 2–3 days after the provisional key release.";

export const NEET_UG_ANSWER_KEY_SCORECARD_FIELDS = [
  {
    icon: "score",
    label: "Raw score",
    desc: "Total marks earned: +4 per correct answer, −1 per incorrect answer.",
  },
  {
    icon: "percent",
    label: "Percentile score",
    desc: "Share of candidates who scored equal to or below your marks.",
  },
  {
    icon: "leaderboard",
    label: "All India Rank (AIR)",
    desc: "Overall rank among all NEET UG 2026 candidates in India.",
  },
  {
    icon: "groups",
    label: "Category rank",
    desc: "Rank within your reserved category (SC/ST/OBC/EWS/PwD).",
  },
  {
    icon: "menu_book",
    label: "Subject-wise score",
    desc: "Marks in Physics, Chemistry, Botany, and Zoology separately.",
  },
  {
    icon: "verified",
    label: "Qualifying status",
    desc: "Whether you met the minimum qualifying percentile for counselling.",
  },
] as const;

export const NEET_UG_ANSWER_KEY_RESULT_STEPS = [
  "Visit neet.nta.nic.in and click the NEET UG 2026 Result link when NTA announces it.",
  "Enter your application number and date of birth.",
  "Review your scorecard on screen — save or print a copy.",
  "Download the scorecard PDF for MCC and state counselling registration.",
] as const;

export const NEET_UG_ANSWER_KEY_TIE_BREAKING = [
  "Higher marks in Biology (Botany + Zoology combined)",
  "Higher marks in Chemistry",
  "Higher ratio of correct to incorrect answers across all subjects",
  "Higher marks in Physics",
  "Older candidate (higher age) receives the better rank",
] as const;

export const NEET_UG_ANSWER_KEY_QUALIFYING_ROWS = [
  {
    category: "UR / EWS (General)",
    percentile: "50th percentile",
    score: "720–164",
    intensity: "High competition",
    statusColor: "rose" as const,
  },
  {
    category: "OBC-NCL",
    percentile: "40th percentile",
    score: "163–129",
    intensity: "Moderate",
    statusColor: "amber" as const,
  },
  {
    category: "SC",
    percentile: "40th percentile",
    score: "163–129",
    intensity: "Moderate",
    statusColor: "amber" as const,
  },
  {
    category: "ST",
    percentile: "40th percentile",
    score: "163–129",
    intensity: "Moderate",
    statusColor: "amber" as const,
  },
  {
    category: "UR / EWS – PwBD",
    percentile: "45th percentile",
    score: "163–146",
    intensity: "Relaxed",
    statusColor: "emerald" as const,
  },
  {
    category: "OBC / SC / ST – PwBD",
    percentile: "40th percentile",
    score: "145–129",
    intensity: "Relaxed",
    statusColor: "emerald" as const,
  },
] as const;

export const NEET_UG_ANSWER_KEY_CUTOFF_TREND_ROWS = [
  { year: "2019", general: "701–134", obc: "133–107", scSt: "133–107", pwd: "133–120" },
  { year: "2020", general: "720–147", obc: "146–113", scSt: "146–113", pwd: "146–129" },
  { year: "2021", general: "720–138", obc: "137–108", scSt: "137–108", pwd: "137–122" },
  { year: "2022", general: "715–117", obc: "116–93", scSt: "116–93", pwd: "116–105" },
  { year: "2023", general: "720–137", obc: "136–107", scSt: "136–107", pwd: "136–121" },
  { year: "2024", general: "720–164", obc: "163–129", scSt: "163–129", pwd: "163–146" },
  { year: "2025 (expected)", general: "720–160", obc: "159–128", scSt: "159–128", pwd: "159–143" },
] as const;

export const NEET_UG_ANSWER_KEY_CUTOFF_TREND_FOOTNOTE =
  "2025 and 2026 values are estimates from historical trends and NTA qualifying percentile rules. Actual cut-offs may vary.";

export const NEET_UG_ANSWER_KEY_RELATED_LINKS = [
  {
    label: "Live updates & alerts",
    href: "/neet-ug-2026/updates",
    desc: "ReNEET, results, and counselling dates.",
    icon: "notifications",
  },
  {
    label: "NEET UG 2026 hub",
    href: "/neet-ug-2026",
    desc: "Timeline, eligibility, and expected cut-offs.",
    icon: "hub",
  },
  {
    label: "Application & admit card",
    href: "/neet-ug-2026/application-form",
    desc: "Form, admit card, and exam-day rules.",
    icon: "assignment",
  },
  {
    label: "Counselling guide",
    href: "/neet-ug-2026/counselling-guide",
    desc: "MCC AIQ rounds and choice filling.",
    icon: "menu_book",
  },
] as const;
