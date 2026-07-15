import type { CounsellingPool } from "@/lib/colleges/counselling-pool";

/** Collapse whitespace / newlines from MCC quota strings for DB + matching. */
export function normalizeMccQuota(quota: string): string {
  return quota.replace(/\s+/g, " ").trim();
}

export type MccCutoffCategoryDef = {
  value: string;
  label: string;
  description?: string;
  rawCategories?: string[];
  rawQuotas?: string[];
  rawSeatTypes?: string[];
  counsellingPool?: CounsellingPool;
};

/** MCC CSV `state` column → catalog `state_slug`. */
export const MCC_STATE_TO_SLUG: Record<string, string> = {
  "Andaman And Nicobar Islands": "andaman-nicobar-islands",
  "Andhra Pradesh": "andhra-pradesh",
  "Arunachal Pradesh": "arunachal-pradesh",
  Assam: "assam",
  Bihar: "bihar",
  Chandigarh: "chandigarh",
  Chhattisgarh: "chattisgarh",
  /** MCC fee CSV typo */
  Chhatisgarh: "chattisgarh",
  "Dadra and Nagar Haveli": "dadra-and-nagar-haveli",
  "Dadra And Nagar Haveli": "dadra-and-nagar-haveli",
  Delhi: "delhi",
  "Delhi (NCT)": "delhi",
  "New Delhi": "delhi",
  Goa: "goa",
  Gujarat: "gujarat",
  Haryana: "haryana",
  "Himachal Pradesh": "himachal-pradesh",
  "Jammu And Kashmir": "jammu-kashmir",
  "Jammu & Kashmir": "jammu-kashmir",
  Jharkhand: "jharkhand",
  /** MCC fee CSV typo */
  Jharkand: "jharkhand",
  Karnataka: "karnataka",
  /** MCC fee CSV typo */
  Karnata: "karnataka",
  Kerala: "kerala",
  "Madhya Pradesh": "madhya-pradesh",
  Maharashtra: "maharashtra",
  Manipur: "manipur",
  Meghalaya: "meghalaya",
  Mizoram: "mizoram",
  Nagaland: "nagaland",
  Odisha: "orissa",
  Orissa: "orissa",
  Puducherry: "pondicherry",
  Pondicherry: "pondicherry",
  Punjab: "punjab",
  Rajasthan: "rajasthan",
  "Tamil Nadu": "tamil-nadu",
  "Tamil nadu": "tamil-nadu",
  Telangana: "telangana",
  Tripura: "tripura",
  "Uttar Pradesh": "uttar-pradesh",
  Uttarakhand: "uttarakhand",
  "West Bengal": "west-bengal",
};

/** Resolve MCC CSV state text (incl. typos / case variants) to `state_slug`. */
export function resolveMccStateSlug(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const direct = MCC_STATE_TO_SLUG[trimmed];
  if (direct) return direct;
  const lower = trimmed.toLowerCase();
  for (const [name, slug] of Object.entries(MCC_STATE_TO_SLUG)) {
    if (name.toLowerCase() === lower) return slug;
  }
  return null;
}

/**
 * MCC AIQ cutoff categories — from `mcc_cutoff.csv` (quota = All India).
 * Appended after state-specific categories in each configured state.
 */
