import { getServerAuthSession } from "@/lib/auth";
import Stepper from "./_components/stepper";
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
    <div className="p-2.5">
      <Stepper />
      <main className=" mx-auto max-w-screen-md my-5 @container">
        <div className=" text-center">
          <h1 className="text-3xl font-semibold">Create a project</h1>
          <p> Click on the button below when you are ready.</p>

          <div className="my-5">{children}</div>
        </div>
      </main>
    </div>
  );
}
