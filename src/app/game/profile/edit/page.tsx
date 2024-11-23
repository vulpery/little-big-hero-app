"use client";

import Avatar from "@/assets/avatar/male.png";
import Beer from "@/assets/items/beer-removebg-preview.png";
import Cat from "@/assets/items/cat-removebg-preview.png";
import Dog from "@/assets/items/dog-removebg-preview.png";
import BavarianHat from "@/assets/items/hat-removebg-preview.png";
import StrawHat from "@/assets/items/hat2-removebg-preview.png";
import Helmet from "@/assets/items/helmet-removebg-preview.png";
import Prezel from "@/assets/items/prezel-removebg-preview.png";
import Sword from "@/assets/items/sword-removebg-preview.png";
import WizardHat from "@/assets/items/wizard-hat-removebg-preview.png";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Item {
  id: number;
  name: string;
  img: string;
}

export default function Edit() {
  const items: Item[] = [
    { id: 1, name: "Helmet", img: Helmet.src },
    { id: 2, name: "Wizard Hat", img: WizardHat.src },
    { id: 3, name: "Bavarian Hat", img: BavarianHat.src },
    { id: 4, name: "Straw Hat", img: StrawHat.src },
    { id: 5, name: "Master Sword", img: Sword.src },
    { id: 6, name: "Beer", img: Beer.src },
    { id: 7, name: "Brezn", img: Prezel.src },
    { id: 8, name: "Cat", img: Cat.src },
    { id: 9, name: "Dog", img: Dog.src },

    // Add more items as needed
  ];

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const toggleItemSelection = (id: number) => {
    const currentIndex = selectedItems.findIndex((item) => item.id === id);
    if (currentIndex !== -1) {
      // If found, filter out the item from the selectedItems array
      setSelectedItems((current) => current.filter((item) => item.id !== id));
    } else {
      // Try to find the item
      const itemToAdd = items.find((item) => item.id === id);
      if (itemToAdd) {
        // Only update state if item is found
        setSelectedItems((current) => [...current, itemToAdd]);
      }
    }
  };

  return (
    <div className="flex flex-col h-[92vh] max-h-[92vh]">
      <div className="flex self-center mt-4">
        <div className="felx felx-col">
          <Button className="flex bg-white border-none w-3 mt-8">
            <ChevronLeft className="text-black" />
          </Button>
          <Button className="flex bg-white border-none w-3 mt-20">
            <ChevronLeft className="text-black" />
          </Button>
        </div>
        <div className="w-45 h-45">
          <img
            src={Avatar.src}
            alt="Avatar"
            className="w-full h-full object-contain z-999 relative"
          />
        </div>
        <div className="felx felx-col">
          <Button className="flex bg-white border-none w-3  mt-8">
            <ChevronRight className="text-black" />
          </Button>
          <Button className="flex bg-white border-none w-3 mt-20">
            <ChevronRight className="text-black" />
          </Button>
        </div>
      </div>
      <div className="mt-6 ml-4 overflow-auto">
        <p className="font-bold">Item Collection</p>
        <div className="mt-3">
          <div className="grid grid-cols-2 gap-4 p-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex fex-row relative p-2 border-2 rounded overflow-hidden ${
                  selectedItems.some((si) => si.id === item.id)
                    ? "bg-orange-600 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => toggleItemSelection(item.id)}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="flex w-10 h-10 object-cover mr-3"
                />
                <div className="flex bottom-2 left-2 self-center">
                  {item.name}
                </div>
                {selectedItems.some((si) => si.id === item.id) && (
                  <Check className="absolute top-2 right-2 text-white w-4 h-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
