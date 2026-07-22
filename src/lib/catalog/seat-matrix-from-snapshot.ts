import type { CollegeSeatMatrix } from "@/types/college";
import { CATEGORY_LABEL_BY_CODE } from "@/lib/catalog/seat-category-labels";
import {
  bucketCount,
  deriveResidualStateQuota,
  hasAiqSubBuckets,
  isKarnatakaStateCategoryBucket,
  isLegacyAiqMirrorBucket,
  QUOTA_LEVEL_BUCKETS,
  rollupAiqBuckets,
  sumBucketCounts,
  type SeatBucketRow,
} from "@/lib/catalog/seat-bucket-classify";
import { MCC_AIQ_BUCKET_CODES } from "@/lib/colleges/mcc-config";

export type SeatSnapshotWithBuckets = {
  academicYear: number;
  totalSeats: number;
  buckets: SeatBucketRow[];
};

/** MCC seat columns that belong to NRI / Management pools, not the AIQ open pool. */
const MCC_AIQ_NRI_BUCKETS = new Set(["aiq_nri"]);
/** Jain minority stays in AIQ; only Muslim minority charts as management. */
const MCC_AIQ_MANAGEMENT_BUCKETS = new Set(["aiq_muslim_minority"]);

function stripQuotaPoolFromAiqDistribution(
  distribution: Record<string, number>,
): Record<string, number> {
  const next: Record<string, number> = {};
  for (const [label, count] of Object.entries(distribution)) {
    if (count <= 0) continue;
    const upper = label.toUpperCase();
    // Keep Jain minority in AIQ; strip NRI and Muslim-minority management pools.
    if (upper.includes("NRI")) continue;
    if (upper.includes("MUSLIM")) continue;
    next[label] = count;
  }
  return next;
}

function mergeCategoryMaps(
  ...maps: Record<string, number>[]
): Record<string, number> {
  const merged: Record<string, number> = {};
  for (const map of maps) {
    for (const [label, count] of Object.entries(map)) {
      if (count > 0) merged[label] = count;
    }
  }
  return merged;
}

function sumCategorySeats(matrix: CollegeSeatMatrix): number {
  const state = Object.values(matrix.stateCategoryDistribution ?? {}).reduce(
    (s, n) => s + n,
    0,
  );
  const aiq = Object.values(matrix.aiqCategoryDistribution ?? {}).reduce(
    (s, n) => s + n,
    0,
  );
  if (state > 0 || aiq > 0) return state + aiq;
  return Object.values(matrix.categoryDistribution).reduce((s, n) => s + n, 0);
}

/**
 * Net state-quota seats for UI: prefer category sum when available.
 *
 * Do NOT subtract MQ/NRI from `state_quota` here. Newer dumps (e.g. Andhra)
 * store disjoint `state_quota` / `mqt_quota` / `nri_quota` buckets; subtracting
 * would zero a real state pool (75 − 52 − 23 = 0). Gross `state_quota` totals
 * that include MQ/NRI are already corrected in
 * `normalizeSeatMatrixForInstituteTotal` when `totalSeats` is known.
 */
export function applyNetStateQuotaDisplay(
  matrix: CollegeSeatMatrix,
): CollegeSeatMatrix {
  const categorySum = Object.values(
    matrix.stateCategoryDistribution ?? {},
  ).reduce((sum, count) => sum + count, 0);
  let stateQuota = matrix.stateQuota;

  if (categorySum > 0) {
    if (stateQuota <= 0 || stateQuota > categorySum + 1) {
      stateQuota = categorySum;
    }
  }

  if (stateQuota === matrix.stateQuota) return matrix;
  return { ...matrix, stateQuota };
}

export function pickLatestSeatSnapshot<T extends { academicYear: number }>(
  snapshots: T[],
): T | undefined {
  if (snapshots.length === 0) return undefined;
  return [...snapshots].sort((a, b) => b.academicYear - a.academicYear)[0];
}

export function pickLatestAcademicYear(
  snapshots: { academicYear: number }[],
): number {
  if (snapshots.length === 0) return 0;
  return Math.max(...snapshots.map((s) => s.academicYear));
}

export function pickSeatSnapshot<
  T extends { academicYear: number; source: string },
