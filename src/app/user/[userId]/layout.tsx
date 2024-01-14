import { getUserById } from "@/lib/services/user.service";
import ProfileHero from "./_components/profile-hero";
import { getServerAuthSession } from "@/lib/auth";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    userId: string;
  };
}) {
  const user = await getUserById(params.userId);
  const session = await getServerAuthSession();
  return (
    <div className="max-w-screen-sm mx-auto  min-h-screen">
      <ProfileHero user={user} sessionId={session?.user.id} />
      {children}
    </div>
  );
}
