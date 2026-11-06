// OSHA clusters: construction (29 CFR 1926) and general industry (29 CFR 1910). Topic sets run roughly in the order of
// the OSHA Outreach Training Program course topics for each industry.

export type OshaSet = { slug: string; name: string; rule: string; focus: string | null };
export type OshaClusterId =
  | "osha"
  | "osha-general-industry"
  | "cdl"
  | "faa-107"
  | "water-operator"
  | "wastewater-operator"
  | "lead-rrp"
  | "osha-crane"
  | "forklift"
  | "faa-amt"
  | "asbestos";

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
  {
    slug: "hazmat-classes-definitions",
    name: "Hazmat classes and definitions",
    rule: "49 CFR 171.8 and 173.2",
    focus: null,
  },
  {
    slug: "hazmat-shipping-papers",
    name: "Hazmat shipping papers and emergency information",
    rule: "49 CFR Part 172 Subparts C and G",
    focus: null,
  },
  { slug: "hazmat-marking", name: "Hazmat marking", rule: "49 CFR Part 172 Subpart D", focus: null },
  { slug: "hazmat-placarding", name: "Hazmat placarding", rule: "49 CFR Part 172 Subpart F", focus: null },
  {
    slug: "hazmat-loading-segregation",
    name: "Hazmat highway carriage, loading and segregation",
    rule: "49 CFR Part 177",
    focus: null,
  },
  {
    slug: "hazmat-driving-parking",
    name: "Hazmat driving, parking and training",
    rule: "49 CFR Part 397 and Part 172 Subpart H",
    focus: null,
  },
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

const WATER_SETS: OshaSet[] = [
  { slug: "systems-definitions", name: "Systems and definitions", rule: "40 CFR Part 141 Subpart A", focus: null },
  { slug: "contaminant-levels", name: "Maximum contaminant levels", rule: "40 CFR Part 141 Subpart G", focus: null },
  { slug: "total-coliform", name: "Total coliform (RTCR)", rule: "40 CFR Part 141 Subpart Y", focus: null },
  {
    slug: "filtration-disinfection",
    name: "Filtration and disinfection",
    rule: "40 CFR Part 141 Subpart H",
    focus: null,
  },
  {
    slug: "disinfection-byproducts",
    name: "Disinfectant residuals and byproducts",
    rule: "40 CFR Part 141 Subpart L",
    focus: null,
  },
  { slug: "lead-copper", name: "Lead and copper", rule: "40 CFR Part 141 Subpart I", focus: null },
  { slug: "public-notification", name: "Public notification", rule: "40 CFR Part 141 Subpart Q", focus: null },
  {
    slug: "secondary-standards-lead-free",
    name: "Secondary standards and lead free plumbing",
    rule: "40 CFR Part 143",
    focus: null,
  },
];

const WASTEWATER_SETS: OshaSet[] = [
  { slug: "secondary-treatment", name: "Secondary treatment standards", rule: "40 CFR Part 133", focus: null },
  {
    slug: "npdes-permit-conditions",
    name: "NPDES permit conditions",
    rule: "40 CFR 122.2 and 122.41",
    focus: null,
  },
  {
    slug: "permit-limits-monitoring",
    name: "Permit limits and monitoring",
    rule: "40 CFR Part 122 Subpart C",
    focus: null,
  },
  {
    slug: "sampling-test-procedures",
    name: "Sampling and test procedures",
    rule: "40 CFR 136.1 to 136.3",
    focus: null,
  },
  { slug: "pretreatment", name: "Industrial pretreatment", rule: "40 CFR Part 403", focus: null },
  {
    slug: "biosolids-use-disposal",
    name: "Biosolids use and disposal",
    rule: "40 CFR Part 503 Subparts A, B, C and E",
    focus: null,
  },
  {
    slug: "pathogens-vector-attraction",
    name: "Pathogen and vector attraction reduction",
    rule: "40 CFR Part 503 Subpart D",
    focus: null,
  },
];

const RRP_SETS: OshaSet[] = [
  { slug: "rrp-scope-definitions", name: "Scope and definitions", rule: "40 CFR 745.80 to 745.83", focus: null },
  {
    slug: "rrp-certification-training",
    name: "Firm and renovator certification and training",
    rule: "40 CFR 745.89 to 745.92 and 745.225",
    focus: null,
  },
  {
    slug: "rrp-information-records",
    name: "Pre-renovation information and recordkeeping",
    rule: "40 CFR 745.84 and 745.86",
    focus: null,
  },
  { slug: "rrp-work-practices", name: "Work practice standards", rule: "40 CFR 745.85(a)", focus: null },
  {
    slug: "rrp-cleaning-verification",
    name: "Cleaning verification and dust clearance",
    rule: "40 CFR 745.85(b)",
    focus: null,
  },
  {
    slug: "lead-hazard-standards",
    name: "Lead hazard standards and abatement basics",
    rule: "40 CFR 745 Subparts D and L",
    focus: null,
  },
];

