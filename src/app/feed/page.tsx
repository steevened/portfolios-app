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
    <div className="">
      <div className="">
        <TechnologiesGroup searchParams={searchParams} />
      </div>
      <div className="mx-auto max-w-screen-sm flex flex-col">
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
