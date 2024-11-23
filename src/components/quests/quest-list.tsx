import { Quest } from "../../lib/model/quest";
import QuestListItem from "./quest-list-item";

export default function QuestList() {
  const quests = [
    {
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
    },
    {
      title: "Defeat the Dragon",
      description: "Slay the dragon terrorizing the village.",
      location: "Dragon's Lair",
      time_window: {
        start_time: "2023-01-15T09:00:00Z",
        end_time: "2023-01-15T17:00:00Z",
      },
      rewards: {
        experience_points: 500,
        items: ["sword_of_truth", "shield_of_valor"],
      },
      quest_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      creator_wallet: "0xabcdefabcdefabcdefabcdefabcdefabcdef",
      participant_wallet: "0x1234567890abcdef1234567890abcdef12345678",
      status: "available",
      created_at: "2023-01-10T10:00:00Z",
      updated_at: "2023-01-12T12:00:00Z",
    },
    {
      quest_id: 2,
      title: "Quest 2",
      rewards: {
        experience_points: 200,
        items: ["item3", "item4"],
      },
      time_window: {
        start_time: "2023-01-15T09:00:00Z",
        end_time: "2023-01-15T17:00:00Z",
      },
      description: "Description 2",
    },
    {
      quest_id: 3,
      title: "Quest 3",
      rewards: {
        experience_points: 300,
        items: ["item5", "item6"],
      },
      time_window: {
        start_time: "2023-01-15T09:00:00Z",
        end_time: "2023-01-15T17:00:00Z",
      },
      description: "Description 3",
    },
    {
      quest_id: 4,
      title: "Quest 4",
      rewards: {
        experience_points: 300,
        items: ["item5", "item6"],
      },
      time_window: {
        start_time: "2023-01-15T09:00:00Z",
        end_time: "2023-01-15T17:00:00Z",
      },
      description: "Description 4",
    },
    {
      quest_id: 5,
      title: "Quest 5",
      rewards: {
        experience_points: 300,
        items: ["item5", "item6"],
      },
      time_window: {
        start_time: "2023-01-15T09:00:00Z",
        end_time: "2023-01-15T17:00:00Z",
      },
      description: "Description 5",
    },
  ] as any as Quest[];
  return (
    <div className="flex min-h-screen w-full flex-col items-start p-4">
      <h1 className="w-full text-center text-2xl font-bold text-primary">
        Heros looking for Help
      </h1>
      <div className="flex gap-2 flex-col w-full py-4">
        {quests.map((quest) => (
          <QuestListItem key={quest.quest_id} quest={quest} />
        ))}
      </div>
    </div>
  );
}
