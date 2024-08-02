// src/MapComponent.tsx

import React, { useEffect } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Polygon,
	useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
	lat: number;
	lng: number;
	boundingBox: [number, number, number, number];
}

const MapComponent: React.FC<MapComponentProps> = ({
	lat,
	lng,
	boundingBox,
}) => {
	const map = useMap();

	useEffect(() => {
		map.setView([lat, lng], map.getZoom(), {
			animate: true,
		});
	}, [lat, lng, map]);

	const polygonCoords: [number, number][] = [
		[boundingBox[0], boundingBox[2]], // Bottom-left
		[boundingBox[0], boundingBox[3]], // Bottom-right
		[boundingBox[1], boundingBox[3]], // Top-right
		[boundingBox[1], boundingBox[2]], // Top-left
	];

	return (
		<>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<Marker position={[lat, lng]} />
			<Polygon positions={polygonCoords} color="blue" />
		</>
	);
};

const MapContainerComponent: React.FC<MapComponentProps> = ({
	lat,
	lng,
	boundingBox,
}) => {
	return (
		<MapContainer
			center={[lat, lng]}
			zoom={13}
			style={{ height: "100vh", width: "100%" }}
		>
			<MapComponent lat={lat} lng={lng} boundingBox={boundingBox} />
		</MapContainer>
	);
};

export default MapContainerComponent;
