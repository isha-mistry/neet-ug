import type { CollegeRecord, CollegeSeatMatrix, CollegeFees, CollegeCutoff, QuotaFeeBreakdown, FeeCurrency } from "@/types/college";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import type { CollegeSummary } from "@/types/listing";
import type { CollegeDetailViewModel } from "@/types/detail";
import type { CollegeFilters } from "@/types/filters";
import { pickDisplayCutoff } from "@/lib/colleges/cutoff-context";
import { pickDisplayQuotaFee } from "@/lib/colleges/fee-context";
import { deriveSafetyTag } from "./tags";
import { getStateNameFromCatalog } from "@/lib/data/state-name-cache";

function getStateName(stateSlug: string): string {
  return getStateNameFromCatalog(stateSlug);
}

function getLatestCutoff(record: CollegeRecord) {
  return pickDisplayCutoff(record, {});
}

export function parseQuotaInfoToSeatMatrix(quotaInfo: string): CollegeSeatMatrix {
  const matrix: CollegeSeatMatrix = {
    aiq: 0,
    stateQuota: 0,
    management: 0,
    nri: 0,
    categoryDistribution: {},
  };

  if (!quotaInfo) return matrix;

  const parts = quotaInfo.split("/").map((p) => p.trim());
  for (const part of parts) {
    const match = part.match(/^([A-Za-z\s\-]+)\s+(\d+)$/);
    if (match) {
      const label = match[1].trim();
      const val = parseInt(match[2], 10);
      const lowerLabel = label.toLowerCase();

      if (lowerLabel === "aiq" || lowerLabel === "all india quota") {
        matrix.aiq = val;
      } else if (lowerLabel === "state" || lowerLabel === "state quota") {
        matrix.stateQuota = val;
      } else if (lowerLabel === "management" || lowerLabel === "mq" || lowerLabel === "management quota") {
        matrix.management = val;
      } else if (lowerLabel === "nri" || lowerLabel === "nri quota") {
        matrix.nri = val;
      } else {
        // Capture category distributions (e.g. Open, SC, ST, SEBC, EWS)
        matrix.categoryDistribution[label] = val;
      }
    }
  }

  return matrix;
}

export function toCollegeSummary(
  record: CollegeRecord,
  context?: Pick<CollegeFilters, "quota" | "category">
): CollegeSummary {
  const latest = context
    ? pickDisplayCutoff(record, context)
    : getLatestCutoff(record);
  const displayFee = pickDisplayQuotaFee(record, context?.quota);
  return {
    slug: record.slug,
    name: record.name,
    city: record.city,
    stateSlug: record.stateSlug,
    stateName: getStateName(record.stateSlug),
    collegeType: record.collegeType,
    totalAnnualFee: record.fees.totalAnnual,
    totalCourseFee: record.fees.totalCourse,
    displayAnnualFee: displayFee.formatted,
    latestCutoffRank: latest?.rank ?? 0,
    latestCutoffYear: latest?.year ?? 0,
    seatCount: record.seatCount,
    quotaInfo: record.quotaInfo,
    bondLabel:
      record.bond.years === 0
         ? "No Bond"
         : `${record.bond.years} Year${record.bond.years === 1 ? "" : "s"}`,
    roiScore: record.roiScore,
    safetyTag: deriveSafetyTag(latest?.rank ?? 0),
    bond: record.bond
  };
}

export function toCollegeDetail(record: CollegeRecord): CollegeDetailViewModel {
  const latest = getLatestCutoff(record);
  const seatMatrix = record.seatMatrix ?? (record.quotaInfo ? parseQuotaInfoToSeatMatrix(record.quotaInfo) : undefined);
  return {
    ...record,
    seatMatrix,
    stateName: getStateName(record.stateSlug),
    totalAnnualFee: record.fees.totalAnnual,
    totalCourseFee: record.fees.totalCourse,
    latestCutoffRank: latest?.rank ?? 0,
    latestCutoffYear: latest?.year ?? 0,
  };
}

function mapCategory(dbCategory: string): NeetCategory {
  const cat = dbCategory.toUpperCase();
  if (cat === "OP") return "general";
  if (cat === "EW") return "ews";
  if (cat === "SE" || cat === "OBC") return "obc";
  if (cat === "SC") return "sc";
  if (cat === "ST") return "st";
  if (cat.endsWith("PH")) return "pwbd";
  return "general";
}

