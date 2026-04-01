import type { NextConfig } from "next";
import { join } from "path";

const projectRoot = process.cwd();

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      tailwindcss: join(projectRoot, "node_modules", "tailwindcss"),
    },
  },
};

export default nextConfig;
