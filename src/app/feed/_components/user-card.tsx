import { getUserById } from "@/lib/services/user.service";
import UserAvatar from "./user-avatar";
import Link from "next/link";

export default async function UserCard({
  userId,
  updatedAt,
}: {
  userId: string;
  updatedAt: Date;
}) {
  const user = await getUserById(userId);

  return (
    <div className="flex items-start gap-2">
      {user ? (
        <UserAvatar
          id={userId}
          image={user?.image as string}
          name={user?.name as string}
        />
      ) : null}
      <div>
        <div className="w-min">
          <Link href={`/user/${user?.id}`} className="">
            <h5 className="text-sm font-medium leading-none hover:text-primary transition-colors hover:underline whitespace-nowrap">
              {user?.name}
            </h5>
          </Link>
        </div>
        <small className="text-xs leading-none text-muted-foreground">
          {updatedAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </small>
      </div>
    </div>
  );
}
