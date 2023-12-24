import {
  getProjectById,
  getProjectUnpublished,
} from "@/lib/services/projects.service";
import { getAllTechnologies } from "@/lib/services/technologies.service";
import { Technology } from "@prisma/client";
import ProjectForm from "../create/components/project-form";

type Props = {
  origin: "create" | "update";
  initialProject?: Awaited<
    ReturnType<typeof getProjectUnpublished | typeof getProjectById>
  >;
};

export default async function ProjectFormProvider({
  origin,
  initialProject,
}: Props) {
  const technologies = await getAllTechnologies();

  const ProjectCases = {
    create: () => {
      return (
        <CreateProjectForm
          technologies={technologies}
          projectUnpublished={
            initialProject as Awaited<ReturnType<typeof getProjectUnpublished>>
          }
        />
      );
    },
    update: () => {
      return (
        <UpdateProjectForm
          project={initialProject as Awaited<ReturnType<typeof getProjectById>>}
          technologies={technologies}
        />
      );
    },
  };

  return <div>{ProjectCases[origin]()}</div>;
}

const CreateProjectForm = ({
  technologies,
  projectUnpublished,
}: {
  technologies: Technology[];
  projectUnpublished: Awaited<ReturnType<typeof getProjectUnpublished>>;
}) => {
  return (
    <ProjectForm
      technologies={technologies}
      initialProject={projectUnpublished}
      origin="create"
    />
  );
};

const UpdateProjectForm = ({
  project,
  technologies,
}: {
  project: Awaited<ReturnType<typeof getProjectById>>;
  technologies: Technology[];
}) => {
  return (
    <ProjectForm
      technologies={technologies}
      initialProject={project}
      origin="update"
    />
  );
};
