import { unstable_noStore } from "next/cache";
import { prisma } from "../db/prisma";

export const getProfileByUserId = async (userId: string) => {
  const data = await prisma.profile.findUnique({
    where: {
      userId,
    },
  });

  return data;
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
