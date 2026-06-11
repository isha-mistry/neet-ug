import { fmtIN } from "./format";

const anchors: [number, number][] = [
  [720, 1],
  [715, 30],
  [700, 300],
  [690, 800],
  [680, 1700],
  [670, 3200],
  [660, 5300],
  [650, 8000],
  [640, 11500],
  [630, 16000],
  [620, 21500],
  [610, 28000],
  [600, 35500],
  [590, 44000],
  [580, 54000],
  [570, 65000],
  [560, 77000],
  [550, 90000],
  [540, 105000],
  [530, 121000],
  [520, 138000],
  [510, 156000],
  [500, 176000],
  [480, 220000],
  [460, 270000],
  [440, 325000],
  [420, 385000],
  [400, 450000],
  [350, 640000],
  [300, 850000],
  [200, 1300000],
  [137, 1700000],
];

export function scoreToRank(s: number): number | null {
  if (s >= 720) return 1;
  if (s < 137) return null;
  for (let i = 0; i < anchors.length - 1; i++) {
    const [a, ra] = anchors[i];
    const [b, rb] = anchors[i + 1];
    if (s <= a && s >= b) {
      return Math.round(ra + ((a - s) / (a - b)) * (rb - ra));
    }
  }
  return null;
}

const catFactor: Record<string, number> = {
  gen: 1,
  ews: 1.1,
  obc: 1.5,
  sc: 3.0,
  st: 4.5,
};

const stData = [
  { nm: "GJ", tiers: [[6, 9000], [9, 26000], [10, 75000], [18, 320000]] as [number, number][] },
  { nm: "RJ", tiers: [[8, 12000], [17, 35000], [18, 300000]] as [number, number][] },
  { nm: "MP", tiers: [[6, 15000], [12, 40000], [13, 280000]] as [number, number][] },
  { nm: "MH", tiers: [[10, 8000], [25, 30000], [45, 350000]] as [number, number][] },
];

export type SeatRadarResult =
  | { kind: "invalid" }
  | { kind: "below" }
  | { kind: "ok"; rank: number; tS: number; tB: number; tR: number; rows: { nm: string; sa: number; bo: number; re: number }[]; verdict: string };

export function runSeatRadar(score: number, cat: string): SeatRadarResult {
  if (Number.isNaN(score) || score < 0 || score > 720) {
    return { kind: "invalid" };
  }
  const rank = scoreToRank(score);
  if (rank === null) {
    return { kind: "below" };
  }
  const factor = catFactor[cat] ?? 1;
  const eff = rank / factor;
  let tS = 0;
  let tB = 0;
  let tR = 0;
  const rows = stData.map((st) => {
    let sa = 0;
    let bo = 0;
    let re = 0;
    st.tiers.forEach(([n, cap]) => {
      if (cap >= eff * 1.5) sa += n;
      else if (cap >= eff * 0.85) bo += n;
      else re += n;
    });
    tS += sa;
    tB += bo;
    tR += re;
    return { nm: st.nm, sa, bo, re };
  });
  let verdict: string;
  if (tS >= 30) {
    verdict =
      "<b>Strong position.</b> Government-tier options are safely in range — your battle is choice <i>order</i>, not eligibility.";
  } else if (tS >= 12) {
    verdict =
      "<b>Good position.</b> Real safe options plus upgrade potential in later rounds. Strategy matters most for you.";
  } else if (tS >= 4) {
    verdict =
      "<b>Borderline zone.</b> Your seat depends on round strategy and state mix — exactly where expert guidance changes outcomes.";
  } else {
    verdict =
      "<b>Tight position</b> — but mop-up rounds, category nuances and the right state mix can still find a seat. Talk to us first.";
  }
  return { kind: "ok", rank, tS, tB, tR, rows, verdict };
}

export { fmtIN };
