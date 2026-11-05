// Official text from 29 CFR Part 1910 (eCFR as of Nov 3, 2026, data/sources/ecfr) used by the OSHA general industry
// tools. Each tool page calls assertQuotes("osha-general-industry", ...) on these, so the build fails if one is not in
// the snapshot.

import type { RuleSource } from "@/lib/epa608-rules";

const B = "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-G/section-1910.95";

export const RNOISE = {
  doseMixed: {
    title: "29 CFR 1910.95, Appendix A (mandatory), I(1)(ii)",
    url: B,
    quote:
      "When the workshift noise exposure is composed of two or more periods of noise at different levels, the total noise dose over the work day is given by: D = 100(C1 / T1 + C2 / T2 + Cn / Tn), where Cn indicates the total time of exposure at a specific noise level, and Tn indicates the reference duration for that level as given by Table G-16a.",
  },
  doseConstant: {
    title: "29 CFR 1910.95, Appendix A (mandatory), I(1)(i)",
    url: B,
    quote:
      "When the sound level, L, is constant over the entire work shift, the noise dose, D, in percent, is given by: D = 100 C/T where C is the total length of the work day, in hours, and T is the reference duration corresponding to the measured sound level, L, as given in Table G-16a or by the formula shown as a footnote to that table.",
  },
  twa: {
    title: "29 CFR 1910.95, Appendix A (mandatory), I(2)",
    url: B,
    quote:
      "The eight-hour time-weighted average sound level (TWA), in decibels, may be computed from the dose, in percent, by means of the formula: TWA = 16.61 log10 (D/100) + 90.",
  },
  hcp: {
    title: "29 CFR 1910.95(c)(1)",
    url: B,
    quote:
      "The employer shall administer a continuing, effective hearing conservation program, as described in paragraphs (c) through (o) of this section, whenever employee noise exposures equal or exceed an 8-hour time-weighted average sound level (TWA) of 85 decibels measured on the A scale (slow response) or, equivalently, a dose of fifty percent. For purposes of the hearing conservation program, employee noise exposures shall be computed in accordance with appendix A and Table G-16a, and without regard to any attenuation provided by the use of personal protective equipment.",
  },
  integrate: {
    title: "29 CFR 1910.95(d)(2)(i)",
    url: B,
    quote:
      "All continuous, intermittent and impulsive sound levels from 80 decibels to 130 decibels shall be integrated into the noise measurements.",
  },
  controls: {
    title: "29 CFR 1910.95(b)(1)",
    url: B,
    quote:
      "When employees are subjected to sound exceeding those listed in Table G-16, feasible administrative or engineering controls shall be utilized. If such controls fail to reduce sound levels within the levels of Table G-16, personal protective equipment shall be provided and used to reduce sound levels within the levels of the table.",
  },
} satisfies Record<string, RuleSource>;

/**
 * Table G-16a of 29 CFR 1910.95 Appendix A (mandatory): A-weighted sound level L (dB) → reference duration T (hours),
 * copied row by row from the dated snapshot. Only whole-decibel levels from 80 to 130 are listed.
 */
export const TABLE_G16A: Record<number, number> = {
  80: 32,
  81: 27.9,
  82: 24.3,
  83: 21.1,
  84: 18.4,
  85: 16,
  86: 13.9,
  87: 12.1,
  88: 10.6,
  89: 9.2,
  90: 8,
  91: 7.0,
  92: 6.1,
  93: 5.3,
  94: 4.6,
  95: 4,
  96: 3.5,
  97: 3.0,
  98: 2.6,
  99: 2.3,
  100: 2,
  101: 1.7,
  102: 1.5,
  103: 1.3,
  104: 1.1,
  105: 1,
  106: 0.87,
  107: 0.76,
  108: 0.66,
  109: 0.57,
  110: 0.5,
  111: 0.44,
  112: 0.38,
  113: 0.33,
  114: 0.29,
  115: 0.25,
  116: 0.22,
  117: 0.19,
  118: 0.16,
  119: 0.14,
  120: 0.125,
  121: 0.11,
  122: 0.095,
  123: 0.082,
  124: 0.072,
  125: 0.063,
  126: 0.054,
  127: 0.047,
  128: 0.041,
  129: 0.036,
  130: 0.031,
};
