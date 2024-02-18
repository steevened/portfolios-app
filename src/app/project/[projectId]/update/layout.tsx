export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" text-center">
      <h1 className="text-3xl font-semibold">Update project</h1>
      <p> Click on the button below to update your project.</p>

      <div className="my-5">{children}</div>
    </div>
  );
}