>(snapshots: T[], source: string, academicYear?: number): T | undefined {
  const year = academicYear ?? pickLatestAcademicYear(snapshots);
  return snapshots.find(
    (s) => s.academicYear === year && s.source === source,
  );
}

/** MCC/AIQ-only matrix from a source-tagged snapshot (no state-quota heuristics). */
export function buildMccSeatMatrixFromSnapshot(
  snapshot: SeatSnapshotWithBuckets,
): CollegeSeatMatrix {
  const aiqRollup = rollupAiqBuckets(snapshot.buckets);
  let aiqCategoryDistribution = aiqRollup.distribution;
  if (Object.keys(aiqCategoryDistribution).length === 0) {
    aiqCategoryDistribution = buildMccOnlyCategoryDistribution(snapshot.buckets);
  }

  // NRI / minority-management seats are stored as aiq_* columns in mcc_seats.csv
  // but should chart as their own pools (same pattern as state counselling MQ/NRI).
  const nriFromAiq = sumBucketCounts(
    snapshot.buckets,
    MCC_AIQ_NRI_BUCKETS,
  );
  const managementFromAiq = sumBucketCounts(
    snapshot.buckets,
    MCC_AIQ_MANAGEMENT_BUCKETS,
  );
  const nri =
    nriFromAiq +
    bucketCount(snapshot.buckets, "nri_quota") +
    bucketCount(snapshot.buckets, "nri");
  const management =
    managementFromAiq +
    bucketCount(snapshot.buckets, "mqt_quota") +
    bucketCount(snapshot.buckets, "mgt_quota") +
    bucketCount(snapshot.buckets, "mgt");

  aiqCategoryDistribution = stripQuotaPoolFromAiqDistribution(
    aiqCategoryDistribution,
  );
  const aiq = Math.max(
    0,
    (aiqRollup.total > 0
      ? aiqRollup.total
      : Object.values(aiqCategoryDistribution).reduce((s, n) => s + n, 0)) -
      nriFromAiq -
      managementFromAiq,
  );

  const matrix: CollegeSeatMatrix = {
    aiq,
    stateQuota: 0,
    esic: bucketCount(snapshot.buckets, "esic_ip"),
    goiQuota: 0,
    management,
    nri,
    iqQuota: bucketCount(snapshot.buckets, "iq_quota"),
    stateCategoryDistribution: {},
    aiqCategoryDistribution,
    categoryDistribution: { ...aiqCategoryDistribution },
  };

  // Karnataka seatQuotaGroups use these virtual keys for NRI / Management slices.
  (matrix as unknown as Record<string, number>).karnatakaNri = nri;
  (matrix as unknown as Record<string, number>).karnatakaMgt = management;

  return normalizeSeatMatrixForInstituteTotal(matrix, snapshot.totalSeats);
}

const KARNATAKA_CAT_LABELS: Record<string, string> = {
  gmp: "GMP",
  gmph: "GMPH",
  mmh: "MMH",
  meh: "MEH",
  mc: "MC",
  mm: "MM",
  mk: "MK",
  mu: "MU",
  ma: "MA",
  me: "ME",
  ncc: "NCC",
  spo: "Sports",
  jk: "J&K",
  phm: "PwD",
  cat1_g: "Cat-1 (G)",
  cat1_r: "Cat-1 (R)",
  cat1_k: "Cat-1 (K)",
  "2a_g": "2A (G)",
  "2a_r": "2A (R)",
  "2a_k": "2A (K)",
  "2b_g": "2B (G)",
  "2b_r": "2B (R)",
  "2b_k": "2B (K)",
  "3a_g": "3A (G)",
  "3a_r": "3A (R)",
  "3a_k": "3A (K)",
  "3b_g": "3B (G)",
  "3b_r": "3B (R)",
  "3b_k": "3B (K)",
  st_g: "ST (G)",
  st_r: "ST (R)",
  st_k: "ST (K)",
  sc_g: "SC (G)",
  sc_r: "SC (R)",
  sc_k: "SC (K)",
  gm_g: "GM (G)",
  gm_r: "GM (R)",
  gm_k: "GM (K)",
  xd: "Ex-Servicemen",
  cap: "CAP",
  d: "Defence",
};

