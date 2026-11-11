# Daily news log

One entry per run (newest last): date, posts published (slug, kind, topic), documents skipped and why, sources that could not be reached.

## 2026-11-07 (first run, started by hand)

- Published: `does-epa-608-certification-expire-lost-card` (explainer, EPA 608);
  `how-cdl-entry-level-driver-training-is-reported-before-skills-test` (explainer, CDL). Each checked by a separate
  agent against eCFR and epa.gov text; fixes applied before publishing.
- Rule changes: none. Federal Register search (RULE and PRORULE, 2026-10-01 to 2026-11-07) for every CFR part in
  docs/daily-news.md returned no documents; eCFR showed only editorial (non-substantive) updates to 40 CFR 745.92,
  745.238 and 763 Subpart E Appendix E. EPA pages: 2027 HFC allowance notice (Oct 6, 2026) skipped (notice for
  producers/importers, no technician change).
- Unreachable: osha.gov, faa.gov, fmcsa.dot.gov, nrc.gov (not on the allowlist); eCFR covers their rules.

## 2026-11-07 (second run, scheduled)

- Published: nothing. The log already had an entry for 2026-11-07, so per docs/daily-news.md this run looked for
  rule changes only (no new explainers).
- Rule changes: none. Federal Register search (RULE and PRORULE, published 2026-11-07 or later) for every CFR part in
  docs/daily-news.md returned no documents (2026-11-07 is a Saturday; the Federal Register does not publish). The
  sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Unreachable: none needed this run (www.federalregister.gov reachable).

## 2026-11-07 (third run, scheduled, 6:40 p.m. ET)

- Published (4 explainers; day total 6): `epa-609-or-608-farm-equipment-bus-air-conditioning` (explainer, EPA 609);
  `who-certifies-drinking-water-operators-epa-or-state` (explainer, Drinking water operator);
  `does-osha-require-first-aid-kit-eyewash-station` (explainer, OSHA general industry safety);
  `osha-construction-backup-alarm-reverse-signal-rule` (explainer, OSHA construction safety). Topics chosen from
  keywords with zero explainers. Each checked by a separate agent against the fetched eCFR / epa.gov text; all
  findings fixed (citations, dropped scope conditions, one non-verbatim quote, softer EPA 609 title) before
  publishing. Deploy workflow succeeded.
- Day ends at 6 posts, under the 8 to 10 target: the second run published no explainers, and this run's cap is 4.
  Not padded.
- Rule changes: none. Federal Register search (RULE and PRORULE, published 2026-11-07 or later) for every CFR part in
  docs/daily-news.md plus 40 CFR 143 returned no documents; sanity check (40 CFR 84 from 2026-05-01) returned the two
  May 26, 2026 HFC documents.
- Considered and dropped: EPA 609 "does certification expire" (no EPA page found stating it); FAA Part 107 sub-250 g
  and accident reporting (already covered by study guides); forklift topics (all of 1910.178 covered by study guides;
  osha.gov letters not reachable); wastewater operator certification (no epa.gov page found).
- Unreachable: www.osha.gov (403 from the shell); Federal Register full-text pages
  (redirect to unblock.federalregister.gov, refused by the proxy; the API itself works); www.govinfo.gov (refused).
  The 1999 operator certification guidelines were therefore cited only through EPA's own pages.

## 2026-11-07 (extra run, requested by the owner, about 8 p.m. ET)

- The owner asked for a news search on the keyword list and for news posts. Leads came from a web search; every post
  is built only from the Federal Register document (full text via govinfo.gov) and eCFR. These rules predate the
  news section, so earlier runs ("since the last run") did not pick them up.
- Published (4 rule changes; day total 10, the daily ceiling):
  `fmcsa-final-rule-removes-cdl-self-reporting-out-of-state-convictions` (rule-change, final, CDL; FR 2026-12449);
  `fmcsa-proposes-english-proficiency-out-of-service-rule` (rule-change, proposed, CDL; FR 2026-16288);
  `faa-proposes-inspection-rating-to-replace-mechanic-inspection-authorization` (rule-change, proposed, FAA A&P
  mechanic; FR 2026-13282); `osha-reopens-comment-on-respirator-medical-evaluation-proposal` (rule-change, proposed,
  OSHA general industry safety; FR 2026-11093 and 2025-12235). Each checked by a separate agent; all findings fixed.
