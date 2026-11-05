// OSHA construction cluster: topic sets in the order the OSHA Outreach Construction Focus Four and core topics run.
export const OSHA_SETS = [
  { slug: "fall-protection", name: "Fall protection", subpart: "M", focus: "Falls" },
  { slug: "scaffolds", name: "Scaffolds", subpart: "L", focus: "Falls" },
  { slug: "stairways-ladders", name: "Stairways and ladders", subpart: "X", focus: "Falls" },
  { slug: "electrical", name: "Electrical safety", subpart: "K", focus: "Electrocution" },
  { slug: "excavations", name: "Excavations", subpart: "P", focus: "Caught-in or between" },
  { slug: "ppe", name: "Personal protective equipment", subpart: "E", focus: null },
  { slug: "general-safety", name: "General safety and health", subpart: "C", focus: null },
] as const;

export const OSHA_INDEPENDENCE =
  "goraedu is not an OSHA Outreach Training Program provider and does not issue OSHA 10 or OSHA 30 cards. Our practice questions do not count toward training hours. Not affiliated with or endorsed by OSHA or the U.S. Department of Labor.";

export const oshaSetName = (slug: string) => OSHA_SETS.find((s) => s.slug === slug)?.name ?? slug;
