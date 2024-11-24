"use client";
import { useEffect, useState } from "react";
import QuestList from "../../../components/quests/quest-list";
import { Quest } from "../../../lib/model/quest";
import { QuestService } from "../../../lib/services/QuestService";

export default function HistoryPage() {
  const questService = QuestService.INSTANCE;
  const [quests, setQuests] = useState<Quest[]>([]);
  useEffect(() => {
    questService
      .getQuests()
      .then((quests) =>
        setQuests(quests.filter((query) => query.status == "completed") || []),
      );
  }, []);
  return <QuestList title={"Your Achievements"} quests={quests} />;
}
