import "server-only";
import { cache } from "react";
import { setStateNameCache } from "@/lib/data/state-name-cache";
import { prisma } from "@/lib/db/prisma";
import type { CollegeRecord, StateRecord } from "@/types/college";

export const CATALOG_SOURCE_LABEL = "postgres" as const;

async function fetchCollegesFromPostgres(): Promise<CollegeRecord[]> {
  const rows = await prisma.collegeDocument.findMany({
    orderBy: { slug: "asc" },
  });
  if (rows.length === 0) {
    throw new Error(
      "app.college_documents is empty. Seed catalog data into Postgres before starting the app.",
    );
  }
  return rows.map((row) => row.data as unknown as CollegeRecord);
}

async function fetchStatesFromPostgres(): Promise<StateRecord[]> {
  const rows = await prisma.stateDocument.findMany({
    orderBy: { slug: "asc" },
  });
  if (rows.length === 0) {
    throw new Error(
      "app.state_documents is empty. Seed catalog data into Postgres before starting the app.",
    );
  }
  return rows.map((row) => row.data as unknown as StateRecord);
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
