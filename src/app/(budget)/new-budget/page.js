"use client";
import { DatePicker } from "@/components/datePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewBudgetPage() {
  const [name, setName] = useState("");
  const [start, setStart] = useState(new Date);
  const [end, setEnd] = useState(new Date);
  const [amount, setAmount] = useState(0);
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v2/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          start,
          end,
          amount,
        }),
      });
      if (!response.ok) {
        console.error("Failed to create budget");
      }
      const data = await response.json();
      router.push(`/budget/${data[0].id}`)
      console.log("Success creating data!");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  console.log(start);

  return (
    <div className=" w-full h-full p-4">
      <form className=" flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-2">
          <Label className=" text-lg" htmlFor="budgetName">
            Budget Display Name
          </Label>
          <Input
            className=" py-1 px-3 h-12 rounded-md border border-white"
            type="text"
            name="budgetName"
            placeholder="Input budget name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </div>
        <div className=" flex flex-col gap-2">
          <Label className=" text-lg">Start</Label>
          <DatePicker onChange={setStart} date={start} maxDate={end}/>
        </div>
        <div className=" flex flex-col gap-2 w-full">
          <Label className=" text-lg">End</Label>
          <DatePicker onChange={setEnd} date={end} minDate={start}/>
        </div>
        <div className=" flex flex-col gap-2">
          <Label className=" text-lg" htmlFor="amount">
            Amount
          </Label>
          <Input
            className=" py-1 px-3 h-12 rounded-md border border-white"
            type="number"
            name="amount"
            placeholder="PHP 00.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></Input>
        </div>
        <div className=" w-full flex justify-end">
          <button
            className=" rounded-lg py-1 px-6 h-12 bg-amber-500 text-lg mt-2 w-1/3"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
