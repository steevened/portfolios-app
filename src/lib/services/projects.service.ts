import { prisma } from '../db/prisma';
import { unstable_noStore as noStore } from 'next/cache';

export async function getAllProjects({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const { tech } = searchParams;

  const technologies = tech ? tech.split('_') : undefined;

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
      updatedAt: 'desc',
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
