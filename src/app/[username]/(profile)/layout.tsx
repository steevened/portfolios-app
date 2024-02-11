import { getDeveloperProfile } from "@/lib/services/developer.service";
import { getUserByUsername } from "@/lib/services/user.service";
import DeveloperTabs from "../_components/developer-tabs";
import ProfileHeader from "../_components/profile-header";
import NotFound from "./not-found";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    username: string;
  };
}) {
  const user = await getUserByUsername(String(params.username));

  const developer = await getDeveloperProfile({ username: params.username });

  if (!developer || !user) {
    return NotFound();
  }

  return (
    <main className="p-2.5">
      <div className="inner-layout space-y-5">
        <ProfileHeader user={user} developer={developer} />
        <div className="border-y sm:border  max-sm:px-1 p-1 sm:rounded-lg">
          <DeveloperTabs username={params.username} />
        </div>
        <div>{children}</div>
      </div>
    </main>
  );
}
