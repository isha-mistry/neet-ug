export const COUNSELLING_HERO = {
  title: "MBBS counselling for ",
  titleEmphasis: "NEET families.",
  lede: "Plan your college list, quota route, documents, and rounds with clear counselling support.",
  ledeSub:
    "Guidance for Gujarat, Rajasthan, Madhya Pradesh, Maharashtra, and All India Quota MCC.",
};

export const COUNSELLING_INTRO = {
  eyebrow: "Why counselling",
  title: "Use your NEET score ",
  titleEmphasis: "better.",
  lede: "Your score is only the starting point. The real decision happens during counselling.",
  paragraphs: [
    "The score gets you eligibility. The counselling round-by-round decisions get you the seat. Most families encounter all of this — quotas, rules, deadlines, choice order — for the first time, with very little time to learn.",
    "That's the gap we work in. We don't replace the official counselling portal. We help you walk into it knowing what you're doing.",
  ],
  checklistLabel: "What you need to know",
  checklist: [
    "Which colleges are realistic for your score",
    "Which quotas apply to your case",
    "Which states are worth considering",
    "How to order your choice list",
    "When to upgrade or lock a seat",
    "Which documents to keep ready",
  ],
};

export type CounsellingDecisionIcon =
  | "college"
  | "quota"
  | "choices"
  | "rounds"
  | "documents"
  | "upgrade";

export const COUNSELLING_DECISIONS = {
  eyebrow: "What we help with",
  title: "Six decisions you'll make in ",
  titleEmphasis: "eight weeks.",
  lede: "Every counselling season comes down to the same set of calls. We help you make each one with information, not guesswork.",
  items: [
    {
      icon: "college" as CounsellingDecisionIcon,
      title: "College options",
      body: "Know your safe, borderline, and reach colleges.",
    },
    {
      icon: "quota" as CounsellingDecisionIcon,
      title: "Quota route",
      body: "Understand AIQ, state quota, management quota, deemed university, and NRI quota options.",
    },
    {
      icon: "choices" as CounsellingDecisionIcon,
      title: "Choice filling",
      body: "Build a clear preference order before the deadline.",
    },
    {
      icon: "rounds" as CounsellingDecisionIcon,
      title: "Round strategy",
      body: "Plan for Round 1, Round 2, mop-up, and stray vacancy.",
    },
    {
      icon: "documents" as CounsellingDecisionIcon,
      title: "Documents",
      body: "Prepare the right documents for your category, domicile, and quota.",
    },
    {
      icon: "upgrade" as CounsellingDecisionIcon,
      title: "Upgrade decision",
      body: "Know when to hold, upgrade, or continue.",
    },
  ],
};

export const COUNSELLING_MISTAKES = {
  eyebrow: "Common mistakes",
  title: "Small mistakes ",
  titleEmphasis: "change outcomes.",
  body: "Most students who end up in management quota or no seat at all didn't make one big mistake. They made several small ones, in sequence, under time pressure. These are the ones we see most often.",
  cardLabel: "Counselling mistakes we see every season",
  items: [
    "Applying only in one state",
    "Ignoring AIQ options",
    "Filling choices by college name alone",
    "Taking management quota too early",
    "Missing Round 2 or mop-up",
    "Using the wrong category assumption",
    "Preparing documents late",
    "Missing portal deadlines",
  ],
};

export const COUNSELLING_INCLUDED = {
  eyebrow: "What's included",
  title: "Counselling, end-to-end. ",
  titleEmphasis: "Not just advice.",
  lede: "Every plan includes the building blocks below. The depth of each — number of sessions, states covered, round-wise support — varies by plan.",
  items: [
    {
      num: "01",
      title: "Score review",
      body: "Understand where your score stands against current trends.",
    },
    {
      num: "02",
      title: "Rank & cutoff analysis",
      body: "Compare your score with three years of cutoff movement data.",
    },
    {
      num: "03",
      title: "College shortlist",
      body: "A practical list of colleges to consider — safe, borderline and reach.",
    },
    {
      num: "04",
      title: "Quota review",
      body: "Know which admission routes realistically fit your case.",
    },
    {
      num: "05",
      title: "Choice list support",
      body: "Build a better choice order before the official window opens.",
    },
    {
      num: "06",
      title: "Round-wise guidance",
      body: "Support through Round 1, Round 2, mop-up and stray vacancy.",
    },
    {
      num: "07",
      title: "Document checklist",
      body: "Know exactly what to prepare for verification — by category and quota.",
    },
    {
      num: "08",
      title: "Deadline reminders",
      body: "Stay aware of every counselling date that matters to your case.",
    },
  ],
};

