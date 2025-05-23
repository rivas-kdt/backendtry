"use client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlusSquareIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function Range() {
  const [budgets, setBudgets] = useState([]);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const fetchBudgets = async () => {
    const response = await fetch(`/api/v2/tracking_range/budget?range_id=${id}`, {
      method: "GET",
    });
    const data = await response.json();
    setBudgets(data);
  };

  const fetchInfo = async () => {
    const response = await fetch(`/api/v2/tracking_range?id=${id}`, {
      method: "GET",
    });
    const data = await response.json();
    setInfo(data);
  };

  useEffect(() => {
    fetchBudgets();
    fetchInfo();
    setLoading(false);
  }, []);

  console.log(budgets);

  return (
    <div className=" h-full p-4 flex flex-col space-y-4">
      <div className=" w-full aspect-video card rounded-lg text-white p-4 flex flex-col justify-between">
        <header className=" font-bold text-2xl">
          <h1>{info[0]?.name}</h1>
          <div className=" flex gap-2 text-lg text-white/75 ">
            <Label className=" text-lg font-normal">Goal</Label>
            <p className=" text-sm font-normal">
              PHP
              <span className=" text-lg">{info[0]?.goal}</span>
            </p>
          </div>
        </header>
        <div className=" flex flex-col gap-2">
          <div className=" flex justify-between">
            <Label className=" text-xl">Savings goal</Label>
            <p>
              PHP <span className=" text-2xl font-bold">{info[0]?.goal}</span>
            </p>
          </div>
          <div className=" flex justify-between">
            <Label className=" text-xl">Net Worth</Label>
            <p>
              PHP <span className=" text-2xl font-bold">{info[0]?.goal}</span>
            </p>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <header className=" flex justify-between items-center">
          <p className=" text-lg font-bold">Budget</p>
          <Button size={"icon"} onClick={()=>router.push(`/add-budget?range_id=${id}&user_id=1`)}>
            <PlusSquareIcon />
          </Button>
        </header>
        <ScrollArea className=" w-full ">
          <div className=" flex gap-2">
            {!loading && budgets.map((b) => {
              return (
                <div
                  key={b.id}
                  className={`bg-gradient-to-bl to-[#a74d4d] via-[#c25656] from-[#da5454] text-white w-[200px] aspect-video flex flex-col justify-between rounded-md border p-4`}
                >
                  <p className=" text-lg font-bold">
                    {b.name}
                  </p>
                  <div className=" flex flex-col gap-2">
                    <div>PHP {b.amount - 1950} remaining</div>
                    <Progress value={((b.amount - 1950) / b.amount) * 100} className=" bg-white"/>
                  </div>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
