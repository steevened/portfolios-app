import { getProjectUnpublished } from "@/lib/services/projects.service";
import { getAllTechnologies } from "@/lib/services/technologies.service";
import ProjectForm from "./components/project-form";

export default async function Page() {
  const technologies = await getAllTechnologies();

  const projectUnpublished = await getProjectUnpublished();

  return (
    <ProjectForm
      initialProject={projectUnpublished}
      technologies={technologies}
    />
  );
}
