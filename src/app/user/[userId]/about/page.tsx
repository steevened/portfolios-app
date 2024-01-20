import ErrorMessage from "@/components/atoms/error-message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/db/prisma";
import isUserAuthProfile from "@/lib/helpers/is-user-auth-profile";
import { revalidatePath } from "next/cache";

const getProfileByUserId = async (userId: string) => {
  const data = await prisma.profile.findUnique({
    where: {
      userId,
    },
  });

  return data;
};

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
    <div className="my-5 px-2.5">
      {(await isUserAuthProfile(profile.userId)) ? (
        <div>
          {!profile.bio ? (
            <form
              action={async (formData) => {
                "use server";
                const bio = formData.get("bio") as string;
                await prisma.profile.update({
                  where: {
                    userId: profile.userId,
                  },
                  data: {
                    bio,
                  },
                });
                revalidatePath(`/user/${profile.userId}/about`);
              }}
            >
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
            <p>{profile.bio}</p>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
