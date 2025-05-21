"use client";
import DatePickerWithRange from "@/components/dateRangeWithPicker";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useMobile";
import { useRouter } from "next/navigation";

export default function Home() {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (isMobile) {
    return <div className=" h-[1250px]">Grabe</div>;
  }
  return (
    <div className=" h-full w-full p-8">
      <div className=" header flex justify-between">
        <h1 className=" text-2xl font-bold">Dashboard</h1>
        <DatePickerWithRange />
      </div>
    </div>
  );
}
