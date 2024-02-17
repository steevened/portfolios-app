import { Project, Technology } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";
import { getServerAuthSession } from "../auth";
import { prisma } from "../db/prisma";
import { projectSchema } from "../schemas/project.schema";

export async function getAllProjects({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const { tech } = searchParams;

  const technologies = tech ? tech.split("_") : undefined;

  try {
    noStore();
    const projects = await prisma.project.findMany({
      where: {
        published: true,
        isOnDraft: false,
        technologies: {
          some: {
            technology: {
              slug: {
                in: technologies,
              },
            },
          },
        },
      },
      include: {
        technologies: {
          include: {
            technology: true,
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
  if (!session?.user?.id) return null;

  // noStore();
  const project = await prisma.project.findFirst({
    where: {
      published: false,
      AND: {
        authorId: session?.user?.id,
      },
    },

    include: {
      technologies: {
        include: {
          technology: true,
        },
      },
    },
  });
  return project;
}

export async function updateProject({
  data,
  technologiesSelected,
  id,
}: {
  data: z.infer<typeof projectSchema>;
  technologiesSelected: Technology[];
  id: string;
}): Promise<{
  message: string;
  data: Project;
}> {
  noStore();
  const res = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      description: data.description,
      technologies: technologiesSelected.map((t) => t.id),
    }),
  });

  return res.json();
}

export async function upsertProject({
  data,
  technologiesSelected,
}: {
  data: {
    id?: string;
  } & z.infer<typeof projectSchema>;
  technologiesSelected: Technology[];
}) {
  noStore();
  try {
    const res = await fetch(`/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        technologies: technologiesSelected.map((t) => t.id),
      }),
      next: {
        tags: ["project"],
      },
    });
    return res.json();
  } catch (error) {
    return { error };
  }
}

export async function getProjectById(projectId: string) {
  noStore();
  const res = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      technologies: {
        include: {
          technology: true,
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
}

export async function getProjectsByUserId(userId: string) {
  noStore();
  const res = await prisma.project.findMany({
    where: {
      authorId: userId,
    },
    include: {
      technologies: {
        include: {
          technology: true,
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
        technologies: {
          include: {
            technology: true,
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

    return projects;
  } catch (error) {
    throw new Error("Error getting projects from the database.");
  }
}
