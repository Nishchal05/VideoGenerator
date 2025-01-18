"use client";
import { Videodetail } from "@/app/_context/playervideoContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const TrackList = () => {
  const defaultFrame = {
    image: "/footage.png",
    text: "Hello world",
    textColor: "black",
    fontSize: 40,
    fontFamily:'Bungee',
    duration: 2,
    Background:'transparent',
    bgColor:'white',
    animation:'None'
  };
  const [frameList, setframeList] = useState([defaultFrame]);
  const [selectedframe, setselectedframe] = useState(0);
  const { videoplaydetail, setvideoplaydetail } = useContext(Videodetail);

  const addframes = () => {
    setframeList((prev) => [...prev, defaultFrame]);
  };

  const deleteframe = (indextodelete) => {
    const updatedframelist = frameList?.filter(
      (_, index) => index !== indextodelete
    );
    setframeList(updatedframelist);
  };

  useEffect(() => {
    let totalduration = 0;
    frameList?.forEach((frame) => {
      totalduration = totalduration + frame.duration;
    });
    setvideoplaydetail(prev=>({
      ...prev,
      totalduration: totalduration,
      frameList: frameList,
      selectedframe: selectedframe,
    }));
  }, [selectedframe]);

  useEffect(() => {
    if (videoplaydetail && videoplaydetail?.frameList !== frameList) {
      setframeList(videoplaydetail?.frameList || []);
    }
  }, [videoplaydetail?.frameList]);

  return (
    <div className="p-3 bg-gray-300 rounded-lg flex flex-col gap-3">
      <h2 className="text-center font-bold">Track List</h2>
      <div className=" h-fit  md:h-[70vh] overflow-auto scrollbar-hide">
        {frameList && frameList.length > 0 ? (
          frameList.map((val, index) => (
            <div
              key={index}
              className={`flex flex-col items-center border-b pb-2 mt-3 cursor-pointer ${
                selectedframe == index && "bg-white rounded-lg p-2"
              }`}
              onClick={() => {
                setselectedframe(index);
              }}
            >
              <Image
                src={val.image ? val.image : "/footage.png"}
                alt="img"
                width={40}
                height={40}
                className="w-full h-[40px] object-contain rounded-lg"
              />

              <h2 className="text-sm text-center line-clamp-2 mt-1">
                {val.text}
              </h2>
              {index != 0 && selectedframe == index && (
                <Trash2
                  className={"mt-1 h-3 w-3 text-red-500"}
                  onClick={() => {
                    deleteframe(index);
                  }}
                />
              )}
            </div>
          ))
        ) : (
          <p>No frames available. Add a new frame to start.</p>
        )}
        <Button size="sm" className="w-full mt-3 p-2" onClick={addframes}>
          Add New Frame
        </Button>
      </div>
    </div>
  );
};

export default TrackList;
