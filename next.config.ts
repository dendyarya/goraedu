import type { NextConfig } from "next";

// Static export for Cloudflare Workers static assets. Security headers and the noindex rule for
// non-production builds are written to out/_headers by scripts/write-headers.mjs after the build.
const nextConfig: NextConfig = {
  output: "export",
  // URLs follow the runbook silo structure, e.g. /epa-608/type-2/
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
