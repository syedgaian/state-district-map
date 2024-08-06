// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge";
// import * as turf from "@turf/turf";

// export function cn(...inputs) {
// 	return twMerge(clsx(inputs));
// }

// export function calculateGeoJsonCenter(geoJson) {
// 	const centroid = turf.center(geoJson);
// 	const coordinates = centroid.geometry.coordinates;
// 	// [lat, long]
// 	return [coordinates[1], coordinates[0]];
// }

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as turf from "@turf/turf";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calculateGeoJsonCenter(geoJson) {
  if (!geoJson || !geoJson.features || geoJson.features.length === 0) {
    // Default center coordinates if no data
    return [17.38714, 78.491684]; // Hyderabad coordinates
  }
  const centroid = turf.center(geoJson);
  const coordinates = centroid.geometry.coordinates;
  // [lat, long]
  return [coordinates[1], coordinates[0]];
}

