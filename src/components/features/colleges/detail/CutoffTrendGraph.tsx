import { Card, CardHeader } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";
import type { CollegeCutoff } from "@/types/college";

interface CutoffTrendGraphProps {
  cutoffs: CollegeCutoff[];
}

export function CutoffTrendGraph({ cutoffs }: CutoffTrendGraphProps) {
  const sorted = [...cutoffs].sort((a, b) => a.year - b.year);
  if (sorted.length === 0) return null;

  const maxRank = Math.max(...sorted.map((c) => c.rank));
  const minRank = Math.min(...sorted.map((c) => c.rank));
  const range = Math.max(1, maxRank - minRank);

  return (
    <Card padded bordered>
      <CardHeader
        title="Cutoff Trend"
        description="AIR cutoffs across the last five years."
      />
      <div className="mt-6 flex items-end gap-3 md:gap-5">
        {sorted.map((entry) => {
          const heightPct = ((maxRank - entry.rank) / range) * 100;
          return (
            <div
              key={entry.year}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <span className="text-xs font-semibold tracking-wide text-text">
                AIR {formatNumber(entry.rank)}
              </span>
              <div
                aria-hidden="true"
                className="flex w-full max-w-16 items-end overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface"
                style={{ height: "160px" }}
              >
                <div
                  className="w-full rounded-t-[var(--radius-md)] ms-gradient-strong"
                  style={{ height: `${Math.max(8, heightPct)}%` }}
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                {entry.year}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
