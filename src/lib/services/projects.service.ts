import { getServerAuthSession } from "../auth";
import { prisma } from "../db/prisma";
import { getUserByUsername } from "./user.service";

export async function getAllProjects({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const { languages: languagesParams } = searchParams;

  const languages = languagesParams ? languagesParams.split("_") : undefined;

  try {
    const projects = await prisma.project.findMany({
      where: {
        published: true,
        isOnDraft: false,
        languages: {
          some: {
            language: {
              slug: {
                in: languages,
              },
            },
          },
        },
      },
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
      orderBy: {
        createdAt: "desc",
      },
    });
    return projects;
  } catch (error) {
    throw new Error("Error getting projects from the database.");
  }
}

export async function getProjectUnpublished() {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  try {
    const project = await prisma.project.findFirst({
      where: {
        published: false,
        authorId: session.user.id,
      },

      include: {
        languages: {
          include: {
            language: true,
          },
        },
      },
    });
    return project;
  } catch (error) {
    throw error;
  }
}

export async function getProjectById(projectId: string) {
  try {
    const res = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
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
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function getProjectsByUsername(username: string) {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      throw new Error("User not found");
    }

    const projects = await prisma.project.findMany({
      where: {
        authorId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        gallery: {
          select: {
            id: true,
            url: true,
          },
        },
        languages: {
          include: {
            language: true,
          },
        },

        author: true,
      },
    });

    return projects;
  } catch (error) {
    throw new Error("Error getting projects from the database.");
  }
}
