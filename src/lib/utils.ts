import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Feature, MultiPolygon } from "geojson";
import * as turf from "@turf/turf";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function calculateGeoJsonCenter(
	geoJson: Feature<MultiPolygon>
): [number, number] {
	const centroid = turf.centroid(geoJson);
	const coordinates = centroid.geometry.coordinates as [number, number];
	// [lat, long]
	return [coordinates[1], coordinates[0]];
}
