import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function NotFoundSection() {
  return (
    <div className="text-center h-screen flex items-center justify-center">
      <div className="space-y-2.5">
        <h1 className="font-bold text-3xl">Not Found</h1>
        <p>Could not find requested resource</p>
        <Link
          className={buttonVariants({
            variant: "default",
          })}
          href="/feed"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
