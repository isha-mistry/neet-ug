#!/usr/bin/env npx tsx
/**
 * Applies NIRF Medical ranks from data/nirf/medical-2025.json onto app.colleges.
 * Requires: DATABASE_URL, migrations applied, colleges seeded.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const ROOT = join(__dirname, "../..");
const NIRF_JSON = join(ROOT, "data/nirf/medical-2025.json");

interface NirfFile {
  rankingYear: number;
  entries: {
    institutionId: string;
    name: string;
    rank: number;
    score: number;
    collegeSlug?: string;
  }[];
}

async function main() {
  const payload = JSON.parse(readFileSync(NIRF_JSON, "utf8")) as NirfFile;
  const { rankingYear, entries } = payload;

  let updated = 0;
  const skipped: string[] = [];
  const missingSlug: string[] = [];

  for (const entry of entries) {
    if (!entry.collegeSlug) {
      missingSlug.push(`${entry.rank}\t${entry.institutionId}\t${entry.name}`);
      continue;
    }

    const college = await prisma.college.findUnique({
      where: { slug: entry.collegeSlug },
      select: { collegeId: true, slug: true },
    });

    if (!college) {
      skipped.push(`${entry.collegeSlug} (rank ${entry.rank}) — slug not in DB`);
      continue;
    }

    await prisma.college.update({
      where: { collegeId: college.collegeId },
      data: {
        nirfInstitutionId: entry.institutionId,
        nirfMedicalRank: entry.rank,
        nirfMedicalScore: entry.score,
        nirfRankingYear: rankingYear,
      },
    });
    updated += 1;
  }

  console.log(
    `NIRF Medical ${rankingYear}: updated ${updated} colleges (${entries.length} entries in file).`
  );
  if (missingSlug.length) {
    console.log(
      `\nNo catalog college mapped yet (${missingSlug.length} institutes — add collegeSlug in ${NIRF_JSON} when spine exists):`
    );
    for (const line of missingSlug) console.log(`  ${line}`);
  }
  if (skipped.length) {
    console.log(`\nSkipped (${skipped.length}):`);
    for (const line of skipped) console.log(`  ${line}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
