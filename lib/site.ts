// Site identity. SITE_URL and SITE_ENV come from the Cloudflare build variables.
const production = process.env.SITE_ENV === "production";

export const SITE = {
  name: "goraedu",
  url: process.env.SITE_URL?.trim() || "https://goraedu.com",
  tagline: "Learn. Get Certified. Build Your Career.",
  description:
    "Free practice tests and study guides for U.S. skilled trades certifications. Every answer links to the official source.",
  indexable: production,
  contactEmail: "hello@goraedu.com",
} as const;
