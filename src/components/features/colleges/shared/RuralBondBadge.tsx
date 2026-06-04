import type { CollegeBond } from "@/types/college";
import { formatINR } from "@/lib/utils";

interface RuralBondBadgeProps {
  bond: CollegeBond;
  showPenalty?: boolean;
}

export function RuralBondBadge({ bond, showPenalty = true }: RuralBondBadgeProps) {
  const hasBond = bond && bond.years > 0;

  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-sm border"
        style={
          hasBond
            ? {
                backgroundColor: "rgba(224, 231, 255, 0.8)",
                color: "#4338ca",
                borderColor: "#e0e7ff",
              }
            : {
                backgroundColor: "rgba(209, 250, 229, 0.8)",
                color: "#047857",
                borderColor: "#d1fae5",
              }
        }
      >
        {hasBond ? `${bond.years} Years` : "No Bond"}
      </span>
      {hasBond && showPenalty && (
        <span
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border shadow-sm"
          style={{
            backgroundColor: "var(--color-tertiary-fixed)",
            color: "var(--color-on-tertiary-fixed-variant)",
            borderColor: "rgba(255, 202, 129, 0.5)",
          }}
        >
          Penalty: {formatINR(bond.penalty)}
        </span>
      )}
    </div>
  );
}
