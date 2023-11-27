import * as z from "zod";

export const projectSchema = z.object({
  name: z.string().min(3).max(50),
  liveUrl: z
    .string()
    .url({
      message: "Invalid url.",
    })
    .or(z.string().optional()),
  githubUrl: z
    .string()
    .url({
      message: "Invalid url.",
    })
    .or(z.string().optional()),
  description: z.string().min(10).max(1000).or(z.string().optional()),
});
