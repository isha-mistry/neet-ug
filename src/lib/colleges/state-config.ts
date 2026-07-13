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
  | "karnataka"
  | "maharashtra"
  | "madhya-pradesh"
  | "gujarat"
  | "rajasthan"
  | "uttar-pradesh";

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
  | "totalAnnual"        // Single "Total Annual Fees" figure only (Karnataka, UP)
  | "quotaBreakdown"     // GQ / MQ / NRI breakdown (Gujarat, default)
  | "stateFeeSchedule";  // Tabular per-category rows (MP, MH)

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
}

// ─── Karnataka Category Details ───────────────────────────────────────────────
//
// Karnataka KEA uses a matrix of category codes. This config maps the full set
// to high-level UI groups. Seat Matrix shows: Open Quota / State Quota / NRI / Management.

// Each KEA category code gets its own dropdown entry — aligned to
// `karnataka_colleges_data.xlsx` Cutoffs sheet (Category Code + Full Name).
const KARNATAKA_CUTOFF_CATEGORIES: CutoffCategoryOption[] = [
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
    description: "Deemed / Paid Quota (MCC / College). Management / Deemed Quota.",
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
  { label: "All India Quota (AIQ)", fields: ["aiq"], color: "var(--color-primary)" },
  { label: "State Quota", fields: ["karnatakaState"], color: "var(--color-secondary)" },
  { label: "ESIC Quota", fields: ["esic"], color: "var(--color-primary-fixed-dim)" },
  { label: "NRI Quota", fields: ["karnatakaNri"], color: "var(--color-secondary-fixed-dim)" },
  { label: "Management", fields: ["karnatakaMgt"], color: "var(--color-on-secondary-container)" },
];

