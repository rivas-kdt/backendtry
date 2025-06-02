"use client";
import { useIsMobile } from "@/hooks/useMobile";
import { React } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  File,
  HomeIcon,
  PieChart,
  PlusCircle,
  PlusSquare,
  Wallet,
} from "lucide-react";
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

  const staticPath = ["/", "/budgets", "/wallet"];
  const dynamicPaths = [/^\/budgets\/\d+$/];

  // let addTransactionhref = "/add-transaction";
  // if (pathname.startsWith("/budgets/")) {
  //   const id = pathname.split("/")[2]; // Extract the ID from the pathname
  //   href = `/add-transaction?id=${id}`;
  // }

  console.log(dynamicPaths);

  if (isMobile) {
    return (
      <div className=" max-h-screen min-h-screen flex flex-col">
        <div className=" header flex items-center justify-between px-4 border-b fixed w-full h-16">
          {staticPath.includes(pathname) ||
          dynamicPaths.some((regex) => regex.test(pathname)) ? (
            <></>
          ) : (
            <Button onClick={() => router.back()}>Back</Button>
          )}
          <h1 className=" text-xl font-semibold">{getLabel()}</h1>
        </div>
        <div className=" translate-y-16 h-[calc(100dvh-128px)] overflow-auto">
          {children}
        </div>
        <div className=" translate-y-16 h-16 flex items-center border-t w-full">
          <div className=" absolute flex items-center justify-between w-full px-8">
            <Link href={"/budgets"}
              className={`flex flex-col gap-1 items-center`}>
              <HomeIcon
                className={`transition-transform duration-300 transform w-8 h-8 ${
                  pathname === "/budgets" ? "-translate-y-2" : "translate-y-0"
                }`}
              />
              <div
                className={`transition-all duration-300 absolute bottom-2 rounded-lg bg-background ${
                  pathname === "/budgets"
                    ? "w-6 h-[6px] opacity-100"
                    : "w-0 h-0 opacity-0"
                }`}
              />
            </Link>
            <Link href={"/transactions"}
              className={`flex flex-col gap-1 items-center`}>
              <File
                className={`transition-transform duration-300 transform w-8 h-8 ${
                  pathname === "/transactions" ? "-translate-y-2" : "translate-y-0"
                }`}
              />
              <div
                className={`transition-all duration-300 absolute bottom-2 rounded-lg bg-background ${
                  pathname === "/transactions"
                    ? "w-6 h-[6px] opacity-100"
                    : "w-0 h-0 opacity-0"
                }`}
              />
            </Link>
            <Link
              href={`/add-transaction${
                pathname.startsWith("/budgets/")
                  ? `?range_id=${pathname.split("/")[2]}`
                  : ``
              }`}
              className=" absolute left-1/2 -translate-x-1/2 -translate-y-[24px] rounded-full bg-foreground p-5 border-t"
            >
              <PlusCircle className=" w-12 h-12" />
            </Link>
            <Link href={"/"} className=" invisible">
              <PlusCircle className=" w-12 h-12" />
            </Link>
            <Link href={"/reports"}
              className={`flex flex-col gap-1 items-center`}>
              <PieChart
                className={`transition-transform duration-300 transform w-8 h-8 ${
                  pathname === "/reports" ? "-translate-y-2" : "translate-y-0"
                }`}
              />
              <div
                className={`transition-all duration-300 absolute bottom-2 rounded-lg bg-background ${
                  pathname === "/reports"
                    ? "w-6 h-[6px] opacity-100"
                    : "w-0 h-0 opacity-0"
                }`}
              />
            </Link>
            <Link
              href={"/wallet"}
              className={`flex flex-col gap-1 items-center`}
            >
              <Wallet
                className={`transition-transform duration-300 transform w-8 h-8 ${
                  pathname === "/wallet" ? "-translate-y-2" : "translate-y-0"
                }`}
              />
              <div
                className={`transition-all duration-300 absolute bottom-2 rounded-lg bg-background ${
                  pathname === "/wallet"
                    ? "w-6 h-[6px] opacity-100"
                    : "w-0 h-0 opacity-0"
                }`}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default Navbar;
