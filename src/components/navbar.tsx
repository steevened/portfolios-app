import { getServerAuthSession } from "@/lib/auth";
import { UploadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ThemeToggle } from "./toggle-theme";
import { buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import UserButton from "./user-button";

export default async function Navbar() {
  const session = await getServerAuthSession();
  return (
    <header className="antialiased">
      <nav className="px-2.5 sm:px-5 z-10 bg-background/90 backdrop-blur-lg lg:px-6 py-2.5 border-b w-full">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <Link href="/feed" className="flex ">
              <span className="self-center text-xl font-semibold whitespace-nowrap ">
                The Showcase
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2.5">
            {session && session.user ? (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className={buttonVariants({
                        variant: "ghost",
                        size: "icon",
                        className: "!rounded-full",
                      })}
                      href="/project/create"
                    >
                      <UploadIcon strokeWidth={"2"} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload project</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
            <UserButton />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
