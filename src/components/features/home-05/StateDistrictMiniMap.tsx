"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  STATE_DISTRICT_MAP_SOURCES,
  STATE_DISTRICT_PROJECTIONS,
  type StateDistrictMapSlug,
} from "@/lib/maps/state-district-topology";
import { cn } from "@/lib/utils";

const FILL_DEFAULT = "var(--color-primary-fixed)";
const FILL_HOVER = "var(--color-primary-container)";
const STROKE = "#ffffff";

interface StateDistrictMiniMapProps {
  stateSlug: StateDistrictMapSlug;
  className?: string;
  /** Slightly stronger fill when the parent card is hovered */
  emphasized?: boolean;
}

export function StateDistrictMiniMap({
  stateSlug,
  className,
  emphasized = false,
}: StateDistrictMiniMapProps) {
  const source = STATE_DISTRICT_MAP_SOURCES[stateSlug];
  const projection = STATE_DISTRICT_PROJECTIONS[stateSlug];

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
                    fill: emphasized ? FILL_HOVER : FILL_DEFAULT,
                    stroke: STROKE,
                    strokeWidth: 0.55,
                    outline: "none",
                    transition: "fill 200ms ease",
                  },
                  hover: {
                    fill: FILL_HOVER,
                    stroke: STROKE,
                    strokeWidth: 0.65,
                    outline: "none",
                  },
                  pressed: {
                    fill: "var(--color-primary)",
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
