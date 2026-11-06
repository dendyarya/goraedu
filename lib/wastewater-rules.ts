// Official text from 40 CFR Part 133 (eCFR as of Nov 4, 2026, data/sources/ecfr) used by the secondary treatment
// checker. The tool page calls assertQuotes("wastewater-operator", ...) on these, so the build fails if one is not in
// the snapshot.

import type { RuleSource } from "@/lib/epa608-rules";

const P = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-D/part-133";

export const R133 = {
  intro: {
    title: "40 CFR 133.102",
    url: `${P}/section-133.102`,
    quote:
      "The following paragraphs describe the minimum level of effluent quality attainable by secondary treatment in terms of the parameters—BOD5, SS and pH. All requirements for each parameter shall be achieved except as provided for in §§ 133.103 and 133.105.",
  },
  avg30: {
    title: "40 CFR 133.101(b)",
    url: `${P}/section-133.101`,
    quote:
      "30-day average. The arithmetic mean of pollutant parameter values of samples collected in a period of 30 consecutive days.",
  },
  avg7: {
    title: "40 CFR 133.101(a)",
    url: `${P}/section-133.101`,
    quote:
      "7-day average. The arithmetic mean of pollutant parameter values for samples collected in a period of 7 consecutive days.",
  },
  removal: {
    title: "40 CFR 133.101(j)",
    url: `${P}/section-133.101`,
    quote:
      "Percent removal. A percentage expression of the removal efficiency across a treatment plant for a given pollutant parameter, as determined from the 30-day average values of the raw wastewater influent pollutant concentrations to the facility and the 30-day average values of the effluent pollutant concentrations for a given time period.",
  },
  bod: {
    title: "40 CFR 133.102(a)(1)–(3)",
    url: `${P}/section-133.102`,
    quote:
      "(1) The 30-day average shall not exceed 30 mg/l. (2) The 7-day average shall not exceed 45 mg/l. (3) The 30-day average percent removal shall not be less than 85 percent.",
  },
  cbod: {
    title: "40 CFR 133.102(a)(4)",
    url: `${P}/section-133.102`,
    quote:
      "At the option of the NPDES permitting authority, in lieu of the parameter BOD5 and the levels of the effluent quality specified in paragraphs (a)(1), (a)(2) and (a)(3), the parameter CBOD5 may be substituted with the following levels of the CBOD5 effluent quality provided: (i) The 30-day average shall not exceed 25 mg/l. (ii) The 7-day average shall not exceed 40 mg/l. (iii) The 30-day average percent removal shall not be less than 85 percent.",
  },
  ss: {
    title: "40 CFR 133.102(b)",
    url: `${P}/section-133.102`,
    quote:
      "(1) The 30-day average shall not exceed 30 mg/l. (2) The 7-day average shall not exceed 45 mg/l. (3) The 30-day average percent removal shall not be less than 85 percent.",
  },
  combined: {
    title: "40 CFR 133.103(a)",
    url: `${P}/section-133.103`,
    quote:
      "For such treatment works, the decision must be made on a case-by-case basis as to whether any attainable percentage removal level can be defined, and if so, what the level should be.",
  },
} satisfies Record<string, RuleSource>;
