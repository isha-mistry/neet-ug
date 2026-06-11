import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/db/prisma";
import {
  assembleCollegeRecord,
  type CollegeCatalogRow,
} from "@/lib/catalog/assemble-college-record";
import { collegeCatalogInclude } from "@/lib/catalog/college-include";
import { setStateNameCache } from "@/lib/data/state-name-cache";
import type { CollegeRecord, StateRecord } from "@/types/college";

export const CATALOG_SOURCE_LABEL = "postgres" as const;

async function fetchCollegesFromPostgres(): Promise<CollegeRecord[]> {
  const rows = (await prisma.college.findMany({
    include: collegeCatalogInclude,
    orderBy: { slug: "asc" },
  })) as CollegeCatalogRow[];

  if (rows.length === 0) {
    throw new Error(
      "app.colleges is empty. Run npm run db:seed:catalog after migrations.",
    );
  }

  return rows.map(assembleCollegeRecord);
}

async function fetchStatesFromPostgres(): Promise<StateRecord[]> {
  const [states, aggregates] = await Promise.all([
    prisma.state.findMany({ orderBy: { name: "asc" } }),
    prisma.college.groupBy({
      by: ["stateSlug"],
      _count: { _all: true },
      _sum: { seatCount: true },
    }),
  ]);

  if (states.length === 0) {
    throw new Error(
      "app.states is empty. Run npm run db:seed:catalog after migrations.",
    );
  }

  const aggBySlug = new Map(
    aggregates.map((a) => [
      a.stateSlug,
      {
        collegeCount: a._count._all,
        totalSeats: a._sum.seatCount ?? 0,
      },
    ])
  );

  return states.map((s) => {
    const agg = aggBySlug.get(s.stateSlug);
    const collegeCount = agg?.collegeCount ?? 0;
    const totalSeats =
      s.totalSeats > 0 ? s.totalSeats : (agg?.totalSeats ?? 0);
    const intro =
      s.intro.trim() ||
      `${collegeCount} MBBS colleges listed for ${s.name}.`;

    return {
      slug: s.stateSlug,
      name: s.name,
      intro,
      totalSeats,
      competitionLevel: s.competitionLevel || "Medium",
    };
  });
}

let statesPromise: Promise<StateRecord[]> | undefined;
let collegesPromise: Promise<CollegeRecord[]> | undefined;

export const loadCatalogColleges = cache(async (): Promise<CollegeRecord[]> => {
  if (!collegesPromise) {
    collegesPromise = fetchCollegesFromPostgres();
  }
  const colleges = await collegesPromise;
  const states = await loadCatalogStates();
  setStateNameCache(new Map(states.map((s) => [s.slug, s.name])));
  return colleges;
});

export const loadCatalogStates = cache(async (): Promise<StateRecord[]> => {
  if (!statesPromise) {
    statesPromise = fetchStatesFromPostgres();
  }
  return statesPromise;
});

/** Detail pages: one college without loading the full catalog. */
export async function loadCollegeBySlugFromDb(
  slug: string
): Promise<CollegeRecord | null> {
  const row = (await prisma.college.findUnique({
    where: { slug },
    include: collegeCatalogInclude,
  })) as CollegeCatalogRow | null;
  return row ? assembleCollegeRecord(row) : null;
}
