import ProjectDropDown from "@/components/project-dropdown";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getServerAuthSession } from "@/lib/auth";
import { getAllProjects } from "@/lib/services/projects.service";
import Image from "next/image";
import UserCard from "./user-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProjectGallery from "./project-gallery";

export default async function ProjectItemCard({
  project,
}: {
  project: Awaited<ReturnType<typeof getAllProjects>>[0];
}) {
  const user = await getServerAuthSession();

  return (
    <div className="rounded-lg bg-card  space-y-2.5 border hover:bg-muted transition-colors">
      <div className="p-2.5 space-y-2.5 ">
        <div className=" flex items-start justify-between">
          <UserCard userId={project.authorId} updatedAt={project.updatedAt} />
          {user?.user.id === project.authorId ? (
            <ProjectDropDown projectId={project.id} />
          ) : null}
        </div>
        <div className="">
          <h5 className="">{project.name}</h5>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
      </div>
      {project.gallery.length > 0 ? (
        <ProjectGallery gallery={project.gallery} />
      ) : null}
      <div className="px-2.5 space-y-5">
        <ul className="space-x-1">
          {project.liveUrl ? (
            <a
              rel="noopener noreferrer"
              className={buttonVariants({
                size: "sm",
                className: "",
              })}
              href={project.liveUrl}
              target="_blank"
            >
              Live url
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              rel="noopener noreferrer"
              className={buttonVariants({
                size: "sm",
                className: "",
              })}
              target="_blank"
              href={project.githubUrl}
            >
              GitHub url
            </a>
          ) : null}
        </ul>
        <div className=" pb-2.5 flex flex-wrap gap-1">
          {project.technologies.length > 0 ? (
            <>
              {project.technologies.map((t) => (
                <Badge
                  key={t.technology.id}
                  variant="secondary"
                  className="!bg-foreground/10 font-medium"
                >
                  {t.technology.name}
                </Badge>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
