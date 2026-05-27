import { formatNumber } from "@/lib/utils";

interface SeatInfoProps {
  seats: number;
  quotaInfo?: string;
  label?: string;
}

export function SeatInfo({ seats, quotaInfo, label }: SeatInfoProps) {
  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          {label}
        </span>
      ) : null}
      <span className="text-lg font-semibold tracking-tight text-text">
        {formatNumber(seats)} Seats
      </span>
      {quotaInfo ? (
        <span className="text-xs tracking-wide text-text-muted">{quotaInfo}</span>
      ) : null}
    </div>
  );
}
