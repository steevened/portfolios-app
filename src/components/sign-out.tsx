"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOut() {
  return (
    <Button
      className="w-full"
      size={"sm"}
      variant={"ghost"}
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  );
}
