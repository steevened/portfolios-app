import BackButton from "@/components/atoms/back-button";
import { getServerAuthSession } from "@/lib/auth";
import isMyProfile from "@/lib/helpers/is-my-profile";
import { getUserById } from "@/lib/services/user.service";
import { redirect } from "next/navigation";
import BioSection from "./_components/bio-section";
import ProfileImageSection from "./_components/profile-image-section";

export default async function Page({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const session = await getServerAuthSession();
  const user = await getUserById(params.userId);

  if (!session || !user) redirect("/");

  if (!isMyProfile(user.id)) redirect(`/user/${user.id}`);

  return (
    <div>
      <div className="text-center relative flex items-center justify-center w-full py-2.5 ">
        <div className="absolute left-0">
          <BackButton />
        </div>
        <div className="">
          <h3>Settings</h3>
        </div>
      </div>
      <main className="my-5 grid gap-5">
        <ProfileImageSection
          name={user.name || ""}
          image={user.image || ""}
          userId={user.id}
        />
        <BioSection />
      </main>
    </div>
  );
}
