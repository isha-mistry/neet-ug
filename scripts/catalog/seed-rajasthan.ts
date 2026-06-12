#!/usr/bin/env npx tsx
/**
 * Import Rajasthan facts only (data/rj_data.sql). Requires migrations + colleges spine.
 */
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";
import { importRajasthanFacts } from "./import-rajasthan-facts";

const prisma = new PrismaClient();
const ROOT = join(__dirname, "../..");

async function main() {
  await importRajasthanFacts(prisma, ROOT);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
