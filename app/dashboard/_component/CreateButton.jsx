import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Videoplayer from "./Videoplayer";
const CreateButton = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex gap-3 w-[100%] bg-black text-white"
          >
            <span className=" text-2xl">+</span>Create Video
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              Let's Create a new video
            </DialogTitle>
            <DialogDescription>
              <Videoplayer/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateButton;
