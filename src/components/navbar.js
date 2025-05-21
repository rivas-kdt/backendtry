"use client";
import { useIsMobile } from "@/hooks/useMobile";
import { React } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import Menu from "./menu";

const Navbar = ({ children }) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();

  const getLabel = () => {
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/budgets":
        return "Budgets";
      case "/transactions":
        return "Transactions";
      case "/main":
        return "Home";
      case "/add-budget":
        return "Add Budget";
      default:
        return "Dashboard";
    }
  };

  if (isMobile) {
    return (
      <div className=" max-h-screen min-h-screen flex flex-col">
        <div className=" header flex items-center justify-between px-4 border-b fixed w-full h-16 bg-background">
          {pathname === "/" ? (
            <></>
          ) : (
            <Button onClick={() => router.back()}>Back</Button>
          )}
          <h1 className=" text-xl font-semibold">{getLabel()}</h1>
          <Menu />
        </div>
        <div className=" translate-y-16 h-[calc(100dvh-64px)] overflow-auto">
          {children}
        </div>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default Navbar;
