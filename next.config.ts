import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  typescript: {
    // Removed ignoreBuildErrors — fix TS errors instead of hiding them
  },
  images: {
    // Add your allowed image domains here if you use next/image with remote sources
    // remotePatterns: [{ protocol: "https", hostname: "example.com" }],
  },
};

export default nextConfig;
