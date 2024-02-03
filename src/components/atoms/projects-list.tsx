import ProjectItemCard from "@/app/feed/_components/project-item-card";
import { getAllProjects } from "@/lib/services/projects.service";

export default function ProjectList({
  projects,
}: {
  projects: Awaited<ReturnType<typeof getAllProjects>>;
}) {
  return (
    <ul className="flex flex-col gap-5">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectItemCard project={project} />
        </li>
      ))}
    </ul>
  );
}
