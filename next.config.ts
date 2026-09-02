import path from "node:path";
import type { NextConfig } from "next";

// juan-rome.github.io is a user/org GitHub Pages site, served from the
// repo root with no basePath. Static export is required since GitHub
// Pages only serves static files (no Node runtime for next/image, etc).
const nextConfig: NextConfig = {
  // Scope root detection to this project — an unrelated lockfile in the
  // user's home directory would otherwise make Next.js guess wrong.
  outputFileTracingRoot: path.join(process.cwd()),
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
