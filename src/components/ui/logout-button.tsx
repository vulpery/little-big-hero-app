"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { DoorOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "../../lib/services/UserProvider";
import { UserService } from "../../lib/services/UserService";
import { Button } from "./button";

export default function LogoutButton() {
  const { logout } = useUser();
  const router = useRouter();
  const wallet = useWallet();
  const userService = UserService.INSTANCE;

  async function disconnect() {
    if (wallet.connected) await wallet.disconnect();
    await userService.logout();
    logout();
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
