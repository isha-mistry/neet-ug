import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { DetailSectionHeader } from "@/components/features/colleges/shared/DetailSectionHeader";
import { DetailPanel } from "@/components/features/colleges/shared/DetailPanel";
import { buildDecisionSnapshot } from "@/lib/colleges/decision-snapshot";
import type { CollegeDetailViewModel } from "@/types/detail";
import { cn } from "@/lib/utils";

interface CollegeDecisionSnapshotProps {
  college: CollegeDetailViewModel;
}

const toneIcon = {
  positive: "check_circle",
  caution: "warning",
  neutral: "info",
} as const;

const toneClass = {
  positive: "text-secondary",
  caution: "text-error",
  neutral: "text-primary",
};

export function CollegeDecisionSnapshot({ college }: CollegeDecisionSnapshotProps) {
  const lines = buildDecisionSnapshot(college);
  if (lines.length === 0) return null;

  return (
    <DetailPanel>
      <div className="flex flex-col gap-5">
        <DetailSectionHeader
          eyebrow="At a glance"
          title="Decision snapshot"
          description="Quick read before you dive into cutoffs, seats, and fees."
          icon="fact_check"
        />
        <ul className="flex flex-col gap-3">
          {lines.map((line, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-sm leading-relaxed text-on-surface"
            >
              <MaterialSymbol
                name={toneIcon[line.tone]}
                className={cn("mt-0.5 shrink-0 text-lg", toneClass[line.tone])}
              />
              <span>{line.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </DetailPanel>
  );
}
