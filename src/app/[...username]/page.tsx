import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";

async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  } catch (error) {
    throw new Error(error as string);
  }
}

export default async function Page({
  params,
}: {
  params: {
    username: string;
  };
}) {
  const user = await getUserByUsername(String(params.username));
  if (!user) {
    notFound();
  }

  return <h1>{JSON.stringify(user)}</h1>;
}
