import type { GuideJumpItem } from "@/components/features/mbbs-india/GuidePageJumpNav";
import { JOURNEY_STATE_CARDS } from "@/lib/journey-home/content";

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export const ABOUT_HERO = {
  title: "We help students get the seat ",
  titleEmphasis: "their rank deserves.",
  lede: "A NEET rank, on its own, doesn't get anyone into a medical college. What gets a student in is what happens in the eight weeks between results and reporting — the choice order, the upgrade calls, the documents, the round timing. That gap is where we work.",
  fine: "MBBS-only · Gujarat · Rajasthan · Madhya Pradesh · Maharashtra + MCC All India Quota · Data verified against NTA, NMC, MCC and state authorities.",
  trio: [
    { key: "Focus", value: "MBBS only" },
    { key: "States", value: "GJ · RJ · MP · MH" },
    { key: "India", value: "All India Quota MCC" },
    { key: "Founded", value: "2026" },
  ],
} as const;

export const ABOUT_LEAD_MAGNET = {
  formTitle: "Talk to our team",
  formSubtitle:
    "Name and mobile — we'll reach out within 2 hours to understand your case.",
  submitLabel: "Get a free call",
  whatsappIntro:
    "Hi MedSeat, I'd like to learn more about your NEET UG MBBS counseling services.",
} as const;

/* ------------------------------------------------------------------ */
/*  Jump nav                                                           */
/* ------------------------------------------------------------------ */

