import type { Prisma } from "@prisma/client";
import type {
  CollegeFees,
  CollegeRecord,
  CollegeSeatMatrix,
  CollegeType,
  FeeCurrency,
  QuotaFeeBreakdown,
  StateFeeScheduleRow,
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

function parseCollegeType(raw: string, name: string): CollegeType {
  const t = raw.trim().toLowerCase();
  if (name.toLowerCase().includes("gmers")) return "semi-government";
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
  const match = (st: string, cat: string) =>
    items.find(
      (i) =>
        i.component === component &&
        i.seatType === st &&
        i.category === cat,
    );
  const row =
    match(seatType, category) ??
    (seatType === "GQ" && category === ""
      ? match("", category)
      : undefined);
  if (!row) return { amount: 0, currency: "INR" };
  return {
    amount: decimalToNumber(row.amount),
    currency: row.currency || "INR",
  };
}

function mpFeeTypeLabel(seatType: string): string {
  if (seatType === "NRI") return "NRI";
  if (seatType === "SCH") return "Scholarship";
  return "Regular";
}

function buildMpFees(
  items: CollegeCatalogRow["feeSchedules"][number]["lineItems"],
): CollegeFees {
  const rows = new Map<string, StateFeeScheduleRow>();

  for (const item of items) {
    const key = `${item.seatType}|${item.category}`;
    let row = rows.get(key);
    if (!row) {
      row = {
        feeType: mpFeeTypeLabel(item.seatType),
        ...(item.category ? { category: item.category } : {}),
        totalAnnual: 0,
      };
      rows.set(key, row);
    }
    const amount = decimalToNumber(item.amount);
    if (item.component === "tuition") row.tuition = amount;
    if (item.component === "development") row.development = amount;
    if (item.component === "caution") row.caution = amount;
    if (item.component === "mmvy_scholarship") row.mmvyScholarship = amount;
    if (item.component === "total") row.totalAnnual = amount;
  }

  for (const row of rows.values()) {
    if (row.totalAnnual <= 0) {
      const annual =
        (row.tuition ?? 0) +
        (row.development ?? 0) -
        (row.mmvyScholarship ?? 0);
      const oneTime = row.caution ?? 0;
      row.totalAnnual = annual + oneTime;
    }
  }

  const stateFeeSchedule = [...rows.values()].sort((a, b) => {
    const typeCmp = a.feeType.localeCompare(b.feeType);
    if (typeCmp !== 0) return typeCmp;
    return (a.category ?? "").localeCompare(b.category ?? "");
  });

  const regOpen = stateFeeSchedule.find(
    (r) => r.feeType === "Regular" && !r.category,
  );
  const nriRow = stateFeeSchedule.find((r) => r.feeType === "NRI");

  const headlineTotal = regOpen?.totalAnnual ?? 0;
  const tuition = regOpen?.tuition ?? headlineTotal;

  let quotaBreakdown: QuotaFeeBreakdown | undefined;
  if (regOpen && (regOpen.tuition || regOpen.totalAnnual)) {
    quotaBreakdown = {
      govtQuotaAnnualInr: regOpen.tuition ?? regOpen.totalAnnual,
      managementQuotaAnnualInr: 0,
    };
    if (nriRow && nriRow.totalAnnual > 0) {
      quotaBreakdown.nri = { amount: nriRow.totalAnnual, currency: "INR" };
    }
  } else if (nriRow && nriRow.totalAnnual > 0) {
    quotaBreakdown = {
      govtQuotaAnnualInr: 0,
      managementQuotaAnnualInr: 0,
      nri: { amount: nriRow.totalAnnual, currency: "INR" },
    };
  }

  const misc =
    (regOpen?.development ?? 0) +
    (regOpen?.caution ?? 0) +
    (nriRow?.caution ?? 0);

  return {
    tuition,
    hostel: 0,
    misc,
    totalAnnual: headlineTotal || tuition,
    totalCourse: (headlineTotal || tuition) * 5,
    quotaBreakdown,
    stateFeeSchedule,
  };
}

function mhSeatTypeMeta(seatType: string): {
  feeType: string;
  gender?: string;
} {
  if (seatType === "GOVT_M") return { feeType: "Govt", gender: "Male" };
  if (seatType === "GOVT_F") return { feeType: "Govt", gender: "Female" };
  if (seatType === "PVT") return { feeType: "Private" };
  if (seatType === "NRI") return { feeType: "NRI" };
  return { feeType: seatType };
}

function buildMhFees(
  items: CollegeCatalogRow["feeSchedules"][number]["lineItems"],
): CollegeFees {
  const rows = new Map<string, StateFeeScheduleRow>();

  for (const item of items) {
    const key = `${item.seatType}|${item.category}`;
    let row = rows.get(key);
    if (!row) {
      const meta = mhSeatTypeMeta(item.seatType);
      row = {
        feeType: meta.feeType,
        ...(item.category ? { category: item.category } : {}),
        ...(meta.gender ? { gender: meta.gender } : {}),
        totalAnnual: 0,
      };
      rows.set(key, row);
    }
    const amount = decimalToNumber(item.amount);
    if (item.component === "tuition") row.tuition = amount;
    if (item.component === "development") row.development = amount;
    if (item.component === "library") row.tuition = (row.tuition ?? 0) + amount;
    if (item.component === "gymkhana") {
      row.development = (row.development ?? 0) + amount;
    }
    if (item.component === "admission" || item.component === "library_deposit") {
      row.caution = (row.caution ?? 0) + amount;
    }
    if (item.component === "total") row.totalAnnual = amount;
    if (item.component === "nri_tuition" && amount > 0) {
      row.totalAnnual = amount;
    }
  }

  for (const row of rows.values()) {
    if (row.totalAnnual <= 0) {
      row.totalAnnual =
        (row.tuition ?? 0) +
        (row.development ?? 0) +
        (row.caution ?? 0);
    }
  }

  const stateFeeSchedule = [...rows.values()].sort((a, b) => {
    const t = a.feeType.localeCompare(b.feeType);
    if (t !== 0) return t;
    const c = (a.category ?? "").localeCompare(b.category ?? "");
    if (c !== 0) return c;
    return (a.gender ?? "").localeCompare(b.gender ?? "");
  });

  const govtOpenMale = stateFeeSchedule.find(
    (r) =>
      r.feeType === "Govt" &&
      r.gender === "Male" &&
      r.category === "Open",
  );
  const privateRow = stateFeeSchedule.find((r) => r.feeType === "Private");
  const nriRow = stateFeeSchedule.find((r) => r.feeType === "NRI");

  const headline =
    privateRow?.totalAnnual ??
    govtOpenMale?.totalAnnual ??
    stateFeeSchedule[0]?.totalAnnual ??
    0;
  const tuition =
    privateRow?.tuition ??
    govtOpenMale?.tuition ??
    headline;

  let quotaBreakdown: QuotaFeeBreakdown | undefined;
  if (privateRow && privateRow.totalAnnual > 0) {
    quotaBreakdown = {
      govtQuotaAnnualInr: privateRow.tuition ?? privateRow.totalAnnual,
      managementQuotaAnnualInr: 0,
    };
    if (nriRow && nriRow.totalAnnual > 0) {
      quotaBreakdown.nri = {
        amount: nriRow.totalAnnual,
        currency: "INR",
      };
    }
  } else if (govtOpenMale && govtOpenMale.totalAnnual > 0) {
    quotaBreakdown = {
      govtQuotaAnnualInr: govtOpenMale.tuition ?? govtOpenMale.totalAnnual,
      managementQuotaAnnualInr: 0,
    };
  }

  return {
    tuition,
    hostel: 0,
    misc: (govtOpenMale?.caution ?? 0) + (privateRow?.caution ?? 0),
    totalAnnual: headline,
    totalCourse: headline * 5,
    quotaBreakdown,
    stateFeeSchedule,
  };
}

function buildFees(row: CollegeCatalogRow): CollegeFees {
  const latestSchedule = [...row.feeSchedules].sort((a, b) => {
    if (b.academicYear !== a.academicYear) {
      return b.academicYear - a.academicYear;
    }
    const rank = (source: string) =>
      source === "mcc_fee_csv" ? 2 : source === "mcc_dump" ? 1 : 0;
    return rank(b.source) - rank(a.source);
  })[0];
  if (!latestSchedule) {
    return {
      tuition: 0,
      hostel: 0,
      misc: 0,
      totalAnnual: 0,
      totalCourse: 0,
    };
  }

  if (row.stateSlug === "madhya-pradesh") {
    return buildMpFees(latestSchedule.lineItems);
  }

  if (row.stateSlug === "maharashtra") {
    return buildMhFees(latestSchedule.lineItems);
  }

  const items = latestSchedule.lineItems;
  const gqTuition = lineAmount(items, "tuition", "GQ");
  const gqTotal = lineAmount(items, "total", "GQ");
  const mq = lineAmount(items, "tuition", "MQ");
  const nriTuition = lineAmount(items, "tuition", "NRI");
  const nriComponent =
    items.find(
      (i) =>
        i.seatType === "NRI" &&
        (i.component === "nri_tuition" ||
          i.component === "nri_tuition_annual" ||
          i.component === "foreign_tuition"),
    ) ?? null;
  const hostel = lineAmount(items, "hostel");
  const mess = lineAmount(items, "mess");
  const university = lineAmount(items, "university");
  const transport = lineAmount(items, "transport");
  const exam = lineAmount(items, "exam");

  const misc = mess.amount + university.amount + transport.amount + exam.amount;
  const hostelTotal = hostel.amount;

  const govtHeadline = gqTuition.amount > 0 ? gqTuition.amount : gqTotal.amount;
  const nriAmount = nriTuition.amount > 0 ? nriTuition.amount : nriComponent ? decimalToNumber(nriComponent.amount) : 0;
  const nriCurrency = nriTuition.amount > 0 ? nriTuition.currency : nriComponent?.currency ?? "INR";

  let quotaBreakdown: QuotaFeeBreakdown | undefined;
  if (govtHeadline > 0 || mq.amount > 0 || nriAmount > 0) {
    quotaBreakdown = {
      govtQuotaAnnualInr: govtHeadline,
      managementQuotaAnnualInr: mq.amount,
    };
    if (nriAmount > 0) {
      quotaBreakdown.nri = {
        amount: nriAmount,
        currency: (nriCurrency === "USD" ? "USD" : "INR") as FeeCurrency,
      };
    }
  }

  const tuition = mq.amount > 0 ? mq.amount : govtHeadline;
  const sheetTotal = gqTotal.amount > 0 ? gqTotal.amount : 0;
  const totalAnnual =
    sheetTotal > 0 ? sheetTotal : tuition + hostelTotal + misc;
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
      dbCategory: c.category,
      dbSeatType: c.seatType,
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
    ...(row.universityName ? { universityName: row.universityName } : {}),
    collegeType: parseCollegeType(row.collegeType, row.name),
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
    roiScore: null,
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
