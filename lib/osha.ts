// OSHA clusters: construction (29 CFR 1926) and general industry (29 CFR 1910). Topic sets run roughly in the order of
// the OSHA Outreach Training Program course topics for each industry.

export type OshaSet = { slug: string; name: string; rule: string; focus: string | null };
export type OshaClusterId = "osha" | "osha-general-industry" | "cdl" | "faa-107";

const CONSTRUCTION_SETS: OshaSet[] = [
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
];

const CDL_SETS: OshaSet[] = [
  { slug: "cdl-standards", name: "License standards", rule: "49 CFR Part 383", focus: null },
  { slug: "driver-qualifications", name: "Driver qualifications", rule: "49 CFR Part 391", focus: null },
  { slug: "driving-rules", name: "Driving rules", rule: "49 CFR Part 392", focus: null },
  { slug: "hours-of-service", name: "Hours of service", rule: "49 CFR Part 395", focus: null },
  { slug: "inspection-maintenance", name: "Inspection and maintenance", rule: "49 CFR Part 396", focus: null },
  { slug: "brakes", name: "Brakes", rule: "49 CFR Part 393 Subpart C", focus: null },
  { slug: "cargo-securement", name: "Cargo securement", rule: "49 CFR Part 393 Subpart I", focus: null },
  { slug: "drug-alcohol-testing", name: "Drug and alcohol testing", rule: "49 CFR Part 382", focus: null },
];

const FAA_SETS: OshaSet[] = [
  { slug: "operating-rules", name: "Operating rules", rule: "14 CFR Part 107 Subpart B", focus: null },
  { slug: "airspace", name: "Airspace", rule: "14 CFR Part 107 and FAA-G-8082-22", focus: null },
  {
    slug: "operations-over-people",
    name: "Operations over people and at night",
    rule: "14 CFR Part 107 Subpart D",
    focus: null,
  },
  {
    slug: "remote-pilot-certificate",
    name: "Remote pilot certificate and waivers",
    rule: "14 CFR Part 107 Subparts C and E",
    focus: null,
  },
  { slug: "registration-remote-id", name: "Registration and Remote ID", rule: "14 CFR Parts 48 and 89", focus: null },
  { slug: "weather", name: "Weather", rule: "FAA-G-8082-22", focus: null },
  {
    slug: "operations-safety",
    name: "Loading, performance and safe operations",
    rule: "FAA-G-8082-22 and 14 CFR Part 107",
    focus: null,
  },
];

const GENERAL_INDUSTRY_SETS: OshaSet[] = [
  { slug: "walking-working-surfaces", name: "Walking-working surfaces", rule: "29 CFR 1910 Subpart D", focus: null },
  { slug: "exit-routes", name: "Exit routes and emergency planning", rule: "29 CFR 1910 Subpart E", focus: null },
  { slug: "fire-protection", name: "Fire protection", rule: "29 CFR 1910 Subpart L", focus: null },
  { slug: "electrical", name: "Electrical safety", rule: "29 CFR 1910 Subpart S", focus: null },
  { slug: "ppe", name: "Personal protective equipment", rule: "29 CFR 1910 Subpart I", focus: null },
  { slug: "hazardous-materials", name: "Hazardous materials", rule: "29 CFR 1910.101 and 1910.106", focus: null },
  { slug: "confined-spaces", name: "Permit-required confined spaces", rule: "29 CFR 1910.146", focus: null },
  { slug: "lockout-tagout", name: "Lockout/tagout", rule: "29 CFR 1910.147", focus: null },
  { slug: "machine-guarding", name: "Machine guarding", rule: "29 CFR 1910 Subpart O", focus: null },
  { slug: "welding", name: "Welding, cutting and brazing", rule: "29 CFR 1910 Subpart Q", focus: null },
  { slug: "forklifts", name: "Powered industrial trucks (forklifts)", rule: "29 CFR 1910.178", focus: null },
  { slug: "materials-handling", name: "Materials handling and storage", rule: "29 CFR 1910 Subpart N", focus: null },
  { slug: "bloodborne-pathogens", name: "Bloodborne pathogens", rule: "29 CFR 1910.1030", focus: null },
  { slug: "noise", name: "Occupational noise exposure", rule: "29 CFR 1910.95", focus: null },
];

