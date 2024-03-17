import { getServerAuthSession } from "../auth";
import { prisma } from "../db/prisma";

export async function getMyBookmarks() {
  try {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
      return null;
    }
    const bookmarks = await prisma.bookmarks.upsert({
      where: {
        userId: session.user.id,
      },
      update: {},
      create: {
        userId: session.user.id,
      },
      include: {
        projects: {
          include: {
            project: {
              include: {
                languages: {
                  include: {
                    language: true,
                  },
                },

                gallery: {
                  select: {
                    id: true,
                    url: true,
                  },
                },
                author: true,
              },
            },
          },
        },
      },
    });
    return bookmarks;
  } catch (error) {
    throw error;
  }
}

export async function isProjectBookmarked(projectId: string): Promise<boolean> {
  try {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
      return false;
    }
    const bookmarks = await getMyBookmarks();
    if (!bookmarks) {
      return false;
    }
    const isBookmarked = bookmarks.projects.some(
      (p) => p.projectId === projectId
    );
    return isBookmarked;
  } catch (error) {
    throw error;
  }
}
