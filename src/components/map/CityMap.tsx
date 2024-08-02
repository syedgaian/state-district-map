import React, { useEffect, useRef } from "react";
import {
	MapContainer,
	TileLayer,
	GeoJSON,
	Marker,
	useMap,
} from "react-leaflet";
import { Feature, MultiPolygon } from "geojson";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface CityMapProps {
	center: [number, number];
	geoJsonData: Feature<MultiPolygon>;
}

const MapComponent: React.FC<CityMapProps> = ({ center, geoJsonData }) => {
	const map = useMap();
	const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
	const markerRef = useRef<L.Marker<any>>(null);

	useEffect(() => {
		map.setView(center, map.getZoom(), {
			animate: true,
		});
	}, [center, map]);

	const onEachFeature = (feature: any, layer: L.Layer) => {
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

	return (
		<>
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
		</>
	);
};

const CityMap: React.FC<CityMapProps> = ({ center, geoJsonData }) => {
	return (
		<MapContainer
			center={center}
			zoom={13}
			style={{ height: "100vh", width: "100%" }}
		>
			<MapComponent center={center} geoJsonData={geoJsonData} />
		</MapContainer>
	);
};

export default CityMap;
