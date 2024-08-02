import React from "react";
import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
import { Feature, MultiPolygon } from "geojson";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface CityMapProps {
	center: [number, number];
	geoJsonData: Feature<MultiPolygon>;
}

const CityMap: React.FC<CityMapProps> = ({ center, geoJsonData }) => {
	const onEachFeature = (feature: any, layer: L.Layer) => {
		if (feature.properties && feature.properties.name) {
			layer.bindPopup(feature.properties.name);
		}
	};

	return (
		<MapContainer
			center={center}
			zoom={13}
			style={{ height: "100vh", width: "100%" }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<Marker position={center} />
			<GeoJSON data={geoJsonData} onEachFeature={onEachFeature} />
		</MapContainer>
	);
};

export default CityMap;
