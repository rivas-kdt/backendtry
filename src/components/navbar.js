"use client";
import { useIsMobile } from "@/hooks/useMobile";
import { React } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import Menu from "./menu";
import { File, HomeIcon, PieChart, PlusCircle, PlusSquare, Wallet } from "lucide-react";
import Link from "next/link";

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

  const rootPath = ["/","/budgets","/wallet"]

  if (isMobile) {
    return (
      <div className=" max-h-screen min-h-screen flex flex-col">
        <div className=" header flex items-center justify-between px-4 border-b fixed w-full h-16 bg-background">
          {rootPath.includes(pathname) ? (
            <></>
          ) : (
            <Button onClick={() => router.back()}>Back</Button>
          )}
          <h1 className=" text-xl font-semibold">{getLabel()}</h1>
          <Menu />
        </div>
        <div className=" translate-y-16 h-[calc(100dvh-128px)] overflow-auto">
          {children}
        </div>
        <div className=" translate-y-16 h-16 flex items-center border-t w-full">
          <div className=" absolute flex items-center justify-between w-full px-4">
            <Link href={"/budgets"}>
              <HomeIcon className=" w-8 h-8"/>
            </Link>
            <Link href={"/main"}>
              <File className=" w-8 h-8"/>
            </Link>
            <Link href={"/transactions"} className=" absolute left-1/2 -translate-x-1/2 -translate-y-[24px] rounded-full bg-background p-5 border-t">
              <PlusCircle className=" w-12 h-12"/>
            </Link>
            <Link href={"/"} className=" invisible">
              <PlusCircle className=" w-12 h-12"/>
            </Link>
            <Link href={"/main"}>
              <PieChart className=" w-8 h-8"/>
            </Link>
            <Link href={"/wallet"}>
              <Wallet className=" w-8 h-8"/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default Navbar;