- Not yet covered (for later runs, within the daily ceiling): OSHA proposed rules of July 22 and 28, 2026 on
  substance-specific standards (lead, asbestos, benzene and others, 29 CFR 1910/1926); UCMR 6 proposal (July 1, 2026,
  40 CFR 141); FAA fixed-site drone restriction comment extension (June 30, 2026); NRC radiation protection proposal
  (July 15, 2026, 10 CFR 34); FMCSA non-domiciled CDL and military exception final rules (February 2026); EPA SNAP
  supplemental proposal for MVAC (April 6, 2026, 40 CFR 82).
- Leads with no official document yet: FAA Part 108 (BVLOS) final rule; OSHA heat standard; FMCSA ELDT provider
  removals (fmcsa.dot.gov refuses the shell).
- Federal Register full-text pages (federalregister.gov/documents/full_text/...) return a "Request Access" page to
  the shell; the API and govinfo.gov work.

## 2026-11-08 (second scheduled run, started 12:39 p.m. ET, published about 5:30 p.m. ET)

- No posts were published earlier today and no first-run entry exists for 2026-11-08 (the 5:40 a.m. run left no
  log entry or commit), so this run took the full cap of 4 explainers.
- Published (4 explainers; day total 4): `part-107-remote-pilot-certificate-or-trust-recreational-drone`
  (explainer, FAA Part 107; faa.gov and eCFR 14 CFR 107.1, 107.12, 107.65);
  `aws-certified-welder-certification-continuity-every-six-months` (explainer, Welding certification; aws.org program
  page only); `nabcep-pv-installation-professional-recertification-every-three-years` (explainer, Solar PV
  certification; nabcep.org pages only); `osha-qualified-person-electrical-work-vs-electrician-license` (explainer,
  Electrician licensing; eCFR 29 CFR 1910.332, 1910.333, 1910.399, 1926.32, 1926.449; no state rules). Topics chosen
  from keywords with zero explainers. Each checked by a separate agent against the official text; all findings fixed
  before publishing (FAA: registration threshold is recreational-only, Part 91 "under waiver", 107.12 exceptions kept;
  AWS: two quotes completed, opinions removed; NABCEP: industry-activity options and employer letter restated exactly;
  OSHA: scope of 1910.332(a) and 1910.333(c)(1) added, construction definition kept separate, no claim about state
  licensing law). Deploy workflow succeeded.
- Rule changes: none. Federal Register search (RULE and PRORULE, published 2026-11-07 or later) for every CFR part in
  docs/daily-news.md plus 40 CFR 143 returned no documents (weekend); sanity check (40 CFR 84 from 2026-05-01)
  returned the two May 26, 2026 HFC documents. The backlog listed on 2026-11-07 (extra run) is still not covered.
- Considered and dropped: wastewater operator (no epa.gov page on operator certification; the CFR study guides
  already cover the 40 CFR 133/403/503 questions); forklift (1910.178 fully covered by study guides).
- Note: the electrician post overlaps the OSHA electrical study guides in its quotes; its new angle is license versus
  OSHA "qualified person". aws.org and nabcep.org were read through the web-fetch agent (they refuse the shell).
- Unreachable: www.goraedu.com from the shell (proxy refuses it), so the live pages were not fetched after deploy.

## 2026-11-10 (second scheduled run, started 12:43 p.m. ET)

- No posts were published earlier today and no first-run entry exists for 2026-11-10 (no runs logged on 2026-11-09
  either), so this run had room for 4 explainers. It published 2.
- Published (2 explainers; day total 2): `how-long-is-ase-certification-valid-recertification` (explainer, ASE
  automotive certification; ase.com pages only, plus eCFR 40 CFR 82.34 for the EPA 609 contrast);
  `texas-home-inspector-license-levels-apprentice-real-estate-professional` (explainer, Home inspector licensing; Texas
  only, trec.texas.gov pages only). Topics chosen from keywords with zero explainers. Each checked by a separate agent
  against the official pages; findings fixed (ASE: summary no longer calls every recertification test "shorter" and
  keeps the Renewal App limited to A1 to A9; one quote completed. TREC: sponsorship quote scoped to active renewal,
  "state by state" sentence aligned with lib/clusters.ts, CE timing added). Deploy workflow succeeded.
