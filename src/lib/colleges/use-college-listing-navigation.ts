"use client";

import { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { buildListingHref } from "@/lib/colleges/search-params";
import type { CollegeFilters } from "@/types/filters";

interface UseCollegeListingNavigationOptions {
  basePath: string;
  filters: CollegeFilters;
  hiddenFields?: Array<"state" | "collegeType" | "collegeTypes">;
  lockedFilters?: Pick<CollegeFilters, "state" | "collegeTypes" | "feeMax">;
}

export function useCollegeListingNavigation({
  basePath,
  filters,
  hiddenFields = [],
  lockedFilters,
}: UseCollegeListingNavigationOptions) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const lockedState = lockedFilters?.state ?? filters.state;
  const lockedTypes = lockedFilters?.collegeTypes ?? filters.collegeTypes;

  const navigate = useCallback(
    (patch: Partial<CollegeFilters>) => {
      const next: CollegeFilters = {
        ...filters,
        ...patch,
        page: 1,
      };

      if (hiddenFields.includes("state") && lockedState) {
        next.state = lockedState;
      }
      if (hiddenFields.includes("collegeTypes") && lockedTypes?.length) {
        next.collegeTypes = lockedTypes;
        next.collegeType = undefined;
      }
      if (lockedFilters?.feeMax !== undefined) {
        next.feeMax = lockedFilters.feeMax;
      }

      startTransition(() => {
        router.push(buildListingHref(basePath, next));
      });
    },
    [
      basePath,
      filters,
      hiddenFields,
      lockedFilters?.feeMax,
      lockedState,
      lockedTypes,
      router,
    ]
  );

  return { navigate, isPending };
}