export function mapDbCollegeToRecord(dbCollege: any): CollegeRecord {
  // 1. Map cutoffs
  const cutoffs: CollegeCutoff[] = (dbCollege.cutoffs || []).map((c: any) => ({
    year: c.year,
    rank: c.closing_rank_air ?? 0,
    quota: c.seat_type === "GQ" ? "State Quota" : c.seat_type === "MQ" ? "Management Quota" : c.seat_type === "NQ" ? "NRI Quota" : c.seat_type,
    category: mapCategory(c.category),
    round: c.admission_round ?? undefined,
    openingRank: c.opening_rank_air ?? undefined,
    closingRank: c.closing_rank_air ?? undefined,
    stateOpeningRank: c.opening_state_merit_rank ? Number(c.opening_state_merit_rank) : undefined,
    stateClosingRank: c.closing_state_merit_rank ? Number(c.closing_state_merit_rank) : undefined,
    categoryOpeningRank: c.opening_category_rank ?? undefined,
    categoryClosingRank: c.closing_category_rank ?? undefined,
  }));

  // 2. Map fee schedules
  let fees: CollegeFees = {
    tuition: 0,
    hostel: 0,
    misc: 0,
    totalAnnual: 0,
    totalCourse: 0,
  };

  if (dbCollege.fee_schedules && dbCollege.fee_schedules.length > 0) {
    const latestSchedule = dbCollege.fee_schedules.reduce((latest: any, current: any) => {
      return (!latest || current.academic_year > latest.academic_year) ? current : latest;
    }, null);

    if (latestSchedule && latestSchedule.fee_line_items) {
      const gqTuitionItem = latestSchedule.fee_line_items.find((item: any) => item.component === "tuition" && item.seat_type === "GQ");
      const mqTuitionItem = latestSchedule.fee_line_items.find((item: any) => item.component === "tuition" && item.seat_type === "MQ");
      const nriTuitionItem = latestSchedule.fee_line_items.find((item: any) => item.component === "tuition" && item.seat_type === "NRI");

      const gqTuition = gqTuitionItem ? Number(gqTuitionItem.amount) : 0;
      const mqTuition = mqTuitionItem ? Number(mqTuitionItem.amount) : 0;
      const nriAmount = nriTuitionItem ? Number(nriTuitionItem.amount) : undefined;
      const nriCurrency = nriTuitionItem?.currency ?? "INR";

      const tuition = gqTuition;

      const hostelItem = latestSchedule.fee_line_items.find((item: any) => item.component === "hostel");
      const hostel = hostelItem ? Number(hostelItem.amount) : 0;

      const misc = latestSchedule.fee_line_items
        .filter((item: any) => item.component !== "tuition" && item.component !== "hostel")
        .reduce((sum: number, item: any) => sum + Number(item.amount), 0);

      const totalAnnual = tuition + hostel + misc;
      const totalCourse = totalAnnual * 5;

      const quotaBreakdown: QuotaFeeBreakdown = {
        govtQuotaAnnualInr: gqTuition,
        managementQuotaAnnualInr: mqTuition,
        nri: nriAmount !== undefined ? { amount: nriAmount, currency: nriCurrency as FeeCurrency } : undefined,
      };

      fees = {
        tuition,
        hostel,
        misc,
        totalAnnual,
        totalCourse,
        quotaBreakdown,
        gqFees: gqTuition,
        mqFees: mqTuition,
        nriFees: nriAmount,
        nriCurrency,
        hostelFees: hostel,
      };
    }
  }

  // 3. Map seat matrix
  let seatMatrix: CollegeSeatMatrix | undefined = undefined;
  if (dbCollege.seat_snapshots && dbCollege.seat_snapshots.length > 0) {
    const latestSnapshot = dbCollege.seat_snapshots.reduce((latest: any, current: any) => {
      return (!latest || current.academic_year > latest.academic_year) ? current : latest;
    }, null);

    if (latestSnapshot && latestSnapshot.seat_buckets) {
      const buckets = latestSnapshot.seat_buckets;
      const aiq = buckets.find((b: any) => b.bucket_code === "aiq")?.seat_count ?? 0;
      const stateQuota = buckets.find((b: any) => b.bucket_code === "state_quota")?.seat_count ?? 0;
      const management = buckets.find((b: any) => b.bucket_code === "mqt_quota")?.seat_count ?? 0;
      const nri = buckets.find((b: any) => b.bucket_code === "nri_quota")?.seat_count ?? 0;

      const categoryDistribution: Record<string, number> = {};
      const standardCodes = ["aiq", "state_quota", "mqt_quota", "nri_quota"];
      for (const bucket of buckets) {
        if (!standardCodes.includes(bucket.bucket_code)) {
          const label = bucket.bucket_code.toUpperCase();
          categoryDistribution[label] = bucket.seat_count;
        }
      }

      seatMatrix = {
        aiq,
        stateQuota,
        management,
        nri,
        categoryDistribution,
      };
    }
  }

  if (!seatMatrix && dbCollege.quotaInfo) {
    seatMatrix = parseQuotaInfoToSeatMatrix(dbCollege.quotaInfo);
  }

  return {
    slug: dbCollege.slug,
    name: dbCollege.name,
    stateSlug: dbCollege.stateSlug,
    city: dbCollege.city ?? "",
    collegeType: dbCollege.collegeType as any,
    seatCount: dbCollege.seatCount,
    quotaInfo: dbCollege.quotaInfo,
    fees,
    cutoffs,
    bond: {
      years: dbCollege.bond_years,
      penalty: dbCollege.bond_penalty,
      note: dbCollege.bond_note ?? undefined,
    },
    infrastructure: {
      beds: dbCollege.bed_count,
      patientFlowPerDay: dbCollege.patient_flow_per_day,
      facilities: dbCollege.facilities || [],
    },
    reviews: {
      pros: [],
      cons: [],
    },
    roiScore: dbCollege.roi_score,
    otherInfo: {
      officialWebsite: `https://www.${dbCollege.slug}.edu.in`,
      counsellingBrochureUrl: dbCollege.counselling || undefined,
    },
    seatMatrix,
  };
}