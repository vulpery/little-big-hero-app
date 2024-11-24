"use client";
import Logo from "@/assets/logos/logo.jpg";
import { Input } from "@/components/ui/input";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { UserService } from "../lib/services/UserService";

import DefaultAvatar from "@/assets/avatar/male.png";
import { useUser } from "@/lib/services/UserProvider";

export default function Home() {
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const isSolana = false;
  const userService = UserService.INSTANCE;
  const wallet = useWallet();

  const handleSignIn = useCallback(
    async (id: string) => {
      const user = await userService.getUser(id);
      if (!user) {
        userService.createUser({
          username: id || "ABC",
          avatar_image: DefaultAvatar.src,
          email: id,
          wallet_address: id,
          experience_points: 0,
          level: 1,
        });
      }
      login(user);
      userService.login(id);
      router.push("/game");
    },
    [login, router, userService],
  );

  useEffect(() => {
    async function loginWithWallet() {
      if (wallet.connected) {
        const id = wallet.publicKey?.toString() || "abc";
        //check whether the user is already existing in

        await handleSignIn(id);
      }
    }

    if (wallet.connected) {
      loginWithWallet();
    }
  }, [
    handleSignIn,
    login,
    router,
    userService,
    wallet.connected,
    wallet.publicKey,
  ]);

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
        Little Big Hero
      </h1>
      <p className="text-center text-lg text-gray-600">
        A place where we can fight loneliness together
      </p>
      {isSolana ? (
        <WalletMultiButton />
      ) : (
        <div className="w-full flex flex-col gap-2">
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" onClick={() => handleSignIn(email)}>
            Sign In
          </Button>
          <Button className="w-full bg-slate-600">Create Account</Button>
        </div>
      )}
    </main>
  );
}
