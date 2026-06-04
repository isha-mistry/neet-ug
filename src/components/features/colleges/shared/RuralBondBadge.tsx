import type { CollegeBond } from "@/types/college";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface RuralBondBadgeProps {
  bond: CollegeBond;
  showPenalty?: boolean;
}

export function RuralBondBadge({ bond, showPenalty = true }: RuralBondBadgeProps) {
  const hasBond = bond && bond.years > 0;

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-sm border",
          hasBond
            ? "bg-indigo-50/80 text-indigo-700 border-indigo-200/50"
            : "bg-emerald-50/80 text-emerald-700 border-emerald-200/50"
        )}
      >
        {hasBond ? `${bond.years} Years` : "No Bond"}
      </span>
      {hasBond && showPenalty && (
        <span
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border border-tertiary-container/30 bg-tertiary-fixed text-on-tertiary-fixed-variant shadow-sm"
        >
          Penalty: {formatINR(bond.penalty)}
        </span>
      )}
    </div>
  );
}
