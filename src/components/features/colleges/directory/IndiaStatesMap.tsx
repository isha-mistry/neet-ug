"use client";

import {
  useMemo,
  useState,
  useRef,
  useId,
  useLayoutEffect,
  type MouseEvent,
  type RefObject,
} from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { formatNumber, cn } from "@/lib/utils";
import { stateSlugFromMapName } from "@/lib/maps/state-geo-keys";
import india, {
  INDIA_MAP_ASIDE_SCALE,
  INDIA_MAP_BANNER_SCALE,
  INDIA_MAP_CENTER,
  INDIA_MAP_HEIGHT,
  INDIA_MAP_PANEL_SCALE,
  INDIA_MAP_WIDTH,
} from "@/lib/maps/india-topology";
import type { StateMapStat } from "@/lib/data/state-map-stats";
import {
  anchorToMapContainerCoords,
  buildStateCentroidAnchors,
} from "@/lib/maps/india-state-centroids";

/** MedSeat primary scale (see globals.css --color-primary-*) */
const NO_DATA_FILL = "#e1e2e4";
const ACTIVE_FILL = "#0052cc";
const ACTIVE_PRESSED_FILL = "#003d9b";
const ACTIVE_STROKE_WIDTH = 1.1;
const FILL_LIGHT = { r: 218, g: 226, b: 255 };
const FILL_DARK = { r: 0, g: 61, b: 155 };

function choroplethFill(count: number, max: number): string {
  if (count <= 0) return NO_DATA_FILL;
  const t = Math.min(1, count / max);
  const r = Math.round(FILL_LIGHT.r + (FILL_DARK.r - FILL_LIGHT.r) * t);
  const g = Math.round(FILL_LIGHT.g + (FILL_DARK.g - FILL_LIGHT.g) * t);
  const b = Math.round(FILL_LIGHT.b + (FILL_DARK.b - FILL_LIGHT.b) * t);
  return `rgb(${r},${g},${b})`;
}

interface HoverTooltip {
  stat: StateMapStat;
  x: number;
  y: number;
}

interface IndiaStatesMapProps {
  stats: StateMapStat[];
  layout?: "banner" | "aside" | "panel";
  className?: string;
  activeSlug?: string | null;
  onActiveSlugChange?: (slug: string | null) => void;
  explorerRef?: RefObject<HTMLDivElement | null>;
}

