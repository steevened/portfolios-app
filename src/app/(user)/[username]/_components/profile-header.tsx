import EditButton from "@/components/atoms/edit-button";
import isMyProfile from "@/lib/helpers/is-my-profile";
import { Developer, User } from "@prisma/client";
import Link from "next/link";
import DeveloperLinks from "./developer-links";
import UserImage from "./user-image";

export default async function ProfileHeader({
  user,
  developer,
}: {
  user: User;
  developer: Developer;
}) {
  return (
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
              <Link href={`/${user.username}/settings`}>
                <EditButton />
              </Link>
            ) : null}
          </div>
          {/* <ProfileRoles profileId={profile.id} /> */}
        </div>
        <DeveloperLinks developerId={developer.id} />
      </div>
    </div>
  );
}
