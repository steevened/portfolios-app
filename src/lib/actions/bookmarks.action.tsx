"use server";

import { getServerAuthSession } from "../auth";
import { prisma } from "../db/prisma";
import { getMyBookmarks, getProjectById } from "../services";

export async function toggleProjectToBookmark({
  projectID,
}: {
  projectID: string;
}) {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    return null;
  }

  const myBookmarksStore = await getMyBookmarks();

  try {
    const project = await getProjectById(projectID);
    if (!project) {
      throw new Error("Project not found");
    }

    const isBookmarked = myBookmarksStore?.projects.some(
      (p) => p.projectId === project.id
    );

    await prisma.project.update({
      where: {
        id: project.id,
        authorId: session.user.id,
      },
      data: {
        bookmarks: {
          [isBookmarked ? "disconnect" : "connect"]: {
            userId: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}
