import { prisma } from "../db/prisma";
import { unstable_noStore as noStore } from "next/cache";

export const getAllTechnologies = async () => {
  noStore();
  return await prisma.technology.findMany();
};
