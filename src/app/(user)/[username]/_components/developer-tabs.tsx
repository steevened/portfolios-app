"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DeveloperTabs({ username }: { username: string }) {
  const pathname = usePathname();

  const isProjectsActive = pathname === `/${username}`;

  const isAboutActive = pathname === `/${username}/about`;

  return (
    <ul className="flex items-center justify-between gap-x-1">
      <li className="w-full ">
        <Link
          className={buttonVariants({
            variant: isProjectsActive ? "default" : "ghost",
            className: "w-full",
          })}
          href={`/${username}`}
        >
          <p className="font-medium text-sm">Projects</p>
        </Link>
      </li>
      <li className=" w-full">
        <Link
          href={`/${username}/about`}
          className={buttonVariants({
            variant: isAboutActive ? "default" : "ghost",
            className: "w-full",
          })}
        >
          <p className="font-medium text-sm">About</p>
        </Link>
      </li>
    </ul>
  );
}
