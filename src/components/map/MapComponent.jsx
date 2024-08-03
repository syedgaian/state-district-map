import React, { useEffect, useRef, useState } from "react";
import { TileLayer, GeoJSON, Marker, useMap, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({
	center,
	geoJsonData,
	isSelectEnabled,
	shouldTriggerReset,
	setReset,
}) => {
	const map = useMap();
	const geoJsonLayerRef = useRef(null);
	const markerRef = useRef(null);

	const [selectedPoints, setSelectedPoints] = useState([]);

	useEffect(() => {
		map.setView(center, map.getZoom(), {
			animate: true,
		});
	}, [center, map]);

	const onEachFeature = (feature, layer) => {
		if (feature.properties && feature.properties.name) {
			layer.bindPopup(feature.properties.name);
		}
	};

	useEffect(() => {
		if (geoJsonLayerRef.current) {
			geoJsonLayerRef.current.clearLayers();
			geoJsonLayerRef.current.addData(geoJsonData);
		}
	}, [geoJsonData]);

	useEffect(() => {
		if (markerRef.current) {
			markerRef.current.setLatLng(center);
		}
		map.setView(center, map.getZoom(), {
			animate: true,
		});
	}, [center, map]);

	const handleMapClick = (e) => {
		if (isSelectEnabled) {
			const { latlng } = e;
			setSelectedPoints([...selectedPoints, [latlng.lat, latlng.lng]]);
		}
	};

	const getGeoJson = () => {
		const polygon = L.polygon(selectedPoints);
		const geoJson = polygon.toGeoJSON();
		console.log(geoJson);
	};

	useEffect(() => {
		if (selectedPoints.length > 2) {
			getGeoJson();
		}
	}, [selectedPoints]);

	useEffect(() => {
		if (shouldTriggerReset) {
			setSelectedPoints([]);
			setReset(false);
		}
	}, [shouldTriggerReset]);

	useEffect(() => {
		if (!isSelectEnabled) {
			map.removeEventListener("click");
		}
	}, [isSelectEnabled]);

	return (
		<div className="w-full h-full">
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<Marker position={center} ref={markerRef} />
			<GeoJSON
				data={geoJsonData}
				onEachFeature={onEachFeature}
				ref={geoJsonLayerRef}
			/>
			{isSelectEnabled && selectedPoints.length > 0 && (
				<Polygon positions={selectedPoints} />
			)}
			{isSelectEnabled && (
				<div
					onClick={() =>
						map.addEventListener("click", handleMapClick)
					}
					style={{ height: "100%", width: "100%" }}
				/>
			)}
		</div>
	);
};

export default MapComponent;
