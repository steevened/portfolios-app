import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "../db/prisma";
import { getServerAuthSession } from "../auth";

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
      },
      orderBy: {
        updatedAt: "desc",
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

// export async function updateProject({
//   data,
//   id,
// }: {
//   data: z.infer<typeof projectSchema>;
//   id: string;
// }): Promise<{
//   message: string;
//   data: Project;
// }> {
//   noStore();
//   const res = await fetch(`/api/projects/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: data.name,
//       liveUrl: data.liveUrl,
//       githubUrl: data.githubUrl,
//       description: data.description,
//       technologies: technologiesSelected.map((t) => t.id),
//     }),
//   });

//   return res.json();
// }

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

export async function getProjectsByUserId(userId: string) {
  noStore();
  const res = await prisma.project.findMany({
    where: {
      authorId: userId,
    },
    include: {
      gallery: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  });
  return res;
}

export async function getProjectsByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return null;

    const projects = await prisma.project.findMany({
      where: {
        authorId: user.id,
      },
      include: {
        gallery: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    return projects;
  } catch (error) {
    throw new Error("Error getting projects from the database.");
  }
}
