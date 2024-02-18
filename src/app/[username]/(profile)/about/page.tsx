import NotFoundSection from "@/components/atoms/not-found-section";
import isMyProfile from "@/lib/helpers/is-my-profile";
import { getDeveloperProfile } from "@/lib/services/developer.service";
import BioSection from "./_components/bio-section";
export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const developer = await getDeveloperProfile({
    username: params.username,
  });

  if (!developer) {
    return <NotFoundSection />;
  }

  return (
    <div>
      <BioSection
        bio={developer.bio || ""}
        isMyProfile={await isMyProfile(developer.userId)}
        username={params.username}
      />
    </div>
  );
}
