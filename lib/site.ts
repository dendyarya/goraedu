// Site identity. SITE_URL and SITE_ENV come from GitHub repository variables at build time (docs/deploy.md).
const production = process.env.SITE_ENV === "production";

export const SITE = {
  name: "goraedu",
  url: process.env.SITE_URL?.trim() || "https://goraedu.com",
  tagline: "Learn. Get Certified. Build Your Career.",
  description:
    "Free EPA 608 practice questions and study guides for U.S. HVAC and refrigeration technicians. Every answer links to the official source.",
  indexable: production,
  contactEmail: "contact@goraedu.com",
  independence:
    "Independent. Not affiliated with or endorsed by the U.S. EPA or any certifying organization. Certification names are used only to identify each exam.",
} as const;

/** Main navigation. Pages that are not built yet have no href and show as "Soon" (no links to missing pages). */
export const NAV: { label: string; href?: string }[] = [
  { label: "EPA 608" },
  { label: "Practice tests" },
  { label: "Tools" },
  { label: "News", href: "/news/" },
];

export const FOOTER_GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "How we work",
    links: [
      { label: "About", href: "/about/" },
      { label: "Methodology", href: "/methodology/" },
      { label: "Question writing standards", href: "/question-writing-standards/" },
      { label: "Data sources and licenses", href: "/data-sources/" },
      { label: "Corrections", href: "/corrections/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy/" },
      { label: "Terms of use", href: "/terms/" },
      { label: "Disclaimer", href: "/disclaimer/" },
      { label: "Advertising disclosure", href: "/advertising-disclosure/" },
    ],
  },
  {
    title: "Keep up",
    links: [
      { label: "EPA news", href: "/news/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
];