const OSHA_INDEPENDENCE_TEXT =
  "goraedu is not an OSHA Outreach Training Program provider and does not issue OSHA 10 or OSHA 30 cards. Our practice questions do not count toward training hours. Not affiliated with or endorsed by OSHA or the U.S. Department of Labor.";

export const CDL_INDEPENDENCE_TEXT =
  "goraedu does not issue licenses or permits, and our questions are not a state CDL knowledge test. Not affiliated with or endorsed by FMCSA, the U.S. Department of Transportation or any state driver licensing agency.";

export const FAA_INDEPENDENCE_TEXT =
  "goraedu is not an FAA knowledge testing center or training provider, and our questions are not the FAA knowledge test. Not affiliated with or endorsed by the FAA or the U.S. Department of Transportation.";

export const OSHA_CLUSTERS: Record<
  OshaClusterId,
  {
    id: OshaClusterId;
    label: string;
    href: string;
    part: string;
    sets: OshaSet[];
    independence: string;
    notFrom: string;
  }
> = {
  osha: {
    id: "osha",
    label: "OSHA Construction",
    href: "/osha/",
    part: "29 CFR Part 1926",
    sets: CONSTRUCTION_SETS,
    independence: OSHA_INDEPENDENCE_TEXT,
    notFrom: "any OSHA Outreach course or trainer",
  },
  "osha-general-industry": {
    id: "osha-general-industry",
    label: "OSHA General Industry",
    href: "/osha-general-industry/",
    part: "29 CFR Part 1910",
    sets: GENERAL_INDUSTRY_SETS,
    independence: OSHA_INDEPENDENCE_TEXT,
    notFrom: "any OSHA Outreach course or trainer",
  },
  cdl: {
    id: "cdl",
    label: "CDL",
    href: "/cdl/",
    part: "49 CFR Parts 382 to 396",
    sets: CDL_SETS,
    independence: CDL_INDEPENDENCE_TEXT,
    notFrom: "any state CDL knowledge test, driver manual or prep course",
  },
  "faa-107": {
    id: "faa-107",
    label: "FAA Part 107",
    href: "/faa-107/",
    part: "14 CFR Part 107",
    sets: FAA_SETS,
    independence: FAA_INDEPENDENCE_TEXT,
    notFrom: "the FAA knowledge test, FAA sample test questions or any prep course",
  },
};

/** Construction sets (kept under this name for existing callers). */
export const OSHA_SETS = CONSTRUCTION_SETS;

/** Topics shared by both OSHA clusters, published once under /osha/. */
export const OSHA_SHARED = ["intro-to-osha", "hazard-communication"];

export const OSHA_INDEPENDENCE = OSHA_INDEPENDENCE_TEXT;

export const oshaSetName = (slug: string, cluster: OshaClusterId = "osha") =>
  OSHA_CLUSTERS[cluster].sets.find((s) => s.slug === slug)?.name ?? slug;

/** Order of a set within its cluster (course order), for sorting. */
export const oshaRank = (cluster: string, slug: string) =>
  cluster in OSHA_CLUSTERS ? OSHA_CLUSTERS[cluster as OshaClusterId].sets.findIndex((s) => s.slug === slug) : 0;

/** Page title for a set, e.g. "OSHA Construction Scaffolds Practice Questions (29 CFR 1926 Subpart L)". */
export function oshaPageTitle(
  slug: string,
  kind: "Practice Questions" | "Study Guide",
  cluster: OshaClusterId = "osha",
): string {
  const c = OSHA_CLUSTERS[cluster];
  const set = c.sets.find((s) => s.slug === slug);
  if (!set) return `${c.label} ${kind}`;
  const name = set.name.replace(/\b(?!(?:and|of|in|to)\b)\w/g, (c) => c.toUpperCase());
  const base =
    set.slug === "intro-to-osha" ? name : OSHA_SHARED.includes(set.slug) ? `OSHA ${name}` : `${c.label} ${name}`;
  return `${base} ${kind} (${set.rule})`;
}
