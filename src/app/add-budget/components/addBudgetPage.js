"use client";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddBudgetpage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rangeID = searchParams.get("range_id");
  const userId = searchParams.get("user_id");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/v2/tracking_range/budget?range_id=${rangeID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description: desc,
            amount,
            category: selectedCategory?.id,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to create budget");
      const data = await res.json();
      router.back();
      console.log("Success:", data);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const fetchExpenseCategory = async () => {
    const response = await fetch(`/api/v2/category?id=${userId}&type=expense`, {
      method: "GET",
    });
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchExpenseCategory();
  }, [userId]);

  const handleSelectCategory = (categoryId) => {
    const selected = categories.find((c) => c.id === Number(categoryId));
    if (selected) {
      setSelectedCategory(selected);
    } else {
      setSelectedCategory(null);
    }
  };

  console.log(selectedCategory);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className=" h-full p-4">
        <form onSubmit={handleSubmit} className=" flex flex-col gap-2">
          <div className=" flex flex-col rounded-lg border p-2 gap-2">
            <Label className=" text-xl">Budget Name</Label>
            <input
              value={name}
              className=" border-0 p-2 text-lg ring-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" flex flex-col rounded-lg border p-2 gap-2">
            <Label className=" text-xl">Amount</Label>
            <input
              type="number"
              value={amount}
              className=" border-0 p-2 text-lg ring-0"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className=" flex flex-col rounded-lg border p-2 gap-2">
            <Label className=" text-xl">Description</Label>
            <textarea
              type="text"
              placeholder="Write your description here..."
              value={desc}
              className=" border-0 p-2 text-lg ring-0"
              onChange={(e) => setDesc(e.target.value)}
              rows="4"
            />
          </div>
          <Select
            onValueChange={handleSelectCategory}
            value={selectedCategory?.id}
          >
            <SelectTrigger className=" text-lg">
              <SelectValue placeholder={"Select category..."} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id} className=" text-lg">
                  {c.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className=" w-full p-4 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </Suspense>
  );
}
