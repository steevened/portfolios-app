"use client";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import { useRouter } from "next/navigation";

export default function BackButton({ ...buttonProps }: ButtonProps) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      {...buttonProps}
      size={"icon"}
      variant={"ghost"}
      className={cn(
        "flex items-center gap-1 rounded-full",
        buttonProps.className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13z"
        ></path>
      </svg>
    </Button>
  );
}
