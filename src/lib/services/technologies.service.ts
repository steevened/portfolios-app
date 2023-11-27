import { prisma } from "../db/prisma";

export async function getAllTechnologies() {
  return await prisma.technology.findMany();
}
