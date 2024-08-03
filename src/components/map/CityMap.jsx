import React, { useState } from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapComponent from "./MapComponent";
import { Toggle } from "../ui/toggle";
import { MousePointerClick } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import TimerResetIcon from "../icons/timer-reset";

const CityMap = ({ center, geoJsonData }) => {
	const [isSelectEnabled, enableSelect] = useState(false);
	const [shouldTriggerReset, setReset] = useState(false);
	return (
		<div className="w-full h-full">
			<div className="flex items-center justify-end space-x-2">
				<TooltipProvider>
					<Toggle
						pressed={isSelectEnabled}
						onPressedChange={() => enableSelect((prev) => !prev)}
					>
						<Tooltip>
							<TooltipTrigger asChild>
								<MousePointerClick />
							</TooltipTrigger>
							<TooltipContent>Enable Selection</TooltipContent>
						</Tooltip>
					</Toggle>
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								pressed={shouldTriggerReset}
								onPressedChange={() =>
									setReset((prev) => !prev)
								}
							>
								<TimerResetIcon className="h-5 w-5" />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Reset</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<MapContainer
				center={center}
				zoom={13}
				style={{ height: "100%", width: "100%" }}
			>
				<MapComponent
					isSelectEnabled={isSelectEnabled}
					center={center}
					geoJsonData={geoJsonData}
					shouldTriggerReset={shouldTriggerReset}
					setReset={setReset}
				/>
			</MapContainer>
		</div>
	);
};

export default CityMap;
