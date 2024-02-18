import { getLanguages } from "@/lib/services/languages.service";
import ProjectFormSection from "./_components/project-form-section";
import { getProjectUnpublished } from "@/lib/services";

export default async function Page() {
  const projectUnpublished = await getProjectUnpublished();
  const languages = await getLanguages();

  return (
    <ProjectFormSection
      action="create"
      languages={languages}
      initialProject={projectUnpublished}
    />
  );
}
