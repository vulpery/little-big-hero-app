import QuestDetails from "../../../../components/quests/quest-details";

export default function QuestDetailPage() {
  const quest = {
    title: "Meet for a coffee together",
    description:
      "I would love to talk to someone while drinking a coffee together in my most loved caffee.",
    location: "Caffee 'The best coffee in the world'",
    time_window: {
      start_time: "2023-01-15T15:00:00Z",
      end_time: "2023-01-15T16:00:00Z",
    },
    rewards: {
      experience_points: 500,
      items: ["sword_of_truth", "shield_of_valor"],
    },
    quest_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    creator_wallet: "0xabcdefabcdefabcdefabcdefabcdefabcdef",
    participant_wallet: "0x1234567890abcdef1234567890abcdef12345678",
    status: "available" as "available",
    created_at: "2023-01-10T10:00:00Z",
    updated_at: "2023-01-12T12:00:00Z",
  };
  return <QuestDetails quest={quest} />;
}
