import { Project, Technology } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";
import { prisma } from "../db/prisma";
import { projectSchema } from "../schemas/project.schema";
import { getServerAuthSession } from "../auth";

export async function getAllProjects({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const { tech } = searchParams;

  const technologies = tech ? tech.split("_") : undefined;

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
}

export async function getProjectUnpublished() {
  const session = await getServerAuthSession();
  if (!session?.user?.id) return null;

  noStore();
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
