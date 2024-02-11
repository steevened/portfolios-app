import { unstable_noStore } from "next/cache";
import { prisma } from "../db/prisma";
import { getUserByUsername } from "./user.service";

export async function getDeveloperProfile({ username }: { username: string }) {
  try {
    const user = await getUserByUsername(username);
    if (!user) return null;

    const developer = await prisma.developer.upsert({
      where: {
        userId: user.id,
      },
      update: {},
      create: {
        userId: user.id,
      },
    });
    return developer;
  } catch (error) {
    throw new Error("Error getting developer profile");
  }
}

export default async function getDeveloperLinks(developerId: string) {
  const data = await prisma.developerLinks.findUnique({
    where: {
      developerId,
    },
  });
  return data;
}

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
