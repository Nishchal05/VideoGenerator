import { DownloadIcon, Edit2Icon, Loader2, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const VideoList = ({ videolist }) => {
  const [loading, setLoading] = useState(null); 
  const router = useRouter();

  const handleDeletion = async (videoId) => { 
    try {
        const response = await fetch('/api/Video', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                videoId: videoId,
            }),
        });
        const result = await response.json();
        if (response.ok) {
            console.log("Video deleted successfully");
        } else {
            console.error(result.error || "Failed to delete video");
        }
    } catch (error) {
        console.error("Deletion error:", error);
    }
};


  const handleNavigation = async (videoId) => {
    setLoading(videoId); 
    await router.push(`/editor/${videoId}`);
    setLoading(null); 
  };

  return (
    <div className="mt-5">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videolist.map((video, index) => {
          const frame = video?.videoData?.frameList?.[0];
          return (
            <div key={index} className="relative group">
              <div
                onClick={() => handleNavigation(video?.videoId)}
                className="w-full h-[170px] rounded-lg border flex items-center justify-center relative overflow-hidden cursor-pointer"
                style={{
                  background: frame?.bgColor ?? "#000",
                }}
              >
                {console.log(video)}
                {loading === video?.videoId ? (
                  <Loader2 className="animate-spin" />
                ) : video?.status === "active" ? (
                  <h2
                    style={{
                      color: frame?.textColor ?? "#fff",
                    }}
                  >
                    {frame?.text ?? "Hello World!"}
                  </h2>
                ) : (
                  <h2>
                    <Loader2 className="animate-spin" />
                    Generating...
                  </h2>
                )}

                <div className="absolute top-0 w-full h-full opacity-0 group-hover:opacity-80 flex items-center justify-center bg-black/50 rounded-xl cursor-pointer transition-opacity">
                  <Edit2Icon className="z-20 text-white h-6 w-6" />
                </div>
              </div>
              
              {video.status === "active" ? (
                <div className="flex gap-5 mt-2 items-center justify-end">
                  <Edit2Icon
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => handleNavigation(video?.videoId)}
                  />
                  <DownloadIcon className="h-4 w-4 cursor-pointer" />
                  <Trash
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => handleDeletion(video?.videoId)}
                  />
                </div>
              ) : (
                <h2>
                  <Loader2 className="animate-spin" />
                  Generating...
                </h2>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoList;
