export default function QuestsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>
        <main>{children}</main>
      </div>
    );
  }
