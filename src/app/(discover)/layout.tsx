import TechnologiesGroup from "@/components/technologies-group";

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <main>{children}</main>
    </div>
  );
}
