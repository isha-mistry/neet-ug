import { readFileSync } from "node:fs";
import { join } from "node:path";
import states from "@/data/generated/states.json";
import { normalizeMatchKey } from "@/lib/catalog/normalize-match-key";
import { parseCopyBlocks, parsePgCopyRow } from "@/lib/catalog/parse-pg-copy";

/** Authoritative national MBBS college list (PostgreSQL COPY dump). */
export const MEDICAL_COLLEGE_LIST_RELATIVE_PATH =
  "data/final_medical_colleges_list.sql";

function medicalListSqlPath(rootDir: string): string {
  return join(rootDir, MEDICAL_COLLEGE_LIST_RELATIVE_PATH);
}

function readMedicalListSql(rootDir: string): string {
  return readFileSync(medicalListSqlPath(rootDir), "utf8");
}

export type MedicalCollegeListRow = {
  stateLabel: string;
  stateSlug: string;
  collegeName: string;
};

export type CollegeCandidate = {
  collegeId: number;
  name: string;
  aliases: { matchKey: string; rawName: string }[];
};

const STATE_LABEL_TO_SLUG: Record<string, string> = Object.fromEntries(
  (states as { slug: string; name: string }[]).map((s) => [s.name, s.slug]),
);

STATE_LABEL_TO_SLUG["Jammu & Kashmir"] = "jammu-kashmir";
STATE_LABEL_TO_SLUG["Dadra and Nagar Haveli"] = "dadra-and-nagar-haveli";

export type MedicalCollegeListFullRow = MedicalCollegeListRow & {
  universityName: string;
  collegeTypeLabel: string;
  counselling: string;
  annualIntakeSeats: number | null;
};

export function medicalListRowKey(stateSlug: string, collegeName: string): string {
  return `${stateSlug}|${normalizeMatchKey(collegeName)}`;
}

export function mapListCollegeType(
  collegeTypeLabel: string,
  counselling: string,
): "government" | "private" | "deemed" | "aiims" {
  const c = counselling.toLowerCase();
  if (c.includes("aiims") || c.includes("jipmer")) return "aiims";
  const t = collegeTypeLabel.trim().toLowerCase();
  if (t === "deemed") return "deemed";
  if (t.startsWith("govt") || t.includes("government")) return "government";
  return "private";
}

export function countMedicalListCopyRows(rootDir: string): number {
  const sql = readMedicalListSql(rootDir);
  const block = parseCopyBlocks(sql).find((b) =>
    b.header.startsWith("medical_colleges:"),
  );
  return block?.rows.length ?? 0;
}

export function loadMedicalCollegeListFullRows(
  rootDir: string,
): MedicalCollegeListFullRow[] {
  const sql = readMedicalListSql(rootDir);
  const blocks = parseCopyBlocks(sql);
  const block = blocks.find((b) => b.header.startsWith("medical_colleges:"));
  if (!block) return [];

  const seen = new Map<string, MedicalCollegeListFullRow>();
  for (const line of block.rows) {
    const f = parsePgCopyRow(line);
    const stateLabel = f[0].trim();
    const stateSlug = stateSlugFromListLabel(stateLabel);
    if (!stateSlug) continue;
    const collegeName = f[1].replace(/\\n/g, " ").trim();
    const dedupeKey = medicalListRowKey(stateSlug, collegeName);
    const seatsRaw = f[5]?.trim();
    const annualIntakeSeats =
      seatsRaw && seatsRaw !== "\\N" && seatsRaw !== "N"
        ? Number.parseInt(seatsRaw, 10)
        : null;
    const row: MedicalCollegeListFullRow = {
      stateLabel,
      stateSlug,
      collegeName,
      universityName: f[2].replace(/\\n/g, " ").trim(),
      collegeTypeLabel: f[3].trim(),
      counselling: f[4].trim(),
      annualIntakeSeats: Number.isFinite(annualIntakeSeats)
        ? annualIntakeSeats
        : null,
    };
    if (!seen.has(dedupeKey)) seen.set(dedupeKey, row);
  }
  return [...seen.values()];
}

export function stateSlugFromListLabel(label: string): string | null {
  const trimmed = label.trim();
  return STATE_LABEL_TO_SLUG[trimmed] ?? null;
}

export function loadMedicalCollegeListRows(
  rootDir: string,
): MedicalCollegeListRow[] {
  const sql = readMedicalListSql(rootDir);
  const blocks = parseCopyBlocks(sql);
  const block = blocks.find((b) => b.header.startsWith("medical_colleges:"));
  if (!block) return [];

  const seen = new Map<string, MedicalCollegeListRow>();
  for (const line of block.rows) {
    const f = parsePgCopyRow(line);
    const stateLabel = f[0].trim();
    const stateSlug = stateSlugFromListLabel(stateLabel);
    if (!stateSlug) continue;
    const collegeName = f[1].replace(/\\n/g, " ").trim();
    const dedupeKey = medicalListRowKey(stateSlug, collegeName);
    if (!seen.has(dedupeKey)) {
      seen.set(dedupeKey, { stateLabel, stateSlug, collegeName });
    }
  }
  return [...seen.values()];
}

/** Exact name / alias match only (no fuzzy token match). */
export function matchCollegeToListRowExact(
  row: MedicalCollegeListRow,
  candidates: CollegeCandidate[],
  claimedIds: ReadonlySet<number>,
): CollegeCandidate | null {
  const listKey = normalizeMatchKey(row.collegeName);

  for (const c of candidates) {
    if (claimedIds.has(c.collegeId)) continue;
    if (normalizeMatchKey(c.name) === listKey) return c;
    for (const a of c.aliases) {
      if (a.matchKey === listKey || normalizeMatchKey(a.rawName) === listKey) {
        return c;
      }
    }
  }
  return null;
}

/** Match one list row to a spine college in the same state (not already claimed). */
export function matchCollegeToListRow(
  row: MedicalCollegeListRow,
  candidates: CollegeCandidate[],
  claimedIds: ReadonlySet<number>,
): CollegeCandidate | null {
  const exact = matchCollegeToListRowExact(row, candidates, claimedIds);
  if (exact) return exact;

  const listKey = normalizeMatchKey(row.collegeName);
  const dumpTokens = listKey.split(" ").filter((t) => t.length > 2);
  if (dumpTokens.length === 0) return null;

  let best: CollegeCandidate | null = null;
  let bestScore = 0;

  for (const c of candidates) {
    if (claimedIds.has(c.collegeId)) continue;
    const ck = normalizeMatchKey(c.name);
    let score = 0;
    for (const t of dumpTokens) {
      if (ck.includes(t)) score += 1;
    }
    if (score < 3) continue;

    const cityPart = row.collegeName.split(",").pop()?.trim();
    if (cityPart) {
      const cityTokens = normalizeMatchKey(cityPart)
        .split(" ")
        .filter((t) => t.length > 2);
      if (cityTokens.length > 0 && !cityTokens.some((t) => ck.includes(t))) {
        continue;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }

  return best;
}