export function IndiaStatesMap({
  stats,
  layout = "banner",
  className,
  activeSlug = null,
  onActiveSlugChange,
  explorerRef,
}: IndiaStatesMapProps) {
  const router = useRouter();
  const mapRootRef = useRef<HTMLDivElement>(null);
  const mapDescId = useId();
  const isPanel = layout === "panel";
  const isAside = layout === "aside";
  const scale = isPanel
    ? INDIA_MAP_PANEL_SCALE
    : isAside
      ? INDIA_MAP_ASIDE_SCALE
      : INDIA_MAP_BANNER_SCALE;

  const bySlug = useMemo(
    () => new Map(stats.map((s) => [s.slug, s])),
    [stats]
  );
  const maxColleges = useMemo(
    () => Math.max(1, ...stats.map((s) => s.collegeCount)),
    [stats]
  );

  const [tooltip, setTooltip] = useState<HoverTooltip | null>(null);
  const [listTooltip, setListTooltip] = useState<HoverTooltip | null>(null);

  const centroidAnchors = useMemo(
    () => buildStateCentroidAnchors(scale),
    [scale]
  );

  useLayoutEffect(() => {
    if (tooltip || !activeSlug) {
      setListTooltip(null);
      return;
    }
    const stat = bySlug.get(activeSlug);
    const anchor = centroidAnchors.get(activeSlug);
    if (!stat || !anchor) {
      setListTooltip(null);
      return;
    }
    const position = anchorToMapContainerCoords(mapRootRef.current, anchor);
    if (!position) {
      setListTooltip(null);
      return;
    }
    setListTooltip({ stat, x: position.x, y: position.y });
  }, [activeSlug, tooltip, bySlug, centroidAnchors]);

  useLayoutEffect(() => {
    if (!activeSlug || tooltip) return;

    const root = mapRootRef.current;
    if (!root) return;

    const update = () => {
      const stat = bySlug.get(activeSlug);
      const anchor = centroidAnchors.get(activeSlug);
      if (!stat || !anchor) return;
      const position = anchorToMapContainerCoords(root, anchor);
      if (position) setListTooltip({ stat, x: position.x, y: position.y });
    };

    const observer = new ResizeObserver(update);
    observer.observe(root);
    const svg = root.querySelector("svg");
    if (svg) observer.observe(svg);

    return () => observer.disconnect();
  }, [activeSlug, tooltip, bySlug, centroidAnchors]);

  function onHover(
    event: MouseEvent<SVGPathElement>,
    stat: StateMapStat | undefined
  ) {
    if (!stat) {
      setTooltip(null);
      return;
    }
    const rect = mapRootRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      stat,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }

  const legend = (
    <ul
      className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-text-muted"
      aria-label="Map legend"
    >
      <LegendItem label="Fewer" color={choroplethFill(1, maxColleges)} />
      <LegendItem
        label="More"
        color={choroplethFill(maxColleges, maxColleges)}
      />
      <LegendItem label="No data" color={NO_DATA_FILL} />
    </ul>
  );

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-border",
        isPanel
          ? "flex h-full max-h-full min-h-[280px] w-full flex-col bg-[#f4f7f6] lg:min-h-0"
          : isAside
            ? "h-full min-h-[240px] bg-[#f4f7f6]"
            : "bg-surface",
        className
      )}
      aria-describedby={mapDescId}
    >
      <p id={mapDescId} className="sr-only">
        Map of India by state. Hover for college and seat counts. Click or press
        Enter to open a state.
      </p>

      <div
        ref={mapRootRef}
        className={cn(
          "relative flex flex-1 justify-center px-1",
          isPanel
            ? "min-h-[280px] w-full flex-1 items-start overflow-hidden pt-2 sm:pt-3"
            : isAside
              ? "min-h-[200px] items-start py-2"
              : "max-h-[min(42vh,22rem)] items-center bg-[#f4f7f6] py-3 sm:max-h-[24rem]"
        )}
        onMouseLeave={(e) => {
          const related = e.relatedTarget as Node | null;
          if (related && explorerRef?.current?.contains(related)) {
            return;
          }
          setTooltip(null);
          onActiveSlugChange?.(null);
        }}
      >
        <ComposableMap
          projection="geoMercator"
          width={INDIA_MAP_WIDTH}
          height={INDIA_MAP_HEIGHT}
          projectionConfig={{
            scale,
            center: INDIA_MAP_CENTER,
          }}
          className={cn(
            "block w-full max-w-none [&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-none",
            isPanel
              ? "[&_svg]:max-h-[min(52vh,420px)] lg:max-h-[calc(100vh-11rem)]"
              : isAside
                ? "[&_svg]:max-h-[220px]"
                : "[&_svg]:max-h-[min(38vh,20rem)]"
          )}
        >
          <Geographies geography={india}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { ST_NM } = geo.properties as { ST_NM?: string };
                const slug = stateSlugFromMapName(ST_NM);
                const stat = slug ? bySlug.get(slug) : undefined;
                const isClickable = (stat?.collegeCount ?? 0) > 0;
                const label = stat?.name ?? ST_NM ?? "State";
                const isActive = Boolean(slug && slug === activeSlug);
                const defaultFill = isActive
                  ? ACTIVE_FILL
                  : choroplethFill(stat?.collegeCount ?? 0, maxColleges);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    tabIndex={isClickable ? 0 : -1}
                    aria-label={
                      isClickable
                        ? `${label}: ${formatNumber(stat!.collegeCount)} colleges, ${formatNumber(stat!.totalSeats)} seats`
                        : `${label}: no catalog data`
                    }
                    onMouseEnter={(e) => {
                      if (slug) onActiveSlugChange?.(slug);
                      onHover(e, stat);
                    }}
                    onMouseMove={(e) => onHover(e, stat)}
                    onMouseLeave={() => setTooltip(null)}
                    onClick={() => {
                      if (slug && isClickable) {
                        router.push(`/colleges/state/${slug}`);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (
                        isClickable &&
                        slug &&
                        (e.key === "Enter" || e.key === " ")
                      ) {
                        e.preventDefault();
                        router.push(`/colleges/state/${slug}`);
                      }
                    }}
                    style={{
                      default: {
                        fill: defaultFill,
                        stroke: "#fff",
                        strokeWidth: isActive ? ACTIVE_STROKE_WIDTH : 0.55,
                        outline: "none",
                      },
                      hover: {
                        fill: stat ? ACTIVE_FILL : NO_DATA_FILL,
                        outline: "none",
                        cursor: isClickable ? "pointer" : "default",
                      },
                      pressed: { fill: ACTIVE_PRESSED_FILL, outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {tooltip || listTooltip ? (
          <HoverTooltipCard tooltip={tooltip ?? listTooltip!} />
        ) : null}
      </div>

      <div
        className={cn(
          "border-t border-border/80 bg-surface/90 px-2.5 py-1.5",
          (isAside || isPanel) && "bg-surface"
        )}
      >
        {!isAside && !isPanel ? (
          <p className="mb-1 text-[11px] text-text-secondary">
            Hover for stats · click to open
          </p>
        ) : null}
        {legend}
      </div>
    </div>
  );
}

function HoverTooltipCard({ tooltip }: { tooltip: HoverTooltip }) {
  return (
    <div
      role="tooltip"
      className="pointer-events-none absolute z-20 rounded-lg border border-border bg-surface px-2.5 py-2 shadow-md"
      style={{
        left: Math.max(tooltip.x + 10, 6),
        top: Math.max(tooltip.y - 6, 6),
        transform: "translateY(-100%)",
      }}
    >
      <p className="text-sm font-semibold text-text">{tooltip.stat.name}</p>
      <p className="text-xs tabular-nums text-text-secondary">
        {formatNumber(tooltip.stat.collegeCount)} colleges ·{" "}
        {formatNumber(tooltip.stat.totalSeats)} seats
      </p>
    </div>
  );
}

function LegendItem({ label, color }: { label: string; color: string }) {
  return (
    <li className="inline-flex items-center gap-1">
      <span
        className="h-2 w-2 rounded-full ring-1 ring-black/10"
        style={{ background: color }}
        aria-hidden
      />
      {label}
    </li>
  );
}
