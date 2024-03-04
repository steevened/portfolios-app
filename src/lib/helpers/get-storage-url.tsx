export const getStorageUrl = (): string => {
  const supabaseProjectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;

  if (!supabaseProjectId) {
    throw new Error("Supabase project id is not defined");
  }

  const budget = "portfolios";

  const supabaseUrl = `https://${supabaseProjectId}.supabase.co/storage/v1/object/public/${budget}`;

  return supabaseUrl;
};
