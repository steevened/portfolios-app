import TechnologiesGroup from "@/components/technologies-group";

export default async function Layout({
  searchParams,
  children,
}: {
  searchParams: {
    [key: string]: string;
  };
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5 max-sm:py-2.5">
      <div className="max-sm:px-2.5">
        <TechnologiesGroup searchParams={searchParams} />
      </div>
      <div className="min-h-screen mx-auto max-w-screen-sm flex flex-col">
        {children}
      </div>
    </div>
  );
}
