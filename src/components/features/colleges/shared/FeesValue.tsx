import { formatINR } from "@/lib/utils";

interface FeesValueProps {
  amount: number;
  label?: string;
  compact?: boolean;
}

export function FeesValue({ amount, label, compact }: FeesValueProps) {
  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          {label}
        </span>
      ) : null}
      <span className="text-lg font-semibold tracking-tight text-text">
        {formatINR(amount, { compact })}
      </span>
    </div>
  );
}
