import { Quest } from "../../lib/model/quest";
import QuestListItem from "./quest-list-item";

export default function QuestList({ quests }: { quests: Quest[] }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-start p-4 mb-8">
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
