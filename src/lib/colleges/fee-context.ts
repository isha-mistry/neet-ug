import type { CollegeRecord } from "@/types/college";
import type { ListingQuota } from "@/types/filters";
import { formatINR, formatQuotaFee } from "@/lib/utils";

export interface DisplayQuotaFee {
  /** Formatted value for UI (INR or USD). */
  formatted: string;
  /** GQ, MQ, or NRI — matches listing quota filter. */
  quotaShort: string;
  /** Numeric amount for sorting/filtering when INR; USD NRI stored separately. */
  sortKeyInr: number;
  available: boolean;
}

/** Capsule label beside fees on listing cards. */
export function getListingFeeQuotaShort(quota?: ListingQuota): string {
  if (quota === "management") return "MQ";
  if (quota === "nri") return "NRI";
  return "GQ";
}

function effectiveFeeQuota(quota?: ListingQuota): "gq" | "management" | "nri" {
  if (quota === "management") return "management";
  if (quota === "nri") return "nri";
  return "gq";
}

/**
 * Quota tuition only (no hostel/misc), per listing filter:
 * - Default / AIQ / State → GQ
 * - Management → MQ
 * - NRI → NRI fee in sheet currency
 */
export function pickDisplayQuotaFee(
  record: CollegeRecord,
  quota?: ListingQuota
): DisplayQuotaFee {
  const mode = effectiveFeeQuota(quota);
  const quotaShort = getListingFeeQuotaShort(quota);
  const breakdown = record.fees.quotaBreakdown;

  if (breakdown) {
    if (mode === "nri") {
      const nri = breakdown.nri;
      if (nri && nri.amount > 0) {
        return {
          formatted: formatQuotaFee(nri.amount, nri.currency, { compact: true }),
          quotaShort,
          sortKeyInr:
            nri.currency === "INR"
              ? nri.amount
              : Number.POSITIVE_INFINITY,
          available: true,
        };
      }
      return unavailable(quotaShort);
    }
    if (mode === "management") {
      const amount = breakdown.managementQuotaAnnualInr;
      if (amount > 0) {
        return {
          formatted: formatINR(amount, { compact: true }),
          quotaShort,
          sortKeyInr: amount,
          available: true,
        };
      }
      return unavailable(quotaShort);
    }
    const amount = breakdown.govtQuotaAnnualInr;
    if (amount > 0) {
      return {
        formatted: formatINR(amount, { compact: true }),
        quotaShort,
        sortKeyInr: amount,
        available: true,
      };
    }
    return unavailable(quotaShort);
  }

  const fallback = record.fees.tuition || record.fees.totalAnnual;
  if (fallback > 0) {
    return {
      formatted: formatINR(fallback, { compact: true }),
      quotaShort,
      sortKeyInr: fallback,
      available: true,
    };
  }
  return unavailable(quotaShort);
}

function unavailable(quotaShort: string): DisplayQuotaFee {
  return {
    formatted: "Not available",
    quotaShort,
    sortKeyInr: Number.POSITIVE_INFINITY,
    available: false,
  };
}
