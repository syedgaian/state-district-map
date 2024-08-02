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

export default function LocationForm() {
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
						<Select>
							<SelectTrigger id="state">
								<SelectValue placeholder="Select state" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="CA">
										California
									</SelectItem>
									<SelectItem value="TX">Texas</SelectItem>
									<SelectItem value="NY">New York</SelectItem>
									<SelectItem value="FL">Florida</SelectItem>
									<SelectItem value="IL">Illinois</SelectItem>
									<SelectItem value="PA">
										Pennsylvania
									</SelectItem>
									<SelectItem value="OH">Ohio</SelectItem>
									<SelectItem value="GA">Georgia</SelectItem>
									<SelectItem value="NC">
										North Carolina
									</SelectItem>
									<SelectItem value="MI">Michigan</SelectItem>
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
									<SelectItem value="district1">
										District 1
									</SelectItem>
									<SelectItem value="district2">
										District 2
									</SelectItem>
									<SelectItem value="district3">
										District 3
									</SelectItem>
									<SelectItem value="district4">
										District 4
									</SelectItem>
									<SelectItem value="district5">
										District 5
									</SelectItem>
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