function labelStateBucket(bucketCode: string, stateSlug?: string): string {
  if (stateSlug === "karnataka") {
    return (
      KARNATAKA_CAT_LABELS[bucketCode] ??
      CATEGORY_LABEL_BY_CODE[bucketCode] ??
      bucketCode.replace(/_/g, " ").toUpperCase()
    );
  }
  return (
    CATEGORY_LABEL_BY_CODE[bucketCode] ??
    bucketCode.replace(/_/g, " ").toUpperCase()
  );
}

function shouldIncludeStateCategoryBucket(
  bucket: SeatBucketRow,
  buckets: SeatBucketRow[],
  stateSlug?: string,
  aiqOnlyMode = false,
): boolean {
  if (bucket.seatCount <= 0) return false;
  if (QUOTA_LEVEL_BUCKETS.has(bucket.bucketCode)) return false;
  if (MCC_AIQ_BUCKET_CODES.has(bucket.bucketCode)) return false;
  if (isLegacyAiqMirrorBucket(bucket.bucketCode, buckets)) return false;
  if (aiqOnlyMode) return false;

  if (stateSlug === "karnataka") {
    return isKarnatakaStateCategoryBucket(bucket.bucketCode);
  }

  return true;
}

function buildStateCategoryDistribution(
  buckets: SeatBucketRow[],
  stateSlug?: string,
  aiqOnlyMode = false,
): Record<string, number> {
  const distribution: Record<string, number> = {};
  for (const bucket of buckets) {
    if (!shouldIncludeStateCategoryBucket(bucket, buckets, stateSlug, aiqOnlyMode)) {
      continue;
    }
    distribution[labelStateBucket(bucket.bucketCode, stateSlug)] =
      bucket.seatCount;
  }
  return distribution;
}

function hasStateCategoryBuckets(
  buckets: SeatBucketRow[],
  stateSlug?: string,
  aiqOnlyMode = false,
): boolean {
  return buckets.some((bucket) =>
    shouldIncludeStateCategoryBucket(bucket, buckets, stateSlug, aiqOnlyMode),
  );
}

/** AIQ pool only — no state-quota bucket or derived state pool. */
export function isMccOnlySeatMatrix(matrix: CollegeSeatMatrix): boolean {
  return matrix.aiq > 0 && matrix.stateQuota <= 0;
}

/** Both AIQ and state-quota pools are present. */
export function hasSplitSeatCounselling(matrix: CollegeSeatMatrix): boolean {
  return matrix.aiq > 0 && matrix.stateQuota > 0;
}

/** True when matrix represents state counselling (not AIQ-only / MCC-only). */
export function seatMatrixHasStateCounsellingData(
  matrix: CollegeSeatMatrix,
): boolean {
  if (isMccOnlySeatMatrix(matrix)) return false;
  const stateCatSum = Object.values(
    matrix.stateCategoryDistribution ?? {},
  ).reduce((sum, count) => sum + count, 0);
  return (
    matrix.stateQuota > 0 ||
    stateCatSum > 0 ||
    matrix.goiQuota > 0 ||
    matrix.iqQuota > 0 ||
    // ESIC may be stored on a state dump for some colleges — treat as state-side data.
    matrix.esic > 0
  );
}

function buildMccOnlyCategoryDistribution(
  buckets: SeatBucketRow[],
  stateSlug?: string,
): Record<string, number> {
  const distribution: Record<string, number> = {};
  for (const bucket of buckets) {
    if (bucket.seatCount <= 0) continue;
    if (QUOTA_LEVEL_BUCKETS.has(bucket.bucketCode)) continue;
    if (MCC_AIQ_BUCKET_CODES.has(bucket.bucketCode)) continue;
    if (isLegacyAiqMirrorBucket(bucket.bucketCode, buckets)) continue;
    distribution[labelStateBucket(bucket.bucketCode, stateSlug)] =
      bucket.seatCount;
  }
  return distribution;
}

