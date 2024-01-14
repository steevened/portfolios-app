import { prisma } from "../db/prisma";

export const getProfileById = async (id: string) => {
  const profile = await prisma.profile.findUnique({
    where: {
      userId: id,
    },
    select: {
      id: true,
      bio: true,
      user: true,
    },
  });
  return profile;
};