export const MCC_AIQ_CUTOFF_CATEGORIES: MccCutoffCategoryDef[] = [
  {
    value: "mcc-aiq-open",
    label: "AIQ - Open / General",
    description: "MCC All India Quota: Open / Unreserved.",
    rawCategories: ["Open", "OP", "General", "UR"],
    rawQuotas: ["All India", "Open Seat Quota", "AIQ Quota", "AIQ"],
    rawSeatTypes: ["AIQ", "GQ"],
  },
  {
    value: "mcc-aiq-obc",
    label: "AIQ - OBC",
    description: "MCC All India Quota: OBC Non-Creamy Layer.",
    rawCategories: ["OBC"],
    rawQuotas: ["All India", "Open Seat Quota", "AIQ Quota", "AIQ"],
    rawSeatTypes: ["AIQ"],
  },
  {
    value: "mcc-aiq-sc",
    label: "AIQ - SC",
    description: "MCC All India Quota: Scheduled Caste.",
    rawCategories: ["SC"],
    rawQuotas: ["All India", "Open Seat Quota", "AIQ Quota", "AIQ"],
    rawSeatTypes: ["AIQ"],
  },
  {
    value: "mcc-aiq-st",
    label: "AIQ - ST",
    description: "MCC All India Quota: Scheduled Tribe.",
    rawCategories: ["ST"],
    rawQuotas: ["All India", "Open Seat Quota", "AIQ Quota", "AIQ"],
    rawSeatTypes: ["AIQ"],
  },
  {
    value: "mcc-aiq-ews",
    label: "AIQ - EWS",
    description: "MCC All India Quota: Economically Weaker Section.",
    rawCategories: ["EWS"],
    rawQuotas: ["All India", "Open Seat Quota", "AIQ Quota", "AIQ"],
    rawSeatTypes: ["AIQ"],
  },
  {
    value: "mcc-aiq-open-pwd",
    label: "AIQ - Open PwD",
    description: "MCC All India Quota: Open with disability.",
    rawCategories: ["Open PwD"],
    rawQuotas: ["All India", "Open Seat Quota", "AIQ Quota", "AIQ"],
    rawSeatTypes: ["AIQ"],
  },
  {
    value: "mcc-aiq-obc-pwd",
    label: "AIQ - OBC PwD",
    description: "MCC All India Quota: OBC with disability.",
    rawCategories: ["OBC PwD"],
    rawQuotas: ["All India", "Open Seat Quota", "AIQ Quota", "AIQ"],
    rawSeatTypes: ["AIQ"],
  },
  {
    value: "mcc-aiq-sc-pwd",
    label: "AIQ - SC PwD",
    description: "MCC All India Quota: SC with disability.",
    rawCategories: ["SC PwD"],
    rawQuotas: ["All India", "Open Seat Quota", "AIQ Quota", "AIQ"],
    rawSeatTypes: ["AIQ"],
  },
  {
    value: "mcc-aiq-ews-pwd",
    label: "AIQ - EWS PwD",
    description: "MCC All India Quota: EWS with disability.",
    rawCategories: ["EWS PwD"],
    rawQuotas: ["All India", "Open Seat Quota", "AIQ Quota", "AIQ"],
    rawSeatTypes: ["AIQ"],
  },
  {
    value: "mcc-aiq-st-pwd",
    label: "AIQ - ST PwD",
    description: "MCC All India Quota: ST with disability.",
    rawCategories: ["ST PwD"],
    rawQuotas: ["All India", "Open Seat Quota", "AIQ Quota", "AIQ"],
    rawSeatTypes: ["AIQ"],
  },
];

/** Other MCC counselling quotas present in `mcc_cutoff.csv` / quota_mapping.json. */
export const MCC_OTHER_CUTOFF_CATEGORIES: MccCutoffCategoryDef[] = [
  {
    value: "mcc-deemed",
    label: "MCC - Deemed / Paid Quota",
    description: "Deemed / paid seats counselled via MCC.",
    rawQuotas: ["Deemed/Paid Seats Quota"],
    rawSeatTypes: ["MQ"],
  },
  {
    value: "mcc-nri",
    label: "MCC - NRI Quota",
    description: "Non-Resident Indian seats via MCC.",
    rawQuotas: ["Non-Resident Indian", "Non-Resident Indian(AMU)Quota"],
    rawSeatTypes: ["NRI"],
  },
  {
    value: "mcc-esic",
    label: "MCC - ESIC Quota",
    description: "Employees State Insurance Scheme seats via MCC.",
    rawQuotas: ["Employees State Insurance Scheme(ESI)"],
    rawSeatTypes: ["ESIC"],
  },
  {
    value: "mcc-jain-minority",
    label: "MCC - Jain Minority",
    description: "Jain Minority institution quota via MCC.",
    rawQuotas: ["Jain Minority Quota"],
  },
  {
    value: "mcc-muslim-minority",
    label: "MCC - Muslim Minority",
    description: "Muslim Minority institution quota via MCC.",
    rawQuotas: ["Muslim Minority Quota"],
  },
  {
    value: "mcc-central-ip",
    label: "MCC - IP / DU / Central Quota",
    description: "Delhi University, IP University, AMU, Puducherry internal, and related central quotas.",
    rawQuotas: [
      "IP University Quota",
      "IP Quota",
      "Delhi University Quota",
      "Aligarh Muslim University (AMU) Quota",
      "Internal -Puducherry UT Domicile",
      "Internal - Puducherry UT Domicile",
      "Foreign Country Quota",
      "Delhi NCR Children/Widows of Personnel of the Armed Forces (CW) DU Quota",
      "Delhi NCR Children/Widows of Personnel of the Armed Forces (CW) IP Quota",
    ],
  },
];

