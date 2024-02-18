import ProjectList from "@/components/atoms/projects-list";
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
    <div className="mx-auto max-w-screen-sm flex flex-col">
      <ProjectList projects={projects} />
    </div>
  );
}
