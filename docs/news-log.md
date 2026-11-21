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

## 2026-11-17 (first run, scheduled 5:40 a.m. ET, started 5:39 a.m. ET)

- 0 posts were out today, so this run had room for 4 explainers. It published 1 rule change and 4 explainers (day
  total 5).
- Published (1 rule change): `faa-proposes-electronic-payment-only-mechanic-replacement-certificate-65-16`
  (rule-change, FAA A&P mechanic; FR Doc. 2026-23397, "Modernizing to Electronic Payments", proposed rule published
  2026-11-17, comments due 2027-01-04, full text from govinfo; current 14 CFR 65.16 from the eCFR API). The post covers
  only 65.16 and the 13.18 payment method; the parts 47, 49, 61, 63, 187 and 406 changes do not touch a roadmap
  certification's rules a test-taker needs.
- Published (4 explainers): `sewage-sludge-surface-disposal-site-location-crops-grazing-40-cfr-503-24` (explainer,
  Wastewater operator; eCFR 40 CFR 503.21, 503.22 and 503.24, the 503.24 practices our biosolids guide lists as not
  covered); `oregon-journeyman-plumber-license-exam-hours-classroom-training` (explainer, Plumbing licensing; Oregon
  License Directory entry, BCD form 440-2571 and BCD journeyman plumber license page);
  `aws-certified-associate-welding-inspector-cawi-path-to-cwi` (explainer, Welding certification; aws.org CAWI and CWI
  pages); `nabcep-pv-installer-specialist-exam-eligibility-requirements` (explainer, Solar PV certification; NABCEP
  Board Certifications page and 2025 Certification Handbook, Section 6 and 2.4). The three web-sourced drafts were
  written by separate agents from pages read with WebFetch; every post was checked by another separate agent (eCFR and
  FR quotes compared by script; web pages re-read by the checker). Findings fixed: FAA: "lags its own practice"
  reworded to FAA's "diverges" sense; 503.24: "threatened" and critical habitat added to the summary, 503.22(b)
  sentence no longer adds "when the rule took effect" or floodplains, "safe" paraphrase removed, sewage sludge unit
  definition exclusion ("stored or treated") added, study-guide coverage stated precisely (storm capacity, active-unit
  methane, public access), State exam sentence matched to the hub wording, trimmed to under 900 words; Oregon:
  employer condition quoted in full ("out of business, deceased or otherwise unlocatable"), military "other reliable
  documentation" alternative added, three split quotes merged, unsourced apprentice-form advice and "set by each state
  (and in some places by a city)" replaced, straight apostrophes; AWS: summary comparison attributed to AWS's pages, not
  to AWS; NABCEP: two quote punctuation fixes, "or government equivalent" kept in the provider quote, arithmetic limited
  to 1 to 999 kW installations (under 1 kW does not count), two split quotes merged.
- Topic choice: EPA 609, FAA Part 107 and Forklift operator (1 explainer each) and EPA 608 (3) skipped again for the
  reasons in earlier runs. Then the four topics with 4 explainers (Wastewater operator, Plumbing licensing, Welding
  certification, Solar PV certification). Oregon chosen as a state not yet covered for plumbing. The Oregon BCD
  continuing-education page could not be read (WebFetch permission timed out) and OAR 918-695-0030 was found only on
  non-.gov copies; nothing in the post relies on them.
- Rule changes: Federal Register API search (RULE and PRORULE, published 2026-11-16 or later) for every CFR part in
  docs/daily-news.md plus 40 CFR 143 returned only FR Doc. 2026-23397 (14 CFR 65). Sanity check (40 CFR 84 from
  2026-05-01) returned the two May 26, 2026 HFC documents.
