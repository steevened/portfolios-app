import GalleryForm from "@/app/project/_components/gallery-form";
import { getProjectById } from "@/lib/services";

export default async function Page({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const project = await getProjectById(params.projectId);
  return (
    <GalleryForm
      projectId={params.projectId}
      action="update"
      project={project}
    />
  );
}
