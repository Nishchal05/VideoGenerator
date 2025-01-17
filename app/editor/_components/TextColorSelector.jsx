"use client"
import React,{useState} from "react";
import ColorPicker from "react-best-gradient-color-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TextColorSelector = ({color,handleInputChange}) => {
  return (
    <div>
      <label>Text Color:</label>
      <Popover>
        <PopoverTrigger asChild><div style={{backgroundColor:color}} className=" h-10 w-10 rounded-lg"></div></PopoverTrigger>
        <PopoverContent><ColorPicker value={color} width={250} height={200} onChange={(v)=>{handleInputChange(v)}} hideEyeDrop hideColorGuide hideControls /></PopoverContent>
      </Popover>
    </div>
  );
};

export default TextColorSelector;
