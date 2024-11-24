import { ThemeProviderWrapper } from "@/providers/themeProvider";
import { UmiProvider } from "@/providers/umiProvider";
import { WalletAdapterProvider } from "@/providers/walletAdapterProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "../lib/services/UserProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Little Big Hero",
  description: "A game where you can be the hero",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <WalletAdapterProvider>
        <UmiProvider>
          <html lang="en">
            <body className={inter.className}>
              <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
            </body>
          </html>
        </UmiProvider>
      </WalletAdapterProvider>
    </UserProvider>
  );
}
