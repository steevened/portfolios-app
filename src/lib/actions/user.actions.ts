"use server";

import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "../auth";
import { prisma } from "../db/prisma";
import { getProfileByUserId } from "../services/profile.service";

export const updateBio = async (formData: FormData) => {
  "use server";

  const session = await getServerAuthSession();
  if (!session) return;

  const profile = await getProfileByUserId(session.user.id);
  if (!profile) return;

  const bio = formData.get("bio") as string;
  await prisma.profile.update({
    where: {
      userId: profile.userId,
    },
    data: {
      bio,
    },
  });
  revalidatePath(`/user/${profile.userId}/about`);
};
