export const HOME_03_METADATA = {
  title: "Direct NEET 2026 Counseling Action",
  description:
    "Stop guessing your future. Our AI-powered 2026 predictor analyzes 5 years of cut-offs to find your perfect medical college in seconds.",
};

export const PROBLEM_CARDS = [
  {
    borderClass: "border-tertiary",
    iconClass: "text-tertiary",
    titleClass: "text-tertiary",
    icon: "error_outline",
    title: "Choice Filling Chaos",
    body: "Losing your dream seat because of wrong college preference order in AIQ Round 1.",
  },
  {
    borderClass: "border-primary",
    iconClass: "text-primary",
    titleClass: "text-primary",
    icon: "psychology_alt",
    title: "Information Overload",
    body: "Conflicting data from Telegram groups and unverified WhatsApp news channels.",
  },
  {
    borderClass: "border-secondary",
    iconClass: "text-secondary",
    titleClass: "text-secondary",
    icon: "account_balance_wallet",
    title: "Budget Confusion",
    body: "Unexpected hidden fees in private/deemed universities that destroy your financial plan.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    icon: "edit_note",
    title: "Enter Score",
    body: "Input your rank and details into our analyzer.",
    accent: "primary" as const,
  },
  {
    icon: "insights",
    title: "Understand Options",
    body: "Get a filtered list of Govt & Private possibilities.",
    accent: "primary" as const,
  },
  {
    icon: "list_alt",
    title: "Build List",
    body: "Create a smart preference list for AIQ & State rounds.",
    accent: "primary" as const,
  },
  {
    icon: "verified",
    title: "Round Guidance",
    body: "Real-time support through every counseling round.",
    accent: "secondary" as const,
  },
] as const;

export const STATE_HUBS = [
  {
    name: "Gujarat (ACPC)",
    slug: "gujarat",
    govtSeats: "4,250",
    avgFee: "₹25K - 6L",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSVY7xiWH-iytFanx4EUeRjGrObKDJXxJ6EIx1e72EdoDjiCPLotKiNJPY8WaBxRPEg15wrRH8hWZsexkIOcJ7GShGrWT9lItqtvMgiRpqN4x-j1oZE9Xsy4OaHyMhVxlmGx63oX9iOyU6D9iU9gY0ptdOMucJpYL_K7qFmtgBKqEEabdj4ErqDPvry8jRLw4j118ZV1MXPFpFbqa-r0SM1mSU-eFNiCUGN0LXKwm6nQpRj7JHKtqnNQrWOkbo980pDT6stfsBEug",
  },
  {
    name: "Rajasthan",
    slug: "rajasthan",
    govtSeats: "3,100",
    avgFee: "₹1L - 15L",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMFHjpD0EvEm2ATXQ8ejkYBQfLdF4-2q3pqMCTXtGTBtPhr4DXJ-MQOvX_kLIlk7MECvypGCWwFusyUISMHxrevBYWSMuUcsZ0y8cZsrLI3BrWSZmxZNv618UyYl_dWVU1DhuU230BQJBvfqfDG_T0pL0iCyVHa372UXTBtVRCbHCvcKaaD2QxamLvf51RpY3TGAVMw__D1IiGB5UBlG49y8Nyspbn4Xjlgo7TNpG03CH9dUcNXPsIf1PpkjfWrmRno4Oy5deBHSA",
  },
  {
    name: "Madhya Pradesh",
    slug: "madhya-pradesh",
    govtSeats: "2,400",
    avgFee: "₹1L - 12L",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDorUdZ7IurvzgR3NTyMuXqpmkamnPOrPvQkycnrmqZuEpo7RVgX0gYm7bnvYV9cRnW0AAGfdP40aKls3XiHVO8k7cdov7le_2tx4STPDbhKf84rktY5c_mIsZFo-osoilFTrqC8VEM7DDIkBA_02nSsSUFT9kdPPDDkxJRoe598Xl80iuP5Qg2SeewmkM0CwvQYweEV0ygytpQ7vxB-6sKMwaD34CL20vpWwgTN-3_ibrc-QGERihuEJOGamA6uZAjmtmnWdO3Xvc",
  },
  {
    name: "Maharashtra",
    slug: "maharashtra",
    govtSeats: "4,800",
    avgFee: "₹1L - 14L",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHBEEFSVM2ECSm-YbKvrslpVQ87SXh-dEBtFewTO5BAIQOeiJfEnKlV8pmCqMR8lpckxhhVmvPdOfKtXi1QdgvWyj9Bap4P_sNLUzX42v3FoizC_qGaaeKVI-pUSeyPRIHkYp3U9Gxmewofk5XLINEQt-PQ30tiqkQDOPYRYIqPOn64au-jG6yAR0qiK97S0RlknrE4OjsNmsXa6iURAEoXpwhVA9QKxvepTuLlzhqAmdIUNRav6VQvO0E5cOjuGF_sifb0eXs",
  },
] as const;

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: "₹4,999",
    period: "/ season",
    featured: false,
    features: [
      "College Predictor Access",
      "Round-wise Cut-off PDF",
      "Email Support",
    ],
    cta: "Select Starter",
    primaryCta: false,
  },
  {
    name: "Expert",
    price: "₹14,999",
    period: "/ season",
    featured: true,
    features: [
      "Everything in Starter",
      "Dedicated Counselor (Zoom)",
      "State + AIQ List Creation",
      "Priority WhatsApp Updates",
    ],
    cta: "Get Expert Help",
    primaryCta: true,
  },
  {
    name: "Premium",
    price: "₹29,999",
    period: "/ season",
    featured: false,
    features: [
      "Everything in Expert",
      "Personal Doorstep Meet",
      "NRI / Management Quota Special",
      "Document Verification Aid",
    ],
    cta: "Go Premium",
    primaryCta: false,
  },
] as const;

export const COUNSELING_UPDATES = [
  {
    month: "Oct",
    day: "14",
    badgeClass: "bg-primary-container text-on-primary-container",
    tagClass: "text-primary",
    tag: "NMC Official",
    title: "New guidelines released for 2026 seat increment.",
  },
  {
    month: "Oct",
    day: "12",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    tagClass: "text-secondary",
    tag: "MCC Update",
    title: "Registration portal trial run starts next Monday.",
  },
] as const;
