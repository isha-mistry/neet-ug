import type { CollegeSeatMatrix } from "@/types/college";

export type SeatSnapshotWithBuckets = {
  academicYear: number;
  totalSeats: number;
  buckets: { bucketCode: string; seatCount: number }[];
};

const QUOTA_BUCKET_CODES = new Set([
  "aiq",
  "state_quota",
  "esic_ip",
  "mqt_quota",
  "nri_quota",
]);

const CATEGORY_LABEL_BY_CODE: Record<string, string> = {
  open: "Open",
  sc: "SC",
  st: "ST",
  obc: "OBC",
  mbc: "MBC",
  sebc: "SEBC",
  ews: "EWS",
  st_and_sa: "ST & SA",
  obc_and_mbc: "OBC & MBC",
};

function bucketCount(snapshot: SeatSnapshotWithBuckets, code: string): number {
  return snapshot.buckets.find((b) => b.bucketCode === code)?.seatCount ?? 0;
}

export function pickLatestSeatSnapshot<T extends { academicYear: number }>(
  snapshots: T[],
): T | undefined {
  if (snapshots.length === 0) return undefined;
  return [...snapshots].sort((a, b) => b.academicYear - a.academicYear)[0];
}

export function buildSeatMatrixFromSnapshot(
  snapshot: SeatSnapshotWithBuckets,
): CollegeSeatMatrix {
  const matrix: CollegeSeatMatrix = {
    aiq: bucketCount(snapshot, "aiq"),
    stateQuota: bucketCount(snapshot, "state_quota"),
    esic: bucketCount(snapshot, "esic_ip"),
    management: bucketCount(snapshot, "mqt_quota"),
    nri: bucketCount(snapshot, "nri_quota"),
    categoryDistribution: {},
  };

  for (const bucket of snapshot.buckets) {
    if (QUOTA_BUCKET_CODES.has(bucket.bucketCode) || bucket.seatCount <= 0) {
      continue;
    }
    const label =
      CATEGORY_LABEL_BY_CODE[bucket.bucketCode] ??
      bucket.bucketCode.replace(/_/g, " ").toUpperCase();
    matrix.categoryDistribution[label] = bucket.seatCount;
  }

  return normalizeSeatMatrixForInstituteTotal(matrix, snapshot.totalSeats);
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

  const categorySum = Object.values(matrix.categoryDistribution).reduce(
    (sum, n) => sum + n,
    0,
  );
  const { aiq, esic, management, nri } = matrix;
  const derivedStatePool = totalSeats - aiq - esic - management - nri;
  const rawQuotaSum = matrix.stateQuota + aiq + esic + management + nri;
  const partsSum = categorySum + esic + management + nri + aiq;

  const partsMatchTotal =
    categorySum > 0 && partsSum === totalSeats;
  const rawQuotaExceedsTotal = rawQuotaSum > totalSeats;
  const derivedMatchesCategories =
    categorySum > 0 &&
    derivedStatePool >= 0 &&
    Math.abs(derivedStatePool - categorySum) <= 1;

  if (
    derivedStatePool >= 0 &&
    (rawQuotaExceedsTotal || partsMatchTotal || derivedMatchesCategories)
  ) {
    return { ...matrix, stateQuota: derivedStatePool };
  }

  return matrix;
}

export function seatMatrixHasQuotaOrCategoryData(matrix: CollegeSeatMatrix): boolean {
  const quotaTotal =
    matrix.aiq +
    matrix.stateQuota +
    matrix.esic +
    matrix.management +
    matrix.nri;
  const categoryTotal = Object.values(matrix.categoryDistribution).reduce(
    (sum, n) => sum + n,
    0,
  );
  return quotaTotal > 0 || categoryTotal > 0;
}

/** Display string for listings; quota rows first, then category breakdown, then NRI/MQ. */
export function quotaInfoFromSeatMatrix(matrix: CollegeSeatMatrix): string {
  const parts: string[] = [];
  if (matrix.aiq > 0) parts.push(`AIQ ${matrix.aiq}`);
  if (matrix.stateQuota > 0) parts.push(`State ${matrix.stateQuota}`);
  if (matrix.esic > 0) parts.push(`ESIC ${matrix.esic}`);
  for (const [label, count] of Object.entries(matrix.categoryDistribution)) {
    parts.push(`${label} ${count}`);
  }
  if (matrix.nri > 0) parts.push(`NRI ${matrix.nri}`);
  if (matrix.management > 0) parts.push(`MQ ${matrix.management}`);
  return parts.join(" / ");
}
