// Official text from 40 CFR Part 82 Subpart B (eCFR as of Nov 3, 2026, data/sources/ecfr) used by the EPA 609 tools.
// Tool pages call assertQuotes() on every quote here, so the build fails if one is not in the snapshot.

import type { RuleSource } from "@/lib/epa608-rules";

const B = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-B";
const sec = (s: string) => `${B}/section-${s}`;

export const R609 = {
  scope: {
    title: "40 CFR 82.30(b)",
    url: sec("82.30"),
    quote:
      "These regulations apply to any person performing service on a motor vehicle for consideration when this service involves the refrigerant in the motor vehicle air conditioner.",
  },
  mvacDef: {
    title: "40 CFR 82.32(d)",
    url: sec("82.32"),
    quote:
      "Motor vehicle air conditioners means mechanical vapor compression refrigeration equipment used to cool the driver's or passenger's compartment of any motor vehicle. This definition is not intended to encompass the hermetically sealed refrigeration systems used on motor vehicles for refrigerated cargo and the air conditioning systems on passenger buses using HCFC-22 refrigerant.",
  },
  consideration: {
    title: "40 CFR 82.32(g)",
    url: sec("82.32"),
    quote:
      "Service for consideration means being paid to perform service, whether it is in cash, credit, goods, or services. This includes all service except that done for free.",
  },
  involving: {
    title: "40 CFR 82.32(h)",
    url: sec("82.32"),
    quote:
      "Service involving refrigerant means any service during which discharge or release of refrigerant from the MVAC or MVAC-like appliance to the atmosphere can reasonably be expected to occur. Service involving refrigerant includes any service in which an MVAC or MVAC-like appliance is charged with refrigerant but no other service involving refrigerant is performed (i.e., a “top-off”).",
  },
  prohibition: {
    title: "40 CFR 82.34(a)",
    url: sec("82.34"),
    quote:
      "No person repairing or servicing MVACs for consideration, and no person repairing or servicing MVAC-like appliances, may perform any service involving the refrigerant for such MVAC or MVAC-like appliance: (1) Without properly using equipment approved pursuant to § 82.36;",
  },
  mvacCert: {
    title: "40 CFR 82.34(a)(2)",
    url: sec("82.34"),
    quote:
      "Unless any such person repairing or servicing an MVAC has been properly trained and certified by a technician certification program approved by the Administrator pursuant to § 82.40; and",
  },
  likeCert: {
    title: "40 CFR 82.34(a)(3)",
    url: sec("82.34"),
    quote:
      "Unless any such person repairing or servicing an MVAC-like appliance has been properly trained and certified by a technician certification program approved by the Administrator pursuant to either § 82.40 or § 82.161(a)(5).",
  },
  equipmentCertified: {
    title: "40 CFR 82.36(a)(1)",
    url: sec("82.36"),
    quote:
      "Refrigerant recycling equipment must be certified by the Administrator or an independent standards testing organization approved by the Administrator under § 82.38 to meet the following standard:",
  },
  a2: {
    title: "40 CFR 82.36(a)(2)",
    url: sec("82.36"),
    quote:
      "Equipment that recovers and recycles CFC-12 refrigerant must meet the standards set forth in appendix A of this subpart",
  },
  a3: {
    title: "40 CFR 82.36(a)(3)",
    url: sec("82.36"),
    quote:
      "Equipment that recovers but does not recycle CFC-12 refrigerant must meet the standards set forth in appendix B of this subpart",
  },
  a4: {
    title: "40 CFR 82.36(a)(4)",
    url: sec("82.36"),
    quote:
      "Effective January 1, 2008, equipment that recovers and recycles HFC-134a refrigerant and equipment that recovers and recycles HFC-134a refrigerant and recharges systems with HFC-134a refrigerant must meet the standards set forth in Appendix C of this subpart based upon J2788",
  },
  a5: {
    title: "40 CFR 82.36(a)(5)",
    url: sec("82.36"),
    quote:
      "Effective October 31, 2008, equipment that recovers but does not recycle HFC-134a refrigerant must meet the standards set forth in Appendix D of this subpart based upon J2810",
  },
  a6: {
    title: "40 CFR 82.36(a)(6)",
    url: sec("82.36"),
    quote:
      "Equipment that recovers and recycles both CFC-12 and HFC-134a using common circuitry must meet the standards set forth in appendix E of this subpart",
  },
  a7: {
    title: "40 CFR 82.36(a)(7)",
    url: sec("82.36"),
    quote:
      "Equipment that recovers but does not recycle refrigerants other than CFC-12, HFC-134a, and HFO-1234yf must meet the standards set forth in appendix F of this subpart",
  },
  a8: {
    title: "40 CFR 82.36(a)(8)",
    url: sec("82.36"),
    quote:
      "Equipment that recovers and recycles HFO-1234yf refrigerant from MVACs and recharges MVAC systems with HFO-1234yf refrigerant must meet the standards set forth in SAE J2843",
  },
  a9: {
    title: "40 CFR 82.36(a)(9)",
    url: sec("82.36"),
    quote:
      "Equipment that recovers but does not recycle contaminated HFC-134a and/or HFO-1234yf refrigerant from MVACs must meet the standards set forth in SAE J2851",
  },
  a10: {
    title: "40 CFR 82.36(a)(10)",
    url: sec("82.36"),
    quote:
      "Equipment that recovers, recycles, and recharges both HFO-1234yf and R-134a from MVACs must meet the standards set forth in SAE J3030",
  },
  list: {
    title: "40 CFR 82.36(c)",
    url: sec("82.36"),
    quote: "The Administrator will maintain a list of approved equipment by manufacturer and model.",
  },
} satisfies Record<string, RuleSource>;

