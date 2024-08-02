import { Dispatch, SetStateAction, useState } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../ui/card";
import { Label } from "../ui/label";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import { states } from "./state-data";
import { Feature, MultiPolygon } from "geojson";

type LocationFormProps = {
	setGeoJsonData: Dispatch<SetStateAction<Feature<MultiPolygon>>>;
};

export default function LocationForm({ setGeoJsonData }: LocationFormProps) {
	const [districts, setDistricts] = useState<string[]>([]);
	const [selectedDistrict, setSelectedDistrict] = useState<string>("");
	const [selectedState, setSelectedState] = useState<string>("");

	const handleStateChange = (value: string) => {
		setSelectedState(value);
		const state = states.find((state) => state.name === value);
		if (state) {
			setDistricts(state.districts);
		} else {
			setDistricts([]);
		}
		setSelectedDistrict("");
	};

	const handleDistrictChange = (value: string) => {
		setSelectedDistrict(value);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!selectedDistrict || !selectedState) {
			alert("Please select both state and district.");
			return;
		}

		try {
			const url = `https://nominatim.openstreetmap.org/search?q=${selectedDistrict},${selectedState}&format=json&polygon_geojson=1`;
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				const result = await response.json();
				const match = result.find(
					(res: any) =>
						res.addresstype === "state_district" ||
						res.addresstype === "county"
				);
				if (match) {
					setGeoJsonData({
						type: "Feature",
						geometry: match.geojson,
						properties: {
							name: match.name ?? "",
							displayName: match.display_name ?? "",
						},
					});
				} else {
					alert("GeoJson data not available!!");
				}
			} else {
				throw new Error("Unable to make request!!");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("Error submitting form. Please try again.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex justify-center items-center h-screen"
		>
			<Card className="w-full max-w-md p-6 space-y-4">
				<CardHeader>
					<CardTitle>Location Selector</CardTitle>
					<CardDescription>
						Select your state and district to proceed.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="state">State</Label>
						<Select
							onValueChange={handleStateChange}
							value={selectedState}
						>
							<SelectTrigger id="state">
								<SelectValue placeholder="Select state" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{states.map((state) => (
										<SelectItem
											key={state.name}
											value={state.name}
										>
											{state.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="district">District</Label>
						<Select
							onValueChange={handleDistrictChange}
							value={selectedDistrict}
						>
							<SelectTrigger id="district">
								<SelectValue placeholder="Select district" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{districts.map((district) => (
										<SelectItem
											key={district}
											value={district}
										>
											{district}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full">
						Submit
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
