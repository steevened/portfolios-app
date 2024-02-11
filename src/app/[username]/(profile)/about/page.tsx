import NotFoundSection from "@/components/atoms/not-found-section";
import isMyProfile from "@/lib/helpers/is-my-profile";
import { getDeveloperProfile } from "@/lib/services/developer.service";
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
      {(await isMyProfile(developer.userId)) ? (
        <div>
          <p>{"You're viewing your own profile."}</p>
        </div>
      ) : (
        <div>
          <p>{"You're viewing someone else's profile."}</p>
        </div>
      )}
    </div>
  );
}
