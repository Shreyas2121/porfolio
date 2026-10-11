import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep browser-test compilation separate from the production build.
  distDir:
    process.env.PORTFOLIO_MEDIA_TEST === "1"
      ? ".next/media-browser-check"
      : ".next",
};

export default nextConfig;
