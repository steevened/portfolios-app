"use server";

import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "../auth";
import { prisma } from "../db/prisma";
import { getProfileByUserId } from "../services/profile.service";

export const updateBio = async (formData: FormData) => {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthorized");

  const profile = await getProfileByUserId(session.user.id);
  if (!profile) throw new Error("Profile not found");

  try {
    const bio = formData.get("bio") as string;
    await prisma.profile.update({
      where: {
        userId: profile.userId,
      },
      data: {
        bio,
      },
    });
  } catch (error) {
    throw new Error("Failed to update bio");
  }
  revalidatePath(`/user/${profile.userId}/about`);
};
