import type { CollegeRecord, CollegeType } from "@/types/college";
import { pickDisplayCutoff } from "@/lib/colleges/cutoff-context";

const PILLAR_WEIGHT = {
  fee: 0.35,
  rank: 0.35,
  nirf: 0.2,
  bond: 0.1,
} as const;

type PeerGroup = {
  courseFees: number[];
  closingRanks: number[];
};

export type DravioRoiPeerStats = Map<CollegeType, PeerGroup>;

function courseFeeTotal(record: CollegeRecord): number {
  if (record.fees.totalCourse > 0) return record.fees.totalCourse;
  if (record.fees.totalAnnual > 0) return record.fees.totalAnnual * 5;
  return 0;
}

function closingRank(record: CollegeRecord): number {
  const cutoff = pickDisplayCutoff(record, {});
  const rank = cutoff?.rank ?? cutoff?.closingRank ?? 0;
  return rank > 0 ? rank : 0;
}

/** Higher score = better (lower raw value within peer group). */
function scoreLowerIsBetter(value: number, peerValues: number[]): number | null {
  if (peerValues.length === 0) return null;
  const min = peerValues[0];
  const max = peerValues[peerValues.length - 1];
  if (max === min) return 100;
  const t = (value - min) / (max - min);
  return Math.round(100 * (1 - t));
}

function nirfToScore(rank: number): number {
  if (rank <= 0) return 0;
  if (rank >= 100) return 10;
  return Math.round(100 - ((rank - 1) / 99) * 90);
}

function bondToScore(years: number, penalty: number): number {
  const drag = years * 8 + Math.min(penalty / 500_000, 15);
  return Math.max(0, Math.round(100 - drag));
}

export function buildDravioRoiPeerStats(
  colleges: CollegeRecord[],
): DravioRoiPeerStats {
  const map = new Map<CollegeType, PeerGroup>();

  for (const college of colleges) {
    const group = map.get(college.collegeType) ?? {
      courseFees: [],
      closingRanks: [],
    };

    const fee = courseFeeTotal(college);
    if (fee > 0) group.courseFees.push(fee);

    const rank = closingRank(college);
    if (rank > 0) group.closingRanks.push(rank);

    map.set(college.collegeType, group);
  }

  for (const group of map.values()) {
    group.courseFees.sort((a, b) => a - b);
    group.closingRanks.sort((a, b) => a - b);
  }

  return map;
}

/**
 * Dravio ROI index (0–100) from fees, cutoff, NIRF, and bond vs peers of the same college type.
 * Returns null when fee and cutoff are both unavailable (show "—" in UI).
 */
export function computeDravioRoiScore(
  record: CollegeRecord,
  stats: DravioRoiPeerStats,
): number | null {
  const peer = stats.get(record.collegeType);
  if (!peer) return null;

  let weightedSum = 0;
  let weightSum = 0;
  let hasFeePillar = false;
  let hasRankPillar = false;

  const fee = courseFeeTotal(record);
  if (fee > 0 && peer.courseFees.length > 0) {
    const score = scoreLowerIsBetter(fee, peer.courseFees);
    if (score != null) {
      weightedSum += PILLAR_WEIGHT.fee * score;
      weightSum += PILLAR_WEIGHT.fee;
      hasFeePillar = true;
    }
  }

  const rank = closingRank(record);
  if (rank > 0 && peer.closingRanks.length > 0) {
    const logPeer = peer.closingRanks.map((r) => Math.log10(r));
    const score = scoreLowerIsBetter(Math.log10(rank), logPeer);
    if (score != null) {
      weightedSum += PILLAR_WEIGHT.rank * score;
      weightSum += PILLAR_WEIGHT.rank;
      hasRankPillar = true;
    }
  }

  if (!hasFeePillar && !hasRankPillar) return null;

  if (record.nirfMedicalRank != null && record.nirfMedicalRank > 0) {
    weightedSum += PILLAR_WEIGHT.nirf * nirfToScore(record.nirfMedicalRank);
    weightSum += PILLAR_WEIGHT.nirf;
  }

  if (record.bond.years > 0 || record.bond.penalty > 0) {
    weightedSum +=
      PILLAR_WEIGHT.bond * bondToScore(record.bond.years, record.bond.penalty);
    weightSum += PILLAR_WEIGHT.bond;
  }

  if (weightSum === 0) return null;

  return Math.min(100, Math.max(0, Math.round(weightedSum / weightSum)));
}

export function applyDravioRoiScores(
  colleges: CollegeRecord[],
): CollegeRecord[] {
  const stats = buildDravioRoiPeerStats(colleges);
  return colleges.map((college) => ({
    ...college,
    roiScore: computeDravioRoiScore(college, stats),
  }));
}

export function formatDravioRoiScore(score: number | null): string {
  return score == null ? "-" : `${score}/100`;
}
