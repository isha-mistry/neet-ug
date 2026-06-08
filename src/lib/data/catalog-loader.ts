import "server-only";
import { cache } from "react";
import { setStateNameCache } from "@/lib/data/state-name-cache";
import { prisma } from "@/lib/db/prisma";
import type { CollegeRecord, StateRecord } from "@/types/college";
import { mapDbCollegeToRecord } from "@/lib/colleges/mappers";

export const CATALOG_SOURCE_LABEL = "postgres" as const;

async function fetchCollegesFromPostgres(): Promise<CollegeRecord[]> {
  const rows = await prisma.college.findMany({
    orderBy: { slug: "asc" },
    include: {
      states: true,
      cutoffs: true,
      fee_schedules: {
        include: {
          fee_line_items: true,
        },
      },
      seat_snapshots: {
        include: {
          seat_buckets: true,
        },
      },
    },
  });
  if (rows.length === 0) {
    throw new Error(
      "colleges table is empty. Seed catalog data into Postgres before starting the app.",
    );
  }
  return rows.map((row) => mapDbCollegeToRecord(row));
}

async function fetchStatesFromPostgres(): Promise<StateRecord[]> {
  const rows = await prisma.states.findMany({
    orderBy: { state_slug: "asc" },
  });
  if (rows.length === 0) {
    throw new Error(
      "states table is empty. Seed catalog data into Postgres before starting the app.",
    );
  }
  return rows.map((row) => ({
    slug: row.state_slug,
    name: row.name,
    intro: row.intro,
    totalSeats: row.total_seats,
    competitionLevel: row.competition_level,
  }));
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
