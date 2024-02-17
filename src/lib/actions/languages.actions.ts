"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "../auth";
import { prisma } from "../db/prisma";
import { getUserById } from "../services/user.service";

export async function createLanguage({ name }: { name: string }) {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("You must be logged in to perform this action");
  }

  const user = await getUserById(session.user.id);

  if (user.role !== "admin") {
    throw new Error("You must be an admin to perform this action");
  }

  try {
    await prisma.language.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s/g, "-"),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("This language already exists.");
      }
    }
    throw error;
  }
  revalidatePath("/dashboard");
}

export async function deleteLanguage({ id }: { id: string }) {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("You must be logged in to perform this action");
  }

  const user = await getUserById(session.user.id);

  if (user.role !== "admin") {
    throw new Error("You must be an admin to perform this action");
  }

  try {
    await prisma.language.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw error;
  }

  revalidatePath("/dashboard");
}
