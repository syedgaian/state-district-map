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
import Spinner from "../loaders/Spinner";
import Modal from "../modal/Modal";

export default function LocationForm({ setGeoJsonData }) {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleStateChange = (value) => {
    setSelectedState(value);
    const state = states.find((state) => state.name === value);
    if (state) {
      setDistricts(state.districts);
    } else {
      setDistricts([]);
    }
    setSelectedDistrict("");
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    if (!selectedDistrict || !selectedState) {
      alert("Please select both state and district.");
      return;
    }

    try {
      setLoading(true);
      const url = `https://nominatim.openstreetmap.org/search?q=${selectedDistrict},${selectedState}&format=json&polygon_geojson=1`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        const match = result.find((res) => {
          return (
            (res.addresstype === "state_district" ||
              res.addresstype === "county" ||
              res.addresstype === "suburb") &&
            (res.geojson?.type === "Polygon" ||
              res.geojson?.type === "MultiPolygon")
          );
        });
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center h-screen w-[30%]"
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
              <Select onValueChange={handleStateChange} value={selectedState}>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {states.map((state) => (
                      <SelectItem key={state.name} value={state.name}>
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
                      <SelectItem key={district} value={district}>
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
              {isLoading ? <Spinner /> : "Submit"}
            </Button>

            <button
              type="button"
              className="showModelButton"
              onClick={openModal}
            >
              Modal
            </button>
          </CardFooter>
        </Card>
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
