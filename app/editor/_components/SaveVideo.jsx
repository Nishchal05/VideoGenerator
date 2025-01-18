"use client";
import { useContext, useEffect } from 'react';
import { Videodetail } from '@/app/_context/playervideoContext';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const SaveVideo = () => {
  const { videoId } = useParams();
  const { videoplaydetail,setvideoplaydetail } = useContext(Videodetail);
  const saveVideo = async () => {
    try {
      const result = await fetch('/api/addVideoData', {
        method: 'PUT',
        body: JSON.stringify({
          videoId: videoId,
          videoData: videoplaydetail,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.ok) {
        toast.success('Video Saved');
      } else {
        toast.error('Failed to save video');
      }

      const data = await result.json(); 
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error saving video:', error);
      toast.error('Error occurred while saving video');
    }
  };
  const GetVideoData = async () => {
    try {
      const result = await fetch('/api/addVideoData?videoId=' + videoId);
      const data = await result.json(); 
      setvideoplaydetail(data[0]?.videoData); 
    } catch (error) {
      console.log('Error fetching video data:', error);
    }
  };
  
  useEffect(()=>{
    videoId && GetVideoData();
  },[])

  return (
    <div>
      <Button variant="outline" onClick={saveVideo}>
        Save
      </Button>
    </div>
  );
};

export default SaveVideo;
