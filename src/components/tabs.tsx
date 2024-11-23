import { BookMarked, CircleUser } from "lucide-react";
import Link from "next/link";

function TabItem({ Icon, href }: any) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center w-full h-full hover:bg-slate-100 rounded-md transition-all"
    >
      <Icon />
    </Link>
  );
}

export default function BottomTabNavigation() {
  return (
    <div className="fixed flex  items-center bottom-0 left-0 w-full bg-white border-t border-gray-200 h-[8vh] text-primary">
      <div className="flex justify-around w-full h-full">
        <TabItem href="/quests" Icon={BookMarked} />
        <TabItem href="/avatar" Icon={CircleUser} />
        <TabItem href="/browse" Icon={BookMarked} />
      </div>
    </div>
  );
}
