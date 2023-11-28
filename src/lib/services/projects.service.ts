import { prisma } from '../db/prisma';

export async function getProjectOnDraft() {
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
