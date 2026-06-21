"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  STATE_DISTRICT_MAP_SOURCES,
  STATE_DISTRICT_PROJECTIONS,
  type StateDistrictMapSlug,
} from "@/lib/maps/state-district-topology";
import { cn } from "@/lib/utils";

const MAP_FILLS = {
  soft: {
    default: "var(--color-primary-fixed)",
    hover: "var(--color-primary-container)",
    pressed: "var(--color-primary)",
  },
  brand: {
    default: "color-mix(in srgb, var(--color-primary) 32%, #ffffff)",
    hover: "var(--color-primary)",
    pressed: "var(--color-primary-pressed)",
  },
} as const;

const STROKE = "#ffffff";

interface StateDistrictMiniMapProps {
  stateSlug: StateDistrictMapSlug;
  className?: string;
  /** Slightly stronger fill when the parent card is hovered */
  emphasized?: boolean;
  variant?: keyof typeof MAP_FILLS;
}

export function StateDistrictMiniMap({
  stateSlug,
  className,
  emphasized = false,
  variant = "soft",
}: StateDistrictMiniMapProps) {
  const source = STATE_DISTRICT_MAP_SOURCES[stateSlug];
  const projection = STATE_DISTRICT_PROJECTIONS[stateSlug];
  const fills = MAP_FILLS[variant];
  const fillDefault = emphasized ? fills.hover : fills.default;

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
      aria-hidden
    >
      <ComposableMap
        projection="geoMercator"
        width={projection.width}
        height={projection.height}
        projectionConfig={{
          scale: projection.scale,
          center: projection.center,
        }}
        className="block h-full w-full [&_svg]:mx-auto [&_svg]:block [&_svg]:h-full [&_svg]:w-full [&_svg]:max-h-full [&_svg]:drop-shadow-sm"
      >
        <Geographies geography={source.topology}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: fillDefault,
                    stroke: STROKE,
                    strokeWidth: 0.55,
                    outline: "none",
                    transition: "fill 200ms ease",
                  },
                  hover: {
                    fill: fills.hover,
                    stroke: STROKE,
                    strokeWidth: 0.65,
                    outline: "none",
                  },
                  pressed: {
                    fill: fills.pressed,
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
