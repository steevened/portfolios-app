"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardMenu() {
  const pathname = usePathname();
  return (
    <ul className="grid gap-5 text-center">
      <li>
        <Link
          className={buttonVariants({
            variant: pathname === "/dashboard" ? "default" : "ghost",
            className: "w-full",
          })}
          href="/dashboard"
        >
          General
        </Link>
      </li>
    </ul>
  );
}
