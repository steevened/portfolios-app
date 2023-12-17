import { createProject, getProjectById } from "@/lib/services/projects.service";
import ProjectDetailsForm from "../app/(project)/create/components/project-details-form";
import { projectSchema } from "@/lib/schemas/project.schema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Technology } from "@prisma/client";
import { useToast } from "./ui/use-toast";

type Update = {
  type: "update";
  initialProject: Awaited<ReturnType<typeof getProjectById>>;
};

type Upload = {
  type: "upload";
};

type Props = (Update | Upload) & {
  technologies: Technology[];
};

const ProjectDetailsFormProvider = ({ type, technologies }: Props) => {
  const projectCases: {
    update: () => JSX.Element;
    upload: () => JSX.Element;
  } = {
    update: () => {
      return <div>update, is published?</div>;
    },
    upload: () => {
      return <UploadProjectForm technologies={technologies} />;
    },
  };

  return <div>{projectCases[type]()}</div>;
};

const UploadProjectForm = ({
  technologies,
}: {
  technologies: Technology[];
}) => {
  const router = useRouter();

  const { toast } = useToast();

  async function onSubmit({
    data,
    technologiesSelected,
  }: {
    data: z.infer<typeof projectSchema>;
    technologiesSelected: Technology[];
  }) {
    if (technologiesSelected.length <= 0) {
      return toast({
        variant: "destructive",
        title: "Wait!",
        description: "You must select at least one technology.",
      });
    }

    try {
      const res = await createProject({ data, technologiesSelected });
      if (res.status !== 201) return;
      router.refresh();
      // onContinue();
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  return <ProjectDetailsForm onSubmit={onSubmit} technologies={technologies} />;
};

export default ProjectDetailsFormProvider;
