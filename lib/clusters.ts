// Every certification goraedu covers or plans to cover (roadmap order). One entry per cluster.
// A cluster gets an `href` only once its overview page exists; until then it shows its status, never a dead link.

export type ClusterStatus = "in-progress" | "next" | "planned";

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

export type FamilyIcon = "hvac" | "truck" | "helmet" | "car" | "bolt" | "house" | "drone";
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
        status: "in-progress",
        href: "/epa-608/",
      },
      {
        id: "epa-609",
        name: "EPA Section 609",
        summary: "For technicians who service motor vehicle air conditioning.",
        source: "U.S. EPA",
        status: "next",
      },
      {
        id: "hvac",
        name: "HVAC certifications",
        summary: "Exams that HVAC technicians take after EPA 608 as their careers grow.",
        source: "Official exam outlines",
        status: "planned",
      },
    ],
  },
  {
    name: "Transportation and warehouse",
    icon: "truck",
    clusters: [
      {
        id: "cdl",
        name: "Commercial driver's license (CDL)",
        summary: "Knowledge tests for the commercial learner's permit and endorsements.",
        source: "FMCSA and state driver manuals",
        status: "next",
      },
      {
        id: "forklift",
        name: "Forklift operator",
        summary: "Training topics for powered industrial truck operators.",
        source: "OSHA, 29 CFR 1910.178",
        status: "planned",
      },
    ],
  },
  {
    name: "Workplace safety",
    icon: "helmet",
    clusters: [
      {
        id: "osha",
        name: "OSHA 10 and OSHA 30",
        summary: "Safety awareness courses for construction and general industry workers.",
        source: "OSHA",
        status: "next",
      },
    ],
  },
  {
    name: "Automotive",
    icon: "car",
    clusters: [
      {
        id: "ase",
        name: "ASE automotive tests",
        summary: "Certification tests for automotive service technicians.",
        source: "Official test outlines",
        status: "planned",
      },
    ],
  },
  {
    name: "Electrical, energy and water",
    icon: "bolt",
    clusters: [
      {
        id: "electrician",
        name: "Electrician licensing",
        summary: "Journeyman and master electrician exam topics.",
        source: "State licensing boards",
        status: "planned",
      },
      {
        id: "solar",
        name: "Solar PV",
        summary: "Entry-level solar photovoltaic credential topics.",
        source: "Official exam outlines",
        status: "planned",
      },
      {
        id: "water",
        name: "Water and wastewater operator",
        summary: "Operator certification exams for treatment and distribution systems.",
        source: "U.S. EPA and state programs",
        status: "planned",
      },
    ],
  },
  {
    name: "Building trades",
    icon: "house",
    clusters: [
      {
        id: "plumbing",
        name: "Plumbing licensing",
        summary: "Journeyman and master plumber exam topics.",
        source: "State licensing boards",
        status: "planned",
      },
      {
        id: "welding",
        name: "Welding",
        summary: "Written exam topics for welders and welding inspectors.",
        source: "Official exam outlines",
        status: "planned",
      },
      {
        id: "home-inspector",
        name: "Home inspector",
        summary: "National home inspector exam topics.",
        source: "Official exam outlines",
        status: "planned",
      },
    ],
  },
  {
    name: "Aviation",
    icon: "drone",
    clusters: [
      {
        id: "faa-107",
        name: "FAA Part 107 drone pilot",
        summary: "The knowledge test for commercial small drone operators.",
        source: "FAA, 14 CFR Part 107",
        status: "planned",
      },
    ],
  },
];

export const ALL_CLUSTERS: Cluster[] = FAMILIES.flatMap((f) => f.clusters);

/** Cluster with the family it belongs to, for cards that show the family icon. */
export const WITH_FAMILY = FAMILIES.flatMap((f) => f.clusters.map((c) => ({ ...c, family: f })));

export const STATUS_LABEL: Record<ClusterStatus, string> = {
  "in-progress": "In progress",
  next: "Coming next",
  planned: "Planned",
};
