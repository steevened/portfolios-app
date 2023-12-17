import { getProjectById } from "@/lib/services/projects.service";

const UpdateProject = async ({ projectId }: { projectId: string }) => {
  const project = await getProjectById(projectId);

  return (
    <div>
      <h1>Update Project</h1>
    </div>
  );
};

export default UpdateProject;
