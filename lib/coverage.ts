// "What these pages cover, and what they don't" for each certification page. Statements are kept to what the
// linked official pages say (checked on CHECKED); the pages themselves are linked so readers can confirm.

export const COVERAGE_CHECKED = "2026-11-06";

export type Coverage = {
  /** Who runs the real test or issues the credential. */
  official: string;
  /** What our pages cover, and what the real credential also involves. */
  ours: string;
  links: { title: string; url: string }[];
};

export const COVERAGE: Record<string, Coverage> = {
  "epa-608": {
    official:
      "The official test is given by an EPA-approved certifying organization, not by EPA, and EPA does not issue certification cards. Tests are specific to the type of equipment you will work on.",
    ours: "These pages cover the EPA rules in 40 CFR Part 82, Subpart F and EPA guidance. Our questions are our own; the official test uses questions from EPA's test bank.",
    links: [
      {
        title: "EPA: Section 608 Technician Certification Requirements",
        url: "https://www.epa.gov/section608/section-608-technician-certification-requirements",
      },
      {
        title: "EPA: Section 608 Technician Certification Test Topics",
        url: "https://www.epa.gov/section608/section-608-technician-certification-test-topics",
      },
    ],
  },
  "epa-609": {
    official:
      "Certification comes from an EPA-approved training and certification program: you are trained by the program and pass its test. EPA lists the approved programs.",
    ours: "These pages cover the federal rules in 40 CFR Part 82, Subpart B. The approved programs' own training materials and tests are not used here.",
    links: [
      {
        title: "EPA: Section 609 Technician Training and Certification Programs",
        url: "https://www.epa.gov/mvac/section-609-technician-training-and-certification-programs",
      },
    ],
  },
  osha: {
    official:
      "OSHA Outreach 10-hour and 30-hour construction classes are taught by OSHA-authorized trainers, who issue the course completion cards. OSHA says none of the Outreach courses is a certification, and the program is voluntary.",
    ours: "These pages cover selected OSHA construction standards (29 CFR 1926). OSHA says Outreach training emphasizes hazard identification, avoidance, control and prevention rather than the standards, and does not fulfill the training requirements in OSHA standards.",
    links: [
      { title: "OSHA: Outreach Training Program", url: "https://www.osha.gov/training/outreach" },
      { title: "OSHA: Outreach Training Program FAQs", url: "https://www.osha.gov/training/outreach/faq" },
    ],
  },
  "osha-general-industry": {
    official:
      "OSHA Outreach 10-hour and 30-hour general industry classes are taught by OSHA-authorized trainers, who issue the course completion cards. OSHA says none of the Outreach courses is a certification, and the program is voluntary.",
    ours: "These pages cover selected OSHA general industry standards (29 CFR 1910). OSHA says Outreach training does not fulfill the training requirements in OSHA standards.",
    links: [
      { title: "OSHA: Outreach Training Program", url: "https://www.osha.gov/training/outreach" },
      {
        title: "OSHA: Card Hierarchy for Classroom Training",
        url: "https://www.osha.gov/training/outreach/card-hierarchy",
      },
    ],
  },
  "osha-crane": {
    official:
      "Under 29 CFR 1926.1427 the employer must ensure each operator is trained, certified or licensed, and evaluated. Certification comes from an accredited crane operator testing organization or an audited employer program, or a State or local license where one applies.",
    ours: "These pages cover nine sections of 29 CFR 1926 Subpart CC. Certification bodies give written and practical tests with their own content, which we do not use.",
    links: [
      {
        title: "OSHA: 1926.1427 Operator training, certification, and evaluation",
        url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.1427",
      },
    ],
  },
  forklift: {
    official:
      "Under 29 CFR 1910.178(l), the employer certifies that each operator has been trained and evaluated, and training and evaluation are done by persons with the knowledge, training and experience to do them.",
    ours: "These pages cover the rule text. The required training also includes practical training and an evaluation of the operator's performance in the workplace, which practice questions do not replace.",
    links: [
      {
        title: "OSHA: 1910.178 Powered industrial trucks",
        url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.178",
      },
      { title: "OSHA: Powered Industrial Trucks (Forklifts)", url: "https://www.osha.gov/powered-industrial-trucks" },
    ],
  },
  cdl: {
    official:
      "FMCSA does not issue CDLs; State governments do, and the knowledge and skills tests are given by the State. You must also pass all three parts of the skills test: vehicle inspection, basic controls and road test.",
    ours: "These pages cover federal FMCSA rules only. FMCSA says the first step is to get your State's CDL manual; study it for your State's tests.",
    links: [
      {
        title: "FMCSA: How do I get a Commercial Driver's License?",
        url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license/how-do-i-get-commercial-drivers-license",
      },
    ],
  },
  "faa-107": {
    official:
      "The FAA issues the remote pilot certificate. You first pass the Unmanned Aircraft General – Small (UAG) knowledge test at an FAA-approved Knowledge Testing Center.",
    ours: "Our questions cover Part 107, Remote ID, registration and FAA study materials, but not every area of the FAA's Airman Certification Standards for the test.",
    links: [
      {
        title: "FAA: Become a Certificated Remote Pilot",
        url: "https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot",
      },
      {
        title: "FAA: Airman Knowledge Testing Matrix",
        url: "https://www.faa.gov/training_testing/testing/testing_matrix",
      },
    ],
  },
  "faa-amt": {
    official:
      "The FAA issues the mechanic certificate with an Airframe rating, a Powerplant rating or both. You pass the knowledge (written) tests first, then the oral and practical tests.",
    ours: "These pages cover only the rules in 14 CFR Part 65 Subpart D and Part 43. The FAA tests are built on the Aviation Mechanic General, Airframe and Powerplant Airman Certification Standards (FAA-S-ACS-1), whose technical subject areas we do not cover.",
    links: [
      { title: "FAA: Become an Aviation Mechanic", url: "https://www.faa.gov/mechanics/become" },
      {
        title: "FAA: Aircraft Mechanic Oral, Practical, & Written Tests",
        url: "https://www.faa.gov/mechanics/become/test_requirements",
      },
    ],
  },
  "water-operator": {
    official:
      "Drinking water operators are certified through State operator certification programs, and requirements vary from State to State. EPA lists each State's certification contact.",
    ours: "These pages cover federal drinking water rules (40 CFR Parts 141 and 143). Each State program sets its own exams; check yours for what they cover.",
    links: [
      {
        title: "EPA: About Operator Certification",
        url: "https://www.epa.gov/dwcapacity/about-operator-certification",
      },
      {
        title: "EPA: Find a Drinking Water Operator Certification Contact",
        url: "https://www.epa.gov/dwcapacity/find-epa-drinking-water-operator-certification-contact",
      },
    ],
  },
  "wastewater-operator": {
    official:
      "Wastewater operator certification is not set by the federal rules on these pages. Check your State's environmental or water agency for its certification program and exams.",
    ours: "These pages cover selected federal wastewater rules (40 CFR Parts 122, 133, 136, 403 and 503) only.",
    links: [],
  },
  "lead-rrp": {
    official:
      "Firms doing covered work must be certified, and renovator training comes from training providers accredited by EPA or by an authorized State or Tribal program. Some States and a Tribe run their own programs instead of the federal one.",
    ours: "These pages cover the federal RRP rule in 40 CFR Part 745. The accredited course and its materials are not used here.",
    links: [
      {
        title: "EPA: Lead Renovation, Repair and Painting Program",
        url: "https://www.epa.gov/lead/lead-renovation-repair-and-painting-program",
      },
    ],
  },
  asbestos: {
    official:
      "Asbestos professionals are trained by providers whose courses are approved by EPA or a State under the Asbestos Model Accreditation Plan, and most States also require a license to do this work.",
    ours: "These pages cover OSHA's construction asbestos standard and EPA's school rule (AHERA). Accredited course content and State licensing are not covered.",
    links: [
      {
        title: "EPA: How do I get certified as an asbestos professional?",
        url: "https://www.epa.gov/asbestos/how-do-i-get-certified-asbestos-professional",
      },
    ],
  },
};
