"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function ErrorMessage({
  error,
  reset,
}: {
  error?: Error & { digest?: number };
  reset?: () => void;
}) {
  const router = useRouter();
  return (
    <div className="grid place-content-center my-5 gap-2.5">
      <h3>Something went wrong. Please try again later.</h3>
      {error?.digest ? <>{JSON.stringify(error)}</> : null}
      <div className="flex justify-center">
        <Button onClick={() => reset?.()}>Retry</Button>
      </div>
    </div>
  );
}