- Build: `next build` stopped twice with a "SecurityFatalError" upgrade reminder for Next.js 16.4.3 after all pages
  were generated; the same command passed on retry. Not upgraded (outside this run's scope); flagged to the owner.
- Deploy: run 44070083370 succeeded.
- Unreachable: www.oregon.gov, aws.org and nabcep.org refuse the shell (egress proxy); read through WebFetch. The
  Federal Register API answered "Your IP address has been blocked" after a burst of requests and empty bodies for two
  calls (40 CFR 403, 763) that succeeded on retry.

## 2026-11-17 (second run, scheduled 12:40 p.m. ET, started 12:39 p.m. ET)

- 5 posts were out today, so this run had room for 4 explainers. It published 0 rule changes and 4 explainers (day
  total 9).
- Published (4 explainers): `osha-aerial-lift-rules-general-industry-1910-67` (explainer, OSHA general industry safety;
  eCFR 29 CFR 1910.67); `osha-demolition-preparatory-operations-engineering-survey-1926-850` (explainer, OSHA
  construction safety; eCFR 29 CFR 1926.850 and 1926.851); `cdl-masking-convictions-deferral-diversion-384-226`
  (explainer, CDL; eCFR 49 CFR 384.226, 384.225, 384.105, 384.101 and 383.5);
  `individual-filter-turbidity-exceedance-follow-up-141-175-141-563` (explainer, Drinking water operator; eCFR 40 CFR
  141.170, 141.174, 141.175, 141.560 to 141.564, 141.570 and 141.571). All eCFR text read from the versioner API (as of
  2026-11-13); quotes compared by script. Each post was checked by a separate agent. Findings fixed: aerial lift:
  training rule and the other (c)(2) rules now scoped to extensible and articulating boom platforms (summary and body),
  (c)(1) noted as the only ladder/tower truck rule, upper-controls quote made a full sentence, "two questions",
  electrical guide described as covering parts of Subpart S, field-modification section cut for length; demolition:
  summary keeps the "apparent or suspected" condition of (e), "Step N" headings removed and intro says which paragraphs
  are tied to the start of work; CDL: "ticket" replaced by "conviction" (title, alt, card, bullets), 384.105(a) added so
  the 383.5 definition applies to Part 384, "rebated, suspended, or probated" reading corrected, 3-year retention keeps
  "or longer" under 384.231(d), 384.225(b) wording, authorized agents, study-guide link no longer claims 383.5
  definitions, self-reporting link text narrowed (employer notice remains); water: summary allows CFE monitoring for
  two-filter small systems and "at least every 15 minutes", 0.5 NTU row wording matches 141.175(b)(2), CFE note under
  the table, lime-softening citation to both sections, study-guide description corrected (141.70 to 141.76).
- Topic choice: EPA 609, FAA Part 107, Forklift operator and EPA 608 skipped for the reasons in earlier runs. The four
  topics already with an explainer today (Wastewater operator, Plumbing licensing, Welding certification, Solar PV
  certification) were left for balance; CDL, Drinking water operator, OSHA construction safety and OSHA general industry
  safety (5 each, none today) were picked as eCFR-based topics. Electrician licensing and Home inspector licensing (5
  each, none today) remain for the third run, which has room for 1 post (10 minus 9).
- Rule changes: none new. Federal Register API search (RULE and PRORULE, published 2026-11-17 or later) for every CFR
  part in docs/daily-news.md plus 40 CFR 143 returned only FR Doc. 2026-23397 (14 CFR 65), already covered this
  morning. Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Build: local `npm run check` stopped once with the Next.js "SecurityFatalError" upgrade reminder and passed on retry.
- Deploy: run 44141638244 FAILED at the "Security audit (fail on high or critical)" step, not at the posts: a new high
  advisory for picomatch (GHSA-fc5q-39xc-vjpf, every version affected, no fix available) reached through
  eslint-config-next, fast-glob, micromatch and tinyglobby. The four posts are on main but not live until the owner
  decides how to handle the audit gate. Dependencies were not changed (outside this run's scope).
- Unreachable: the eCFR renderer API answered "Your IP address has been blocked" once; the versioner API worked.

## 2026-11-17 (third run, scheduled 6:40 p.m. ET, started 6:39 p.m. ET)

- 9 posts were out today, so this run had room for 1 post. It published 0 rule changes and 1 explainer (day total 10).
- Published (1 explainer): `osha-hazardous-classified-locations-electrical-equipment-1910-307` (explainer, Electrician
  licensing; eCFR 29 CFR 1910.307 and 1910.399, read from the versioner API as of 2026-11-13). Quotes compared by
  script. Checked by a separate agent; findings fixed: opening no longer says ordinary equipment "may not be used"
  (1910.307(e) allows general-purpose equipment in Division 2 on the employer's showing), examples matched to the
  regulation's wording (gasoline dispensing, grain handling), (c)(2)(ii) described as provisions that "modify" the
  marking rule (not exceptions, since (E) adds a marking), Division 2 sentence keeps "or equipment in general-purpose
  enclosures" and drops "only". Construction (1926 Subpart K) and 1910.302 applicability not covered.
- Topic choice: EPA 609, FAA Part 107, Forklift operator and EPA 608 skipped for the reasons in earlier runs. Electrician
  licensing and Home inspector licensing (5 each, none today) were the candidates; Electrician licensing picked because
  hazardous (classified) locations are explicitly listed as not covered in the OSHA construction electrical guide and
  no page or post cites 1910.307. Home inspector licensing left for tomorrow.
- Rule changes: none new. Federal Register API search (RULE and PRORULE, published 2026-11-17 or later) for every CFR
  part in docs/daily-news.md plus 40 CFR 143 returned only FR Doc. 2026-23397 (14 CFR 65), already covered this
  morning. Four empty replies (29 CFR 1926, 40 CFR 142, 403; 10 CFR 34) returned count 0 on retry. Sanity check (40 CFR
  84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Build: `node_modules` was missing; `npm ci` run. `npm run check` and `npm run format:check` passed.
- Deploy: run 44202318116 FAILED at "Security audit (fail on high or critical)", the same picomatch advisory
  (GHSA-fc5q-39xc-vjpf, no fix available) as the second run. Local `npm audit --audit-level=high` still reports 9 high.
  The second and third runs' five posts are on main but not live until the owner handles the audit gate. Dependencies
  not changed (outside this run's scope).
- Unreachable: the eCFR versioner API answered "Your IP address has been blocked" for 1910.302 after two fetches.

## 2026-11-18 (first run, scheduled 5:40 a.m. ET, started 5:40 a.m. ET)

- 0 posts were out today, so this run had room for 4 explainers. It published 0 rule changes and 3 explainers (day
  total 3).
- Published (3 explainers):
  - `utah-residential-journeyman-plumber-license-hours-education-exams` (explainer, Plumbing licensing; Utah DOPL
    residential journeyman application page, exam information page and FAQ, read with the web-fetch agent). Checked
    by a separate agent; findings fixed: the FAQ's remote written / in-person practical exam statements removed (the
    FAQ says this for the Journeyman Plumber license, not the residential one), the "hours before the exam" FAQ answer
    now named as an answer about the journeyman or master exam, "paper application form" removed (not on the page),
    scheduling link reworded. The (non-residential) journeyman route was left out because DOPL's application page
    (8,000 hours) and exam page (6,000 hours) disagree; the residential pages agree (6,000 / 12,000 hours).
  - `north-carolina-home-inspector-license-200-hour-education-exam-insurance` (explainer, Home inspector licensing;
    N.C.G.S. Chapter 143 Article 9F, the Board's rules booklet effective June 1, 2026 (11 NCAC 08), OSFM apply page).
    Checked by a separate agent (all quotes confirmed under the cited sections); fix: insurance amounts now "set by the
    statute and the Board (Rule .1006(b) sets the bond amount)". No dollar amounts in the post. CE rule .1300 not read
    verbatim (booklet tail truncated), so the post gives only the statute's 12 to 20 hour range.
  - `sewage-sludge-surface-disposal-pathogens-vector-attraction-daily-cover-40-cfr-503-25` (explainer, Wastewater
    operator; eCFR 40 CFR 503.25, 503.33, 503.32, 503.21, 503.9, versioner API as of 2026-11-13). Quotes compared by
    script. Checked by a separate agent; fixes: 503.9(f) septage exclusions added, turf harvesting added to the Class B
    site restriction list, eCFR date wording clarified.
- Not published: an AWS Certified Welding Supervisor (CWS) explainer (Welding certification). The web-fetch agent got
  only navigation text from www.aws.org/certification/cws_faqs and a summary with conflicting experience figures, so
  nothing could be quoted verbatim. Solar PV certification (5 explainers) not attempted: NABCEP's eligibility and
  recertification pages are already covered. Fourth slot left empty rather than padded.
- Topic choice: EPA 609, FAA Part 107, Forklift operator and EPA 608 skipped for the reasons in earlier runs. Picked
  from the five topics with 5 explainers (Home inspector licensing, Plumbing licensing, Wastewater operator, Welding
  certification, Solar PV certification).
- Rule changes: none new. Federal Register API search (RULE and PRORULE, published 2026-11-17 or later) for every CFR
  part in docs/daily-news.md plus 40 CFR 143 returned only FR Doc. 2026-23397 (14 CFR 65), already covered. Sanity check
  (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Build: `node_modules` was missing; `npm ci` run. `npm run check` and `npm run format:check` passed.
- Deploy: run 44289163024 FAILED at "Security audit (fail on high or critical)", the same picomatch advisory
  (GHSA-fc5q-39xc-vjpf) as on 2026-11-17 (the 02:55 UTC scheduled Deploy failed the same way). Posts from the 2026-11-17
  second and third runs and this run are on main but not live until the owner handles the audit gate. Dependencies
  not changed (outside this run's scope).
- Unreachable: commerce.utah.gov, ncleg.gov and ncosfm.gov refuse the shell (read with the web-fetch agent);
  www.aws.org CWS page body unreadable through the web-fetch agent.

## 2026-11-18 (second run, scheduled 12:40 p.m. ET, started 12:39 p.m. ET)

- 3 posts were out today, so this run had room for 4 explainers. It published 0 rule changes and 4 explainers (day
  total 7).
- Published (4 explainers):
  - `can-cdl-school-give-skills-test-third-party-tester-383-75` (explainer, CDL; eCFR 49 CFR 383.75, versioner API as of
    2026-11-16; the CDL standards guide lists 383.75 as not covered). Checked by a separate agent; fixes: summary "if the
    conditions ... are met", heading "the same test?" (no "easier"), school sentence limited to what (a)(7) bars plus
    "Your State's rules may say more", study note now says same version/instructions/scoring sheets on a State-approved
    route (advice removed), guide topics listed in full, bond wording "initiate and maintain", intro claims removed.
  - `when-can-concrete-forms-shores-be-removed-osha-1926-703` (explainer, OSHA construction safety; eCFR 29 CFR 1926.703
    and 1926.700, as of 2026-11-16; no guide covers Subpart Q). Checked by a separate agent; fixes: summary keeps the
    "conditions followed" and "results show sufficient strength" conditions, slabs-on-grade/slip-forms exception tied
    to (e)(1), (b)(8)(i) "whenever ... tiered" wording, full verb lists for (a)(1) and the appendix, subpart title
    replaced by 1926.700(a) wording. Card regenerated after the title overlapped the date box.
  - `resistance-spot-welding-machine-guarding-osha-1910-255` (explainer, Welding certification; eCFR 29 CFR 1910.255, as
    of 2026-11-16; the general industry welding guide quotes only its installation, voltage and maintenance rules).
    Checked by a separate agent; fixes: (b) rules scoped to nonportable spot and seam machines in summary and body,
    (c) described as all portable guns with (c)(2) limited to suspended equipment, (b)(2) restated (insulation,
    interlocks wired into the control circuit, "absolute discharge" quoted), intro no longer says certification covers
    resistance welding, heading on doors and access panels, welding hub described as available (not planned).
  - `nabcep-pv-system-inspector-pvsi-eligibility-exam-recertification` (explainer, Solar PV certification; NABCEP
    Certification Handbook 2025 Update, read with the web-fetch agent: Sections 1, 10, 14.4, 14.6, 15, 17.2, 19.8,
    20.1, 21.1.2, 21.1.4). Checked by a separate agent that re-read the handbook (all quotes confirmed); fixes: summary
    lists the recertification application and fee and the exam alternative, sixth 10.1 bullet added, "passing score is
    required" added, 17.2 named "What is Provided at the Exam", "immediately" restored for directory removal, solar
    hub described as the OSHA installer hub, "Unlike NABCEP's installer..." comparison and the ambiguous LRP/CBT
    exam-format table removed. No fee amounts.
- Topic choice: EPA 609, FAA Part 107, Forklift operator and EPA 608 skipped for the reasons in earlier runs. Solar PV
  certification and Welding certification (5 each) first; then two 6-explainer topics with no post today (CDL, OSHA
  construction safety). Plumbing licensing, Home inspector licensing and Wastewater operator already had a post today.
  Welding used eCFR because 1910.252(c)(1)(iv) is already covered by the 2026-11-12 post.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-18 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents (14 CFR 48 and 40 CFR 763 gave empty replies once and
  count 0 on retry). Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Build: `node_modules` was missing; `npm ci` run. `npm run check` stopped once with the Next.js security upgrade
  reminder and passed on retry (the suggested upgrade was not run: outside this run's scope). `npm run format:check`
  passed.
- Deploy: run 44363269580 succeeded (the audit step that failed on 2026-11-17 and this morning passed), so the posts
  held back since the 2026-11-17 second run are live too.
- Unreachable: the eCFR versioner API answered "Your IP address has been blocked" once (retry worked) and now requires
  `Accept-Encoding` compression (`curl --compressed`). nabcep.org read with the web-fetch agent.

## 2026-11-18 (third run, scheduled 6:40 p.m. ET, started 6:39 p.m. ET)

- 7 posts were out today, so this run had room for 3 explainers. It published 0 rule changes and 3 explainers (day
  total 10, the daily ceiling).
- Published (3 explainers):
  - `osha-jack-inspection-rated-load-blocking-1910-244` (explainer, OSHA general industry safety; eCFR 29 CFR 1910.244,
    version 2026-11-16; no guide or post covered it). Checked by a separate agent (all 17 quotes verified by script);
    fixes: unsourced opening sentence about where jacks are used removed, "not meant to be the only support" and "does
    not allow a delay" restated as what (a)(2)(iii) requires, "one locality" condition kept as "constant or intermittent
    use at one locality" in summary and body.
  - `uncovered-finished-water-storage-cover-or-treat-40-cfr-141-714` (explainer, Drinking water operator; eCFR 40 CFR
    141.714, 141.700, 141.721(b), 141.2, version 2026-11-16; only a definition question covered it). Checked by a
    separate agent (all 13 quotes verified by script); fixes: Subpart W named by its eCFR heading "Enhanced Treatment for
    Cryptosporidium" (the "Long Term 2" name is not in the cited text), State notification and the State-approved schedule
    alternative added to the summary and body, unsourced "once stored" opening removed, raw-water sentence marked as a
    reading of the definition. A sentence saying an open facility can stay uncovered only with the treatment option was
    removed before the check (it ignored the schedule alternative).
  - `colorado-electrician-license-renewal-continuing-education-24-hours` (explainer, Electrician licensing; Colorado
    State Electrical Board pages dpo.colorado.gov/Electrical/CE and /Electrical/Applications, read with the web-fetch
    agent). Checked by a separate agent that re-read both pages (all quotes matched); fixes: first-renewal exception
    worded as the board's "condition of issuance", unsourced "set at the state or local level" and "rules electricians
    work under" removed, curly apostrophe restored in a quote. The Applications page still shows a September 30, 2023
    expiration date, so the post gives no date and points to the online account. Card regenerated twice (title too close
    to the date box). No fee amounts.
- Topic choice: EPA 609, FAA Part 107, Forklift operator and EPA 608 skipped for the reasons in earlier runs. The three
  6-explainer topics with no post today were picked (Drinking water operator, Electrician licensing, OSHA general
  industry safety).
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-18 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents (14 CFR 147 gave an empty reply once and count 0 on
  retry). Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Build: `npm run check` stopped once with the Next.js security upgrade reminder and passed on retry (the upgrade was not
  run: outside this run's scope). `npm run format:check` passed.
- Deploy: run 44423717960 succeeded.
- Unreachable: dpo.colorado.gov refuses the shell (read with the web-fetch agent).

## 2026-11-19 (first run, scheduled 5:40 a.m. ET, started 5:39 a.m. ET)

- No posts were out today, so this run had room for up to 4 explainers. It published 0 rule changes and 3 explainers
  (day total 3).
- Published (3 explainers):
  - `massachusetts-journeyman-plumber-license-6800-hours-550-hours-theory` (explainer, Plumbing licensing; 248 CMR 11.00,
    Mass. Register #1559, 10/24/2025, read from mass.gov with the web-fetch agent: 11.02(1), 11.02(2), 11.02(8), 11.03).
    Checked by a separate agent that re-read the regulation (all 24 quotes reported exact); fixes: summary and heading say
    11.02(1) sets eligibility for the journeyman examination (not the license itself), the 11.02(8) exception restated as
    work under a "Public Comprehensive High School Career/Vocational Technical School Program" (no "approved"). The
    fetch returned only part of the PDF; 11.06 (tier breakdown) was not read and the post does not describe it. No fee
    amounts.
  - `arizona-home-inspector-certification-84-hours-30-parallel-inspections` (explainer, Home inspector licensing; Arizona
    State Board of Technical Registration rule R4-30-247 (Supp. 24-1, effective May 25, 2024), Home Inspections General
    Information and Home Inspector Applicant FAQ, read with the web-fetch agent). Checked by a separate agent that
    re-read all three pages (all quotes matched); fixes: "board's standards of professional practice" replaced by the
    rule's "shall meet the standards in R4-30-301.01", (B)(9) report described with its R4-30-301.01 condition and "the
    Report Checklist Supplement", comma restored in the accreditation sentence. The pages state no continuing education
    requirement for renewal, and the post says so. Card regenerated once (title too close to the date box). No fee,
    bond or insurance amounts.
  - `aws-certified-welding-supervisor-cws-eligibility-validity-renewal` (explainer, Welding certification; AWS page
    "Certified Welding Supervisor (CWS) Program", www.aws.org/certification/CWS_FAQs, read with the web-fetch agent).
    Checked by a separate agent that re-read the page (all 13 quotes matched); fix: the nine-year recertification now
    includes the listed documentation of continued welding-supervisor activity in summary and body, not only the
    exam-or-80-PDH option. The page states no question count, time or passing score, and the post says so. No fees.
- Skipped: Solar PV certification (6 explainers) was planned as a fourth post on NABCEP's PV Commissioning & Maintenance
  Specialist, but the web-fetch agent could not read the NABCEP handbook PDF (Handbook-1-23-25-V2.pdf; permission
  request not answered in time), so it was not written. Wastewater operator (6) skipped: every section of 40 CFR 133,
  403 and 503 that a practical question would rest on is already in a study guide or post. Welding used AWS because 1910
  Subpart Q and 1926 Subpart J are covered by the two OSHA welding guides and earlier posts. EPA 609, FAA Part 107,
  Forklift operator and EPA 608 skipped for the reasons in earlier runs.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-18 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents. Sanity check (40 CFR 84 from 2026-05-01) returned the two
  May 26, 2026 HFC documents.
- Build: `node_modules` was missing; `npm ci` run. `npm run check` stopped once with the Next.js security upgrade
  reminder and passed on retry (the upgrade was not run: outside this run's scope). `npm run format:check` passed.
- Deploy: run 44509498984 succeeded.
- Unreachable: www.nabcep.org handbook PDF (web-fetch permission not granted in time). mass.gov, btr.az.gov and aws.org
  refuse the shell (read with the web-fetch agent).

## 2026-11-19 (second run, scheduled 12:40 p.m. ET, started 12:39 p.m. ET)

- 3 posts were out today, so this run had room for up to 4 explainers. It published 0 rule changes and 4 explainers
  (day total 7).
- Published (4 explainers):
  - `nabcep-pv-commissioning-maintenance-specialist-pvcms-eligibility-exam-recertification` (explainer, Solar PV
    certification; NABCEP Certification Handbook 2025 Update (Handbook-1-23-25-V2.pdf, Sections 2.4, 7, 14.6, 15, 17.2,
    19.8, 21.1.2, 21.1.4) and the Apply Now page, read with the web-fetch agent; the PDF that failed in the first run
    was read this time). Checked by a separate agent that re-read both pages; fixes: "12 Project Credits of work on PV
    systems" changed to "12 Project Credits" (7.2/7.3 say only "systems"), three quotes ended at the source's own
    punctuation, CE exam alternative limited to before the period ends, renewal year stated as uncertified with a late
    fee (no amount). The handbook (one year) and the Apply Now page (two years) disagree on the exam eligibility window;
    the post states both and tells readers to check. No fees, no passing score (not captured).
  - `cdl-insulin-treated-diabetes-dot-medical-card-391-46` (explainer, CDL; eCFR 49 CFR 391.46 and 391.45(e), as of
    2026-11-17; the driver qualifications study guide says 391.46 is "not summarized here"). Checked by a separate
    agent (all citations correct); fixes: the medical examiner quote now includes "free of complications" scope,
    trailing punctuation moved outside eight quotes, 12-month quote completed with "allowed by § 391.45(e)".
  - `can-workers-ride-material-hoist-osha-1926-552` (explainer, OSHA construction safety; eCFR 29 CFR 1926.552, as of
    2026-11-17; no guide or post covered 1926 Subpart N hoists). Checked by a separate agent (26 quotes and all
    citations correct); fixes: summary limits competent-person supervision to the pre-service inspection, unsourced
    intro generalities removed, four quotes' end punctuation fixed.
  - `can-water-system-use-bottled-water-point-of-entry-devices-141-101-141-100` (explainer, Drinking water operator;
    eCFR 40 CFR 141.101, 141.100, 141.2, 142.57, 142.62, as of 2026-11-17). Checked by a separate agent (21 quotes
    exact); fixes: unsourced primacy sentence replaced, "FDA rules" replaced by the 21 CFR sections the rule names,
    142.62(f) added for variances, (h)(7) lead and copper scope restated with 141.83/141.84. The CFR's own
    cross-reference error in 142.57(c) ("§ 141.62(h)") is not quoted.
  - Cards: three regenerated once (title lines ran into the date box or wrapped).
- Topic choice: Solar PV certification (6 explainers) first. Wastewater operator (6) skipped again (all candidate
  sections covered, see the first run today). EPA 609, FAA Part 107, Forklift operator and EPA 608 skipped for the
  reasons in earlier runs. Then three 7-explainer topics with no post today: CDL, OSHA construction safety, Drinking
  water operator.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-19 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents. Sanity check (40 CFR 84 from 2026-05-01) returned the two
  May 26, 2026 HFC documents.
- Build: `node_modules` was missing; `npm ci` run. `npm run check` stopped once with the Next.js security upgrade
  reminder and passed on retry (the upgrade was not run: outside this run's scope). `npm run format:check` passed.
- Deploy: run 44581660908 succeeded.
- Unreachable: www.nabcep.org refuses the shell (read with the web-fetch agent). www.ecfr.gov web pages redirect the
  shell to unblock.federalregister.gov; the eCFR API was used for all text.

## 2026-11-19 (third run, scheduled 6:40 p.m. ET, started 6:40 p.m. ET)

- 7 posts were out today, so this run had room for 3 explainers. It published 0 rule changes and 3 explainers (day
  total 10).
- Published (3 explainers):
  - `does-a-lab-need-a-chemical-hygiene-plan-osha-1910-1450` (explainer, OSHA general industry safety; eCFR 29 CFR
    1910.1450, as of 2026-11-17; no guide or post cited 1910.1450). Checked by a separate agent (all 36 quotes verbatim
    by script); fixes: (a)(2) now lists all three exceptions with the "unless that particular standard states otherwise"
    qualifier, monitoring notice cited as (d)(4) with the posting alternative, unsourced intro examples (school,
    hospital, quality-control labs) removed, (g)(1)(ii) surveillance and (g)(2) physician wording added, three list
    items worded closer to (e)(3) and (f)(4).
  - `idaho-journeyman-electrician-license-apprenticeship-or-16000-hours` (explainer, Electrician licensing; Idaho Code
    54-1007, DOPL Electrical Journeyman License Application (rev. Aug 2, 2024) and Active Registration Waiver form, read
    with the web-fetch agent). Checked by a separate agent that re-read all three; fixes: waiver quote includes "and/or
    military documentation showing relevant experience", "if required by the state" restored in the hours quote, NERA
    and Oregon applicant sections named as not covered, the 8,000-hour line paraphrased (PDF layout made its heading
    placement uncertain). IDAPA 24.39.10 could not be read (files.dfm.idaho.gov permission timed out); the post says it
    does not quote the rule. DOPL proposed electrical rules dated 2026-08-13 were seen in search but not read: a lead
    for a later check (state rule, not a federal one).
  - `tennessee-home-inspector-license-90-hours-exam-32-hours-ce` (explainer, Home inspector licensing; four tn.gov Home
    Inspector Licensing Program pages: license, exam info, renewal, education, read with the web-fetch agent). Checked
    by a separate agent that re-read all four (all quotes verbatim; the writer's summary-only facts confirmed); fixes:
    "valid and current" limited to E&O coverage, sworn statement added to the inactive-to-active requirements,
    "commissioner-approved" and "certification of completion" matched to the page, general opening claim about other
    states removed. Rule 0780-05-12 and T.C.A. 62-6-3 were found only on non-.gov sites and not used. No dollar amounts.
- Topic choice: Wastewater operator (6) skipped again (all candidate sections covered, see the first run today). EPA
  609, FAA Part 107, Forklift operator and EPA 608 skipped for the reasons in earlier runs. Then the 7-explainer topics
  with no post today (Electrician licensing, OSHA general industry safety) and Home inspector licensing (one today,
  new state).
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-19 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents. Sanity check (40 CFR 84 from 2026-05-01) returned the two
  May 26, 2026 HFC documents.
- Build: `node_modules` was missing; `npm ci` run. `npm run check` stopped once with the Next.js security upgrade
  reminder and passed on retry (the upgrade was not run: outside this run's scope). `npm run format:check` passed.
- Deploy: run 44641504836 succeeded.
- Unreachable: files.dfm.idaho.gov (Idaho administrative rules PDF; web-fetch permission timed out). tn.gov, dopl.idaho.gov
  and legislature.idaho.gov were read with the web-fetch agent.

## 2026-11-20 (first run, scheduled 5:40 a.m. ET, started 5:39 a.m. ET)

- 0 posts were out today, so this run had room for 4 explainers. It published 0 rule changes and 4 explainers (day
  total 4).
- Published (4 explainers, each written by a separate writer agent and checked by another agent that re-read the
  official text itself):
  - `wisconsin-journeyman-plumber-license-exam-apprenticeship-renewal` (explainer, Plumbing licensing; two Wisconsin
    DSPS journeyman plumber pages, read with WebFetch). Fixes: out-of-state route paragraph now quotes the section's
    summary and detailed list (it asks for an exam passed "in any other state") instead of judging the heading,
    "substantially similar" state condition added, recognition condition added to the out-of-state apprenticeship,
    "printed notes" added to the binder, exam-instructions sentence matched to the page, split CE quote joined. DSPS's
    "licensure by examination" page and trades FAQ (permission timed out) and docs.legis.wisconsin.gov (refused) could
    not be read; SPS 305.07 and 305.09 are named, not quoted. No fee amounts.
  - `nabcep-pv-technical-sales-professional-pvts-eligibility-exam-recertification` (explainer, Solar PV certification;
    NABCEP Certification Handbook, 2025 Update, read with WebFetch in pieces; the shell download was refused). Fixes:
    four quotes' punctuation made verbatim (Category A joined into one continuous quote, 9.5.2 "Forty" sentence, 9.7.2
    letter, 9.1 bullet). The 2022 PVTS announcement page was read but not used (its credit bands differ from the 2025
    handbook).
  - `aws-senior-certified-welding-inspector-scwi-eligibility-endorsements` (explainer, Welding certification; AWS SCWI
    page, read in full with WebFetch). Fixes: role quote completed with "(CWI) and Certified Associate Welding
    Inspectors (CAWI)", unsupported "visual acuity record" gloss of "VAR Form" removed. The page's own conflict on
    education (no requirement vs. FAQ) is quoted both ways.
  - `osha-rollover-protective-structures-rops-construction-equipment-1926-1000` (explainer, OSHA construction safety;
    eCFR 29 CFR 1926.1000-1003 and 1926.602, version 2026-11-17; no guide or post cited Subpart W). Checker confirmed
    all quotes verbatim; fixes: summary keeps the rubber-tired / wheel-type / crawler limits of 1926.1000(a), 1926.602
    described as its paragraph (a) on earthmoving equipment.
- Topic choice: Wastewater operator (6) skipped again (all candidate sections covered). EPA 609, FAA Part 107, Forklift
  operator and EPA 608 skipped for the reasons in earlier runs. Then the three 7-explainer topics (Plumbing licensing,
  Solar PV certification, Welding certification) and OSHA construction safety (8).
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-19 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents (run before today's 8:45 a.m. ET publication). Sanity
  check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Build: `npm ci` run. `npm run check` stopped once with the Next.js security upgrade reminder and passed on retry (the
  upgrade was not run: outside this run's scope). `npm run format:check` passed.
- Deploy: run 44723395254 succeeded.
- Unreachable: dsps.wi.gov (two pages: permission timed out), docs.legis.wisconsin.gov (refused), nabcep.org PDF from
  the shell (403; read with WebFetch). aws.org and dsps.wi.gov were read with WebFetch.

## 2026-11-20 (second run, scheduled 12:40 p.m. ET, started 12:39 p.m. ET)

- 4 posts were out today, so this run had room for 4 explainers. It published 0 rule changes and 4 explainers (day
  total 8).
- Published (4 explainers, each written by a separate writer agent and checked by another agent that re-read the
  official text itself):
  - `who-needs-hazwoper-training-osha-1910-120-hours` (explainer, OSHA general industry safety; eCFR 29 CFR 1910.120,
    fetched through the eCFR API; no guide or post covered HAZWOPER). Checker confirmed 31 quotes verbatim by script;
    fixes: three (e)(1)(i)/(e)(4) quotes no longer end with a period the source lacks, (e)(1)(i) exposure condition
    restored, (e)(6) certifier matched to the rule, (e)(9) supervised field experience added, Note (B) generator
    exemption stated as the rule words it, "HAZWOPER" presented as our label (not in the eCFR text), Appendix E noted as
    non-mandatory, trimmed under 900 words.
  - `cdl-driver-self-admission-drug-alcohol-use-382-121` (explainer, CDL; eCFR 49 CFR 382.121, 382.107, 382.103,
    382.605, 382.705; versioner API as of 2026-11-18). Checker confirmed 21 quotes and the subpart paths; fixes:
    Clearinghouse conclusion narrowed to the 382.107 definition's own exception (subpart B scope quoted), six quotes'
    end punctuation moved outside, summary now lists all four (a) conditions and "education or treatment", "drivers"
    changed to the rule's "employees". Part 40 not fetched; only its cross-reference is named.
  - `consecutive-water-system-monitoring-40-cfr-141-29` (explainer, Drinking water operator; eCFR 40 CFR 141.29, 141.2,
    141.3, 141.201, 141.152, 141.402). Checker confirmed quotes by script; fixes: two quotes' punctuation, overstated
    "monitors unless the State has modified" line reworded to what 141.29 says, 141.402(a)(4)(i) sample scope added,
    unsourced "State rules can add" removed, CCR-post link text corrected.
  - `new-hampshire-electrician-license-renewal-continuing-education-15-hours` (explainer, Electrician licensing; NH OPLC
    continuing education, FAQ and apprenticeship pages and the Elec 100-400 rules on gc.nh.gov, read with WebFetch).
    Checker re-read all four pages (exact-match checks through WebFetch; the shell could not fetch them); fixes: five
    quotes' punctuation, delivery-method question matched to the page, apprentice 30-hour scope (fifth renewal,
    schooling done, no journeyman license) added. Plc 308.04(d) is named from the board page, not read. The board's
    1-year CE cycle vs. 2-year renewal is quoted both ways without reconciling. No fee amounts.
- Topic choice: Wastewater operator (6) skipped again (all candidate sections covered). EPA 609, FAA Part 107, Forklift
  operator and EPA 608 skipped for the reasons in earlier runs. Then four 8-explainer topics with no post today (OSHA
  general industry safety, CDL, Drinking water operator, Electrician licensing). Utah (statute page shows a 2027
  version; DOPL URL returned other content) and Maine (page failed to load) were tried before New Hampshire.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-20 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents. Sanity check (40 CFR 84 from 2026-05-01) returned the two
  May 26, 2026 HFC documents.
- Build: `npm ci` run. `npm run check` and `npm run format:check` passed (a writer saw the Next.js security upgrade
  reminder once; not run, outside this run's scope).
- Deploy: run 44787066860 succeeded.
- Unreachable: www.ecfr.gov web pages redirect automated requests to unblock.federalregister.gov (the eCFR APIs worked;
  source URLs confirmed with the structure API). oplc.nh.gov and gc.nh.gov from the shell (read with WebFetch).

## 2026-11-20 (third run, scheduled 6:40 p.m. ET, started 6:39 p.m. ET)

- 8 posts were out today, so this run had room for 2 explainers. It published 0 rule changes and 2 explainers (day
  total 10).
- Published (2 explainers, each written by a separate writer agent and checked by another agent that re-read the
  official text itself with WebFetch exact-match checks):
  - `south-carolina-home-inspector-license-120-hour-course-or-experience-two-part-exam` (explainer, Home inspector
    licensing; SC LLR Residential Builders Commission home inspector, instructions, FAQ and exam pages and Reg. 106-4
    on scstatehouse.gov). Checker fix: a Business Management and Law exam quote had been attached to the wrong FAQ
    answer; replaced with the sentence that follows the NHIE answer (a question about applicants licensed in another
    state), and "in place of" softened to the source's "as well as". The pages state no continuing education,
    insurance or bond requirement; the post says so. No fee amounts. WebFetch shows at most ~125 characters per quote,
    so the two longest quotes were confirmed by exact-match but not shown in full.
  - `new-hampshire-journeyman-plumber-license-600-hours-8000-hours` (explainer, Plumbing licensing; NH administrative
    rules Mec 300 on gc.nh.gov: Mec 302.02, 302.03, 304.04(a), 305.01(b), 306.01). Checker confirmed about 25 quotes by
    exact match; fixes: two statements about other states removed, (b)(1) paraphrase matched to "any information
    submitted pursuant to Mec 304.04(a)", the summary's (b)(4) wording matched to the rule, a vague "either reading"
    line clarified. RSA 153:27, the Mec 102 supervision definitions and the OPLC application pages/PDFs could not be
    read; the post names them as not covered and draws nothing from them.
- Topic choice: Wastewater operator (6) skipped again (all candidate sections covered). EPA 609, FAA Part 107, Forklift
  operator and EPA 608 skipped for the reasons in earlier runs. Home inspector licensing (8, none today) first, then
  Plumbing licensing (8, one today). States already covered were excluded.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-20 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned no documents. Sanity check (40 CFR 84 from 2026-05-01) returned the two
  May 26, 2026 HFC documents.
- Build: `npm ci` run. `npm run check` and `npm run format:check` passed.
- Deploy: run 44839612020 succeeded.
- Unreachable: llr.sc.gov, scstatehouse.gov and gc.nh.gov from the shell (read with WebFetch); oplc.nh.gov plumbing
  board page and PDFs failed in WebFetch too; RSA 153:27 (gc.nh.gov statute page) could not be fetched.

## 2026-11-21 (first run, scheduled 5:40 a.m. ET, started 5:40 a.m. ET)

- 0 posts were out today, so this run had room for 4 explainers. It published 0 rule changes and 4 explainers (day
  total 4).
- Published (4 explainers, each written by a separate writer agent and checked by another agent that re-fetched the
  official text itself):
  - `aws-certified-radiographic-interpreter-cri-validity-renewal` (explainer, Welding certification; AWS CRI program page
    on aws.org, read with WebFetch). Checker confirmed 20 quotes by exact-match questions; fixes: the writer's own
    inference that the first eye exam "cannot be reused" removed, the third renewal item (vision examination) added, a
    CWS comparison from an unfetched page removed. The QC15:2008 vs QC15-AMD1 naming is shown both ways. The CWI-page
    quote (from our Nov 10 post, not re-fetched) was removed by the orchestrator; the section now only links that post.
  - `cdl-who-can-see-drug-alcohol-test-records-382-405` (explainer, CDL; eCFR 49 CFR 382.405, 382.409, 382.401,
    382.103). Checker confirmed 19 quotes by script; fixes: unsupported "for many small carriers" removed, 382.405(g)
    "including, but not limited to" and the adulterated/substituted examples restored, a Part 40 line reduced to naming
    the cross-reference. Part 40 not fetched.
  - `nabcep-board-certification-expired-what-happens` (explainer, Solar PV certification; NABCEP Certification Handbook
    2025 Update PDF, read with WebFetch). Checker fixes: scope corrected (PVSI is a board certification with its own
    21.1.4 paragraph; PV Associate has a separate handbook), "best-known" opinion removed, a paraphrase on the new
    expiration date replaced by the full quote, a missing comma in a quote restored, an unsourced OSHA line removed. No
    fee amounts.
  - `osha-construction-flammable-liquids-indoor-storage-limits-1926-152` (explainer, OSHA construction safety; eCFR 29
    CFR 1926.152, 1926.155). Checker confirmed 30 quotes by script; fixes: "approved" agencies made examples, not a
    closed list; an unsourced "whatever the quantity" line removed.
- Topic choice: Wastewater operator (6), EPA 609, FAA Part 107, Forklift operator and EPA 608 skipped for the reasons in
  earlier runs. Then the two 8-explainer topics (Welding certification, Solar PV certification), then two 9-explainer
  topics (OSHA construction safety, CDL). AWS Certified Welding Educator was tried first and dropped (its page
  contradicts itself on renewal and exam order).
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-20 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned one document: FAA 2026-23786, "Miscellaneous Technical Amendments;
  Technical Amendment" (final rule, technical amendment, to be published and effective Nov 23, 2026; touches 14 CFR
  43, 48, 65 among ~60 parts). Skipped: its abstract and text (govinfo PDF) describe only non-substantive corrections
  (typographical errors, outdated references, e.g. "telegram" in 65.16(d), an omitted word in 65.101(b)). Sanity check
  (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Build: `npm ci` run. `npm run check` stopped once on Next.js's "known security vulnerability" upgrade reminder
  (installed 16.4.3) and passed on retry; `npm run format:check` passed. The upgrade (`next upgrade --agent=security`)
  was not run: outside this run's scope, owner's decision.
- Deploy: run 44897099163 succeeded.
- Unreachable: www.federalregister.gov full-text pages (Request Access page; read the govinfo PDF instead); aws.org and
  nabcep.org from the shell (read with WebFetch); www.aws.org/CWI timed out in WebFetch for the checker.

## 2026-11-21 (second run, scheduled 12:40 p.m. ET, started 12:40 p.m. ET)

- 4 posts were out today, so this run had room for 4 explainers. It published 0 rule changes and 4 explainers (day
  total 8).
- Published (4 explainers, each written by a separate writer agent and checked by another agent that re-fetched the
  official text itself):
  - `drinking-water-reporting-results-violations-to-state-141-31` (explainer, Drinking water operator; eCFR 40 CFR
    141.31, 141.2, 141.33, 141.80, 141.861). Checker confirmed 19 quotes by script and fetched the July 1, 2020 and July
    1, 2024 versions of 141.31; fixes: the lead-notice timing note now quotes the July 1, 2024 141.31(d)(2) wording
    ("any Tier 1 notice", "violation or exceedance") and says the 2020 141.31(d) covers the certification step;
    "earlier one controls" matched to "shortest"; the summary's public-notice wording matched to the rule.
  - `osha-rope-descent-system-rules-anchorage-300-feet-1910-27` (explainer, OSHA general industry safety; eCFR 29 CFR
    1910.27, 1910.21, 1910.28, 1910.30). Checker confirmed 25 quotes by script; fixes: (b)(1)(ii) quote completed, the
    summary's fall-arrest wording matched to "uses a separate, independent personal fall arrest system".
  - `osha-tripped-circuit-breaker-reclosing-reenergizing-1910-334` (explainer, Electrician licensing; eCFR 29 CFR
    1910.334, 1910.333, 1910.331, 1910.399). Checker confirmed 28 quotes by script; fixes: 1910.331(a) scope
    ("working on, near, or with" the listed installations) restored, the (c)(2) "might expose an employee to injury"
    condition restored, the heading answer matched to "determined that ... can be safely energized", an unsourced "has
    its own rules" removed. Says plainly that OSHA rules are not a license and covers no state's rules.
  - `kentucky-home-inspector-license-renewal-continuing-education` (explainer, Home inspector licensing; 831 KAR 2:040
    and 2:020 on apps.legislature.ky.gov and the KBHI renewal checklist on bhi.ky.gov, read with WebFetch). Checker
    confirmed about 35 quotes by exact-match questions; fixes: the 12-month scope added to the summary, the online
    elective rule (2:040 Section 4(4)(b)) and the good-cause reinstatement rule (2:020 Section 5(2)(e)) added after
    exact-match confirmation, the five-year inactive rule attributed to 2:020 Section 7, the board-service attendance
    condition quoted, a checklist quote with altered quotation marks paraphrased. Version status: both regulations show
    "Crt to Am 3-24-2026" (intent to amend at the 7-year review); no amendment appears in the LRC proposed-regulations
    list through Nov 17, 2026, so the 2019 text is treated as current (checker's confidence moderate to high).
- Topic choice: Wastewater operator (6), EPA 609, FAA Part 107, Forklift operator and EPA 608 skipped for the reasons in
  earlier runs. The four 9-explainer topics with no post today were picked (Drinking water operator, OSHA general
  industry safety, Electrician licensing, Home inspector licensing); Plumbing licensing (9) left for a later run.
- Rule changes: none. Federal Register API search (RULE and PRORULE, published 2026-11-21 or later) for every CFR part
  in docs/daily-news.md plus 40 CFR 143 returned only FAA 2026-23786 (technical amendment, skipped in the first run
  today). Sanity check (40 CFR 84 from 2026-05-01) returned the two May 26, 2026 HFC documents.
- Build: `npm run check` stopped once on Next.js's security upgrade reminder and passed on retry; `npm run
format:check` passed. The upgrade was not run (owner's decision).
- Deploy: run 44933006705 succeeded.
- Unreachable: apps.legislature.ky.gov and bhi.ky.gov from the shell (read with WebFetch); the LRC certifications page
  (legislature.ky.gov) timed out in WebFetch.
