import type { GuideJumpItem } from "@/components/features/mbbs-india/GuidePageJumpNav";

export const NEET_UG_ANSWER_KEY_HERO = {
  title: "NEET UG ",
  titleEmphasis: "Answer Key",
  lede:
    "View your scanned OMR and recorded responses, understand the ₹200 response-challenge window (closes 15 July 2026, 11:00 AM), then read how scorecards and qualifying cut-offs work for NEET UG 2026.",
  fine:
    "OMR scanned images and recorded responses are live — challenge window closes 15 July 2026 (11:00 AM). Confirm every step on neet.nta.nic.in.",
  trio: [
    { key: "OMR challenge", value: "Till 15 Jul, 11 AM" },
    { key: "Challenge fee", value: "₹200 / response" },
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
  { id: "live-answer-key", label: "Answer Key" },
  { id: "download-key", label: "Download Key" },
  { id: "omr-answer-key", label: "OMR & key" },
  { id: "results", label: "Results" },
  { id: "cutoffs", label: "Cut-offs" },
  { id: "related", label: "Guides" },
  { id: "tools-cta", label: "Predictors" },
];

export const NEET_UG_ANSWER_KEY_KEY_STATS = [
  { label: "Provisional key", value: "Released\n25 June 2026" },
  { label: "OMR challenge", value: "13–15 Jul\ntill 11:00 AM" },
  { label: "Challenge fee", value: "₹200 per\nresponse" },
  { label: "Result (est.)", value: "By mid-Jul\n2026" },
] as const;

export const NEET_UG_ANSWER_KEY_OMR_STEPS = [
  "Visit neet.nta.nic.in — Log in with your application number and password, then complete 2FA with the OTP sent to your registered mobile and email.",
  "Open View/Challenge OMR Sheet & Recorded Responses — Review the high-resolution scanned OMR beside the machine-read recorded options.",
  "Flag mismatches only — Challenge a recorded option if it differs from what you marked on the physical OMR (not the answer key itself).",
  "Pay & submit by 15 July 2026, 11:00 AM — ₹200 per response via Net Banking, Debit/Credit Card, or UPI; download the acknowledgement page after payment.",
] as const;

export const NEET_UG_ANSWER_KEY_CHALLENGE_NOTE =
  "Recorded-response challenge (13–15 July 2026, till 11:00 AM): ₹200 per mismatch. Per NTA’s annexure, the fee is refunded if it is confirmed the scanning agency misread your OMR. Answer-key challenges are already closed — NTA will not entertain further key objections. Challenges are accepted only through neet.nta.nic.in after fee payment.";

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
