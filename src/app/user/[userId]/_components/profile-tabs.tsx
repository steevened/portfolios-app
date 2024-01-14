"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileTabs({
  userId,
  sessionId,
}: {
  userId: string;
  sessionId?: string;
}) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center justify-between gap-x-1">
      <li className="w-full ">
        <Link
          className={buttonVariants({
            variant: pathname === `/user/${userId}` ? "default" : "ghost",
            className: "w-full",
          })}
          href={`/user/${userId}`}
        >
          <p className="font-medium text-sm">Projects</p>
        </Link>
      </li>
      <li className=" w-full">
        <Link
          href={`/user/${userId}/about`}
          className={buttonVariants({
            variant: pathname === `/user/${userId}/about` ? "default" : "ghost",
            className: "w-full",
          })}
        >
          <p className="font-medium text-sm">About</p>
        </Link>
      </li>
      {!sessionId || sessionId !== userId ? (
        <li className=" w-full">
          <Link
            href={`/user/${userId}/chat`}
            className={buttonVariants({
              variant:
                pathname === `/user/${userId}/chat` ? "default" : "ghost",
              className: "w-full",
            })}
          >
            <p className="font-medium text-sm">Chat</p>
          </Link>
        </li>
      ) : null}
    </ul>
  );
}
