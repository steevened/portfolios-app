import { Prisma } from '@prisma/client';

export type ProjectWithTechnologies = Prisma.ProjectGetPayload<{
  include: {
    technologies: {
      include: {
        technology: true;
      };
    };
  };
}>;
