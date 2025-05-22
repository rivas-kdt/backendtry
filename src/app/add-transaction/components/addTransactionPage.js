"use client";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddTransactionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rangeID = searchParams.get("range_id");
  const userId = searchParams.get("user_id");

  const [type, setType] = useState("expense");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  const [categories, setCategories] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedBudget, setSelectedBudget] = useState();
  const [fromWallet, setFromWallet] = useState();
  const [toWallet, setToWallet] = useState();

  const fetchData = async () => {
    if (!userId) return;

    const [catRes, walletRes] = await Promise.all([
      fetch(`/api/v2/category?id=${userId}&type=${type}`),
      fetch(`/api/v2/wallet?id=${userId}`),
    ]);

    const [catData, walletData] = await Promise.all([
      catRes.json(),
      walletRes.json(),
    ]);

    setCategories(catData);
    setWallets(walletData);

    if (type === "expense" && rangeID) {
      const budgetRes = await fetch(`/api/v2/tracking_range/${rangeID}/budget`);
      const budgetData = await budgetRes.json();
      setBudgets(budgetData);
    } else {
      setBudgets([]);
      setSelectedBudget(undefined);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, type, rangeID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/v2/transaction?type=${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          notes,
          amount,
          date,
          id: rangeID,
          category: selectedCategory,
          from: fromWallet,
          to: toWallet,
          budget_id: selectedBudget,
        }),
      });
      if (!res.ok) throw new Error("Failed to create transaction");
      router.back();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleSelect = (setter) => (value) => {
    setter(Number(value));
  };

  return (
    <div className="h-full p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {/* Type Selector */}
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="text-lg">
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense" className="text-lg">
              Expense
            </SelectItem>
            <SelectItem value="income" className="text-lg">
              Income
            </SelectItem>
            <SelectItem value="transfer" className="text-lg">
              Transfer
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-col rounded-lg border p-2 gap-2">
          <Label className="text-xl">Transaction Name</Label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-0 p-2 text-lg ring-0"
          />
        </div>
        <div className="flex flex-col rounded-lg border p-2 gap-2">
          <Label className="text-xl">Amount</Label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border-0 p-2 text-lg ring-0"
          />
        </div>
        <div className="flex flex-col rounded-lg border p-2 gap-2">
          <Label className="text-xl">Date</Label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-0 p-2 text-lg ring-0"
          />
        </div>
        <div className="flex flex-col rounded-lg border p-2 gap-2">
          <Label className="text-xl">Notes</Label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
            className="border-0 p-2 text-lg ring-0"
          />
        </div>

        {/* Category Selector */}
        {type !== "transfer" && (
          <Select
            onValueChange={handleSelect(setSelectedCategory)}
            value={selectedCategory}
          >
            <SelectTrigger className="text-lg">
              <SelectValue placeholder="Select category..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id} className="text-lg">
                  {c.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Budget Selector (Expense only) */}
        {type === "expense" && rangeID && budgets.length > 0 && (
          <Select
            onValueChange={handleSelect(setSelectedBudget)}
            value={selectedBudget}
          >
            <SelectTrigger className="text-lg">
              <SelectValue placeholder="Apply to budget (optional)" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((b) => (
                <SelectItem key={b.id} value={b.id} className="text-lg">
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* From Wallet (Expense/Transfer) */}
        {(type === "expense" || type === "transfer") && (
          <Select
            onValueChange={handleSelect(setFromWallet)}
            value={fromWallet}
          >
            <SelectTrigger className="text-lg">
              <SelectValue placeholder="From wallet" />
            </SelectTrigger>
            <SelectContent>
              {wallets.map((w) => (
                <SelectItem key={w.id} value={w.id} className="text-lg">
                  {w.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* To Wallet (Income/Transfer) */}
        {(type === "income" || type === "transfer") && (
          <Select onValueChange={handleSelect(setToWallet)} value={toWallet}>
            <SelectTrigger className="text-lg">
              <SelectValue placeholder="To wallet" />
            </SelectTrigger>
            <SelectContent>
              {wallets.map((w) => (
                <SelectItem key={w.id} value={w.id} className="text-lg">
                  {w.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="w-full p-4 flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
