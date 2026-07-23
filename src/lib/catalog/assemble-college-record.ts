import type { Prisma } from "@prisma/client";
import type {
  CollegeFees,
  CollegeRecord,
  CollegeSeatMatrix,
  CollegeType,
  QuotaFeeBreakdown,
  StateFeeScheduleRow,
} from "@/types/college";
import { MCC_AIQ_BUCKET_CODES } from "@/lib/colleges/mcc-config";
import {
  buildMccSeatMatrixFromSnapshot,
  buildSeatMatrixFromSnapshot,
  pickLatestAcademicYear,
  pickSeatSnapshot,
  quotaInfoFromSeatMatrix,
  seatMatrixHasQuotaOrCategoryData,
  type SeatSnapshotWithBuckets,
} from "@/lib/catalog/seat-matrix-from-snapshot";
import type { CollegeCutoff } from "@/types/college";
import { counsellingCategoryToNeet } from "@/lib/catalog/map-category";
import { buildDataQualityFlags } from "@/lib/catalog/data-quality";
import {
  isMccFactSource,
  isStateFactSource,
  pickPreferredMccSourceForState,
  pickPreferredStateSource,
} from "@/lib/colleges/counselling-source";
import { getSeatsIncreased2026 } from "@/lib/colleges/seats-increased-2026";
import {
  keaPoolFromSeatType,
  resolveCounsellingPool,
  type CounsellingPool,
} from "@/lib/colleges/counselling-pool";
import {
  isMccFeeScheduleSource,
  isStateDumpFeeSource,
  KARNATAKA_DUMP_SOURCE,
  KARNATAKA_DUMP_SOURCE_LEGACY,
  MCC_FEE_DUMP_SOURCE,
  stateDumpSourceForSlug,
  UP_DUMP_SOURCE,
  UP_DUMP_SOURCE_LEGACY,
} from "@/lib/colleges/fee-source";
import { normalizeFeeCurrency } from "@/lib/colleges/fee-currency";

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
  if (t === "semi-government" || t === "semi_government" || t === "semi-govt")
    return "semi-government";
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
        i.component === component && i.seatType === st && i.category === cat,
    );
  const row =
    match(seatType, category) ??
    (seatType === "GQ" && category === "" ? match("", category) : undefined);
  if (!row) return { amount: 0, currency: "INR" };
  return {
    amount: decimalToNumber(row.amount),
    currency: normalizeFeeCurrency(row.currency),
  };
}

/**
 * Pick a component amount preferring state/GQ seat types so shared hostel /
 * security rows attached to GQ/MQ/NRI are not missed (and not triple-counted).
 */
function lineAmountPreferred(
  items: CollegeCatalogRow["feeSchedules"][number]["lineItems"],
  component: string,
  preferredSeatTypes: string[] = ["GQ", "", "MQ", "NRI"],
): { amount: number; currency: string } {
  for (const st of preferredSeatTypes) {
    // Prefer blank category first (shared charges), then any category on that seat.
    const blank = lineAmount(items, component, st, "");
    if (blank.amount > 0) return blank;
    const any = items.find(
      (i) => i.component === component && i.seatType === st,
    );
    if (any && decimalToNumber(any.amount) > 0) {
      return {
        amount: decimalToNumber(any.amount),
        currency: normalizeFeeCurrency(any.currency),
      };
    }
  }
  const fallback = items.find((i) => i.component === component);
  if (!fallback) return { amount: 0, currency: "INR" };
  return {
    amount: decimalToNumber(fallback.amount),
    currency: normalizeFeeCurrency(fallback.currency),
  };
}

/**
 * Sum distinct one-time / misc components that may share a preferred seat type
 * (e.g. Uttarakhand uniform + alumni + vaccination under GQ).
 */
function sumPreferredComponents(
  items: CollegeCatalogRow["feeSchedules"][number]["lineItems"],
  components: string[],
): number {
  let total = 0;
  for (const component of components) {
    total += lineAmountPreferred(items, component).amount;
  }
  return total;
}

/**
 * MP `mp_dump` fees are category-keyed (seat_type usually empty):
 *   category "regular" | "scholarship" | "nri" | "regular|OBC" | …
 * Legacy rows may still use seat_type REG/SCH/NRI.
 */
