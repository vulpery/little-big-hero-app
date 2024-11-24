"use client";
import { BookCheck, BookMarked, Map } from "lucide-react";
import Link from "next/link";
import { useUser } from "../lib/services/UserProvider";
import Loading from "./ui/loading";
function TabItem({ Icon, href }: { Icon: JSX.Element; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center w-full h-full hover:bg-slate-100 rounded-md transition-all"
    >
      {Icon}
    </Link>
  );
}

export default function BottomTabNavigation() {
  const rootUrl = "/game"; // Static base URL for your game routes
  const { user } = useUser();
  return (
    <div className="fixed flex items-center bottom-0 left-0 w-full bg-white border-t border-gray-200 h-[8vh] text-primary">
      <div className="flex justify-around w-full h-full">
        <TabItem href={`${rootUrl}/history`} Icon={<BookCheck />} />
        <TabItem href={`${rootUrl}/quests`} Icon={<BookMarked />} />
        <TabItem href={`${rootUrl}`} Icon={<Map />} />
        <TabItem
          href={`${rootUrl}/profile`}
          Icon={
            (
              <div className="shadow-md border-2 border-slate-700 rounded-full">
                {user ? (
                  <img
                    src={user.avatar_image}
                    className="h-7 w-7 object-contain"
                  />
                ) : (
                  <Loading />
                )}
              </div>
            ) as any
          }
        />
      </div>
    </div>
  );
}
