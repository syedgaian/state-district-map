import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as turf from "@turf/turf";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calculateGeoJsonCenter(geoJson) {
  if (geoJson?.geometry?.coordinates?.length === 0) {
    // Default center coordinates if no data
    return [17.38714, 78.491684]; // Hyderabad coordinates
  }
  const centroid = turf.center(geoJson);
  const coordinates = centroid.geometry.coordinates;
  // [lat, long]
  return [coordinates[1], coordinates[0]];
}

export function getZoomLevel(geojson) {
  // Calculate the bounding box of the GeoJSON object
  const bbox = turf.bbox(geojson);

  // Extract the coordinates from the bounding box
  const [minLng, minLat, maxLng, maxLat] = bbox;

  // Define the dimensions of the bounding box
  const width = maxLng - minLng;
  const height = maxLat - minLat;

  // Calculate the map zoom level
  const worldWidth = 520;
  const lngZoom = Math.log2(worldWidth / width);
  const latZoom = Math.log2(worldWidth / height);
  const zoom = Math.min(lngZoom, latZoom);

  // Ensure the minimum zoom level is 13
  const minZoom = 13;
  return Math.max(Math.floor(zoom), minZoom);
}
