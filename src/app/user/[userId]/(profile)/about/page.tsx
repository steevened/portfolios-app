import ErrorMessage from "@/components/atoms/error-message";
// import { updateBio } from "@/lib/actions/user.actions";
import isUserAuthProfile from "@/lib/helpers/is-my-profile";
// import { getProfileByUserId } from "@/lib/services/developer.service";
import BioSection from "../../_components/bio-section";

export default async function About({
  params,
}: {
  params: { userId: string };
}) {
  // const profile = await getProfileByUserId(params.userId);

  // if (!profile) {
  //   return <ErrorMessage />;
  // }

  return (
    <div className="my-5 mx-2.5 sm:mx-0">
      {/* {(await isUserAuthProfile(profile.userId)) ? (
        <>
          {!profile.bio ? (
            <BioSection isMyProfile type="create" />
          ) : (
            <BioSection isMyProfile type="update" bio={profile.bio} />
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
      )} */}
    </div>
  );
}
