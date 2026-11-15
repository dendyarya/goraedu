// Trade hubs: trades whose license or certification exam is built on copyrighted codes or a private exam (NEC, plumbing
// codes, AWS, NABCEP), so goraedu does not write questions for that exam. Each hub points to the practice sets we
// already have on the federal rules that apply to the work. Every fact quote is checked against the cluster's dated
// snapshot at build time (assertQuotes), and every set or tool listed must exist.

export type HubFact = { text: string; quote: string; cite: string; url: string; cluster: string };
export type HubSetRef = { cluster: string; slug: string; why: string };
export type Hub = {
  id: string;
  href: string;
  name: string;
  metaTitle: string;
  description: string;
  title: string;
  lead: string;
  notCovered: string;
  sets: HubSetRef[];
  tools: string[];
  facts: HubFact[];
  checked: string;
};

const K = "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1926";

export const HUBS: Hub[] = [
  {
    id: "electrician",
    href: "/electrician/",
    name: "Electrician",
    metaTitle: "Electrician: Free OSHA Electrical Safety Practice Questions (29 CFR 1926 Subpart K and 1910 Subpart S)",
    description:
      "Free practice questions and study guides on the OSHA electrical safety rules electricians work under, with the rule's exact words. Not NEC or license exam prep.",
    title: "Electrician: OSHA electrical safety rules",
    lead: "Electrician licenses are issued by States and local governments, and their exams are built on electrical codes that goraedu does not cover. What we do cover is the federal OSHA electrical safety rules for construction and general industry, with every answer linked to the regulation.",
    notCovered:
      "The National Electrical Code (NEC), State and local electrical codes, license exams and apprenticeship coursework are not covered. These pages are not electrician license exam prep.",
    sets: [
      { cluster: "osha", slug: "electrical", why: "Construction electrical rules, 29 CFR 1926 Subpart K" },
      {
        cluster: "osha-general-industry",
        slug: "electrical",
        why: "General industry electrical rules, 29 CFR 1910 Subpart S",
      },
      {
        cluster: "osha-general-industry",
        slug: "lockout-tagout",
        why: "Controlling hazardous energy, 29 CFR 1910.147",
      },
      {
        cluster: "osha-general-industry",
        slug: "power-generation-distribution",
        why: "Electric power generation, transmission and distribution, 29 CFR 1910.269",
      },
    ],
    tools: ["scaffold-power-line-clearance"],
    facts: [
      {
        text: "On a construction site, no one may work close enough to contact an electric power circuit unless they are protected by deenergizing and grounding it or by guarding it effectively.",
        quote:
          "No employer shall permit an employee to work in such proximity to any part of an electric power circuit that the employee could contact the electric power circuit in the course of work, unless the employee is protected against electric shock by deenergizing the circuit and grounding it or by guarding it effectively by insulation or other means.",
        cite: "29 CFR 1926.416(a)(1)",
        url: `${K}/subpart-K/section-1926.416`,
        cluster: "osha",
      },
    ],
    checked: "2026-11-15",
  },
  {
    id: "welding",
    href: "/welding/",
    name: "Welding",
    metaTitle:
      "Welding: Free OSHA Welding, Cutting and Brazing Practice Questions (29 CFR 1926 Subpart J and 1910 Subpart Q)",
    description:
      "Free practice questions and study guides on the OSHA welding, cutting and brazing rules for construction and general industry. Not welder certification test prep.",
    title: "Welding: OSHA welding, cutting and brazing rules",
    lead: "Welder certification is run by private bodies and employers through welding tests that goraedu does not cover. What we do cover is the federal OSHA rules for welding, cutting and brazing on construction sites and in general industry, with every answer linked to the regulation.",
    notCovered:
      "Welder certification tests, welding procedure and performance qualification, private welding codes and standards, and welding technique are not covered. These pages are not welder certification prep.",
    sets: [
      { cluster: "osha", slug: "welding-cutting", why: "Construction welding and cutting, 29 CFR 1926 Subpart J" },
      {
        cluster: "osha-general-industry",
        slug: "welding",
        why: "General industry welding, cutting and brazing, 29 CFR 1910 Subpart Q",
      },
      {
        cluster: "osha-general-industry",
        slug: "fire-protection",
        why: "Fire protection, 29 CFR 1910 Subpart L",
      },
      { cluster: "osha-general-industry", slug: "ppe", why: "Personal protective equipment, 29 CFR 1910 Subpart I" },
    ],
    tools: [],
    facts: [
      {
        text: "Where welding or cutting is done on a construction site, suitable fire extinguishing equipment must be immediately available and ready for use.",
        quote:
          "Suitable fire extinguishing equipment shall be immediately available in the work area and shall be maintained in a state of readiness for instant use.",
        cite: "29 CFR 1926.352(d)",
        url: `${K}/subpart-J/section-1926.352`,
        cluster: "osha",
      },
    ],
    checked: "2026-11-15",
  },
  {
    id: "solar-pv",
    href: "/solar-pv/",
    name: "Solar PV installer",
    metaTitle: "Solar PV Installer: Free OSHA Fall Protection, Ladder and Electrical Practice Questions",
    description:
      "Free practice questions and study guides on the OSHA construction rules solar installers work under: fall protection, ladders and electrical safety. Not certification exam prep.",
    title: "Solar PV installer: OSHA construction safety rules",
    lead: "Solar PV certifications are run by private bodies through exams that goraedu does not cover. What we do cover is the federal OSHA construction rules that apply to rooftop and ground-mount installation work, with every answer linked to the regulation.",
    notCovered:
      "Solar certification exams, electrical codes, system design, product listings and utility interconnection rules are not covered. These pages are not solar certification exam prep.",
    sets: [
      { cluster: "osha", slug: "fall-protection", why: "Fall protection, 29 CFR 1926 Subpart M" },
      { cluster: "osha", slug: "stairways-ladders", why: "Stairways and ladders, 29 CFR 1926 Subpart X" },
      { cluster: "osha", slug: "electrical", why: "Construction electrical rules, 29 CFR 1926 Subpart K" },
      { cluster: "osha", slug: "ppe", why: "Personal protective equipment, 29 CFR 1926 Subpart E" },
    ],
    tools: ["ladder-angle"],
    facts: [
      {
        text: "On a construction site, a worker on a surface with an unprotected side or edge 6 feet or more above a lower level must be protected by guardrails, a safety net or a personal fall arrest system.",
        quote:
          "Each employee on a walking/working surface (horizontal and vertical surface) with an unprotected side or edge which is 6 feet (1.8 m) or more above a lower level shall be protected from falling by the use of guardrail systems, safety net systems, or personal fall arrest systems.",
        cite: "29 CFR 1926.501(b)(1)",
        url: `${K}/subpart-M/section-1926.501`,
        cluster: "osha",
      },
    ],
    checked: "2026-11-15",
  },
  {
    id: "plumbing",
    href: "/plumbing/",
    name: "Plumbing",
    metaTitle: "Plumbing: Free Practice Questions on EPA Lead-Free Rules and OSHA Excavation Safety",
    description:
      "Free practice questions and study guides on EPA's lead-free rules for drinking water plumbing (40 CFR 143 Subpart B) and OSHA trenching rules. Not plumbing license exam prep.",
    title: "Plumbing: EPA lead-free rules and OSHA trenching",
    lead: "Plumber licenses are issued by States and local governments, and their exams are built on plumbing codes that goraedu does not cover. What we do cover is EPA's federal lead-free rules for pipes, fittings, fixtures, solder and flux in drinking water systems, and OSHA's excavation rules for trench work.",
    notCovered:
      "Plumbing codes, State and local plumbing rules, license exams, installation methods and apprenticeship coursework are not covered. These pages are not plumbing license exam prep.",
    sets: [
      {
        cluster: "water-operator",
        slug: "secondary-standards-lead-free",
        why: "Lead-free pipes, fittings, fixtures, solder and flux, 40 CFR 143 Subpart B",
      },
      { cluster: "osha", slug: "excavations", why: "Excavations and trenching, 29 CFR 1926 Subpart P" },
      {
        cluster: "osha-general-industry",
        slug: "confined-spaces",
        why: "Permit-required confined spaces, 29 CFR 1910.146",
      },
    ],
    tools: ["excavation-checker"],
    facts: [
      {
        text: "To be lead free under the federal rule, the wetted surfaces of pipes, pipe fittings, plumbing fittings and fixtures may contain no more than a weighted average of 0.25 percent lead.",
        quote:
          "Not more than a weighted average of 0.25 percent lead when used with respect to the wetted surfaces of pipes, pipe fittings, plumbing fittings, and fixtures.",
        cite: "40 CFR 143.12(a)(2)",
        url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-D/part-143/subpart-B/section-143.12",
        cluster: "water-operator",
      },
      {
        text: "In an excavation, each worker must be protected from cave-ins by an adequate protective system, except in the cases the rule lists.",
        quote:
          "Each employee in an excavation shall be protected from cave-ins by an adequate protective system designed in accordance with paragraph (b) or (c) of this section except when:",
        cite: "29 CFR 1926.652(a)(1)",
        url: `${K}/subpart-P/section-1926.652`,
        cluster: "osha",
      },
    ],
    checked: "2026-11-15",
  },
];

export const hubById = (id: string) => {
  const h = HUBS.find((x) => x.id === id);
  if (!h) throw new Error(`hub ${id} not found`);
  return h;
};
