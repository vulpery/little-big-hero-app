"use client";
import QuestList from "@/components/quests/quest-list";
import { useEffect, useState } from "react";
import { Quest } from "../../../lib/model/quest";
import { QuestService } from "../../../lib/services/QuestService";

export default function QuestListPage() {
  const questService = QuestService.INSTANCE;
  const [quests, setQuests] = useState<Quest[]>([]);
  useEffect(() => {
    questService
      .getQuests()
      .then((quests) =>
        setQuests(quests.filter((query) => query.status != "completed") || []),
      );
  }, []);
  return <QuestList title={"Heros looking for Help"} quests={quests} />;
}
