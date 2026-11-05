// OSHA construction cluster: topic sets, roughly in the order the OSHA Outreach construction course topics run.
export const OSHA_SETS = [
  { slug: "intro-to-osha", name: "Introduction to OSHA", rule: "29 CFR Parts 1903 and 1904", focus: null },
  { slug: "fall-protection", name: "Fall protection", rule: "29 CFR 1926 Subpart M", focus: "Falls" },
  { slug: "scaffolds", name: "Scaffolds", rule: "29 CFR 1926 Subpart L", focus: "Falls" },
  { slug: "stairways-ladders", name: "Stairways and ladders", rule: "29 CFR 1926 Subpart X", focus: "Falls" },
  { slug: "electrical", name: "Electrical safety", rule: "29 CFR 1926 Subpart K", focus: "Electrocution" },
  { slug: "excavations", name: "Excavations", rule: "29 CFR 1926 Subpart P", focus: "Caught-in or between" },
  { slug: "ppe", name: "Personal protective equipment", rule: "29 CFR 1926 Subpart E", focus: null },
  { slug: "health-hazards", name: "Health hazards", rule: "29 CFR 1926 Subpart D", focus: null },
  { slug: "hazard-communication", name: "Hazard communication", rule: "29 CFR 1926.59 and 1910.1200", focus: null },
  { slug: "silica", name: "Respirable crystalline silica", rule: "29 CFR 1926.1153", focus: null },
  { slug: "general-safety", name: "General safety and health", rule: "29 CFR 1926 Subpart C", focus: null },
] as const;

export const OSHA_INDEPENDENCE =
  "goraedu is not an OSHA Outreach Training Program provider and does not issue OSHA 10 or OSHA 30 cards. Our practice questions do not count toward training hours. Not affiliated with or endorsed by OSHA or the U.S. Department of Labor.";

export const oshaSetName = (slug: string) => OSHA_SETS.find((s) => s.slug === slug)?.name ?? slug;

/** Page title for a set, e.g. "OSHA Construction Scaffolds Practice Questions (29 CFR 1926 Subpart L)". */
export function oshaPageTitle(slug: string, kind: "Practice Questions" | "Study Guide"): string {
  const set = OSHA_SETS.find((s) => s.slug === slug);
  if (!set) return `OSHA Construction ${kind}`;
  const name = set.name.replace(/\b(?!(?:and|of|in|to)\b)\w/g, (c) => c.toUpperCase());
  const base = set.slug === "intro-to-osha" ? name : `OSHA Construction ${name}`;
  return `${base} ${kind} (${set.rule})`;
}
