import { mbbsStatePath } from "@/lib/mbbs-state/constants";
import type { StateDistrictMapSlug } from "@/lib/maps/state-district-topology";

export type JourneyStateCardItem = {
  code: string;
  slug: StateDistrictMapSlug;
  name: string;
  auth: string;
  seats: string;
  colleges: string;
  diff: string;
  href: string;
  ctaLabel: string;
};

export const JOURNEY_STATE_CARDS: ReadonlyArray<JourneyStateCardItem> = [
  {
    code: "GJ",
    slug: "gujarat",
    name: "Gujarat",
    auth: "ACPUGMEC · MEDADMGUJARAT.ORG",
    seats: "7,500+",
    colleges: "43",
    diff: "India's only 3-tier system — Govt ₹25K/yr · GMERS ₹3.75L/yr · Private. Uses SEBC, not OBC.",
    href: mbbsStatePath("gujarat"),
    ctaLabel: "Explore Gujarat MBBS options →",
  },
  {
    code: "RJ",
    slug: "rajasthan",
    name: "Rajasthan",
    auth: "RUHS · RUHSRAJ.ORG",
    seats: "7,300+",
    colleges: "49",
    diff: "Highest government-college share in the group. SMS Jaipur is one of India's toughest cutoffs.",
    href: mbbsStatePath("rajasthan"),
    ctaLabel: "Explore Rajasthan MBBS options →",
  },
  {
    code: "MP",
    slug: "madhya-pradesh",
    name: "Madhya Pradesh",
    auth: "DMAT · DIR. OF MEDICAL EDUCATION",
    seats: "5,700+",
    colleges: "35",
    diff: "The most AIQ-accessible state here — the smart target for non-domicile students.",
    href: mbbsStatePath("madhya-pradesh"),
    ctaLabel: "Explore MP MBBS options →",
  },
  {
    code: "MH",
    slug: "maharashtra",
    name: "Maharashtra",
    auth: "CET CELL MAHARASHTRA",
    seats: "12,800+",
    colleges: "85",
    diff: "Biggest seat pool in the group — Grant Medical, KEM, Sion and BJ Government Mumbai.",
    href: mbbsStatePath("maharashtra"),
    ctaLabel: "Explore Maharashtra MBBS options →",
  },
];

export type JourneyAiqCardItem = {
  code: string;
  name: string;
  auth: string;
  seats: string;
  colleges: string;
  diff: string;
  href: string;
  ctaLabel: string;
};

/** MCC All India Quota — fifth hub card alongside the four state guides. */
export const JOURNEY_AIQ_CARD: JourneyAiqCardItem = {
  code: "AIQ",
  name: "All India Quota",
  auth: "MCC.NIC.IN",
  seats: "10,500+",
  colleges: "500+",
  diff: "15% of seats in participating colleges — counseled by MCC, open to eligible candidates from any state. Separate rounds from state quota.",
  href: "/neet-ug-2026/counselling-guide",
  ctaLabel: "Understand my AIQ options →",
};

export const JOURNEY_STATES_SECTION = {
  eyebrow: "Step 02 · State & national routes",
  title: "Four States. All India Quota — ",
  titleEmphasis: "One Platform.",
  lede: "MBBS only — every cutoff, quota rule and counseling authority across Gujarat, Rajasthan, Madhya Pradesh and Maharashtra, plus MCC All India Quota (AIQ) counseling.",
  quotaOverviewHref: "/quota",
  quotaOverviewLead:
    "Not sure whether AIQ, state quota, management quota, or NRI quota applies to you?",
  quotaOverviewLinkLabel: "View quota overview →",
} as const;

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
  stat: "50%",
  body: "In Gujarat alone, roughly half of aspirants qualify NEET each year, competing for 7,500+ state quota seats across 43 colleges. Getting the right seat is not just about rank — it's about what you do with it.",
  cta: "Review my counselling plan →",
} as const;

