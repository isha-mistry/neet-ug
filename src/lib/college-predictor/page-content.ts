export const COLLEGE_PREDICTOR_HERO = {
  formTitle: "Start your shortlist",
  formSubtitle: "Four details unlock your private college match summary.",
  submitLabel: "Get my college match summary",
  submitHint: "College names unlock after verification. No spam, just your prediction session and shortlist.",
} as const;

export const COLLEGE_PREDICTOR_VERIFY_PANEL = {
  title: "Unlock your college lists",
  description:
    "Verify your mobile number to unlock Likely, Possible, and Reach lists with closing ranks and fees.",
  bullets: ["Likely matches", "Possible & Reach", "Fees + ranks"] as const,
} as const;

export const COLLEGE_PREDICTOR_HOW_IT_WORKS = {
  eyebrow: "How it works",
  title: "Three steps. ",
  titleEmphasis: "One shortlist.",
  steps: [
    {
      icon: "tag" as const,
      title: "Enter your official rank",
      body: "AIR, category, domicile state, and counseling quota (AIQ, State, Management, or NRI).",
    },
    {
      icon: "pie_chart" as const,
      title: "Get the locked preview",
      body: "See Likely, Possible, and Reach counts only. College names remain hidden until verification.",
    },
    {
      icon: "verified_user" as const,
      title: "Unlock your shortlist",
      body: "Confirm your number with OTP, add your details, then browse full college lists and compare.",
    },
  ],
} as const;
