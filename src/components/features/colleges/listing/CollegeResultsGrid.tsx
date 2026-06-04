import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/Button";
import { CollegeCard } from "./CollegeCard";
import type { CollegeSummary } from "@/types/listing";

interface CollegeResultsGridProps {
  colleges: CollegeSummary[];
  resetHref: string;
  rankCategoryShort: string;
  feeQuotaShort: string;
}

export function CollegeResultsGrid({
  colleges,
  resetHref,
  rankCategoryShort,
  feeQuotaShort,
}: CollegeResultsGridProps) {
  if (colleges.length === 0) {
    return (
      <EmptyState
        icon={<MaterialSymbol name="search" size="lg" className="text-outline" />}
        title="No colleges match these filters."
        description="Try a different quota, category, college type, or domicile state."
        action={
          <Button as="link" href={resetHref} variant="outline" size="sm">
            Clear Filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {colleges.map((college) => (
        <CollegeCard
          key={college.slug}
          college={college}
          rankCategoryShort={rankCategoryShort}
          feeQuotaShort={feeQuotaShort}
        />
      ))}
    </div>
  );
}
