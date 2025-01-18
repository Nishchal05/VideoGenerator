"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Videoplayer from "./_component/Videoplayer";
import { useUser } from "@clerk/nextjs";
import VideoList from "./_component/VideoList";

const Dashboard = () => {
  const [videolist, setvideolist] = useState([]);
  const { user } = useUser();

  const handleUserVideo = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Video?email=${user?.primaryEmailAddress?.emailAddress}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      const result = await response.json();
      setvideolist(result.data || []); 
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    if (user) {
      handleUserVideo();
    }
  }, [user]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {videolist.length === 0 ? (
        <div className="p-5 rounded-lg border mt-10 gap-5 flex flex-col">
          <h2 className="text-2xl text-center font-bold">
            Let's Create your first Video
          </h2>
          <div>
            <Videoplayer />
          </div>
        </div>
      ) : (
        <VideoList videolist={videolist} />
      )}
    </div>
  );
};

export default Dashboard;
