import BottomTabNavigation from "@/components/tabs";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-hidden w-full">
      {children}
      <BottomTabNavigation />
    </div>
  );
}
