/**
 * Download one cover per college into public/college-covers/{slug}.webp.
 * Run after adding colleges to college-cover-images.json (uses Cloudinary once per sync).
 *
 *   npm run college-covers:sync
 *   npm run college-covers:sync -- --slug=some-college-slug
 *   npm run college-covers:sync -- --force
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import manifest from "../../src/data/college-cover-images.json";
import {
  COLLEGE_COVER_SYNC_TRANSFORM,
  buildCollegeCoverCloudinaryUrl,
} from "../../src/lib/colleges/cover-images";

const OUT_DIR = path.join(process.cwd(), "public/college-covers");
const CONCURRENCY = 8;
const EXT = "webp";

type Args = {
  force: boolean;
  slug: string | null;
};

function parseArgs(): Args {
  let force = false;
  let slug: string | null = null;
  for (const arg of process.argv.slice(2)) {
    if (arg === "--force") force = true;
    else if (arg.startsWith("--slug=")) slug = arg.slice("--slug=".length);
  }
  return { force, slug };
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function downloadToFile(url: string, filePath: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(filePath, buf);
}

async function runPool<T>(
  items: T[],
  worker: (item: T) => Promise<void>
): Promise<void> {
  let index = 0;
  async function next(): Promise<void> {
    const i = index;
    index += 1;
    if (i >= items.length) return;
    await worker(items[i]);
    await next();
  }
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, () => next())
  );
}

async function main() {
  const { force, slug: onlySlug } = parseArgs();
  const bySlug = manifest.bySlug as Record<
    string,
    { publicId: string; secureUrl: string }
  >;

  let entries = Object.entries(bySlug);
  if (onlySlug) {
    const entry = bySlug[onlySlug];
    if (!entry) {
      console.error(`Unknown slug: ${onlySlug}`);
      process.exit(1);
    }
    entries = [[onlySlug, entry]];
  }

  await mkdir(OUT_DIR, { recursive: true });

  let skipped = 0;
  let ok = 0;
  let failed = 0;

  await runPool(entries, async ([slug, entry]) => {
    const filePath = path.join(OUT_DIR, `${slug}.${EXT}`);
    if (!force && (await fileExists(filePath))) {
      skipped += 1;
      return;
    }

    const url = buildCollegeCoverCloudinaryUrl(
      entry.publicId,
      COLLEGE_COVER_SYNC_TRANSFORM
    );
    if (!url) {
      console.error(`[skip] ${slug}: no cloud name`);
      failed += 1;
      return;
    }

    try {
      await downloadToFile(url, filePath);
      ok += 1;
      if ((ok + failed + skipped) % 50 === 0) {
        console.log(`… ${ok + failed + skipped}/${entries.length}`);
      }
    } catch (err) {
      failed += 1;
      console.error(`[fail] ${slug}:`, err instanceof Error ? err.message : err);
    }
  });

  console.log(
    `Done. downloaded=${ok} skipped=${skipped} failed=${failed} → ${OUT_DIR}`
  );
  if (failed > 0) process.exit(1);
}

main();
