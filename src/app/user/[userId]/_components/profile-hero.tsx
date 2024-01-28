import UserAvatar from "@/app/(discover)/_components/user-avatar";
import { getServerAuthSession } from "@/lib/auth";
import isMyProfile from "@/lib/helpers/is-my-profile";
import { getProfileByUserId } from "@/lib/services/profile.service";
import { getUserById } from "@/lib/services/user.service";
import Error from "../about/error";
import EditProfileModal from "./edit-profile-modal";
import ProfileLinks from "./profile-links";
import ProfileRolea from "./profile-roles";
import ProfileTabs from "./profile-tabs";

import UserImage from "./user-image";

const ProfileHero = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const user = await getUserById(params.userId);
  const profile = await getProfileByUserId(params.userId);
  const session = await getServerAuthSession();

  if (!user || !profile) return <Error />;
  return (
    <div>
      <div className="flex gap-2.5 py-5 max-sm:px-2.5">
        <UserImage
          imageUrl={(user.image as string) || undefined}
          name={user.name || ""}
        />
        <div className=" w-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-lg first-letter:uppercase">
                {user.name}
              </p>
              {(await isMyProfile(user.id)) ? (
                <EditProfileModal user={user} />
              ) : null}
            </div>
            <ProfileRolea profileId={profile.id} />
          </div>
          <ProfileLinks profileId={profile.id} />
        </div>
      </div>
      <div className="border-y sm:border  max-sm:px-1 p-1 sm:rounded-lg">
        <ProfileTabs sessionId={session?.user.id} userId={user.id} />
      </div>
    </div>
  );
};

export default ProfileHero;