export const ABOUT_JUMP_SECTIONS: readonly GuideJumpItem[] = [
  { id: "at-a-glance", label: "At a glance" },
  { id: "what-we-provide", label: "What we provide" },
  { id: "story", label: "Our story" },
  { id: "principles", label: "Principles" },
  { id: "geography", label: "Geography" },
  { id: "how-we-work", label: "How we work" },
  { id: "fit-check", label: "Fit check" },
  { id: "where-we-stand", label: "Where we stand" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/*  At a glance                                                        */
/* ------------------------------------------------------------------ */

export const ABOUT_GLANCE_STATS = [
  { label: "Specialty", value: "MBBS\nonly" },
  { label: "States (deep coverage)", value: "4\nGJ · RJ · MP · MH" },
  { label: "Colleges in catalog", value: "500+" },
  { label: "Cutoff years tracked", value: "2023–2025" },
  { label: "Free tools", value: "3\npredictors" },
  { label: "Counseling season", value: "Aug–Nov" },
] as const;

/* ------------------------------------------------------------------ */
/*  What we provide (the actual product)                               */
/* ------------------------------------------------------------------ */

export const ABOUT_PRODUCT = {
  eyebrow: "What we provide",
  headline: "Free tools, deep content, and human counseling.",
  description:
    "Everything on MedSeat is built around one problem: helping a NEET student get the best MBBS seat their rank can reach. The tools are free. The guides are free. The counseling is where we add personalized judgment.",
  tools: [
    {
      icon: "insights",
      title: "Rank Predictor",
      body: "Enter your NEET score, get an estimated All India Rank and state merit rank — built from official NTA score-rank data across 2024 and 2025.",
      href: "/rank-predictor",
      cta: "Try it free",
    },
    {
      icon: "query_stats",
      title: "Cutoff Analyser",
      body: "Map your score against AIQ and state-quota cutoffs in our four focus states — see Safe, Borderline and Reach colleges with historical closing ranks.",
      href: "/cutoff-analyser",
      cta: "Analyse cutoffs",
    },
    {
      icon: "school",
      title: "College Predictor",
      body: "Use your official AIR to unlock Likely, Possible and Reach college lists with historical closing ranks, fees, and quota-wise breakdowns.",
      href: "/college-predictor",
      cta: "Find colleges",
    },
  ],
  extras: [
    {
      icon: "search",
      title: "500+ college directory",
      body: "Filter by state, type, fee range. Every college has verified fees, bond rules, seat counts, and counseling pathways.",
      href: "/colleges",
    },
    {
      icon: "compare",
      title: "College comparison",
      body: "Stack colleges side-by-side on the metrics that matter — fees, cutoffs, seats, infrastructure, NIRF rank.",
      href: "/compare",
    },
    {
      icon: "menu_book",
      title: "Counseling guides & glossary",
      body: "MCC counseling guide, quota explainers, NRI admission guide, and a 120+ term glossary — all free, all current.",
      href: "/neet-ug-2026",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

export const ABOUT_STORY = {
  paragraphs: [
    "We started MedSeat after working with hundreds of NEET students across Gujarat, Rajasthan, Madhya Pradesh and Maharashtra — and noticing a pattern that wouldn't go away. Students with ranks good enough for government seats were ending up in management quota. Not because they made bad decisions, but because they made decisions on bad information.",
    "The information they needed wasn't secret. It was buried — in PDFs nobody had bothered to read, in forum threads from three years ago, in state notifications that contradicted each other. The students who got it right were the ones whose families happened to know a doctor, a senior, a counselor. The ones who didn't, lost lakhs in fees their rank should never have cost them.",
    "We built MedSeat to flatten that gap. One specialty (MBBS), four states (where we go deep instead of wide), and a small team that knows the difference between a cutoff and a closing rank. The goal isn't to be the biggest counseling brand. It's to be the one that gets the most calls right.",
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  Principles                                                         */
/* ------------------------------------------------------------------ */

export const ABOUT_PRINCIPLES = [
  {
    icon: "verified_user",
    title: "Honesty over upsell",
    body: "We tell students when they don't need us. If your rank makes a government seat near-certain in Round 1, we'll say so — even if it means a smaller package.",
  },
  {
    icon: "filter_center_focus",
    title: "Depth over breadth",
    body: "We work on MBBS only, in four states only. Not BDS, not BAMS, not PG. Not 28 states. The narrower the lane, the deeper the knowledge.",
  },
  {
    icon: "query_stats",
    title: "Data over opinion",
    body: 'Every recommendation is grounded in three years of actual closing-rank data, not in what felt right last season. When we say "safe list," we can show you why.',
  },
  {
    icon: "school",
    title: "The student is the client",
    body: "Not the parent paying us, not the college recruiting us. Every call we make has to pass one test: was it the right call for this student's future?",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Geography                                                          */
/* ------------------------------------------------------------------ */

export const ABOUT_GEOGRAPHY = {
  body: "We work in depth across Gujarat (ACPUGMEC), Rajasthan (RUHS), Madhya Pradesh (DMAT) and Maharashtra (CET Cell). These four states cover roughly 33,000 MBBS seats — about a quarter of all the seats in India. We also handle MCC All India Quota counseling, which lets students from any state target seats through the AIQ 15% route.",
  closing:
    "Each state has a counseling authority with its own portal, its own rules, its own quirks. We chose four instead of fourteen because there's no honest way to know fourteen counseling systems deeply. There's barely an honest way to know four.",
  stateCards: JOURNEY_STATE_CARDS,
} as const;

/* ------------------------------------------------------------------ */
/*  How we work                                                        */
/* ------------------------------------------------------------------ */

export const ABOUT_HOW_WE_WORK = [
  {
    title: "Counselor-to-student ratio",
    body: "Each senior counselor handles a maximum of 30 students per season. Round timing demands attention — a 60-student counselor cannot give the same Round 2 upgrade analysis in the 48 hours between allotment and reporting. We'd rather turn students away than dilute the work.",
  },
  {
    title: "Always year-current data",
    body: "Our cutoff database is rebuilt every season from official ACPUGMEC, RUHS, DMAT, CET Cell and MCC allotment publications. Not scraped from third-party sites. Every closing rank is sourced and dated. When data is missing, we say so.",
  },
  {
    title: "Available when it matters",
    body: "Counseling season is August through November — our counselors are on call seven days a week. Outside the season, we're available Monday through Saturday for planning, mock counseling and document prep.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Fit check                                                          */
/* ------------------------------------------------------------------ */

export const ABOUT_FIT_CHECK = {
  subheadline:
    "We've turned away students because we couldn't add value. We'd rather lose a sale than take money we couldn't earn.",
  goodFit: [
    "You scored between 350 and 680 in NEET 2026 and want to maximize what your rank can get you",
    "You're targeting MBBS in Gujarat, Rajasthan, MP or Maharashtra — through state quota or AIQ",
    "You want guidance through all counseling rounds, not just Round 1",
    "You're open to honest assessment of trade-offs (govt vs private vs abroad)",
    "Your family is involved in the decision — we work well with parents in the room",
  ],
  notFit: [
    "You're targeting AIIMS or AFMC specifically — those have separate counseling tracks we don't specialize in",
    "You want a counselor for BDS, BAMS, BHMS or PG admissions — we only do MBBS",
    "You're looking for guaranteed seat promises — we don't make those, and anyone who does is not telling the truth",
    "You're looking exclusively for MBBS abroad — we provide context but don't counsel abroad admissions",
    "Your home state is outside our four and you don't want AIQ counseling — we can't add value here",
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  Manifesto                                                          */
/* ------------------------------------------------------------------ */

export const ABOUT_MANIFESTO = [
  {
    title: "On seat guarantees",
    body: "We don't promise seats. What we promise is that we'll exhaust every legitimate route — choice order, round timing, mop-up eligibility, upgrade analysis — to get you the best seat your rank can reach.",
  },
  {
    title: "On affiliations",
    body: "We have no tie-up with any private medical college. Our recommendations are based on what's right for the student. If you ever feel pushed toward a college without a clear reason, ask us.",
  },
  {
    title: "On data freshness",
    body: 'Counseling data changes yearly. Our cutoff database is rebuilt every season, and every page showing data has a "Last verified" date. Spot stale info? Write to us — we fix it within 24 hours.',
  },
  {
    title: "On AI and automation",
    body: "Our tools use data and statistical methods, not \"AI counseling.\" A computer cannot tell you whether to upgrade or lock after Round 1 — that's a judgment call that needs a human. Tools assist counselors; they don't replace them.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Team (placeholder — update before launch)                          */
/* ------------------------------------------------------------------ */

export type AboutTeamMember = {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  linkedInHref?: string;
  photoReady: boolean;
  photoSrc?: string;
};

export const ABOUT_TEAM = {
  footnote:
    "We're a deliberately small team. Every student who books an Expert or Premium package works directly with one of the counselors on this page — not a junior, not an outsourced agent, not a chatbot.",
  members: [
    {
      name: "[Founder full name]",
      role: "Founder & lead counselor",
      credentials:
        "[Degree, university] · [X] years NEET counseling · [N] seasons",
      bio: "Has worked with [number] NEET students across Gujarat, Rajasthan, MP and Maharashtra. [One specific accomplishment.] [One personal note.]",
      photoReady: false,
    },
    {
      name: "[Senior counselor name]",
      role: "Senior MBBS counselor",
      credentials: "[Degree] · [X] years · [N] seasons",
      bio: "[State specialization, AIQ vs state quota expertise, humanizing detail.]",
      photoReady: false,
    },
  ] as AboutTeamMember[],
} as const;

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

export const ABOUT_CONTACT = {
  officeName: "MedSeat Counseling Services",
  addressLines: ["[Address line 1]", "[Address line 2]", "[City, PIN code]"],
  availability: "Mon–Sat 9 AM – 8 PM IST · Sundays during counseling season",
  channels: {
    phone: "+91 90909 09090",
    whatsapp: "+91 90909 09090",
    email: "hello@medseat.in",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Compliance (bottom band)                                           */
/* ------------------------------------------------------------------ */

export const ABOUT_COMPLIANCE = {
  rows: [
    { label: "Entity", value: "[Legal name — update before launch]" },
    { label: "Founded", value: "2024" },
    {
      label: "Data sources",
      value:
        "NMC, MCC, NTA, ACPUGMEC (Gujarat), RUHS (Rajasthan), DMAT (Madhya Pradesh) and CET Cell (Maharashtra).",
    },
    {
      label: "Disclaimer",
      value:
        "MedSeat is an independent counseling service. Not affiliated with NMC, MCC, NTA or any state counseling authority. We do not guarantee admission.",
    },
  ],
  policyLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
/* ------------------------------------------------------------------ */

export const ABOUT_FINAL_CTA = {
  headline: "Ready when you are.",
  body: "The first call is 15 minutes, free, with no obligation to book a package. We'll look at your NEET score, your category, your target states — and tell you honestly what we can and cannot do for you.",
  meta: "Responds within 2 hours · Mon–Sat 9 AM – 8 PM IST",
} as const;
