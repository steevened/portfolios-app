import { prisma } from "../db/prisma";

export async function getLanguages() {
  try {
    const languages = await prisma.language.findMany();
    return languages;
  } catch (error) {
    throw error;
  }
}
