import ErrorMessage from "@/components/atoms/error-message";
import isUserAuthProfile from "@/lib/helpers/is-user-auth-profile";
import { getProfileByUserId } from "@/lib/services/profile.service";
import BioForm from "../_components/bio.form";
import BioModal from "../_components/bio.modal";
import BioSection from "../_components/bio-section";
import { updateBio } from "@/lib/actions/user.actions";

export default async function About({
  params,
}: {
  params: { userId: string };
}) {
  const profile = await getProfileByUserId(params.userId);

  if (!profile) {
    return <ErrorMessage />;
  }

  return (
    <div className="my-5 mx-2.5 sm:mx-0">
      {(await isUserAuthProfile(profile.userId)) ? (
        <>
          {!profile.bio ? (
            <BioSection action={updateBio} isMyProfile type="create" />
          ) : (
            <BioSection
              action={updateBio}
              isMyProfile
              type="update"
              bio={profile.bio}
            />
          )}
        </>
      ) : (
        <>
          {profile.bio ? (
            <BioSection isMyProfile={false} bio={profile.bio} />
          ) : (
            <div className="border p-2.5 rounded-lg">
              <h3 className="text-muted-foreground text-lg">Bio</h3>
              <p>{"There's nothing here yet."}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// function BioSection({
//   bio,
//   isMyProfile = false,
//   type,
// }: {
//   bio: string;
//   isMyProfile?: boolean;
//   type: "create" | "update";
// }) {
//   return (
//     <div className="border p-2.5 rounded-lg grid gap-1.5">
//       <div className="flex items-center justify-between">
//         <h3 className="text-muted-foreground text-lg">Bio</h3>
//         {isMyProfile ? <BioModal type={type} /> : null}
//       </div>
//       <p className="text-sm">{bio}</p>
//     </div>
//   );
// }
