import BottomTabNavigation from "@/components/tabs";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <BottomTabNavigation />
    </>
  );
}
