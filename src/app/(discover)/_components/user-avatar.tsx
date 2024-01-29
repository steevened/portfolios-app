import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function UserAvatar({
  name,
  image,
  id,
  className,
  fallbackClassName,
  link = true,
}: {
  name: string;
  image?: string;
  id?: string;
  className?: string;
  fallbackClassName?: string;
  link?: boolean;
}) {
  if (link && id) {
    return (
      <Link href={`/user/${id}`}>
        <Avatar className={(cn("w-12 h-12"), className)}>
          {image ? <AvatarImage src={image} alt={name ?? ""} /> : null}
          <AvatarFallback className={cn("uppercase", fallbackClassName)}>
            {name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </Link>
    );
  }

  return (
    <Avatar className={(cn("w-12 h-12"), className)}>
      {image ? <AvatarImage src={image} alt={name ?? ""} /> : null}
      <AvatarFallback className={cn("uppercase", fallbackClassName)}>
        {name.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
}
