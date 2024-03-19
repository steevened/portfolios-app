import ProjectList from "@/components/atoms/projects-list";
import { getProjectsByUsername } from "@/lib/services/projects.service";
import NotFound from "./not-found";
import { getUserByUsername } from "@/lib/services/user.service";
import { isMyProfile } from "@/lib/helpers";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Page({
  params,
}: {
  params: {
    username: string;
  };
}) {
  const user = await getUserByUsername(params.username);
  if (!user) return <NotFound />;

  const projects = await getProjectsByUsername(params.username);
  if (!projects) return <NotFound />;

  if (projects?.length === 0)
    return (await isMyProfile(user.id)) ? (
      <div className="flex justify-center my-10">
        <Link className={buttonVariants({})} href="/project/create">
          Publish your first project
        </Link>
      </div>
    ) : (
      <div className="text-center my-10">
        {params.username} has no projects yet.
      </div>
    );

  return (
    <div className="my-5">
      <ProjectList projects={projects} />
    </div>
  );
}
