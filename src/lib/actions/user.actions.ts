"use server";

import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "../auth";
import { prisma } from "../db/prisma";
import { getDeveloperProfile } from "../services/developer.service";
import { getUserById } from "../services/user.service";

const authValidator = async (username: string) => {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthorized");
  const user = await getUserById(session.user.id);
  if (!user) throw new Error("User not found");
  if (user.username !== username) throw new Error("Unauthorized");

  return session;
};

export const updateUser = async ({
  name,
  username,
}: {
  name: string;
  username: string;
}) => {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthorized");

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        username,
      },
    });
    revalidatePath(`/${username}/settings`);
    return { message: "Username updated successfully", code: 200 };
  } catch (error) {
    return { message: "Error updating username", code: 500 };
  }
};

export const updateHeadline = async ({
  username,
  data,
}: {
  username: string;
  data: { headline?: string };
}) => {
  const validSession = await authValidator(username);

  if (!validSession) throw new Error("Unauthorized");

  const profile = await getDeveloperProfile({ username });

  if (!profile) throw new Error("Profile not found");

  try {
    await prisma.developer.update({
      where: {
        userId: profile.userId,
      },
      data: {
        headline: data.headline,
      },
    });
    revalidatePath(`/${username}/settings`);
    return { message: "Headline updated successfully", code: 200 };
  } catch (error) {
    return { message: "Error updating headline", code: 500 };
  }
};

export const updateBio = async ({
  username,
  data,
}: {
  username: string;
  data: { bio?: string };
}) => {
  const validSession = await authValidator(username);

  if (!validSession) throw new Error("Unauthorized");

  const profile = await getDeveloperProfile({ username });

  if (!profile) throw new Error("Profile not found");

  try {
    await prisma.developer.update({
      where: {
        userId: profile.userId,
      },
      data: {
        bio: data.bio,
      },
    });
    revalidatePath(`/${username}/settings`);
    return { message: "Bio updated successfully", code: 200 };
  } catch (error) {
    return { message: "Error updating bio", code: 500 };
  }
};

export const deleteUserImage = async () => {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthorized");

  const user = await getUserById(session.user.id);
  if (!user) throw new Error("User not found");

  console.log(user);

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        image: null,
      },
    });
    revalidatePath(`/user/${user.id}`);
    return { message: "Image deleted successfully", code: 200 };
  } catch (error) {
    return { message: "Error deleting image", code: 500 };
  }
};
