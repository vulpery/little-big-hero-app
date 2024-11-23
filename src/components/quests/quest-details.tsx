import { Quest } from "../../lib/model/quest";

export default function QuestDetails({ quest }: { quest: Quest }) {
  return (
    <div>
      <h1>{quest.title}</h1>
      <p>{quest.description}</p>
      <p>{quest.location}</p>
      <p>{quest.time_window.start_time}</p>
      <p>{quest.time_window.end_time}</p>
      <p>{quest.rewards.experience_points}</p>
      <p>{quest.rewards.items.join(", ")}</p>
      <p>{quest.quest_id}</p>
      <p>{quest.creator_wallet}</p>
      <p>{quest.participant_wallet}</p>
      <p>{quest.status}</p>
      <p>{quest.created_at}</p>
      <p>{quest.updated_at}</p>
    </div>
  );
}
