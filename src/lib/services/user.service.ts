import { prisma } from "../db/prisma";

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      profile: true,
    },
  });
  return user;
};
