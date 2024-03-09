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
      select: {
        projects: true,
      },
    });
    return bookmarks;
  } catch (error) {
    throw error;
  }
}
