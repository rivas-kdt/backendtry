"use client";
import DatePickerWithRange from "@/components/dateRangeWithPicker";
import { useIsMobile } from "@/hooks/useMobile";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (isMobile) {
    return (
      <div className=" h-full px-12">
        <div className="w-full flex flex-col justify-center items-center absolute top-1/2 right-1/2 translate-x-1/2">
          <div id="label" className=" w-full px-12 pt-2">
            <h1 className=" text-3xl font-bold text-center tracking-widest">Xpense App</h1>
          </div>
          <div
            id=" description"
            className=" w-full px-12 text-center space-y-2"
          >
            <p className=" text-lg">Track and manage your expenses now!</p>
            <p className=" text-base">
              Begin by creating a budget/tracking range, then fund your budget,
              track your spending
            </p>
            <button className=" bg-green-500 rounded-full px-8 py-2 mt-16 text-white font-semibold">
              Create a budget
            </button>
          </div>
          <div className=" absolute w-4/5 aspect-square top-0 -translate-y-[100%]">
            <Image
              src={"/vector2.svg"}
              alt=""
              fill
              className=" object-cover"
            />
          </div>
        </div>
      </div>
    );
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