export const JOURNEY_CHALLENGE_COUNSELLING_CTA = {
  modalIntroLine:
    "Hi Dravio, I want to review my MBBS counselling plan from the home page challenge section.",
  modalLede:
    "Share your score, category, and domicile state — we'll save your details and open WhatsApp to connect with our team.",
  pageLabel: "Journey home — challenge band — counselling plan review",
  pageSection: "challenge-band",
  leadVariant: "challenge_counselling",
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

export const JOURNEY_COMPARISON_CTA = {
  copy: "If you already have a score, category, and target states, we can review your options before choice filling starts.",
  buttonLabel: "Get my options reviewed",
  redirectTo: "/counselling",
  introLine:
    "Hi Dravio, I'd like my MBBS options reviewed before choice filling (from home page — Step 07).",
  modalLede:
    "Share your details and we'll follow up on WhatsApp to review your score, category, and target states.",
} as const;

export const JOURNEY_PLAYBOOK_AFTER_SUBMIT = {
  heading: "The playbook is on its way to your WhatsApp.",
  subheading: "Want us to review your score, category, and state options?",
  ctaLabel: "Book free counselling call",
  whatsappMessage:
    "Hi Dravio, I downloaded the NEET 2026 Counselling Playbook and want help reviewing my MBBS admission options.",
  modalIntroLine:
    "Hi Dravio, I downloaded the NEET 2026 Counselling Playbook and want a free counselling review.",
  modalLede:
    "Share your score, category, and domicile state — we'll save your details and open WhatsApp to connect with our team.",
  pageLabel: "Journey home — playbook section — free counselling call",
  pageSection: "playbook",
  leadVariant: "playbook_counselling",
} as const;

export const JOURNEY_FINAL_COUNSELLING_CTA = {
  buttonLabel: "Book free counseling call",
  modalIntroLine:
    "Hi Dravio, I want a free MBBS counselling review from the home page final CTA.",
  modalLede:
    "Share your score, category, and domicile state — we'll save your details and open WhatsApp to connect with our team.",
  pageLabel: "Journey home — final CTA section — free counselling call",
  pageSection: "final-cta",
  leadVariant: "final_cta_counselling",
} as const;

export const JOURNEY_COUNSELING_MISTAKES = {
  eyebrow: "Step 08 · What happens if you do nothing",
  title: "Common ",
  titleEmphasis: "counseling mistakes",
  lede: "Small oversights in round timing, quota choice, and paperwork compound — and strong ranks still lose seats.",
  items: [
    "Miss Round 2",
    "Ignore AIQ",
    "Wrong choice order",
    "Miss document deadline",
    "Apply only in home state",
    "Take management quota too early",
  ],
  closingBefore: "These mistakes cost students",
  closingEmphasis: "seats every year.",
} as const;

export const JOURNEY_PACKAGE_CTAS = {
  redirectTo: "/counselling",
  essentials: {
    buttonLabel: "Get Essentials",
    introLine: "Hi Dravio, I'm interested in the Essentials plan (home page).",
    modalLede:
      "Share your details for tool access — we'll follow up on WhatsApp with next steps.",
  },
  expert: {
    buttonLabel: "Book Expert counselling",
    introLine: "Hi Dravio, I'd like to book Expert counselling (home page).",
    modalLede:
      "Tell us about the student and target states — we'll confirm your Expert counselling slot on WhatsApp.",
  },
  premium: {
    buttonLabel: "Discuss Premium support",
    introLine: "Hi Dravio, I'd like to discuss Premium support (home page).",
    modalLede:
      "Brief enquiry for complex cases — we'll follow up on WhatsApp about quota and target states.",
  },
} as const;

export const JOURNEY_RESOURCES = [
  {
    title: "NEET UG 2026 Hub",
    body: "Exam dates, counselling timeline and official updates in one place.",
    href: "/neet-ug-2026",
    cta: "Explore NEET UG 2026 timeline",
  },
  {
    title: "Counselling Guide",
    body: "The step-by-step process for AIQ and state quota rounds, explained.",
    href: "/neet-ug-2026/counselling-guide",
    cta: "Understand counselling steps",
  },
  {
    title: "MBBS in India",
    body: "State-wise seats, fees and the full admission landscape.",
    href: "/mbbs-in-india",
    cta: "Compare state-wise MBBS options",
  },
  {
    title: "Latest Updates",
    body: "Round alerts and official notifications as they drop.",
    href: "/neet-ug-2026/updates",
    cta: "Track latest counselling updates",
  },
] as const;

export type JourneyTestimonial =
  | {
      kind: "text";
      score: string;
      quote: string;
      who: string;
      meta: string;
      avatar: string;
    }
  | {
      kind: "video";
      score: string;
      quote?: string;
      who: string;
      meta: string;
      video: string;
      avatar?: string;
    };

export const JOURNEY_TESTIMONIALS: readonly JourneyTestimonial[] = [
  {
    kind: "video",
    score: "Video",
    who: "Dr. Parth Shah",
    meta: "Government Medical College, Bhavnagar",
    video: "/testimonials/Dr. Parth Shah.mp4",
  },
  {
    kind: "video",
    score: "Video",
    who: "Dr. Abhishek Malaviya",
    meta: "Narendra Modi Medical College, Ahmedabad",
    video: "/testimonials/Dr. Abhishek Malaviya.mp4",
  },
  {
    kind: "text",
    score: "Score 540",
    quote:
      '"I wasn\'t sure GMERS was even possible. They looked at my state rank, not just AIR, and told me exactly which 8 colleges to fill in which order. Got GMERS Gandhinagar in Round 1 — exactly as predicted."',
    who: "Priya M. · Ahmedabad",
    meta: "GMERS GANDHINAGAR · STATE QUOTA · GENERAL",
    avatar: "/testimonials/priya.png",
  },
  {
    kind: "text",
    score: "Score 612",
    quote:
      '"After Round 1 I wanted to lock my seat out of fear. They showed me the Round 2 data and convinced me to opt for upgrade. I moved from a private GQ seat to GMC — one call saved my family ₹40 lakh."',
    who: "Arjun S. · Jaipur",
    meta: "GOVT MEDICAL COLLEGE · STATE QUOTA · SEBC",
    avatar: "/testimonials/arjun.png",
  },
  {
    kind: "text",
    score: "Score 488",
    quote:
      '"As a non-domicile student I had no idea MP was my best AIQ option. They built a parallel strategy across three states. The document checklist alone saved me — my EWS certificate would have been invalid."',
    who: "Sneha K. · Nagpur",
    meta: "GMC VIA MCC AIQ · EWS",
    avatar: "/testimonials/sneha.png",
  },
];
