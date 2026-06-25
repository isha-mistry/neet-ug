export const RANK_PREDICTOR_HERO = {
  title: "ReNEET ",
  titleEmphasis: "Rank Predictor 2026",
  lede:
    "Enter your NEET 2026 score and get an instant estimated All-India Rank band — built from the last two years of official NTA score–rank data. The real rank comes from NTA on results day. This tells you what to expect, and what to do about it.",
  fine:
    "Indicative only — not affiliated with NTA or MCC. Estimates use NEET 2024 & 2025 score–rank trends. College previews use historical closing ranks where available.",
  trio: [
    { key: "Instant", value: "AIR band in 2 sec" },
    { key: "On verify", value: "State rank + 15 colleges" },
    { key: "Next step", value: "Compare & plan" },
  ],
  formTitle: "Your NEET details",
  formSubtitle: "Three inputs. Two seconds. One honest estimate.",
  submitLabel: "See my estimate →",
} as const;

export const RANK_PREDICTOR_STRIP = {
  bold: "Official rank already published?",
  text: "Skip the estimate — take your NTA rank straight to the College Predictor for counselling-style lists.",
  cta: "College Predictor →",
} as const;

export const RANK_PREDICTOR_FAQ: { q: string; a: string }[] = [
  {
    q: "Is this my official NEET rank?",
    a: "No — only NTA issues your official rank, on your scorecard. This is a statistical estimate built from how scores mapped to ranks in NEET 2024 and 2025. Treat it as a planning tool: it tells you which colleges to start researching weeks before results day.",
  },
  {
    q: "How accurate is the estimate?",
    a: "The wide band is deliberately honest about uncertainty. The refined band (after verification) uses a tighter mapping of the last two years of score–rank data. Accuracy is best in the middle of the score range; at very high or very low scores, ties and NTA normalisation cause more drift. Always verify against your official scorecard.",
  },
  {
    q: "Why do I need to verify my mobile number?",
    a: "Two reasons. It saves your result so you can return to it (and receive it on WhatsApp), and it keeps the refined data — which costs us to compile and maintain — for genuinely interested students. No spam: counselling-relevant updates only, unsubscribe any time.",
  },
  {
    q: "What about category and state quota?",
    a: "The instant estimate is AIR-based. After verification you also get a state merit band for your domicile state — the number your state counselling (ACPUGMEC, RUHS, DMAT, CET Cell) actually runs on. Official category-wise ranks come from NTA; category-wise cutoffs apply in the College Predictor once your real rank is out.",
  },
  {
    q: "What happens after the official rank is published?",
    a: "Move to the College Predictor with your NTA rank for counselling-style lists, and start building your choice order. That's also the moment a 15-minute call with our counsellors is most valuable — the choice-filling window is short.",
  },
  {
    q: "Does a good rank guarantee a college?",
    a: "No — and this is the part most students learn too late. Rank is the entry ticket; the final seat depends on choice order, quota, category, domicile and round strategy. Two students with the same rank routinely end up in very different colleges. That gap is exactly what our counselling closes.",
  },
];

export const RANK_PREDICTOR_HOW_IT_WORKS = {
  eyebrow: "How it works",
  title: "Three steps. ",
  titleEmphasis: "No mystery.",
  steps: [
    {
      icon: "score" as const,
      title: "Enter your score",
      body: "NEET marks, category and domicile state. That's everything the model needs — no account, no payment.",
    },
    {
      icon: "band" as const,
      title: "See your AIR band, instantly",
      body: "You get an honest wide band right away — no colleges yet, no inflated promises. It's a starting point, on purpose.",
    },
    {
      icon: "verify" as const,
      title: "Verify & explore",
      body: "One OTP unlocks the refined band, your state merit estimate, and up to 15 colleges near your range — with closing ranks and fees.",
    },
  ],
} as const;

export const RANK_PREDICTOR_FINAL_CTA = {
  title: "The rank is the ticket.",
  titleBreak: "Strategy buys the seat.",
  lede: "Once you know your band, the real questions begin — which states, which quota, which choice order. That's a free 15-minute call.",
  book: "Book free counselling call",
  again: "Run another prediction ↑",
  meta: "RESPONDS IN 2 HOURS · MON–SAT 9AM–8PM · GJ · RJ · MP · MH · MCC AIQ",
} as const;
