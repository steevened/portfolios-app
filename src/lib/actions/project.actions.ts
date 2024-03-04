"use server";

import { z } from "zod";
import { projectSchema } from "../schemas/project.schema";
import { getServerAuthSession } from "../auth";
import { prisma } from "../db/prisma";
import { revalidatePath } from "next/cache";
import { getStorageUrl } from "../helpers/get-storage-url";

type ProjectData = z.infer<typeof projectSchema> & {
  id?: string;
  languages: string[];
  isOnDraft: boolean;
  published: boolean;
};

export async function upsertProject(data: ProjectData) {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  try {
    const draft = await prisma.draft.upsert({
      where: {
        userId: session.user.id,
      },
      update: {},
      create: {
        userId: session.user.id,
      },
    });

    if (!draft) {
      throw new Error("Something went wrong, please try again");
    }

    const project = await prisma.project.upsert({
      where: {
        ...(data.id
          ? { id: data.id }
          : {
              unique_project_name: {
                name: data.name,
                authorId: session.user.id,
              },
            }),
      },
      create: {
        name: data.name,
        description: data.description,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        isOnDraft: data.isOnDraft,
        draftId: draft.id,
        published: data.published,
        authorId: session.user.id,
        languages: {
          create: data.languages.map((languageId) => ({
            language: {
              connect: {
                id: languageId,
              },
            },
          })),
        },
      },
      update: {
        name: data.name,
        description: data.description,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        isOnDraft: data.isOnDraft,
        draftId: draft.id,
        authorId: session.user.id,
        published: data.published,
        languages: {
          deleteMany: {},
          create: data.languages.map((languageId) => ({
            language: {
              connect: {
                id: languageId,
              },
            },
          })),
        },
      },
    });
    revalidatePath(`/project`);
    return project;
  } catch (error) {
    throw error;
  }
}

export async function deleteProjectImage(imageId: string) {
  try {
    const deletedImage = await prisma.projectGallery.delete({
      where: {
        id: imageId,
      },
    });

    // revalidatePath(`/project/${deletedImage.projectId}/update/gallery`);
  } catch (error) {
    throw error;
  }
  revalidatePath(`/project`);
}

export async function publishProject(projectId: string) {
  try {
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        published: true,
        isOnDraft: false,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function publishProjectWithGallery(
  projectId: string,
  filePath: string
) {
  const storageUrl = getStorageUrl();
  try {
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        published: true,
        isOnDraft: false,
        gallery: {
          create: {
            url: `${storageUrl}/${filePath}`,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}
