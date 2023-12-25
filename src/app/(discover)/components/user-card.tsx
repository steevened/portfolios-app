import { getUserById } from "@/lib/services/user.service";
import UserAvatar from "./user-avatar";

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
        <UserAvatar image={user?.image as string} name={user?.name as string} />
      ) : null}
      <div>
        <h5 className="text-sm font-medium leading-none">{user?.name}</h5>
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
