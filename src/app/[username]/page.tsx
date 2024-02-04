import { prisma } from "@/lib/db/prisma";
import { getUserByUsername } from "@/lib/services/user.service";
import { notFound } from "next/navigation";

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

  return <h1></h1>;
}
