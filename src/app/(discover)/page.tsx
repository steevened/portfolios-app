import TechnologiesGroup from "@/components/technologies-group";
import { getAllProjects } from "@/lib/services/projects.service";
import ProjectItemCard from "./components/project-item-card";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const projects = await getAllProjects({ searchParams });

  return (
    <div className="space-y-2.5">
      <div className="">
        <TechnologiesGroup searchParams={searchParams} />
      </div>
      <div className="min-h-screen mx-auto max-w-screen-sm ">
        <ul className="space-y-5">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectItemCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
