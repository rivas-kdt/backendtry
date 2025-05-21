"use client"
import { React, useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    { href: "/", label: "Dashboard" },
    { href: "/transactions", label: "Transactions" },
    { href: "/budgets", label: "Budgets" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[240px] sm:w-[300px]">
        <SheetTitle></SheetTitle>
        <nav className="flex flex-col gap-4 mt-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-base font-medium transition-colors hover:text-primary px-2 py-2 rounded-md",
                pathname === route.href ||
                  (route.href !== "/" && pathname.startsWith(route.href))
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
