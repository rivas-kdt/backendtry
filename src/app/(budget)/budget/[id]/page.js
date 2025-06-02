"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";

export default function BudgetPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className=" w-full h-full p-4 flex flex-col">
      <header className=" flex flex-col justify-center items-center">
        <div></div>
        <div className=" grid grid-cols-2 w-full gap-2">
          <Card
            className={
              " bg-blue-500/50 border-blue-300/50 text-white rounded-sm"
            }
          >
            <CardHeader>
              <CardTitle>Income</CardTitle>
            </CardHeader>
            <CardContent className={" grid grid-rows-3 gap-2 px-2"}>
              <div className=" px-2 py-1 border border-white rounded-sm">
                R1
              </div>
              <div className=" px-2 py-1 border border-white rounded-sm">
                R2
              </div>
              <div className=" px-2 py-1 border border-white rounded-sm">
                R3
              </div>
            </CardContent>
          </Card>
          <Card
            className={
              " bg-blue-500/50 border-blue-300/50 text-white rounded-sm"
            }
          >
            <CardHeader>
              <CardTitle>Expense</CardTitle>
            </CardHeader>
            <CardContent className={" grid grid-rows-3 gap-2 px-2"}>
              <div className=" px-2 py-1 border border-white rounded-sm">
                R1
              </div>
              <div className=" px-2 py-1 border border-white rounded-sm">
                R2
              </div>
              <div className=" px-2 py-1 border border-white rounded-sm">
                R3
              </div>
            </CardContent>
          </Card>
        </div>
      </header>
      <div className=" grid grid-rows-2 w-full flex-1 gap-2 mt-4">
        <div className=" bg-amber-500/50 p-4 rounded-sm">Test</div>
        <div className=" bg-amber-500/50 p-4 rounded-sm">Test</div>
      </div>
    </div>
  );
}
