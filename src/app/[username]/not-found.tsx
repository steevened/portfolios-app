import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center h-screen flex items-center justify-center">
      <div>
        <h1 className="font-bold text-3xl">Not Found</h1>
        <p>Could not find requested resource</p>
        <Link
          className={buttonVariants({
            variant: "default",
          })}
          href="/"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
