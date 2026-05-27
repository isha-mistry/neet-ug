import { getAllStates } from "./states";
import { getAllCategories, presetToFilters } from "./categories";
import { getAllColleges, getCollegeListing } from "./colleges";
import type { StateDirectoryItem } from "@/components/features/colleges/directory/StateDirectoryGrid";
import type { CategoryDirectoryItem } from "@/components/features/colleges/directory/CategoryDirectoryGrid";

export function getStateDirectoryItems(): StateDirectoryItem[] {
  const colleges = getAllColleges();
  return getAllStates()
    .map((state) => ({
      ...state,
      collegeCount: colleges.filter((c) => c.stateSlug === state.slug).length,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCategoryDirectoryItems(): CategoryDirectoryItem[] {
  return getAllCategories()
    .map((category) => {
      const preset = presetToFilters(category);
      const listing = getCollegeListing({ ...preset, pageSize: 999 });
      return {
        ...category,
        collegeCount: listing.pagination.totalItems,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}
