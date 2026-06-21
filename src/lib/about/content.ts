import { JOURNEY_STATE_CARDS } from "@/lib/journey-home/content";

/** Short counselling authority labels on About state cards (home uses full `auth` strings). */
const ABOUT_STATE_AUTH_LABEL: Record<
  (typeof JOURNEY_STATE_CARDS)[number]["code"],
  string
> = {
  GJ: "ACPUGMEC",
  RJ: "RUHS",
  MP: "DMAT MP",
  MH: "CET Cell",
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export const ABOUT_HERO = {
  title: "A NEET score is the ",
  titleEmphasis: "start of the journey",
  titleSuffix: " — not the end of it.",
  lede: "We help students and parents make informed MBBS admission decisions using verified data, historical trends, and clear guidance — because what happens after the exam matters just as much as the score itself.",
} as const;

/* ------------------------------------------------------------------ */
/*  At a glance                                                        */
/* ------------------------------------------------------------------ */

export const ABOUT_GLANCE_STATS = [
  { key: "Specialty", value: "MBBS", hint: "only" },
  {
    key: "States we cover",
    value: "GJ · RJ · MP · MH",
    hint: "+ MCC All India Quota counselling",
  },
  { key: "Colleges in catalog", value: "500+", hint: "government & private" },
  { key: "Cutoff years tracked", value: "2023 – 2025", hint: "verified annually" },
] as const;

/* ------------------------------------------------------------------ */
/*  Founder letter                                                     */
/* ------------------------------------------------------------------ */

export const ABOUT_LETTER = {
  eyebrow: "Why we exist",
  title: "We kept seeing the ",
  titleEmphasis: "same problem.",
  pullQuote:
    "Students with similar NEET scores were ending up with very different outcomes.",
  pullQuoteEmphasis: "The score wasn't the difference. The information was.",
  signature: "The Dravio Team",
  paragraphs: [
    "Every year, lakhs of students prepare for NEET with a single goal: securing an MBBS seat. What many families discover, only after the exam, is that getting a good score is just one part of the journey.",
    "Choice filling. Quota eligibility. State counseling rules. Domicile requirements. Management quota, NRI quota, All India Quota. Round upgrades, mop-up rounds, inter-state opportunities. Each of these can significantly influence the final admission outcome — and most families encounter all of them for the first time during the counseling process itself.",
    "As educationists and technologists, we kept noticing the same recurring pattern.",
    "Parents spend years helping their children excel academically. Then, when counseling season arrives, they're suddenly expected to make high-impact decisions based on fragmented information — scattered across multiple websites, notifications, and counseling authorities.",
    "When we began studying the admission landscape, we analyzed years of counseling data, seat matrices, cutoff trends, quota rules, and admission outcomes across states.",
    "What we found was surprising.",
    "Students with similar NEET scores were often securing very different outcomes. Some obtained government or government-quota seats with significantly lower fees. Others accepted more expensive options — simply because they were unaware of the alternative routes available to them.",
    "We also found that many students who believed an MBBS seat was out of reach still had viable pathways. Through management quota, NRI quota, or admissions in other states, options existed that they had never been told about. With the right information and planning, many of these students could pursue medical education in India — instead of looking abroad.",
    "Dravio was created to bridge that information gap.",
  ],
  mission:
    "help students and parents make informed MBBS admission decisions using verified data, historical trends, and clear guidance.",
  closingParagraphs: [
    "Today, Dravio provides information on medical colleges, cutoffs, quotas, fees, counseling processes, and admission pathways across India. We offer guidance and mentorship for All India Quota counseling, and for students participating in state counseling across Gujarat, Rajasthan, Madhya Pradesh, and Maharashtra.",
  ],
  closingEmphasis:
    "Understanding the opportunities available after the exam matters just as much.",
} as const;

/* ------------------------------------------------------------------ */
/*  Principles                                                         */
/* ------------------------------------------------------------------ */

export const ABOUT_PRINCIPLES = [
  {
    num: "01",
    title: "Verified data, not assumptions",
    body: "Every cutoff, every closing rank, every fee figure on our platform is sourced from official counseling authority publications. When data is missing or contested, we say so — rather than fill in a guess.",
  },
  {
    num: "02",
    title: "Depth over breadth",
    body: "We work on MBBS only, in four states only — and All India Quota. Not BDS. Not BAMS. Not PG. Not every state. The narrower the lane, the deeper the expertise — and depth is what changes admission outcomes.",
  },
  {
    num: "03",
    title: "Information first, decisions second",
    body: "We don't sell colleges. We don't have tie-ups that pay us to recommend specific institutions. Our role is to give you the full picture — the routes you knew about, and the ones you didn't — and let you decide what's right for your family.",
  },
  {
    num: "04",
    title: "Honest about what we don't know",
    body: "Counseling rules change. State authorities revise procedures between seasons. When something is uncertain, we'll tell you it's uncertain — not invent confidence to close a conversation.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Geography                                                          */
/* ------------------------------------------------------------------ */

export const ABOUT_GEOGRAPHY = {
  body: "We work in depth across four states — covering roughly 33,000 MBBS seats between them, about a quarter of all the seats in India. We also handle All India Quota counseling, which lets students from any state in India target seats in our four through the AIQ 15% route. We chose four instead of fourteen because there's no honest way to know fourteen counseling systems deeply.",
  stateCards: JOURNEY_STATE_CARDS.map((state) => ({
    code: state.code,
    name: state.name,
    auth: ABOUT_STATE_AUTH_LABEL[state.code],
    seats: state.seats,
    colleges: state.colleges,
    href: state.href,
  })),
} as const;

/* ------------------------------------------------------------------ */
/*  Team (placeholder — update before launch)                          */
/* ------------------------------------------------------------------ */

export type AboutTeamMember = {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  linkedInHref?: string;
};

export const ABOUT_TEAM = {
  lede: "Educationists, technologists and counselors who've worked with NEET students before Dravio existed. Real names, real faces — not an anonymous \"expert team.\"",
  footnote:
    "We're a deliberately small team. Every student who books a counseling package works directly with one of the counselors on this page — not a junior, not an outsourced agent.",
  members: [
    {
      name: "[Founder Name]",
      role: "Founder & Lead Counselor",
      credentials: "[DEGREE, UNIVERSITY] · [YEARS] WITH NEET STUDENTS",
      bio: "[Brief bio — what they've worked on across counseling seasons, what state they specialize in, one signal of credibility, and one personal note that humanizes them. Replace before launch.]",
    },
    {
      name: "[Senior Counselor Name]",
      role: "Senior MBBS Counselor",
      credentials: "[STATE SPECIALIZATION] · [YEARS] AS STATE QUOTA EXPERT",
      bio: "[Brief bio — area of state expertise, ACPUGMEC/RUHS/DMAT/CET Cell experience, students counseled, one specific credibility signal. Replace before launch.]",
    },
    {
      name: "[Counselor Name]",
      role: "MBBS Counselor & Data Lead",
      credentials: "[DEGREE, UNIVERSITY] · [YEARS] IN MEDICAL ADMISSIONS",
      bio: "[Brief bio — area of focus, AIQ/MCC expertise, what they've built or led at Dravio, one specific credibility signal. Replace before launch.]",
    },
  ] as AboutTeamMember[],
} as const;

/* ------------------------------------------------------------------ */
/*  Fit check                                                          */
/* ------------------------------------------------------------------ */

export const ABOUT_FIT_CHECK = {
  subheadline:
    "We've turned away students because we couldn't add value to their situation. We'd rather lose a sale than take money we couldn't earn.",
  goodFit: [
    "You scored between 350 and 680 in NEET 2026 and want help maximizing what your rank can secure",
    "You're targeting MBBS in Gujarat, Rajasthan, Madhya Pradesh or Maharashtra — through state quota or AIQ",
    "You want guidance through every counseling round, not just Round 1",
    "You're open to honest trade-off analysis — govt vs private, in-state vs cross-state, India vs abroad",
    "Your family wants to be part of the decision-making process",
  ],
  notFit: [
    "You're looking for guidance on BDS, BAMS, BHMS or PG admissions — we focus exclusively on MBBS",
    "You want a guaranteed seat promise — we don't make those, and we'd be skeptical of anyone who does",
    "You're specifically targeting AIIMS or AFMC — those have separate counseling tracks we don't specialize in",
    "You're looking exclusively for MBBS abroad guidance — we provide context, but don't counsel for abroad admissions",
    "Your home state is outside our four AND you're not interested in AIQ counseling",
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  Position                                                           */
/* ------------------------------------------------------------------ */

export const ABOUT_POSITION = [
  {
    label: "On seat guarantees",
    body: "We don't promise seats. Anyone who does is either misleading you or charging significantly more to absorb the risk. What we can do is exhaust every legitimate route — choice order, round timing, mop-up eligibility, upgrade analysis — to help you secure the best seat your rank can reach.",
  },
  {
    label: "On college affiliations",
    body: "Dravio is not affiliated with any private medical college. We do not receive payment from colleges for sending students their way. Our recommendations are based on what's right for the student — and if you ever feel pushed toward a specific college without a clear reason, ask us. We'll explain or correct it.",
  },
  {
    label: "On data freshness",
    body: 'Counseling rules change. State authorities revise procedures between seasons. Our cutoff database is rebuilt every year, and every data page on this site carries a "Last verified" date. When data is missing or contested, we say so. If you spot stale information, write to us — we update within 24 hours.',
  },
  {
    label: "On AI and automation",
    body: 'Our tools use data and statistical methods. They\'re not "AI counseling." A computer cannot tell you whether to upgrade or lock after Round 1 — that\'s a judgment call requiring a human who knows your specific case. Our tools assist counselors; they don\'t replace them.',
  },
  {
    label: "On your personal data",
    body: "We collect your phone number to send counseling reminders and answer your questions. We don't sell it, share it with coaching brands, or use it for unrelated marketing. Full details are in our Privacy Policy.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

import {
  getCounselWhatsAppTelHref,
  getCounselWhatsAppWaMeBase,
} from "@/lib/leads/counsel-whatsapp-config";

export const ABOUT_CONTACT = {
  officeName: "Dravio Counseling Services",
  addressLines: ["[Address line 1]", "[Address line 2]", "[City, PIN code]"],
  availabilityWeekdays: "Monday to Saturday · 9 AM – 8 PM IST",
  availabilitySunday: "Sundays — Counseling-season support only",
  channels: {
    phone: "+91 90909 09090",
    phoneHref: getCounselWhatsAppTelHref(),
    whatsapp: "+91 90909 09090",
    whatsappHref: getCounselWhatsAppWaMeBase(),
    email: "hello@dravio.in",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Compliance                                                         */
/* ------------------------------------------------------------------ */

export const ABOUT_COMPLIANCE = {
  rows: [
    {
      label: "Business entity",
      value:
        "[Legal name — e.g., Dravio Counseling Services Pvt. Ltd. / LLP / Proprietorship]",
    },
    { label: "GSTIN", value: "[Number, if applicable]" },
    { label: "Founded", value: "2024" },
    {
      label: "Data verification",
      value:
        "Information on Dravio is compiled and cross-verified against official publications from the National Medical Commission (NMC), Medical Counselling Committee (MCC), National Testing Agency (NTA), and the official portals of ACPUGMEC (Gujarat), RUHS (Rajasthan), DMAT (Madhya Pradesh) and CET Cell (Maharashtra).",
    },
    {
      label: "Disclaimer",
      value:
        "Dravio is an independent counseling and information service. We are not affiliated with NMC, MCC, NTA or any state counseling authority. We do not guarantee admission to any medical college.",
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
  title: "Start with a ",
  titleEmphasis: "conversation.",
  body: "The first call is 15 minutes, free, and comes with no obligation. We'll look at your NEET score, your category and your target states — and tell you honestly what we can and cannot do for you. If we're not the right fit, we'll tell you that too.",
  meta: "RESPONDS IN 2 HOURS · MON–SAT 9 AM – 8 PM IST",
} as const;
