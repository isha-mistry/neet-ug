/**
 * Personalized MBBS admission document checklist by category & quota.
 * Ported from MBBS_Admission_Document_Checklist_2025-26.docx
 * (MCC NEET-UG Information Bulletin + state / management / NRI notes).
 */

export type ChecklistCategoryKey =
  | "general"
  | "ews"
  | "obc"
  | "sc"
  | "st"
  | "pwd"
  | "nri"
  | "other";

export type ChecklistQuotaKey =
  | "aiq"
  | "state"
  | "management"
  | "nri"
  | "multiple"
  | "unknown";

const UNIVERSAL_DOCS = [
  "NEET-UG Admit Card (current year)",
  "NEET-UG Result / Rank Letter (from NTA)",
  "MCC / State Allotment Letter (after each round)",
  "Class 10 Certificate & Marksheet (DOB proof)",
  "Class 12 (10+2) Certificate & Marksheet",
  "Date of Birth Certificate (if Class 10 does not show DOB clearly)",
  "Proof of Identity (Aadhaar / PAN / Passport / Driving Licence)",
  "8 Passport-size photographs (same as NEET application)",
  "Migration Certificate (if qualifying board differs from admitting university)",
  "Gap Certificate / Affidavit (if there is a break in studies)",
  "Transfer Certificate (TC) / School Leaving Certificate",
  "Conduct Certificate from last institution",
] as const;

const CATEGORY_DOCS: Record<ChecklistCategoryKey, string[]> = {
  general: [],
  ews: [
    "EWS Certificate for the current financial year (MCC Annexure-5 format; Tahsildar/DM)",
  ],
  sc: [
    "SC Caste Certificate in central format (MCC Annexure-3; DM/SDM/Tehsildar)",
  ],
  st: [
    "ST Tribe Certificate in central format (MCC Annexure-3; DM/SDM/Tehsildar)",
  ],
  obc: [
    "OBC-NCL Certificate as per Central List (MCC Annexure-4; usually valid ~1 year)",
  ],
  pwd: [
    "PwBD Disability Certificate from an MCC/NMC-notified Disability Certification Centre",
  ],
  nri: [
    "NRI / OCI / PIO documents as applicable (see NRI quota list below)",
  ],
  other: [],
};

const QUOTA_DOCS: Record<ChecklistQuotaKey, string[]> = {
  aiq: [
    "MCC registration receipt / payment proof (registration fee + security deposit)",
    "Locked choice-filling printout for the relevant round",
  ],
  state: [
    "State domicile / residence certificate (as required by your state authority)",
    "Study / eligibility certificates required by your state counselling body",
    "State counselling registration receipt / application printout",
    "Category certificate in the state-prescribed format (if claiming reservation)",
  ],
  management: [
    "College-specific management quota registration / consent form",
    "NEET scorecard meeting the college’s declared management cutoff",
    "Fee-payment / registration receipt for the management seat process",
  ],
  nri: [
    "Passport of candidate and NRI sponsor (as applicable)",
    "Visa / residence proof of NRI sponsor",
    "Relationship affidavit / embassy-attested documents as required by MCC or state",
    "Notarised affidavits and fee-payment proofs for NRI quota",
  ],
  multiple: [
    "Keep both MCC (AIQ/Deemed) and state counselling document sets ready",
  ],
  unknown: [],
};

function normalizeCategory(raw: string | null | undefined): ChecklistCategoryKey {
  const value = (raw ?? "").trim().toLowerCase();
  if (!value) return "other";
  if (/(ews|economically)/.test(value)) return "ews";
  if (/\bobc\b|ncl/.test(value)) return "obc";
  if (/\bsc\b|scheduled caste/.test(value)) return "sc";
  if (/\bst\b|scheduled tribe/.test(value)) return "st";
  if (/pwd|pwbd|disability/.test(value)) return "pwd";
  if (/\bnri\b|oci|pio/.test(value)) return "nri";
  if (/gen|general|ur|open/.test(value)) return "general";
  return "other";
}

export function normalizeQuota(raw: string | null | undefined): ChecklistQuotaKey {
  const value = (raw ?? "").trim().toLowerCase();
  if (!value) return "unknown";
  if (/aiq|all india|mcc|deemed/.test(value)) return "aiq";
  if (/nri/.test(value)) return "nri";
  if (/management|mgt|mq/.test(value)) return "management";
  if (/multiple|not sure/.test(value)) return "multiple";
  if (/state/.test(value)) return "state";
  return "unknown";
}

export function buildPersonalizedChecklist(input: {
  category?: string | null;
  quota?: string | null;
  domicileState?: string | null;
}): string[] {
  const categoryKey = normalizeCategory(input.category);
  const quotaKey = normalizeQuota(input.quota);
  const items = [
    ...UNIVERSAL_DOCS,
    ...CATEGORY_DOCS[categoryKey],
    ...QUOTA_DOCS[quotaKey],
  ];

  const domicile = input.domicileState?.trim();
  if (domicile && (quotaKey === "state" || quotaKey === "multiple")) {
    items.push(`Domicile / residence proof for ${domicile}`);
  }

  // De-dupe while preserving order
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const item of items) {
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }
  return unique;
}

export function formatChecklistForWhatsApp(items: string[]): string {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}
