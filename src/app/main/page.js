import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlusSquareIcon } from "lucide-react";

export default function MainScreen() {
  return (
    <div className=" h-full p-4 flex flex-col space-y-4">
      <div className=" w-full aspect-video card rounded-lg text-white text-lg p-2">
        Test
      </div>
      <div className=" flex flex-col gap-2">
        <header className=" flex justify-between items-center">
          <p className=" text-lg font-bold">BASICS</p>
          <Button size={"icon"}>
            <PlusSquareIcon />
          </Button>
        </header>
        <ScrollArea className=" w-full ">
          <div className=" flex gap-2">
            <div className=" w-[200px] aspect-video bg-amber-300"></div>
            <div className=" w-[200px] aspect-video bg-amber-300"></div>
            <div className=" w-[200px] aspect-video bg-amber-300"></div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
