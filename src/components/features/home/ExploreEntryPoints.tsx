import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { resolveIcon } from "./iconMap";
import type { HomeExploreEntry } from "@/types/site";

interface ExploreEntryPointsProps {
  entries: HomeExploreEntry[];
}

export function ExploreEntryPoints({ entries }: ExploreEntryPointsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {entries.map((entry) => {
        const Icon = resolveIcon(entry.icon);
        return (
          <Link
            key={entry.id}
            href={entry.href}
            className="group flex"
          >
            <Card
              padded
              bordered
              className="flex w-full flex-col gap-4 transition-shadow group-hover:shadow-[var(--shadow-md)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold tracking-snug text-text">
                  {entry.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {entry.description}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-brand-700">
                Explore
                <FiArrowRight aria-hidden="true" />
              </span>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
