import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Menu from "./menu";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import UserButton from "./user-button";

export default function Navbar() {
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
                FirstDev
              </span>
            </Link>

            {/* <form action="#" method="GET" className="hidden lg:block lg:pl-2">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    {" "}
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />{" "}
                  </svg>
                </div>
                <Input
                  type="text"
                  name="search"
                  id="topbar-search"
                  className="pl-8 pr-2 "
                  placeholder="Search"
                />
              </div>
            </form> */}
          </div>
          <div className="flex items-center lg:order-2">
            {/* <button
              id="toggleSidebarMobileSearch"
              type="button"
              className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Search</span>

              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button> */}

            <UserButton />
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
