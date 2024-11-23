"use client";
import Logo from "@/assets/logos/logo.jpg";
import { Input } from "@/components/ui/input";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

export default function Home() {
  const router = useRouter();
  const isSolana = false;
  const wallet = useWallet();
  if (wallet.connected) {
    router.push("/game");
  }
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 justify-center p-6">
      <div className="rounded-full h-fit overflow-hidden shadow-md">
        <img
          src={Logo.src}
          alt="LittleBigHero Logo"
          className="w-64 object-contain"
        />
      </div>
      <h1 className="text-4xl font-bold text-center text-primary">
        LittleBigHero
      </h1>
      <p className="text-center text-lg text-gray-600">
        A place where we can fight loneliness together
      </p>
      {isSolana ? (
        <WalletMultiButton />
      ) : (
        <div className="w-full flex flex-col gap-2">
          <Input placeholder="Enter your email" />
          <Input placeholder="Enter your password" type="password" />
          <Link href="/game" passHref>
            <Button className="w-full">Sign In</Button>
          </Link>
          <Button className="w-full bg-slate-600 ">Create Account</Button>
        </div>
      )}
    </main>
  );
}
