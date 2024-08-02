import React, { useEffect, useState } from "react";
import CityMap from "../components/map/CityMap";
import { geojson } from "../components/map/geo-json";
import { calculateGeoJsonCenter } from "../lib/utils";
import LocationForm from "../components/forms/LocationForm";
import { Feature, MultiPolygon } from "geojson";

const MapPage: React.FC = () => {
	const [center, setCenter] = useState<[number, number]>([
		17.38714, 78.491684,
	]);
	const [geoJsonData, setGeoJsonData] =
		useState<Feature<MultiPolygon>>(geojson);

	useEffect(() => {
		setCenter(calculateGeoJsonCenter(geoJsonData));
	}, [geoJsonData]);

	return (
		<div className="w-full h-full flex flex-col">
			<h1 className="text-center my-4">City Map with GeoJSON</h1>
			<div className="w-full flex flex-1">
				<CityMap center={center} geoJsonData={geoJsonData} />
				<LocationForm setGeoJsonData={setGeoJsonData} />
			</div>
		</div>
	);
};

export default MapPage;
