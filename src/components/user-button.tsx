import { getServerAuthSession } from "@/lib/auth";
import SignIn from "./sign-in";
import SignOut from "./sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getUserById } from "@/lib/services/user.service";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function UserButton() {
  const session = await getServerAuthSession();
  if (!session?.user) return <SignIn />;

  const user = await getUserById(session?.user.id as string);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            {session.user.image && (
              <AvatarImage
                src={session.user.image}
                alt={session.user.name ?? ""}
              />
            )}
            <AvatarFallback className="uppercase">
              {session.user.name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.name}
            </p>

            <p className="text-xs leading-none text-muted-foreground">
              {user?.username}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            className={buttonVariants({
              variant: "menu",
              size: "sm",
            })}
            href={`/${user?.username}`}
          >
            Profile
          </Link>
        </DropdownMenuItem>
        {user && user?.role === "admin" ? (
          <DropdownMenuItem asChild>
            <Link
              className={buttonVariants({
                variant: "menu",
                size: "sm",
              })}
              href={`dashboard`}
            >
              Dashboard
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem asChild>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
