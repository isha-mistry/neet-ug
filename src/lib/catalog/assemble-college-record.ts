import type { Prisma } from "@prisma/client";
import type {
  CollegeFees,
  CollegeRecord,
  CollegeSeatMatrix,
  CollegeType,
  FeeCurrency,
  QuotaFeeBreakdown,
} from "@/types/college";
import {
  buildSeatMatrixFromSnapshot,
  pickLatestSeatSnapshot,
  quotaInfoFromSeatMatrix,
  seatMatrixHasQuotaOrCategoryData,
} from "@/lib/catalog/seat-matrix-from-snapshot";
import type { CollegeCutoff } from "@/types/college";
import { counsellingCategoryToNeet } from "@/lib/catalog/map-category";
import { buildDataQualityFlags } from "@/lib/catalog/data-quality";

type CollegeCatalogRowBase = Prisma.CollegeGetPayload<{
  include: {
    cutoffs: true;
    feeSchedules: { include: { lineItems: true } };
    seatSnapshots: { include: { buckets: true } };
  };
}>;

type CatalogCutoff = Prisma.CutoffGetPayload<Prisma.CutoffDefaultArgs>;

/** Ensures cutoffs include `quota` (Rajasthan counselling) on the assembled row type. */
export type CollegeCatalogRow = Omit<CollegeCatalogRowBase, "cutoffs"> & {
  cutoffs: CatalogCutoff[];
};

const DEFAULT_REVIEWS = {
  pros: ["Data sourced from official college listings."],
  cons: ["Clinical insights not available in dataset."],
};

function decimalToNumber(value: Prisma.Decimal | null | undefined): number {
  if (value == null) return 0;
  return Number(value);
}

function parseCollegeType(raw: string): CollegeType {
  const t = raw.trim().toLowerCase();
  if (t === "government" || t === "gov") return "government";
  if (t === "aiims") return "aiims";
  if (t === "deemed") return "deemed";
  return "private";
}

function lineAmount(
  items: CollegeCatalogRow["feeSchedules"][number]["lineItems"],
  component: string,
  seatType = "",
  category = "",
): { amount: number; currency: string } {
  const row = items.find(
    (i) =>
      i.component === component &&
      i.seatType === seatType &&
      i.category === category,
  );
  if (!row) return { amount: 0, currency: "INR" };
  return {
    amount: decimalToNumber(row.amount),
    currency: row.currency || "INR",
  };
}

function buildFees(row: CollegeCatalogRow): CollegeFees {
  const latestSchedule = [...row.feeSchedules].sort(
    (a, b) => b.academicYear - a.academicYear,
  )[0];
  if (!latestSchedule) {
    return {
      tuition: 0,
      hostel: 0,
      misc: 0,
      totalAnnual: 0,
      totalCourse: 0,
    };
  }

  const items = latestSchedule.lineItems;
  const gq = lineAmount(items, "tuition", "GQ");
  const mq = lineAmount(items, "tuition", "MQ");
  const nri = lineAmount(items, "tuition", "NRI");
  const hostel = lineAmount(items, "hostel");
  const mess = lineAmount(items, "mess");
  const university = lineAmount(items, "university");
  const transport = lineAmount(items, "transport");
  const exam = lineAmount(items, "exam");

  const misc = mess.amount + university.amount + transport.amount + exam.amount;
  const hostelTotal = hostel.amount;

  let quotaBreakdown: QuotaFeeBreakdown | undefined;
  if (gq.amount > 0 || mq.amount > 0 || nri.amount > 0) {
    quotaBreakdown = {
      govtQuotaAnnualInr: gq.amount,
      managementQuotaAnnualInr: mq.amount,
    };
    if (nri.amount > 0) {
      quotaBreakdown.nri = {
        amount: nri.amount,
        currency: (nri.currency === "USD" ? "USD" : "INR") as FeeCurrency,
      };
    }
  }

  const tuition = mq.amount > 0 ? mq.amount : gq.amount > 0 ? gq.amount : 0;
  const totalAnnual = tuition + hostelTotal + misc;
  const totalCourse = totalAnnual * 5;

  return {
    tuition,
    hostel: hostelTotal,
    misc,
    totalAnnual,
    totalCourse,
    quotaBreakdown,
  };
}

function counsellingQuotaField(
  cutoff: CollegeCatalogRow["cutoffs"][number],
): string {
  const raw = (cutoff as { quota?: string }).quota;
  return typeof raw === "string" ? raw : "";
}

function counsellingQuotaLabel(quota: string): string | null {
  const q = quota.trim();
  if (!q) return null;
  if (q === "GQ") return "General Quota";
  if (q.endsWith(" Quota")) return q;
  return q;
}

function seatTypeToQuotaLabel(
  seatType: string,
  stateSlug: string,
  counsellingQuota?: string,
): string {
  const quotaLabel = counsellingQuotaLabel(counsellingQuota ?? "");
  if (quotaLabel) return quotaLabel;

  const st = seatType.trim().toUpperCase();
  if (st === "MQ") return "Management Quota";
  if (st === "NRI" || st === "NQ") return "NRI Quota";
  if (st === "PH") return "PwD Quota";
  if (st === "GEN") return "General Seat (State)";
  if (st === "GOVT") return "Government Seat";
  if (st === "AIQ") return "All India Quota";
  if (st === "GQ") return "State Quota";
  if (stateSlug === "gujarat") return "Gujarat State Quota";
  const stateLabel = stateSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return `${stateLabel} State Quota`;
}

