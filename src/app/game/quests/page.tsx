import QuestList from "@/components/quests/quest-list";
import { QuestService } from "../../../lib/services/QuestService";

export default async function QuestListPage() {
  const questService = QuestService.INSTANCE;

  const quests = (await questService.getQuests()) || [];

  return <QuestList quests={quests} />;
}
