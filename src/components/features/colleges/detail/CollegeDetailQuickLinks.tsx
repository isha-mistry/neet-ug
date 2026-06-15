import Link from "next/link";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { Card } from "@/components/ui/Card";

interface CollegeDetailQuickLinksProps {
  stateName: string;
  stateSlug: string;
}

const links = (stateName: string, stateSlug: string) =>
  [
    {
      href: "/college-predictor",
      icon: "school",
      label: "College predictor",
    },
    {
      href: "/cutoff-analyser",
      icon: "analytics",
      label: "Cutoff analyser",
    },
    {
      href: `/colleges/state/${stateSlug}`,
      icon: "map",
      label: `All colleges in ${stateName}`,
    },
    {
      href: "/rank-predictor",
      icon: "trending_up",
      label: "Rank predictor",
    },
  ] as const;

export function CollegeDetailQuickLinks({
  stateName,
  stateSlug,
}: CollegeDetailQuickLinksProps) {
  return (
    <Card padded bordered className="border-outline-variant bg-surface-container-low">
      <h2 className="mb-3 text-sm font-bold text-on-surface">Explore tools</h2>
      <ul className="flex flex-col gap-1">
        {links(stateName, stateSlug).map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-on-surface-variant transition hover:bg-surface-container-lowest hover:text-primary"
            >
              <MaterialSymbol name={item.icon} className="text-lg text-primary" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
