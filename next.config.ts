import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker (optimized builds)
  output: 'standalone',
  // Ensure proper image optimization
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
