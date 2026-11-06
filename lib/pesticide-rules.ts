// Official text from 40 CFR 171.107(a) (eCFR as of Nov 4, 2026, data/sources/ecfr) used by the certification expiry
// tool. The tool page calls assertQuotes("pesticide-applicator", ...) on these, so the build fails if one is missing.

import type { RuleSource } from "@/lib/epa608-rules";

const U = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-171/subpart-B/section-171.";

export const R171 = {
  expiry: {
    title: "40 CFR 171.107(a)",
    url: `${U}107`,
    quote:
      "Each commercial and private applicator certification shall expire five years after issuance, unless the applicator is recertified in accordance with this section. A certifying authority may establish a shorter certification period.",
  },
  continuity: {
    title: "40 CFR 171.107(a)",
    url: `${U}107`,
    quote:
      "In order for a certified applicator's certification to continue without interruption, the certified applicator must be recertified under this section before the expiration of his or her current certification.",
  },
} satisfies Record<string, RuleSource>;
