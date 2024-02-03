import ProjectList from "@/components/atoms/projects-list";
import TechnologiesGroup from "@/components/technologies-group";
import { getAllProjects } from "@/lib/services/projects.service";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const projects = await getAllProjects({ searchParams });

  return (
    <div className="space-y-2.5 max-sm:py-2.5">
      <div className="max-sm:px-2.5">
        <TechnologiesGroup searchParams={searchParams} />
      </div>
      <div className="min-h-screen mx-auto max-w-screen-sm flex flex-col">
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
