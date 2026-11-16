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

## 2026-11-11 (third scheduled run, started 6:39 p.m. ET)

- 6 posts were already out today (first and second runs), so this run had room for 4 explainers. It published 4; the
  day ends at 10 posts, the ceiling.
- Published (4 explainers; day total 10): `epa-disposable-refrigerant-cylinder-heel-rule-2028` (explainer, EPA 608;
  eCFR 40 CFR 84.116, 84.102, 84.3 and FR 2024-21967 via govinfo; not covered by any EPA 608 guide or topic page);
  `minnesota-journeyworker-plumber-license-experience-hours-exam` (explainer, Plumbing licensing; Minnesota only,
  dli.mn.gov pages only); `nabcep-pv-installation-professional-exam-eligibility-requirements` (explainer, Solar PV
  certification; NABCEP 2025 Certification Handbook and nabcep.org pages; nabcep.org links both the 2025 handbook
  (for PVIP eligibility) and a 2023 handbook, whose PVIP eligibility rules agree; new angle on eligibility, the earlier
  post covers recertification); `oregon-general-journeyman-electrician-license-experience-and-exam` (explainer,
  Electrician licensing; Oregon only, oregon.gov/bcd page and the state License Directory on apps.oregon.gov).
  Drafts for Minnesota, NABCEP and Oregon were written by separate agents; each of the four posts was checked by another
  separate agent against the official text; findings fixed (EPA: summary tense "still contains", 84.116(d) limited to
  the four (b) recipients, (c)(1) ignitability condition added, small-can exemption scoped to MVAC; Minnesota: the
  basics page's differing restricted-license route (restricted master plus five years) now stated alongside the
  experience page's two-year route, readers told to confirm with DLI; NABCEP: "private" removed (handbook says
  "non-profit credentialing organization"), inspection rule attributed to Section 3.4.2 with its no-permit context;
  Oregon: unsourced "set by each state (and city)" sentence removed, BCD application steps marked as general to
  electrical individual licenses). Deploy workflow succeeded.
- Rule changes: none. Federal Register search (RULE and PRORULE, published 2026-11-11 or later) for every CFR part in
  docs/daily-news.md plus 40 CFR 143 returned no documents; the API returned 124 other documents for that window.
  Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents (note: 2026-10388, the TRU
  leak-repair exclusion, is a proposed rule). The backlog listed on 2026-11-07 (extra run) is still not covered.
- Considered and dropped: FAA Part 107 and EPA 609 (one explainer each, but every candidate question, including
  registration transfer, FRIAs, Remote ID and small cans, is covered by the study guides and topic pages); Forklift
  operator and Wastewater operator still fully covered by the study guides.
- Unreachable from the shell: dli.mn.gov, oregon.gov, apps.oregon.gov and nabcep.org (and every state board tried);
  read through WebFetch, which returns quotes in pieces of about 125 characters; checking agents re-fetched and
  confirmed each quote.

## 2026-11-12 (first scheduled run, started 5:39 a.m. ET)

- No posts were out yet today, so this run had room for 4 explainers. It published 4 (day total 4).
- Published (4 explainers): `osha-access-to-employee-exposure-and-medical-records-1910-1020` (explainer, OSHA general
  industry safety; eCFR 29 CFR 1910.1020, which the bloodborne pathogens guide lists as notCovered);
  `osha-construction-flaggers-traffic-control-signs-1926-subpart-g` (explainer, OSHA construction safety; eCFR
  29 CFR 1926.200 and 1926.201, the whole of Subpart G, not covered by any guide; the MUTCD itself is not summarized);
  `cdl-hazmat-endorsement-knowledge-test-tsa-security-threat-assessment` (explainer, CDL; eCFR 49 CFR 383.5, 383.71,
  383.93, 383.121, 383.141, 383.153; the CDL guides list the TSA assessment and endorsement knowledge as not covered);
  `how-long-must-public-water-systems-keep-records-141-33` (explainer, Drinking water operator; eCFR 40 CFR 141.33
  and 141.155). Drafts were written by separate agents from eCFR text fetched this run (versioner API, as of
  2026-11-09); each post was checked by another separate agent; findings fixed (1910.1020: ten dropped scope
  conditions restored, e.g. (c)(6)(ii)(B) identifier condition, (e)(2)(ii)(D) wording, (h)(2) no-successor notice,
  SDS footnote, and a link to the hazardous-materials guide removed because it covers only 1910.101/106; Subpart G:
  "two of its sections" corrected, unsupported Part 1910 and MUTCD descriptions removed, tag heading reworded; CDL:
  383.93 URL subpart F, H code sourced to 383.153, 383.71(a)(10) ELDT added, editorial quote removed, 383.5 definition
  kept whole; 141.33: 141.155(a)(4) website rule marked as applying from Jan 1, 2027, "community" removed, State
  sentence softened). All quotes re-verified by script against the fetched text.
