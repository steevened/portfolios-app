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

  return <ProjectList projects={projects} />;
}
