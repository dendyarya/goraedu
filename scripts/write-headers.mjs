// Writes out/_headers for Cloudflare static assets.
// Only a build with SITE_ENV=production may be indexed; every other build (previews, early launch)
// sends X-Robots-Tag: noindex. Set SITE_ENV=production in the Cloudflare build variables at launch.
import { writeFileSync } from "node:fs";

const production = process.env.SITE_ENV === "production";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const lines = [
  "/*",
  `  Content-Security-Policy: ${csp}`,
  "  Strict-Transport-Security: max-age=63072000; includeSubDomains",
  "  X-Content-Type-Options: nosniff",
  "  Referrer-Policy: strict-origin-when-cross-origin",
  "  X-Frame-Options: DENY",
  "  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "  Cross-Origin-Opener-Policy: same-origin",
];
if (!production) lines.push("  X-Robots-Tag: noindex, nofollow");

writeFileSync("out/_headers", lines.join("\n") + "\n");
console.log(`out/_headers written (${production ? "production, indexable" : "noindex"})`);
