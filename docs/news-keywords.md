# News keywords (owner's list, 2026-11-07)

The owner's target keywords for explainers. Each daily run picks explainer topics from this list (see
`docs/daily-news.md` step 2). A keyword is used only through the cluster it maps to: the post's `topic`, its official
sources and its internal links come from that cluster. Put the keyword phrase naturally in the title or first
paragraph when it fits the question; never stuff it.

## Keywords mapped to a cluster (use these)

| keyword                                 | post `topic`                 | cluster hub               | official sources (only these)                         |
| --------------------------------------- | ---------------------------- | ------------------------- | ----------------------------------------------------- |
| EPA Section 608                         | EPA 608                      | `/epa-608/`               | eCFR 40 CFR 82 Subpart F, 40 CFR 84; epa.gov          |
| HVAC Certification                      | EPA 608                      | `/epa-608/`               | eCFR 40 CFR 82 Subpart F; epa.gov                     |
| EPA Section 609                         | EPA 609                      | `/epa-609/`               | eCFR 40 CFR 82 Subpart B; epa.gov                     |
| Commercial Driver's License (CDL)       | CDL                          | `/cdl/`                   | eCFR 49 CFR 380, 382, 383, 384, 391; Federal Register |
| Forklift Operator Certification         | Forklift operator            | `/forklift/`              | eCFR 29 CFR 1910.178; osha.gov                        |
| OSHA Construction Safety                | OSHA construction safety     | `/osha/`                  | eCFR 29 CFR 1926; osha.gov                            |
| OSHA General Industry Safety            | OSHA general industry safety | `/osha-general-industry/` | eCFR 29 CFR 1910; osha.gov                            |
| Drinking Water Operator Certification   | Drinking water operator      | `/water-operator/`        | eCFR 40 CFR 141, 142; epa.gov                         |
| Wastewater Operator Certification       | Wastewater operator          | `/wastewater-operator/`   | eCFR 40 CFR 133, 403, 503; epa.gov                    |
| FAA Part 107 Remote Pilot Certification | FAA Part 107                 | `/faa-107/`               | eCFR 14 CFR 107, 89, 48; faa.gov                      |

## Keywords for planned clusters (from 2026-11-07)

These clusters are on the roadmap as `planned` (no hub page yet). Extra rules for their posts:

- Internal links go only to `/certifications/` and to existing pages that the post really relates to (for example
  `/osha/` or `/osha-general-industry/` for an OSHA electrical or welding rule). Never link to a hub that does not exist.
- Licensing is set by each state (or city): a post about a license names the state in the title and first paragraph,
  uses only that state's own licensing board or agency site (.gov), and never says the rule applies in other states.
- ASE, AWS and NABCEP are private certifying bodies: use only their own pages, and only for facts about their own
  program (eligibility, test or recertification rules, validity). Never their marketing (pass rates, pay, "most in
  demand"), never their practice questions or study material, and say plainly that they are not government agencies.
- Federal angles (OSHA electrical and welding subparts, EPA lead-free plumbing) use eCFR as usual.
- www.ase.com, www.aws.org, www.nabcep.org and state board sites refuse the shell; read them with the web-fetch agent,
  using a URL that came from a WebSearch result. If a page cannot be read, skip the post and log it.

| keyword                      | post `topic`                 | links                                                     | official sources (only these)                                                 |
| ---------------------------- | ---------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| ASE Automotive Certification | ASE automotive certification | `/certifications/`; `/epa-609/` if about MVAC             | ase.com (ASE's own program)                                                   |
| Electrician Licensing        | Electrician licensing        | `/certifications/`; `/osha/`, `/osha-general-industry/`   | state electrical board (.gov); eCFR 29 CFR 1910 Subpart S, 1926 Subpart K     |
| Plumbing Licensing           | Plumbing licensing           | `/certifications/`; `/water-operator/` if lead-free rules | state plumbing board (.gov); eCFR 40 CFR 143 Subpart B; epa.gov               |
| Welding Certification        | Welding certification        | `/certifications/`; `/osha/`, `/osha-general-industry/`   | aws.org (AWS's own program); eCFR 29 CFR 1910 Subpart Q, 1926 Subpart J       |
| Solar PV Certification       | Solar PV certification       | `/certifications/`; `/osha/`, `/osha-general-industry/`   | nabcep.org (NABCEP's own program); eCFR 29 CFR 1910 Subpart S, 1926 Subpart K |
| Home Inspector Certification | Home inspector licensing     | `/certifications/`                                        | state home inspector board (.gov)                                             |

Other roadmap clusters (Lead-safe renovator (RRP), Asbestos, Pesticide applicator, Industrial radiography, OSHA crane
operator, FAA A&P mechanic) are not on the owner's list; use them only when every listed keyword already has an
explainer that day.
