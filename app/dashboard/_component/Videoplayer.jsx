 "use client"
 import React, { useState } from 'react';
import Link from 'next/link';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import SpinnerLoader from '@/components/loader';  

const Videoplayer = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false); 
  
  const handlevideodata = async () => {
    const videoId = uuid4();
    setLoading(true); 
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/addVideoData`, {
        method: 'POST',
        body: JSON.stringify({
          videoId: videoId,
          useremail: user?.primaryEmailAddress?.emailAddress,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!result.ok) {
        throw new Error('Failed to add video data');
      }

      const response = await result.json();
      router.push('/editor/' + videoId);

    } catch (error) {
      console.error('Error adding video data:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex gap-3 justify-center items-center">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-lg z-50">
          <SpinnerLoader/>
        </div>
      ) : (
        <>
          <div className="border rounded-lg p-4 w-full cursor-pointer shadow-md hover:bg-gray-100">
            <Link href="/ai-video-gen">
              <img src="/AIvideo.png" alt="generate with AI" width={40} />
              <h1 className="text-lg">Generate with AI</h1>
            </Link>
          </div>
          <div className="border rounded-lg p-4 w-full cursor-pointer shadow-md hover:bg-gray-100">
            <div onClick={handlevideodata}>
              <img src="/editVideo.png" alt="generate with Scratch" width={40} />
              <h1 className="text-lg">Generate with Scratch</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Videoplayer;
