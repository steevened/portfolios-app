import { Avatar } from "@/components/ui/avatar";
import UserAvatar from "@/components/user-avatar";
import { prisma } from "@/lib/db/prisma";
import ProjectUserSection from "./project-user-section";

async function getComments(projectId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        projectId,
      },
      include: {
        user: true,
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
          <ProjectUserSection user={c.user} updatedAt={c.updatedAt} />
          <p className="text-sm">{c.content}</p>
        </li>
      ))}
    </ul>
  );
}
