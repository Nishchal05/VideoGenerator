import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAvailableEmojis } from "@remotion/animated-emoji";
import { Slider } from "@/components/ui/slider";
const EmojiField = ({handleInputChange}) => {
  const emojiList = getAvailableEmojis();
  return (
    <div>
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        <div className=" grid grid-cols-3 md:grid-cols-5 bg-white p-4">
          {emojiList.map((items, index) => (
            <img
              src={
                "https://fonts.gstatic.com/s/e/notoemoji/latest/" +
                items.codepoint +
                "/512.gif"
              }
              alt="😁"
              width="42"
              height="42"
              key={index}
              className=" hover:bg-slate-300 rounded-lg"
              onClick={()=>handleInputChange("https://fonts.gstatic.com/s/e/notoemoji/latest/" +
                items.codepoint +
                "/512.gif")}
            ></img>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EmojiField;