function finalizeMatrix(
  snapshot: SeatSnapshotWithBuckets,
  matrix: CollegeSeatMatrix,
  stateSlug?: string,
): CollegeSeatMatrix {
  const stateCategorySum = Object.values(
    matrix.stateCategoryDistribution ?? {},
  ).reduce((sum, count) => sum + count, 0);

  const stateQuotaBucket = bucketCount(snapshot.buckets, "state_quota");
  const aiqOnlyMode = stateQuotaBucket <= 0 && matrix.aiq > 0;
  const hasStateBuckets = hasStateCategoryBuckets(
    snapshot.buckets,
    stateSlug,
    aiqOnlyMode,
  );

  const stateQuota =
    stateQuotaBucket > 0
      ? stateQuotaBucket
      : stateCategorySum > 0
        ? stateCategorySum
        : hasStateBuckets
          ? deriveResidualStateQuota(
            snapshot.totalSeats,
            {
              aiq: matrix.aiq,
              nri: matrix.nri,
              management: matrix.management,
              esic: matrix.esic,
              goiQuota: matrix.goiQuota,
              iqQuota: matrix.iqQuota,
            },
            0,
          )
        : 0;

  const finalized: CollegeSeatMatrix = {
    ...matrix,
    stateQuota,
    categoryDistribution: mergeCategoryMaps(
      matrix.stateCategoryDistribution ?? {},
      matrix.aiqCategoryDistribution ?? {},
    ),
  };

  return applyNetStateQuotaDisplay(
    normalizeSeatMatrixForInstituteTotal(finalized, snapshot.totalSeats),
  );
}

export function buildSeatMatrixFromSnapshot(
  snapshot: SeatSnapshotWithBuckets,
  stateSlug?: string,
): CollegeSeatMatrix {
  if (stateSlug === "karnataka") {
    return buildKarnatakaSeatMatrix(snapshot);
  }

  const aiqRollup = rollupAiqBuckets(snapshot.buckets);
  const stateQuotaBucket = bucketCount(snapshot.buckets, "state_quota");
  const aiqOnlyMode = stateQuotaBucket <= 0 && aiqRollup.total > 0;
  const stateCategoryDistribution = buildStateCategoryDistribution(
    snapshot.buckets,
    stateSlug,
    aiqOnlyMode,
  );

  let aiqCategoryDistribution = aiqRollup.distribution;
  if (Object.keys(aiqCategoryDistribution).length === 0 && aiqOnlyMode) {
    aiqCategoryDistribution = buildMccOnlyCategoryDistribution(
      snapshot.buckets,
      stateSlug,
    );
  }

  const matrix: CollegeSeatMatrix = {
    aiq: aiqRollup.total,
    stateQuota: stateQuotaBucket,
    esic: bucketCount(snapshot.buckets, "esic_ip"),
    goiQuota: bucketCount(snapshot.buckets, "goi_quota"),
    // Prefer canonical `mqt_quota`; accept legacy `mgt_quota` alias.
    management:
      bucketCount(snapshot.buckets, "mqt_quota") ||
      bucketCount(snapshot.buckets, "mgt_quota"),
    nri: bucketCount(snapshot.buckets, "nri_quota"),
    iqQuota: bucketCount(snapshot.buckets, "iq_quota"),
    stateCategoryDistribution,
    aiqCategoryDistribution,
    categoryDistribution: {},
  };

  return finalizeMatrix(snapshot, matrix, stateSlug);
}

