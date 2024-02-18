"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DeveloperTabs({ username }: { username: string }) {
  const pathname = usePathname();

  const isProjectsActive = pathname === `/${username}`;

  const isAboutActive = pathname === `/${username}/about`;

  return (
    <ul className="flex items-center  gap-x-1">
      <li className="w-min ">
        <Link
          className={buttonVariants({
            variant: isProjectsActive ? "default" : "secondary",
            className: "w-full",
          })}
          href={`/${username}`}
        >
          <p className="font-medium text-sm">Projects</p>
        </Link>
      </li>
      <li className=" w-min">
        <Link
          href={`/${username}/about`}
          className={buttonVariants({
            variant: isAboutActive ? "default" : "secondary",
            className: "w-full",
          })}
        >
          <p className="font-medium text-sm">About</p>
        </Link>
      </li>
    </ul>
  );
}
