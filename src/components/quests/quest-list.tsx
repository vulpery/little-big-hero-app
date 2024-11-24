import { Quest } from "../../lib/model/quest";
import QuestListItem from "./quest-list-item";

export default function QuestList({
  title,
  quests,
}: {
  title: string;
  quests: Quest[];
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-start p-4 mb-8">
      <h1 className="w-full text-center text-2xl font-bold text-primary">
        {title}
      </h1>
      <div className="flex gap-2 flex-col w-full py-4">
        {quests.map((quest) => (
          <QuestListItem key={quest.quest_id} quest={quest} />
        ))}
        {quests.length === 0 && (
          <p className="text-center text-gray-500">There is no result, yet.</p>
        )}
      </div>
    </div>
  );
}