- Topic choice: Forklift operator and Wastewater operator (0 explainers) and FAA Part 107 and EPA 609 (1 each) skipped
  again: candidate sections (503.17/503.18, 403.12, 82.42, 107.61/107.65/107.73/107.200/107.205, 1910.178(l)(4))
  are all covered by study guides or topic pages. Picked four topics with 2 explainers each, using eCFR-only sources.
- Rule changes: none. Federal Register search (RULE and PRORULE, published 2026-11-11 or later) for every CFR part in
  docs/daily-news.md plus 40 CFR 143 returned no documents (124 other documents in the window, same as yesterday;
  Nov 11 was a federal holiday). Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Deploy FAILED to start: GitHub Actions run 43203980997 was not started because "recent account payments have failed
  or your spending limit needs to be increased" (billing, not the code). `npm run check` and `npm run format:check`
  passed locally. The posts are on main and will go live on the first Deploy run after billing is fixed.
- Unreachable: none needed (eCFR API and federalregister.gov API reached from the shell).

## 2026-11-12 (second scheduled run, started 12:40 p.m. ET)

- 4 posts were already out today (first run), so this run had room for 4 explainers. It published 4 (day total 8).
- Published (4 explainers): `epa-hfc-leak-repair-rule-which-appliances-40-cfr-84-106` (explainer, EPA 608; eCFR
  40 CFR 84.106, 84.102, 84.3, 84.108, 82.157 and the FR API abstract of proposed rule 2026-10388 on TRUs; no guide or
  topic page covers Part 84 leak repair); `welding-galvanized-lead-cadmium-coated-metal-osha-1910-252-ventilation`
  (explainer, Welding certification; eCFR 29 CFR 1910.252(c)(5) to (c)(12), which the general industry welding guide
  lists as not covered in detail); `texas-journeyman-plumber-license-apprentice-hours-exam` (explainer, Plumbing
  licensing; Texas only, tsbpe.texas.gov pages and TSBPE's March 13, 2026 unofficial rules PDF, 22 TAC 363.2 and
  363.5); `virginia-home-inspector-license-15-points-education-experience-exam` (explainer, Home inspector licensing;
  Virginia only, DPOR board page and 18VAC15-40 Part II on law.lis.virginia.gov). Texas and Virginia drafts were
  written by separate agents; each of the four posts was checked by another separate agent against the official text;
  findings fixed (EPA: 82.157 scope now "class I or class II ... or a blend containing one", ODS-only sentence limited
  to 50 lb and 82.157 added as a source, mothballing added to the (f) sentence; welding: "taken at the welding
  location" restored, summary widened to metals containing lead or cadmium, unsourced opening sentence reworded;
  Texas: 363.5(c) program types and 363.5(d) classroom-plus-on-the-job condition restored, Plumbing Inspector
  exception added, summary lists the exact alternative credentials; Virginia: 18VAC15-40-32 quote completed, NRS CPE
  attributed to 18VAC15-40-75, NRS applicants without a license must apply for one, teaching row not limited to
  accredited institutions).
- Topic choice: Forklift operator and Wastewater operator (0 explainers) and FAA Part 107 and EPA 609 (1 each) skipped
  for the same reason as earlier runs (candidate sections all covered by study guides or topic pages). Picked four
  topics with 2 explainers each that had no post today.
- Rule changes: none. Federal Register search (RULE and PRORULE, published 2026-11-12 or later) for every CFR part in
  docs/daily-news.md plus 40 CFR 143 returned no documents. Sanity check (40 CFR 84 from 2026-05-01) returned the two
  May 26, 2026 HFC documents.
