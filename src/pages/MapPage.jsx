import React, { useEffect, useState } from "react";
import CityMap from "../components/map/CityMap";
import { geojson } from "../components/map/geo-json";
import { calculateGeoJsonCenter, getZoomLevel } from "../lib/utils";
import LocationForm from "../components/forms/LocationForm";

const MapPage = () => {
	const [center, setCenter] = useState([17.38714, 78.491684]);
	const [geoJsonData, setGeoJsonData] = useState(geojson);
	const [surveyGeoJsonData, setSurveyGeoJsonData] = useState(null);
	const [surveyBounds, setSurveyBounds] = useState(null);
	const [zoom, setZoom] = useState(13);

	useEffect(() => {
		if (geoJsonData) {
			const newCenter = calculateGeoJsonCenter(geoJsonData);
			setCenter(newCenter);
		}
	}, [geoJsonData]);

	useEffect(() => {
		if (surveyGeoJsonData) {
			const newCenter = calculateGeoJsonCenter(surveyGeoJsonData);
			setCenter(newCenter);
			const zoom = getZoomLevel(surveyGeoJsonData);
			setZoom(zoom ?? 13);
		}
	}, [surveyGeoJsonData]);

	return (
		<div className="w-full h-full flex flex-col overflow-hidden">
			<h1 className="text-center my-4">City Map with GeoJSON</h1>
			<div className="w-full flex flex-1">
				<CityMap
					center={center}
					geoJsonData={geoJsonData}
					surveyGeoJsonData={surveyGeoJsonData}
					zoom={zoom}
				/>
				<LocationForm
					setGeoJsonData={setGeoJsonData}
					setSurveyGeoJsonData={setSurveyGeoJsonData}
					setSurveyBounds={setSurveyBounds} // Pass setSurveyBounds here
				/>
			</div>
		</div>
	);
};

export default MapPage;
