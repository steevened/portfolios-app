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
    <main className="py-2.5">
      <div className="space-y-2.5">
        <ProfileHeader user={user} developer={developer} />
        <DeveloperTabs username={params.username} />
        <div>{children}</div>
      </div>
    </main>
  );
}
