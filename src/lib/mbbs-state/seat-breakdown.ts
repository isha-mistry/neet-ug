import {
  applyNetStateQuotaDisplay,
  isMccOnlySeatMatrix,
} from "@/lib/catalog/seat-matrix-from-snapshot";
import type { CollegeRecord, CollegeSeatMatrix } from "@/types/college";
import type { MbbsStateContentExtensions } from "./types";

export interface MbbsSeatBreakdown {
  aiq: number;
  state: number;
  mq: number;
  nri: number;
  esic: number;
  goi: number;
  iq: number;
}

function fromMatrix(matrix: CollegeSeatMatrix): MbbsSeatBreakdown {
  const m = applyNetStateQuotaDisplay(matrix);
  return {
    aiq: m.aiq,
    state: m.stateQuota,
    mq: m.management,
    nri: m.nri,
    esic: m.esic,
    goi: m.goiQuota,
    iq: m.iqQuota,
  };
}

function fromDualMatrices(
  seatMatrix: CollegeSeatMatrix,
  mccSeatMatrix: CollegeSeatMatrix,
): MbbsSeatBreakdown {
  const state = applyNetStateQuotaDisplay(seatMatrix);
  const mcc = applyNetStateQuotaDisplay(mccSeatMatrix);
  return {
    aiq: mcc.aiq > 0 ? mcc.aiq : state.aiq,
    state: state.stateQuota,
    mq: state.management > 0 ? state.management : mcc.management,
    nri: mcc.nri > 0 ? mcc.nri : state.nri,
    esic: state.esic > 0 ? state.esic : mcc.esic,
    goi: state.goiQuota > 0 ? state.goiQuota : mcc.goiQuota,
    iq: state.iqQuota > 0 ? state.iqQuota : mcc.iqQuota,
  };
}

function mccOnlyBreakdown(
  record: CollegeRecord,
  matrix?: CollegeSeatMatrix,
): MbbsSeatBreakdown {
  const total = record.seatCount || 0;
  if (matrix) {
    const b = fromMatrix(matrix);
    const pooled =
      b.aiq + b.mq + b.nri + b.esic + b.goi + b.iq;
    return {
      aiq: b.aiq > 0 ? b.aiq : pooled > 0 ? pooled : total,
      state: 0,
      mq: b.mq,
      nri: b.nri,
      esic: b.esic,
      goi: b.goi,
      iq: b.iq,
    };
  }
  return {
    aiq: total,
    state: 0,
    mq: 0,
    nri: 0,
    esic: 0,
    goi: 0,
    iq: 0,
  };
}

function heuristicBreakdown(record: CollegeRecord): MbbsSeatBreakdown {
  const total = record.seatCount || 0;
  if (record.collegeType === "private") {
    const aiq = Math.round(total * 0.15);
    const remainder = total - aiq;
    const mq = Math.round(remainder * 0.85);
    const state = remainder - mq;
    const nri = Math.max(0, Math.round(total * 0.15));
    return { aiq, state, mq, nri, esic: 0, goi: 0, iq: 0 };
  }
  if (
    record.collegeType === "government" ||
    record.collegeType === "semi-government"
  ) {
    const aiq = Math.round(total * 0.15);
    return {
      aiq,
      state: total - aiq,
      mq: 0,
      nri: 0,
      esic: 0,
      goi: 0,
      iq: 0,
    };
  }
  return mccOnlyBreakdown(record);
}

/** Resolve AIQ / state / MQ / NRI seats from catalog matrices when available. */
export function resolveMbbsSeatBreakdown(
  record: CollegeRecord,
): MbbsSeatBreakdown {
  if (record.collegeType === "deemed" || record.collegeType === "aiims") {
    return mccOnlyBreakdown(
      record,
      record.mccSeatMatrix ?? record.seatMatrix,
    );
  }

  if (record.seatMatrix && record.mccSeatMatrix) {
    return fromDualMatrices(record.seatMatrix, record.mccSeatMatrix);
  }

  const single = record.seatMatrix ?? record.mccSeatMatrix;
  if (single) {
    const breakdown = fromMatrix(single);
    if (isMccOnlySeatMatrix(single)) {
      return { ...breakdown, state: 0 };
    }
    return breakdown;
  }

  return heuristicBreakdown(record);
}

function isCentralInstitute(record: CollegeRecord): boolean {
  return (
    record.collegeType === "aiims" ||
    /esic/i.test(record.name) ||
    record.quotaInfo.toLowerCase().includes("esic")
  );
}

function isStateGovtInstitute(record: CollegeRecord): boolean {
  return (
    record.collegeType === "government" ||
    record.collegeType === "semi-government"
  );
}

function formatOtherSeats(breakdown: MbbsSeatBreakdown): string {
  const parts: string[] = [];
  if (breakdown.esic > 0) parts.push(`${breakdown.esic} (ESIC/IP)`);
  if (breakdown.goi > 0) parts.push(`${breakdown.goi} (GOI)`);
  if (breakdown.iq > 0) parts.push(`${breakdown.iq} (IQ)`);
  return parts.length ? parts.join(", ") : "—";
}

/** Build editorial seat-matrix tables from live catalog data. */
export function buildCatalogSeatMatrixTables(
  colleges: CollegeRecord[],
  stateName: string,
): NonNullable<MbbsStateContentExtensions["govtSeatMatrix"]> {
  const central = colleges
    .filter(isCentralInstitute)
    .sort((a, b) => b.seatCount - a.seatCount);
  const govt = colleges
    .filter(isStateGovtInstitute)
    .sort((a, b) => b.seatCount - a.seatCount);

  const tables: NonNullable<MbbsStateContentExtensions["govtSeatMatrix"]> = [];

  if (central.length) {
    tables.push({
      title: `Autonomous & central institutes (${stateName} — catalog seat matrix)`,
      headers: ["Medical college", "Total seats", "AIQ", "State quota", "Other"],
      rows: central.map((college) => {
        const breakdown = resolveMbbsSeatBreakdown(college);
        return {
          college: college.name,
          slug: college.slug,
          cells: [
            String(college.seatCount),
            String(breakdown.aiq),
            breakdown.state > 0 ? String(breakdown.state) : "—",
            formatOtherSeats(breakdown),
          ],
        };
      }),
    });
  }

  if (govt.length) {
    tables.push({
      title: `State government medical colleges — seat split (${stateName})`,
      headers: ["Medical college", "Total", "AIQ", "State quota", "NRI"],
      rows: govt.map((college) => {
        const breakdown = resolveMbbsSeatBreakdown(college);
        return {
          college: college.name,
          slug: college.slug,
          cells: [
            String(college.seatCount),
            String(breakdown.aiq),
            String(breakdown.state),
            breakdown.nri > 0 ? String(breakdown.nri) : "0",
          ],
        };
      }),
    });
  }

  return tables;
}
