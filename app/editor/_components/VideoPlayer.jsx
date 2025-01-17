"use client";
import React, { useContext, useRef, useState, useEffect } from "react";
import { Player } from "@remotion/player";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Videoplayercomposition from "./videoplayercomposition";
import Crop75Icon from "@mui/icons-material/Crop75";
import { Videodetail } from "@/app/_context/playervideoContext";
import SpinnerLoader from "@/components/loader";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Dropdown from "./Dropdown";
import { MusicList } from "@/app/_data/List";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import CropSquareIcon from "@mui/icons-material/CropSquare";
const VideoPlayer = () => {
  const [framesize, setFramesize] = useState({
    width: 500,
    height: 300,
  });

  const playerRef = useRef(null);
  const { videoplaydetail,setvideoplaydetail } = useContext(Videodetail);

  useEffect(() => {
    if (videoplaydetail && videoplaydetail?.selectedframe !== undefined) {
      let skipduration = 0;
      for (let i = 0; i < videoplaydetail?.selectedframe; i++) {
        skipduration += videoplaydetail.frameList[i].duration;
      }
      playerRef?.current?.seekTo(skipduration * 30);
    }
  }, [videoplaydetail]);
  const handleInputChange=(field,value)=>{
    setvideoplaydetail(prev=>({
      ...prev,
      [field]:value
    }))
  }
  const totalDuration = videoplaydetail?.totalduration || 100;

  return (
    <div className="text-center flex flex-col gap-3">
      <div className="flex flex-col justify-center items-center">
        {videoplaydetail?.frameList ? (
          <Player
            ref={playerRef}
            component={Videoplayercomposition}
            durationInFrames={Number(totalDuration * 30)}
            compositionWidth={framesize.width}
            compositionHeight={framesize.height}
            fps={30}
            controls
            className="rounded-lg"
            inputProps={{
              frameList: videoplaydetail?.frameList,
            }}
            style={{
              borderRadius: 6,
              width: "100%",
              height: 300,
            }}
          />
        ) : (
          <div>
            <SpinnerLoader />
          </div>
        )}
      </div>

      <div className=" flex gap-2">
        <Select onValueChange={(v) => setFramesize(JSON.parse(v))}>
          <SelectTrigger className="w-[180px]">
            <CropPortraitIcon />
            <SelectValue placeholder="16:9" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={JSON.stringify({ width: 400, height: 400 })}>
              <CropSquareIcon />
              1:1
            </SelectItem>
            <SelectItem value={JSON.stringify({ width: 500, height: 300 })}>
              <CropPortraitIcon />
              16:9
            </SelectItem>
            <SelectItem value={JSON.stringify({ width: 300, height: 500 })}>
              <Crop75Icon />
              9:16
            </SelectItem>
          </SelectContent>
        </Select>
        <div className=" flex">
          <MusicNoteIcon />
          <Dropdown
            defaultvalue={"None"}
            options={MusicList}
            label=""
            handleInputChange={(value) => handleInputChange('music',value)}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
