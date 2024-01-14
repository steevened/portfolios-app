import ProjectList from "@/components/atoms/projects-list";
import { getProjectsByUserId } from "@/lib/services/projects.service";

export default async function Page({ params }: { params: { userId: string } }) {
  const projects = await getProjectsByUserId(params.userId);
  return (
    <div className="my-5">
      <ProjectList projects={projects} />
    </div>
  );
}