const CRANE_SETS: OshaSet[] = [
  { slug: "crane-power-lines", name: "Power line safety", rule: "29 CFR 1926.1408", focus: null },
  { slug: "crane-inspections", name: "Inspections", rule: "29 CFR 1926.1412", focus: null },
  {
    slug: "crane-operation",
    name: "Operation and work area control",
    rule: "29 CFR 1926.1417 and 1926.1424",
    focus: null,
  },
  { slug: "crane-signals", name: "Signals", rule: "29 CFR 1926.1419", focus: null },
  {
    slug: "crane-signal-person-qualification",
    name: "Signal person qualifications",
    rule: "29 CFR 1926.1428",
    focus: null,
  },
  {
    slug: "crane-operator-qualification",
    name: "Operator training, certification and evaluation",
    rule: "29 CFR 1926.1427",
    focus: null,
  },
  { slug: "crane-hoisting-personnel", name: "Hoisting personnel", rule: "29 CFR 1926.1431", focus: null },
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

export const WATER_INDEPENDENCE_TEXT =
  "goraedu does not certify water operators, and our questions are not a state operator certification exam. Not affiliated with or endorsed by the U.S. EPA, any state drinking water program or any operator certification body.";

export const WASTEWATER_INDEPENDENCE_TEXT =
  "goraedu does not certify wastewater operators, and our questions are not a state operator certification exam. Not affiliated with or endorsed by the U.S. EPA, any state water program or any operator certification body.";

export const RRP_INDEPENDENCE_TEXT =
  "goraedu is not an EPA-accredited training provider, does not certify renovators or firms, and our questions are not a course exam. Not affiliated with or endorsed by the U.S. EPA or any State or Tribal lead program.";

const FORKLIFT_SETS: OshaSet[] = [
  {
    slug: "forklift-operator-training",
    name: "Operator training and evaluation",
    rule: "29 CFR 1910.178(l)",
    focus: null,
  },
  {
    slug: "forklift-truck-types-locations",
    name: "Truck approval, types and designated locations",
    rule: "29 CFR 1910.178(a) to (e)",
    focus: null,
  },
  {
    slug: "forklift-fuel-batteries-docks",
    name: "Fuel, batteries, lighting and loading docks",
    rule: "29 CFR 1910.178(f) to (k)",
    focus: null,
  },
  {
    slug: "forklift-traveling-loading",
    name: "Truck operations, traveling and loading",
    rule: "29 CFR 1910.178(m) to (o)",
    focus: null,
  },
  {
    slug: "forklift-operation-maintenance",
    name: "Operating condition and maintenance",
    rule: "29 CFR 1910.178(p) and (q)",
    focus: null,
  },
  {
    slug: "forklift-construction",
    name: "Forklifts in construction",
    rule: "29 CFR 1926.602(c) and (d)",
    focus: null,
  },
];

const AMT_SETS: OshaSet[] = [
  {
    slug: "amt-eligibility-ratings",
    name: "Eligibility, ratings, knowledge, experience and skill",
    rule: "14 CFR 65.71 to 65.80",
    focus: null,
  },
  {
    slug: "amt-privileges",
    name: "Privileges, recent experience and display",
    rule: "14 CFR 65.81 to 65.89",
    focus: null,
  },
  {
    slug: "amt-inspection-authorization",
    name: "Inspection authorization",
    rule: "14 CFR 65.91 to 65.95",
    focus: null,
  },
  {
    slug: "amt-who-performs-approves",
    name: "Who may perform maintenance and approve return to service",
    rule: "14 CFR 43.1, 43.3, 43.5 and 43.7",
    focus: null,
  },
  {
    slug: "amt-maintenance-records",
    name: "Maintenance and inspection records",
    rule: "14 CFR 43.2, 43.9 to 43.11 and Appendix B",
    focus: null,
  },
  {
    slug: "amt-performance-rules",
    name: "Performance and inspection rules",
    rule: "14 CFR 43.13 to 43.17 and Appendix D",
    focus: null,
  },
  {
    slug: "amt-major-repairs-preventive",
    name: "Major alterations, major repairs and preventive maintenance",
    rule: "14 CFR Part 43, Appendix A",
    focus: null,
  },
];

const ASBESTOS_SETS: OshaSet[] = [
  {
    slug: "asbestos-scope-classes",
    name: "Scope, definitions, classes of work and exposure limits",
    rule: "29 CFR 1926.1101(a) to (d)",
    focus: null,
  },
  {
    slug: "asbestos-regulated-areas-monitoring",
    name: "Regulated areas and exposure monitoring",
    rule: "29 CFR 1926.1101(e) and (f)",
    focus: null,
  },
  { slug: "asbestos-methods-compliance", name: "Methods of compliance", rule: "29 CFR 1926.1101(g)", focus: null },
  {
    slug: "asbestos-respirators-hygiene",
    name: "Respirators, protective clothing and hygiene facilities",
    rule: "29 CFR 1926.1101(h) to (j)",
    focus: null,
  },
  {
    slug: "asbestos-hazard-communication-training",
    name: "Communication of hazards, training and housekeeping",
    rule: "29 CFR 1926.1101(k) and (l)",
    focus: null,
  },
  {
    slug: "asbestos-medical-records-competent-person",
    name: "Medical surveillance, recordkeeping and the competent person",
    rule: "29 CFR 1926.1101(m) to (o)",
    focus: null,
  },
  {
    slug: "asbestos-schools-inspections",
    name: "Schools (AHERA): responsibilities, inspections, sampling and assessment",
    rule: "40 CFR 763.80 to 763.88",
    focus: null,
  },
  {
    slug: "asbestos-schools-response-management",
    name: "Schools (AHERA): response actions, O&M, management plans and records",
    rule: "40 CFR 763.90 to 763.95 and 763.99",
    focus: null,
  },
];

export const ASBESTOS_INDEPENDENCE_TEXT =
  "goraedu is not an accredited asbestos training provider and does not train, accredit or certify anyone; our questions are not a course or accreditation exam. Not affiliated with or endorsed by OSHA, the U.S. Department of Labor, the U.S. EPA or any State.";

export const AMT_INDEPENDENCE_TEXT =
  "goraedu does not train, test or certificate aviation mechanics, and our questions are not an FAA knowledge, oral or practical test. Not affiliated with or endorsed by the FAA or the U.S. Department of Transportation.";

export const FORKLIFT_INDEPENDENCE_TEXT =
  "goraedu does not train, evaluate or certify forklift operators, and our questions are not an operator evaluation. Under 29 CFR 1910.178(l) the employer must ensure each operator has completed the required training and evaluation, and certifies that this was done. Not affiliated with or endorsed by OSHA or the U.S. Department of Labor.";

export const CRANE_INDEPENDENCE_TEXT =
  "goraedu is not a crane operator testing organization, does not certify or qualify operators, and our questions are not a certification exam. Not affiliated with or endorsed by OSHA, the U.S. Department of Labor or any certification body.";

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
    part: "49 CFR Parts 171 to 177 and 382 to 397",
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
  "water-operator": {
    id: "water-operator",
    label: "Drinking water operator",
    href: "/water-operator/",
    part: "40 CFR Parts 141 and 143",
    sets: WATER_SETS,
    independence: WATER_INDEPENDENCE_TEXT,
    notFrom: "any state operator certification exam, operator manual or prep course",
  },
  asbestos: {
    id: "asbestos",
    label: "Asbestos",
    href: "/asbestos/",
    part: "29 CFR 1926.1101 and 40 CFR Part 763 Subpart E",
    sets: ASBESTOS_SETS,
    independence: ASBESTOS_INDEPENDENCE_TEXT,
    notFrom: "any accredited asbestos course, accreditation exam, training handout or prep material",
  },
  "faa-amt": {
    id: "faa-amt",
    label: "FAA aviation mechanic",
    href: "/faa-amt/",
    part: "14 CFR Part 65 Subpart D and Part 43",
    sets: AMT_SETS,
    independence: AMT_INDEPENDENCE_TEXT,
    notFrom: "the FAA mechanic knowledge tests, FAA sample questions, testing supplements or any prep course",
  },
  forklift: {
    id: "forklift",
    label: "Forklift operator",
    href: "/forklift/",
    part: "29 CFR 1910.178",
    sets: FORKLIFT_SETS,
    independence: FORKLIFT_INDEPENDENCE_TEXT,
    notFrom: "any forklift training course, operator evaluation, quiz or prep material",
  },
  "osha-crane": {
    id: "osha-crane",
    label: "OSHA crane operator",
    href: "/osha-crane/",
    part: "29 CFR 1926 Subpart CC",
    sets: CRANE_SETS,
    independence: CRANE_INDEPENDENCE_TEXT,
    notFrom: "any crane operator certification exam, candidate handbook or prep course",
  },
  "lead-rrp": {
    id: "lead-rrp",
    label: "EPA Lead RRP",
    href: "/lead-rrp/",
    part: "40 CFR Part 745",
    sets: RRP_SETS,
    independence: RRP_INDEPENDENCE_TEXT,
    notFrom: "any accredited RRP course, training provider quiz or prep course",
  },
  "wastewater-operator": {
    id: "wastewater-operator",
    label: "Wastewater operator",
    href: "/wastewater-operator/",
    part: "40 CFR Parts 122, 133, 136, 403 and 503",
    sets: WASTEWATER_SETS,
    independence: WASTEWATER_INDEPENDENCE_TEXT,
    notFrom: "any state operator certification exam, operator manual or prep course",
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
