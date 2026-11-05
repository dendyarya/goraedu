// Official text from 29 CFR Part 1926 (eCFR as of Nov 3, 2026, data/sources/ecfr) used by the OSHA tools.
// Each tool page calls assertQuotes("osha", ...) on these, so the build fails if one is not in the snapshot.

import type { RuleSource } from "@/lib/epa608-rules";

const B = "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1926";

export const ROSHA = {
  ladderAngle: {
    title: "29 CFR 1926.1053(b)(5)(i)",
    url: `${B}/subpart-X/section-1926.1053`,
    quote:
      "Non-self-supporting ladders shall be used at an angle such that the horizontal distance from the top support to the foot of the ladder is approximately one-quarter of the working length of the ladder (the distance along the ladder between the foot and the top support).",
  },
  ladderSpliced: {
    title: "29 CFR 1926.1053(b)(5)(ii)",
    url: `${B}/subpart-X/section-1926.1053`,
    quote:
      "Wood job-made ladders with spliced side rails shall be used at an angle such that the horizontal distance is one-eighth the working length of the ladder.",
  },
  ladderExtend: {
    title: "29 CFR 1926.1053(b)(1)",
    url: `${B}/subpart-X/section-1926.1053`,
    quote:
      "When portable ladders are used for access to an upper landing surface, the ladder side rails shall extend at least 3 feet (.9 m) above the upper landing surface to which the ladder is used to gain access;",
  },
  ladderSurface: {
    title: "29 CFR 1926.1053(b)(6)",
    url: `${B}/subpart-X/section-1926.1053`,
    quote: "Ladders shall be used only on stable and level surfaces unless secured to prevent accidental displacement.",
  },
  caveIn: {
    title: "29 CFR 1926.652(a)(1)",
    url: `${B}/subpart-P/section-1926.652`,
    quote:
      "Each employee in an excavation shall be protected from cave-ins by an adequate protective system designed in accordance with paragraph (b) or (c) of this section except when:",
  },
  stableRock: {
    title: "29 CFR 1926.652(a)(1)(i)",
    url: `${B}/subpart-P/section-1926.652`,
    quote: "Excavations are made entirely in stable rock; or",
  },
  under5: {
    title: "29 CFR 1926.652(a)(1)(ii)",
    url: `${B}/subpart-P/section-1926.652`,
    quote:
      "Excavations are less than 5 feet (1.52m) in depth and examination of the ground by a competent person provides no indication of a potential cave-in.",
  },
  egress: {
    title: "29 CFR 1926.651(c)(2)",
    url: `${B}/subpart-P/section-1926.651`,
    quote:
      "A stairway, ladder, ramp or other safe means of egress shall be located in trench excavations that are 4 feet (1.22 m) or more in depth so as to require no more than 25 feet (7.62 m) of lateral travel for employees.",
  },
  atmosphere: {
    title: "29 CFR 1926.651(g)(1)(i)",
    url: `${B}/subpart-P/section-1926.651`,
    quote:
      "Where oxygen deficiency (atmospheres containing less than 19.5 percent oxygen) or a hazardous atmosphere exists or could reasonably be expected to exist, such as in excavations in landfill areas or excavations in areas where hazardous substances are stored nearby, the atmospheres in the excavation shall be tested before employees enter excavations greater than 4 feet (1.22 m) in depth.",
  },
  scaffoldLines: {
    title: "29 CFR 1926.451(f)(6)",
    url: `${B}/subpart-L/section-1926.451`,
    quote:
      "Scaffolds shall not be erected, used, dismantled, altered, or moved such that they or any conductive material handled on them might come closer to exposed and energized power lines than as follows:",
  },
  insulatedRows: {
    title: "29 CFR 1926.451(f)(6), insulated lines",
    url: `${B}/subpart-L/section-1926.451`,
    quote:
      "Insulated lines voltage Less than 300 volts Minimum distance Alternatives 3 feet (0.9 m) Insulated lines voltage Minimum distance 300 volts to 50 kv 10 feet (3.1m) More than 50 kv 10 feet (3.1 m) plus 0.4 inches (1.0 cm) for each 1 kv over 50 kv",
  },
  uninsulatedRows: {
    title: "29 CFR 1926.451(f)(6), uninsulated lines",
    url: `${B}/subpart-L/section-1926.451`,
    quote:
      "Uninsulated lines voltage Minimum distance Less than 50 kv 10 feet (3.1 m) More than 50 kv 10 feet (3.1 m) plus 0.4 inches (1.0 cm) for each 1 kv over 50 kv",
  },
  alternative: {
    title: "29 CFR 1926.451(f)(6), Alternatives column",
    url: `${B}/subpart-L/section-1926.451`,
    quote: "2 times the length of the line insulator, but never less than 10 feet (3.1 m).",
  },
  closerException: {
    title: "29 CFR 1926.451(f)(6), exception",
    url: `${B}/subpart-L/section-1926.451`,
    quote:
      "Scaffolds and materials may be closer to power lines than specified above where such clearance is necessary for performance of work, and only after the utility company, or electrical system operator, has been notified of the need to work closer and the utility company, or electrical system operator, has deenergized the lines, relocated the lines, or installed protective coverings to prevent accidental contact with the lines.",
  },
} satisfies Record<string, RuleSource>;

/** Feet and inches, e.g. 10.75 → "10 ft 9 in". */
export function feetInches(ft: number): string {
  const totalIn = Math.round(ft * 12 * 10) / 10;
  const f = Math.floor(totalIn / 12);
  const i = Math.round((totalIn - f * 12) * 10) / 10;
  return i ? `${f} ft ${i} in` : `${f} ft`;
}
