import TechnologiesGroup from "@/components/technologies-group";

export default function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  return (
    <div>
      <div className="fixed">
        <TechnologiesGroup searchParams={searchParams} />
      </div>
      <div className=""></div>
    </div>
  );
}
