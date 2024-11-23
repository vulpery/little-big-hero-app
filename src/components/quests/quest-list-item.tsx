import AvatarImg from "@/assets/avatar/male.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quest } from "@/lib/model/quest";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function QuestListItem({ quest }: { quest: Quest }) {
  return (
    <Link href={`/game/quests/${quest.quest_id}`} passHref>
      <Card className="w-full hover:bg-slate-100 transition-colors">
        <div className="flex items-center pl-6 gap-4">
          <Avatar>
            <AvatarImage src={AvatarImg.src} />
            <AvatarFallback>
              <UserCircle className="text-slate-700" />
            </AvatarFallback>
          </Avatar>
          <CardHeader>
            <CardTitle>{quest.title}</CardTitle>
            <CardDescription>{quest.description}</CardDescription>
          </CardHeader>
        </div>
        <CardContent className="text-sm text-slate-600">
          <p>
            👋 Starts on {new Date(quest.time_window.start_time).toDateString()}
          </p>
          <p>
            🏁 Ends on {new Date(quest.time_window.end_time).toDateString()}
          </p>
          <p className="pt-2">
            {quest.rewards.experience_points} <b>XP</b>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
