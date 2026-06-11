import { mbbsStatePath } from "@/lib/mbbs-state/constants";

export const JOURNEY_STATE_CARDS = [
  {
    code: "GJ",
    name: "Gujarat",
    auth: "ACPUGMEC · MEDADMGUJARAT.ORG",
    seats: "7,200+",
    colleges: "43",
    diff: "India's only 3-tier system — Govt ₹25K/yr · GMERS ₹3.75L/yr · Private. Uses SEBC, not OBC.",
    href: mbbsStatePath("gujarat"),
  },
  {
    code: "RJ",
    name: "Rajasthan",
    auth: "RUHS · RUHSRAJ.ORG",
    seats: "7,330+",
    colleges: "43",
    diff: "Highest government-college share in the group. SMS Jaipur is one of India's toughest cutoffs.",
    href: mbbsStatePath("rajasthan"),
  },
  {
    code: "MP",
    name: "Madhya Pradesh",
    auth: "DMAT · DIR. OF MEDICAL EDUCATION",
    seats: "5,725+",
    colleges: "31",
    diff: "The most AIQ-accessible state here — the smart target for non-domicile students.",
    href: mbbsStatePath("madhya-pradesh"),
  },
  {
    code: "MH",
    name: "Maharashtra",
    auth: "CET CELL MAHARASHTRA",
    seats: "12,800+",
    colleges: "80+",
    diff: "Biggest seat pool in the group — Grant Medical, KEM, Sion and BJ Government Mumbai.",
    href: mbbsStatePath("maharashtra"),
  },
] as const;

export const JOURNEY_PROBLEM_CARDS = [
  {
    icon: "portals",
    title: "4 states. 4 portals. 4 timelines.",
    body: "ACPUGMEC, RUHS, DMAT and CET Cell each have different registration windows, document rules and deadlines. Tracking them alone, students routinely miss critical steps.",
  },
  {
    icon: "order",
    title: "The order of choices decides everything.",
    body: "Most students fill colleges by name recognition, not closing-rank data. The sequence of your preference list — across all rounds — determines your final allotment.",
  },
  {
    icon: "upgrade",
    title: "Upgrades exist. Most never use them.",
    body: "Round 2, mop-up and stray vacancy rounds exist specifically to improve your seat. Students who don't know how to participate leave better colleges on the table.",
  },
  {
    icon: "quota",
    title: "Quota and category confusion.",
    body: "Gujarat uses SEBC, not OBC. Each state defines domicile differently. AIQ goes through MCC, not the state portal. Students learn these details too late.",
  },
] as const;

export const JOURNEY_CHALLENGE_BAND = {
  stat: "1 in 13.6",
  body: "In Gujarat alone, ~50,000 students qualify NEET each year competing for ~3,675 state-quota government seats. Getting the right seat is not just about rank — it's about what you do with it.",
  cta: "See how we help →",
  href: "#tools",
} as const;

export const JOURNEY_COMPARISON_ROWS = [
  {
    situation: "Understanding cutoffs",
    alone: "Searching 5+ websites, often outdated",
    withUs: "One clear analysis from 2025 official data",
  },
  {
    situation: "Choice filling strategy",
    alone: "Based on college name recognition",
    withUs: "Priority order from 3 years of round-wise data",
  },
  {
    situation: "Round 2 & mop-up",
    alone: "Often missed entirely",
    withUs: "Alerted, with a specific upgrade recommendation",
  },
  {
    situation: "Documents",
    alone: "Last-minute scramble, help-center rejections",
    withUs: "Personalized checklist 3 weeks in advance",
  },
  {
    situation: "Upgrade vs lock",
    alone: "Emotional decision, often wrong",
    withUs: "Data-driven call from an expert",
  },
  {
    situation: "Multi-state deadlines",
    alone: "Browser tabs and missed reminders",
    withUs: "WhatsApp alert before every deadline",
  },
  {
    situation: "Outcome",
    alone: "Average result for your rank",
    withUs: "Best possible seat for your rank",
  },
] as const;

export const JOURNEY_RESOURCES = [
  {
    title: "NEET UG 2026 Hub",
    body: "Exam dates, counselling timeline and official updates in one place.",
    href: "/neet-ug-2026",
  },
  {
    title: "Counselling Guide",
    body: "The step-by-step process for AIQ and state quota rounds, explained.",
    href: "/neet-ug-2026/counselling-guide",
  },
  {
    title: "MBBS in India",
    body: "State-wise seats, fees and the full admission landscape.",
    href: "/mbbs-in-india",
  },
  {
    title: "Latest Updates",
    body: "Round alerts and official notifications as they drop.",
    href: "/neet-ug-2026/updates",
  },
] as const;

export const JOURNEY_TESTIMONIALS = [
  {
    score: "Score 540",
    quote:
      '"I wasn\'t sure GMERS was even possible. They looked at my state rank, not just AIR, and told me exactly which 8 colleges to fill in which order. Got GMERS Gandhinagar in Round 1 — exactly as predicted."',
    who: "Priya M. · Ahmedabad",
    meta: "GMERS GANDHINAGAR · STATE QUOTA · GENERAL",
  },
  {
    score: "Score 612",
    quote:
      '"After Round 1 I wanted to lock my seat out of fear. They showed me the Round 2 data and convinced me to opt for upgrade. I moved from a private GQ seat to GMC — one call saved my family ₹40 lakh."',
    who: "Arjun S. · Jaipur",
    meta: "GOVT MEDICAL COLLEGE · STATE QUOTA · SEBC",
  },
  {
    score: "Score 488",
    quote:
      '"As a non-domicile student I had no idea MP was my best AIQ option. They built a parallel strategy across three states. The document checklist alone saved me — my EWS certificate would have been invalid."',
    who: "Sneha K. · Nagpur",
    meta: "GMC VIA MCC AIQ · EWS",
  },
  {
    score: "Score 575",
    quote:
      '"My parents wanted Maharashtra only. The counselor showed us the CET Cell data honestly — and the MP backup that actually got me a govt seat. No false promises at any point."',
    who: "Rohan D. · Pune",
    meta: "GMC · MCC AIQ · GENERAL",
  },
] as const;
