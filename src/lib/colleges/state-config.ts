/**
 * state-config.ts
 *
 * Central, per-state configuration that drives how the UI displays:
 *  1. Cutoff Trends — which category groups appear in the dropdown
 *  2. Seat Matrix — how raw seat buckets are rolled up into quota slices
 *  3. Fees — which fee components / display mode the UI should use
 *
 * Adding a new state:
 *  1. Add a `StateSlug` literal to the union below.
 *  2. Define its `StateConfig` entry in STATE_CONFIGS.
 *  3. Use `getStateConfig(stateSlug)` wherever you need state-specific UI config.
 *     Falls back to DEFAULT_CONFIG for any un-configured state.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * How this works with existing code
 * ─────────────────────────────────────────────────────────────────────────────
 *  • AdmissionInfo uses `StateConfig.cutoffCategories` for the dropdown options.
 *    Each option maps to the raw `category` or `quota` strings stored in the DB
 *    via the `matchesCutoffGroup` helper below.
 *
 *  • SeatMatrixInfo uses `StateConfig.seatQuotaGroups` to roll-up individual
 *    seat buckets (from `CollegeSeatMatrix`) into the four standard UI slices:
 *      Open Quota | State Quota | NRI | Management
 *
 *  • FeesAndBondInfo uses `StateConfig.feesMode` to decide which sub-panel to
 *    render (e.g. "totalAnnual" = single-figure, "quotaBreakdown" = GQ/MQ/NRI).
 */

import { withMccCutoffCategories } from "@/lib/colleges/mcc-config";
import type { CounsellingPool } from "@/lib/colleges/counselling-pool";

// ─── Types ────────────────────────────────────────────────────────────────────

/** The slugs of states that have an explicit config entry. */
export type ConfiguredStateSlug =
  | "andhra-pradesh"
  | "bihar"
  | "chattisgarh"
  | "gujarat"
  | "himachal-pradesh"
  | "karnataka"
  | "madhya-pradesh"
  | "maharashtra"
  | "manipur"
  | "rajasthan"
  | "tamil-nadu"
  | "uttar-pradesh"
  | "uttarakhand"
  | "west-bengal";

/**
 * One item in the cutoff category dropdown.
 *
 * `rawCategories` — the DB `category` column values that belong to this group.
 * `rawQuotas`     — the DB `quota` column values that belong to this group.
 *                   When both lists are set, category and quota must both match.
 * `rawSeatTypes`  — optionally restrict further by `seat_type` column value.
 */
export interface CutoffCategoryOption {
  /** Stable key used as <option value> and for state management. */
  value: string;
  /** Human-readable label shown in the dropdown. */
  label: string;
  /** Tooltip description shown on the info icon (optional). */
  description?: string;
  /**
   * DB `category` strings that match this UI group.
   * Match is case-insensitive. Use `"*"` to match any category.
   */
  rawCategories?: string[];
  /**
   * DB `quota` strings that match this UI group.
   * Match is case-insensitive substring or exact. Use `"*"` to match any.
   */
  rawQuotas?: string[];
  /**
   * Optional seat_type filter. Only rows with one of these seat_type values
   * will match (in addition to category/quota match). Omit to match all seat types.
   */
  rawSeatTypes?: string[];
  /** Which counselling authority this option belongs to (for grouped UI). */
  counsellingPool?: CounsellingPool;
}

/** How the Fees panel should display fee information for a given state. */
export type FeesDisplayMode =
  | "totalAnnual" // Single "Total Annual Fees" figure only (Karnataka, UP)
  | "quotaBreakdown" // GQ / MQ / NRI breakdown (Gujarat, default)
  | "stateFeeSchedule"; // Tabular per-category rows (MP, MH)

/**
 * Keys on `CollegeFees` that can be listed as extra charge rows
 * (hostel, security, admission, etc.) beside quota tuition.
 */
export type FeeChargeKey =
  | "hostel"
  | "hostelAcFees"
  | "hostelNonAcFees"
  | "messFees"
  | "examFees"
  | "universityFees"
  | "transportFees"
  | "libraryFees"
  | "admissionFees"
  | "securityDeposit"
  | "misc";

/** One non-tuition charge row rendered in FeesAndBondInfo. */
export interface FeeChargeOption {
  key: FeeChargeKey;
  label: string;
}

/** One group in the Seat Matrix donut chart. */
export interface SeatMatrixQuotaGroup {
  /** Label shown in the donut chart legend. */
  label: string;
  /**
   * Which `CollegeSeatMatrix` numeric fields to SUM into this slice.
   * These keys must exist on `CollegeSeatMatrix`.
   */
  fields: string[];
  /** Hex / CSS color for this slice. */
  color: string;
}

