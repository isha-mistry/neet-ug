import Link from "next/link";
import { FiArrowRight, FiMapPin, FiUsers } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";
import type { StateRecord } from "@/types/college";

export interface StateDirectoryItem extends StateRecord {
  collegeCount: number;
}

interface StateDirectoryGridProps {
  states: StateDirectoryItem[];
}

export function StateDirectoryGrid({ states }: StateDirectoryGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {states.map((state) => (
        <Link
          key={state.slug}
          href={`/colleges/state/${state.slug}`}
          className="group flex"
        >
          <Card
            padded
            bordered
            elevated
            className="flex w-full flex-col gap-4 transition-shadow group-hover:shadow-[var(--shadow-md)]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                <FiMapPin aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="inline-flex items-center rounded-[var(--radius-pill)] bg-surface-muted px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-text-muted">
                {state.competitionLevel}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold tracking-snug text-text">
                {state.name}
              </h2>
              <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">
                {state.intro}
              </p>
            </div>
            <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
              <div className="flex flex-col gap-0.5">
                <dt className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-text-muted">
                  <FiUsers aria-hidden="true" />
                  Seats
                </dt>
                <dd className="font-semibold tracking-tight text-text">
                  {formatNumber(state.totalSeats)}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Colleges
                </dt>
                <dd className="font-semibold tracking-tight text-text">
                  {formatNumber(state.collegeCount)}
                </dd>
              </div>
            </dl>
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-brand-700">
              View colleges
              <FiArrowRight aria-hidden="true" />
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
