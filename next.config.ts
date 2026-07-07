import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Zonder expliciete root kiest Turbopack door een tweede lockfile in de
  // home-map soms ~ als workspace-root en scant dan de hele home-directory.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
