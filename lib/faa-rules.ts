// Official text from 14 CFR Part 107 (eCFR as of Nov 3, 2026, data/sources/ecfr) used by the Part 107 flight limits
// tool. The tool page calls assertQuotes("faa-107", ...) on these, so the build fails if one is not in the snapshot.

import type { RuleSource } from "@/lib/epa608-rules";

const B = "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107";

export const R107 = {
  scope: {
    title: "14 CFR 107.51",
    url: `${B}/subpart-B/section-107.51`,
    quote:
      "A remote pilot in command and the person manipulating the flight controls of the small unmanned aircraft system must comply with all of the following operating limitations when operating a small unmanned aircraft system:",
  },
  speed: {
    title: "14 CFR 107.51(a)",
    url: `${B}/subpart-B/section-107.51`,
    quote: "The groundspeed of the small unmanned aircraft may not exceed 87 knots (100 miles per hour).",
  },
  altitude: {
    title: "14 CFR 107.51(b)",
    url: `${B}/subpart-B/section-107.51`,
    quote:
      "The altitude of the small unmanned aircraft cannot be higher than 400 feet above ground level, unless the small unmanned aircraft: (1) Is flown within a 400-foot radius of a structure; and (2) Does not fly higher than 400 feet above the structure's immediate uppermost limit.",
  },
  visibility: {
    title: "14 CFR 107.51(c)",
    url: `${B}/subpart-B/section-107.51`,
    quote:
      "The minimum flight visibility, as observed from the location of the control station must be no less than 3 statute miles.",
  },
  clouds: {
    title: "14 CFR 107.51(d)",
    url: `${B}/subpart-B/section-107.51`,
    quote:
      "The minimum distance of the small unmanned aircraft from clouds must be no less than: (1) 500 feet below the cloud; and (2) 2,000 feet horizontally from the cloud.",
  },
  waiver: {
    title: "14 CFR 107.205(i)",
    url: `${B}/subpart-E/section-107.205`,
    quote: "Section 107.51—Operating limitations for small unmanned aircraft.",
  },
} satisfies Record<string, RuleSource>;
