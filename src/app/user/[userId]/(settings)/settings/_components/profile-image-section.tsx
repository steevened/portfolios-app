import DeleteProfileImage from "../../../../../[username]/settings/_components/delete-profile-image";
import UpdateProfileImage from "../../../../../[username]/settings/_components/update-profile-image";

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
