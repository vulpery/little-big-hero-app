import { Item } from "./item";

export interface Quest {
  quest_id: string;
  creator_wallet: string;
  participant_wallet: string;
  title: string;
  description: string;
  location: string;
  time_window: {
    start_time: string;
    end_time: string;
  };
  rewards: {
    experience_points: number;
    items: Item[];
  };
  status: "available" | "in_progress" | "completed";
  created_at: string;
  updated_at: string;
}