function mpFeeRowMeta(
  seatType: string,
  category: string,
): { feeType: string; category?: string; isNri: boolean } {
  const st = seatType.trim().toUpperCase();
  if (st === "NRI") return { feeType: "NRI", isNri: true };
  if (st === "SCH") return { feeType: "Scholarship", isNri: false };
  if (st === "REG" || st === "REGULAR") {
    return {
      feeType: "Regular",
      ...(category ? { category } : {}),
      isNri: false,
    };
  }
  if (st) {
    return {
      feeType: "Regular",
      ...(category ? { category } : {}),
      isNri: false,
    };
  }

  const raw = category.trim();
  if (!raw) return { feeType: "Regular", isNri: false };

  const [typePart, ...rest] = raw.split("|");
  const typeLower = typePart.toLowerCase();
  const subCategory = rest.join("|").trim() || undefined;

  if (typeLower === "nri") {
    return {
      feeType: "NRI",
      ...(subCategory ? { category: subCategory } : {}),
      isNri: true,
    };
  }
  if (typeLower === "scholarship" || typeLower === "sch") {
    return {
      feeType: "Scholarship",
      ...(subCategory ? { category: subCategory } : {}),
      isNri: false,
    };
  }
  if (typeLower === "regular" || typeLower === "reg") {
    return {
      feeType: "Regular",
      ...(subCategory ? { category: subCategory } : {}),
      isNri: false,
    };
  }

  return {
    feeType: typePart,
    ...(subCategory ? { category: subCategory } : {}),
    isNri: false,
  };
}

