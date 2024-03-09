import { getServerAuthSession } from "../auth";
import { prisma } from "../db/prisma";

export async function getMyBookmarks() {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    return null;
  }
  try {
    const bookmarks = await prisma.bookmarks.upsert({
      where: {
        userId: session.user.id,
      },
      update: {},
      create: {
        userId: session.user.id,
      },
    });
    return bookmarks;
  } catch (error) {
    throw error;
  }
}
