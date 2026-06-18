import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/Button";
import { CollegeCard } from "./CollegeCard";
import type { CollegeSummary } from "@/types/listing";

interface CollegeResultsGridProps {
  colleges: CollegeSummary[];
  resetHref: string;
  hasSearch?: boolean;
  rankCategoryShort: string;
  feeQuotaShort: string;
}

export function CollegeResultsGrid({
  colleges,
  resetHref,
  hasSearch = false,
  rankCategoryShort,
  feeQuotaShort,
}: CollegeResultsGridProps) {
  if (colleges.length === 0) {
    return (
      <EmptyState
        icon={<MaterialSymbol name="search" size="lg" className="text-outline" />}
        title="No colleges match these filters."
        description={
          hasSearch
            ? "Try a shorter search term, or clear search and relax the quota, fee, rank, or domicile filters."
            : "Try a different quota, category, college type, fee range, rank band, or domicile state."
        }
        action={
          <Button as="link" href={resetHref} variant="outline" size="sm">
            Clear Filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-2 lg:gap-6 xl:gap-8">
      {colleges.map((college) => (
        <CollegeCard
          key={college.slug}
          college={college}
          rankCategoryShort={rankCategoryShort}
          feeQuotaShort={feeQuotaShort}
          layout="grid"
        />
      ))}
    </div>
  );
}
