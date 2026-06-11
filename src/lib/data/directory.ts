import { getAllStates } from "./states";
import { getAllCategories, presetToFilters } from "./categories";
import { getAllColleges, getCollegeListing } from "./colleges";
import type { StateDirectoryItem } from "@/components/features/colleges/directory/StateDirectoryList";
import type { CategoryDirectoryItem } from "@/components/features/colleges/directory/CategoryDirectoryGrid";

export async function getStateDirectoryItems(): Promise<StateDirectoryItem[]> {
  const colleges = await getAllColleges();
  const states = await getAllStates();
  return states
    .map((state) => {
      const inState = colleges.filter((c) => c.stateSlug === state.slug);
      const seatSum = inState.reduce((sum, c) => sum + c.seatCount, 0);
      return {
        ...state,
        collegeCount: inState.length,
        totalSeats: seatSum > 0 ? seatSum : state.totalSeats,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getCategoryDirectoryItems(): Promise<CategoryDirectoryItem[]> {
  const categories = getAllCategories();
  const items: CategoryDirectoryItem[] = [];

  for (const category of categories) {
    const preset = presetToFilters(category);
    const listing = await getCollegeListing({ ...preset, pageSize: 999 });
    items.push({
      ...category,
      collegeCount: listing.pagination.totalItems,
    });
  }

  return items.sort((a, b) => a.title.localeCompare(b.title));
}