function buildMpFees(
  items: CollegeCatalogRow["feeSchedules"][number]["lineItems"],
): CollegeFees {
  const rows = new Map<string, StateFeeScheduleRow>();

  for (const item of items) {
    const key = `${item.seatType}|${item.category}`;
    let row = rows.get(key);
    if (!row) {
      const meta = mpFeeRowMeta(item.seatType, item.category);
      row = {
        feeType: meta.feeType,
        ...(meta.category ? { category: meta.category } : {}),
        totalAnnual: 0,
      };
      rows.set(key, row);
    }
    const amount = decimalToNumber(item.amount);
    if (item.component === "tuition") row.tuition = amount;
    // Dump stores development_fees as `university` for some MP private rows.
    if (item.component === "development" || item.component === "university") {
      row.development = amount;
    }
    if (item.component === "caution") row.caution = amount;
    // Dump uses `scholarship`; older seeds may use `mmvy_scholarship`.
    if (
      item.component === "mmvy_scholarship" ||
      item.component === "scholarship"
    ) {
      row.mmvyScholarship = amount;
    }
    if (item.component === "total") row.totalAnnual = amount;
    if (
      item.seatType.toUpperCase() === "NRI" ||
      item.category.trim().toLowerCase() === "nri" ||
      item.category.trim().toLowerCase().startsWith("nri|")
    ) {
      row.currency = normalizeFeeCurrency(item.currency);
    }
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

  // Open Regular row (no caste sub-category like OBC/SC/ST).
  const regOpen = stateFeeSchedule.find(
    (r) => r.feeType === "Regular" && !r.category,
  );
  const nriRow = stateFeeSchedule.find((r) => r.feeType === "NRI");

  const headlineTotal = regOpen?.totalAnnual ?? 0;
  const tuition = regOpen?.tuition ?? headlineTotal;

  let quotaBreakdown: QuotaFeeBreakdown | undefined;
  if (regOpen && (regOpen.tuition || regOpen.totalAnnual)) {
    // Prefer sheet total so listing matches the DMAT schedule / detail totals.
    const gqAnnual = regOpen.totalAnnual || regOpen.tuition || 0;
    quotaBreakdown = {
      govtQuotaAnnualInr: gqAnnual,
      managementQuotaAnnualInr: 0,
    };
    if (nriRow && nriRow.totalAnnual > 0) {
      quotaBreakdown.nri = {
        amount: nriRow.totalAnnual,
        currency: normalizeFeeCurrency(nriRow.currency),
      };
    }
  } else if (nriRow && nriRow.totalAnnual > 0) {
    quotaBreakdown = {
      govtQuotaAnnualInr: 0,
      managementQuotaAnnualInr: 0,
      nri: {
        amount: nriRow.totalAnnual,
        currency: normalizeFeeCurrency(nriRow.currency),
      },
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
    if (
      item.component === "admission" ||
      item.component === "library_deposit"
    ) {
      row.caution = (row.caution ?? 0) + amount;
    }
    if (item.component === "total") row.totalAnnual = amount;
    if (item.seatType === "NRI") {
      row.currency = normalizeFeeCurrency(item.currency);
    }
    if (item.component === "nri_tuition" && amount > 0) {
      row.totalAnnual = amount;
    }
  }

  for (const row of rows.values()) {
    if (row.totalAnnual <= 0) {
      row.totalAnnual =
        (row.tuition ?? 0) + (row.development ?? 0) + (row.caution ?? 0);
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
    (r) => r.feeType === "Govt" && r.gender === "Male" && r.category === "Open",
  );
  const privateRow = stateFeeSchedule.find((r) => r.feeType === "Private");
  const nriRow = stateFeeSchedule.find((r) => r.feeType === "NRI");

  const headline =
    privateRow?.totalAnnual ??
    govtOpenMale?.totalAnnual ??
    stateFeeSchedule[0]?.totalAnnual ??
    0;
  const tuition = privateRow?.tuition ?? govtOpenMale?.tuition ?? headline;

  let quotaBreakdown: QuotaFeeBreakdown | undefined;
  if (privateRow && privateRow.totalAnnual > 0) {
    quotaBreakdown = {
      govtQuotaAnnualInr: privateRow.tuition ?? privateRow.totalAnnual,
      managementQuotaAnnualInr: 0,
    };
    if (nriRow && nriRow.totalAnnual > 0) {
      quotaBreakdown.nri = {
        amount: nriRow.totalAnnual,
        currency: normalizeFeeCurrency(nriRow.currency),
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

/**
 * Karnataka fee builder.
 *
 * Source data has one row per KEA category code:
 *   tuition | GQ | OPN  → OPN annual fee
 *   tuition | GQ | GMP  → GMP annual fee
 *   tuition | NRI | NRI → NRI annual fee
 *   tuition | MQ | OTH  → OTH (management) annual fee
 *
 * The amounts in karnataka_fees_data are already annual fees.
 * We build a `stateFeeSchedule` row for each category with a friendly label.
 * `totalAnnual` on CollegeFees is set to the GMP/OPN annual fee as the headline.
 */
const KARNATAKA_FEE_LABEL: Record<string, string> = {
  OPN: "Open / All India (OPN)",
  GMP: "Govt Merit Private (GMP)",
  GMPH: "GMP + HK Region (GMPH)",
  OTH: "Management / Deemed (OTH)",
  NRI: "NRI / OCI Quota",
  MU: "Minority Unreserved (MU)",
  MM: "Muslim Minority (MM)",
  MMH: "Muslim Minority + HK (MMH)",
  ME: "Christian Minority (ME)",
  MEH: "Christian Minority + HK (MEH)",
  MA: "Linguistic Minority (MA)",
  MC: "Catholic Minority (MC)",
  RC1: "Catholic Reserved RC1",
  RC2: "Catholic Reserved RC2",
  RC3: "Catholic Reserved RC3",
  RC4: "Catholic Reserved RC4",
  RC5: "Catholic Reserved RC5",
  RC6: "Catholic Reserved RC6",
  RC7: "Catholic Reserved RC7",
  RC8: "Catholic Reserved RC8",
};

function buildKarnatakaFees(
  items: CollegeCatalogRow["feeSchedules"][number]["lineItems"],
): CollegeFees {
  // Build one StateFeeScheduleRow per unique category code
  const seenKeys = new Set<string>();
  const rows: StateFeeScheduleRow[] = [];

  for (const item of items) {
    if (item.component !== "tuition") continue;
    if (item.seatType === "AIQ") continue;
    const cat = (item.category ?? "").toUpperCase() || (item.seatType ?? "");
    if (!cat || seenKeys.has(cat)) continue;
    seenKeys.add(cat);

    const annualFee = decimalToNumber(item.amount);
    const label = KARNATAKA_FEE_LABEL[cat] ?? cat;

    rows.push({
      feeType: label,
      category: cat,
      totalAnnual: annualFee,
      tuition: annualFee,
      currency: normalizeFeeCurrency(item.currency),
      counsellingPool: keaPoolFromSeatType(item.seatType),
    });
  }

  // Sort: state quota rows first (GMP, OPN), then NRI/OTH, then minority
  const PRIORITY: Record<string, number> = {
    OPN: 0,
    GMP: 1,
    GMPH: 2,
    OTH: 3,
    NRI: 4,
  };
  rows.sort((a, b) => {
    const pa = PRIORITY[a.feeType.split(" ")[0]] ?? 5;
    const pb = PRIORITY[b.feeType.split(" ")[0]] ?? 5;
    if (pa !== pb) return pa - pb;
    return a.feeType.localeCompare(b.feeType);
  });

  // Headline: prefer GMP, else OPN, else first row
  const gmpRow = rows.find(
    (r) => r.feeType.includes("GMP") && !r.feeType.includes("GMPH"),
  );
  const opnRow = rows.find((r) => r.feeType.includes("OPN"));
  const headlineRow = gmpRow ?? opnRow ?? rows[0];
  const headlineAnnual = headlineRow?.totalAnnual ?? 0;

  const othRow = rows.find(
    (r) => r.feeType.includes("Management") || r.feeType.includes("OTH"),
  );
  const nriRow = rows.find((r) => r.feeType.includes("NRI"));

  let quotaBreakdown: QuotaFeeBreakdown | undefined;
  if (
    headlineAnnual > 0 ||
    (othRow && othRow.totalAnnual > 0) ||
    (nriRow && nriRow.totalAnnual > 0)
  ) {
    quotaBreakdown = {
      govtQuotaAnnualInr: headlineAnnual,
      managementQuotaAnnualInr: othRow?.totalAnnual ?? 0,
    };
    if (nriRow && nriRow.totalAnnual > 0) {
      quotaBreakdown.nri = {
        amount: nriRow.totalAnnual,
        currency: normalizeFeeCurrency(nriRow.currency),
      };
    }
  }

  return {
    tuition: headlineAnnual,
    hostel: 0,
    misc: 0,
    totalAnnual: headlineAnnual,
    totalCourse: headlineAnnual * 5,
    quotaBreakdown,
    stateFeeSchedule: rows,
  };
}

/**
 * UP fee builder.
 *
 * Source rows (from up_fees_data / up_colleges_data.xlsx):
 *   tuition | annual tuition
 *   hostel_ac | annual AC hostel
 *   hostel_nonac | annual non-AC hostel
 *   security_deposit | one-time deposit
 *   misc | other annual charges
 */
function buildUpFees(
  items: CollegeCatalogRow["feeSchedules"][number]["lineItems"],
): CollegeFees {
  const tuition = lineAmountPreferred(items, "tuition").amount;
  const hostelAc = lineAmountPreferred(items, "hostel_ac").amount;
  const hostelNonAc = lineAmountPreferred(items, "hostel_nonac").amount;
  const securityDeposit = lineAmountPreferred(items, "security_deposit").amount;
  const misc =
    lineAmountPreferred(items, "misc").amount ||
    lineAmountPreferred(items, "other").amount;

  const totalAnnual = tuition + hostelAc + hostelNonAc + misc;
  const totalCourse = totalAnnual * 5;

  return {
    tuition,
    hostel: hostelAc + hostelNonAc,
    misc,
    totalAnnual,
    totalCourse,
    hostelAcFees: hostelAc,
    hostelNonAcFees: hostelNonAc,
    securityDeposit,
  };
}

/** Append MCC AIQ / ESIC fee rows when those seat types exist in a state schedule. */
function mergeMccAiqFees(
  fees: CollegeFees,
  stateItems: CollegeCatalogRow["feeSchedules"][number]["lineItems"],
): CollegeFees {
  let next = fees;
  const existing = () => next.stateFeeSchedule ?? [];

  const aiqItems = stateItems.filter((i) => i.seatType === "AIQ");
  if (
    aiqItems.length > 0 &&
    !existing().some((r) => r.feeType.startsWith("MCC AIQ"))
  ) {
    const totalItem = aiqItems.find((i) => i.component === "total");
    const tuitionItem = aiqItems.find((i) => i.component === "tuition");
    const headline = totalItem
      ? decimalToNumber(totalItem.amount)
      : tuitionItem
        ? decimalToNumber(tuitionItem.amount)
        : 0;
    if (headline > 0) {
      next = {
        ...next,
        stateFeeSchedule: [
          ...existing(),
          {
            feeType: "MCC AIQ (Annual)",
            totalAnnual: headline,
            tuition: tuitionItem
              ? decimalToNumber(tuitionItem.amount)
              : headline,
            counsellingPool: "mcc-aiq",
          },
        ],
      };
    }
  }

  const esicItems = stateItems.filter(
    (i) =>
      i.seatType === "ESIC" ||
      i.seatType === "ESI" ||
      (i.category ?? "").toUpperCase().includes("ESIC") ||
      (i.category ?? "").toUpperCase().includes("ESI"),
  );
  if (
    esicItems.length > 0 &&
    !existing().some(
      (r) =>
        r.counsellingPool === "mcc-esic" ||
        r.feeType.toUpperCase().includes("ESIC"),
    )
  ) {
    const totalItem = esicItems.find((i) => i.component === "total");
    const tuitionItem = esicItems.find((i) => i.component === "tuition");
    const headline = totalItem
      ? decimalToNumber(totalItem.amount)
      : tuitionItem
        ? decimalToNumber(tuitionItem.amount)
        : 0;
    if (headline > 0) {
      next = {
        ...next,
        stateFeeSchedule: [
          ...existing(),
          {
            feeType: "MCC ESIC / IP (Annual)",
            totalAnnual: headline,
            tuition: tuitionItem
              ? decimalToNumber(tuitionItem.amount)
              : headline,
            counsellingPool: "mcc-esic",
          },
        ],
      };
    }
  }

  return next;
}

function emptyCollegeFees(): CollegeFees {
  return {
    tuition: 0,
    hostel: 0,
    misc: 0,
    totalAnnual: 0,
    totalCourse: 0,
  };
}

/** Multi-year / aggregate MCC components — not part of annual misc. */
const MCC_CSV_NON_ANNUAL_COMPONENTS = new Set(["total", "hostel_total"]);

/**
 * Build MCC fees as a simple Tuition / Hostel / Miscellaneous headline.
 * Registration, caution, lab, student union, etc. roll into `misc`.
 * Only NRI remains as a separate schedule row for the fees panel.
 */
function buildMccFeeCsvFees(
  items: CollegeCatalogRow["feeSchedules"][number]["lineItems"],
): CollegeFees {
  const nriRows: StateFeeScheduleRow[] = [];
  const esicRows: StateFeeScheduleRow[] = [];
  let tuition = 0;
  let hostel = 0;
  let misc = 0;

  for (const item of items) {
    const amount = decimalToNumber(item.amount);
    if (amount <= 0) continue;

    if (MCC_CSV_NON_ANNUAL_COMPONENTS.has(item.component)) continue;

    if (item.seatType === "NRI" || item.component.startsWith("nri_")) {
      nriRows.push({
        feeType: "MCC NRI",
        totalAnnual: amount,
        currency: normalizeFeeCurrency(item.currency),
        counsellingPool: "mcc-nri",
        source: MCC_FEE_DUMP_SOURCE,
      });
      continue;
    }

    if (
      item.seatType === "ESIC" ||
      item.seatType === "ESI" ||
      item.component.startsWith("esic_")
    ) {
      esicRows.push({
        feeType: "MCC ESIC / IP",
        totalAnnual: amount,
        counsellingPool: "mcc-esic",
        source: MCC_FEE_DUMP_SOURCE,
      });
      continue;
    }

    if (item.component === "tuition") {
      tuition += amount;
    } else if (item.component === "hostel") {
      hostel += amount;
    } else {
      // registration, caution, laboratory, student_union, mess, other, …
      misc += amount;
    }
  }

  const totalItem = items.find((i) => i.component === "total");
  const totalAnnual = totalItem
    ? decimalToNumber(totalItem.amount)
    : tuition + misc;

  return {
    tuition,
    hostel,
    misc,
    totalAnnual,
    totalCourse: totalAnnual * 5,
    stateFeeSchedule: [...nriRows, ...esicRows],
    scheduleSource: MCC_FEE_DUMP_SOURCE,
  };
}

function tagScheduleRows(
  rows: StateFeeScheduleRow[] | undefined,
  source: string,
): StateFeeScheduleRow[] | undefined {
  if (!rows?.length) return rows;
  return rows.map((row) => ({ ...row, source: row.source ?? source }));
}

function buildStateFeesFromLineItems(
  row: CollegeCatalogRow,
  items: CollegeCatalogRow["feeSchedules"][number]["lineItems"],
): CollegeFees {
  if (!items.length) return emptyCollegeFees();

  if (row.stateSlug === "madhya-pradesh") {
    return buildMpFees(items);
  }

  if (row.stateSlug === "maharashtra") {
    return buildMhFees(items);
  }

  if (row.stateSlug === "karnataka") {
    return buildKarnatakaFees(items);
  }

  if (row.stateSlug === "uttar-pradesh") {
    return buildUpFees(items);
  }

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

  // Shared facility / one-time charges are often tagged with the same seat_type
  // as tuition (GQ/MQ/NRI). Prefer GQ so we surface them without triple-counting.
  const hostel = lineAmountPreferred(items, "hostel");
  const mess = lineAmountPreferred(items, "mess");
  const university =
    lineAmountPreferred(items, "university").amount ||
    lineAmountPreferred(items, "development").amount;
  const transport = lineAmountPreferred(items, "transport");
  const exam = lineAmountPreferred(items, "exam");
  const library = lineAmountPreferred(items, "library");
  const admission = lineAmountPreferred(items, "admission");
  const security =
    lineAmountPreferred(items, "security").amount ||
    lineAmountPreferred(items, "caution").amount;
  const other = lineAmountPreferred(items, "other").amount;
  // Uttarakhand dump extras when seeded as distinct components.
  const ukExtras = sumPreferredComponents(items, [
    "medical_exam",
    "uniform",
    "convocation",
    "alumni",
    "vaccination",
  ]);

  const messFees = mess.amount;
  const universityFees = university;
  const transportFees = transport.amount;
  const examFees = exam.amount;
  const libraryFees = library.amount;
  const admissionFees = admission.amount;
  const securityDeposit = security;
  // Residual only — named components are exposed separately via feeCharges config.
  const misc = other + ukExtras;
  const hostelTotal = hostel.amount;

  const govtHeadline = gqTuition.amount > 0 ? gqTuition.amount : gqTotal.amount;
  const nriAmount =
    nriTuition.amount > 0
      ? nriTuition.amount
      : nriComponent
        ? decimalToNumber(nriComponent.amount)
        : 0;
  const nriCurrency = normalizeFeeCurrency(
    nriTuition.amount > 0
      ? nriTuition.currency
      : (nriComponent?.currency ?? "INR"),
  );

  let quotaBreakdown: QuotaFeeBreakdown | undefined;
  if (govtHeadline > 0 || mq.amount > 0 || nriAmount > 0) {
    quotaBreakdown = {
      govtQuotaAnnualInr: govtHeadline,
      managementQuotaAnnualInr: mq.amount,
    };
    if (nriAmount > 0) {
      quotaBreakdown.nri = {
        amount: nriAmount,
        currency: nriCurrency,
      };
    }
  }

  const tuition = govtHeadline > 0 ? govtHeadline : mq.amount;
  const sheetTotal = gqTotal.amount > 0 ? gqTotal.amount : 0;
  const annualExtras =
    hostelTotal +
    messFees +
    universityFees +
    transportFees +
    examFees +
    libraryFees +
    other;
  const totalAnnual = sheetTotal > 0 ? sheetTotal : tuition + annualExtras;
  const totalCourse = totalAnnual * 5;

  return {
    tuition,
    hostel: hostelTotal,
    misc,
    totalAnnual,
    totalCourse,
    quotaBreakdown,
    ...(hostelTotal > 0 ? { hostelFees: hostelTotal } : {}),
    ...(messFees > 0 ? { messFees } : {}),
    ...(universityFees > 0 ? { universityFees } : {}),
    ...(transportFees > 0 ? { transportFees } : {}),
    ...(examFees > 0 ? { examFees } : {}),
    ...(libraryFees > 0 ? { libraryFees } : {}),
    ...(admissionFees > 0 ? { admissionFees } : {}),
    ...(securityDeposit > 0 ? { securityDeposit } : {}),
    ...(nriAmount > 0 ? { nriFees: nriAmount, nriCurrency } : {}),
  };
}

function pickStateFeeSchedules(
  latestSchedules: CollegeCatalogRow["feeSchedules"],
  stateSlug: string,
): CollegeCatalogRow["feeSchedules"] {
  const nonMcc = latestSchedules.filter(
    (s) => !isMccFeeScheduleSource(s.source),
  );
  const preferred = stateDumpSourceForSlug(stateSlug);
  if (preferred) {
    const legacyProduction = `${stateSlug}_production`;
    const exact = nonMcc.filter(
      (s) =>
        s.source === preferred ||
        s.source === legacyProduction ||
        s.source === "",
    );
    if (exact.length > 0) return exact;
  }
  return nonMcc.filter(
    (s) => s.source === "" || isStateDumpFeeSource(s.source),
  );
}

function buildFees(row: CollegeCatalogRow): CollegeFees {
  const latestYear = row.feeSchedules.length
    ? Math.max(...row.feeSchedules.map((s) => s.academicYear))
    : 0;
  const latestSchedules = row.feeSchedules.filter(
    (s) => s.academicYear === latestYear,
  );

  const mccSchedules = latestSchedules.filter((s) =>
    isMccFeeScheduleSource(s.source),
  );
  const stateSchedules = pickStateFeeSchedules(latestSchedules, row.stateSlug);

  const stateItems = stateSchedules.flatMap((s) => s.lineItems);
  const mccItems = mccSchedules.flatMap((s) => s.lineItems);

  if (!stateItems.length && !mccItems.length) {
    return emptyCollegeFees();
  }

  let fees = emptyCollegeFees();

  if (stateItems.length > 0) {
    fees = buildStateFeesFromLineItems(row, stateItems);
    const stateSource =
      stateSchedules[0]?.source || stateDumpSourceForSlug(row.stateSlug) || "";
    if (stateSource) fees.scheduleSource = stateSource;
    fees.stateFeeSchedule = tagScheduleRows(
      fees.stateFeeSchedule,
      stateSource || stateDumpSourceForSlug(row.stateSlug) || "",
    );
  }

  if (mccItems.length > 0) {
    const mccFees = buildMccFeeCsvFees(mccItems);
    const mccTagged = tagScheduleRows(
      mccFees.stateFeeSchedule,
      MCC_FEE_DUMP_SOURCE,
    );
    if (!stateItems.length) {
      fees = { ...mccFees, stateFeeSchedule: mccTagged };
    } else {
      fees.mccFeeSummary = {
        tuition: mccFees.tuition,
        hostel: mccFees.hostel,
        misc: mccFees.misc,
        totalAnnual: mccFees.totalAnnual,
        totalCourse: mccFees.totalCourse,
      };
      fees.stateFeeSchedule = [
        ...(fees.stateFeeSchedule ?? []),
        ...(mccTagged ?? []),
      ];
    }
  }

  return fees;
}

function counsellingPoolFromCutoff(
  c: CollegeCatalogRow["cutoffs"][number],
): CounsellingPool | undefined {
  const source = c.source ?? "";
  if (isMccFactSource(source)) {
    const st = c.seatType.trim().toUpperCase();
    if (st === "NRI" || st === "NQ") return "mcc-nri";
    if (st === "MQ") return "mcc-deemed";
    if (st === "ESIC" || st === "ESI") return "mcc-esic";
    return (
      resolveCounsellingPool({
        seatType: c.seatType,
        quota: c.quota,
      }) ?? "mcc-aiq"
    );
  }
  return resolveCounsellingPool({
    seatType: c.seatType,
    quota: c.quota,
  });
}

function toSeatSnapshotWithBuckets(
  snap: CollegeCatalogRow["seatSnapshots"][number],
): SeatSnapshotWithBuckets {
  return {
    academicYear: snap.academicYear,
    totalSeats: snap.totalSeats,
    buckets: snap.buckets.map((b) => ({
      bucketCode: b.bucketCode,
      seatCount: b.seatCount,
    })),
  };
}

/** Drop AIQ pools accidentally left on a state-tagged snapshot. */
function toStateOnlySeatSnapshot(
  snap: CollegeCatalogRow["seatSnapshots"][number],
): SeatSnapshotWithBuckets {
  const buckets = snap.buckets
    .filter(
      (b) => b.bucketCode !== "aiq" && !MCC_AIQ_BUCKET_CODES.has(b.bucketCode),
    )
    .map((b) => ({
      bucketCode: b.bucketCode,
      seatCount: b.seatCount,
    }));
  return {
    academicYear: snap.academicYear,
    totalSeats: snap.totalSeats,
    buckets,
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

function cutoffIsMccPool(c: CollegeCatalogRow["cutoffs"][number]): boolean {
  const pool = counsellingPoolFromCutoff(c);
  if (pool?.startsWith("mcc-")) return true;
  const st = c.seatType.trim().toUpperCase();
  const quota = (c.quota ?? "").toLowerCase();
  return (
    st === "AIQ" || quota.includes("all india") || quota.includes("open seat")
  );
}

function cutoffPassesSourceFilter(
  c: CollegeCatalogRow["cutoffs"][number],
  preferredMcc: string | undefined,
  preferredState: string | undefined,
  hasTaggedMcc: boolean,
  hasTaggedState: boolean,
): boolean {
  const source = c.source ?? "";

  if (isMccFactSource(source)) {
    return Boolean(preferredMcc && source === preferredMcc);
  }
  if (isStateFactSource(source)) {
    return Boolean(preferredState && source === preferredState);
  }
  if (source !== "") return false;

  const isMcc = cutoffIsMccPool(c);
  if (isMcc) return !hasTaggedMcc;
  return !hasTaggedState;
}

function buildCutoffs(row: CollegeCatalogRow): CollegeCutoff[] {
  const cutoffSources = [...new Set(row.cutoffs.map((c) => c.source ?? ""))];
  const preferredMcc = pickPreferredMccSourceForState(
    row.stateSlug,
    cutoffSources,
  );
  const preferredState = pickPreferredStateSource(row.stateSlug, cutoffSources);
  const hasTaggedMcc = cutoffSources.some(isMccFactSource);
  const hasTaggedState = cutoffSources.some(isStateFactSource);

  const bestByKey = new Map<string, CollegeCutoff>();

  for (const c of row.cutoffs) {
    if (
      !cutoffPassesSourceFilter(
        c,
        preferredMcc,
        preferredState,
        hasTaggedMcc,
        hasTaggedState,
      )
    ) {
      continue;
    }

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
      dbQuota: counsellingQuota || undefined,
      counsellingPool: counsellingPoolFromCutoff(c),
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
  mccSeatMatrix?: CollegeSeatMatrix;
  quotaInfo: string;
  seatCount: number;
} {
  const year = pickLatestAcademicYear(row.seatSnapshots);
  if (year <= 0) {
    return {
      quotaInfo: row.quotaInfo.trim(),
      seatCount: row.seatCount,
    };
  }

  const yearSnapshots = row.seatSnapshots.filter(
    (s) => s.academicYear === year,
  );
  const sources = yearSnapshots.map((s) => s.source);
  const stateSource = pickPreferredStateSource(row.stateSlug, sources);
  const mccSource = pickPreferredMccSourceForState(row.stateSlug, sources);

  let seatMatrix: CollegeSeatMatrix | undefined;
  let mccSeatMatrix: CollegeSeatMatrix | undefined;
  const seatCount = row.seatCount;

  if (stateSource) {
    const snap = pickSeatSnapshot(row.seatSnapshots, stateSource, year);
    if (snap) {
      const built = buildSeatMatrixFromSnapshot(
        toStateOnlySeatSnapshot(snap),
        row.stateSlug,
      );
      if (seatMatrixHasQuotaOrCategoryData(built)) {
        seatMatrix = built;
      }
    }
  }

  if (mccSource) {
    const snap = pickSeatSnapshot(row.seatSnapshots, mccSource, year);
    if (snap) {
      const built = buildMccSeatMatrixFromSnapshot(
        toSeatSnapshotWithBuckets(snap),
      );
      if (seatMatrixHasQuotaOrCategoryData(built)) {
        mccSeatMatrix = built;
      }
    }
  }

  const legacy = yearSnapshots.find((s) => s.source === "");
  if (legacy && !seatMatrix && !mccSeatMatrix) {
    const built = buildSeatMatrixFromSnapshot(
      toSeatSnapshotWithBuckets(legacy),
      row.stateSlug,
    );
    if (seatMatrixHasQuotaOrCategoryData(built)) {
      seatMatrix = built;
    }
  }

  const quotaParts: string[] = [];
  if (seatMatrix) quotaParts.push(quotaInfoFromSeatMatrix(seatMatrix));
  if (mccSeatMatrix) quotaParts.push(quotaInfoFromSeatMatrix(mccSeatMatrix));

  return {
    ...(seatMatrix ? { seatMatrix } : {}),
    ...(mccSeatMatrix ? { mccSeatMatrix } : {}),
    quotaInfo: quotaParts.join(" · ") || row.quotaInfo.trim(),
    seatCount,
  };
}

export function assembleCollegeRecord(row: CollegeCatalogRow): CollegeRecord {
  const latestYear = row.feeSchedules.length
    ? Math.max(...row.feeSchedules.map((s) => s.academicYear))
    : 0;
  const stateItems = pickStateFeeSchedules(row.feeSchedules, row.stateSlug)
    .filter(
      (s) => s.academicYear === latestYear && !isMccFeeScheduleSource(s.source),
    )
    .flatMap((s) => s.lineItems);
  const feeItems = row.feeSchedules.flatMap((s) => s.lineItems);
  const fees = mergeMccAiqFees(buildFees(row), stateItems);
  const cutoffs = buildCutoffs(row);
  const nriLine =
    feeItems.find(
      (i) =>
        (i.seatType === "NRI" || i.component.startsWith("nri_")) &&
        normalizeFeeCurrency(i.currency) === "USD",
    ) ??
    feeItems.find((i) => i.component === "tuition" && i.seatType === "NRI") ??
    feeItems.find((i) => i.component.startsWith("nri_"));

  const dataQuality = buildDataQualityFlags({
    stateSlug: row.stateSlug,
    hasFeeSchedule: row.feeSchedules.length > 0,
    hasSeatSnapshot: row.seatSnapshots.length > 0,
    cutoffYears: [...new Set(row.cutoffs.map((c) => c.year))],
    nriFeeUsd:
      nriLine != null && normalizeFeeCurrency(nriLine.currency) === "USD",
    seatSnapshotCount: row.seatSnapshots.length,
  });

  const bondNote =
    row.bondNote ??
    (row.bondYears > 0 || row.bondPenalty > 0
      ? undefined
      : "Bond data not available in source dataset.");

  const { seatMatrix, mccSeatMatrix, quotaInfo, seatCount } =
    resolveSeatSnapshotFields(row);
  const seatsIncreased = getSeatsIncreased2026(row.slug)?.seatsIncreased;

  return {
    slug: row.slug,
    name: row.name,
    stateSlug: row.stateSlug,
    city: row.city ?? "",
    ...(row.universityName ? { universityName: row.universityName } : {}),
    collegeType: parseCollegeType(row.collegeType),
    seatCount,
    ...(seatsIncreased && seatsIncreased > 0 ? { seatsIncreased } : {}),
    quotaInfo,
    ...(seatMatrix ? { seatMatrix } : {}),
    ...(mccSeatMatrix ? { mccSeatMatrix } : {}),
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
