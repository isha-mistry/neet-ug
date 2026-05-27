import { medseatData } from "./source";
import type { CategoryRecord } from "@/types/college";
import type { CollegeFilters } from "@/types/filters";

export function getAllCategories(): CategoryRecord[] {
  return medseatData.categories;
}

export function findCategoryBySlug(slug: string): CategoryRecord | undefined {
  return medseatData.categories.find((c) => c.slug === slug);
}

export function presetToFilters(category: CategoryRecord): CollegeFilters {
  const preset: CollegeFilters = {};
  if (category.preset.collegeTypes) {
    preset.collegeTypes = category.preset.collegeTypes;
  }
  if (category.preset.maxTotalFee !== undefined) {
    preset.feeMax = category.preset.maxTotalFee;
  }
  return preset;
}
