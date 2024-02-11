import ProjectList from "@/components/atoms/projects-list";
import { getProjectsByUsername } from "@/lib/services/projects.service";
import NotFound from "./not-found";

export default async function Page({
  params,
}: {
  params: {
    username: string;
  };
}) {
  const projects = await getProjectsByUsername(params.username);
  if (!projects) return <NotFound />;

  if (projects?.length === 0)
    return (
      <div className="text-center">{params.username} has no projects yet.</div>
    );

  return (
    <div className="my-5">
      <ProjectList projects={projects} />
    </div>
  );
}
