// src/App.tsx

import React from "react";
import CityMap from "./components/map/CityMap";
import { geojson } from "./components/map/geo-json";
import "./App.css";
import { calculateGeoJsonCenter } from "./lib/utils";
import LocationForm from "./components/forms/LocationForm";

const App: React.FC = () => {
	const center = calculateGeoJsonCenter(geojson);

	return (
		<div className="w-full h-full flex flex-col">
			<h1 className="text-center my-8">City Map with GeoJSON</h1>
			<div className="w-full flex flex-1">
				<CityMap center={center} geoJsonData={geojson} />
				<LocationForm />
			</div>
		</div>
	);
};

export default App;
