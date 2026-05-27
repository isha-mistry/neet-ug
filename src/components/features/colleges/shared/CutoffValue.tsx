import { formatNumber } from "@/lib/utils";

interface CutoffValueProps {
  rank: number;
  year: number;
  label?: string;
}

export function CutoffValue({ rank, year, label }: CutoffValueProps) {
  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          {label}
        </span>
      ) : null}
      <span className="text-lg font-semibold tracking-tight text-text">
        AIR {formatNumber(rank)}
      </span>
      <span className="text-xs tracking-wide text-text-muted">{year}</span>
    </div>
  );
}
