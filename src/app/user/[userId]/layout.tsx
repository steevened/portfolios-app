import ProfileHero from "./_components/profile-hero";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    userId: string;
  };
}) {
  return (
    <div className="max-w-screen-sm mx-auto min-h-screen">
      <ProfileHero params={params} />
      {children}
    </div>
  );
}
