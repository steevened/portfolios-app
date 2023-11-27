import { prisma } from "@/lib/db/prisma";
import ToggleTechnology from "./toggle-technology";
import { getAllTechnologies } from "@/lib/services/technologies.service";

export default async function TechnologiesGroup({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  console.log({ searchParams });
  const technologies = await getAllTechnologies();
  return <ToggleTechnology technologies={technologies} />;
}
