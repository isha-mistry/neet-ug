"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { COMPARISON_MAX_SELECTIONS } from "@/lib/constants";
import { useComparisonStore } from "@/store/comparison.store";

interface CollegeDetailComparePanelProps {
  slug: string;
  collegeName: string;
}

export function CollegeDetailComparePanel({
  slug,
  collegeName,
}: CollegeDetailComparePanelProps) {
  const selectedSlugs = useComparisonStore((s) => s.selectedSlugs);
  const add = useComparisonStore((s) => s.add);
  const remove = useComparisonStore((s) => s.remove);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const inCompare = hydrated && selectedSlugs.includes(slug);
  const atCapacity =
    hydrated &&
    selectedSlugs.length >= COMPARISON_MAX_SELECTIONS &&
    !inCompare;

  return (
    <Card padded bordered className="border-outline-variant bg-surface-container-lowest shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-on-primary-fixed">
            <MaterialSymbol name="compare_arrows" className="text-xl" />
          </span>
          <div>
            <h2 className="text-base font-bold text-on-surface">Compare colleges</h2>
            <p className="text-xs text-on-surface-variant">
              Add {collegeName.split(",")[0]} and up to{" "}
              {COMPARISON_MAX_SELECTIONS - 1} others side by side.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant={inCompare ? "secondary" : "primary"}
            fullWidth
            className="rounded-xl"
            disabled={atCapacity}
            onClick={() => (inCompare ? remove(slug) : add(slug))}
          >
            {inCompare ? "Remove from compare" : "Add to compare"}
          </Button>
          <Button
            as="link"
            href="/compare"
            variant="outline"
            fullWidth
            className="rounded-xl"
            trailingIcon={<MaterialSymbol name="arrow_forward" className="text-lg" />}
          >
            Open comparison tool
          </Button>
        </div>
        {hydrated && selectedSlugs.length > 0 ? (
          <p className="text-xs text-on-surface-variant">
            {selectedSlugs.length} selected ·{" "}
            <Link href="/compare" className="font-semibold text-primary">
              Review list
            </Link>
          </p>
        ) : null}
      </div>
    </Card>
  );
}
