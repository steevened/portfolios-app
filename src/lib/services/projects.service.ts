import { z } from "zod";
import { prisma } from "../db/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { projectSchema } from "../schemas/project.schema";
import { Technology } from "@prisma/client";

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

export async function getProjectOnDraft() {
  noStore();
  const project = await prisma.project.findFirst({
    where: {
      published: false,
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

export async function getProjectUnpublished() {
  noStore();

  const project = await prisma.project.findFirst({
    where: {
      published: false,
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

export async function createProject({
  data,
  technologiesSelected,
}: {
  data: z.infer<typeof projectSchema>;
  technologiesSelected: Technology[];
}) {
  const res = await fetch("/api/projects", {
    method: "POST",
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
    next: {
      tags: ["projects"],
    },
  });

  return res;
}

export async function updateProject({
  data,
  technologiesSelected,
  id,
}: {
  data: z.infer<typeof projectSchema>;
  technologiesSelected: Technology[];
  id: string;
}) {
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

  return res;
}

export async function getProjectById(projectId: string) {
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
