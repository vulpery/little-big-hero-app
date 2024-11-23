export default function QuestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-h-[92vh] overflow-y-scroll">{children}</div>;
}
