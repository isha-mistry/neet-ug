"use client";

import Link from "next/link";
import { useState } from "react";
import { STATE_HUB_CARDS } from "@/lib/home-05/content";
import { mbbsStatePath } from "@/lib/mbbs-state/constants";
import { StateDistrictMiniMap } from "./StateDistrictMiniMap";

export function Home05StateHub() {
  return (
    <>
      <div className="mb-10 max-w-xl space-y-2">
        <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary">
          Regional coverage
        </span>
        <h2 className="font-headline-lg text-headline-lg">State Admission Hub</h2>
        <p className="text-on-surface-variant">
          Deep dive into real-time seat matrices, cut-off trends, and counseling
          schedules for India&apos;s major medical hubs.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATE_HUB_CARDS.map((state) => (
          <StateHubCard key={state.slug} state={state} />
        ))}
      </div>
    </>
  );
}

function StateHubCard({
  state,
}: {
  state: (typeof STATE_HUB_CARDS)[number];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={mbbsStatePath(state.slug)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group flex h-full flex-col rounded-2xl border border-outline-variant/80 bg-surface-container-lowest p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative mb-4 aspect-[5/3] overflow-hidden rounded-xl border border-outline-variant/40 bg-gradient-to-b from-primary-fixed/30 via-surface-container-low to-surface-container px-2 py-3 ring-1 ring-inset ring-white/40">
        <StateDistrictMiniMap stateSlug={state.slug} emphasized={hovered} />
        <span className="absolute bottom-2 right-2 rounded-lg bg-surface/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary shadow-sm backdrop-blur-sm">
          Live hub
        </span>
      </div>
      <h3 className="font-headline-md text-headline-md">{state.name}</h3>
      <p className="mt-1 font-label-md text-label-md text-secondary">{state.subtitle}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <span className="rounded-full bg-primary-container/15 px-3 py-1 text-xs font-semibold text-primary">
          {state.cutoff}
        </span>
        <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-primary">
          Explore
          <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </span>
      </div>
    </Link>
  );
}
