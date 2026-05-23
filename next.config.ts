import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // <-- ADD THIS LINE
  images: {
    unoptimized: true, // <-- ADD THIS LINE (Required for static images to work)
  },
};

export default nextConfig;