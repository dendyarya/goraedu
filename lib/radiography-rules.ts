// Official text from 10 CFR Part 34 (eCFR as of Nov 4, 2026, data/sources/ecfr) used by the due-date tool.
// The tool page calls assertQuotes("industrial-radiography", ...) on these, so the build fails if one is missing.

import type { RuleSource } from "@/lib/epa608-rules";

const U = "https://www.ecfr.gov/current/title-10/chapter-I/part-34";

export type RadItem = { key: string; label: string; months: number; source: RuleSource };

export const RAD_ITEMS: RadItem[] = [
  {
    key: "inspect",
    label:
      "Inspection and routine maintenance of exposure devices, source changers, associated equipment, containers and survey instruments",
    months: 3,
    source: {
      title: "10 CFR 34.31(b)(1)",
      url: `${U}/subpart-C/section-34.31`,
      quote:
        "Inspection and routine maintenance of radiographic exposure devices, source changers, associated equipment, transport and storage containers, and survey instruments at intervals not to exceed 3 months or before the first use thereafter",
    },
  },
  {
    key: "calib",
    label: "Calibration of each radiation survey instrument",
    months: 6,
    source: {
      title: "10 CFR 34.25(b)(1)",
      url: `${U}/subpart-C/section-34.25`,
      quote: "At intervals not to exceed 6 months and after instrument servicing, except for battery changes;",
    },
  },
  {
    key: "leak",
    label: "Leak test of each sealed source",
    months: 6,
    source: {
      title: "10 CFR 34.27(c)(1)",
      url: `${U}/subpart-C/section-34.27`,
      quote:
        "Each licensee who uses a sealed source shall have the source tested for leakage at intervals not to exceed 6 months.",
    },
  },
  {
    key: "du",
    label: "DU contamination test of each exposure device with depleted uranium shielding and an “S” tube",
    months: 12,
    source: {
      title: "10 CFR 34.27(e)",
      url: `${U}/subpart-C/section-34.27`,
      quote:
        "Each exposure device using depleted uranium (DU) shielding and an “S” tube configuration must be tested for DU contamination at intervals not to exceed 12 months.",
    },
  },
  {
    key: "refresher",
    label: "Refresher safety training for each radiographer and radiographer's assistant",
    months: 12,
    source: {
      title: "10 CFR 34.43(d)",
      url: `${U}/subpart-D/section-34.43`,
      quote:
        "The licensee shall provide annual refresher safety training for each radiographer and radiographer's assistant at intervals not to exceed 12 months.",
    },
  },
  {
    key: "observe",
    label:
      "Observation of each radiographer and radiographer's assistant during an actual operation (job performance inspection)",
    months: 6,
    source: {
      title: "10 CFR 34.43(e)(1)",
      url: `${U}/subpart-D/section-34.43`,
      quote:
        "Include observation of the performance of each radiographer and radiographer's assistant during an actual industrial radiographic operation, at intervals not to exceed 6 months; and",
    },
  },
];