function buildKarnatakaSeatMatrix(
  snapshot: SeatSnapshotWithBuckets,
): CollegeSeatMatrix {
  const NRI_BUCKETS = new Set(["nri", "nri_quota"]);
  const MGT_BUCKETS = new Set(["mgt"]);

  const aiqRollup = rollupAiqBuckets(snapshot.buckets);
  const stateQuotaBucket = bucketCount(snapshot.buckets, "state_quota");
  const aiqOnlyMode = stateQuotaBucket <= 0 && aiqRollup.total > 0;
  const stateCategoryDistribution = buildStateCategoryDistribution(
    snapshot.buckets,
    "karnataka",
    aiqOnlyMode,
  );

  let aiqCategoryDistribution = aiqRollup.distribution;
  if (Object.keys(aiqCategoryDistribution).length === 0 && aiqOnlyMode) {
    aiqCategoryDistribution = buildMccOnlyCategoryDistribution(
      snapshot.buckets,
      "karnataka",
    );
  }

  let nriTotal = 0;
  let mgtTotal = 0;
  for (const bucket of snapshot.buckets) {
    if (bucket.seatCount <= 0) continue;
    if (NRI_BUCKETS.has(bucket.bucketCode)) nriTotal += bucket.seatCount;
    if (MGT_BUCKETS.has(bucket.bucketCode)) mgtTotal += bucket.seatCount;
  }

  const stateCategorySum = Object.values(stateCategoryDistribution).reduce(
    (sum, count) => sum + count,
    0,
  );

  const matrix: CollegeSeatMatrix = {
    aiq: aiqRollup.total,
    stateQuota: stateCategorySum,
    esic: bucketCount(snapshot.buckets, "esic_ip"),
    goiQuota: 0,
    management: mgtTotal,
    nri: nriTotal,
    iqQuota: 0,
    stateCategoryDistribution,
    aiqCategoryDistribution,
    categoryDistribution: {},
  };

  (matrix as unknown as Record<string, number>).karnatakaNri = nriTotal;
  (matrix as unknown as Record<string, number>).karnatakaMgt = mgtTotal;

  const finalized = finalizeMatrix(snapshot, matrix, "karnataka");
  (finalized as unknown as Record<string, number>).karnatakaState =
    finalized.stateQuota;
  return finalized;
}

/**
 * State dumps often set `state_quota` to total intake while category rows + MQ/NRI/AIQ
 * are the real partition (e.g. 127 categories + 23 MQ = 150 total, not 150 + 23).
 */
export function normalizeSeatMatrixForInstituteTotal(
  matrix: CollegeSeatMatrix,
  totalSeats: number,
): CollegeSeatMatrix {
  if (totalSeats <= 0) return matrix;

  const categoriesTotal = sumCategorySeats(matrix);
  const { aiq, esic, management, nri, goiQuota, iqQuota } = matrix;
  const derivedStatePool =
    totalSeats - aiq - esic - management - nri - goiQuota - iqQuota;
  const rawQuotaSum =
    matrix.stateQuota + aiq + esic + management + nri + goiQuota + iqQuota;
  const partsSum =
    categoriesTotal + esic + management + nri + aiq + goiQuota + iqQuota;

  const partsMatchTotal = categoriesTotal > 0 && partsSum === totalSeats;
  const rawQuotaExceedsTotal = rawQuotaSum > totalSeats;
  const derivedMatchesCategories =
    categoriesTotal > 0 &&
    derivedStatePool >= 0 &&
    Math.abs(derivedStatePool - categoriesTotal) <= 1;

  if (
    derivedStatePool >= 0 &&
    (rawQuotaExceedsTotal || partsMatchTotal || derivedMatchesCategories)
  ) {
    return { ...matrix, stateQuota: derivedStatePool };
  }

  return matrix;
}

export function seatMatrixHasQuotaOrCategoryData(
  matrix: CollegeSeatMatrix,
): boolean {
  const quotaTotal =
    matrix.aiq +
    matrix.stateQuota +
    matrix.esic +
    matrix.goiQuota +
    matrix.iqQuota +
    matrix.management +
    matrix.nri;
  const categoryTotal = sumCategorySeats(matrix);
  return quotaTotal > 0 || categoryTotal > 0;
}

/** Display string for listings; quota rows first, then category breakdown, then NRI/MQ. */
export function quotaInfoFromSeatMatrix(matrix: CollegeSeatMatrix): string {
  const parts: string[] = [];
  if (matrix.aiq > 0) parts.push(`AIQ ${matrix.aiq}`);
  if (matrix.goiQuota > 0) parts.push(`GOI ${matrix.goiQuota}`);
  if (matrix.stateQuota > 0) parts.push(`State ${matrix.stateQuota}`);
  if (matrix.esic > 0) parts.push(`ESIC ${matrix.esic}`);
  for (const [label, count] of Object.entries(
    matrix.stateCategoryDistribution ?? matrix.categoryDistribution,
  )) {
    parts.push(`${label} ${count}`);
  }
  if (matrix.nri > 0) parts.push(`NRI ${matrix.nri}`);
  if (matrix.iqQuota > 0) parts.push(`IQ ${matrix.iqQuota}`);
  if (matrix.management > 0) parts.push(`MQ ${matrix.management}`);
  return parts.join(" / ");
}
