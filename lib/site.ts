// Site identity. SITE_URL and SITE_ENV come from GitHub repository variables at build time (docs/deploy.md).
const production = process.env.SITE_ENV === "production";

export const SITE = {
  name: "goraedu",
  url: process.env.SITE_URL?.trim() || "https://www.goraedu.com",
  tagline: "Learn. Get Certified. Build Your Career.",
  description:
    "Free practice questions and study guides for U.S. skilled trades certifications, including EPA Sections 608 and 609 and OSHA construction safety. Every answer links to the official source.",
  indexable: production,
  /**
   * Google Tag Manager container (public, not a secret). It carries the Google Analytics 4 tag; what it may
   * contain is limited by the privacy policy (analytics only, no advertising tags). Empty = nothing loads.
   * Loaded only on production builds, and never for visitors who send the Global Privacy Control signal.
   */
  gtmId: "GTM-K2T7WGS4" as string,
  contactEmail: "contact@goraedu.com",
  independence:
    "Independent. Not affiliated with or endorsed by any government agency or certifying organization. Certification names are used only to identify each exam.",
} as const;

/** Main navigation. Pages that are not built yet have no href and show as "Soon" (no links to missing pages). */
export const NAV: { label: string; href?: string }[] = [
  { label: "Certifications", href: "/certifications/" },
  { label: "Practice tests", href: "/practice-tests/" },
  { label: "Tools", href: "/tools/" },
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
    title: "Explore",
    links: [
      { label: "Certifications", href: "/certifications/" },
      { label: "Practice tests", href: "/practice-tests/" },
      { label: "Tools", href: "/tools/" },
      { label: "News", href: "/news/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
];
