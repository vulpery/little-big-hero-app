"use client"; // Necessary for Next.js 13 with the App Router

import { Coordinates } from "@/app/game/page";
import { useCallback, useEffect, useMemo, useState } from "react";
import Map, { Marker, ViewStateChangeEvent } from "react-map-gl";

interface Quest {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
}

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
  [key: string]: any; // For additional properties
}

export default function MapView({ location }: { location: Coordinates }) {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: -100,
    latitude: 40,
    zoom: 12,
  });

  useEffect(() => {
    setViewState({
      ...location,
    });
  }, [location]);

  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    async function fetchQuests() {
      try {
        const response = await fetch("/api/quests"); // Replace with your API endpoint
        const data: Quest[] = await response.json();
        setQuests(data);
      } catch (error) {
        console.error("Error fetching quests:", error);
      }
    }
    fetchQuests();
  }, []);

  // Update the view state when the map is moved
  const onMove = useCallback((evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  }, []);

  // Generate markers for quests
  const markers = useMemo(
    () =>
      quests.map((quest) => (
        <Marker
          key={quest.id}
          longitude={quest.coordinates[0]}
          latitude={quest.coordinates[1]}
        >
          <div style={{ textAlign: "center", color: "red" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="red"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            <div>{quest.name}</div>
          </div>
        </Marker>
      )),
    [quests],
  );

  return (
    <Map
      {...viewState}
      onMove={onMove}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{
        flex: 1,
        width: "100%",
        height: "auto",
        minHeight: "92vh",
        maxHeight: "92vh",
      }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    >
      {markers}
    </Map>
  );
}
