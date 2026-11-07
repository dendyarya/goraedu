# Daily news run (scheduled three times a day: about 5:40 a.m., 12:40 p.m. and 6:40 p.m. U.S. Eastern)

The day's target is **8 to 10 posts** in total across the three runs. Each run publishes, straight to `main` (a push to
`main` goes live):

1. **Every official rule change** found since the last run for a certification on the roadmap (`kind: rule-change`).
   Most days that is 0 to 3. Never invent or stretch one to fill a quota; zero is a normal result.
2. **Three or four explainers** (`kind: explainer`), each answering one practical question from official sources only,
   so the day ends with 8 to 10 posts (rule changes plus explainers) and never more than 10 explainers. The target is a
   ceiling, not a quota: a post that cannot be fully verified is not published, and a short day is logged, not padded.

Everything in `CLAUDE.md` and `docs/news.md` applies. If any check below fails and cannot be fixed with certainty,
publish nothing for that post (or `draft: true`) and say why in the log. Quality beats volume.

## 0. Set up

- Work in `/home/claude/goraedu` (clone `https://github.com/dendyarya/goraedu` there if it is missing; `npm ci` if
  `node_modules` is missing). `git checkout main && git pull --ff-only`.
- Today's date is the U.S. Eastern date of the run. Use it as `published: YYYY-MM-DD` and as `checked` on sources.
- Read `docs/news-log.md` (last run, what was covered, what was skipped) and list `content/news/`.
- Count today's posts: files in `content/news/` with `published:` today. This run's explainers =
  `min(4, 10 - posts already published today)`, and at least 3 when that leaves room. If 10 posts are already out
  today, this run publishes rule changes only.

Network (as of 2026-11-07): www.ecfr.gov, www.federalregister.gov, www.epa.gov, www.osha.gov, www.faa.gov and
www.nrc.gov are reachable from the shell. www.fmcsa.dot.gov refuses automated requests (its own "Access Denied"),
so CDL posts use eCFR (49 CFR) and the Federal Register only.

## 1. Rule changes

Search the Federal Register API for documents published since the last run's date (inclusive) of type
`RULE` (final rule) or `PRORULE` (proposed rule) that amend these CFR parts:

| topic                                                                            | CFR                                                                              |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| EPA 608                                                                          | 40 CFR 82 (subpart F), 40 CFR 84 (HFC rules that change what technicians handle) |
| EPA 609                                                                          | 40 CFR 82 (subpart B)                                                            |
| CDL                                                                              | 49 CFR 380, 382, 383, 384, 391                                                   |
| OSHA 10 and OSHA 30 / OSHA general industry / Crane operator / Forklift operator | 29 CFR 1910, 1926                                                                |
| FAA Part 107                                                                     | 14 CFR 107, 89, 48                                                               |
| FAA A&P mechanic                                                                 | 14 CFR 43, 65, 147                                                               |
| Drinking water operator / Wastewater operator                                    | 40 CFR 141, 142, 133, 403, 503                                                   |
| Lead-safe renovator (RRP) / Asbestos                                             | 40 CFR 745, 763                                                                  |
| Pesticide applicator                                                             | 40 CFR 171                                                                       |
| Industrial radiography                                                           | 10 CFR 34                                                                        |

Use the topic name exactly as `lib/clusters.ts` shows it. Example query:
`https://www.federalregister.gov/api/v1/documents.json?conditions[cfr][title]=40&conditions[cfr][part]=82&conditions[type][]=RULE&conditions[type][]=PRORULE&conditions[publication_date][gte]=YYYY-MM-DD&fields[]=title&fields[]=type&fields[]=html_url&fields[]=publication_date&fields[]=document_number&fields[]=abstract&fields[]=effective_on&fields[]=comments_close_on`

- Query each CFR part separately (`conditions[cfr][part]` takes one part). Use `curl -g` (or quote-safe code), since
  the square brackets in the query break plain curl. Sanity check: the same query from 2026-05-01 for 40 CFR 84 must
  return the two May 26, 2026 HFC documents.
- Skip a document already covered (its `html_url` appears in any `content/news/*.md` source) and corrections or
  technical amendments that change nothing a test-taker or worker needs to know (log them as skipped).
- If federalregister.gov cannot be reached, use eCFR (`https://www.ecfr.gov/api/versioner/v1/versions/title-N.json`
  for recent amendment dates of the parts above) and the agency's own news/rulemaking pages, and say in the log that
  the Federal Register was unreachable.
- Write the post from the document itself (fetch its full text or the agency's page): title says proposed or final;
  first paragraph gives the publication date and, if stated, the effective date or comment deadline; "What changes"
  holds only what the document states; "What this means for exam study" says plainly when the document does not
  mention the certification or its exam. No dollar penalty amounts, no predictions, no opinions.

## 2. Explainers (3 or 4 per run)

- Pick topics from the owner's keyword list in `docs/news-keywords.md` (mapped keywords only): take the keywords whose
  topic has the fewest explainers so far (count `kind: explainer` per `topic` in `content/news/`), never two posts on
  the same topic in one run and never more than two on one topic in a day. Use the keyword's topic, hub page and
  official sources from that file, including its extra rules for planned clusters (state licenses, ASE, AWS,
  NABCEP). Choose one practical question per post that no existing post or page answers
  (check `content/news/`, the cluster's study guides and tools). Good shapes: "Do I need X to do Y?", "What happens
  when...", "How long is X valid", "What records must I keep for X" — answered from the official text.
- Sources: eCFR (fetch the section from the eCFR API), the agency's own pages (epa.gov, osha.gov, faa.gov, fmcsa.dot.gov,
  nrc.gov), the Federal Register; for planned clusters also a state licensing board's own .gov site or the certifying
  body's own site for its own program (rules in `docs/news-keywords.md`). Quote the key words exactly in quotation marks, with the section named, and list every
  source in front matter. Link our matching practice test or study guide (internal links only to pages that exist).
- 500–900 words, plain English, headings that answer questions. Never copy or paraphrase exam questions, prep courses,
  training manuals or other sites. Never claim expertise, endorsement or affiliation. No dollar penalty amounts.

## 3. Independent check (every post)

For each post, a separate agent that did not write it checks it against the fetched official text: every statement is
supported by a cited source, quotes are verbatim, dates and "proposed/final" are right, scope conditions are kept, no
copying, no penalty amounts, no internal link to a missing page. Fix what it finds; if a fact cannot be confirmed,
remove it or hold the post.

## 4. Cover image

`node scripts/news-card.mjs --out public/news/<slug>.png --topic "<topic>" --tag "<Final rule|Proposed rule|Explainer>"
--title "<2–3 short lines split by |>" --source "<Federal Register|eCFR|agency name>" --date "<Mon D, YYYY>"`, then the
post's `image:` block with `credit: goraedu`, `license: Own work` and an alt text that reads the card.

## 5. Publish

- `npm run check` and `npm run format:check` must pass (fix formatting with `npx prettier --write`).
- Commit `News: YYYY-MM-DD (N rule changes, M explainers)` and push to `main`; confirm the Deploy workflow
  succeeded with `gh run list --branch main --limit 1`.
- Append to `docs/news-log.md`: date, posts published (slug, kind, topic), documents skipped and why, any source
  that could not be reached. Commit and push the log too.
