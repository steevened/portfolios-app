import UserAvatar from "@/components/user-avatar";
import BackButton from "@/components/atoms/back-button";
import { getServerAuthSession } from "@/lib/auth";
import isMyProfile from "@/lib/helpers/is-my-profile";
import { getUserById } from "@/lib/services/user.service";
import { redirect } from "next/navigation";
import UpdateProfileImage from "./_components/update-profile-image";
import DeleteProfileImage from "./_components/delete-profile-image";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) redirect("/");

  const user = await getUserById(session?.user.id);

  if (!user) redirect("/");

  if (!isMyProfile(user.id)) redirect(`/user/${user.id}`);
  return (
    <div>
      <div className="w-full py-2.5 flex gap-2.5">
        <BackButton />
        <h3>Settings</h3>
      </div>
      <div className="grid gap-5">
        <div className="rounded-lg bg-muted p-5">
          <div className="flex items-center justify-between">
            <UserAvatar
              link={false}
              user={user}
              className="w-20 h-20 border"
              fallbackClassName="text-xl bg-background"
            />
            {!user.image ? (
              <div>
                <UpdateProfileImage action="upload" userId={user.id} />
              </div>
            ) : (
              <div className="grid gap-1.5">
                <UpdateProfileImage action="update" userId={user.id} />
                <DeleteProfileImage />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}