"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../db/prisma";
import { getServerAuthSession } from "../auth";
import { getUserById } from "../services/user.service";

export const validatePermission = async (): Promise<boolean> => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return false;
  }

  const user = await getUserById(session.user.id);

  if (user?.role !== "admin") {
    return false;
  }

  return true;
};

export const createTechnology = async (formData: FormData) => {
  const hasPermission = await validatePermission();
  if (!hasPermission) {
    throw new Error("You don't have permission to create a new technology");
  }

  const name = formData.get("technology-name") as string;
  if (!name) return;

  try {
    const technology = await prisma.technology.create({
      data: {
        name,
        slug: name.toLowerCase().replace(" ", "-"),
      },
    });
    console.log({ technology });
    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteTechnology = async (id: string) => {
  const hasPermission = await validatePermission();
  if (!hasPermission) {
    throw new Error("You don't have permission to delete this technology");
  }

  try {
    await prisma.technology.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error(error as string);
  }
};
