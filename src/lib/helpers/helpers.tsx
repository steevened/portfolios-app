import { prisma } from "../db/prisma";
import { getUserAuth } from "../services";

export async function isMyProfile(userId: string): Promise<boolean> {
  const userAuth = await getUserAuth();
  if (!userAuth || userAuth.id !== userId) return false;
  return true;
}

export async function isMyComment(commentId: string): Promise<boolean> {
  const userAuth = await getUserAuth();

  if (!userAuth) return false;

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  if (!comment) return false;

  if (comment.userId !== userAuth.id) return false;

  return true;
}
