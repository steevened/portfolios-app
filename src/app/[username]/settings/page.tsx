import UserAvatar from "@/components/user-avatar";
import BackButton from "@/components/atoms/back-button";
import { getServerAuthSession } from "@/lib/auth";
import isMyProfile from "@/lib/helpers/is-my-profile";
import { getUserById } from "@/lib/services/user.service";
import { redirect } from "next/navigation";
import UpdateProfileImage from "./_components/update-profile-image";
import DeleteProfileImage from "./_components/delete-profile-image";
import { getDeveloperProfile } from "@/lib/services/developer.service";
import BioFormSection from "./_components/bio-form-section";
import HeadlineFormSection from "./_components/headline-form-section";
import UserInfoFormSection from "./_components/user-info-form-section";
import ProfileLinksFormSection from "./_components/profile-links-form-section";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerAuthSession();

  if (!session) redirect("/");

  const user = await getUserById(session?.user.id);

  if (!user) redirect("/");

  if (!isMyProfile(user.id)) redirect(`/user/${user.id}`);

  const profile = await getDeveloperProfile({
    username: params.username,
  });

  if (!profile) redirect("/");

  return (
    <div>
      <div className="w-full items-center py-2.5 flex gap-2.5">
        <BackButton />
        <h3>Settings</h3>
      </div>
      <div className="grid gap-5 my-5">
        <div className="rounded-lg bg-muted p-5 space-y-2.5">
          <h4>Profile image</h4>
          <div className="flex items-end justify-between">
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
              <div className="grid gap-1.5 grid-cols-2 ">
                <UpdateProfileImage action="update" userId={user.id} />
                <DeleteProfileImage />
              </div>
            )}
          </div>
        </div>

        <SectionContainer id="user-info" title="User info">
          <div className="mt-2.5">
            <UserInfoFormSection
              name={user.name as string}
              username={user.username as string}
            />
          </div>
        </SectionContainer>

        <SectionContainer id="contact-links" title="Contact links">
          <div className="mt-2.5">
            <ProfileLinksFormSection
              username={user.username as string}
              links={profile.links}
            />
          </div>
        </SectionContainer>

        <SectionContainer id="headline" title="Headline">
          <HeadlineFormSection
            username={params.username}
            headline={profile?.headline || ""}
          />
        </SectionContainer>

        <SectionContainer id="bio" title="Bio">
          <BioFormSection username={params.username} bio={profile?.bio || ""} />
        </SectionContainer>
      </div>
    </div>
  );
}

function SectionContainer({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="rounded-lg bg-muted p-5 space-y-2.5 ">
      <h4>{title}</h4>
      {children}
    </div>
  );
}
