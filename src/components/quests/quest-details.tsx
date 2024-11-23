import AvatarImg from "@/assets/avatar/male.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Quest } from "@/lib/model/quest";
import { Sparkles, UserCircle } from "lucide-react";
import Link from "next/link";

export default function QuestDetails({ quest }: { quest: Quest }) {
  return (
    <div className="px-4 py-6 pb-20">
      <header className="mb-4 flex flex-col gap-2 items-center justify-center">
        <Avatar className="w-16 h-16">
          <AvatarImage src={AvatarImg.src} />
          <AvatarFallback>
            <UserCircle className="text-slate-700" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-gray-800">{quest.title}</h1>
        <p className="text-sm text-gray-500">
          Open since {new Date(quest.created_at).toLocaleDateString()}
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

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Time Window</h2>
        <p className="text-sm text-gray-600">
          Start: {new Date(quest.time_window.start_time).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          End: {new Date(quest.time_window.end_time).toLocaleString()}
        </p>
      </section>

      <section className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Reward</h2>
        <p className="text-sm text-gray-600">
          {quest.rewards.experience_points} <b>XP</b>
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center mt-8">
        <Button className="px-4 py-2 rounded-md bg-orange-600 text-white text-sm hover:bg-orange-700 transition-colors">
          <Link
            href={`/game/`}
            passHref
            className="flex flex-row gap-2 items-center"
          >
            <Sparkles color="yellow" />
            Accept Quest
            <Sparkles color="yellow" />
          </Link>
        </Button>
      </footer>
    </div>
  );
}
