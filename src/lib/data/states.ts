import { medseatData } from "./source";
import type { StateRecord } from "@/types/college";

export function getAllStates(): StateRecord[] {
  return medseatData.states;
}

export function findStateBySlug(slug: string): StateRecord | undefined {
  return medseatData.states.find((s) => s.slug === slug);
}
