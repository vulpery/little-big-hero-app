"use client"; // Necessary for Next.js 13 with the App Router

import { Coordinates } from "@/app/game/page";
import { useCallback, useEffect, useMemo, useState } from "react";
import Map, { Marker, ViewStateChangeEvent } from "react-map-gl";

interface Quest {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  imageId: number;
  iconSize: [number, number];
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
    zoom: 5,
  });

  useEffect(() => {
    setViewState((prevState) => ({
      ...prevState,
      ...location,
    }));
  }, [location]);

  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    // For demonstration purposes, we'll use static data similar to your geojson
    const geojsonQuests: Quest[] = [
      {
        id: '1',
        name: 'Foo',
        coordinates: [-66.324462, -16.024695],
        imageId: 1011,
        iconSize: [60, 60],
      },
      {
        id: '2',
        name: 'Bar',
        coordinates: [-61.21582, -15.971891],
        imageId: 870,
        iconSize: [50, 50],
      },
      {
        id: '3',
        name: 'Baz',
        coordinates: [-63.292236, -18.281518],
        imageId: 837,
        iconSize: [40, 40],
      },
    ];

    setQuests(geojsonQuests);

    // If you have an API endpoint, uncomment the following lines and comment out the static data above:
    /*
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
    */
  }, []);

  // Update the view state when the map is moved
  const onMove = useCallback((evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  }, []);

  // Generate markers for quests
  const markers = useMemo(
    () =>
      quests.map((quest) => {
        const [width, height] = quest.iconSize;
        const backgroundImage = `url(https://picsum.photos/id/${quest.imageId}/${width}/${height})`;
        return (
          <Marker
            key={quest.id}
            longitude={quest.coordinates[0]}
            latitude={quest.coordinates[1]}
            anchor="center"
          >
            <div
              className="marker"
              style={{
                backgroundImage,
                width: `${width}px`,
                height: `${height}px`,
                backgroundSize: '100%',
                display: 'block',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                padding: 0,
              }}
              onClick={() => alert(quest.name)}
            />
          </Marker>
        );
      }),
    [quests],
  );

  return (
    <Map
      {...viewState}
      onMove={onMove}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      style={{
        flex: 1,
        width: "100%",
        height: "100vh",
      }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    >
      {markers}
    </Map>
  );
}
