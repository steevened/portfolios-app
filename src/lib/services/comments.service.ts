import { prisma } from "../db/prisma";

export async function getProjectComments(projectId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        projectId,
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
