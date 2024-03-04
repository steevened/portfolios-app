export function generateMetadata({
  params,
}: {
  params: {
    username: string;
  };
}) {
  return {
    title: `${params.username} | The Showcase`,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="inner-layout  w-full">{children}</div>;
}
