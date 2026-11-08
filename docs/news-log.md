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
