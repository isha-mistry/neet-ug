import { LEAD_CONSENT_ERROR, isLeadConsentGranted } from "@/lib/leads/consent";
import { DEFAULT_COUNTRY_DIAL_CODE } from "@/lib/leads/country-codes";
import { LEAD_FORM_TYPES, LEAD_STATUSES, type LeadFormType, type SubmitLeadInput } from "./types";

const FORM_TYPES = new Set<string>(Object.values(LEAD_FORM_TYPES));

function normalizePhone(digits: string): string {
  return digits.replace(/\D/g, "");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateSubmitLeadInput(raw: SubmitLeadInput): { ok: true; data: SubmitLeadInput } | { ok: false; error: string } {
  if (!raw.formType || !FORM_TYPES.has(raw.formType)) {
    return { ok: false, error: "Invalid lead type." };
  }

  const formType = raw.formType as LeadFormType;
  const name = raw.name?.trim() ?? "";
  const phone = raw.phone ? normalizePhone(raw.phone) : "";
  const email = raw.email?.trim() ?? "";
  const message = raw.message?.trim() ?? "";

  switch (formType) {
    case LEAD_FORM_TYPES.freeCounselling:
    case LEAD_FORM_TYPES.freeCounsellingCollegePreferenceList:
    case LEAD_FORM_TYPES.counsellingRoundsAlert:
    case LEAD_FORM_TYPES.neetUg2026InfoAlerts:
    case LEAD_FORM_TYPES.neetUgLiveUpdates:
    case LEAD_FORM_TYPES.getNriCounsellingSupport:
    case LEAD_FORM_TYPES.getCounsellingGlossaryHelp:
    case LEAD_FORM_TYPES.homePlaybook:
      if (name.length < 2) return { ok: false, error: "Enter your full name." };
      if (phone.length < 10) return { ok: false, error: "Enter a valid mobile number." };
      if (email && !isValidEmail(email)) return { ok: false, error: "Enter a valid email address." };
      break;
    case LEAD_FORM_TYPES.contactInquiry:
      if (name.length < 2) return { ok: false, error: "Please enter your full name." };
      if (phone.length < 10) return { ok: false, error: "Please enter a valid 10-digit mobile number." };
      if (email && !isValidEmail(email)) return { ok: false, error: "Please enter a valid email address." };
      if (message.length < 5) return { ok: false, error: "Please write a query message (minimum 5 characters)." };
      break;
    case LEAD_FORM_TYPES.callbackRequest:
      if (name.length < 2) return { ok: false, error: "Please enter your name." };
      if (phone.length < 10) return { ok: false, error: "Please enter a valid 10-digit mobile number." };
      if (!raw.preferredSlot?.trim()) return { ok: false, error: "Select a preferred time slot." };
      break;
    case LEAD_FORM_TYPES.predictorGate:
      if (name.length < 2) return { ok: false, error: "Please enter your full name." };
      if (phone.length < 10) return { ok: false, error: "Please enter a valid WhatsApp number." };
      if (raw.neetScore == null || raw.neetScore < 0 || raw.neetScore > 720) {
        return { ok: false, error: "Please enter a valid NEET score between 0 and 720." };
      }
      break;
    case LEAD_FORM_TYPES.neetContentMagnet:
      if (name.length < 2) return { ok: false, error: "Enter your full name." };
      if (raw.variant === "email-guide") {
        if (!email || !isValidEmail(email)) return { ok: false, error: "Enter a valid email address." };
      } else if (phone.length < 10) {
        return { ok: false, error: "Enter a valid WhatsApp number." };
      }
      break;
    case LEAD_FORM_TYPES.journeyModal:
      if (name.length < 2) return { ok: false, error: "Enter student name." };
      if (phone.length < 10) return { ok: false, error: "Enter a valid WhatsApp number." };
      break;
    case LEAD_FORM_TYPES.rankPredictor:
      if (raw.variant === "estimate_only") {
        if (raw.neetScore == null || raw.neetScore < 0 || raw.neetScore > 720) {
          return { ok: false, error: "Enter a valid NEET score between 0 and 720." };
        }
        if (!raw.neetCategory?.trim()) {
          return { ok: false, error: "Select your category." };
        }
        if (!raw.domicileState?.trim()) {
          return { ok: false, error: "Select your domicile state." };
        }
        break;
      }
      if (phone.length < 10) return { ok: false, error: "Enter a valid 10-digit mobile number." };
      break;
    case LEAD_FORM_TYPES.collegePredictor:
      if (raw.variant === "estimate_only") {
        if (raw.neetScore == null || raw.neetScore < 1 || raw.neetScore > 2_500_000) {
          return {
            ok: false,
            error: "Enter an AIR between 1 and 25,00,000.",
          };
        }
        if (!raw.neetCategory?.trim()) {
          return { ok: false, error: "Select your category." };
        }
        if (!raw.domicileState?.trim()) {
          return { ok: false, error: "Select your domicile state." };
        }
        const quota = raw.rawPayload?.quota;
        if (typeof quota !== "string" || !quota.trim()) {
          return { ok: false, error: "Select a counselling quota." };
        }
        break;
      }
      if (phone.length < 10) return { ok: false, error: "Enter a valid 10-digit mobile number." };
      break;
    case LEAD_FORM_TYPES.cutoffAnalyser:
      if (raw.variant === "estimate_only") {
        if (raw.neetScore == null || raw.neetScore < 0 || raw.neetScore > 720) {
          return { ok: false, error: "Enter a valid NEET score between 0 and 720." };
        }
        if (!raw.neetCategory?.trim()) {
          return { ok: false, error: "Select your category." };
        }
        if (!raw.domicileState?.trim()) {
          return { ok: false, error: "Select your domicile state." };
        }
        const quota = raw.rawPayload?.quota;
        if (typeof quota !== "string" || !quota.trim()) {
          return { ok: false, error: "Select a counselling quota." };
        }
        break;
      }
      if (phone.length < 10) return { ok: false, error: "Enter a valid 10-digit mobile number." };
      break;
    default:
      break;
  }

  const skipConsent =
    (formType === LEAD_FORM_TYPES.rankPredictor ||
      formType === LEAD_FORM_TYPES.collegePredictor ||
      formType === LEAD_FORM_TYPES.cutoffAnalyser) &&
    raw.variant === "estimate_only";

  if (!skipConsent && !isLeadConsentGranted(raw.consent)) {
    return { ok: false, error: LEAD_CONSENT_ERROR };
  }

  return {
    ok: true,
    data: {
      ...raw,
      name: name || undefined,
      phone: phone || undefined,
      email: email || undefined,
      message: message || undefined,
      countryCode: raw.countryCode?.trim() || DEFAULT_COUNTRY_DIAL_CODE,
      consent: skipConsent ? false : isLeadConsentGranted(raw.consent),
    },
  };
}

export function isLeadStatus(value: string): value is (typeof LEAD_STATUSES)[number] {
  return (LEAD_STATUSES as readonly string[]).includes(value);
}
