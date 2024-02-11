import { prisma } from "@/lib/db/prisma";
import { getUserByUsername } from "@/lib/services/user.service";
import ProfileHeader from "./_components/profile-header";
import NotFound from "./not-found";
import DeveloperTabs from "./_components/developer-tabs";

async function upsertProfile(userId: string) {
  if (!userId) return null;
  const profile = await prisma.developer.upsert({
    where: {
      userId,
    },
    update: {},
    create: {
      userId,
    },
  });
  return profile;
}

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

  if (!user) {
    return NotFound();
  }

  const developer = await upsertProfile(user.id);

  if (!developer) {
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
