// Official text from 29 CFR 1926.1408 (eCFR as of Nov 4, 2026, data/sources/ecfr) used by the crane power line tool.
// The tool page calls assertQuotes("osha-crane", ...) on these, so the build fails if one is not in the snapshot.
// TABLE_A transcribes the rows of Table A to 1926.1408 that fall within the section's "up to 350 kV" heading.

import type { RuleSource } from "@/lib/epa608-rules";

const U = "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1926/subpart-CC/section-1926.1408";

export const R1408 = {
  heading: {
    title: "29 CFR 1926.1408 (section heading)",
    url: U,
    quote: "§ 1926.1408 Power line safety (up to 350 kV)—equipment operations.",
  },
  twenty: {
    title: "29 CFR 1926.1408(a)(2)",
    url: U,
    quote:
      "Determine if any part of the equipment, load line or load (including rigging and lifting accessories), if operated up to the equipment's maximum working radius in the work zone, could get closer than 20 feet to a power line. If so, the employer must meet the requirements in Option (1), Option (2), or Option (3) of this section, as follows:",
  },
  option1: {
    title: "29 CFR 1926.1408(a)(2)(i)",
    url: U,
    quote:
      "Option (1)—Deenergize and ground. Confirm from the utility owner/operator that the power line has been deenergized and visibly grounded at the worksite.",
  },
  option2: {
    title: "29 CFR 1926.1408(a)(2)(ii)",
    url: U,
    quote:
      "Option (2) —20 foot clearance. Ensure that no part of the equipment, load line, or load (including rigging and lifting accessories), gets closer than 20 feet to the power line by implementing the measures specified in paragraph (b) of this section.",
  },
  option3: {
    title: "29 CFR 1926.1408(a)(2)(iii)(A)",
    url: U,
    quote: "Determine the line's voltage and the minimum approach distance permitted under Table A (see § 1926.1408).",
  },
  voltage: {
    title: "29 CFR 1926.1408(c)",
    url: U,
    quote:
      "Where Option (3) of this section is used, the utility owner/operator of the power lines must provide the requested voltage information within two working days of the employer's request.",
  },
  note: {
    title: "29 CFR 1926.1408, Table A note",
    url: U,
    quote:
      "NOTE: The value that follows “to” is up to and includes that value. For example, over 50 to 200 means up to and including 200kV.",
  },
} satisfies Record<string, RuleSource>;

/** Table A rows within 1926.1408's "up to 350 kV" heading: upper bound (kV, inclusive) and clearance (feet). */
export const TABLE_A = [
  { label: "up to 50", max: 50, feet: 10 },
  { label: "over 50 to 200", max: 200, feet: 15 },
  { label: "over 200 to 350", max: 350, feet: 20 },
] as const;
