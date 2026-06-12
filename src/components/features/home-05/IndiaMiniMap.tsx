"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import indiaTopology, {
  INDIA_MAP_CENTER,
  INDIA_MAP_HEIGHT,
  INDIA_MAP_WIDTH,
} from "@/lib/maps/india-topology";
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

const SCALE = {
  mini: 640,
  feature: 820,
} as const;

const STROKE = "#ffffff";

interface IndiaMiniMapProps {
  className?: string;
  emphasized?: boolean;
  variant?: keyof typeof MAP_FILLS;
  density?: keyof typeof SCALE;
}

export function IndiaMiniMap({
  className,
  emphasized = false,
  variant = "brand",
  density = "mini",
}: IndiaMiniMapProps) {
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
        width={INDIA_MAP_WIDTH}
        height={INDIA_MAP_HEIGHT}
        projectionConfig={{
          scale: SCALE[density],
          center: INDIA_MAP_CENTER,
        }}
        className="block h-full w-full [&_svg]:mx-auto [&_svg]:block [&_svg]:h-full [&_svg]:w-full [&_svg]:max-h-full [&_svg]:drop-shadow-sm"
      >
        <Geographies geography={indiaTopology}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: fillDefault,
                    stroke: STROKE,
                    strokeWidth: 0.45,
                    outline: "none",
                    transition: "fill 200ms ease",
                  },
                  hover: {
                    fill: fills.hover,
                    stroke: STROKE,
                    strokeWidth: 0.55,
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
