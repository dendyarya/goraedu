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
