import { Prisma } from "@prisma/client";

export type ProjectWithTechnologies = Prisma.ProjectGetPayload<{
  include: {
    technologies: {
      include: {
        technology: true;
      };
    };
  };
}>;

const projectWithGalleryAndTechnologies =
  Prisma.validator<Prisma.ProjectDefaultArgs>({
    include: {
      gallery: {
        select: {
          id: true,
          url: true,
        },
      },
      technologies: {
        include: {
          technology: true,
        },
      },
    },
  });

export type ProjectWithGalleryAndTechnologies = Prisma.ProjectGetPayload<
  typeof projectWithGalleryAndTechnologies
>;
