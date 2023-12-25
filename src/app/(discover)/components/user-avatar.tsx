import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function UserAvatar({
  name,
  image,
}: {
  name: string;
  image?: string;
}) {
  return (
    <Avatar className="w-12 h-12">
      {image ? <AvatarImage src={image} alt={name ?? ""} /> : null}
      <AvatarFallback className="uppercase">{name.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}