export const COUNSELLING_STEPS = {
  eyebrow: "How it works",
  title: "Five steps. ",
  titleEmphasis: "Score to seat.",
  items: [
    {
      n: 1,
      key: "Step 01",
      title: "You share your case",
      paragraphs: [
        "Score, category, domicile, target states, budget, and quota interest. We understand where you stand first — before suggesting anything.",
      ],
    },
    {
      n: 2,
      key: "Step 02",
      title: "We map your possible routes",
      paragraphs: [
        "AIQ, state quota, management quota, deemed university, or NRI quota. You see which routes are realistic for your case, and which aren't.",
      ],
    },
    {
      n: 3,
      key: "Step 03",
      title: "We prepare your college strategy",
      paragraphs: [
        "We shortlist safe, borderline and reach colleges. We also explain which colleges to prioritize and why — using actual closing-rank data, not opinions.",
      ],
    },
    {
      n: 4,
      key: "Step 04",
      title: "We build your choice list with you",
      paragraphs: [
        "You get a clear choice order before filling starts. We guide you on what to add, what to avoid, and how to sequence your list.",
        "Final submission happens through the official counselling portal — with you or your family in the driver's seat.",
      ],
    },
    {
      n: 5,
      key: "Step 05",
      title: "We review every round decision",
      paragraphs: [
        "After each allotment, we help you decide the next step: lock, upgrade, continue, or change strategy for the next round.",
      ],
    },
  ],
};

export type PlanListItem =
  | { type: "head"; text: string }
  | { type: "item"; text: string };

export const COUNSELLING_PLANS = {
  eyebrow: "Choose your plan",
  title: "Counselling plans, ",
  titleEmphasis: "by depth of support.",
  lede: "Pick the level of guidance that matches your case. You can also upgrade later if your situation changes.",
  plans: [
    {
      id: "essentials",
      name: "Essentials",
      tag: "For confident students who want every tool unlocked and the data to decide themselves.",
      price: "4,999",
      per: null as string | null,
      popular: false,
      cta: "Get Essentials",
      ctaVariant: "line" as const,
      features: [
        { type: "item", text: "College Predictor plus exportable choice list" },
        {
          type: "item",
          text: "One detailed one-hour session on the admission procedure",
        },
        {
          type: "item",
          text: "New notification alerts from all 4 state counsellings & MCC via SMS and WhatsApp",
        },
        {
          type: "item",
          text: "Personalized document checklist by category & quota",
        },
        {
          type: "item",
          text: "Personalized choice-filling list for All India Quota Round 1",
        },
      ] satisfies PlanListItem[],
    },
    {
      id: "expert",
      name: "Expert",
      tag: "End-to-end support through every round, with a counselor who knows your case.",
      price: "49,999",
      per: null,
      popular: true,
      cta: "Book Expert counselling",
      ctaVariant: "blue" as const,
      features: [
        { type: "head", text: "Everything in Essentials +" },
        {
          type: "item",
          text: "1-on-1 session with an MBBS expert after each round (60 min)",
        },
        {
          type: "item",
          text: "Choice list for one state + All India Quota, every round",
        },
        { type: "item", text: "Strategy note before each round" },
        { type: "item", text: "Upgrade-or-lock call after each allotment" },
        { type: "item", text: "Priority WhatsApp support until December 2026" },
        { type: "item", text: "Written domicile and quota eligibility report" },
      ] satisfies PlanListItem[],
    },
    {
      id: "premium",
      name: "Premium",
      tag: "Maximum attention, multi-state strategy, Management and NRI quota guidance for the family.",
      price: "2,99,999",
      per: "/ admission season",
      popular: false,
      cta: "Discuss Premium support",
      ctaVariant: "line" as const,
      features: [
        { type: "head", text: "Everything in Expert +" },
        { type: "item", text: "Unlimited counselor calls across all rounds" },
        { type: "item", text: "Separate parent briefing and strategy" },
        { type: "item", text: "Management Quota eligibility & documentation" },
        { type: "item", text: "NRI quota eligibility and documentation" },
        {
          type: "item",
          text: "Parallel strategy across all 4 states + open states",
        },
        { type: "item", text: "One custom request report" },
        { type: "item", text: "Post-admission online support" },
      ] satisfies PlanListItem[],
    },
  ],
};

export const COUNSELLING_PRO_BONO_EMAIL = "info@lampros.tech" as const;

export const COUNSELLING_FIT_ROWS = [
  {
    situation: "I want tools and data to plan myself",
    badges: [{ label: "Essentials", free: false }],
  },
  {
    situation: "I want help with choice filling",
    badges: [{ label: "Expert", free: false }],
  },
  {
    situation: "I want round-wise support throughout the season",
    badges: [{ label: "Expert", free: false }],
  },
  {
    situation: "I'm applying across multiple states",
    badges: [
      { label: "Expert", free: false },
      { label: "Premium", free: false },
    ],
  },
  {
    situation: "I need NRI quota guidance",
    badges: [{ label: "Premium", free: false }],
  },
  {
    situation: "I'm considering deemed or management quota",
    badges: [{ label: "Premium", free: false }],
  },
  {
    situation: "I'm unsure where I stand",
    badges: [{ label: "Free 15-min call", free: true }],
  },
] as const;