/** Full per-state UI config. */
export interface StateConfig {
  /** State display name (used for titles / labels). */
  stateName: string;
  /**
   * Cutoff category dropdown.
   * The first entry is shown as the default selection.
   */
  cutoffCategories: CutoffCategoryOption[];
  /**
   * How the Seat Matrix quota donut is composed.
   * Keys: label shown in legend. Values: which CollegeSeatMatrix fields sum into that slice.
   */
  seatQuotaGroups: SeatMatrixQuotaGroup[];
  /** Controls which sub-panel the Fees section renders. */
  feesMode: FeesDisplayMode;
  /** Optional: label override for the fee schedule panel title. */
  feeScheduleTitle?: string;
  /**
   * Extra fee components to list under "Other charges" when amounts are present.
   * Used by states whose dumps store hostel / security / admission separately
   * from quota tuition (Rajasthan, UP, Uttarakhand, Bihar, …).
   */
  feeCharges?: FeeChargeOption[];
}

// ─── Karnataka Category Details ───────────────────────────────────────────────
//
// Karnataka KEA uses a matrix of category codes. This config maps the full set
// to high-level UI groups. Seat Matrix shows: Open Quota / State Quota / NRI / Management.

// Government KEA codes (govt college dumps) are listed first so govt college
// pages default to GM. Private KEA codes (OPN / GMP / MU / …) follow.
const KARNATAKA_CUTOFF_CATEGORIES: CutoffCategoryOption[] = [
  // ── Government college KEA categories ────────────────────────────────────
  {
    value: "kar-gm",
    label: "GM - General Merit",
    description:
      "General Merit (incl. HK / Rural / Kannada variants). State Quota (KEA).",
    rawCategories: ["GM", "GMH", "GMK", "GMKH", "GMR", "GMRH"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-1",
    label: "Cat-1",
    description: "Category-1 (incl. HK / Rural / Kannada variants). State Quota (KEA).",
    rawCategories: ["1G", "1H", "1K", "1R", "1RH"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-2a",
    label: "Cat-2A",
    description: "Category-2A (incl. HK / Rural / Kannada variants). State Quota (KEA).",
    rawCategories: ["2AG", "2AH", "2AK", "2AKH", "2AR", "2ARH"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-2b",
    label: "Cat-2B",
    description: "Category-2B (incl. HK / Rural / Kannada variants). State Quota (KEA).",
    rawCategories: ["2BG", "2BH", "2BK", "2BR", "2BRH"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-3a",
    label: "Cat-3A",
    description: "Category-3A (incl. HK / Rural / Kannada variants). State Quota (KEA).",
    rawCategories: ["3AG", "3AH", "3AK", "3AKH", "3AR", "3ARH"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-3b",
    label: "Cat-3B",
    description: "Category-3B (incl. HK / Rural / Kannada variants). State Quota (KEA).",
    rawCategories: ["3BG", "3BH", "3BK", "3BKH", "3BR", "3BRH"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-sc",
    label: "SC",
    description: "SC (incl. HK / Rural / Kannada variants). State Quota (KEA).",
    rawCategories: ["SCG", "SCH", "SCK", "SCKH", "SCR", "SCRH"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-st",
    label: "ST",
    description: "ST (incl. HK / Rural / Kannada variants). State Quota (KEA).",
    rawCategories: ["STG", "STH", "STK", "STKH", "STR", "STRH"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-phm",
    label: "PHM - Physically Handicapped",
    description: "Physically Handicapped (PwD). State Quota (KEA).",
    rawCategories: ["PHM"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-ncc",
    label: "NCC",
    description: "NCC Quota. State Quota (KEA).",
    rawCategories: ["NCC"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-spo",
    label: "Sports",
    description: "Sports Quota. State Quota (KEA).",
    rawCategories: ["SPO"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-jk",
    label: "J&K Migrant",
    description: "J&K Migrant Quota. State Quota (KEA).",
    rawCategories: ["JK"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-xd",
    label: "XD - Ex-Servicemen",
    description: "Ex-Servicemen Quota. State Quota (KEA).",
    rawCategories: ["XD"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-cap",
    label: "CAP",
    description: "CAP Quota. State Quota (KEA).",
    rawCategories: ["CAP"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-defence",
    label: "Defence",
    description: "Defence Quota. State Quota (KEA).",
    rawCategories: ["D"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  // ── Private college KEA categories ───────────────────────────────────────
  {
    value: "kar-opn",
    label: "OPN - Open (All India)",
    description:
      "Open / Management Quota — ALL INDIA ELIGIBLE. State Private Quota (KEA).",
    rawCategories: ["OPN"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-gmp",
    label: "GMP - Govt Merit Private",
    description:
      "Govt Quota Private (Karnataka Domicile). State Private Quota (KEA).",
    rawCategories: ["GMP"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-gmph",
    label: "GMPH - GMP + HK Region",
    description:
      "GMPH — Govt Quota Private | HK (Hyderabad-Karnataka) Region. State Private Quota (KEA).",
    rawCategories: ["GMPH"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-mu",
    label: "MU - Management Unreserved",
    description: "Management — Unreserved. State Private Quota (KEA).",
    rawCategories: ["MU"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-ma",
    label: "MA - Management General",
    description: "Management — General. State Private Quota (KEA).",
    rawCategories: ["MA"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-me",
    label: "ME - Management EWS/Open",
    description: "Management — General EWS/Open. State Private Quota (KEA).",
    rawCategories: ["ME"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-meh",
    label: "MEH - Management EWS/Open (HK)",
    description:
      "Management — EWS/Open (HK Region). State Private Quota (KEA).",
    rawCategories: ["MEH"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-mm",
    label: "MM - Management Muslim Minority",
    description: "Management — Minority Muslim. State Private Quota (KEA).",
    rawCategories: ["MM"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-mmh",
    label: "MMH - Management Muslim Minority (HK)",
    description:
      "Management — Minority Muslim (HK Region). State Private Quota (KEA).",
    rawCategories: ["MMH"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
  {
    value: "kar-oth",
    label: "OTH - Deemed / Paid Quota",
    description:
      "Deemed / Paid Quota (MCC / College). Management / Deemed Quota.",
    rawCategories: ["OTH"],
    rawSeatTypes: ["MQ"],
    counsellingPool: "kea-management",
  },
  {
    value: "kar-nri",
    label: "NRI - NRI / OCI Quota",
    description: "NRI / OCI Quota.",
    rawCategories: ["NRI"],
    rawSeatTypes: ["NRI"],
    counsellingPool: "kea-nri",
  },
  {
    value: "kar-rc",
    label: "RC1–RC8 - Religious Community (St. John's)",
    description:
      "Religious Community — Cat 1–8 (St. John's Medical College only). State Private Quota (KEA).",
    rawCategories: ["RC1", "RC2", "RC3", "RC4", "RC5", "RC6", "RC7", "RC8"],
    rawSeatTypes: ["GQ"],
    counsellingPool: "kea-state",
  },
];

// ─── Karnataka Seat Matrix Quota Groups ──────────────────────────────────────
//
// Karnataka seat snapshot buckets: nri → NRI, mgt → Management, all others → State Quota.
// The `SeatMatrixInfo` component uses `karnatakaNri`, `karnatakaMgt`, `karnatakaState`
// as virtual keys — handled by `buildKarnatakaQuotaGroups()` in seat-matrix-from-snapshot.ts.
const KARNATAKA_SEAT_QUOTA_GROUPS: SeatMatrixQuotaGroup[] = [
  {
    label: "All India Quota (AIQ)",
    fields: ["aiq"],
    color: "var(--color-primary)",
  },
  {
    label: "State Quota",
    fields: ["karnatakaState"],
    color: "var(--color-secondary)",
  },
  {
    label: "ESIC Quota",
    fields: ["esic"],
    color: "var(--color-primary-fixed-dim)",
  },
  {
    label: "NRI Quota",
    fields: ["karnatakaNri"],
    color: "var(--color-secondary-fixed-dim)",
  },
  {
    label: "Management",
    fields: ["karnatakaMgt"],
    color: "var(--color-on-secondary-container)",
  },
];

const STANDARD_SEAT_QUOTA_GROUPS: SeatMatrixQuotaGroup[] = [
  {
    label: "All India Quota (AIQ)",
    fields: ["aiq"],
    color: "var(--color-primary)",
  },
  {
    label: "State Quota",
    fields: ["stateQuota"],
    color: "var(--color-secondary)",
  },
  {
    label: "GOI Quota",
    fields: ["goiQuota"],
    color: "var(--color-primary-hover)",
  },
  {
    label: "Management",
    fields: ["management"],
    color: "var(--color-on-secondary-container)",
  },
  {
    label: "NRI Quota",
    fields: ["nri"],
    color: "var(--color-secondary-fixed-dim)",
  },
  {
    label: "ESIC Quota",
    fields: ["esic"],
    color: "var(--color-primary-fixed-dim)",
  },
  {
    label: "Institutional (IQ)",
    fields: ["iqQuota"],
    color: "var(--color-outline)",
  },
];

// ─── Default Config (generic fallback) ───────────────────────────────────────

const DEFAULT_CONFIG: StateConfig = {
  stateName: "India",
  cutoffCategories: withMccCutoffCategories([
    {
      value: "general",
      label: "Open / General",
      rawCategories: ["general", "open", "ur", "op", "opph"],
    },
    {
      value: "ews",
      label: "EWS",
      rawCategories: ["ews", "ew", "ewph"],
    },
    {
      value: "obc",
      label: "OBC / SEBC",
      rawCategories: ["obc", "sebc", "se", "seph"],
    },
    {
      value: "sc",
      label: "SC",
      rawCategories: ["sc", "scph"],
    },
    {
      value: "st",
      label: "ST",
      rawCategories: ["st", "stph"],
    },
  ]),
  seatQuotaGroups: STANDARD_SEAT_QUOTA_GROUPS,
  feesMode: "quotaBreakdown",
};

// Category / quota codes below are sourced from category_mapping.json + quota_mapping.json.

const MAHARASHTRA_OPEN_CATEGORIES = [
  "D1",
  "D1HA",
  "D2",
  "D3",
  "HA",
  "MKB",
  "OPEN",
  "OPEN (W)",
  "ORP-A",
  "ORP-C",
  "ORPHAN",
  "ORPHANC",
  "PWD",
  "Open",
];

const MAHARASHTRA_EWS_CATEGORIES = [
  "EWS",
  "EWS D1",
  "EWS D2",
  "EWS HA",
  "EWS ORP-C",
  "EWS PWD",
];

const MAHARASHTRA_OBC_CATEGORIES = [
  "OBC",
  "OBC D1",
  "OBC D1HA",
  "OBC D2",
  "OBC HA",
  "OBC ORP-A",
  "OBC ORP-C",
  "OBC PWD",
  "OBC PWD HA",
  "SEBC",
  "SEBCD1",
  "SEBCD1HA",
  "SEBCD2",
  "SEBCHA",
  "SEBCORP-C",
  "SEBCPWD",
  "SEBCPWD HA",
  "SOBC",
  "SOBC HA",
  "SOBC PWD",
  "SEB",
];

const MAHARASHTRA_NT_CATEGORIES = [
  "NTB",
  "NTB HA",
  "NTB ORP-C",
  "NTB PWD",
  "NTC",
  "NTC D1",
  "NTC D2",
  "NTC HA",
  "NTC ORP-A",
  "NTC ORP-C",
  "NTC PWD",
  "NTD",
  "NTD D1",
  "NTD D1HA",
  "NTD D2",
  "NTD HA",
  "NTD ORP-C",
  "NTD PWD",
  "NTD PWD HA",
  "VJA",
  "VJA D1",
  "VJA HA",
  "VJA ORP-C",
  "VJA PWD",
  "NT",
  "VJ",
];

// ─── Per-state Configs ────────────────────────────────────────────────────────

const STATE_CONFIGS: Record<ConfiguredStateSlug, StateConfig> = {
  karnataka: {
    stateName: "Karnataka",
    cutoffCategories: withMccCutoffCategories(KARNATAKA_CUTOFF_CATEGORIES),
    seatQuotaGroups: KARNATAKA_SEAT_QUOTA_GROUPS,
    feesMode: "stateFeeSchedule",
    feeScheduleTitle: "KEA annual fee schedule",
  },

  "uttar-pradesh": {
    stateName: "Uttar Pradesh",
    // quota_mapping.json → Up: Regular (STATE), Minority (MINORITY_INSTITUTION)
    cutoffCategories: withMccCutoffCategories([
      {
        value: "up-regular",
        label: "Regular (Open)",
        description:
          "Regular (unreserved / open) quota under UP state counselling (DGME).",
        rawCategories: ["Regular"],
        rawSeatTypes: ["GQ"],
      },
      {
        value: "up-minority",
        label: "Minority Quota",
        description:
          "Minority institution seats counselled under UP DGME minority quota.",
        rawCategories: ["Minority"],
        rawSeatTypes: ["MQ"],
      },
    ]),
    seatQuotaGroups: [
      {
        label: "All India Quota (AIQ)",
        fields: ["aiq"],
        color: "var(--color-primary)",
      },
      {
        label: "State Quota",
        fields: ["stateQuota"],
        color: "var(--color-secondary)",
      },
      {
        label: "ESIC Quota",
        fields: ["esic"],
        color: "var(--color-primary-fixed-dim)",
      },
      {
        label: "Management",
        fields: ["management"],
        color: "var(--color-on-secondary-container)",
      },
      {
        label: "NRI Quota",
        fields: ["nri"],
        color: "var(--color-secondary-fixed-dim)",
      },
    ],
    feesMode: "totalAnnual",
    feeScheduleTitle: "UP DGME fee schedule",
    feeCharges: [
      { key: "hostelAcFees", label: "Hostel Fees (AC)" },
      { key: "hostelNonAcFees", label: "Hostel Fees (Non-AC)" },
      { key: "misc", label: "Other / Miscellaneous" },
      { key: "securityDeposit", label: "Security Deposit (One-Time)" },
    ],
  },

  maharashtra: {
    stateName: "Maharashtra",
    // category_mapping.json → Maharashtra (vertical + horizontal codes)
    cutoffCategories: withMccCutoffCategories([
      {
        value: "mh-open",
        label: "Open / General",
        description:
          "OPEN and horizontal variants (Defence, HA, MKB, Orphan, PwD).",
        rawCategories: MAHARASHTRA_OPEN_CATEGORIES,
      },
      {
        value: "mh-ews",
        label: "EWS",
        rawCategories: MAHARASHTRA_EWS_CATEGORIES,
      },
      {
        value: "mh-obc",
        label: "OBC / SEBC",
        description:
          "OBC, SEBC, and SOBC (including Defence / HA / PwD / Orphan variants).",
        rawCategories: MAHARASHTRA_OBC_CATEGORIES,
      },
      {
        value: "mh-nt",
        label: "NT / VJ",
        description: "Nomadic Tribes (NTB/NTC/NTD) and VJ-A.",
        rawCategories: MAHARASHTRA_NT_CATEGORIES,
      },
      { value: "mh-sc", label: "SC", rawCategories: ["SC"] },
      { value: "mh-st", label: "ST", rawCategories: ["ST"] },
      {
        value: "mh-iq",
        label: "Institutional Quota (I.Q.)",
        rawCategories: ["I.Q."],
      },
      {
        value: "mh-nri",
        label: "NRI Quota",
        rawCategories: ["NRI"],
      },
    ]),
    seatQuotaGroups: [
      {
        label: "All India Quota (AIQ)",
        fields: ["aiq"],
        color: "var(--color-primary)",
      },
      {
        label: "State Quota (CAP)",
        fields: ["stateQuota"],
        color: "var(--color-secondary)",
      },
      {
        label: "ESIC Quota",
        fields: ["esic"],
        color: "var(--color-primary-fixed-dim)",
      },
      {
        label: "Institutional (IQ)",
        fields: ["iqQuota"],
        color: "var(--color-primary-hover)",
      },
      {
        label: "Management",
        fields: ["management"],
        color: "var(--color-on-secondary-container)",
      },
      {
        label: "NRI Quota",
        fields: ["nri"],
        color: "var(--color-secondary-fixed-dim)",
      },
    ],
    feesMode: "stateFeeSchedule",
    feeScheduleTitle: "CET state fee schedule",
  },

  "madhya-pradesh": {
    stateName: "Madhya Pradesh",
    // category_mapping.json → Madhya Pradesh; quota_mapping → GQ / NRI / FF / GS / SN
    cutoffCategories: withMccCutoffCategories([
      { value: "mp-ur", label: "UR / General", rawCategories: ["UR"] },
      { value: "mp-ews", label: "EWS", rawCategories: ["EWS"] },
      { value: "mp-obc", label: "OBC", rawCategories: ["OBC"] },
      { value: "mp-sc", label: "SC", rawCategories: ["SC"] },
      { value: "mp-st", label: "ST", rawCategories: ["ST"] },
      {
        value: "mp-nri",
        label: "NRI Quota",
        rawCategories: ["NRI"],
      },
      {
        value: "mp-ff",
        label: "Freedom Fighter",
        rawQuotas: ["FF (Freedom Fighter)"],
      },
      {
        value: "mp-gs",
        label: "Govt Servant",
        rawQuotas: ["GS (Govt Servant)"],
      },
      {
        value: "mp-sn",
        label: "Sponsored / Sainik",
        rawQuotas: ["SN (NRI-Sponsored)", "SN (Sainik)"],
      },
    ]),
    seatQuotaGroups: [
      {
        label: "All India Quota (AIQ)",
        fields: ["aiq"],
        color: "var(--color-primary)",
      },
      {
        label: "State Quota",
        fields: ["stateQuota"],
        color: "var(--color-secondary)",
      },
      {
        label: "ESIC Quota",
        fields: ["esic"],
        color: "var(--color-primary-fixed-dim)",
      },
      {
        label: "GOI Quota",
        fields: ["goiQuota"],
        color: "var(--color-primary-hover)",
      },
      {
        label: "Management",
        fields: ["management"],
        color: "var(--color-on-secondary-container)",
      },
      {
        label: "NRI Quota",
        fields: ["nri"],
        color: "var(--color-secondary-fixed-dim)",
      },
    ],
    feesMode: "stateFeeSchedule",
    feeScheduleTitle: "DMAT fee schedule",
  },

  gujarat: {
    stateName: "Gujarat",
    // category_mapping.json → Gujarat (OP/EW/SE/SC/ST + PH); quotas GQ/LQ/MQ/NQ
    cutoffCategories: withMccCutoffCategories([
      {
        value: "gj-open",
        label: "OP - Open / General",
        rawCategories: ["OP", "OPPH"],
      },
      {
        value: "gj-ews",
        label: "EW - EWS",
        rawCategories: ["EW", "EWPH"],
      },
      {
        value: "gj-sebc",
        label: "SE - SEBC / OBC",
        rawCategories: ["SE", "SEPH"],
      },
      {
        value: "gj-sc",
        label: "SC",
        rawCategories: ["SC", "SCPH"],
      },
      {
        value: "gj-st",
        label: "ST",
        rawCategories: ["ST", "STPH"],
      },
      {
        value: "gj-mq",
        label: "MQ - Management Quota",
        rawCategories: ["MQ"],
      },
      {
        value: "gj-nri",
        label: "NRI / NQ",
        rawCategories: ["NRI"],
      },
    ]),
    seatQuotaGroups: STANDARD_SEAT_QUOTA_GROUPS,
    feesMode: "quotaBreakdown",
  },

  rajasthan: {
    stateName: "Rajasthan",
    // category_mapping.json → Rajasthan; keep MBC distinct from OBC
    cutoffCategories: withMccCutoffCategories([
      {
        value: "rj-general",
        label: "General",
        rawCategories: ["General"],
      },
      { value: "rj-ews", label: "EWS", rawCategories: ["EWS"] },
      { value: "rj-obc", label: "OBC", rawCategories: ["OBC"] },
      { value: "rj-mbc", label: "MBC", rawCategories: ["MBC"] },
      { value: "rj-sc", label: "SC", rawCategories: ["SC"] },
      { value: "rj-st", label: "ST", rawCategories: ["ST"] },
      {
        value: "rj-mq",
        label: "Management Quota",
        rawQuotas: [
          "Mgmt. Seat",
          "mgmt. Seat",
          "Mgt Quota",
          "Payment (Govt./Govt Society)",
        ],
      },
      {
        value: "rj-nri",
        label: "NRI Quota",
        rawQuotas: ["NRI Seat", "NRI"],
      },
    ]),
    seatQuotaGroups: STANDARD_SEAT_QUOTA_GROUPS,
    feesMode: "quotaBreakdown",
    feeScheduleTitle: "RUHS fee schedule",
    // rajasthan_fees.csv → caution / admission / others / development / library
    feeCharges: [
      { key: "admissionFees", label: "Admission Fee (One-Time)" },
      { key: "securityDeposit", label: "Caution Money (One-Time)" },
      { key: "universityFees", label: "Development Fees" },
      { key: "libraryFees", label: "Library Fees" },
      { key: "misc", label: "Other Charges" },
    ],
  },

  "andhra-pradesh": {
    stateName: "Andhra Pradesh",
    // category_mapping.json → Andhra Pradesh (OC / BC-A..E / SC1..3 / ST / MINORITY)
    cutoffCategories: withMccCutoffCategories([
      { value: "ap-oc", label: "OC - Open / General", rawCategories: ["OC"] },
      { value: "ap-bca", label: "BC-A", rawCategories: ["BCA"] },
      { value: "ap-bcb", label: "BC-B", rawCategories: ["BCB"] },
      { value: "ap-bcc", label: "BC-C", rawCategories: ["BCC"] },
      { value: "ap-bcd", label: "BC-D", rawCategories: ["BCD"] },
      { value: "ap-bce", label: "BC-E", rawCategories: ["BCE"] },
      { value: "ap-sc1", label: "SC-1", rawCategories: ["SC1"] },
      { value: "ap-sc2", label: "SC-2", rawCategories: ["SC2"] },
      { value: "ap-sc3", label: "SC-3", rawCategories: ["SC3"] },
      { value: "ap-st", label: "ST", rawCategories: ["ST"] },
      { value: "ap-minority", label: "Minority", rawCategories: ["MINORITY"] },
      {
        value: "ap-mq",
        label: "Management Quota",
        rawQuotas: ["Mgt", "Mgt Quota"],
      },
      {
        value: "ap-nri",
        label: "NRI Quota",
        rawQuotas: ["NRI"],
      },
    ]),
    seatQuotaGroups: STANDARD_SEAT_QUOTA_GROUPS,
    feesMode: "quotaBreakdown",
  },

  bihar: {
    stateName: "Bihar",
    // category_mapping.json → Bihar; quota_mapping → State / Minority / NRI
    cutoffCategories: withMccCutoffCategories([
      {
        value: "br-ur",
        label: "UR / General",
        rawCategories: ["UR", "General"],
      },
      { value: "br-ews", label: "EWS", rawCategories: ["EWS"] },
      { value: "br-bc", label: "BC", rawCategories: ["BC"] },
      { value: "br-ebc", label: "EBC", rawCategories: ["EBC"] },
      { value: "br-sc", label: "SC", rawCategories: ["SC"] },
      { value: "br-st", label: "ST", rawCategories: ["ST"] },
      {
        value: "br-minority",
        label: "Minority",
        rawCategories: ["General / Minority", "General / Muslim Minority"],
      },
      {
        value: "br-muslim-minority",
        label: "Muslim Minority Quota",
        rawQuotas: ["Muslim Minority Quota"],
      },
      {
        value: "br-sikh-minority",
        label: "Sikh Minority Quota",
        rawQuotas: ["Sikh Minority Quota"],
      },
      {
        value: "br-nri",
        label: "NRI Quota",
        rawCategories: ["NRI"],
      },
    ]),
    seatQuotaGroups: STANDARD_SEAT_QUOTA_GROUPS,
    feesMode: "quotaBreakdown",
    feeScheduleTitle: "BCECE fee schedule",
    // bihar_fees_data → admission / development / hostel+mess / security / registration
    feeCharges: [
      { key: "hostel", label: "Hostel & Mess (Annual)" },
      { key: "universityFees", label: "Development Fees" },
      { key: "admissionFees", label: "Admission Fee (One-Time)" },
      { key: "securityDeposit", label: "Security Deposit (One-Time)" },
      { key: "examFees", label: "University Registration" },
    ],
  },

  "himachal-pradesh": {
    stateName: "Himachal Pradesh",
    // category_mapping.json → Himachal Pradesh
    cutoffCategories: withMccCutoffCategories([
      { value: "hp-general", label: "General", rawCategories: ["General"] },
      {
        value: "hp-irdp",
        label: "IRDP / BPL",
        rawCategories: ["IRDP/BPL", "IRDP / BPL"],
      },
      { value: "hp-obc", label: "OBC", rawCategories: ["OBC"] },
      { value: "hp-sc", label: "SC", rawCategories: ["SC"] },
      { value: "hp-st", label: "ST", rawCategories: ["ST"] },
      {
        value: "hp-mq",
        label: "Management Quota",
        rawQuotas: ["Management Quota", "Mgt Quota"],
      },
      {
        value: "hp-nri",
        label: "NRI Quota",
        rawCategories: ["NRI"],
      },
    ]),
    seatQuotaGroups: STANDARD_SEAT_QUOTA_GROUPS,
    feesMode: "quotaBreakdown",
  },

  "tamil-nadu": {
    stateName: "Tamil Nadu",
    // category_mapping.json → Tamil Nadu (MBC/DNC kept distinct from OBC)
    cutoffCategories: withMccCutoffCategories([
      { value: "tn-general", label: "General", rawCategories: ["General"] },
      { value: "tn-ews", label: "EWS", rawCategories: ["EWS"] },
      { value: "tn-obc", label: "OBC", rawCategories: ["OBC"] },
      { value: "tn-mbc", label: "MBC / DNC", rawCategories: ["MBC/DNC"] },
      { value: "tn-sc", label: "SC", rawCategories: ["SC"] },
      { value: "tn-st", label: "ST", rawCategories: ["ST"] },
    ]),
    seatQuotaGroups: STANDARD_SEAT_QUOTA_GROUPS,
    feesMode: "quotaBreakdown",
  },

  uttarakhand: {
    stateName: "Uttarakhand",
    // category_mapping.json → Uttarakhand; quota_mapping → State / Mgt / NRI
    cutoffCategories: withMccCutoffCategories([
      { value: "uk-open", label: "Open / General", rawCategories: ["Open"] },
      { value: "uk-obc", label: "OBC", rawCategories: ["OBC"] },
      { value: "uk-sc", label: "SC", rawCategories: ["SC"] },
      { value: "uk-st", label: "ST", rawCategories: ["ST"] },
      {
        value: "uk-mq",
        label: "Management Quota",
        rawQuotas: ["Mgt Quota", "Managment Quota"],
      },
      {
        value: "uk-nri",
        label: "NRI Quota",
        rawQuotas: ["NRI Quota"],
      },
    ]),
    seatQuotaGroups: STANDARD_SEAT_QUOTA_GROUPS,
    feesMode: "quotaBreakdown",
    feeScheduleTitle: "Uttarakhand fee schedule",
    // uttarakhand_fees_data → hostel / mess / exam / admission / security / enrolment
    feeCharges: [
      { key: "hostel", label: "Hostel Fees (Annual)" },
      { key: "messFees", label: "Mess Fees (Annual)" },
      { key: "examFees", label: "Examination Fees (Annual)" },
      { key: "admissionFees", label: "Admission Fee (One-Time)" },
      { key: "securityDeposit", label: "Security Deposit (One-Time)" },
      { key: "universityFees", label: "University Enrolment (One-Time)" },
      { key: "misc", label: "Other One-Time Charges" },
    ],
  },

  "west-bengal": {
    stateName: "West Bengal",
    // category_mapping.json → West Bengal; OBC-A / OBC-B kept distinct;
    // PwD variants folded into parent groups; plain OBC used by ESIC Joka.
    cutoffCategories: withMccCutoffCategories([
      {
        value: "wb-ur",
        label: "UR / General",
        rawCategories: ["UR", "UR PwD"],
      },
      { value: "wb-ews", label: "EWS", rawCategories: ["EWS"] },
      {
        value: "wb-obc-a",
        label: "OBC-A",
        rawCategories: ["OBC-A", "OBC-A PwD"],
      },
      {
        value: "wb-obc-b",
        label: "OBC-B",
        rawCategories: ["OBC-B", "OBC-B PwD"],
      },
      { value: "wb-obc", label: "OBC", rawCategories: ["OBC"] },
      {
        value: "wb-sc",
        label: "SC",
        rawCategories: ["SC", "SC PwD"],
      },
      { value: "wb-st", label: "ST", rawCategories: ["ST"] },
      {
        value: "wb-mq",
        label: "Management Quota",
        rawQuotas: ["Management Quota"],
      },
      {
        value: "wb-nri",
        label: "NRI Quota",
        rawQuotas: ["NRI Quota"],
      },
    ]),
    seatQuotaGroups: STANDARD_SEAT_QUOTA_GROUPS,
    feesMode: "quotaBreakdown",
    feeCharges: [
      { key: "admissionFees", label: "Admission Fee (One-Time)" },
      { key: "securityDeposit", label: "Caution / Security Deposit" },
      { key: "examFees", label: "Examination Fees" },
      { key: "hostel", label: "Hostel Fees" },
      { key: "misc", label: "Other Charges" },
    ],
  },

  chattisgarh: {
    stateName: "Chhattisgarh",
    // category_mapping.json → Chhattisgarh; quota_mapping → GQ / Mgt / NRI
    cutoffCategories: withMccCutoffCategories([
      {
        value: "cg-open",
        label: "Open / General",
        rawCategories: ["Open-NC", "Open-F", "Open-Female", "Open-EX"],
      },
      {
        value: "cg-obc",
        label: "OBC",
        rawCategories: ["OBC-NC", "OBC-F", "OBC-Female"],
      },
      {
        value: "cg-sc",
        label: "SC",
        rawCategories: ["SC-NC", "SC-F", "SC-Female"],
      },
      {
        value: "cg-st",
        label: "ST",
        rawCategories: ["ST-NC", "ST-F", "ST-Female"],
      },
      {
        value: "cg-mq",
        label: "Management Quota",
        rawQuotas: ["Mgt", "Mgt (Converted UR)"],
      },
      {
        value: "cg-nri",
        label: "NRI Quota",
        rawQuotas: ["NRI", "NRI (Converted UR)"],
      },
    ]),
    seatQuotaGroups: STANDARD_SEAT_QUOTA_GROUPS,
    feesMode: "quotaBreakdown",
  },

  manipur: {
    stateName: "Manipur",
    // category_mapping.json → Manipur; quota_mapping → State / Mgt / NRI
    cutoffCategories: withMccCutoffCategories([
      { value: "mn-open", label: "Open / General", rawCategories: ["Open"] },
      { value: "mn-obc-m", label: "OBC-M", rawCategories: ["OBC-M"] },
      { value: "mn-obc-mp", label: "OBC-MP", rawCategories: ["OBC-MP"] },
      { value: "mn-sc", label: "SC", rawCategories: ["SC"] },
      { value: "mn-st", label: "ST", rawCategories: ["ST"] },
      {
        value: "mn-mq",
        label: "Management Quota",
        rawQuotas: ["Mgt"],
      },
      {
        value: "mn-nri",
        label: "NRI Quota",
        rawQuotas: ["NRI"],
      },
    ]),
    seatQuotaGroups: STANDARD_SEAT_QUOTA_GROUPS,
    feesMode: "quotaBreakdown",
  },
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the `StateConfig` for the given state slug.
 * Falls back to `DEFAULT_CONFIG` for un-configured states.
 */
export function getStateConfig(stateSlug?: string | null): StateConfig {
  if (!stateSlug) return DEFAULT_CONFIG;
  const key = stateSlug as ConfiguredStateSlug;
  return STATE_CONFIGS[key] ?? DEFAULT_CONFIG;
}

/**
 * Checks whether a cutoff DB row matches a given `CutoffCategoryOption`.
 *
 * Rules:
 *  1. If `rawSeatTypes` defined — row seat_type must match one of them (AND).
 *  2. If `rawCategories` defined — row category must match one of them.
 *  3. If `rawQuotas` defined — row quota must contain one of them (substring, case-insensitive).
 *  4. When both rawCategories AND rawQuotas defined — both must match (AND).
 *  5. If neither defined — option matches everything (catch-all).
 */
export function matchesCutoffGroup(
  row: {
    category?: string | null;
    quota?: string | null;
    seatType?: string | null;
  },
  opt: CutoffCategoryOption,
): boolean {
  const cat = (row.category ?? "").toLowerCase().trim();
  const quota = (row.quota ?? "").toLowerCase().trim();
  const seatType = (row.seatType ?? "").toUpperCase().trim();

  // Seat-type guard (AND)
  if (opt.rawSeatTypes && opt.rawSeatTypes.length > 0) {
    const seatTypeMatch = opt.rawSeatTypes.some(
      (st) => st.toUpperCase() === seatType,
    );
    if (!seatTypeMatch) return false;
  }

  const hasCategories = (opt.rawCategories?.length ?? 0) > 0;
  const hasQuotas = (opt.rawQuotas?.length ?? 0) > 0;

  if (!hasCategories && !hasQuotas) return true;

  const catMatch = hasCategories
    ? opt.rawCategories!.some((rc) => rc === "*" || rc.toLowerCase() === cat)
    : false;

  const quotaMatch = hasQuotas
    ? opt.rawQuotas!.some(
        (rq) => rq === "*" || quota.includes(rq.toLowerCase()),
      )
    : false;

  // MCC AIQ: quota labels differ across dumps ("All India", "Open Seat Quota", …).
  // Once seat_type is AIQ, category match alone is enough.
  if (
    seatType === "AIQ" &&
    opt.rawSeatTypes?.some((st) => st.toUpperCase() === "AIQ")
  ) {
    return !hasCategories || catMatch;
  }

  if (hasCategories && hasQuotas) return catMatch && quotaMatch;
  if (hasCategories) return catMatch;
  return quotaMatch;
}
