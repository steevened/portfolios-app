import { getServerAuthSession } from "@/lib/auth";
import { getAllTechnologies } from "@/lib/services/technologies.service";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Menu from "./menu";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import UploadDialog from "./upload-dialog";
import UserButton from "./user-button";
import { getProjectOnDraft } from "@/lib/services/projects.service";
import { ThemeToggle } from "./toggle-theme";

export default async function Navbar() {
  const technologies = await getAllTechnologies();
  const session = await getServerAuthSession();
  const projectOnDraft = await getProjectOnDraft();
  return (
    <header className="antialiased">
      <nav className=" px-4 z-10 bg-background/80 backdrop-blur-sm lg:px-6 py-2.5 border-b fixed w-full top-0">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <div className="block lg:hidden">
              <SideMenuSheet />
            </div>
            <Link href="/" className="flex ">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                DevFolio
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2.5">
            {session && session.user ? (
              <UploadDialog
                technologies={technologies}
                projectOnDraft={projectOnDraft}
              />
            ) : null}
            <UserButton />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

const SideMenuSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <HamburgerMenuIcon className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <div className="my-5">
          <Menu />
        </div>
      </SheetContent>
    </Sheet>
  );
};