function buildCutoffs(row: CollegeCatalogRow): CollegeCutoff[] {
  const bestByKey = new Map<string, CollegeCutoff>();

  for (const c of row.cutoffs) {
    const closingAir = c.closingRankAir;
    if (closingAir == null) continue;

    const category = counsellingCategoryToNeet(c.category);
    const counsellingQuota = counsellingQuotaField(c);
    const quota = seatTypeToQuotaLabel(
      c.seatType,
      row.stateSlug,
      counsellingQuota,
    );
    const key = `${c.year}|${quota}|${category ?? ""}|${c.seatType}|${c.category}|${counsellingQuota}|${c.admissionRound}`;
    const existing = bestByKey.get(key);
    if (existing && closingAir >= existing.rank) continue;

    bestByKey.set(key, {
      year: c.year,
      rank: closingAir,
      quota,
      round: c.admissionRound,
      closingRank: closingAir,
      ...(c.openingRankAir != null ? { openingRank: c.openingRankAir } : {}),
      ...(c.openingStateMeritRank != null
        ? { stateOpeningRank: Number(c.openingStateMeritRank) }
        : {}),
      ...(c.closingStateMeritRank != null
        ? { stateClosingRank: Number(c.closingStateMeritRank) }
        : {}),
      ...(category ? { category } : {}),
    });
  }

  return [...bestByKey.values()].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return a.rank - b.rank;
  });
}

function resolveSeatSnapshotFields(row: CollegeCatalogRow): {
  seatMatrix?: CollegeSeatMatrix;
  quotaInfo: string;
  seatCount: number;
} {
  const latest = pickLatestSeatSnapshot(row.seatSnapshots);
  if (latest) {
    const seatMatrix = buildSeatMatrixFromSnapshot(latest);
    if (seatMatrixHasQuotaOrCategoryData(seatMatrix)) {
      return {
        seatMatrix,
        quotaInfo: quotaInfoFromSeatMatrix(seatMatrix),
        seatCount: latest.totalSeats > 0 ? latest.totalSeats : row.seatCount,
      };
    }
  }
  return {
    quotaInfo: row.quotaInfo.trim(),
    seatCount: row.seatCount,
  };
}

export function assembleCollegeRecord(row: CollegeCatalogRow): CollegeRecord {
  const fees = buildFees(row);
  const cutoffs = buildCutoffs(row);
  const feeItems = row.feeSchedules.flatMap((s) => s.lineItems);
  const nriLine =
    feeItems.find((i) => i.component === "tuition" && i.seatType === "NRI") ??
    feeItems.find(
      (i) => i.component === "nri_tuition_usd" && i.currency === "USD",
    );

  const dataQuality = buildDataQualityFlags({
    stateSlug: row.stateSlug,
    hasFeeSchedule: row.feeSchedules.length > 0,
    hasSeatSnapshot: row.seatSnapshots.length > 0,
    cutoffYears: [...new Set(row.cutoffs.map((c) => c.year))],
    nriFeeUsd: nriLine?.currency === "USD",
    seatSnapshotCount: row.seatSnapshots.length,
  });

  const bondNote =
    row.bondNote ??
    (row.bondYears > 0 || row.bondPenalty > 0
      ? undefined
      : "Bond data not available in source dataset.");

  const { seatMatrix, quotaInfo, seatCount } = resolveSeatSnapshotFields(row);

  return {
    slug: row.slug,
    name: row.name,
    stateSlug: row.stateSlug,
    city: row.city ?? "",
    collegeType: parseCollegeType(row.collegeType),
    seatCount,
    quotaInfo,
    ...(seatMatrix ? { seatMatrix } : {}),
    fees,
    cutoffs,
    bond: {
      years: row.bondYears,
      penalty: row.bondPenalty,
      ...(bondNote ? { note: bondNote } : {}),
    },
    infrastructure: {
      beds: row.bedCount,
      patientFlowPerDay: row.patientFlowPerDay,
      facilities: row.facilities,
    },
    reviews: {
      pros: [...DEFAULT_REVIEWS.pros],
      cons: [...DEFAULT_REVIEWS.cons],
    },
    roiScore: row.roiScore,
    ...(row.nirfMedicalRank != null
      ? {
          nirfMedicalRank: row.nirfMedicalRank,
          ...(row.nirfMedicalScore != null
            ? { nirfMedicalScore: decimalToNumber(row.nirfMedicalScore) }
            : {}),
          ...(row.nirfRankingYear != null
            ? { nirfRankingYear: row.nirfRankingYear }
            : {}),
          ...(row.nirfInstitutionId
            ? { nirfInstitutionId: row.nirfInstitutionId }
            : {}),
        }
      : {}),
    ...(dataQuality.length ? { dataQuality } : {}),
  };
}
