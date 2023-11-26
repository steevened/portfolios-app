"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

export default function DiscoverTabs() {
  const pathname = usePathname();
  return (
    <ul className="flex  gap-2.5 sm:gap-5">
      <li className="w-full">
        <Link
          className={buttonVariants({
            variant: pathname === "/talent" ? "secondary" : "outline",
            className: "w-full",
          })}
          href={"/talent"}
        >
          Talent
        </Link>
      </li>
      <li className="w-full">
        <Link
          className={buttonVariants({
            variant: pathname === "/jobs" ? "secondary" : "outline",
            className: "w-full",
          })}
          href={"/jobs"}
        >
          Jobs
        </Link>
      </li>
    </ul>
  );
}
