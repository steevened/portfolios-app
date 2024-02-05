export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    username: string;
  };
}) {
  // const user = await getUserByUsername(String(params.username));

  // if (!user) {
  //   return NotFound();
  // }

  // const developer = await prisma.developer.findUnique({
  //   where: {
  //     userId: user.id,
  //   },
  // });

  return (
    <main className="p-2.5">
      <div className="inner-layout">
        <div className="flex gap-2.5 py-5 max-sm:px-2.5">
          {/* <UserImage
            imageUrl={(user.image as string) || undefined}
            name={user.name || ""}
          /> */}
          <div className=" w-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg first-letter:uppercase">
                  {/* {user.name} */}
                </p>
                {/* {(await isMyProfile(user.id)) ? (
                  <Link href={`/${user.username}/settings`}>
                    <EditButton />
                  </Link>
                ) : null} */}
              </div>
              {/* <ProfileRoles profileId={profile.id} /> */}
            </div>
            {/* <ProfileLinks profileId={profile.id} /> */}
          </div>
        </div>
        <div className="border-y sm:border  max-sm:px-1 p-1 sm:rounded-lg">
          {/* <ProfileTabs sessionId={session?.user.id} userId={user.id} /> */}
        </div>
      </div>
      <div>{children}</div>
    </main>
  );
}