/** Append MCC AIQ (+ other MCC) categories after state-specific options. */
export function withMccCutoffCategories<T extends MccCutoffCategoryDef>(
  stateCategories: T[],
): (T | MccCutoffCategoryDef)[] {
  const aiqTagged = MCC_AIQ_CUTOFF_CATEGORIES.map((c) => ({
    ...c,
    counsellingPool: "mcc-aiq" as const,
  }));
  const otherTagged = MCC_OTHER_CUTOFF_CATEGORIES.map((c) => ({
    ...c,
    counsellingPool:
      c.value === "mcc-nri"
        ? ("mcc-nri" as const)
        : c.value === "mcc-esic" || c.value === "mcc-central-ip"
          ? ("mcc-esic" as const)
          : ("mcc-deemed" as const),
  }));
  return [...stateCategories, ...aiqTagged, ...otherTagged];
}

/** `mcc_seats.csv` column → `seat_buckets.bucket_code`. */
export const MCC_SEAT_COLUMN_TO_BUCKET: [column: string, bucketCode: string][] =
  [
    ["op_no", "aiq_open"],
    ["op_ph", "aiq_open_ph"],
    ["bc_no", "aiq_obc"],
    ["bc_ph", "aiq_obc_ph"],
    ["ew_no", "aiq_ews"],
    ["ew_ph", "aiq_ews_ph"],
    ["sc_no", "aiq_sc"],
    ["sc_ph", "aiq_sc_ph"],
    ["st_no", "aiq_st"],
    ["st_ph", "aiq_st_ph"],
    ["nri_op_no", "aiq_nri"],
    ["jain_minority_quota", "aiq_jain_minority"],
    ["muslim_minority_quota", "aiq_muslim_minority"],
  ];

export const MCC_AIQ_BUCKET_LABELS: Record<string, string> = {
  aiq_open: "AIQ Open",
  aiq_open_ph: "AIQ Open PwD",
  aiq_obc: "AIQ OBC",
  aiq_obc_ph: "AIQ OBC PwD",
  aiq_ews: "AIQ EWS",
  aiq_ews_ph: "AIQ EWS PwD",
  aiq_sc: "AIQ SC",
  aiq_sc_ph: "AIQ SC PwD",
  aiq_st: "AIQ ST",
  aiq_st_ph: "AIQ ST PwD",
  aiq_nri: "AIQ NRI",
  aiq_jain_minority: "AIQ Jain Minority",
  aiq_muslim_minority: "AIQ Muslim Minority",
};

export const MCC_AIQ_BUCKET_CODES = new Set(Object.keys(MCC_AIQ_BUCKET_LABELS));

/** Map MCC cutoff `quota` text to DB `seat_type`. */
export function mccQuotaToSeatType(quota: string): string {
  const q = normalizeMccQuota(quota).toLowerCase();
  if (q.includes("all india") || q.includes("open seat quota") || q === "aiq" || q.includes("aiq quota"))
    return "AIQ";
  if (q.includes("non-resident") || q.startsWith("nri")) return "NRI";
  if (q.includes("deemed") || q.includes("paid seat")) return "MQ";
  if (q.includes("esi") || q.includes("insurance")) return "ESIC";
  if (
    q.includes("ip university") ||
    q.includes("ip quota") ||
    q.includes("du quota") ||
    q.includes("delhi university") ||
    q.includes("amu") ||
    q.includes("puducherry") ||
    q.includes("foreign country")
  )
    return "IQ";
  if (q.includes("jain minority") || q.includes("muslim minority")) return "MQ";
  return "AIQ";
}
