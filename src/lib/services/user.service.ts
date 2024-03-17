import { getServerAuthSession } from "../auth";
import { prisma } from "../db/prisma";

export const getUserById = async (id: string) => {
  if (!id) throw new Error("User id is required");
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(error as string);
  }
};

export async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getUserAuth() {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return null;
    }
    const user = await getUserById(session.user.id);
    return user;
  } catch (error) {
    throw error;
  }
}
