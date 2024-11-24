// src/components/QuestMarker.tsx
"use client";

import QuestIcon from "@/assets/quest-icon.png"; // Ensure correct path
import { Quest } from "@/lib/model/quest";
import L from "leaflet";
import { useRouter } from "next/navigation"; // If using Next.js routing
import React from "react";
import { Marker, Popup } from "react-leaflet";

interface QuestMarkerProps {
  quest: Quest;
}

const customIcon = new L.Icon({
  iconUrl: QuestIcon.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const QuestMarker: React.FC<QuestMarkerProps> = ({ quest }) => {
  const position: [number, number] = [quest.latitude, quest.longitude];
  const router = useRouter(); // For navigation actions

  // Handler for "View Details" button
  const handleViewDetails = () => {
    // Navigate to the quest details page
    router.push(`/game/quests/${quest.quest_id}`);
  };

  // Handler for "Accept Quest" button
  const handleAcceptQuest = () => {
    // Implement quest acceptance logic here
    console.log(`Quest ${quest.quest_id} accepted!`);
    // You might want to update state, make an API call, etc.
  };

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        <div className="w-64 p-4">
          <h3 className="text-lg font-semibold mb-2">{quest.title}</h3>
          <p className="text-sm text-gray-700 mb-4">{quest.description}</p>
          <div className="mb-4">
            <h4 className="text-md font-medium">Rewards:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Experience Points: {quest.rewards.experience_points}</li>
              {quest.rewards.items.length > 0 && (
                <li>
                  Items:
                  <ul className="list-disc list-inside pl-4">
                    {quest.rewards.items.map((item, index) => (
                      <li key={index}>{item.name}</li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleViewDetails}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
            >
              View Details
            </button>
            {quest.status === "available" && (
              <button
                onClick={handleAcceptQuest}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
              >
                Accept Quest
              </button>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default QuestMarker;
