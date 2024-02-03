import { prisma } from "../db/prisma";
import { unstable_noStore as noStore } from "next/cache";

export const getAllTechnologies = async () => {
  try {
    noStore();
    return await prisma.technology.findMany();
  } catch (error) {
    throw new Error(error as string);
  }
};
