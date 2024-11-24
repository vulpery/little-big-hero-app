import QuestDetails from "../../../../components/quests/quest-details";
import { QuestService } from "../../../../lib/services/QuestService";

export default async function QuestDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const questService = QuestService.INSTANCE;
  const quest = await questService.getQuest(id);
  return quest ? <QuestDetails init_quest={quest} /> : <div>Quest not found</div>;
}
