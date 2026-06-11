import { geoBounds, geoMercator } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import gujarat from "@/data/maps/gujarat.json";
import madhyaPradesh from "@/data/maps/madhyapradesh.json";
import maharashtra from "@/data/maps/maharashtra.json";
import rajasthan from "@/data/maps/rajasthan.json";

export const STATE_DISTRICT_MAP_WIDTH = 320;
export const STATE_DISTRICT_MAP_HEIGHT = 160;

export type StateDistrictMapSlug =
  | "gujarat"
  | "rajasthan"
  | "maharashtra"
  | "madhya-pradesh";

interface StateDistrictMapSource {
  topology: Topology;
  objectKey: string;
}

export const STATE_DISTRICT_MAP_SOURCES: Record<
  StateDistrictMapSlug,
  StateDistrictMapSource
> = {
  gujarat: {
    topology: gujarat as unknown as Topology,
    objectKey: "gujarat_district",
  },
  rajasthan: {
    topology: rajasthan as unknown as Topology,
    objectKey: "rajasthan_district",
  },
  maharashtra: {
    topology: maharashtra as unknown as Topology,
    objectKey: "maharashtra_district",
  },
  "madhya-pradesh": {
    topology: madhyaPradesh as unknown as Topology,
    objectKey: "madhyapradesh_district",
  },
};

export interface StateDistrictProjection {
  center: [number, number];
  scale: number;
  width: number;
  height: number;
}

function boundsForFeatureCollection(
  collection: FeatureCollection<Geometry>
): [[number, number], [number, number]] {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;

  for (const f of collection.features) {
    const [[fx0, fy0], [fx1, fy1]] = geoBounds(f as Feature);
    x0 = Math.min(x0, fx0);
    y0 = Math.min(y0, fy0);
    x1 = Math.max(x1, fx1);
    y1 = Math.max(y1, fy1);
  }

  return [
    [x0, y0],
    [x1, y1],
  ];
}

function computeProjection(
  source: StateDistrictMapSource,
  width: number,
  height: number
): StateDistrictProjection {
  const object = source.topology.objects[source.objectKey];
  if (!object) {
    return { center: [78, 22], scale: 2500, width, height };
  }

  const geo = feature(source.topology, object);
  if (geo.type !== "FeatureCollection") {
    return { center: [78, 22], scale: 2500, width, height };
  }
  const bounds = boundsForFeatureCollection(geo);
  const [[x0, y0], [x1, y1]] = bounds;
  const center: [number, number] = [(x0 + x1) / 2, (y0 + y1) / 2];

  const mercator = geoMercator()
    .center(center)
    .translate([width / 2, height / 2])
    .scale(1);

  const topLeft = mercator([x0, y1]);
  const bottomRight = mercator([x1, y0]);
  if (!topLeft || !bottomRight) {
    return { center, scale: 2500, width, height };
  }

  const dx = Math.abs(bottomRight[0] - topLeft[0]);
  const dy = Math.abs(bottomRight[1] - topLeft[1]);
  const padding = 1.12;
  const scale = padding * Math.min(width / dx, height / dy);

  return { center, scale, width, height };
}

export const STATE_DISTRICT_PROJECTIONS: Record<
  StateDistrictMapSlug,
  StateDistrictProjection
> = {
  gujarat: computeProjection(
    STATE_DISTRICT_MAP_SOURCES.gujarat,
    STATE_DISTRICT_MAP_WIDTH,
    STATE_DISTRICT_MAP_HEIGHT
  ),
  rajasthan: computeProjection(
    STATE_DISTRICT_MAP_SOURCES.rajasthan,
    STATE_DISTRICT_MAP_WIDTH,
    STATE_DISTRICT_MAP_HEIGHT
  ),
  maharashtra: computeProjection(
    STATE_DISTRICT_MAP_SOURCES.maharashtra,
    STATE_DISTRICT_MAP_WIDTH,
    STATE_DISTRICT_MAP_HEIGHT
  ),
  "madhya-pradesh": computeProjection(
    STATE_DISTRICT_MAP_SOURCES["madhya-pradesh"],
    STATE_DISTRICT_MAP_WIDTH,
    STATE_DISTRICT_MAP_HEIGHT
  ),
};