export type CounsellingWhyIcon =
  | "focus"
  | "data"
  | "states"
  | "practical"
  | "honest";

export const COUNSELLING_WHY = {
  eyebrow: "Why Dravio",
  title: "Why families ",
  titleEmphasis: "choose us.",
  lede: "Built for MBBS counselling specifically — not a general edtech platform with a counselling tab bolted on.",
  items: [
    {
      icon: "focus" as CounsellingWhyIcon,
      title: "MBBS-focused",
      body: "Built only for NEET UG MBBS admission planning. No BDS, no PG, no distractions.",
    },
    {
      icon: "data" as CounsellingWhyIcon,
      title: "Data-backed",
      body: "Based on cutoffs, seats, fees, quotas and round-over-round seat movement.",
    },
    {
      icon: "states" as CounsellingWhyIcon,
      title: "State + AIQ coverage",
      body: "Support for Gujarat, Rajasthan, Madhya Pradesh, Maharashtra, and All India Quota MCC.",
    },
    {
      icon: "practical" as CounsellingWhyIcon,
      title: "Practical guidance",
      body: "Clear answers for colleges, quotas, documents, rounds, and the next step.",
    },
    {
      icon: "honest" as CounsellingWhyIcon,
      title: "No false guarantees",
      body: "We help you plan better. Final allotment happens through official counselling portals.",
    },
  ],
};

export const COUNSELLING_CHECKLIST = {
  eyebrow: "Before your call",
  title: "Keep these ready ",
  titleEmphasis: "before the call.",
  body: "Sharing this upfront lets us spend the call on strategy, not on collecting information. Anything missing is fine — bring what you have.",
  items: [
    "NEET score or expected score",
    "Category",
    "Domicile state",
    "Target states",
    "Budget range",
    "Preferred college type",
    "Quota interest",
    "Current counselling stage",
  ],
};

export const COUNSELLING_FAQ = [
  {
    question: "Is the free counselling call really free?",
    answerParagraphs: [
      "Yes. The first call is free.",
      "It helps you understand your current position and next step.",
    ],
  },
  {
    question: "Do you guarantee admission?",
    answerParagraphs: [
      "No.",
      "Admission depends on official rules, seat availability, cutoff movement, documents, and candidate choices.",
    ],
  },
  {
    question: "Will you fill the official counselling form?",
    answerParagraphs: [
      "We help with strategy, documents, and choice planning.",
      "Final submission should be done along with the student or family on the official portal.",
    ],
  },
  {
    question: "Do you support AIQ and state counselling?",
    answerParagraphs: ["Yes.", "We support MCC AIQ and state counselling routes."],
  },
  {
    question: "Do you help with management quota, deemed universities, and NRI quota?",
    answerParagraphs: [
      "Yes.",
      "These are covered where relevant, mainly in the Premium plan.",
    ],
  },
  {
    question: "Can I upgrade from Essentials to Expert?",
    answerParagraphs: [
      "Yes.",
      "You can start with Essentials and upgrade later if you need guided support.",
    ],
  },
  {
    question: "What happens after I buy Expert counselling?",
    answerParagraphs: [
      "You share your details, attend a counselling session, receive your route, and get round-wise support.",
    ],
  },
  {
    question: "What happens after I buy Premium counselling?",
    answerParagraphs: [
      "You get deeper support for complex cases, including multi-state planning, NRI quota review, deemed options, and family briefings.",
    ],
  },
  {
    question: "Which plan is best for most families?",
    answerParagraphs: [
      "Expert is usually the best fit for families who want guided counselling and round-wise support.",
    ],
  },
  {
    question: "When should I book counselling?",
    answerParagraphs: [
      "Before choice filling starts.",
      "Early planning gives you more time to review score, documents, quotas, and target states.",
    ],
  },
] as const;

export const COUNSELLING_BANNER = {
  eyebrow: "Free first step",
  title: "Start with a free ",
  titleEmphasis: "15-minute call.",
  bodyParagraphs: [
    "Still unsure?",
    "Book a free review first.",
    "We will look at your score, category, domicile, target states, and likely admission route.",
    "Then you can decide which plan fits your case.",
  ],
};

export const COUNSELLING_FINAL = {
  title: "Ready to review your ",
  titleEmphasis: "MBBS options?",
  body: "Start with a free 15-minute call. We'll review your score, category, domicile and target states — and tell you honestly what's possible.",
  meta: "RESPONDS IN 2 HOURS · MON–SAT 9 AM – 8 PM IST",
};
