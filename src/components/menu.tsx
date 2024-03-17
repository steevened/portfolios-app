"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useWindowSize } from "usehooks-ts";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const getItems = (pathname: string) => {
  const items: { name: string; href: string; icon: ReactNode }[] = [
    {
      name: "Explore",
      href: "/feed",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6.5 17.5L14 14l3.5-7.5L10 10l-3.5 7.5ZM12 13q-.425 0-.713-.288T11 12q0-.425.288-.713T12 11q.425 0 .713.288T13 12q0 .425-.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
          ></path>
        </svg>
      ),
    },
    {
      name: "Bookmarks",
      href: "/bookmarks",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"
          ></path>
        </svg>
      ),
    },
  ];

  return items.map((item) => {
    return {
      ...item,
      active: item.href === pathname || pathname.startsWith(item.href),
    };
  });
};

export default function Menu() {
  const { width } = useWindowSize();

  const pathname = usePathname();

  const items = getItems(pathname);

  const isMobile = width < 640;

  return (
    <aside className="w-full">
      <ul className="gap-2.5 flex md:flex-col w-2/3 md:w-full mx-auto justify-between">
        {items.map((item) => (
          <li key={item.name}>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={buttonVariants({
                      variant: "secondary",
                      size: "icon",
                      className: cn(
                        "!bg-secondary",
                        item.active && "!text-primary"
                      ),
                    })}
                    href={item.href}
                  >
                    {item.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className={buttonVariants({
                    variant: "secondary",
                    className: "bg-secondary border !text-muted-foreground",
                  })}
                  side={isMobile ? "top" : "left"}
                >
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        ))}
      </ul>
    </aside>
  );
}