- Deploy FAILED to start again: run 43274857365 was not started because "recent account payments have failed or your
  spending limit needs to be increased" (GitHub billing). `npm run check` and `npm run format:check` passed locally
  (the build needed `@next/swc-linux-x64-gnu` installed with --no-save in this container). The posts are on main and go
  live on the first Deploy run after billing is fixed.
- Unreachable: www.ecfr.gov intermittently answered "Your IP address has been blocked" (Support Code 02); retries a few
  seconds later succeeded. tsbpe.texas.gov, dpor.virginia.gov and law.lis.virginia.gov were read through WebFetch.

## 2026-11-12 (third scheduled run, started 6:39 p.m. ET)

- 8 posts were already out today (first and second runs), so this run had room for 2 explainers. It published 2 (day
  total 10, the ceiling).
- Published (2 explainers): `forklift-stability-triangle-load-center-osha-1910-178-appendix-a` (explainer, Forklift
  operator; eCFR 29 CFR 1910.178 non-mandatory Appendix A, which the forklift guides list as not covered, plus
  (l)(3), (l)(8) and (o)(2)); `what-sewage-sludge-does-40-cfr-503-not-cover-503-6-exclusions` (explainer, Wastewater
  operator; eCFR 40 CFR 503.6 with 503.1 and 503.9; the biosolids guide covers only 503.6(b) and lists the other
  exclusions as not set out). These are the first explainers for both topics (fewest explainers). eCFR text fetched this
  run (versioner API, as of 2026-11-10). Each post was checked by a separate agent; findings fixed (forklift: summary
  now "3,000 pound capacity" and "almost all counterbalanced trucks", see-saw cited to A-3.1 with A-3.2's
  "counterbalanced" scope, "rule of thumb" removed, (l)(3) "not applicable" exception added, unsourced State-plan
  sentence and opening opinion removed; wastewater: summary keeps "generated at an industrial facility", "ten
  exclusions, (a) through (j)", incinerator sentence now "applies to" with the 503.6(c) co-firing exception,
  unsourced 503.32/503.33 and Subpart D descriptions removed, 503.9(f) paraphrase widened, general caution tied to
  503.6(e)'s reference to part 261). All quotes re-verified by script against the fetched text.
- Rule changes: none. Federal Register search (RULE and PRORULE, published 2026-11-12 or later) for every CFR part in
  docs/daily-news.md plus 40 CFR 143 returned no documents (124 documents in the window overall). Sanity check (40 CFR
  84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Deploy: run 43331724640 succeeded (GitHub billing problem from the earlier runs is resolved; a manual Deploy run
  43331206978 had also succeeded just before).
- Unreachable: www.ecfr.gov briefly answered "Your IP address has been blocked" (Support Code 02) and now requires
  compressed responses (`curl --compressed`, otherwise HTTP 406); retries after about 30 seconds succeeded.
  www.goraedu.com itself is not allowed by this session's egress proxy, so the live pages were not fetched.

## 2026-11-15 (scheduled run, started 2:45 a.m. ET)

- No posts were out yet today (no runs logged on 2026-11-13 or 2026-11-14), so this run had room for 4 explainers. It
  published 3 (day total 3).
- Published (3 explainers): `biosolids-land-application-notices-preparer-applier-land-owner-40-cfr-503-12` (explainer,
  Wastewater operator; eCFR 40 CFR 503.12(d) to (j) with 503.5, 503.9, 503.10 and 503.11, versioner API as of
  2026-11-10; the biosolids guide lists the 503.12(f) to (j) notices as not covered point by point);
  `what-does-ase-master-technician-status-require` (explainer, ASE automotive certification; ase.com FAQ, Certification
  Pathway and the A1-A9, T1-T8, B2-B5, H1-H8 and S1-S7 test pages); `nabcep-pv-associate-credential-who-can-take-the-exam`
  (explainer, Solar PV certification; nabcep.org Associate Program page and Associate Candidate Handbook v.2.3.5). The
  ASE and NABCEP drafts were written by separate agents from pages read with WebFetch; each of the three posts was
  checked by another separate agent (the ASE and NABCEP checkers re-read every source themselves); findings fixed
  (wastewater: summary now names who sends each State notice and limits the case-by-case override to bulk sludge and
  bulk derived material, "State permitting authority" replaced by "the permitting authority for the State" with
  503.9(p) quoted, State/permit caveat now sourced to 503.5, paragraph list now (d) to (j); ASE: "own expiration date"
  and the unsourced Renewal App mention removed; NABCEP: unsourced PV Installation Professional clause cut, summary
  credits the three-year validity to the handbook, Directory quotes attributed to the Associate Program page, handbook
  date no longer asserted, conversion CE difference quoted, heading "Did the PVA exam change?" renamed). Wastewater
  quotes re-verified by script against the fetched eCFR text.
- Topic choice: Wastewater operator (1 explainer) picked first. Forklift operator (1) skipped: every paragraph of
  1910.178 and its Appendix A is already covered by the forklift guides or the 2026-11-12 post. FAA Part 107 and EPA 609
  (1 each) skipped for the same reason as earlier runs (every candidate section, including 107.7, 107.9, 107.25 to
  107.74, 107.205 and Parts 48 and 89, is covered by study guides). Then ASE and Solar PV (2 each). A fourth explainer
  was not attempted; later runs today have room for up to 7 more posts.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-12 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents. Sanity check (40 CFR 84 from 2026-05-01) returned the two
  May 26, 2026 HFC documents.
- Deploy: run 43692119999 succeeded.
- Unreachable: none needed (eCFR and federalregister.gov APIs reached from the shell; ase.com and nabcep.org read
  through WebFetch).

## 2026-11-15 (second run, started by hand about 2:58 a.m. ET)

- Catch-up run started manually through the scheduled task, not on its normal schedule. The trigger note says the
  scheduled runs on 2026-11-13 and 2026-11-14 did not happen because GitHub write access to the repo was lost (now
  restored). No posts were backdated; all use 2026-11-15.
- 3 posts were already out today (first run), so this run had room for 4 explainers. It published 3 (day total 6).
- Published (3 explainers): `ground-water-rule-triggered-source-water-monitoring-141-402` (explainer, Drinking water
  operator; eCFR 40 CFR 141.400, 141.402, 141.403 and 141.2; the total coliform guide mentions 141.402 only in passing);
  `cdl-skills-test-in-another-state-out-of-state-training-383-79` (explainer, CDL; eCFR 49 CFR 383.79 and 383.5; no
  guide or post covers 383.79); `pretreatment-industrial-user-data-confidential-40-cfr-403-14` (explainer, Wastewater
  operator, second today; eCFR 40 CFR 403.14, 403.3 and the title of 2.302; the pretreatment guide lists 403.14 as not
  covered). eCFR text fetched this run (versioner API, as of 2026-11-10). Each post was checked by a separate agent;
  findings fixed (water: "three things follow" replaced by the correct sequence, both 141.402(d)(1) invalidation
  conditions quoted, 30/120-day clocks tied to the specific notices, full (a)(6) treatment alternative and "one or
  more" quoted, wholesale five-sample duty added, "State" defined from 141.2, summary keeps "not invalidated" and
  representative sources; CDL: unsourced generalisation and "home State issues the license" removed, knowledge-test
  sentence limited to paragraph (a), link description to the ELDT post corrected; pretreatment: 2.302 URL corrected to
  subchapter-A, unsourced intro and "most reports" removed, effluent heading limited to data provided to the Control
  Authority, inferences ("claim made later", "cannot be shielded", "other business information") and the 403.4 sentence
  removed, advice tone and "Why this matters" replaced by a quoted summary, note that 403.14 is not in the guide).
  All quotes re-verified by script against the fetched text.
- Topic choice: Forklift operator, FAA Part 107 and EPA 609 skipped again (all candidate sections covered, see the first
  run). Wastewater operator had the fewest explainers after the first run (2) and one post today, so it got its second;
  then CDL and Drinking water operator (3 each, none today). A fourth explainer was not attempted.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-15 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents (the first run covered 2026-11-12 onward).
- Deploy: run 43692742342 succeeded.
- Unreachable: none.

## 2026-11-15 (third run, scheduled 5:40 a.m. ET, started 5:39 a.m. ET)

- 6 posts were already out today (two earlier runs), so this run had room for 4 explainers. It published 4 (day total
  10, the ceiling; later runs today publish rule changes only).
- Published (4 explainers): `powder-actuated-tools-training-daily-test-osha-1926-302-e` (explainer, OSHA construction
  safety; eCFR 29 CFR 1926.302(e), versioner API as of 2026-11-12; no page cited 1926.302);
  `which-power-tools-need-constant-pressure-switch-osha-1910-243` (explainer, OSHA general industry safety; eCFR 29 CFR
  1910.243(a)(2) and 1910.242; no page cited 1910.242 or 1910.243);
  `texas-electrician-apprentice-license-supervision-hours` (explainer, Electrician licensing; four tdlr.texas.gov pages:
  apprentice apply and renew, journeyman apply, electrical FAQ); `illinois-home-inspector-license-renewal-continuing-education`
  (explainer, Home inspector licensing; IDFPR 2026 CE fact sheet and out-of-state CE form, 68 Ill. Adm. Code 1410.160 on
  ilga.gov). The Texas and Illinois drafts were written by separate agents from pages read with WebFetch; every post was
  checked by another separate agent (the state checkers re-read every source sentence by sentence). Findings fixed:
  powder-actuated: unsourced "concrete or steel" intro and "often comes up on jobsites" removed, (e)(4) no longer says
  whose PPE, Subpart E title attributed to the eCFR table of contents, (e)(5) table row completed, ANSI note added;
  power tools: "smaller tools" replaced by "all other hand-held powered tools", saber/scroll/jig limit kept in the table,
  "bring from home" heading and unsourced intro removed, rule terms used ("lock-on control", "positive on-off control"),
  (a)(4)/(a)(5) paragraph cut to stay under 900 words; Texas: comma and period in two quotes corrected, exemptions and
  the course alternative added to the summary, unsourced claim that apprentice hours count toward the journeyman exam
  removed (heading renamed), "Submitting at least" kept, criminal-history scope completed, /electrician/ link text
  corrected, unsourced "set by each state" opener removed; Illinois: period moved outside a quote, out-of-state sentence
  now quotes "may review and recommend approval or disapproval", form requirements completed (fee named without amount),
  IDFPR described as publishing the requirements (licence issuer not stated in the sources), summary keeps the
  harassment training and the 11/30/2028 expiration, note that the exemption comes from the fact sheet, not the rule.
  eCFR quotes re-verified by script against the fetched text.
- Topic choice: EPA 609, FAA Part 107 and Forklift operator (1 explainer each) skipped again for the reasons in the first
  run. EPA 608 (3) skipped: 82.162 is reserved, technician revocation is already covered, 82.169 applies only to
  certifying programs, testing organizations and reclaimers, and 82.166 is a legacy section; every other Subpart F
  section is covered by the study guides or posts. Then four topics with 3 explainers and none today: OSHA construction
  safety, OSHA general industry safety, Electrician licensing, Home inspector licensing. North Carolina was tried first
  for the home inspector post, but no board page could be found on ncdoi.gov, so Illinois was used.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-15 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents (some queries needed a retry after empty responses).
  Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Deploy: run 43706741154 succeeded.
- Unreachable: tdlr.texas.gov, idfpr.illinois.gov and www.ilga.gov are refused by the session's egress proxy from the
  shell (read through WebFetch instead); the full Part 1410 page on ilga.gov (EntirePart) could not be read, so Subpart
  F's mandatory topics are not listed. www.ecfr.gov HTML pages return 403 to the shell; the eCFR API works.
- Note: docs/news-keywords.md now marks ASE "not on the roadmap (removed Nov 15, 2026)"; the ASE post published earlier
  today (first run) predates that change and was left as is.

## 2026-11-15 (fourth run, scheduled 12:40 p.m. ET, started 12:39 p.m. ET)

- 10 posts were already out today (three earlier runs), the daily ceiling, so this run checked rule changes only.
- Published: none.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-15 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents (today is a Sunday). Sanity check (40 CFR 84 from
  2026-05-01) returned the two May 26, 2026 HFC documents.
- Unreachable: none.

## 2026-11-15 (fifth run, scheduled 6:40 p.m. ET, started 6:39 p.m. ET)

- 10 posts were already out today (earlier runs), the daily ceiling, so this run checked rule changes only.
- Published: none.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-15 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents (six queries needed a retry after empty responses).
  Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Unreachable: none.

## 2026-11-16 (first run, scheduled 5:40 a.m. ET, started 5:39 a.m. ET)

- No posts were out today yet, so this run had room for 4 explainers. It published 4 (day total 4).
- Published (4 explainers): `pretreatment-net-gross-intake-water-credit-40-cfr-403-15` (explainer, Wastewater operator;
  eCFR 40 CFR 403.15 and 403.3, versioner API as of 2026-11-12; the pretreatment study guide lists 403.15 as not
  covered); `colorado-plumbing-license-renewal-continuing-education` (explainer, Plumbing licensing; dpo.colorado.gov
  Plumbing Applications and CE pages); `aws-cwi-exam-eligibility-education-experience` (explainer, Welding
  certification; AWS CWI program page); `nabcep-pv-design-specialist-exam-eligibility-requirements` (explainer, Solar PV
  certification; NABCEP Board Certifications page and Certification Handbook, 2025 Update). The Colorado, AWS and NABCEP
  drafts were written by separate agents from pages read with WebFetch; every post was checked by another separate agent
  (the eCFR checker compared every quote by script; the web checkers re-read every source and confirmed each joined
  quote). Findings fixed: 403.15: summary-table row "Who decides?" changed to who applies to whom, "last amended"
  changed to "source note"; Colorado: unsourced "(and in some places by a city)" removed, exemption lead-in matched to
  the board's wording, "certificates" changed to "CE records"; AWS: table row 3 wording matched to the page, inference
  about unfinished courses replaced by the page's "successfully completed courses", "before they start" removed,
  confirmation-letter sentence limited to booking Parts A and C with Prometric; NABCEP: quote ending punctuation made
  verbatim, nested quotes fixed, "2025 Update" attributed to the handbook cover.
- Topic choice: EPA 609, FAA Part 107 and Forklift operator (1 explainer each) and EPA 608 (3) skipped again for the
  reasons in earlier runs (candidate sections covered). Then the four topics with 3 explainers: Wastewater operator,
  Plumbing licensing, Welding certification, Solar PV certification. Oregon was tried first for plumbing, but its
  journeyman page did not list experience requirements and its CE hours table could not be read, so Colorado was used.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-15 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents (run before today's 8:45 a.m. ET publication). Sanity check
  (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Deploy: run 43852392705 succeeded.
- Unreachable: dpo.colorado.gov, www.aws.org and www.nabcep.org refuse the shell (read through WebFetch; the NABCEP
  handbook PDF could not be downloaded from the shell, so its quotes were confirmed through WebFetch only).

## 2026-11-16 (second run, scheduled 12:40 p.m. ET, started 12:39 p.m. ET)

- 4 posts were already out today (first run), so this run had room for 4 explainers. It published 4 (day total 8).
- Published (4 explainers): `longer-combination-vehicle-lcv-training-doubles-triples-49-cfr-380` (explainer, CDL; eCFR
  49 CFR 380 Subparts A, B and D; the CDL guides do not cover Part 380); `drinking-water-compliance-samples-certified-laboratory-141-28`
  (explainer, Drinking water operator; eCFR 40 CFR 141.28, 141.89 and 142.10); `osha-safety-color-code-red-yellow-signs-tags-1910-144-145`
  (explainer, OSHA general industry safety; eCFR 29 CFR 1910.144 and 1910.145 with Appendix A to 1910.145(f));
  `osha-construction-debris-chutes-dropping-waste-1926-252` (explainer, OSHA construction safety; eCFR 29 CFR 1926.252).
  All text read from the eCFR versioner API (current to 2026-11-12). Each post was checked by a separate agent against
  the fetched text (quotes compared by script, then re-checked by script after fixes). Findings fixed: LCV: capital
  "Allow" in the 380.113 quote, "clean record" replaced by "within the rule's limits", out-of-service bullet no longer
  says "while operating a CMV", grandfathered drivers' continuing exemption added, opening sentence keeps the interstate
  and 80,000 lb scope; 141.28: "same split" for 141.89 changed to "similar split" (four of the seven measurements),
  unsourced example and "list comes from your state" removed, primacy sentence keeps the 142.10(b)(3) waiver, quote
  punctuation fixed, table labels completed (Subparts E and Z); colors: tag colors described as recommended by Appendix
  A (not "non-mandatory appendix"), "intended to cover" scope kept, ANSI incorporation credited to 1910.6, instruction
  duty limited to danger and caution signs, "Warning" tags (f)(7) added; 1926.252: "inside the building" and "open
  trough" inferences removed, barricade paraphrase matches "completely enclosed" and "debris handling ceases above",
  burning sentence no longer infers, "more than 20 feet" kept.
- Topic choice: EPA 609, FAA Part 107 and Forklift operator (1 explainer each) and EPA 608 (3) skipped again for the
  reasons in earlier runs (candidate sections covered). Then four of the six topics with 4 explainers and none today
  (CDL, Drinking water operator, OSHA general industry safety, OSHA construction safety; all eCFR-based). Electrician
  licensing and Home inspector licensing are left for the evening run.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-16 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents; today's issue (104 documents) was already in the API.
  Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Deploy: run 43922596864 succeeded.
- Unreachable: none. The eCFR API answered "Your IP address has been blocked" to a burst of requests; it worked again
  after a one-minute pause with slower requests.

## 2026-11-16 (third run, scheduled 6:40 p.m. ET, started 6:39 p.m. ET)

- 8 posts were already out today (first and second runs), so this run had room for 2 explainers (10-post ceiling). It
  published 2 (day total 10).
- Published (2 explainers): `minnesota-journeyworker-electrician-license-experience-hours` (explainer, Electrician
  licensing; Minnesota DLI pages on electrical license experience, registered unlicensed electricians and electrical
  continuing education, and Minn. Stat. 326B.33, 2026 version); `massachusetts-associate-home-inspector-to-home-inspector-license`
  (explainer, Home inspector licensing; mass.gov associate home inspector how-to page, 266 CMR 3.00 and 4.00 (Mass.
  Register #1567, 2/13/26) and M.G.L. c. 112, § 222). Both drafts were written by separate agents from pages read with
  WebFetch; each was checked by another separate agent that re-read every source. Findings fixed: Minnesota: 2009 date
  limit added to the registration rule in the summary, school-term experience described as "no credit" (not "limits"),
  supervision quote recast as part of DLI's list of conditions with source punctuation, CE renewal sentence quoted in
  full (including "or until ..."), "The statute matches" changed to "The statute states", unsourced "(and in some places
  by a city)" removed, statute paraphrase widened to "wiring, apparatus and equipment", the 24-of-48 point labeled as
  our arithmetic, unsourced forms-page sentence and "planned topic" line removed (the /electrician/ hub is available);
  Massachusetts: wrong "does not explain indirect supervision" replaced by the 266 CMR 4.06(7) quote, one-year
  computation sentence from 266 CMR 3.01 added, mock-inspection quote made verbatim through "266 CMR 5.05", "two
  licenses" corrected (3.01(2) also has a reciprocity path), unsourced "part of the Division of Occupational
  Licensure" removed, exam advice reworded.
- Topic choice: the two remaining topics with 4 explainers and none today (Electrician licensing, Home inspector
  licensing), as planned in the second run. States not yet covered were chosen (Minnesota, Massachusetts). Minn. R.
  3800.3520 itself could not be read (WebFetch permission timed out); the age-17 and school-term limits are quoted
  from DLI's page, which restates that rule. M.G.L. c. 112, § 223 and a mass.gov "apply for a home inspector license"
  page could not be read; nothing in the post relies on them.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-16 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents. Sanity check (40 CFR 84 from 2026-05-01) returned the two
  May 26, 2026 HFC documents.
- Deploy: run 43983102539 succeeded.
- Unreachable: www.mass.gov, www.dli.mn.gov, www.revisor.mn.gov and malegislature.gov refuse the shell (egress proxy);
  read through WebFetch. One Federal Register API call (14 CFR 43) returned an empty body and succeeded on retry.
