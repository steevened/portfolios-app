import { getProjectUnpublished } from "@/lib/services/projects.service";
import ProjectFormProvider from "../components/project-form-provider";

export default async function Page() {
  const projectUnpublished = await getProjectUnpublished();

  return (
    <ProjectFormProvider origin="create" initialProject={projectUnpublished} />
  );
}
