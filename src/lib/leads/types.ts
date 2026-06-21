/** Canonical lead sources — one server action accepts these `formType` values. */
export const LEAD_FORM_TYPES = {
  freeCounselling: "free-counselling",
  freeCounsellingCollegePreferenceList: "free-counselling-college-preference-list",
  counsellingRoundsAlert: "counselling-rounds-alert",
  neetUg2026InfoAlerts: "neet-ug-2026-info-alerts",
  neetUgLiveUpdates: "neet-ug-live-updates",
  getNriCounsellingSupport: "get-nri-counselling-support",
  getCounsellingGlossaryHelp: "get-counselling-glossary-help",
  contactInquiry: "contact-inquiry",
  callbackRequest: "callback_request",
  journeyModal: "journey_modal",
  predictorGate: "predictor_gate",
  neetContentMagnet: "neet_content_magnet",
  rankPredictor: "rank_predictor",
  collegePredictor: "college_predictor",
  cutoffAnalyser: "cutoff_analyser",
  homePlaybook: "home_playbook",
} as const;

export type LeadFormType = (typeof LEAD_FORM_TYPES)[keyof typeof LEAD_FORM_TYPES];

export const LEAD_STATUSES = ["new", "contacted", "converted", "spam"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type SubmitLeadInput = {
  formType: LeadFormType;
  pagePath?: string;
  pageLabel?: string;
  /** Journey plan, NEET magnet subtype, predictor funnel stage, etc. */
  variant?: string;
  name?: string;
  countryCode?: string;
  phone?: string;
  email?: string;
  neetScore?: number | null;
  neetCategory?: string;
  domicileState?: string;
  targetStates?: string;
  city?: string;
  queryType?: string;
  message?: string;
  preferredSlot?: string;
  topics?: string[];
  consent?: boolean;
  rawPayload?: Record<string, unknown>;
};

export type SubmitLeadResult =
  | { success: true; leadId: string }
  | { success: false; error: string };
