import ProfileHero from "../_components/profile-hero";

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
    <>
      <ProfileHero params={params} />
      {children}
    </>
  );
}
