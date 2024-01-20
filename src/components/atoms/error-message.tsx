"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function ErrorMessage() {
  const router = useRouter();
  return (
    <div className="grid place-content-center my-5 gap-2.5">
      <h3>Something went wrong. Please try again later.</h3>
      <div className="flex justify-center">
        <Button onClick={() => router.refresh()}>Retry</Button>
      </div>
    </div>
  );
}
