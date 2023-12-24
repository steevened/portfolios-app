import { getProjectById } from "@/lib/services/projects.service";
import ProjectForm from "../../create/components/project-form";
import { getAllTechnologies } from "@/lib/services/technologies.service";

export default async function Page({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const projectById = await getProjectById(params.projectId);

  const technologies = await getAllTechnologies();

  return (
    <ProjectForm technologies={technologies} initialProject={projectById} />
  );
}