- Rule changes: none. Federal Register search (RULE and PRORULE, published 2026-11-08 or later) for every CFR part in
  docs/daily-news.md plus 40 CFR 143 returned no documents; the API itself returned other agencies' rules for
  2026-11-09/10. Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents. The backlog
  listed on 2026-11-07 (extra run) is still not covered.
- Considered and dropped: Plumbing licensing (Texas homestead exemption, Occupations Code 1301.051): the official
  statute (statutes.capitol.texas.gov) and tsbpe.texas.gov home page could not be read, so only the board's own
  "UNOFFICIAL VERSION" PDF of September 2025 was available and the license requirement (1301.351) and the board's
  current status could not be confirmed verbatim. Wastewater operator and Forklift operator: still no question not
  already answered by the study guides. Candidate questions for CDL (CLP, 383.25), EPA 609 (small cans) and OSHA
  construction (toilets, 1926.51) are already covered by guides and topic pages.
- Unreachable from the shell: trec.texas.gov, tsbpe.texas.gov and statutes.capitol.texas.gov (read through the
  web-fetch agent where possible; statutes.capitol.texas.gov and tsbpe.texas.gov failed there too); ase.com (read
  through the web-fetch agent).

## 2026-11-10 (third scheduled run, started 6:40 p.m. ET)

