import ProjectDropDown from "@/components/project-dropdown";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import isMyProfile from "@/lib/helpers/is-my-profile";
import {
  getAllProjects,
  isProjectLiked,
} from "@/lib/services/projects.service";
import ProjectGallery from "./project-gallery";
import ProjectUserSection from "./project-user-section";
import ToggleProjectBookmarks from "./toggle-project-bookmarks";
import { isProjectBookmarked } from "@/lib/services";
import ToggleLike from "./toggle-like";
import Link from "next/link";

export default async function ProjectItemCard({
  project,
}: {
  project: Awaited<ReturnType<typeof getAllProjects>>[0];
}) {
  return (
    <div className="sm:rounded-lg bg-card  space-y-2.5 border-y sm:border  transition-colors">
      <div className="p-2.5 space-y-2.5 ">
        <div className=" flex items-start justify-between">
          <ProjectUserSection
            user={project.author}
            updatedAt={project.updatedAt}
          />
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col items-end text-xs text-muted-foreground">
              {project.liveUrl ? (
                <Link target="_blank" href={project.liveUrl}>
                  <small className="hover:underline underline-offset-2 hover:text-primary">
                    Live url
                  </small>
                </Link>
              ) : null}
              {project.githubUrl ? (
                <Link target="_blank" href={project.githubUrl}>
                  <small className="hover:underline underline-offset-2 hover:text-primary">
                    Github url
                  </small>
                </Link>
              ) : null}
            </div>
            {(await isMyProfile(project.authorId)) ? (
              <ProjectDropDown projectId={project.id} />
            ) : null}
          </div>
        </div>
        <div className="">
          <h6 className="font-medium">{project.name}</h6>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
      </div>
      {project.gallery.length > 0 ? (
        <ProjectGallery gallery={project.gallery} />
      ) : null}
      <div className="p-2.5 space-y-5">
        <div className="grid gap-2.5">
          <div className="flex flex-wrap gap-1">
            {project.languages.length > 0 ? (
              <>
                {project.languages.map((l) => (
                  <Badge
                    key={l.language.id}
                    variant="secondary"
                    className="!bg-foreground/10 font-medium"
                  >
                    {l.language.name}
                  </Badge>
                ))}
              </>
            ) : null}
          </div>
          <div className="flex gap-5 items-center text-muted-foreground">
            <div className="flex gap-1 items-center ">
              <ToggleLike
                projectId={project.id}
                isLiked={await isProjectLiked(project.id)}
              />
              <small aria-label="Likes" title="Likes">
                {project._count.likes}
              </small>
            </div>
            <ToggleProjectBookmarks
              isBookmarked={await isProjectBookmarked(project.id)}
              projectId={project.id}
            />

            <div className="flex gap-1 items-center ">
              {1 + 1 === 2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176m432 304c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1c28.8-30.3 46-68.6 46-110.4c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8v.6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.7 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5.4-.9.7-1.1.8l-.2.2C1 327.2-1.4 334.4.8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352m240-176c0 112.3-99.1 196.9-216.5 207c24.3 74.4 104.9 129 200.5 129c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1.6 10.3.6 15.5z"
                  ></path>
                </svg>
              )}
              <small aria-label="Comments" title="Comments">
                2
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
``;
