import type { Item } from "../../lib/model/item";
import { Card, CardFooter, CardHeader } from "./card";

export function ItemCard({ item }: { item: Item }) {
  return (
    <Card className="w-fit p-4">
      <CardHeader className="flex justify-center items-center p-0">
        <img
          width={60}
          height={60}
          src="https://img.itch.zone/aW1nLzE2ODg1OTY4LnBuZw==/original/8HoymL.png"
        ></img>
      </CardHeader>
      <CardFooter className="p-0">{item}</CardFooter>
    </Card>
  );
}
