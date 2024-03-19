import { prisma } from "@/lib/db/prisma";
import ProjectUserSection from "./project-user-section";
import CommentMenu from "./comment-menu";

async function getComments(projectId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        projectId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return comments;
  } catch (error) {
    throw error;
  }
}

export default async function CommentList({
  projectId,
}: {
  projectId: string;
}) {
  const comments = await getComments(projectId);
  return (
    <ul className="grid gap-2.5 py-2.5">
      {comments.map((c) => (
        <li
          key={c.createdAt.toISOString()}
          className="bg-muted p-2.5 rounded-lg flex flex-col gap-2.5"
        >
          <div className="flex items-center justify-between">
            <ProjectUserSection user={c.user} updatedAt={c.updatedAt} />
            <CommentMenu commentId={c.id} />
          </div>
          <p className="text-sm">{c.content}</p>
        </li>
      ))}
    </ul>
  );
}
