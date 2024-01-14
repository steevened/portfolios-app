import { getProjectById } from "@/lib/services/projects.service";
import ProjectFormProvider from "../../components/project-form-provider";

export default async function Page({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const projectById = await getProjectById(params.projectId);

  return <ProjectFormProvider origin="update" initialProject={projectById} />;
}
