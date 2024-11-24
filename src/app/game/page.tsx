"use client";
import MapView from "@/components/map";
import { LocateIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

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
    longitude: 11.669426762268802,
    zoom: 16,
  });
  const [error, setError] = useState<string | null>(null);

  const getCurrentPosition = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 15,
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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 15,
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
      {/* Map View */}
      <div style={{ height: "92vh", width: "100%" }}>
        <MapView location={location} />
      </div>

      {/* Locate Button */}
      <div
        className="absolute rounded-full left-6 bottom-20 h-[48px] w-[48px] z-[99999] bg-black flex items-center"
        onClick={getCurrentPosition}
      >
        <LocateIcon className="text-white m-auto" />
      </div>

      {/* Create Quest Button */}
      <Link href="/game/quests/create">
        <div className="absolute rounded-full right-6 bottom-20 h-[48px] w-[48px] z-[99999] bg-black flex items-center">
          <PlusIcon className="text-white m-auto" />
        </div>
      </Link>

      {/* Error Message */}
      {error && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-5 bg-red-500 text-white px-4 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
