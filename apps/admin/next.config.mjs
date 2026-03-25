/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["@exvion/ui", "@exvion/utils", "@exvion/config"],
};

export default nextConfig;
