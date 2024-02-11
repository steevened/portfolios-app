export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen-sm mx-auto flex flex-col">{children}</div>
  );
}
