import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function UserAvatar({
  name,
  image,
  id,
  className,
}: {
  name?: string;
  image?: string;
  id: string;
  className?: string;
}) {
  return (
    <Link href={`/user/${id}`}>
      <Avatar className={(cn("w-12 h-12"), className)}>
        {image ? <AvatarImage src={image} alt={name ?? ""} /> : null}
        <AvatarFallback className="uppercase">
          {name?.slice(0, 2) || ""}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
