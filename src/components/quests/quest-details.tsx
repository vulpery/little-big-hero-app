"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Quest } from "@/lib/model/quest";
import { Check, Sparkles, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "../../lib/model/user";
import { QuestService } from "../../lib/services/QuestService";
import { useUser } from "../../lib/services/UserProvider";
import { UserService } from "../../lib/services/UserService";

export default function QuestDetails({ init_quest }: { init_quest: Quest }) {
  const { user } = useUser();
  const [quest, setQuest] = useState(init_quest);
  const [creator, setCreator] = useState<User>();
  const questService = QuestService.INSTANCE;
  const userService = UserService.INSTANCE;

  useEffect(() => {
    userService.getUser(quest.creator_wallet).then((user) => {
      setCreator(user);
    });
  }, [quest]);

  async function acceptQuest() {
    const q = await questService.updateQuest(quest.quest_id, {
      status: "in_progress",
    } as any);
    setQuest(q);
  }

  async function approveQuest() {
    const q = await questService.updateQuest(quest.quest_id, {
      status: "completed",
    } as any);
    setQuest(q);
  }

  return (
    <div className="px-4 py-6 pb-20">
      <header className="mb-4 flex flex-col gap-2 items-center justify-center text-center">
        <Avatar className="w-16 h-16">
          <AvatarImage src={creator?.avatar_image} />
          <AvatarFallback>
            <UserCircle className="text-slate-700" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-gray-800">{quest?.title}</h1>
        <p className="text-sm text-gray-500">
          Open since {new Date(quest?.created_at).toLocaleDateString()}
        </p>
      </header>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Description</h2>
        <p className="text-sm text-gray-600">{quest.description}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Location</h2>
        <p className="text-sm text-gray-600">{quest.location}</p>
      </section>

      <section className="mb-6 text-gray-600">
        <h2 className="text-lg font-semibold text-gray-800">Time Window</h2>
        <p>
          👋 Starts on {new Date(quest.time_window.start_time).toDateString()}
        </p>
        <p>🏁 Ends on {new Date(quest.time_window.end_time).toDateString()}</p>
      </section>

      <section className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Reward</h2>
        <p className="text-sm text-gray-600">
          {quest.rewards.experience_points} <b>XP</b>
        </p>
      </section>

      <footer className="text-center mt-8">
        {quest.status === ("available" as any) ? (
          <Button
            className="px-4 py-2 rounded-md bg-orange-600 text-white text-sm hover:bg-orange-700 transition-colors"
            onClick={() => acceptQuest()}
          >
            <Sparkles color="yellow" />
            Accept Quest
            <Sparkles color="yellow" />
          </Button>
        ) : (
          quest.creator_wallet != user?.wallet_address ? (
            <Button
              className="px-4 py-2 rounded-md bg-green-400 text-black text-sm cursor-not-allowed"
              disabled
            >
              <Check color="black" />
              Quest Accepted
            </Button>,
          ) : (
            <Button
              className="px-4 py-2 rounded-md bg-blue-400 text-black text-sm cursor-not-allowed"
              disabled={quest.status === "completed"}
              onClick={() => approveQuest()}
            >
              Approve
            </Button>
          )
        )}
        <p className="text-xs text-gray-500 mt-2">
          {quest.status}
        </p>
      </footer>
    </div>
  );
}
