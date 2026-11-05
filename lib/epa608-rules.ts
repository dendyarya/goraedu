// Official numbers from 40 CFR Part 82 Subpart F (eCFR text dated Nov 3, 2026, data/sources/ecfr), used by the
// EPA 608 tools. Every value carries the exact words it comes from, so the tools can show them next to the result.

export type RuleSource = { title: string; url: string; quote: string };

const ECFR = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F";
export const RULES_CHECKED = "2026-11-05";
export const SNAPSHOT_LABEL = "eCFR text as of Nov 3, 2026";

export const SRC = {
  leakRate: {
    title: "40 CFR 82.152, “Leak rate”",
    url: `${ECFR}/section-82.152`,
    quote:
      "The leak rate is expressed in terms of the percentage of the appliance's full charge that would be lost over a 12-month period if the current rate of loss were to continue over that period.",
  },
  sameMethod: {
    title: "40 CFR 82.152, “Leak rate”",
    url: `${ECFR}/section-82.152`,
    quote:
      "The same method must be used for all appliances subject to the leak repair requirements located at an operating facility.",
  },
  applicability: {
    title: "40 CFR 82.157(a)",
    url: `${ECFR}/section-82.157`,
    quote:
      "As of April 10, 2020, this section applies only to appliances with a full charge of 50 or more pounds of any class I or class II refrigerant or blend containing a class I or class II refrigerant.",
  },
  substitutes: {
    title: "40 CFR 82.157(a)",
    url: `${ECFR}/section-82.157`,
    quote:
      "Notwithstanding the use of the term refrigerant in this section, the requirements of this section do not apply to appliances containing solely substitute refrigerants.",
  },
  rates: {
    title: "40 CFR 82.157(c)(2)",
    url: `${ECFR}/section-82.157`,
    quote:
      "20 percent leak rate for commercial refrigeration equipment; (ii) 30 percent leak rate for industrial process refrigeration equipment; and (iii) 10 percent leak rate for comfort cooling appliances or other appliances with a full charge of 50 or more pounds of refrigerant not covered by (c)(2)(i) or (ii) of this section.",
  },
  repair: {
    title: "40 CFR 82.157(d)",
    url: `${ECFR}/section-82.157`,
    quote:
      "Owners or operators must identify and repair leaks in accordance with this paragraph within 30 days (or 120 days if an industrial process shutdown is required) of when refrigerant is added to an appliance exceeding the applicable leak rate in paragraph (c) of this section.",
  },
  repairOrRetire: {
    title: "40 CFR 82.157(c)(1)",
    url: `${ECFR}/section-82.157`,
    quote:
      "Owners or operators must repair appliances with a leak rate over the applicable leak rate in this paragraph in accordance with paragraphs (d) through (f) of this section unless the owner or operator elects to retrofit or retire the appliance in compliance with paragraphs (h) and (i) of this section.",
  },
  calculateEvery: {
    title: "40 CFR 82.157(b)",
    url: `${ECFR}/section-82.157`,
    quote:
      "The owner or operator must calculate the leak rate every time refrigerant is added to an appliance unless the addition is made immediately following a retrofit, installation of a new appliance, or qualifies as a seasonal variance.",
  },
  table1: {
    title: "40 CFR 82.156(a), Table 1",
    url: `${ECFR}/section-82.156`,
    quote:
      "TABLE 1—REQUIRED LEVELS OF EVACUATION FOR APPLIANCES [EXCEPT FOR SMALL APPLIANCES, MVACS, AND MVAC-LIKE APPLIANCES]",
  },
  small: {
    title: "40 CFR 82.156(b)",
    url: `${ECFR}/section-82.156`,
    quote:
      "When using recovery equipment manufactured on or after November 15, 1993, recover 90 percent of the refrigerant in the appliance when the compressor in the appliance is functioning, or 80 percent of the refrigerant in the appliance when the compressor in the appliance is not functioning; or (3) Evacuate the appliance to four inches of mercury vacuum.",
  },
  smallOld: {
    title: "40 CFR 82.156(b)(1)",
    url: `${ECFR}/section-82.156`,
    quote:
      "When using recovery equipment manufactured before November 15, 1993, recover 80 percent of the refrigerant in the small appliance; or",
  },
  verify: {
    title: "40 CFR 82.156(a)",
    url: `${ECFR}/section-82.156`,
    quote:
      "A technician must verify that the applicable level of evacuation has been reached in the appliance or the part before it is opened.",
  },
  defs: {
    title: "40 CFR 82.152, pressure definitions",
    url: `${ECFR}/section-82.152`,
    quote:
      "High-pressure appliance means an appliance that uses a refrigerant with a liquid phase saturation pressure between 170 psia and 355 psia at 104 °F.",
  },
} satisfies Record<string, RuleSource>;

/** §82.157(c)(2) leak rates, in percent. */
export const LEAK_RATES = [
  { id: "commercial", label: "Commercial refrigeration equipment", rate: 20 },
  { id: "industrial", label: "Industrial process refrigeration equipment", rate: 30 },
  { id: "comfort", label: "Comfort cooling, or any other appliance of 50+ pounds", rate: 10 },
] as const;

export type ApplianceClass = "very-high" | "high" | "medium" | "low" | "small";

export const APPLIANCE_CLASSES: { id: ApplianceClass; label: string; hint: string }[] = [
  {
    id: "very-high",
    label: "Very high-pressure",
    hint: "Critical temperature below 104 °F or saturation pressure above 355 psia at 104 °F (e.g. R-13, R-23, R-503, R-508A, R-508B)",
  },
  {
    id: "high",
    label: "High-pressure",
    hint: "170 to 355 psia at 104 °F (e.g. R-22, R-407A, R-407C, R-410A, R-502)",
  },
  {
    id: "medium",
    label: "Medium-pressure",
    hint: "45 to 170 psia at 104 °F (e.g. R-114, R-124, R-12, R-134a, R-500)",
  },
  { id: "low", label: "Low-pressure", hint: "Below 45 psia at 104 °F (e.g. R-11, R-123, R-113, R-245fa)" },
  {
    id: "small",
    label: "Small appliance",
    hint: "Factory-sealed with 5 pounds or less of refrigerant",
  },
];

/**
 * Table 1 of §82.156, as printed: [before Nov 15, 1993, on or after Nov 15, 1993]. Inches of Hg vacuum unless noted.
 * Rows for high- and medium-pressure appliances depend on whether the full charge is under 200 pounds.
 */
export function table1Level(cls: Exclude<ApplianceClass, "small">, charge200Plus: boolean, newEquipment: boolean) {
  const row: Record<string, [string, string]> = {
    "very-high": ["0", "0"],
    "high-small": ["0", "0"],
    "high-large": ["4", "10"],
    "medium-small": ["4", "10"],
    "medium-large": ["4", "15"],
    low: ["25 mm Hg absolute", "25 mm Hg absolute"],
  };
  const key = cls === "high" || cls === "medium" ? `${cls}-${charge200Plus ? "large" : "small"}` : cls;
  const value = row[key]![newEquipment ? 1 : 0];
  return value.includes("mm") ? value : `${value} inches of Hg vacuum`;
}
