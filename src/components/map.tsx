// src/components/MapView.tsx
"use client";

import { Coordinates } from "@/app/game/page";
import { Quest } from "@/lib/model/quest";
import { QuestService } from "@/lib/services/QuestService";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import QuestMarker from "./quest-marker";
import L from "leaflet";
import Avatar from "@/assets/avatar/male.png";
interface MapViewProps {
  location: Coordinates;
}

const Recenter = ({ location }: MapViewProps) => {
  const map = useMap();

  useEffect(() => {
    map.setView([location.latitude, location.longitude], location.zoom);
  }, [location]);
  return null;
};

// MapView Component
const MapView: React.FC<MapViewProps> = ({ location }) => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch quests on component mount
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const fetchedQuests = await QuestService.INSTANCE.getQuests();
        console.log("Fetched Quests:", fetchedQuests);
        setQuests(fetchedQuests);
      } catch (err) {
        console.error("Error fetching quests:", err);
        setError("Failed to load quests.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  // Memoize markers to prevent unnecessary re-renders
  const markers = useMemo(
    () =>
      quests.map((quest) => <QuestMarker key={quest.quest_id} quest={quest} />),
    [quests],
  );

  // Handle loading state
  if (loading) {
    return <div>Loading map...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  const customIcon = new L.Icon({
    iconUrl: Avatar.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={[location.latitude, location.longitude]}
      zoom={location.zoom}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <ZoomControl position="topright" />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Recenter location={location} />
      {markers}

      <Marker
        position={[location.latitude, location.longitude]}
        icon={customIcon}
      >
        <Popup>
          <div className="p-2">
            <h3 className="text-lg font-semibold">You are here!</h3>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
