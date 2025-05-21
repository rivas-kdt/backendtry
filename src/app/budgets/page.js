"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { DatePicker } from "@/components/datePicker";

export default function BudgetsPage() {
  const [name, setName] = useState("");
  const [startDate, setStart] = useState();
  const [endDate, setEnd] = useState();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true)
 
  function formatDateToYMD(date) {
    return new Date(date).toISOString().split("T")[0];
  }

  const fetchBudgets = async () => {
    const response = await fetch("/api/budget", { method: "GET" });
    const data = await response.json();
    setBudgets(data);
  };

  useEffect(() => {
    fetchBudgets();
    setLoading(false)
  }, []);

  console.log(budgets);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedStart = formatDateToYMD(startDate);
    const formattedEnd = formatDateToYMD(endDate);
    try {
      const res = await fetch("/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          start: formattedStart,
          end: formattedEnd,
        }),
      });
      if (!res.ok) throw new Error("Failed to create budget");
      const data = await res.json();
      console.log("Success:", data);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div className=" p-4 bg-background h-full ">
      <div className=" flex justify-between mb-4">
        <h1 className=" text-2xl font-bold">Budgets</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Budget</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create budget</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label className="text-right">Start</Label>
                <DatePicker
                  date={startDate}
                  onChange={setStart}
                  maxDate={endDate}
                />
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label className="text-right">End</Label>
                <DatePicker
                  date={endDate}
                  onChange={setEnd}
                  minDate={startDate}
                  disabled={!startDate}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className=" flex flex-col items-center gap-4">
        {!loading && budgets.map((b) => {
          return (
            <Link
              key={b.id}
              href={`/budgets/${b.id}`}
              className=" bg-card p-4 rounded-md w-1/2 border text-center"
            >
              {b.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
