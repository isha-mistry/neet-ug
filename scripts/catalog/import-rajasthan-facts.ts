import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Prisma, PrismaClient } from "@prisma/client";
import { parseCopyBlocks, parsePgCopyRow } from "../../src/lib/catalog/parse-pg-copy";
import { RAJASTHAN_CANONICAL_SLUG_BY_MATCH_KEY } from "../../src/lib/catalog/rajasthan-college-canonical";
import {
  instituteTypeToCollegeType,
  mapRajasthanFeeSeatType,
  normalizeRajasthanCutoffSeatType,
  parseRajasthanOthersFee,
  rajasthanCounsellingQuota,
  rajasthanCutoffCategory,
} from "../../src/lib/catalog/rajasthan-mappers";
import { buildCollegeResolver } from "./college-resolver";

const ACADEMIC_YEAR = 2025;

function num(s: string): number {
  if (!s) return 0;
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function int(s: string): number {
  return Math.round(num(s));
}

function intOrNull(s: string): number | null {
  if (!s) return null;
  const n = int(s);
  return Number.isFinite(n) ? n : null;
}

function decOrNull(s: string): Prisma.Decimal | null {
  if (!s) return null;
  return new Prisma.Decimal(s);
}

export async function importRajasthanFacts(
  prisma: PrismaClient,
  rootDir: string
): Promise<void> {
  const dumpPath = join(rootDir, "data/rj_data.sql");
  const sql = readFileSync(dumpPath, "utf8");
  const blocks = parseCopyBlocks(sql);
  const { ensureCollege } = await buildCollegeResolver(prisma, {
    stateSlug: "rajasthan",
    aliasSource: "rajasthan_dump",
    canonicalSlugByMatchKey: RAJASTHAN_CANONICAL_SLUG_BY_MATCH_KEY,
    instituteTypeToCollegeType,
  });

  await prisma.state.update({
    where: { stateSlug: "rajasthan" },
    data: { feeDimensionProfile: "seat_type" },
  });

  for (const block of blocks) {
    const [table] = block.header.split(":");
    if (table !== "rajasthan_cutoff_data") continue;
    for (const line of block.rows) {
      const f = parsePgCopyRow(line);
      const collegeId = await ensureCollege(f[1], undefined, f[2]);
      const category = rajasthanCutoffCategory(f[5]);
      const seatType = normalizeRajasthanCutoffSeatType(f[4]);
      const quota = rajasthanCounsellingQuota(f[6]);
      const year = int(f[12]) || ACADEMIC_YEAR;

      await prisma.cutoff.upsert({
        where: {
          collegeId_year_category_seatType_admissionRound_quota: {
            collegeId,
            year,
            category,
            seatType,
            admissionRound: f[0],
            quota,
          },
        },
        create: {
          college: { connect: { collegeId } },
          year,
          category,
          seatType,
          quota,
          admissionRound: f[0],
          openingStateMeritRank: decOrNull(f[7]),
          closingStateMeritRank: decOrNull(f[8]),
          closingRankAir: intOrNull(f[9]),
          closingPercentile: decOrNull(f[10]),
          totalSeatsFilled: intOrNull(f[11]),
        },
        update: {
          openingStateMeritRank: decOrNull(f[7]),
          closingStateMeritRank: decOrNull(f[8]),
          closingRankAir: intOrNull(f[9]),
          closingPercentile: decOrNull(f[10]),
          totalSeatsFilled: intOrNull(f[11]),
        },
      });

      await prisma.college.update({
        where: { collegeId },
        data: {
          collegeType: instituteTypeToCollegeType("", f[2]),
        },
      });
    }
  }

  for (const block of blocks) {
    if (!block.header.startsWith("rajasthan_fees_data:")) continue;
    for (const line of block.rows) {
      const f = parsePgCopyRow(line);
      const collegeId = await ensureCollege(f[0]);
      const feeSeatType = mapRajasthanFeeSeatType(f[1]);
      const schedule = await prisma.feeSchedule.upsert({
        where: {
          collegeId_academicYear: { collegeId, academicYear: ACADEMIC_YEAR },
        },
        create: {
          collegeId,
          academicYear: ACADEMIC_YEAR,
          source: "rajasthan_dump",
        },
        update: { source: "rajasthan_dump" },
      });

      const lineSpecs: {
        component: string;
        seatType: string;
        amount: number;
        currency: string;
        period: string;
      }[] = [];

      const push = (
        component: string,
        amount: number,
        currency = "INR",
        period = "annual"
      ) => {
        if (amount <= 0) return;
        lineSpecs.push({
          component,
          seatType: feeSeatType,
          amount,
          currency,
          period,
        });
      };

      push("caution", num(f[2]), "INR", "one_time");
      push("admission", num(f[3]), "INR", "one_time");
      push("tuition", num(f[4]), "INR", "annual");
      push("development", num(f[6]), "INR", "annual");
      push("library", num(f[8]), "INR", "annual");

      const usdTuition = num(f[7]);
      if (usdTuition > 0) {
        lineSpecs.push({
          component: "nri_tuition_usd",
          seatType: feeSeatType,
          amount: usdTuition,
          currency: "USD",
          period: "annual",
        });
      }

      const others = parseRajasthanOthersFee(f[5]);
      if (others) {
        push("others", others.amount, others.currency, "annual");
      }

      for (const item of lineSpecs) {
        await prisma.feeLineItem.upsert({
          where: {
            scheduleId_component_seatType_category: {
              scheduleId: schedule.id,
              component: item.component,
              seatType: item.seatType,
              category: "",
            },
          },
          create: {
            scheduleId: schedule.id,
            component: item.component,
            seatType: item.seatType,
            category: "",
            amount: new Prisma.Decimal(item.amount),
            currency: item.currency,
            period: item.period,
          },
          update: {
            amount: new Prisma.Decimal(item.amount),
            currency: item.currency,
            period: item.period,
          },
        });
      }
    }
  }

  for (const block of blocks) {
    if (!block.header.startsWith("rajasthan_seat_data:")) continue;
    for (const line of block.rows) {
      const f = parsePgCopyRow(line);
      const collegeId = await ensureCollege(f[0], f[1]);
      const snapshot = await prisma.seatSnapshot.upsert({
        where: {
          collegeId_academicYear: { collegeId, academicYear: ACADEMIC_YEAR },
        },
        create: {
          collegeId,
          academicYear: ACADEMIC_YEAR,
          instituteType: f[1].trim(),
          totalSeats: int(f[2]),
        },
        update: {
          instituteType: f[1].trim(),
          totalSeats: int(f[2]),
        },
      });

      await prisma.college.update({
        where: { collegeId },
        data: {
          seatCount: int(f[2]),
          collegeType: instituteTypeToCollegeType(f[1]),
        },
      });

      const buckets: [string, string][] = [
        ["aiq", f[3]],
        ["state_quota", f[4]],
        ["esic_ip", f[5]],
        ["nri_quota", f[6]],
        ["open", f[7]],
        ["sc", f[8]],
        ["st", f[9]],
        ["obc", f[10]],
        ["ews", f[11]],
        ["mqt_quota", f[12]],
        ["mbc", f[13]],
        ["st_and_sa", f[14]],
        ["obc_and_mbc", f[15]],
      ];

      for (const [code, val] of buckets) {
        const count = int(val);
        if (count <= 0) continue;
        await prisma.seatBucket.upsert({
          where: {
            snapshotId_bucketCode: {
              snapshotId: snapshot.id,
              bucketCode: code,
            },
          },
          create: {
            snapshotId: snapshot.id,
            bucketCode: code,
            seatCount: count,
          },
          update: { seatCount: count },
        });
      }
    }
  }

  console.log("Imported Rajasthan fee, seat, and cutoff facts");
}
