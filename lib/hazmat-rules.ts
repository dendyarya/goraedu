// Official text from 49 CFR 172.504 (eCFR as of Nov 4, 2026, data/sources/ecfr) used by the hazmat placard finder.
// The tool page calls assertQuotes("cdl", ...) on these, so the build fails if one is not in the snapshot.
// TABLE_1 and TABLE_2 transcribe the rows of Tables 1 and 2 to paragraph (e) (category, placard name, design section).

import type { RuleSource } from "@/lib/epa608-rules";

const U = "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-C/part-172/subpart-F/section-172.504";

export const R172 = {
  general: {
    title: "49 CFR 172.504(a)",
    url: U,
    quote:
      "Except as otherwise provided in this subchapter, each bulk packaging, freight container, unit load device, transport vehicle or rail car containing any quantity of a hazardous material must be placarded on each side and each end with the type of placards specified in tables 1 and 2 of this section and in accordance with other placarding requirements of this subpart,",
  },
  under454: {
    title: "49 CFR 172.504(c)(1)",
    url: U,
    quote:
      "Except for bulk packagings and hazardous materials subject to § 172.505, when hazardous materials covered by table 2 of this section are transported by highway or rail, placards are not required on— (1) A transport vehicle or freight container which contains less than 454 kg (1001 pounds) aggregate gross weight of hazardous materials covered by table 2 of paragraph (e) of this section; or",
  },
  dangerous: {
    title: "49 CFR 172.504(b)",
    url: U,
    quote:
      "A freight container, unit load device, transport vehicle, or rail car which contains non-bulk packages with two or more categories of hazardous materials that require different placards specified in table 2 of paragraph (e) of this section may be placarded with a DANGEROUS placard instead of the separate placarding specified for each of the materials in table 2 of paragraph (e) of this section. However, when 1,000 kg (2,205 pounds) aggregate gross weight or more of one category of material is loaded therein at one loading facility on a freight container, unit load device, transport vehicle, or rail car, the placard specified in table 2 of paragraph (e) of this section for that category must be applied.",
  },
  class1: {
    title: "49 CFR 172.504(f)(1)",
    url: U,
    quote:
      "When more than one division placard is required for Class 1 materials on a transport vehicle, rail car, freight container or unit load device, only the placard representing the lowest division number must be displayed.",
  },
  class9: {
    title: "49 CFR 172.504(f)(9)",
    url: U,
    quote:
      "For Class 9, a CLASS 9 placard is not required for domestic transportation, including that portion of international transportation, defined in § 171.8 of this subchapter, which occurs within the United States.",
  },
} satisfies Record<string, RuleSource>;

export type PlacardRow = { id: string; category: string; placard: string; section: string };

export const TABLE_1: PlacardRow[] = [
  { id: "1.1", category: "1.1", placard: "EXPLOSIVES 1.1", section: "172.522" },
  { id: "1.2", category: "1.2", placard: "EXPLOSIVES 1.2", section: "172.522" },
  { id: "1.3", category: "1.3", placard: "EXPLOSIVES 1.3", section: "172.522" },
  { id: "2.3", category: "2.3", placard: "POISON GAS", section: "172.540" },
  { id: "4.3", category: "4.3", placard: "DANGEROUS WHEN WET", section: "172.548" },
  {
    id: "5.2B",
    category: "5.2 (Organic peroxide, Type B, liquid or solid, temperature controlled)",
    placard: "ORGANIC PEROXIDE",
    section: "172.552",
  },
  {
    id: "6.1PIH",
    category: "6.1 (material poisonous by inhalation)",
    placard: "POISON INHALATION HAZARD",
    section: "172.555",
  },
  { id: "7Y3", category: "7 (Radioactive Yellow III label only)", placard: "RADIOACTIVE", section: "172.556" },
];

export const TABLE_2: PlacardRow[] = [
  { id: "1.4", category: "1.4", placard: "EXPLOSIVES 1.4", section: "172.523" },
  { id: "1.5", category: "1.5", placard: "EXPLOSIVES 1.5", section: "172.524" },
  { id: "1.6", category: "1.6", placard: "EXPLOSIVES 1.6", section: "172.525" },
  { id: "2.1", category: "2.1", placard: "FLAMMABLE GAS", section: "172.532" },
  { id: "2.2", category: "2.2", placard: "NON-FLAMMABLE GAS", section: "172.528" },
  { id: "3", category: "3", placard: "FLAMMABLE", section: "172.542" },
  { id: "CL", category: "Combustible liquid", placard: "COMBUSTIBLE", section: "172.544" },
  { id: "4.1", category: "4.1", placard: "FLAMMABLE SOLID", section: "172.546" },
  { id: "4.2", category: "4.2", placard: "SPONTANEOUSLY COMBUSTIBLE", section: "172.547" },
  { id: "5.1", category: "5.1", placard: "OXIDIZER", section: "172.550" },
  {
    id: "5.2",
    category: "5.2 (Other than organic peroxide, Type B, liquid or solid, temperature controlled)",
    placard: "ORGANIC PEROXIDE",
    section: "172.552",
  },
  { id: "6.1", category: "6.1 (other than material poisonous by inhalation)", placard: "POISON", section: "172.554" },
  { id: "6.2", category: "6.2", placard: "NONE", section: "" },
  { id: "8", category: "8", placard: "CORROSIVE", section: "172.558" },
  { id: "9", category: "9", placard: "CLASS 9 (see § 172.504(f)(9))", section: "172.560" },
];
