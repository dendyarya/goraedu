// Every certification goraedu covers or plans to cover (roadmap order). One entry per cluster.
// A cluster gets an `href` only once its overview page exists; until then it shows its status, never a dead link.

export type ClusterStatus = "available" | "in-progress" | "next" | "planned";

export type Cluster = {
  id: string;
  name: string;
  /** Plain-English description of who needs it */
  summary: string;
  /** Agency or body whose official rules the content will be built from */
  source: string;
  status: ClusterStatus;
  href?: string;
};

export type FamilyIcon = "hvac" | "truck" | "helmet" | "drop" | "house" | "leaf" | "drone";
export type Family = { name: string; icon: FamilyIcon; clusters: Cluster[] };

export const FAMILIES: Family[] = [
  {
    name: "Refrigeration and HVAC",
    icon: "hvac",
    clusters: [
      {
        id: "epa-608",
        name: "EPA Section 608",
        summary: "Required to service or dispose of stationary refrigeration and air-conditioning equipment.",
        source: "U.S. EPA, 40 CFR Part 82, Subpart F",
        status: "available",
        href: "/epa-608/",
      },
      {
        id: "epa-609",
        name: "EPA Section 609",
        summary: "Required to service motor vehicle air conditioning for pay.",
        source: "U.S. EPA, 40 CFR Part 82, Subpart B",
        status: "available",
        href: "/epa-609/",
      },
    ],
  },
  {
    name: "Transportation and warehouse",
    icon: "truck",
    clusters: [
      {
        id: "cdl",
        name: "CDL federal rules (FMCSA)",
        summary: "The federal motor carrier safety rules in 49 CFR that CDL drivers must know.",
        source: "FMCSA, 49 CFR Parts 382 to 396",
        status: "available",
        href: "/cdl/",
      },
      {
        id: "forklift",
        name: "Forklift operator",
        summary:
          "OSHA's powered industrial truck rules: operator training, truck types, batteries, traveling, loading.",
        source: "OSHA, 29 CFR 1910.178 and 1926.602",
        status: "available",
        href: "/forklift/",
      },
    ],
  },
  {
    name: "Workplace safety",
    icon: "helmet",
    clusters: [
      {
        id: "osha",
        name: "OSHA construction safety",
        summary: "The construction safety rules behind the OSHA 10 and 30 course topics.",
        source: "OSHA, 29 CFR Part 1926",
        status: "available",
        href: "/osha/",
      },
      {
        id: "osha-general-industry",
        name: "OSHA general industry safety",
        summary: "The workplace safety rules behind the OSHA 10 and 30 general industry course topics.",
        source: "OSHA, 29 CFR Part 1910",
        status: "available",
        href: "/osha-general-industry/",
      },
      {
        id: "osha-crane",
        name: "OSHA crane operator (construction)",
        summary:
          "OSHA's construction crane rules on power lines, inspections, operation, signals, operator certification and hoisting personnel.",
        source: "OSHA, 29 CFR 1926 Subpart CC",
        status: "available",
        href: "/osha-crane/",
      },
    ],
  },
  {
    name: "Water and wastewater",
    icon: "drop",
    clusters: [
      {
        id: "water-operator",
        name: "Drinking water operator (federal rules)",
        summary: "The federal EPA drinking water rules that treatment and distribution operators work under.",
        source: "U.S. EPA, 40 CFR Parts 141 and 143",
        status: "available",
        href: "/water-operator/",
      },
      {
        id: "wastewater-operator",
        name: "Wastewater operator (federal rules)",
        summary: "The federal Clean Water Act rules that wastewater treatment operators work under.",
        source: "U.S. EPA, 40 CFR Parts 122, 133, 136, 403 and 503",
        status: "available",
        href: "/wastewater-operator/",
      },
    ],
  },
  {
    name: "Building trades",
    icon: "house",
    clusters: [
      {
        id: "lead-rrp",
        name: "EPA Lead-Safe Renovator (RRP)",
        summary:
          "The federal EPA lead-safe renovation, repair and painting rules for work on older homes and child-occupied facilities.",
        source: "U.S. EPA, 40 CFR Part 745",
        status: "available",
        href: "/lead-rrp/",
      },
      {
        id: "asbestos",
        name: "Asbestos (OSHA construction and EPA schools)",
        summary: "OSHA's construction asbestos standard and EPA's asbestos rules for schools (AHERA).",
        source: "OSHA 29 CFR 1926.1101; EPA 40 CFR Part 763 Subpart E",
        status: "available",
        href: "/asbestos/",
      },
    ],
  },
  {
    name: "Pest control",
    icon: "leaf",
    clusters: [
      {
        id: "pesticide-applicator",
        name: "Pesticide applicator (federal standards)",
        summary:
          "The federal EPA standards for certifying private and commercial applicators of restricted use pesticides.",
        source: "U.S. EPA, 40 CFR Part 171",
        status: "next",
      },
    ],
  },
  {
    name: "Aviation",
    icon: "drone",
    clusters: [
      {
        id: "faa-107",
        name: "FAA Part 107 remote pilot",
        summary: "The rules and knowledge areas behind the FAA Remote Pilot (drone) knowledge test.",
        source: "FAA, 14 CFR Parts 48, 89 and 107",
        status: "available",
        href: "/faa-107/",
      },
      {
        id: "faa-amt",
        name: "FAA aviation mechanic (A&P)",
        summary:
          "FAA rules for mechanic certificates and ratings, privileges, inspection authorization and maintenance records.",
        source: "FAA, 14 CFR Part 65 Subpart D and Part 43",
        status: "available",
        href: "/faa-amt/",
      },
    ],
  },
];

export const ALL_CLUSTERS: Cluster[] = FAMILIES.flatMap((f) => f.clusters);

/** Cluster with the family it belongs to, for cards that show the family icon. */
export const WITH_FAMILY = FAMILIES.flatMap((f) => f.clusters.map((c) => ({ ...c, family: f })));

export const STATUS_LABEL: Record<ClusterStatus, string> = {
  available: "Available",
  "in-progress": "In progress",
  next: "Coming next",
  planned: "Planned",
};
