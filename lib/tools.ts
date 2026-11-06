// Every published tool. The /tools/ page, the sitemap and cluster pages read this list.

export type Tool = { slug: string; cluster: string; name: string; href: string; summary: string };

export const TOOLS: Tool[] = [
  {
    slug: "leak-rate-calculator",
    cluster: "epa-608",
    name: "EPA 608 leak rate calculator",
    href: "/epa-608/tools/leak-rate-calculator/",
    summary:
      "Work out an appliance's leak rate with either method in 40 CFR 82.152 and compare it with the leak rates in § 82.157.",
  },
  {
    slug: "evacuation-levels",
    cluster: "epa-608",
    name: "EPA 608 evacuation level finder",
    href: "/epa-608/tools/evacuation-levels/",
    summary:
      "Find the required evacuation level before opening or disposing of an appliance, from Table 1 of § 82.156 and the small appliance rules.",
  },
  {
    slug: "certification-checker",
    cluster: "epa-609",
    name: "EPA 609 certification checker",
    href: "/epa-609/tools/certification-checker/",
    summary: "Three questions to see whether the Section 609 certification rule in 40 CFR 82.34(a) covers your work.",
  },
  {
    slug: "equipment-standards",
    cluster: "epa-609",
    name: "EPA 609 equipment standards finder",
    href: "/epa-609/tools/equipment-standards/",
    summary:
      "Find which standard 40 CFR 82.36(a) requires for MVAC refrigerant handling equipment, by refrigerant and job.",
  },
  {
    slug: "ladder-angle",
    cluster: "osha",
    name: "OSHA ladder angle calculator",
    href: "/osha/tools/ladder-angle/",
    summary:
      "Work out the base distance for a non-self-supporting ladder from its working length, using the one-quarter and one-eighth rules in 29 CFR 1926.1053(b)(5).",
  },
  {
    slug: "excavation-checker",
    cluster: "osha",
    name: "OSHA excavation checker",
    href: "/osha/tools/excavation-checker/",
    summary:
      "Enter an excavation's depth and conditions to see what 29 CFR 1926.651 and 1926.652 say about cave-in protection, a way out and atmosphere testing.",
  },
  {
    slug: "scaffold-power-line-clearance",
    cluster: "osha",
    name: "OSHA scaffold power line clearance",
    href: "/osha/tools/scaffold-power-line-clearance/",
    summary:
      "Find the minimum distance between a scaffold and exposed, energized power lines from the table in 29 CFR 1926.451(f)(6), by line type and voltage.",
  },
  {
    slug: "noise-dose-calculator",
    cluster: "osha-general-industry",
    name: "OSHA noise dose calculator",
    href: "/osha-general-industry/tools/noise-dose-calculator/",
    summary:
      "Work out a noise dose and 8-hour TWA from sound levels and hours with Table G-16a of 29 CFR 1910.95, and compare it with the 85 dBA action level.",
  },
  {
    slug: "hours-of-service-calculator",
    cluster: "cdl",
    name: "CDL hours of service calculator",
    href: "/cdl/tools/hours-of-service-calculator/",
    summary:
      "See how much driving time is left under the property-carrying limits in 49 CFR 395.3: 11 hours, the 14-hour period, the 30-minute break and 60/70 hours.",
  },
  {
    slug: "part-107-flight-limits",
    cluster: "faa-107",
    name: "Part 107 flight limits checker",
    href: "/faa-107/tools/part-107-flight-limits/",
    summary:
      "Check a planned drone flight against 14 CFR 107.51: groundspeed, altitude and the structure exception, flight visibility and cloud clearance.",
  },
  {
    slug: "lead-copper-90th-percentile",
    cluster: "water-operator",
    name: "Lead and copper 90th percentile calculator",
    href: "/water-operator/tools/lead-copper-90th-percentile/",
    summary:
      "Find the 90th percentile of lead or copper tap results the way 40 CFR 141.80(c)(3) describes it and compare it with the 2024-revised action levels.",
  },
  {
    slug: "secondary-treatment-check",
    cluster: "wastewater-operator",
    name: "Secondary treatment check",
    href: "/wastewater-operator/tools/secondary-treatment-check/",
    summary:
      "Compare 30-day and 7-day effluent averages and percent removal for BOD5, CBOD5 or SS with the levels in 40 CFR 133.102.",
  },
];