export type Refrigerant = "cfc12" | "hfc134a" | "hfo1234yf" | "cfc12-134a" | "1234yf-134a" | "other";
export type Job = "recover" | "recycle" | "recharge";

export const REFRIGERANTS: { id: Refrigerant; label: string }[] = [
  { id: "hfo1234yf", label: "HFO-1234yf (R-1234yf)" },
  { id: "hfc134a", label: "HFC-134a (R-134a)" },
  { id: "1234yf-134a", label: "Both HFO-1234yf and R-134a" },
  { id: "cfc12", label: "CFC-12 (R-12)" },
  { id: "cfc12-134a", label: "Both CFC-12 and HFC-134a, using common circuitry" },
  { id: "other", label: "A single refrigerant other than CFC-12, HFC-134a or HFO-1234yf" },
];

export const JOBS: { id: Job; label: string }[] = [
  { id: "recover", label: "Recovers only (does not recycle)" },
  { id: "recycle", label: "Recovers and recycles" },
  { id: "recharge", label: "Recovers, recycles and recharges" },
];

/**
 * The standard §82.36(a) names for a refrigerant and job, or null when paragraph (a) names none for that combination.
 * `contaminated` matters only for recover-only equipment for HFC-134a and/or HFO-1234yf (paragraph (a)(9)).
 */
export function equipmentStandard(r: Refrigerant, job: Job, contaminated: boolean) {
  type K = keyof typeof R609;
  const hit = (standard: string, src: K) => ({ standard, source: R609[src] });
  if (job === "recover" && contaminated && (r === "hfc134a" || r === "hfo1234yf" || r === "1234yf-134a"))
    return hit("SAE J2851", "a9");
  switch (r) {
    case "cfc12":
      return job === "recover"
        ? hit("Appendix B to Subpart B", "a3")
        : job === "recycle"
          ? hit("Appendix A to Subpart B", "a2")
          : null;
    case "hfc134a":
      return job === "recover"
        ? hit("Appendix D to Subpart B (based on J2810)", "a5")
        : hit("Appendix C to Subpart B (based on J2788)", "a4");
    case "hfo1234yf":
      return job === "recharge" ? hit("SAE J2843", "a8") : null;
    case "cfc12-134a":
      return job === "recycle" ? hit("Appendix E to Subpart B", "a6") : null;
    case "1234yf-134a":
      return job === "recharge" ? hit("SAE J3030", "a10") : null;
    case "other":
      return job === "recover" ? hit("Appendix F to Subpart B", "a7") : null;
  }
}
