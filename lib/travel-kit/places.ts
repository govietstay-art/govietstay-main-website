import type { CityId } from "./types";

/**
 * A pin is added only after its coordinates are copied from a named source
 * and the source plus the date are written in SOURCES.md.
 * The list is empty. Nothing here is shown as a map.
 */
export type MapPoint = {
  id: string;
  city: CityId;
  name: string;
  lat: number;
  lon: number;
  source: string;
  verifiedOn: string;
};

export const MAP_POINTS: MapPoint[] = [];
