"use client";

import { useRef, useState } from "react";
import { IndiaStatesMap } from "./IndiaStatesMap";
import { StateDirectoryList } from "./StateDirectoryList";
import type { StateDirectoryItem } from "./StateDirectoryList";
import type { StateMapStat } from "@/lib/data/state-map-stats";
import { formatNumber } from "@/lib/utils";

interface StatesExplorerProps {
  states: StateDirectoryItem[];
  mapStats: StateMapStat[];
  stateCount: number;
}

export function StatesExplorer({
  states,
  mapStats,
  stateCount,
}: StatesExplorerProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const explorerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={explorerRef}
      className="grid w-full rounded-[14px] border border-border bg-surface shadow-[var(--shadow-sm)] lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)] lg:items-start"
      aria-label="State map and directory"
    >
      <div className="w-full min-w-0 overflow-hidden rounded-lg border border-border bg-[#f4f7f6] lg:sticky lg:top-20 lg:z-10 lg:max-h-[calc(100vh-5rem)] lg:self-start">
        <IndiaStatesMap
          stats={mapStats}
          layout="panel"
          className="h-full w-full min-h-0 overflow-hidden rounded-none border-0 shadow-none lg:max-h-[calc(100vh-5rem)]"
          activeSlug={activeSlug}
          onActiveSlugChange={setActiveSlug}
          explorerRef={explorerRef}
        />
      </div>

      <section
        id="browse-states"
        aria-labelledby="browse-states-heading"
        className="flex min-h-0 min-w-0 w-full flex-col"
      >
        <div className="border-b border-border px-3 py-2.5 sm:px-4">
          <h2 id="browse-states-heading" className="text-sm font-bold text-text">
            All states ({formatNumber(stateCount)})
          </h2>
        </div>
        <div className="min-h-[280px]">
          <StateDirectoryList
            states={states}
            columns={1}
            embedded
            activeSlug={activeSlug}
            onActiveSlugChange={setActiveSlug}
            explorerRef={explorerRef}
          />
        </div>
      </section>
    </div>
  );
}
