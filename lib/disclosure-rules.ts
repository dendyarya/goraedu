// Official text from 40 CFR 745 Subpart F (eCFR as of Nov 12, 2026, data/sources/ecfr) used by the lead disclosure
// checker. The tool page calls assertQuotes("home-inspector", ...) on these, so the build fails if one is not in the
// snapshot.

import type { RuleSource } from "@/lib/epa608-rules";

const F = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-R/part-745/subpart-F";

export const DISCLOSURE = {
  scope: {
    title: "40 CFR 745.101",
    url: `${F}/section-745.101`,
    quote:
      "This subpart applies to all transactions to sell or lease target housing, including subleases, with the exception of the following:",
  },
  foreclosure: {
    title: "40 CFR 745.101(a)",
    url: `${F}/section-745.101`,
    quote: "Sales of target housing at foreclosure.",
  },
  lbpFree: {
    title: "40 CFR 745.101(b)",
    url: `${F}/section-745.101`,
    quote:
      "Leases of target housing that have been found to be lead-based paint free by an inspector certified under the Federal certification program or under a federally accredited State or tribal certification program.",
  },
  shortTerm: {
    title: "40 CFR 745.101(c)",
    url: `${F}/section-745.101`,
    quote: "Short-term leases of 100 days or less, where no lease renewal or extension can occur.",
  },
  renewal: {
    title: "40 CFR 745.101(d)",
    url: `${F}/section-745.101`,
    quote:
      "Renewals of existing leases in target housing in which the lessor has previously disclosed all information required under § 745.107 and where no new information described in § 745.107 has come into the possession of the lessor.",
  },
  targetHousing: {
    title: "40 CFR 745.103, target housing",
    url: `${F}/section-745.103`,
    quote:
      "Target housing means any housing constructed prior to 1978, except housing for the elderly or persons with disabilities or any 0-bedroom dwelling (unless any child who is less than 6 years of age resides or is expected to reside in such housing).",
  },
  zeroBedroom: {
    title: "40 CFR 745.103, 0-bedroom dwelling",
    url: `${F}/section-745.103`,
    quote:
      "0-bedroom dwelling means any residential dwelling in which the living area is not separated from the sleeping area. The term includes efficiencies, studio apartments, dormitory housing, military barracks, and rentals of individual rooms in residential dwellings.",
  },
  elderly: {
    title: "40 CFR 745.103, housing for the elderly",
    url: `${F}/section-745.103`,
    quote:
      "Housing for the elderly means retirement communities or similar types of housing reserved for households composed of one or more persons 62 years of age or more at the time of initial occupancy.",
  },
  pamphlet: {
    title: "40 CFR 745.107(a)(1)",
    url: `${F}/section-745.107`,
    quote:
      "The seller or lessor shall provide the purchaser or lessee with an EPA-approved lead hazard information pamphlet.",
  },
  disclose: {
    title: "40 CFR 745.107(a)(2)",
    url: `${F}/section-745.107`,
    quote:
      "The seller or lessor shall disclose to the purchaser or lessee the presence of any known lead-based paint and/or lead-based paint hazards in the target housing being sold or leased.",
  },
  records: {
    title: "40 CFR 745.107(a)(4)",
    url: `${F}/section-745.107`,
    quote:
      "The seller or lessor shall provide the purchaser or lessee with any records or reports available to the seller or lessor pertaining to lead-based paint and/or lead-based paint hazards in the target housing being sold or leased.",
  },
  evaluation: {
    title: "40 CFR 745.110(a)",
    url: `${F}/section-745.110`,
    quote:
      "Before a purchaser is obligated under any contract to purchase target housing, the seller shall permit the purchaser a 10-day period (unless the parties mutually agree, in writing, upon a different period of time) to conduct a risk assessment or inspection for the presence of lead-based paint and/or lead-based paint hazards.",
  },
  waive: {
    title: "40 CFR 745.110(b)",
    url: `${F}/section-745.110`,
    quote:
      "a purchaser may waive the opportunity to conduct the risk assessment or inspection by so indicating in writing.",
  },
  saleAttachment: {
    title: "40 CFR 745.113(a)",
    url: `${F}/section-745.113`,
    quote:
      "Each contract to sell target housing shall include an attachment containing the following elements, in the language of the contract (e.g., English, Spanish):",
  },
  leaseAttachment: {
    title: "40 CFR 745.113(b)",
    url: `${F}/section-745.113`,
    quote:
      "Each contract to lease target housing shall include, as an attachment or within the contract, the following elements, in the language of the contract (e.g., English, Spanish):",
  },
  retainSale: {
    title: "40 CFR 745.113(c)(1)",
    url: `${F}/section-745.113`,
    quote:
      "The seller, and any agent, shall retain a copy of the completed attachment required under paragraph (a) of this section for no less than 3 years from the completion date of the sale.",
  },
  retainLease: {
    title: "40 CFR 745.113(c)(1)",
    url: `${F}/section-745.113`,
    quote:
      "The lessor, and any agent, shall retain a copy of the completed attachment or lease contract containing the information required under paragraph (b) of this section for no less than 3 years from the commencement of the leasing period.",
  },
  agent: {
    title: "40 CFR 745.115(a)",
    url: `${F}/section-745.115`,
    quote: "Each agent shall ensure compliance with all requirements of this subpart.",
  },
} satisfies Record<string, RuleSource>;
