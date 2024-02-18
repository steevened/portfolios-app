import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin?");
  }
  return (
    <div className=" text-center">
      <h1 className="text-3xl font-semibold">Create a project</h1>
      <p> Click on the button below to upload your project.</p>

      <div className="my-5">{children}</div>
    </div>
  );
}
