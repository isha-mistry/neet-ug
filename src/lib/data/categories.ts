import { dravioData } from "./source";
import type { CategoryRecord } from "@/types/college";
import type { CollegeFilters } from "@/types/filters";

export function getAllCategories(): CategoryRecord[] {
  return dravioData.categories;
}

export function findCategoryBySlug(slug: string): CategoryRecord | undefined {
  return dravioData.categories.find((c) => c.slug === slug);
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
