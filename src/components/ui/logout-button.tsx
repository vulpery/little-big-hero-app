"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { DoorOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function LogoutButton() {
  const router = useRouter();
  const wallet = useWallet();

  async function disconnect() {
    if (wallet.connected) await wallet.disconnect();
    router.push("/");
  }

  return (
    <div className="w-fit absolute z-30 m-4 right-0">
      <Button
        className="bg-white text-black active:bg-gray-200"
        onClick={() => disconnect()}
      >
        <DoorOpen /> Logout
      </Button>
    </div>
  );
}
