import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as turf from "@turf/turf";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function calculateGeoJsonCenter(geoJson) {
	const centroid = turf.center(geoJson);
	const coordinates = centroid.geometry.coordinates;
	// [lat, long]
	return [coordinates[1], coordinates[0]];
}
