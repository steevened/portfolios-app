"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../db/prisma";
import { getUserAuth } from "../services";

export async function createComment({
  projectId,
  content,
}: {
  projectId: string;
  content: string;
}) {
  try {
    const userAuth = await getUserAuth();

    if (!userAuth) {
      throw new Error("Forbidden");
    }

    await prisma.comment.create({
      data: {
        content,
        userId: userAuth.id,
        projectId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    throw error;
  }
}
