// Official text from 40 CFR 745 Subpart E (eCFR as of Nov 4, 2026, data/sources/ecfr) used by the RRP applicability
// checker. The tool page calls assertQuotes("lead-rrp", ...) on these, so the build fails if one is not in the snapshot.

import type { RuleSource } from "@/lib/epa608-rules";

const E = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-R/part-745/subpart-E";

export const RRRP = {
  applies: {
    title: "40 CFR 745.82(a)",
    url: `${E}/section-745.82`,
    quote:
      "This subpart applies to all renovations performed for compensation in target housing and child-occupied facilities, except for the following:",
  },
  determination: {
    title: "40 CFR 745.82(a)(1)",
    url: `${E}/section-745.82`,
    quote:
      "Renovations in target housing or child-occupied facilities in which a written determination has been made by an inspector or risk assessor",
  },
  testKit: {
    title: "40 CFR 745.82(a)(2)",
    url: `${E}/section-745.82`,
    quote:
      "Renovations in target housing or child-occupied facilities in which a certified renovator, using an EPA recognized test kit as defined in § 745.83 and following the kit manufacturer's instructions, has tested each component affected by the renovation and determined that the components are free of paint or other surface coatings that contain lead equal to or in excess of 1.0 mg/cm2 or 0.5% by weight.",
  },
  chip: {
    title: "40 CFR 745.82(a)(3)",
    url: `${E}/section-745.82`,
    quote:
      "Renovations in target housing or child-occupied facilities in which a certified renovator has collected a paint chip sample from each painted component affected by the renovation and a laboratory recognized by EPA pursuant to section 405(b) of TSCA as being capable of performing analyses for lead compounds in paint chip samples has determined that the samples are free of paint or other surface coatings that contain lead equal to or in excess of 1.0 mg/cm2 or 0.5% by weight.",
  },
  emergency: {
    title: "40 CFR 745.82(b)",
    url: `${E}/section-745.82`,
    quote:
      "Emergency renovations other than interim controls are also exempt from the warning sign, containment, waste handling, training, and certification requirements in §§ 745.85, 745.89, and 745.90 to the extent necessary to respond to the emergency.",
  },
  targetHousing: {
    title: "40 CFR 745.103, Target housing",
    url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-R/part-745/subpart-F/section-745.103",
    quote:
      "Target housing means any housing constructed prior to 1978, except housing for the elderly or persons with disabilities or any 0-bedroom dwelling (unless any child who is less than 6 years of age resides or is expected to reside in such housing).",
  },
  cof: {
    title: "40 CFR 745.83, Child-occupied facility",
    url: `${E}/section-745.83`,
    quote:
      "Child-occupied facility means a building, or portion of a building, constructed prior to 1978, visited regularly by the same child, under 6 years of age, on at least two different days within any week (Sunday through Saturday period), provided that each day's visit lasts at least 3 hours and the combined weekly visits last at least 6 hours, and the combined annual visits last at least 60 hours.",
  },
  minor: {
    title: "40 CFR 745.83, Minor repair and maintenance activities",
    url: `${E}/section-745.83`,
    quote:
      "Minor repair and maintenance activities are activities, including minor heating, ventilation or air conditioning work, electrical work, and plumbing, that disrupt 6 square feet or less of painted surface per room for interior activities or 20 square feet or less of painted surface for exterior activities where none of the work practices prohibited or restricted by § 745.85(a)(3) are used and where the work does not involve window replacement or demolition of painted surface areas.",
  },
  sameJob: {
    title: "40 CFR 745.83, Minor repair and maintenance activities",
    url: `${E}/section-745.83`,
    quote:
      "Jobs, other than emergency renovations, performed in the same room within the same 30 days must be considered the same job for the purpose of determining whether the job is a minor repair and maintenance activity.",
  },
  notRenovation: {
    title: "40 CFR 745.83, Renovation",
    url: `${E}/section-745.83`,
    quote: "The term renovation does not include minor repair and maintenance activities.",
  },
} satisfies Record<string, RuleSource>;
