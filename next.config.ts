import type { NextConfig } from "next";

// Static export: the build in out/ is plain HTML, CSS and JS served by Nginx on the VPS (docs/deploy.md).
// Security headers live in deploy/nginx/goraedu.com.conf.
const nextConfig: NextConfig = {
  output: "export",
  // URLs follow the runbook silo structure, e.g. /epa-608/type-2/
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
