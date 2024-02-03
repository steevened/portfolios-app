/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  images: {
    domains: ["localhost", "avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
