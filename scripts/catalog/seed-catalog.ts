#!/usr/bin/env npx tsx
/**
 * Seeds app.states, app.colleges (from generated JSON), then Gujarat facts from public/gujarat_data.
 * Requires: DATABASE_URL, migrations applied.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient, Prisma } from "@prisma/client";
import type { CollegeRecord, StateRecord } from "../../src/types/college";
import {
  GUJARAT_CANONICAL_SLUG_BY_MATCH_KEY,
  GUJARAT_SPINE_SLUG_MERGE,
} from "../../src/lib/catalog/gujarat-college-canonical";

const prisma = new PrismaClient();
const ROOT = join(__dirname, "../..");
const GUJARAT_DUMP = join(ROOT, "public/gujarat_data");
const COLLEGES_JSON = join(ROOT, "src/data/generated/colleges.json");
const STATES_JSON = join(ROOT, "src/data/generated/states.json");

function normalizeMatchKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/\\n/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

function parseCityFromName(name: string): string | null {
  const parts = name.split(",");
  if (parts.length < 2) return null;
  return parts[parts.length - 1].trim() || null;
}

function parseCopyBlocks(
  sql: string
): { header: string; rows: string[] }[] {
  const blocks: { header: string; rows: string[] }[] = [];
  const re =
    /^COPY public\.(\S+) \(([^)]+)\) FROM stdin;\n([\s\S]*?)^\\.$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(sql)) !== null) {
    const rows = m[3]
      .split("\n")
      .map((line) => line.trimEnd())
      .filter((line) => line.length > 0);
    blocks.push({ header: `${m[1]}:${m[2]}`, rows });
  }
  return blocks;
}

function parseRow(line: string): string[] {
  return line.split("\t").map((cell) => (cell === "\\N" ? "" : cell));
}

async function seedStates() {
  const states = JSON.parse(readFileSync(STATES_JSON, "utf8")) as StateRecord[];
  for (const s of states) {
    await prisma.state.upsert({
      where: { stateSlug: s.slug },
      create: {
        stateSlug: s.slug,
        name: s.name,
        intro: s.intro,
        totalSeats: s.totalSeats,
        competitionLevel: s.competitionLevel,
        feeDimensionProfile:
          s.slug === "gujarat" ? "seat_type" : "seat_type",
      },
      update: {
        name: s.name,
        intro: s.intro,
        totalSeats: s.totalSeats,
        competitionLevel: s.competitionLevel,
      },
    });
  }
  console.log(`Upserted ${states.length} states`);
}

async function seedCollegesFromJson() {
  let colleges = JSON.parse(
    readFileSync(COLLEGES_JSON, "utf8")
  ) as CollegeRecord[];
  colleges = collapseGujaratSpineColleges(colleges);
  for (const c of colleges) {
    await prisma.college.upsert({
      where: { slug: c.slug },
      create: {
        slug: c.slug,
        name: c.name,
        stateSlug: c.stateSlug,
        city: c.city || null,
        collegeType: c.collegeType,
        seatCount: c.seatCount,
        quotaInfo: c.quotaInfo,
        roiScore: c.roiScore,
        bondYears: c.bond.years,
        bondPenalty: c.bond.penalty,
        bondNote: c.bond.note ?? null,
        bedCount: c.infrastructure.beds,
        patientFlowPerDay: c.infrastructure.patientFlowPerDay,
        facilities: c.infrastructure.facilities,
      },
      update: {
        name: c.name,
        city: c.city || null,
        collegeType: c.collegeType,
        seatCount: c.seatCount,
        quotaInfo: c.quotaInfo,
        roiScore: c.roiScore,
        bondYears: c.bond.years,
        bondPenalty: c.bond.penalty,
        bondNote: c.bond.note ?? null,
      },
    });
  }
  console.log(`Upserted ${colleges.length} colleges from JSON spine`);
}

async function buildCollegeResolver() {
  let colleges = await prisma.college.findMany({ include: { aliases: true } });

  const resolve = (rawName: string): number | null => {
    const key = normalizeMatchKey(rawName);
    const canonicalSlug = GUJARAT_CANONICAL_SLUG_BY_MATCH_KEY[key];
    if (canonicalSlug) {
      const hit = colleges.find((c) => c.slug === canonicalSlug);
      if (hit) return hit.collegeId;
    }
    for (const c of colleges) {
      if (normalizeMatchKey(c.name) === key) return c.collegeId;
      for (const a of c.aliases) {
        if (a.matchKey === key || normalizeMatchKey(a.rawName) === key) {
          return c.collegeId;
        }
      }
    }
    return null;
  };

  const ensureCollege = async (
    rawName: string,
    instituteType?: string
  ): Promise<number> => {
    const existing = resolve(rawName);
    if (existing) return existing;

    const slugBase = slugify(rawName);
    let slug = slugBase;
    let n = 1;
    while (await prisma.college.findUnique({ where: { slug } })) {
      slug = `${slugBase}-${n++}`;
    }

    const created = await prisma.college.create({
      data: {
        slug,
        name: rawName.replace(/\\n/g, " ").trim(),
        stateSlug: "gujarat",
        city: parseCityFromName(rawName),
        collegeType: instituteTypeToCollegeType(instituteType ?? ""),
        seatCount: 0,
        quotaInfo: "",
      },
    });
    const alias = await prisma.collegeAlias.create({
      data: {
        collegeId: created.collegeId,
        source: "gujarat_dump",
        rawName: rawName.replace(/\\n/g, " ").trim(),
        matchKey: normalizeMatchKey(rawName),
      },
    });
    colleges = [
      ...colleges,
      { ...created, aliases: [alias] },
    ];
    return created.collegeId;
  };

  return { ensureCollege };
}

function instituteTypeToCollegeType(instituteType: string): string {
  const t = instituteType.trim().toLowerCase();
  if (t.includes("aiims")) return "aiims";
  if (t.includes("state government") || t.includes("esic") || t.includes("gmers")) {
    return "government";
  }
  if (t.includes("municipal")) return "government";
  return "private";
}

function feeCurrency(raw: string): "INR" | "USD" {
  return raw.includes("$") ? "USD" : "INR";
}

async function importGujaratFacts() {
  const sql = readFileSync(GUJARAT_DUMP, "utf8");
  const blocks = parseCopyBlocks(sql);
  const { ensureCollege } = await buildCollegeResolver();

  for (const block of blocks) {
    const [table] = block.header.split(":");
    if (table === "gujarat_cutoff_data" || table === "gujarat_cutoff_data_2024") {
      for (const line of block.rows) {
        const f = parseRow(line);
        const collegeId = await ensureCollege(f[0]);
        await prisma.cutoff.upsert({
          where: {
            collegeId_year_category_seatType_admissionRound: {
              collegeId,
              year: cutoffYear(f, table),
              category: f[2],
              seatType: f[3],
              admissionRound: f[4],
            },
          },
          create: cutoffCreateFromRow(f, collegeId, table),
          update: cutoffUpdateFromRow(f, table),
        });
      }
    }
  }

  for (const block of blocks) {
    if (!block.header.startsWith("gujarat_fees_data:")) continue;
    for (const line of block.rows) {
      const f = parseRow(line);
      const collegeId = await ensureCollege(f[0], f[1]);
      const year = 2025;
      const schedule = await prisma.feeSchedule.upsert({
        where: { collegeId_academicYear: { collegeId, academicYear: year } },
        create: { collegeId, academicYear: year, source: "gujarat_dump" },
        update: { source: "gujarat_dump" },
      });
      await prisma.college.update({
        where: { collegeId },
        data: { universityName: f[2].replace(/\\n/g, " ").trim() || undefined },
      });

      const sheetCurrency = feeCurrency(f[5]);
      const lines: {
        component: string;
        seatType: string;
        amount: number;
        currency: string;
      }[] = [
        { component: "tuition", seatType: "GQ", amount: num(f[3]), currency: "INR" },
        { component: "tuition", seatType: "MQ", amount: num(f[4]), currency: "INR" },
        {
          component: "tuition",
          seatType: "NRI",
          amount: num(f[6]),
          currency: sheetCurrency === "USD" ? "USD" : "INR",
        },
        { component: "hostel", seatType: "", amount: num(f[7]), currency: "INR" },
        { component: "mess", seatType: "", amount: num(f[8]), currency: "INR" },
        { component: "university", seatType: "", amount: num(f[9]), currency: "INR" },
        { component: "transport", seatType: "", amount: num(f[10]), currency: "INR" },
        { component: "exam", seatType: "", amount: num(f[11]), currency: "INR" },
      ];

      for (const item of lines) {
        if (item.amount <= 0 && item.component !== "tuition") continue;
        if (item.amount <= 0 && item.seatType === "MQ") continue;
        if (item.amount <= 0 && item.seatType === "NRI") continue;
        if (item.amount <= 0 && item.seatType === "GQ") continue;
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
          },
          update: {
            amount: new Prisma.Decimal(item.amount),
            currency: item.currency,
          },
        });
      }
    }
  }

  for (const block of blocks) {
    if (!block.header.startsWith("gujarat_seat_data:")) continue;
    const year = 2025;
    for (const line of block.rows) {
      const f = parseRow(line);
      const collegeId = await ensureCollege(f[0], f[1]);
      const snapshot = await prisma.seatSnapshot.upsert({
        where: { collegeId_academicYear: { collegeId, academicYear: year } },
        create: {
          collegeId,
          academicYear: year,
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
        data: { seatCount: int(f[2]) },
      });

      const buckets: [string, string][] = [
        ["aiq", f[3]],
        ["state_quota", f[4]],
        ["esic_ip", f[5]],
        ["nri_quota", f[6]],
        ["open", f[7]],
        ["sc", f[8]],
        ["st", f[9]],
        ["sebc", f[10]],
        ["ews", f[11]],
        ["mqt_quota", f[12]],
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

  console.log("Imported Gujarat fee, seat, and cutoff facts");
}

function num(s: string): number {
  if (!s) return 0;
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function int(s: string): number {
  return Math.round(num(s));
}

function cutoffCreateFromRow(
  f: string[],
  collegeId: number,
  table: string
): Prisma.CutoffCreateInput {
  const is2025 = table === "gujarat_cutoff_data";
  const yearIdx = is2025 ? 14 : 12;
  const filledIdx = is2025 ? 13 : 11;
  const openCatIdx = is2025 ? 15 : 13;
  const closeCatIdx = is2025 ? 16 : 14;
  return {
    college: { connect: { collegeId } },
    year: Number(f[yearIdx]),
    category: f[2],
    seatType: f[3],
    admissionRound: f[4],
    openingRankAir: intOrNull(f[5]),
    closingRankAir: intOrNull(f[6]),
    openingStateMeritRank: decOrNull(f[7]),
    closingStateMeritRank: decOrNull(f[8]),
    openingNeetScore: intOrNull(f[9]),
    closingNeetScore: intOrNull(f[10]),
    openingPercentile: is2025 ? decOrNull(f[11]) : undefined,
    closingPercentile: is2025 ? decOrNull(f[12]) : undefined,
    totalSeatsFilled: intOrNull(f[filledIdx]),
    openingCategoryRank: f[openCatIdx] || null,
    closingCategoryRank: f[closeCatIdx] || null,
  };
}

function cutoffUpdateFromRow(
  f: string[],
  table: string
): Prisma.CutoffUpdateInput {
  const is2025 = table === "gujarat_cutoff_data";
  const filledIdx = is2025 ? 13 : 11;
  const openCatIdx = is2025 ? 15 : 13;
  const closeCatIdx = is2025 ? 16 : 14;
  return {
    openingRankAir: intOrNull(f[5]),
    closingRankAir: intOrNull(f[6]),
    openingStateMeritRank: decOrNull(f[7]),
    closingStateMeritRank: decOrNull(f[8]),
    openingNeetScore: intOrNull(f[9]),
    closingNeetScore: intOrNull(f[10]),
    openingPercentile: is2025 ? decOrNull(f[11]) : null,
    closingPercentile: is2025 ? decOrNull(f[12]) : null,
    totalSeatsFilled: intOrNull(f[filledIdx]),
    openingCategoryRank: f[openCatIdx] || null,
    closingCategoryRank: f[closeCatIdx] || null,
  };
}

function cutoffYear(f: string[], table: string): number {
  return Number(f[table === "gujarat_cutoff_data" ? 14 : 12]);
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

function mergeSpineFields(keep: CollegeRecord, dup: CollegeRecord): CollegeRecord {
  return {
    ...keep,
    seatCount: Math.max(keep.seatCount, dup.seatCount),
    quotaInfo: keep.quotaInfo?.trim() ? keep.quotaInfo : dup.quotaInfo,
    roiScore: Math.max(keep.roiScore, dup.roiScore),
    bond: {
      years: Math.max(keep.bond.years, dup.bond.years),
      penalty: Math.max(keep.bond.penalty, dup.bond.penalty),
      note: keep.bond.note?.trim() ? keep.bond.note : dup.bond.note,
    },
    infrastructure: {
      beds: Math.max(keep.infrastructure.beds, dup.infrastructure.beds),
      patientFlowPerDay: Math.max(
        keep.infrastructure.patientFlowPerDay,
        dup.infrastructure.patientFlowPerDay
      ),
      facilities: [
        ...new Set([
          ...keep.infrastructure.facilities,
          ...dup.infrastructure.facilities,
        ]),
      ],
    },
  };
}

function collapseGujaratSpineColleges(colleges: CollegeRecord[]): CollegeRecord[] {
  const bySlug = new Map(colleges.map((c) => [c.slug, c]));
  for (const { duplicateSlug, canonicalSlug } of GUJARAT_SPINE_SLUG_MERGE) {
    const dup = bySlug.get(duplicateSlug);
    if (!dup) continue;
    const existing = bySlug.get(canonicalSlug);
    if (existing) {
      bySlug.set(canonicalSlug, mergeSpineFields(existing, dup));
    } else {
      bySlug.set(canonicalSlug, {
        ...dup,
        slug: canonicalSlug,
        name: canonicalNameForSlug(canonicalSlug, dup.name),
        city: dup.city?.trim() ? dup.city : cityForCanonicalSlug(canonicalSlug) ?? "",
      });
    }
    bySlug.delete(duplicateSlug);
  }
  return [...bySlug.values()];
}

function canonicalNameForSlug(slug: string, fallback: string): string {
  const names: Record<string, string> = {
    "bhagyoday-medical-college-mehsana": "Bhagyoday Medical College, Mehsana",
    "kiran-medical-college-surat": "Kiran Medical College, Surat",
    "matushri-prabhaben-khodabhai-boghara-medical-college-research-centre-rajkot":
      "Matushri Prabhaben Khodabhai Boghara Medical College Research Centre, Rajkot",
    "dr-kiran-c-patel-medical-college-research-institute-bharuch":
      "Dr. Kiran C.Patel Medical College and Research Institute, Bharuch",
    "ananya-college-of-medicine-research-gandhinagar":
      "Ananya College of Medicine & Research, Gandhinagar",
  };
  return names[slug] ?? fallback;
}

function cityForCanonicalSlug(slug: string): string | null {
  const cities: Record<string, string> = {
    "bhagyoday-medical-college-mehsana": "Mehsana",
    "kiran-medical-college-surat": "Surat",
    "matushri-prabhaben-khodabhai-boghara-medical-college-research-centre-rajkot":
      "Rajkot",
    "dr-kiran-c-patel-medical-college-research-institute-bharuch": "Bharuch",
    "ananya-college-of-medicine-research-gandhinagar": "Gandhinagar",
  };
  return cities[slug] ?? null;
}

async function mergeGujaratDuplicateColleges() {
  for (const { duplicateSlug, canonicalSlug } of GUJARAT_SPINE_SLUG_MERGE) {
    const dup = await prisma.college.findUnique({ where: { slug: duplicateSlug } });
    const keep = await prisma.college.findUnique({ where: { slug: canonicalSlug } });
    if (!dup) continue;

    if (keep) {
      await prisma.college.update({
        where: { collegeId: keep.collegeId },
        data: {
          quotaInfo: keep.quotaInfo?.trim() ? undefined : dup.quotaInfo || undefined,
          bondNote: keep.bondNote?.trim() ? undefined : dup.bondNote ?? undefined,
          bondYears: keep.bondYears > 0 ? undefined : dup.bondYears,
          bondPenalty: keep.bondPenalty > 0 ? undefined : dup.bondPenalty,
          roiScore: Math.max(keep.roiScore, dup.roiScore),
          bedCount: Math.max(keep.bedCount, dup.bedCount),
          patientFlowPerDay: Math.max(keep.patientFlowPerDay, dup.patientFlowPerDay),
          facilities: [...new Set([...keep.facilities, ...dup.facilities])],
        },
      });
      await prisma.collegeAlias.updateMany({
        where: { collegeId: dup.collegeId },
        data: { collegeId: keep.collegeId },
      });
      await prisma.collegeAlias.upsert({
        where: {
          source_rawName: { source: "gujarat_spine_merge", rawName: dup.name },
        },
        create: {
          collegeId: keep.collegeId,
          source: "gujarat_spine_merge",
          rawName: dup.name,
          matchKey: normalizeMatchKey(dup.name),
        },
        update: { collegeId: keep.collegeId, matchKey: normalizeMatchKey(dup.name) },
      });
      await prisma.college.delete({ where: { collegeId: dup.collegeId } });
      console.log(`Merged college ${duplicateSlug} → ${canonicalSlug}`);
    } else {
      await prisma.college.update({
        where: { collegeId: dup.collegeId },
        data: {
          slug: canonicalSlug,
          name: canonicalNameForSlug(canonicalSlug, dup.name),
          city: dup.city || cityForCanonicalSlug(canonicalSlug),
        },
      });
      console.log(`Renamed college ${duplicateSlug} → ${canonicalSlug}`);
    }
  }
}

async function main() {
  await seedStates();
  await seedCollegesFromJson();
  await mergeGujaratDuplicateColleges();
  await importGujaratFacts();
  await mergeGujaratDuplicateColleges();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
