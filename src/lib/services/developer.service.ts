import { prisma } from "../db/prisma";
import { getUserByUsername } from "./user.service";

export async function getDeveloperProfile({ username }: { username: string }) {
  try {
    const user = await getUserByUsername(username);
    if (!user) return null;

    const developer = await prisma.developer.upsert({
      where: {
        userId: user.id,
      },
      update: {},
      create: {
        userId: user.id,
        links: {
          create: {
            github: `https://github.com/${user.username}`,
          },
        },
      },
      include: {
        links: {
          select: {
            github: true,
            twitter: true,
            linkedin: true,
            website: true,
          },
        },
      },
    });
    return developer;
  } catch (error) {
    throw new Error(error as string);
  }
}

export default async function getDeveloperLinks(developerId: string) {
  const data = await prisma.developerLinks.findUnique({
    where: {
      developerId,
    },
  });
  return data;
}
