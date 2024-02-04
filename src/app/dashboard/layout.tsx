import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardMenu from "./_components/dashboard-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <div className="flex flex-col h-full @container">
      <div className="border-b p-2.5 bg-muted">
        <div className=" flex items-center justify-between">
          <div>
            <h2>Dashboard</h2>
            <p className="text-sm text-gray-500">
              Welcome back, {session.user.name}!
            </p>
          </div>
          <div className="@xl:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
                    ></path>
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-[14rem]">
                <DashboardMenu />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-2 border-r h-full p-2.5 hidden @xl:block">
            <DashboardMenu />
          </div>
          <div className="col-span-12 @xl:col-span-10 border">{children}</div>
        </div>
      </div>
    </div>
  );
}
