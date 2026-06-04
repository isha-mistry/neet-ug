import { toTitleCase } from "@/lib/utils";
import type { CollegeType } from "@/types/college";
import { cn } from "@/lib/utils";

interface CollegeTypeBadgeProps {
  type: CollegeType;
}

const typeClasses = {
  government: "bg-college-type-government-bg text-college-type-government-fg",
  aiims: "bg-college-type-government-bg text-college-type-government-fg",
  deemed: "bg-college-type-deemed-bg text-college-type-deemed-fg",
  private: "bg-college-type-private-bg text-college-type-private-fg",
};

export function CollegeTypeBadge({ type }: CollegeTypeBadgeProps) {
  const classes = typeClasses[type] || typeClasses.deemed;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-sm border border-black/5",
        classes
      )}
    >
      {toTitleCase(type === "aiims" ? "AIIMS" : type)}
    </span>
  );
}
