import type { Prisma } from "@prisma/client";
import type {
  CollegeFees,
  CollegeRecord,
  CollegeType,
  FeeCurrency,
  QuotaFeeBreakdown,
} from "@/types/college";
import type { CollegeCutoff } from "@/types/college";
import { counsellingCategoryToNeet } from "@/lib/catalog/map-category";
import { buildDataQualityFlags } from "@/lib/catalog/data-quality";

export type CollegeCatalogRow = Prisma.CollegeGetPayload<{
  include: {
    cutoffs: true;
    feeSchedules: { include: { lineItems: true } };
    seatSnapshots: { include: { buckets: true } };
  };
}>;

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
  category = ""
): { amount: number; currency: string } {
  const row = items.find(
    (i) =>
      i.component === component &&
      i.seatType === seatType &&
      i.category === category
  );
  if (!row) return { amount: 0, currency: "INR" };
  return {
    amount: decimalToNumber(row.amount),
    currency: row.currency || "INR",
  };
}

function buildFees(row: CollegeCatalogRow): CollegeFees {
  const latestSchedule = [...row.feeSchedules].sort(
    (a, b) => b.academicYear - a.academicYear
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

  const misc =
    mess.amount + university.amount + transport.amount + exam.amount;
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

  const tuition =
    mq.amount > 0 ? mq.amount : gq.amount > 0 ? gq.amount : 0;
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

function seatTypeToQuotaLabel(
  seatType: string,
  stateSlug: string
): string {
  const st = seatType.trim().toUpperCase();
  if (st === "MQ") return "Management Quota";
  if (st === "NRI" || st === "NQ") return "NRI Quota";
  if (st === "PH") return "PwD Quota";
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
    if (c.closingRankAir == null) continue;
    const category = counsellingCategoryToNeet(c.category);
    const quota = seatTypeToQuotaLabel(c.seatType, row.stateSlug);
    const key = `${c.year}|${quota}|${category ?? ""}|${c.seatType}|${c.category}`;
    const existing = bestByKey.get(key);
    if (!existing || c.closingRankAir < existing.rank) {
      bestByKey.set(key, {
        year: c.year,
        rank: c.closingRankAir,
        quota,
        ...(category ? { category } : {}),
      });
    }
  }

  return [...bestByKey.values()].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return a.rank - b.rank;
  });
}

function buildQuotaInfoFromSeats(row: CollegeCatalogRow): string {
  if (row.quotaInfo.trim()) return row.quotaInfo;
  const latest = [...row.seatSnapshots].sort(
    (a, b) => b.academicYear - a.academicYear
  )[0];
  if (!latest) return "";

  const bucket = (code: string) =>
    latest.buckets.find((b) => b.bucketCode === code)?.seatCount ?? 0;

  const parts: string[] = [];
  const aiq = bucket("aiq");
  const stateQ = bucket("state_quota");
  if (aiq > 0) parts.push(`AIQ ${aiq}`);
  if (stateQ > 0) parts.push(`State ${stateQ}`);
  const open = bucket("open");
  if (open > 0) parts.push(`Open ${open}`);
  for (const [code, label] of [
    ["sc", "SC"],
    ["st", "ST"],
    ["sebc", "SEBC"],
    ["ews", "EWS"],
  ] as const) {
    const n = bucket(code);
    if (n > 0) parts.push(`${label} ${n}`);
  }
  return parts.join(" / ");
}

export function assembleCollegeRecord(row: CollegeCatalogRow): CollegeRecord {
  const fees = buildFees(row);
  const cutoffs = buildCutoffs(row);
  const nriLine = row.feeSchedules
    .flatMap((s) => s.lineItems)
    .find((i) => i.component === "tuition" && i.seatType === "NRI");

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

  return {
    slug: row.slug,
    name: row.name,
    stateSlug: row.stateSlug,
    city: row.city ?? "",
    collegeType: parseCollegeType(row.collegeType),
    seatCount: row.seatCount,
    quotaInfo: buildQuotaInfoFromSeats(row),
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
