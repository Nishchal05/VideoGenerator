"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import TextArea from "./TextArea";
import { Videodetail } from "@/app/_context/playervideoContext";
import Sliderbar from "./Sliderbar";
import Dropdown from "./Dropdown";
import { AnimationList, FontList } from "@/app/_data/List";
import TextColorSelector from "./TextColorSelector";
import BackgroundColor from "./BackgroundColor";
import TextBackground from "./TextBackground";
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import AnimationIcon from '@mui/icons-material/Animation';
import { Smile } from "lucide-react";
import EmojiField from "./EmojiField";

const ControlSection = () => {
  const { videoplaydetail, setvideoplaydetail } = useContext(Videodetail);
  const [frame, setFrame] = useState([]);

  useEffect(() => {
    if (videoplaydetail?.frameList && videoplaydetail?.selectedframe >= 0) {
      setFrame(videoplaydetail.frameList[videoplaydetail?.selectedframe]);
    }
  }, [videoplaydetail]);
  const handleInputChange = (field, value) => {
    setFrame((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (videoplaydetail?.frameList?.length > 0 && frame) {
      const updatedFrameList = videoplaydetail?.frameList;
      updatedFrameList[videoplaydetail?.selectedframe] = frame;
      setvideoplaydetail((prev) => ({
        ...prev,
        frameList: updatedFrameList,
      }));
    }
  }, [frame]);

  return (
    <div className="p-3 bg-gray-300 rounded-lg flex flex-col gap-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <TextFieldsIcon /> Content
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <TextArea
              frame={frame}
              handleInputChange={(value) => handleInputChange("text", value)}
            />
          </AccordionContent>
          <AccordionContent>
            <Dropdown
              defaultvalue={frame?.duration}
              label={"Duration"}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              handleInputChange={(value) =>
                handleInputChange("duration", value)
              }
            />
          </AccordionContent>
          <AccordionContent>
            <Sliderbar
              label={"Fontsize"}
              value={frame?.fontSize}
              handleInputChange={(value) =>
                handleInputChange("fontSize", value)
              }
            />
          </AccordionContent>
          <AccordionContent>
            <Dropdown
              defaultvalue={frame?.fontFamily}
              label={"Font Style"}
              options={FontList}
              handleInputChange={(value) =>
                handleInputChange("fontFamily", value)
              }
            />
          </AccordionContent>
          <AccordionContent> 
            <TextColorSelector
              color={frame.textColor}
              handleInputChange={(value) =>
                handleInputChange("textColor", value)
              }
            />
          </AccordionContent>
          
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="background">
          <AccordionTrigger>
          <span className="flex items-center gap-2">
            <WallpaperIcon/>
          Background
          </span>
          </AccordionTrigger>
          <AccordionContent>
            <BackgroundColor defaultColor={frame?.bgColor} handleInputChange={(value) =>
                handleInputChange("bgColor", value)
              }/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="Animation">
          <AccordionTrigger>
          <span className="flex items-center gap-2">
            <AnimationIcon/>
          Animation
          </span>
          </AccordionTrigger>
          <AccordionContent>
            <Dropdown label={"Text Animation"} defaultvalue={frame?.animation} options={AnimationList} handleInputChange={(value)=>handleInputChange("animation",value)}/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Sticker">
          <AccordionTrigger>
          <span className="flex items-center gap-2">
            <Smile/>
          Sticker
          </span>
          </AccordionTrigger>
          <AccordionContent>
           <EmojiField handleInputChange={(value)=>handleInputChange("sticker",value)}/>
           <Sliderbar value={frame?.stickerSize??'0.5'} label={'Size'} max={4} step={0.5} handleInputChange={(value)=>handleInputChange("stickerSize",value)}/>
           <div>
           <Sliderbar value={frame?.stickerPositionX??'100'} label={'PositionX'} max={500} step={1} handleInputChange={(value)=>handleInputChange("stickerPositionX",value)}/>
           <Sliderbar value={frame?.stickerPositionY??'100'} label={'PositionY'} max={500} step={1} handleInputChange={(value)=>handleInputChange("stickerPositionY",value)}/>
           </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ControlSection;