- 2 posts were already out today (second run), so this run had room for 4 explainers. It published 3.
- Published (3 explainers; day total 5): `washington-plumber-trainee-certificate-supervision-hours` (explainer, Plumbing
  licensing; Washington only, lni.wa.gov pages only); `washington-electrical-trainee-certificate-hours-that-count`
  (explainer, Electrician licensing; Washington only, lni.wa.gov pages only);
  `aws-certified-welding-inspector-cwi-renewal-nine-year-recertification` (explainer, Welding certification; aws.org
  CWI page only; AWS's 2013 nine-year recertification PDF was read but not used because it predates the current page).
  Plumbing licensing was the only mapped keyword with zero explainers that could be answered; Electrician and Welding
  had one each and none today. Each checked by a separate agent against the official pages; findings fixed (plumbing:
  page names corrected to "Plumber Certification" and "About the Plumber Program", "notarized" moved out of a quote,
  one period moved outside a quote, summary says "typically"; electrical: "stricter" removed, the apprenticeship
  exception to the 180-day affidavit deadline added; AWS: comma restored in the Part B quote, truncated PDH quote fixed,
  fourth option (endorsement) named, OSHA links pointed to the welding study guides). Deploy workflow succeeded.
- Rule changes: none. Federal Register search (RULE and PRORULE, published 2026-11-10 or later) for every CFR part in
  docs/daily-news.md plus 40 CFR 143 returned no documents; the API returned 108 other documents for that window.
  Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents. The backlog listed on
  2026-11-07 (extra run) is still not covered.
- Considered and dropped: Forklift operator and Wastewater operator (zero explainers, but 1910.178 and the
  40 CFR 133/403/503 questions are fully covered by the study guides); CDL, OSHA construction (competent person,
  1926.20) and OSHA general industry welding permits are already covered by guides. A fourth explainer was not written
  so as not to publish a less-verified post; the day ends at 5 posts, below the 8 to 10 target (a ceiling, not a quota).
- Unreachable from the shell: lni.wa.gov, app.leg.wa.gov (proxy refuses them) and aws.org; L&I and AWS pages were read
  through the web-fetch agent, which returns only short verbatim quotes (each quote in the posts was confirmed by the
  checking agents). The L&I trainee pages carry 2021 page-modified dates.

## 2026-11-11 (first scheduled run, started 5:40 a.m. ET)

- No posts were out today yet, so this run had room for 4 explainers. It published 3.
- Published (3 explainers; day total 3): `does-osha-require-restrooms-drinking-water-at-work` (explainer, OSHA general
  industry safety; eCFR 29 CFR 1910.141, not covered by any OSHA general industry study guide);
  `new-york-home-inspector-license-140-hour-course-or-100-inspections` (explainer, Home inspector licensing; New York
  only, dos.ny.gov pages only); `can-school-or-training-count-toward-ase-work-experience` (explainer, ASE automotive
  certification; ase.com work experience page and workexp.ase.com form instructions only; new angle on training
  substitutes, linked to the 2026-11-10 ASE post). Each checked by a separate agent against the official text; findings
  fixed (OSHA: three periods moved outside quotes, mobile-crew exception limited to (c)(1)(i), "unless otherwise
  specified" restored, unsourced Part 1926 sentence removed; NY: architect/engineer exemption attributed to the right
  FAQ answer, renewal quote attributed to the Become page, new-construction exclusion added, four periods moved outside
  quotes, "40 hours" wording softened; ASE: full "cannot be combined" sentence quoted, row and test-list text matched,
  "private, non-government" claim cut to "not a government agency", experience-must-match note added). Deploy workflow
  succeeded.
- Rule changes: none. Federal Register search (RULE and PRORULE, published 2026-11-10 or later) for every CFR part in
  docs/daily-news.md plus 40 CFR 143 returned no documents (November 11 is a federal holiday); the API returned 232
  other documents for that window. Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC
  documents. The backlog listed on 2026-11-07 (extra run) is still not covered.
- Considered and dropped: Solar PV certification (NABCEP PV Associate eligibility and renewal): nabcep.org links two
  Associate handbook versions (2.3.4 and 2.3.5); 2.3.5 could not be read (web-fetch permission timeout), so current
  rules could not be confirmed. Forklift operator and Wastewater operator: still fully covered by the study guides.
- Unreachable from the shell: dos.ny.gov, ase.com, workexp.ase.com, nabcep.org (read through the web-fetch agent,
  which returns quotes of at most 125 characters; each quote was confirmed by the checking agents). eCFR full-text API
  now needs an Accept-Encoding header (use curl --compressed).

## 2026-11-11 (second scheduled run, started 12:40 p.m. ET)

- 3 posts were already out today (first run), so this run had room for 4 explainers. It published 3.
- Published (3 explainers; day total 6): `osha-construction-fire-extinguisher-requirements-1926-150` (explainer, OSHA
  construction safety; eCFR 29 CFR 1926.150, Subpart F, which the construction general safety guide only points to);
  `cdl-transfer-moving-to-another-state-30-days` (explainer, CDL; eCFR 49 CFR 383.71(c), 383.73(c), 383.5, 383.21;
  domiciled drivers only, non-domiciled rules in 383.71(f)/383.73(f) left out);
  `drinking-water-consumer-confidence-report-deadlines` (explainer, Drinking water operator; eCFR 40 CFR 141 Subpart O
  current text and the 2024-01-01 point-in-time text of 141.155, epa.gov CCR pages). Each checked by a separate agent
  against the official text; findings fixed (OSHA: summary now keeps the 5-gallon/5-pound "being used" condition; CDL:
  eight periods/commas moved outside quotes where the source has ";" or continues, "Where to study" corrected because
  the CDL standards guide does not cover transfers; CCR: five periods/commas moved outside quotes, the December 31 quote
  ended where the source sentence continues). Deploy workflow succeeded.
- Rule changes: none. Federal Register search (RULE and PRORULE, published 2026-11-11 or later) for every CFR part in
  docs/daily-news.md plus 40 CFR 143 returned no documents; the API returned 124 other documents for that window.
  Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents. The backlog listed on
  2026-11-07 (extra run) is still not covered.
- Considered and dropped: FAA Part 107 (accident reporting 107.9, night, moving vehicles, alcohol, right-of-way are all
  covered by the study guides); EPA 608 (apprentice exemption, certificate copy, recovery equipment covered by guides
  and topic pages); EPA 609 (equipment approval covered). A fourth explainer was not written so as not to publish a
  less-verified post; Forklift operator and Wastewater operator still fully covered by the study guides.
- Unreachable: none needed this run (eCFR API, federalregister.gov API and epa.gov all reached from the shell; eCFR
  HTML pages redirect the shell to unblock.federalregister.gov, so the versioner API was used).
