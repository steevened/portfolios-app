import { writeFile } from "fs/promises";
import path from "path";

export async function WriteFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(process.cwd(), "public/img", file.name);

  const normalizedPath = path.normalize(filePath);

  const fileLink = `http://localhost:3000/img/${path.basename(normalizedPath)}`;

  writeFile(filePath, buffer);
  return fileLink;
}
