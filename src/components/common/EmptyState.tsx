import type { ReactNode } from "react";
import { FiInbox } from "react-icons/fi";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-pill)] bg-brand-50 text-brand-700">
        {icon ?? <FiInbox aria-hidden="true" />}
      </span>
      <div className="flex max-w-md flex-col gap-2">
        <h3 className="text-lg font-semibold tracking-snug text-text">{title}</h3>
        {description ? (
          <p className="text-sm leading-relaxed text-text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
