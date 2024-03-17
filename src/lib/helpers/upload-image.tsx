import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const uploadImage = async (file: File): Promise<string> => {
  const supabase = createClientComponentClient();
  const bucket = "portfolios";
  const fileExt = file.name.split(".").pop();
  const filePath = `${Math.random()}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);
  if (error) {
    throw new Error("Error uploading image");
  }
  return data.path;
};
