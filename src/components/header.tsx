"use client";

import ThemeSwitcher from "./themeSwitcher";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";


const Header = () => {
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <p className="flex w-full justify-center border-b bg-background  pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4">
        Get started by editing&nbsp;
        <code className="font-mono font-bold">src/app/page.tsx</code>
      </p>
      <div className="flex pt-4 lg:pt-0 w-full items-end justify-center gap-4 lg:static lg:size-auto lg:bg-none">
        <WalletMultiButton />
        <WalletDisconnectButton />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
