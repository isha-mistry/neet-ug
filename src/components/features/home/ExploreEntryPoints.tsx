import Link from "next/link";
import type { HomeExploreEntry } from "@/types/site";

interface ExploreEntryPointsProps {
  entries: HomeExploreEntry[];
}

export function ExploreEntryPoints({ entries }: ExploreEntryPointsProps) {
  // Map styles dynamically based on index to match design reference
  const getStyles = (index: number) => {
    switch (index % 4) {
      case 0:
        return {
          bg: "bg-primary-fixed text-primary group-hover:bg-primary group-hover:text-on-primary",
          icon: "list_alt",
        };
      case 1:
        return {
          bg: "bg-secondary-fixed text-secondary group-hover:bg-secondary group-hover:text-on-primary",
          icon: "map",
        };
      case 2:
        return {
          bg: "bg-tertiary-fixed text-tertiary group-hover:bg-tertiary group-hover:text-on-primary",
          icon: "category",
        };
      case 3:
      default:
        return {
          bg: "bg-primary-fixed text-primary group-hover:bg-primary group-hover:text-on-primary",
          icon: "compare_arrows",
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {entries.map((entry, index) => {
        const { bg, icon } = getStyles(index);
        return (
          <Link
            key={entry.id}
            href={entry.href}
            className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors ${bg}`}
            >
              <span className="material-symbols-outlined">{icon}</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
              {entry.title}
            </h3>
            <p className="text-on-surface-variant text-body-sm mb-6">
              {entry.description}
            </p>
            <div className="flex items-center text-primary font-label-md gap-1 group-hover:gap-2 transition-all">
              Explore <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
