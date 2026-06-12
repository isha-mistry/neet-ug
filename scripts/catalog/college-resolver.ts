import type { PrismaClient } from "@prisma/client";
import { normalizeMatchKey } from "../../src/lib/catalog/normalize-match-key";

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

export type CollegeResolver = {
  resolve: (rawName: string) => number | null;
  ensureCollege: (
    rawName: string,
    instituteType?: string,
    cutoffCollegeType?: string
  ) => Promise<number>;
};

export async function buildCollegeResolver(
  prisma: PrismaClient,
  options: {
    stateSlug: string;
    aliasSource: string;
    canonicalSlugByMatchKey?: Record<string, string>;
    instituteTypeToCollegeType: (
      instituteType: string,
      cutoffCollegeType?: string
    ) => string;
  }
): Promise<CollegeResolver> {
  let colleges = await prisma.college.findMany({
    where: { stateSlug: options.stateSlug },
    include: { aliases: true },
  });

  const canonical = options.canonicalSlugByMatchKey ?? {};

  const resolve = (rawName: string): number | null => {
    const key = normalizeMatchKey(rawName);
    const canonicalSlug = canonical[key];
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
    instituteType?: string,
    cutoffCollegeType?: string
  ): Promise<number> => {
    const existing = resolve(rawName);
    if (existing) return existing;

    const slugBase = slugify(rawName);
    let slug = slugBase;
    let n = 1;
    while (await prisma.college.findUnique({ where: { slug } })) {
      slug = `${slugBase}-${n++}`;
    }

    const cleanName = rawName.replace(/\\n/g, " ").trim();
    const created = await prisma.college.create({
      data: {
        slug,
        name: cleanName,
        stateSlug: options.stateSlug,
        city: parseCityFromName(cleanName),
        collegeType: options.instituteTypeToCollegeType(
          instituteType ?? "",
          cutoffCollegeType
        ),
        seatCount: 0,
        quotaInfo: "",
      },
    });
    const alias = await prisma.collegeAlias.create({
      data: {
        collegeId: created.collegeId,
        source: options.aliasSource,
        rawName: cleanName,
        matchKey: normalizeMatchKey(rawName),
      },
    });
    colleges = [...colleges, { ...created, aliases: [alias] }];
    return created.collegeId;
  };

  return { resolve, ensureCollege };
}
