import UserAvatar from "@/components/user-avatar";
import { getUserById } from "@/lib/services";
import { User } from "@prisma/client";
import Link from "next/link";

export default async function ProjectUserSection({
  user,
  updatedAt,
}: {
  user: User;
  updatedAt: Date;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <UserAvatar user={user} />
      <div>
        <div className="w-min">
          <Link href={`/${user.username}`}>
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
