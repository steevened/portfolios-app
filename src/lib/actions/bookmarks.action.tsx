"use server";

import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "../auth";
import { prisma } from "../db/prisma";
import {
  getMyBookmarks,
  getProjectById,
  isProjectBookmarked,
} from "../services";

export async function toggleProjectToBookmark({
  projectId,
}: {
  projectId: string;
}) {
  try {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    const myBookmarksStore = await getMyBookmarks();

    if (!myBookmarksStore) {
      throw new Error("Bookmarks not found");
    }
    const project = await getProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const isBookmarked = await isProjectBookmarked(projectId);

    await prisma.bookmarks.update({
      where: {
        userId: session.user.id,
      },

      data: {
        projects: isBookmarked
          ? {
              delete: {
                projectId_bookmarkId: {
                  projectId: project.id,
                  bookmarkId: myBookmarksStore.id,
                },
              },
            }
          : {
              create: {
                projectId: project.id,
              },
            },
      },
    });
    revalidatePath("/");
  } catch (error) {
    throw error;
  }
}
