"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GradientColors, SolidColors } from "@/app/_data/Color";

const BackgroundColor = ({ defaultColor, handleInputChange }) => {
  return (
    <div>
      <Tabs defaultValue="Solid" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="Solid">Solid</TabsTrigger>
          <TabsTrigger value="Gradient">Gradient</TabsTrigger>
        </TabsList>
        <TabsContent value="Solid">
          
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {SolidColors.map((color, index) => (
                <div
                  key={index}
                  className="w-full h-10 rounded-lg m-1 cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  onClick={()=>handleInputChange(color.hex)}

                ></div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="Gradient">
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {GradientColors.map((color, index) => (
                <div
                  key={index}
                  className="w-full h-10 rounded-lg m-1"
                  style={{ background: color.gradient }}
                  onClick={()=>handleInputChange(color.gradient)}
                ></div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundColor;
