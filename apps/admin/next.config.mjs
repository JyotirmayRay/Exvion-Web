/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/admin",
  output: process.env.VERCEL ? undefined : "standalone",
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["@exvion/ui", "@exvion/utils", "@exvion/config"],
};

export default nextConfig;
