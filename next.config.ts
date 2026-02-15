import type { NextConfig } from "next";

const isProd = process.env.NEXT_NODE_ENV === "production";
const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: isProd ? "/error-handling" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
