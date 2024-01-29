import UserAvatar from "@/app/(discover)/_components/user-avatar";
import { Button } from "@/components/ui/button";
import UpdateProfileImage from "./update-profile-image";
import DeleteProfileImage from "./delete-profile-image";

export default function ProfileImageSection({
  name,
  userId,
  image,
}: {
  name?: string;
  image?: string;
  userId: string;
}) {
  return (
    <div className="rounded-lg bg-muted p-5">
      <div className="flex items-center justify-between">
        <UserAvatar
          link={false}
          className="w-20 h-20 border"
          name={name || ""}
          fallbackClassName="text-xl bg-background"
          image={image || ""}
        />
        {!image ? (
          <div>
            <UpdateProfileImage action="upload" userId={userId} />
          </div>
        ) : (
          <div className="grid gap-1.5">
            <UpdateProfileImage action="update" userId={userId} />
            <DeleteProfileImage />
          </div>
        )}
      </div>
    </div>
  );
}
