"use client";

import { create } from "zustand";
import { COMPARISON_MAX_SELECTIONS } from "@/lib/constants";

interface ComparisonState {
  selectedSlugs: string[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  toggle: (slug: string) => void;
  clear: () => void;
  setMany: (slugs: string[]) => void;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  selectedSlugs: [],
  add: (slug) =>
    set((state) => {
      if (state.selectedSlugs.includes(slug)) return state;
      if (state.selectedSlugs.length >= COMPARISON_MAX_SELECTIONS) return state;
      return { selectedSlugs: [...state.selectedSlugs, slug] };
    }),
  remove: (slug) =>
    set((state) => ({
      selectedSlugs: state.selectedSlugs.filter((s) => s !== slug),
    })),
  toggle: (slug) => {
    const exists = get().selectedSlugs.includes(slug);
    if (exists) {
      get().remove(slug);
    } else {
      get().add(slug);
    }
  },
  clear: () => set({ selectedSlugs: [] }),
  setMany: (slugs) =>
    set({
      selectedSlugs: Array.from(new Set(slugs)).slice(
        0,
        COMPARISON_MAX_SELECTIONS
      ),
    }),
}));
