import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This will prevent ESLint errors from failing the Vercel build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
