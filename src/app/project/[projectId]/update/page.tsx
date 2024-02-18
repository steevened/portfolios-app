import { getLanguages } from "@/lib/services";
import { getProjectById } from "@/lib/services/projects.service";
import ProjectFormSection from "../../create/_components/project-form-section";

export default async function Page({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const project = await getProjectById(params.projectId);
  const languages = await getLanguages();

  return (
    <ProjectFormSection
      initialProject={project}
      languages={languages}
      action="update"
    />
  );
}
