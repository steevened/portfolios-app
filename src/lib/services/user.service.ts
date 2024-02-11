import { prisma } from "../db/prisma";

export const getUserById = async (id: string) => {
  if (!id) throw new Error("User id is required");
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      // select: {
      //   id: true,
      //   name: true,
      //   image: true,
      //   role: true,
      //   username: true,
      //   developer: {
      //     select: {
      //       id: true,
      //     },
      //   },
      // },
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
