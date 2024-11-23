"use client";

import { useRouter  } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default  function QuestsPage() {
    const [helpNeeded, setHelpNeeded] = useState('');
    const [reward, setReward] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!helpNeeded ) {
            alert('Please fill in all fields')
            return;
        }

        //handle the solana backend call here 
        console.log({ helpNeeded, reward });
        alert('Your quest has been created!');
        router.push('/'); // Redirect to map/homepage
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <Card className="w-full max-w-lg shadow-lg rounded-lg border border-blue-300">
        <CardHeader className="bg-blue-500 text-white rounded-t-lg p-4">
          <CardTitle className="text-3xl font-bold text-center">Share your Quest</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="helpNeeded" className="text-lg font-semibold">
                What kind of help do you need?
              </Label>
              <Textarea
                id="helpNeeded"
                value={helpNeeded}
                onChange={(e) => setHelpNeeded(e.target.value)}
                placeholder="Describe your problem..."
                rows={5}
                className="mt-2 p-4 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <Label htmlFor="reward" className="text-lg font-semibold">
                Reward (in SOL):
              </Label>
              <Input
                type="number"
                id="reward"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="Enter reward in SOL"
                className="mt-2 p-4 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-3 text-lg font-semibold bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Create Quest
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}