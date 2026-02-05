import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: Ithu build fail aagaratha thadukkum
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Typescript errors irunthalum build aaga sollum
    ignoreBuildErrors: true,
  },
};

export default nextConfig;