/**
 * Counselling pool taxonomy — separates KEA state data from MCC AIQ data
 * across cutoffs, fees, and seat matrices.
 */
export type CounsellingPool =
  | "kea-state"
  | "kea-nri"
  | "kea-management"
  | "mcc-aiq"
  | "mcc-deemed"
  | "mcc-nri";

export const COUNSELLING_POOL_LABELS: Record<CounsellingPool, string> = {
  "kea-state": "KEA State Counselling",
  "kea-nri": "KEA NRI Quota",
  "kea-management": "KEA Management / Deemed",
  "mcc-aiq": "MCC All India Quota",
  "mcc-deemed": "MCC Deemed / Paid",
  "mcc-nri": "MCC NRI Quota",
};

export const COUNSELLING_POOL_SHORT: Record<CounsellingPool, string> = {
  "kea-state": "KEA State",
  "kea-nri": "KEA NRI",
  "kea-management": "KEA Management",
  "mcc-aiq": "MCC AIQ",
  "mcc-deemed": "MCC Deemed",
  "mcc-nri": "MCC NRI",
};

/** State-specific short labels for the state-counselling pool family (internal `kea-*` codes). */
const STATE_COUNSELLING_AUTHORITY: Partial<Record<string, string>> = {
  karnataka: "KEA",
  "uttar-pradesh": "UP",
  gujarat: "Gujarat",
  maharashtra: "MH",
  "madhya-pradesh": "MP",
  rajasthan: "Rajasthan",
};

/** Human-readable counselling label for table cells — avoids showing "KEA" outside Karnataka. */
export function getCounsellingPoolShortLabel(
  pool: CounsellingPool,
  stateSlug?: string | null,
): string {
  if (!pool.startsWith("kea-")) {
    return COUNSELLING_POOL_SHORT[pool];
  }

  const suffix =
    pool === "kea-state"
      ? "State"
      : pool === "kea-nri"
        ? "NRI"
        : "Management";

  if (stateSlug === "karnataka") {
    return `KEA ${suffix}`;
  }

  const authority =
    stateSlug && STATE_COUNSELLING_AUTHORITY[stateSlug]
      ? STATE_COUNSELLING_AUTHORITY[stateSlug]
      : null;

  if (authority) {
    return `${authority} ${suffix}`;
  }

  return suffix;
}

/** Resolve pool from DB cutoff / fee dimensions. */
export function resolveCounsellingPool(input: {
  seatType?: string | null;
  quota?: string | null;
}): CounsellingPool | undefined {
  const seatType = (input.seatType ?? "").trim().toUpperCase();
  const quota = (input.quota ?? "").toLowerCase();

  const isAllIndia = quota.includes("all india");
  const isKea =
    quota.includes("kea") ||
    quota.includes("state private quota (kea)");

  // MCC — requires All India quota or AIQ seat type
  if (seatType === "AIQ" || isAllIndia) {
    if (
      quota.includes("deemed") ||
      quota.includes("paid seat") ||
      seatType === "MQ"
    ) {
      return "mcc-deemed";
    }
    if (seatType === "NRI" || seatType === "NQ" || quota.includes("non-resident")) {
      return "mcc-nri";
    }
    return "mcc-aiq";
  }

  // Karnataka KEA (explicit quota string)
  if (isKea) {
    if (seatType === "NRI" || seatType === "NQ") return "kea-nri";
    if (seatType === "MQ") return "kea-management";
    return "kea-state";
  }

  // Generic state counselling (GJ / RJ / MP / MH / UP production data)
  if (
    seatType === "GQ" ||
    seatType === "GEN" ||
    seatType === "GOVT" ||
    quota.includes("state quota") ||
    quota.includes("state counselling") ||
    /\bstate\b/.test(quota)
  ) {
    return "kea-state";
  }
  if (seatType === "MQ" || quota.includes("management")) {
    return "kea-management";
  }
  if (seatType === "NRI" || seatType === "NQ" || quota.includes("nri")) {
    return "kea-nri";
  }

  if (quota.includes("deemed") || quota.includes("paid seat")) {
    return "mcc-deemed";
  }

  return undefined;
}

/** Map state-config dropdown value prefix to pool (fallback for UI options). */
export function poolFromCategoryOptionValue(
  value: string,
): CounsellingPool | undefined {
  if (value.startsWith("mcc-aiq")) return "mcc-aiq";
  if (value === "mcc-deemed") return "mcc-deemed";
  if (value === "mcc-nri") return "mcc-nri";
  if (value === "mcc-esic") return "mcc-aiq";
  if (value.startsWith("kar-nri")) return "kea-nri";
  if (value.startsWith("kar-oth")) return "kea-management";
  if (value.startsWith("kar-")) return "kea-state";
  return undefined;
}

export function keaPoolFromSeatType(seatType: string): CounsellingPool {
  const st = seatType.toUpperCase();
  if (st === "NRI") return "kea-nri";
  if (st === "MQ") return "kea-management";
  return "kea-state";
}

/** Top-level authority for UI toggles (State counselling vs MCC). */
export type CounsellingAuthority = "state" | "mcc";

export const COUNSELLING_AUTHORITY_LABELS: Record<
  CounsellingAuthority,
  { short: string; full: string }
> = {
  state: { short: "State", full: "State Counselling" },
  mcc: { short: "MCC", full: "MCC All India Quota" },
};

export function poolToAuthority(pool: CounsellingPool): CounsellingAuthority {
  return pool.startsWith("mcc-") ? "mcc" : "state";
}

export function isMccCounsellingPool(pool?: CounsellingPool): boolean {
  return pool?.startsWith("mcc-") ?? false;
}

export function isStateCounsellingPool(pool?: CounsellingPool): boolean {
  return pool?.startsWith("kea-") ?? false;
}

/** Whether a cutoff-category dropdown option belongs to MCC (vs state counselling). */
export function isMccCategoryOption(option: {
  value: string;
  counsellingPool?: CounsellingPool;
}): boolean {
  const pool =
    option.counsellingPool ?? poolFromCategoryOptionValue(option.value);
  if (pool?.startsWith("mcc-")) return true;
  return option.value.startsWith("mcc-");
}

export function filterCategoriesByAuthority<
  T extends { value: string; counsellingPool?: CounsellingPool },
>(categories: T[], authority: CounsellingAuthority): T[] {
  if (authority === "mcc") {
    return categories.filter(isMccCategoryOption);
  }
  return categories.filter((cat) => !isMccCategoryOption(cat));
}
