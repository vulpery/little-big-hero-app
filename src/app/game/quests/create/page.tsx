"use client";

import { createQuestAction } from "@/actions/quests";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Map, { MapRef, Marker } from "react-map-gl";

export default function QuestsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 13,
  });
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [reward, setReward] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const mapRef = useRef<MapRef | null>(null);

  const handleMapClick = (event: any) => {
    const { lng, lat } = event.lngLat;
    setLatitude(lat);
    setLongitude(lng);
    setViewState((prevState) => ({
      ...prevState,
      latitude: lat,
      longitude: lng,
    }));
  };

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          setUserLocation({ lat, lng });
          setLatitude(lat);
          setLongitude(lng);
          setViewState((prevState) => ({
            ...prevState,
            latitude: lat,
            longitude: lng,
          }));
        },
        (error) => {
          console.error("Error fetching user location:", error);
          setError(
            "Unable to fetch your current location. Please select a location manually.",
          );
        },
        { enableHighAccuracy: true },
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !longitude ||
      !latitude ||
      !startTime ||
      !endTime
    ) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createQuestAction({
        title,
        description,
        longitude,
        latitude,
        startTime,
        endTime,
        reward,
        creatorWallet: "0x1234567890abcdef1234567890abcdef12345679",
      });

      router.push("/game/");
    } catch (error) {
      console.error("Failed to create quest:", error);
      setError(String(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Create Your Quest
        </h1>
        {error && (
          <div className="text-white w-full p-3 bg-red-500 rounded-md mb-4">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-sm md:text-base"
        >
          {/* Title Input */}
          <div>
            <Label htmlFor="title" className="block font-semibold mb-2">
              Quest Title
            </Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your quest"
              className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description Input */}
          <div>
            <Label htmlFor="description" className="block font-semibold mb-2">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your quest or the help you need"
              rows={4}
              className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Map */}
          <div className="h-64 rounded-md overflow-hidden border border-gray-300">
            <Map
              ref={mapRef}
              {...viewState}
              onMove={(evt) => setViewState(evt.viewState)}
              initialViewState={{
                longitude: userLocation?.lng,
                latitude: userLocation?.lat,
                zoom: 13,
              }}
              style={{ height: "100%", width: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
              onClick={handleMapClick}
              collectResourceTiming={false}
            >
              {latitude && longitude && (
                <Marker longitude={longitude} latitude={latitude} color="red" />
              )}
            </Map>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Click on the map to select a location.
          </div>

          {/* Date Time Inputs */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="startTime" className="block font-semibold mb-2">
                Start Time
              </Label>
              <DateTimePicker
                value={startTime}
                onChange={setStartTime}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="endTime" className="block font-semibold mb-2">
                End Time
              </Label>
              <DateTimePicker
                value={endTime}
                onChange={setEndTime}
                className="w-full"
              />
            </div>
          </div>

          {/* Reward Input */}
          <div>
            <Label htmlFor="reward" className="block font-semibold mb-2">
              Reward (Hero Coins)
            </Label>
            <Input
              type="number"
              id="reward"
              value={reward}
              onChange={(e) => setReward(parseInt(e.target.value))}
              placeholder="Enter the reward"
              className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-lg font-semibold rounded-md ${
              isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-black text-white"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Create Quest"}
          </Button>
        </form>
      </div>
    </div>
  );
}
