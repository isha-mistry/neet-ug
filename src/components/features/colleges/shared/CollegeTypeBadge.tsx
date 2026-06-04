import { toTitleCase } from "@/lib/utils";
import type { CollegeType } from "@/types/college";

interface CollegeTypeBadgeProps {
  type: CollegeType;
}

const typeColors = {
  government: {
    bg: "var(--color-college-type-government-bg)",
    fg: "var(--color-college-type-government-fg)",
  },
  aiims: {
    bg: "var(--color-college-type-government-bg)",
    fg: "var(--color-college-type-government-fg)",
  },
  deemed: {
    bg: "var(--color-college-type-deemed-bg)",
    fg: "var(--color-college-type-deemed-fg)",
  },
  private: {
    bg: "var(--color-college-type-private-bg)",
    fg: "var(--color-college-type-private-fg)",
  },
};

export function CollegeTypeBadge({ type }: CollegeTypeBadgeProps) {
  const colors = typeColors[type] || typeColors.deemed;

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-sm border"
      style={{
        backgroundColor: colors.bg,
        color: colors.fg,
        borderColor: "rgba(0, 0, 0, 0.05)",
      }}
    >
      {toTitleCase(type === "aiims" ? "AIIMS" : type)}
    </span>
  );
}
