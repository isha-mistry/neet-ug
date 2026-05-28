import { FiSearch } from "react-icons/fi";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/Button";
import { CollegeCard } from "./CollegeCard";
import type { CollegeSummary } from "@/types/listing";

interface CollegeResultsGridProps {
  colleges: CollegeSummary[];
  resetHref: string;
}

export function CollegeResultsGrid({
  colleges,
  resetHref,
}: CollegeResultsGridProps) {
  if (colleges.length === 0) {
    return (
      <EmptyState
        icon={<FiSearch aria-hidden="true" />}
        title="No colleges match these filters."
        description="Try widening the fee range, cutoff range, or removing some filters."
        action={
          <Button as="link" href={resetHref} variant="outline" size="sm">
            Clear Filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid items-stretch gap-5">
      {colleges.map((college) => (
        <CollegeCard key={college.slug} college={college} />
      ))}
    </div>
  );
}
