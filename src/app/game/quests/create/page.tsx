"use client";

import { createQuestAction } from "@/actions/quests";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export default function QuestsPage({
  creator_wallet,
}: {
  creator_wallet: string;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [reward, setReward] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !longitude ||
      !latitude ||
      !startTime ||
      !endTime
    ) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);

    startTransition(async () => {
      try {
        await createQuestAction({
          title,
          description,
          longitude,
          latitude,
          startTime,
          endTime,
          reward,
          creatorWallet: "0x1234567890abcdef1234567890abcdef12345679",
        });

        router.push("/game/");
      } catch (error) {
        console.error("Failed to create quest:", error);
        setError(error.message);
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <Card className="w-full max-w-lg shadow-lg rounded-lg border border-blue-300 max-h-[85vh] mb-10 overflow-y-auto">
        <CardHeader className="bg-blue-500 text-white rounded-t-lg p-4">
          <CardTitle className="text-3xl font-bold text-center">
            Share your Quest
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {error && <div className="text-white w-full p-2 bg-red-400 rounded-sm my-2">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Label htmlFor="title" className="text-lg font-semibold">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="p-4 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <Label htmlFor="helpNeeded" className="text-lg font-semibold">
              What kind of help do you need?
            </Label>
            <Textarea
              id="helpNeeded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your problem..."
              rows={5}
              className="mt-2 p-4 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <Label htmlFor="longitude" className="text-lg font-semibold">
              Longitude:
            </Label>
            <Input
              type="number"
              step="any"
              id="longitude"
              value={longitude || ""}
              onChange={(e) => setLongitude(parseFloat(e.target.value))}
              placeholder="Enter longitude"
              className="mt-2 p-4 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <Label htmlFor="latitude" className="text-lg font-semibold">
              Latitude:
            </Label>
            <Input
              type="number"
              step="any"
              id="latitude"
              value={latitude || ""}
              onChange={(e) => setLatitude(parseFloat(e.target.value))}
              placeholder="Enter latitude"
              className="mt-2 p-4 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <Label htmlFor="startTime" className="text-lg font-semibold">
              Start Time:
            </Label>
            <Input
              type="datetime-local"
              id="startTime"
              value={
                startTime ? new Date(startTime).toISOString().slice(0, -1) : ""
              }
              onChange={(e) => setStartTime(new Date(e.target.value))}
              className="mt-2 p-4 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <Label htmlFor="endTime" className="text-lg font-semibold">
              End Time:
            </Label>
            <Input
              type="datetime-local"
              id="endTime"
              value={
                endTime ? new Date(endTime).toISOString().slice(0, -1) : ""
              }
              onChange={(e) => setEndTime(new Date(e.target.value))}
              className="mt-2 p-4 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <Label htmlFor="reward" className="text-lg font-semibold">
              Reward (Hero Coins):
            </Label>
            <Input
              type="number"
              id="reward"
              value={reward}
              onChange={(e) => setReward(parseInt(e.target.value))}
              placeholder="Enter reward"
              className="mt-2 p-4 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 text-lg font-semibold bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Create Quest"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
