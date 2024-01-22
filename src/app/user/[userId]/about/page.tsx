import ErrorMessage from "@/components/atoms/error-message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateBio } from "@/lib/actions/user.actions";
import isUserAuthProfile from "@/lib/helpers/is-user-auth-profile";
import { getProfileByUserId } from "@/lib/services/profile.service";

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
            <form action={updateBio}>
              <div className="grid gap-5">
                <div className="grid gap-1.5">
                  <label htmlFor="bio" className=" block text-muted-foreground">
                    <h3>Bio</h3>
                  </label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={5}
                    placeholder="Tell us about yourself, your experience, interests, hobbies, skills, etc."
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save</Button>
                </div>
              </div>
            </form>
          ) : (
            <Bio bio={profile.bio} />
          )}
        </>
      ) : (
        <>
          {profile.bio ? (
            <Bio bio={profile.bio} />
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

function Bio({ bio }: { bio: string }) {
  return (
    <div className="border p-2.5 rounded-lg grid gap-1.5">
      <h3 className="text-muted-foreground text-lg">Bio</h3>
      <p className="text-sm">{bio}</p>
    </div>
  );
}
