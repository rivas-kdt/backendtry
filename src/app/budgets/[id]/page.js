"use client";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, PlusSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BudgetPage() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [incomeCategory, setIncomeCategory] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id;

  const fetchIncomeCategory = async () => {
    const response = await fetch(`/api/budget/category?id=${id}&type=Income`, {
      method: "GET",
    });
    const data = await response.json();
    setIncomeCategory(data);
  };

  const fetchExpenseCategory = async () => {
    const response = await fetch(`/api/budget/category?id=${id}&type=Expense`, {
      method: "GET",
    });
    const data = await response.json();
    setExpenseCategory(data);
  };

  useEffect(() => {
    fetchIncomeCategory();
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchExpenseCategory();
  }, []);

  const handleSubmitIncome = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/budget/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget_id: id,
          name: category,
          type: "Income",
          amount: amount,
        }),
      });
      if (!res.ok) throw new Error("Failed to create budget");
      const data = await res.json();
      console.log("Success:", data);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  console.log(incomeCategory);

  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/budget/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget_id: id,
          name: category,
          type: "Expense",
          amount: amount,
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
    <div className=" h-full bg-white flex flex-col gap-4 p-4">
      <div className=" grid grid-cols-2 gap-4">
        <div className=" w-full h-auto aspect-square bg-black rounded-lg"></div>
        <div className=" w-full h-auto aspect-square bg-black rounded-lg"></div>
      </div>
      <div className=" grid grid-rows-2 gap-4">
        {/* <div className=" w-full border rounded-lg p-2 px-4 flex justify-between items-center">
          <Button size={"icon"} variant="ghost">
            <ChevronDown />
          </Button>
          <div className=" w-[80%]">
            <h1 className=" text-xl font-bold">NNN INKKKK</h1>
            <p className=" text-xl">123321</p>
          </div>
          <Button size={"icon"}>
            <PlusSquare />
          </Button>
        </div> */}
        <Collapsible className="  border rounded-lg flex flex-col justify-center">
          <div className=" w-full py-5 px-4 flex justify-between items-center">
            <CollapsibleTrigger asChild>
              <Button size={"icon"} variant="ghost">
                <ChevronDown />
              </Button>
            </CollapsibleTrigger>
            <div className=" w-[80%]">
              <h1 className=" text-xl font-bold">NNN INKKKK</h1>
              <p className=" text-xl">123321</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"icon"}>
                  <PlusSquare />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Create budget</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitIncome} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Goal
                    </Label>
                    <Input
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <CollapsibleContent className=" flex flex-col border-t p-2">
            {incomeCategory.map((ic) => {
              return (
                <div key={ic.id} className=" border-b p-2 space-y-2">
                  <h1 className=" text-lg font-bold">{ic.name}</h1>
                  <div className=" grid grid-cols-3 items-center w-full *:text-center">
                    <div>Goal</div>
                    <div>Earned</div>
                    <div>To Reach</div>
                    <div>15000</div>
                    <div>11500</div>
                    <div>15000</div>
                  </div>
                </div>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
        <Collapsible className="  border rounded-lg flex flex-col justify-center">
          <div className=" w-full py-5 px-4 flex justify-between items-center">
            <CollapsibleTrigger asChild>
              <Button size={"icon"} variant="ghost">
                <ChevronDown />
              </Button>
            </CollapsibleTrigger>
            <div className=" w-[80%]">
              <h1 className=" text-xl font-bold">TOTAL EXPPPPP</h1>
              <p className=" text-xl">123321</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"icon"}>
                  <PlusSquare />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Create budget</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleSubmitExpense}
                  className="grid gap-4 py-4"
                >
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Goal
                    </Label>
                    <Input
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <CollapsibleContent className=" flex flex-col border-t p-2">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
