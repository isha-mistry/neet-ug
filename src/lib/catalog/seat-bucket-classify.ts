import {
  MCC_AIQ_BUCKET_CODES,
  MCC_AIQ_BUCKET_LABELS,
} from "@/lib/colleges/mcc-config";

export type SeatBucketRow = { bucketCode: string; seatCount: number };

/** Unprefixed bucket codes that map to MCC `aiq_*` sub-buckets. */
export const GENERIC_TO_AIQ_BUCKET: Record<string, string> = {
  open: "aiq_open",
  op_ph: "aiq_open_ph",
  pwd_open: "aiq_open_ph",
  obc: "aiq_obc",
  bc_ph: "aiq_obc_ph",
  pwd_obc: "aiq_obc_ph",
  sc: "aiq_sc",
  sc_ph: "aiq_sc_ph",
  pwd_sc: "aiq_sc_ph",
  st: "aiq_st",
  st_ph: "aiq_st_ph",
  ews: "aiq_ews",
  ew_ph: "aiq_ews_ph",
  pwd_ews: "aiq_ews_ph",
};

export const GENERIC_AIQ_MIRROR_BUCKETS = new Set(
  Object.keys(GENERIC_TO_AIQ_BUCKET),
);

/** Karnataka KEA seat-matrix columns from `karnataka_seat_data`. */
export const KARNATAKA_STATE_CATEGORY_BUCKETS = new Set([
  "cat1_g",
  "cat1_r",
  "cat1_k",
  "2a_g",
  "2a_r",
  "2a_k",
  "2b_g",
  "2b_r",
  "2b_k",
  "3a_g",
  "3a_r",
  "3a_k",
  "3b_g",
  "3b_r",
  "3b_k",
  "st_g",
  "st_r",
  "st_k",
  "sc_g",
  "sc_r",
  "sc_k",
  "gm_g",
  "gm_r",
  "gm_k",
  "gmp",
  "gmph",
  "mmh",
  "meh",
  "mc",
  "mm",
  "mk",
  "mu",
  "ma",
  "me",
  "ncc",
  "spo",
  "jk",
  "phm",
]);

export const QUOTA_LEVEL_BUCKETS = new Set([
  "aiq",
  "goi_quota",
  "state_quota",
  "esic_ip",
  "mqt_quota",
  "nri_quota",
  "iq_quota",
  "nri",
  "mgt",
]);

export function hasAiqSubBuckets(buckets: SeatBucketRow[]): boolean {
  return buckets.some(
    (b) => MCC_AIQ_BUCKET_CODES.has(b.bucketCode) && b.seatCount > 0,
  );
}

/** When an `aiq_*` row exists with the same count, unprefixed rows are legacy AIQ duplicates. */
export function isLegacyAiqMirrorBucket(
  bucketCode: string,
  buckets: SeatBucketRow[],
): boolean {
  const aiqCode = GENERIC_TO_AIQ_BUCKET[bucketCode];
  if (!aiqCode) return false;

  const genericCount =
    buckets.find((b) => b.bucketCode === bucketCode)?.seatCount ?? 0;
  const aiqCount =
    buckets.find((b) => b.bucketCode === aiqCode)?.seatCount ?? 0;

  return genericCount > 0 && aiqCount > 0 && genericCount === aiqCount;
}

export function isKarnatakaStateCategoryBucket(bucketCode: string): boolean {
  return KARNATAKA_STATE_CATEGORY_BUCKETS.has(bucketCode);
}

export type AiqBucketRollup = {
  total: number;
  distribution: Record<string, number>;
};

/** Sum AIQ from `aiq_*` sub-buckets; fall back to aggregate `aiq` only when subs are absent. */
export function rollupAiqBuckets(buckets: SeatBucketRow[]): AiqBucketRollup {
  const distribution: Record<string, number> = {};
  let subtotal = 0;

  for (const bucket of buckets) {
    if (!MCC_AIQ_BUCKET_CODES.has(bucket.bucketCode) || bucket.seatCount <= 0) {
      continue;
    }
    subtotal += bucket.seatCount;
    const label =
      MCC_AIQ_BUCKET_LABELS[bucket.bucketCode] ??
      bucket.bucketCode.toUpperCase();
    distribution[label] = bucket.seatCount;
  }

  if (subtotal > 0) {
    return { total: subtotal, distribution };
  }

  const aggregate =
    buckets.find((b) => b.bucketCode === "aiq" && b.seatCount > 0)?.seatCount ??
    0;
  return { total: aggregate, distribution };
}

