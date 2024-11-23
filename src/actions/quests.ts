"use server";

export async function createQuestAction({
  title,
  description,
  longitude,
  latitude,
  startTime,
  endTime,
  reward,
  creatorWallet,
}: {
  title: string;
  description: string;
  longitude: number;
  latitude: number;
  startTime: Date;
  endTime: Date;
  reward: number;
  creatorWallet: string;
}) {
  try {
    const res = await fetch(
      `https://little-big-hero-backend.vulpery.com/quests/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          longitude,
          latitude,
          time_window: {
            start_time: startTime,
            end_time: endTime,
          },
          rewards: {
            experience_points: reward,
            items: [],
          },
          creator_wallet: creatorWallet,
        }),
      },
    );

    if (!res.ok) {
      console.error(`Failed to create quest: ${res.statusText}`);
      throw new Error(`Failed to create quest: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating quest:", error);
    throw error;
  }
}
