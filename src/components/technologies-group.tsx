import { prisma } from "@/lib/db/prisma";
import ToggleTechnology from "./toggle-technology";

async function getTechnologies() {
  const technologies = await prisma.technology.findMany();
  return technologies;
}

export default async function TechnologiesGroup({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  console.log({ searchParams });
  const technologies = await getTechnologies();
  return <ToggleTechnology technologies={technologies} />;
}
