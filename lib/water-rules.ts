// Official text from 40 CFR 141 Subpart I (eCFR as of Nov 3, 2026, data/sources/ecfr) used by the lead and copper 90th
// percentile tool. The tool page calls assertQuotes("water-operator", ...) on these, so the build fails if one is not
// in the snapshot. This is the 2024-revised text; 141.80(a)(3) sets its compliance date.

import type { RuleSource } from "@/lib/epa608-rules";

const U = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-D/part-141/subpart-I/section-141.80";

export const RLCR = {
  effective: {
    title: "40 CFR 141.80(a)(2)",
    url: U,
    quote: "The requirements of this subpart are effective as of December 30, 2024.",
  },
  compliance: {
    title: "40 CFR 141.80(a)(3)",
    url: U,
    quote:
      "Community water systems and non-transient non-community water systems must comply with the requirements of this subpart no later than November 1, 2027, except where otherwise specified in §§ 141.81, 141.84, 141.85, 141.86, and 141.90, or where an exemption in accordance with 40 CFR part 142, subpart C or F, has been issued by the Administrator.",
  },
  interim: {
    title: "40 CFR 141.80(a)(4)(i)",
    url: U,
    quote:
      "Between October 30, 2024, and November 1, 2027, community water systems and non-transient non-community water systems must comply with 40 CFR 141.2, 141.31(d), and 141.80 through 141.91, as codified on July 1, 2020,",
  },
  lead: {
    title: "40 CFR 141.80(c)(1)",
    url: U,
    quote:
      "The lead action level is exceeded if the 90th percentile concentration of lead as specified in paragraph (c)(3) of this section is greater than 0.010 mg/L.",
  },
  copper: {
    title: "40 CFR 141.80(c)(2)",
    url: U,
    quote:
      "The copper action level is exceeded if the 90th percentile concentration of copper as specified in paragraph (c)(3) of this section is greater than 1.3 mg/L.",
  },
  order: {
    title: "40 CFR 141.80(c)(3)(i)(A)",
    url: U,
    quote:
      "The results of all lead or copper samples taken during a tap sampling period and eligible for inclusion in the 90th percentile calculation under § 141.86(e) must be placed in ascending order from the sample with the lowest concentration of lead or copper to the sample with the highest concentration of lead or copper.",
  },
  multiply: {
    title: "40 CFR 141.80(c)(3)(i)(C)",
    url: U,
    quote:
      "The 90th percentile concentration is the concentration of lead or copper in the numbered sample yielded after multiplying the number of samples by 0.9 in paragraph (c)(3)(i)(B) of this section.",
  },
  five: {
    title: "40 CFR 141.80(c)(3)(i)(D)",
    url: U,
    quote:
      "For water systems that collect five samples per tap sampling period, the 90th percentile concentration is the average of the highest and second highest concentration from the results in paragraph (c)(3)(i)(A) of this section.",
  },
  fewer: {
    title: "40 CFR 141.80(c)(3)(i)(E)",
    url: U,
    quote:
      "For a water system that is allowed by the State to collect fewer than five samples in accordance with § 141.86(a)(2) or has failed to meet their required minimum number of samples and collected fewer than five samples, the sample result with the highest concentration from the results in paragraph (c)(3)(i)(A) of this section is considered the 90th percentile value.",
  },
  tiers: {
    title: "40 CFR 141.80(c)(3)(ii)(A)",
    url: U,
    quote:
      "For lead, water systems must include the higher of the first-liter and fifth-liter lead sample results at each Tier 1 and 2 site (or first-liter lead sample if tiering is based on premise plumbing) taken during the tap sampling period in paragraphs (c)(3)(ii)(B) through (D) of this section.",
  },
} satisfies Record<string, RuleSource>;
