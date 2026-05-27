"use client";

import { FiBarChart2, FiPhoneCall } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { useComparisonStore } from "@/store/comparison.store";

interface DetailCTAGroupProps {
  collegeSlug: string;
}

export function DetailCTAGroup({ collegeSlug }: DetailCTAGroupProps) {
  const isSelected = useComparisonStore((state) =>
    state.selectedSlugs.includes(collegeSlug)
  );
  const toggle = useComparisonStore((state) => state.toggle);
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-surface-elevated p-4 md:p-5">
      <div className="flex flex-1 flex-col">
        <h3 className="text-base font-semibold tracking-snug text-text">
          Decide with confidence
        </h3>
        <p className="text-sm tracking-wide text-text-muted">
          Compare this college with others or get guided counseling.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant={isSelected ? "secondary" : "primary"}
          leadingIcon={<FiBarChart2 aria-hidden="true" />}
          onClick={() => toggle(collegeSlug)}
        >
          {isSelected ? "Added to Compare" : "Add to Compare"}
        </Button>
        <Button
          as="link"
          href="/counseling"
          variant="outline"
          leadingIcon={<FiPhoneCall aria-hidden="true" />}
        >
          Get Counseling
        </Button>
      </div>
    </div>
  );
}
