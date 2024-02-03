/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["localhost", "avatars.githubusercontent.com"],
  },
};

// module.exports = nextConfig;
export default nextConfig;
