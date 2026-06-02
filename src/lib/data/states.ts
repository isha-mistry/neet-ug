import "server-only";
import { cache } from "react";
import { loadCatalogStates } from "./catalog-loader";
import type { StateRecord } from "@/types/college";

export const getAllStates = cache(async (): Promise<StateRecord[]> => {
  return loadCatalogStates();
});

export async function findStateBySlug(
  slug: string
): Promise<StateRecord | undefined> {
  const states = await getAllStates();
  return states.find((s) => s.slug === slug);
}