const STANDARD_SEAT_QUOTA_GROUPS: SeatMatrixQuotaGroup[] = [
  { label: "All India Quota (AIQ)", fields: ["aiq"], color: "var(--color-primary)" },
  { label: "State Quota", fields: ["stateQuota"], color: "var(--color-secondary)" },
  { label: "GOI Quota", fields: ["goiQuota"], color: "var(--color-primary-hover)" },
  { label: "Management", fields: ["management"], color: "var(--color-on-secondary-container)" },
  { label: "NRI Quota", fields: ["nri"], color: "var(--color-secondary-fixed-dim)" },
  { label: "ESIC Quota", fields: ["esic"], color: "var(--color-primary-fixed-dim)" },
  { label: "Institutional (IQ)", fields: ["iqQuota"], color: "var(--color-outline)" },
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
    cutoffCategories: withMccCutoffCategories([
      {
        value: "up-regular",
        label: "Regular (Open)",
        description: "Regular (unreserved / open) quota under UP state counselling (DGME).",
        rawCategories: ["Regular"],
        rawSeatTypes: ["GQ"],
      },
      {
        value: "up-minority",
        label: "Minority Quota",
        description: "Minority institution seats counselled under UP DGME minority quota.",
        rawCategories: ["Minority"],
        rawSeatTypes: ["MQ"],
      },
    ]),
    seatQuotaGroups: [
      { label: "All India Quota (AIQ)", fields: ["aiq"], color: "var(--color-primary)" },
      { label: "State Quota", fields: ["stateQuota"], color: "var(--color-secondary)" },
      { label: "ESIC Quota", fields: ["esic"], color: "var(--color-primary-fixed-dim)" },
      { label: "Management", fields: ["management"], color: "var(--color-on-secondary-container)" },
      { label: "NRI Quota", fields: ["nri"], color: "var(--color-secondary-fixed-dim)" },
    ],
    feesMode: "totalAnnual",
    feeScheduleTitle: "UP DGME fee schedule",
  },

  maharashtra: {
    stateName: "Maharashtra",
    cutoffCategories: withMccCutoffCategories([
      { value: "mh-open", label: "Open", rawCategories: ["Open", "UR", "OPEN"] },
      { value: "mh-ews", label: "EWS", rawCategories: ["EWS"] },
      { value: "mh-sebc", label: "SEBC / OBC", rawCategories: ["OBC", "SEBC", "VJ", "NT-A", "NT-B", "NT-C", "NT-D", "SBC"] },
      { value: "mh-sc", label: "SC", rawCategories: ["SC"] },
      { value: "mh-st", label: "ST", rawCategories: ["ST"] },
      { value: "mh-mq", label: "Management Quota", rawSeatTypes: ["MQ"] },
      { value: "mh-nri", label: "NRI Quota", rawSeatTypes: ["NRI"] },
    ]),
    seatQuotaGroups: [
      { label: "All India Quota (AIQ)", fields: ["aiq"], color: "var(--color-primary)" },
      { label: "State Quota (CAP)", fields: ["stateQuota"], color: "var(--color-secondary)" },
      { label: "ESIC Quota", fields: ["esic"], color: "var(--color-primary-fixed-dim)" },
      { label: "Institutional (IQ)", fields: ["iqQuota"], color: "var(--color-primary-hover)" },
      { label: "Management", fields: ["management"], color: "var(--color-on-secondary-container)" },
      { label: "NRI Quota", fields: ["nri"], color: "var(--color-secondary-fixed-dim)" },
    ],
    feesMode: "stateFeeSchedule",
    feeScheduleTitle: "CET state fee schedule",
  },

  "madhya-pradesh": {
    stateName: "Madhya Pradesh",
    cutoffCategories: withMccCutoffCategories([
      { value: "mp-ur", label: "UR / General", rawCategories: ["UR", "General", "Open"] },
      { value: "mp-ews", label: "EWS", rawCategories: ["EWS"] },
      { value: "mp-obc", label: "OBC", rawCategories: ["OBC"] },
      { value: "mp-sc", label: "SC", rawCategories: ["SC"] },
      { value: "mp-st", label: "ST", rawCategories: ["ST"] },
      { value: "mp-mq", label: "Management Quota", rawSeatTypes: ["MQ"] },
      { value: "mp-nri", label: "NRI Quota", rawSeatTypes: ["NRI"] },
    ]),
    seatQuotaGroups: [
      { label: "All India Quota (AIQ)", fields: ["aiq"], color: "var(--color-primary)" },
      { label: "State Quota", fields: ["stateQuota"], color: "var(--color-secondary)" },
      { label: "ESIC Quota", fields: ["esic"], color: "var(--color-primary-fixed-dim)" },
      { label: "GOI Quota", fields: ["goiQuota"], color: "var(--color-primary-hover)" },
      { label: "Management", fields: ["management"], color: "var(--color-on-secondary-container)" },
      { label: "NRI Quota", fields: ["nri"], color: "var(--color-secondary-fixed-dim)" },
    ],
    feesMode: "stateFeeSchedule",
    feeScheduleTitle: "DMAT fee schedule",
  },

  gujarat: {
    stateName: "Gujarat",
    cutoffCategories: withMccCutoffCategories([
      { value: "gj-open", label: "Open / General", rawCategories: ["Open", "UR", "General", "OP"] },
      { value: "gj-sebc", label: "SEBC / OBC", rawCategories: ["OBC", "SEBC", "SE"] },
      { value: "gj-sc", label: "SC", rawCategories: ["SC"] },
      { value: "gj-st", label: "ST", rawCategories: ["ST"] },
      { value: "gj-ews", label: "EWS", rawCategories: ["EWS", "EW"] },
      { value: "gj-mq", label: "Management Quota", rawSeatTypes: ["MQ"] },
      { value: "gj-nri", label: "NRI Quota", rawSeatTypes: ["NRI"] },
    ]),
    seatQuotaGroups: STANDARD_SEAT_QUOTA_GROUPS,
    feesMode: "quotaBreakdown",
},

  rajasthan: {
    stateName: "Rajasthan",
    cutoffCategories: withMccCutoffCategories([
      { value: "rj-general", label: "General / UR", rawCategories: ["UR", "General", "Open"] },
      { value: "rj-ews", label: "EWS", rawCategories: ["EWS"] },
      { value: "rj-obc", label: "OBC / MBC", rawCategories: ["OBC", "MBC"] },
      { value: "rj-sc", label: "SC", rawCategories: ["SC"] },
      { value: "rj-st", label: "ST", rawCategories: ["ST"] },
      { value: "rj-mq", label: "Management Quota", rawSeatTypes: ["MQ"] },
      { value: "rj-nri", label: "NRI Quota", rawSeatTypes: ["NRI"] },
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
  row: { category?: string | null; quota?: string | null; seatType?: string | null },
  opt: CutoffCategoryOption
): boolean {
  const cat = (row.category ?? "").toLowerCase().trim();
  const quota = (row.quota ?? "").toLowerCase().trim();
  const seatType = (row.seatType ?? "").toUpperCase().trim();

  // Seat-type guard (AND)
  if (opt.rawSeatTypes && opt.rawSeatTypes.length > 0) {
    const seatTypeMatch = opt.rawSeatTypes.some((st) => st.toUpperCase() === seatType);
    if (!seatTypeMatch) return false;
  }

  const hasCategories = (opt.rawCategories?.length ?? 0) > 0;
  const hasQuotas = (opt.rawQuotas?.length ?? 0) > 0;

  if (!hasCategories && !hasQuotas) return true;

  const catMatch = hasCategories
    ? opt.rawCategories!.some((rc) => rc === "*" || rc.toLowerCase() === cat)
    : false;

  const quotaMatch = hasQuotas
    ? opt.rawQuotas!.some((rq) => rq === "*" || quota.includes(rq.toLowerCase()))
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
