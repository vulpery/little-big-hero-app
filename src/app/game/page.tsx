import MapView from "@/components/map";

export default function GamePage() {
  return (
    <div style={{ flex: 1, width: "100%", height: "auto", minHeight: "92vh", maxHeight: "92vh"}}>
      <MapView />
    </div>
  );
}
