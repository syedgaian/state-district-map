import { useState } from "react";
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

export default function LocationForm() {
	const [districts, setDistricts] = useState<string[]>([]);

	const handleStateChange = (value: string) => {
		const state = states.find((state) => state.name === value);
		if (state) {
			setDistricts(state.districts);
		} else {
			setDistricts([]);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen">
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
						<Select onValueChange={handleStateChange}>
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
						<Select>
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
		</div>
	);
}