export function sumBucketCounts(
  buckets: SeatBucketRow[],
  codes: Set<string>,
): number {
  let total = 0;
  for (const bucket of buckets) {
    if (codes.has(bucket.bucketCode) && bucket.seatCount > 0) {
      total += bucket.seatCount;
    }
  }
  return total;
}

export function bucketCount(buckets: SeatBucketRow[], code: string): number {
  return buckets.find((b) => b.bucketCode === code)?.seatCount ?? 0;
}

/** Derive state-quota headcount when only AIQ/NRI/MGT pools are itemised in buckets. */
export function deriveResidualStateQuota(
  totalSeats: number,
  pools: {
    aiq: number;
    nri: number;
    management: number;
    esic: number;
    goiQuota: number;
    iqQuota: number;
  },
  stateCategorySum: number,
): number {
  if (stateCategorySum > 0) return stateCategorySum;
  if (totalSeats <= 0) return 0;
  const residual =
    totalSeats -
    pools.aiq -
    pools.nri -
    pools.management -
    pools.esic -
    pools.goiQuota -
    pools.iqQuota;
  return residual > 0 ? residual : 0;
}

const STATE_POOL_BUCKETS = new Set([
  "state_quota",
  "nri",
  "mgt",
  "esic_ip",
  "goi_quota",
  "nri_quota",
  "mqt_quota",
  "iq_quota",
]);

function isMccQuotaBucket(bucketCode: string): boolean {
  return bucketCode === "aiq" || MCC_AIQ_BUCKET_CODES.has(bucketCode);
}

function isStatePoolBucket(bucketCode: string): boolean {
  return STATE_POOL_BUCKETS.has(bucketCode);
}

function isCategorySeatBucket(bucketCode: string): boolean {
  return (
    !QUOTA_LEVEL_BUCKETS.has(bucketCode) && !MCC_AIQ_BUCKET_CODES.has(bucketCode)
  );
}

export type SplitBucketsResult = {
  state: SeatBucketRow[];
  mcc: SeatBucketRow[];
  hasStateQuota: boolean;
};

/**
 * Split legacy merged buckets into state vs MCC lists for backfill.
 * Category rows go to state when `state_quota` is present, else MCC/AIQ.
 */
export function splitBucketsByCounsellingSource(
  buckets: SeatBucketRow[],
): SplitBucketsResult {
  const hasStateQuota = bucketCount(buckets, "state_quota") > 0;
  const state: SeatBucketRow[] = [];
  const mcc: SeatBucketRow[] = [];

  for (const bucket of buckets) {
    if (bucket.seatCount <= 0) continue;
    const { bucketCode } = bucket;

    if (isLegacyAiqMirrorBucket(bucketCode, buckets)) continue;

    if (isMccQuotaBucket(bucketCode)) {
      mcc.push(bucket);
      continue;
    }

    if (isStatePoolBucket(bucketCode)) {
      state.push(bucket);
      continue;
    }

    if (isCategorySeatBucket(bucketCode)) {
      if (hasStateQuota) {
        state.push(bucket);
      } else {
        mcc.push(bucket);
      }
    }
  }

  return { state, mcc, hasStateQuota };
}

/** Sum Karnataka / generic state category bucket seats (excludes quota-level pools). */
export function sumStateCategoryBucketSeats(
  buckets: SeatBucketRow[],
  stateSlug?: string,
): number {
  let total = 0;
  for (const bucket of buckets) {
    if (bucket.seatCount <= 0) continue;
    if (!isCategorySeatBucket(bucket.bucketCode)) continue;
    if (stateSlug === "karnataka" && !isKarnatakaStateCategoryBucket(bucket.bucketCode)) {
      continue;
    }
    if (isLegacyAiqMirrorBucket(bucket.bucketCode, buckets)) continue;
    total += bucket.seatCount;
  }
  return total;
}

export function ensureStateQuotaBucket(
  buckets: SeatBucketRow[],
  stateSlug?: string,
): SeatBucketRow[] {
  if (bucketCount(buckets, "state_quota") > 0) return buckets;
  const sum = sumStateCategoryBucketSeats(buckets, stateSlug);
  if (sum <= 0) return buckets;
  return [...buckets, { bucketCode: "state_quota", seatCount: sum }];
}

export function ensureAiqAggregateBucket(buckets: SeatBucketRow[]): SeatBucketRow[] {
  if (bucketCount(buckets, "aiq") > 0) return buckets;
  const rollup = rollupAiqBuckets(buckets);
  if (rollup.total <= 0) return buckets;
  return [...buckets, { bucketCode: "aiq", seatCount: rollup.total }];
}
