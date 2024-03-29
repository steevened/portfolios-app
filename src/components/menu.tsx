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

export default function Menu() {
  const { width } = useWindowSize();

  const isMobile = width < 640;

  return (
    <aside>
      <ul className="gap-1">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className={buttonVariants({
                  variant: "secondary",
                  size: "icon",
                  className: "!bg-secondary",
                })}
                href={"/feed"}
              >
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
                {/* <p>Discover</p> */}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={buttonVariants({
                variant: "secondary",
                className: "bg-secondary border !text-muted-foreground",
              })}
              side={isMobile ? "top" : "left"}
            >
              <p>Explore</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ul>
    </aside>
  );
}
