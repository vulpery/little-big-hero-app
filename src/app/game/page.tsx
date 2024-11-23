"use client";
import MapView from "@/components/map";
import { ListIcon, LocateIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

export interface Coordinates {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface Position {
  coords: Coordinates;
  timestamp: number;
}

export interface GeolocationError {
  code: number;
  message: string;
}

export default function GamePage() {
  const [location, setLocation] = useState<Coordinates>({
    latitude: 48.26270110800354,
    longitude: 11.667426762268802,
    zoom: 12,
  });
  const [error, setError] = useState<string | null>(null);

  const getCurrentPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 12,
          });
        },
        (err: GeolocationPositionError) => {
          setError(err.message);
        },
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 12,
          });
        },
        (err: GeolocationPositionError) => {
          setError(err.message);
        },
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        height: "auto",
        minHeight: "92vh",
        maxHeight: "92vh",
      }}
    >
      <div
        className="absolute rounded-sm right-6 top-10 h-[32px] w-[32px] z-[99999] bg-black flex items-center"
        onClick={() =>
          setLocation({
            ...location,
            zoom: location.zoom + 1,
          })
        }
      >
        <PlusIcon className="text-white m-auto" />
      </div>
      <div
        className="absolute rounded-sm right-6 top-20 h-[32px] w-[32px] z-[99999] bg-black flex items-center"
        onClick={() => {
          console.log("minus");
          setLocation({
            ...location,
            zoom: location.zoom - 1,
          });
        }}
      >
        <MinusIcon className="text-white m-auto" />
      </div>
      <MapView location={location} />
      <div className="absolute rounded-full left-6 bottom-20 h-[48px] w-[48px] z-[99999] bg-black flex items-center" onClick={getCurrentPosition}>
        <LocateIcon className="text-white m-auto" />
      </div>
      <div className="absolute rounded-full right-6 bottom-36 h-[48px] w-[48px] z-[99999] bg-black flex items-center">
        <ListIcon className="text-white m-auto" />
      </div>
      <div className="absolute rounded-full right-6 bottom-20 h-[48px] w-[48px] z-[99999] bg-black flex items-center">
        <PlusIcon className="text-white m-auto" />
      </div>
    </div>
  );
}
