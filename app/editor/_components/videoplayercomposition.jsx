"use client";
import React, { useContext } from "react";
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Audio,
} from "remotion";
import * as Bungee from "@remotion/google-fonts/Bungee";
import * as Roboto from "@remotion/google-fonts/Roboto";
import * as Poppins from "@remotion/google-fonts/Poppins";
import * as Lato from "@remotion/google-fonts/Lato";
import * as Jersey from "@remotion/google-fonts/JetBrainsMono";
import * as Playwrite from "@remotion/google-fonts/Playball";
import { TextAnimation } from "@/app/_data/Animation";
import { Videodetail } from "@/app/_context/playervideoContext";
import { fromJSON } from "postcss";

const Videoplayercomposition = ({ frameList }) => {
  let trackFrame = 0;
  const { width, height, fps } = useVideoConfig();
  const { videoplaydetail, setvideoplaydetail } = useContext(Videodetail);
  const currentframe = useCurrentFrame();
  Bungee.loadFont();
  Roboto.loadFont();
  Poppins.loadFont();
  Lato.loadFont();
  Jersey.loadFont();
  Playwrite.loadFont();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {frameList.map((frame, index) => {
        const fromFrame = index === 0 ? 0 : trackFrame;
        trackFrame = trackFrame + frame.duration * 30;
        const duration = frame.duration * 30;
        if(isNaN(fromFrame)){
          fromFrame=0;
        }
        return (
          <Sequence
            key={index}
            from={fromFrame}
            durationInFrames={duration}
            style={{ background: frame.bgColor }}
          >
            <AbsoluteFill>
              {frame?.sticker && (
                <img
                  src={frame.sticker}
                  alt="emoji"
                  width={50}
                  height={50}
                  style={{ transform: `scale(${frame?.stickerSize}) translateX(${frame?.stickerPositionX}px) translateY(${frame?.stickerPositionY}px)`}}
                />
              )}
            </AbsoluteFill>
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Bungee",
              }}
            >
              <h2
                style={{
                  fontSize: frame?.fontSize,
                  textAlign: "center",
                  duration: frame?.duration,
                  fontFamily: frame?.fontFamily,
                  color: frame?.textColor,
                  backgroundColor: frame?.Background,
                  transform: `${TextAnimation(
                    frame?.animation,
                    currentframe,
                    fps,
                    fromFrame,
                    width,
                    height
                  )}`,
                }}
              >
                {frame.text}
              </h2>
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {videoplaydetail?.music && (
        <Audio volume={0.5} src={staticFile(videoplaydetail.music)} />
      )}
    </AbsoluteFill>
  );
};

export default Videoplayercomposition;
