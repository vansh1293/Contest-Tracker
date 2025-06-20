"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Bell, Star } from "lucide-react";
import axios from "axios";
import React, { useState } from "react";
import { Contest } from "@/model/Contest";

// Replace these with your actual data sources or props
const fetchContests = async () => {
  const response = await axios.get("/api/get-contests");
  return response.data;
};

export default function QuickSection() {
  const [contestCard, setContest] = useState<Contest[]>([]);

  React.useEffect(() => {
    const getContests = async () => {
      const contests = await fetchContests();
      setContest(contests.message || []);
    };
    getContests();
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
      <Card className="border-l-4 border-l-blue-500 bg-background/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold tracking-wide">
            Upcoming Contests
          </CardTitle>
          <Calendar className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-300">
            {contestCard.length > 0 &&
              contestCard.filter(
                (contest) => new Date(contest.startTime) > new Date()
              ).length}
          </div>
          <p className="text-xs text-muted-foreground">Across all platforms</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-green-500 bg-background/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold tracking-wide">
            Today's Contests
          </CardTitle>
          <Clock className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-extrabold text-green-600 dark:text-green-300">
            {contestCard.length > 0 &&
              contestCard.filter((contest) => {
                const now = new Date();
                const today = new Date(
                  now.getFullYear(),
                  now.getMonth(),
                  now.getDate()
                );
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                const start = new Date(contest.startTime);
                const end = new Date(contest.endTime);
                return start >= today && end < tomorrow;
              }).length}
          </div>
          <p className="text-xs text-muted-foreground">Starting today</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-purple-500 bg-background/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold tracking-wide">
            Active Reminders
          </CardTitle>
          <Bell className="h-4 w-4 text-purple-500" />
        </CardHeader>
        {/* <CardContent>
                        <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-300">
                            {contestCard.filter(contest => contest.reminder).length}
                        </div>
                        <p className="text-xs text-muted-foreground">Notifications set</p>
                    </CardContent> */}
      </Card>
      {/* <Card className="border-l-4 border-l-orange-500 bg-background/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold tracking-wide">
            Favorite Contests
          </CardTitle>
          <Star className="h-4 w-4 text-orange-500" />
        </CardHeader>
      </Card> */}
    </section>
  );
}
