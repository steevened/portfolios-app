import FiltersContainer from "./_components/filters-container";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" py-2.5">
      <div className="fixed right-5 bottom-20 md:bottom-5 ">
        <FiltersContainer />
      </div>
      <main>{children}</main>
    </div>
  );
}
