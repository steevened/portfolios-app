export default function ImageCardContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-2 border-dashed aspect-video rounded-lg w-full relative group transition-colors overflow-hidden">
      {children}
    </div>
  );
}
