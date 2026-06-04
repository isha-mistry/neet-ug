import { feature } from "topojson-client";
import { geoCentroid, geoMercator } from "d3-geo";
import type { Topology } from "topojson-specification";
import india from "@/data/maps/india.json";
import {
  INDIA_MAP_CENTER,
  INDIA_MAP_HEIGHT,
  INDIA_MAP_WIDTH,
} from "@/lib/maps/india-topology";
import { stateSlugFromMapName } from "@/lib/maps/state-geo-keys";

const INDIA_STATES_OBJECT = "India-States";

const topology = india as unknown as Topology;

/** SVG-space anchor per catalog slug (same projection as the map). */
export function buildStateCentroidAnchors(
  scale: number
): Map<string, { x: number; y: number }> {
  const object = topology.objects[INDIA_STATES_OBJECT];
  if (!object) return new Map();

  const collection = feature(topology, object);
  const projection = geoMercator()
    .scale(scale)
    .center(INDIA_MAP_CENTER)
    .translate([INDIA_MAP_WIDTH / 2, INDIA_MAP_HEIGHT / 2]);

  const anchors = new Map<string, { x: number; y: number }>();

  if (collection.type !== "FeatureCollection") return anchors;

  for (const f of collection.features) {
    const stNm = (f.properties as { ST_NM?: string } | null)?.ST_NM;
    const slug = stateSlugFromMapName(stNm);
    if (!slug) continue;

    const projected = projection(geoCentroid(f));
    if (!projected) continue;
    anchors.set(slug, { x: projected[0], y: projected[1] });
  }

  return anchors;
}

export function anchorToMapContainerCoords(
  root: HTMLElement | null,
  anchor: { x: number; y: number }
): { x: number; y: number } | null {
  const svg = root?.querySelector("svg");
  if (!root || !svg) return null;

  const rootRect = root.getBoundingClientRect();
  const svgRect = svg.getBoundingClientRect();
  const scaleX = svgRect.width / INDIA_MAP_WIDTH;
  const scaleY = svgRect.height / INDIA_MAP_HEIGHT;

  return {
    x: svgRect.left - rootRect.left + anchor.x * scaleX,
    y: svgRect.top - rootRect.top + anchor.y * scaleY,
  };
}
