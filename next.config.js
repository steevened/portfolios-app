/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "avatars.githubusercontent.com",
      `${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`,
    ],
  },
};

module.exports = nextConfig;
