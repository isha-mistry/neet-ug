import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { StatesExplorer } from "@/components/features/colleges/directory/StatesExplorer";
import { getStateDirectoryItems } from "@/lib/data/directory";
import { getStateMapStats } from "@/lib/data/state-map-stats";
import { formatNumber } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "MBBS Colleges by State",
    description:
      "Browse MBBS colleges state by state with counseling context, seat counts, and competition levels.",
    path: "/colleges/state",
  });
}

export default async function StatesDirectoryPage() {
  const [states, mapStats] = await Promise.all([
    getStateDirectoryItems(),
    getStateMapStats(),
  ]);

  const stateCount = states.length;
  const totalColleges = mapStats.reduce((sum, s) => sum + s.collegeCount, 0);
  const totalSeats = mapStats.reduce((sum, s) => sum + s.totalSeats, 0);

  return (
    <div className="flex w-full flex-col gap-4">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Colleges", href: "/colleges" },
          { label: "States" },
        ]}
      />

      <header className="w-full space-y-2 border-b border-border pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-700">
          State-wise discovery
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl">
          MBBS colleges by state
        </h1>
        <p className="max-w-3xl text-sm text-text-secondary">
          Darker blue on the map means more colleges in our catalog. Hover the
          map for counts, or choose a state in the list.
        </p>
        <p className="text-sm font-medium tabular-nums text-text" role="status">
          {formatNumber(stateCount)} states
          <span className="mx-2 text-text-muted">·</span>
          {formatNumber(totalColleges)} colleges
          <span className="mx-2 text-text-muted">·</span>
          {formatNumber(totalSeats)} seats
        </p>
      </header>

      <StatesExplorer
        states={states}
        mapStats={mapStats}
        stateCount={stateCount}
      />
    </div>
  );
}
