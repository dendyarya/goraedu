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

Other roadmap clusters (Lead-safe renovator (RRP), Asbestos, Pesticide applicator, Industrial radiography, OSHA crane
operator, FAA A&P mechanic) are not on the owner's list; use them only when every listed keyword already has an
explainer that day.

## Keywords not on the roadmap (do not publish yet)

ASE Automotive Certification, Electrician Licensing, Solar PV Certification, Plumbing Licensing, Welding Certification,
Home Inspector Certification. goraedu has no cluster, hub page or official-source plan for these (most are state
licenses or private certifications), so a post would have nothing to link to and no agreed official source. They wait
until the owner adds each one to `lib/clusters.ts` with its official source; then add a row above.
