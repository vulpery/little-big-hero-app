import Avatar from "@/assets/avatar/male.png";
import Background from "@/assets/backgrounds/501501-munich.png";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UserRoundPen } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../../../components/ui/logout-button";

export default function Profile() {
  const lvl = "3";
  const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="flex flex-col h-screen">
      <LogoutButton />
      <div
        className="w-full object-cover overflow-hidden"
        style={{ flexBasis: "225px" }}
      >
        <img
          src={Background.src}
          alt="Munich"
          className="w-full h-full object-cover blur-sm"
        />
      </div>
      <div
        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40"
        style={{ marginTop: "180px" }}
      >
        <img
          src={Avatar.src}
          alt="Avatar"
          className="w-full h-full object-contain z-999 relative"
        />
      </div>
      <div
        className="flex flex-1 flex-col items-center pt-12 gap-4 bg-white overflow-auto py-4"
        style={{ flexBasis: "60%" }}
      >
        <div className="flex">
          <p className="text-black pr-4">OG Hero</p>
          <Link href="/game/profile/edit">
            <Button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full w-10 h-6">
              <UserRoundPen className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="w-3/4 flex">
          <p className="text-black pr-4">{lvl}</p>
          <Progress
            className=" self-center static"
            indicatorColor="bg-orange-700"
            value={33}
            style={{ width: "75%", background: "lightgray" }}
          ></Progress>
        </div>
        <p className="text-black font-bold self-start pl-4 pt-6">Items</p>
        <div className="">
          {/* Grid container */}
          <div className="w-100% grid grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item}
                className="p-2 border border-gray-300 bg-white shadow rounded-md"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
