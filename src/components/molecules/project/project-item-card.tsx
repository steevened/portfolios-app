import ProjectDropDown from "@/components/project-dropdown";
import { Badge } from "@/components/ui/badge";
import { isMyProfile } from "@/lib/helpers";
import { isProjectBookmarked } from "@/lib/services";
import {
  getAllProjects,
  isProjectLiked,
} from "@/lib/services/projects.service";
import Link from "next/link";
import CommentSection from "./comment-section";
import ProjectGallery from "./project-gallery";
import ProjectUserSection from "./project-user-section";
import ToggleCommentView from "./toggle-comment-view";
import ToggleLike from "./toggle-like";
import ToggleProjectBookmarks from "./toggle-project-bookmarks";
import CreateCommentSection from "./create-comment-section";
import CommentList from "./comment-list";

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
          <div className="flex gap-10 items-center text-muted-foreground">
            <div className="flex gap-1 items-center ">
              <ToggleLike
                projectId={project.id}
                isLiked={await isProjectLiked(project.id)}
              />
              <small aria-label="Likes" title="Likes">
                {project._count.likes}
              </small>
            </div>

            <div className="flex gap-1 items-center ">
              <ToggleCommentView projectId={project.id} hasMyComment={true} />
              <small aria-label="Comments" title="Comments">
                {project._count.comments}
              </small>
            </div>
            <ToggleProjectBookmarks
              isBookmarked={await isProjectBookmarked(project.id)}
              projectId={project.id}
            />
          </div>
          <div>
            <CommentSection projectId={project.id}>
              <div>
                <CreateCommentSection projectId={project.id} />
              </div>
              <CommentList projectId={project.id} />
            </CommentSection>
          </div>
        </div>
      </div>
    </div>
  );
}
``;
