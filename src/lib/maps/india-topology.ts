import type { Topology } from "topojson-specification";
import india from "@/data/maps/india.json";

const indiaTopology = india as unknown as Topology;

export default indiaTopology;

/** Full-precision SVG size (internal). */
export const INDIA_MAP_WIDTH = 800;
export const INDIA_MAP_HEIGHT = 800;
export const INDIA_MAP_SCALE = Math.round(220 * (INDIA_MAP_WIDTH / 150));
export const INDIA_MAP_CENTER: [number, number] = [80, 22];

export const INDIA_MAP_BANNER_SCALE = Math.round(INDIA_MAP_SCALE * 0.92);

export const INDIA_MAP_ASIDE_SCALE = Math.round(INDIA_MAP_SCALE * 0.72);

/** Fills the map column at full width. */
export const INDIA_MAP_PANEL_SCALE = Math.round(INDIA_MAP_SCALE * 0.96);
