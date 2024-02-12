import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Link from "next/link";

export default async function UserAvatar({
  className,
  fallbackClassName,
  link = true,
  user,
}: {
  className?: string;
  fallbackClassName?: string;
  link?: boolean;
  user: User;
}) {
  if (link) {
    return (
      <Link href={`/${user.username}`}>
        <UserAvatarContent
          user={user}
          className={className}
          fallbackClassName={fallbackClassName}
        />
      </Link>
    );
  }

  return (
    <UserAvatarContent
      user={user}
      className={className}
      fallbackClassName={fallbackClassName}
    />
  );
}

const UserAvatarContent = ({
  user,
  className,
  fallbackClassName,
}: {
  user: User;
  className?: string;
  fallbackClassName?: string;
}) => {
  return (
    <Avatar className={(cn("w-12 h-12"), className)}>
      {user.image ? (
        <AvatarImage src={user.image} alt={user.name ?? ""} />
      ) : null}
      <AvatarFallback className={cn("uppercase", fallbackClassName)}>
        {user.name?.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
};
