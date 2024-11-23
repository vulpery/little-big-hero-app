import { BookMarked, CircleUser, Settings } from "lucide-react";
import Link from "next/link";

function TabItem({ Icon, href }) {
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
  const rootUrl = "/game"; // Static base URL for your game routes

  return (
    <div className="fixed flex items-center bottom-0 left-0 w-full bg-white border-t border-gray-200 h-[8vh] text-primary">
      <div className="flex justify-around w-full h-full">
        <TabItem href={`${rootUrl}/avatar`} Icon={CircleUser} />
        <TabItem href={rootUrl} Icon={BookMarked} />
        <TabItem href={`${rootUrl}/settings`} Icon={Settings} />
      </div>
    </div>
  );
}
