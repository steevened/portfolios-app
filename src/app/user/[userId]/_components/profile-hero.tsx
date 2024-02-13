import { getServerAuthSession } from "@/lib/auth";
import isMyProfile from "@/lib/helpers/is-my-profile";
// import { getProfileByUserId } from "@/lib/services/developer.service";
import { getUserById } from "@/lib/services/user.service";
import ProfileTabs from "./profile-tabs";

import EditButton from "@/components/atoms/edit-button";
import Link from "next/link";
// import UserImage from "@/app/(user)/[...username]/_components/user-image";

const ProfileHero = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const user = await getUserById(params.userId);
  // const profile = await getProfileByUserId(params.userId);
  const session = await getServerAuthSession();

  // if (!user || !profile) return <Error />;
  return (
    <div>
      <div className="flex gap-2.5 py-5 max-sm:px-2.5">
        {/* <UserImage
          imageUrl={(user.image as string) || undefined}
          name={user.name || ""}
        /> */}
        <div className=" w-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-lg first-letter:uppercase">
                {user.name}
              </p>
              {(await isMyProfile(user.id)) ? (
                <Link href={`/user/${user.id}/settings`}>
                  <EditButton />
                </Link>
              ) : null}
            </div>
            {/* <ProfileRoles profileId={profile.id} /> */}
          </div>
          {/* <ProfileLinks profileId={profile.id} /> */}
        </div>
      </div>
      <div className="border-y sm:border  max-sm:px-1 p-1 sm:rounded-lg">
        <ProfileTabs sessionId={session?.user.id} userId={user.id} />
      </div>
    </div>
  );
};

export default ProfileHero;
