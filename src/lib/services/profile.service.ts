import { unstable_noStore } from "next/cache";
import { prisma } from "../db/prisma";

export const getProfileById = async (id: string) => {
  unstable_noStore();
  const profile = await prisma.profile.findUnique({
    where: {
      userId: id,
    },
    select: {
      id: true,
      bio: true,
      user: true,
    },
  });
  return profile;
};

export const upsertAvatar = async (file: File) => {
  unstable_noStore();
  if (!file) return;
  const formData = new FormData();
  formData.append("avatar", file);
  try {
    const res = await fetch(`/api/user/avatar`, {
      method: "POST",
      body: formData,
    });
    return res.json();
  } catch (error) {
    return { error };
  }
};
