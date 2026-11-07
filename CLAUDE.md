# goraedu: working notes for Claude

goraedu (https://www.goraedu.com, always with www) is a practice site for all U.S. skilled trades certifications (roadmap: lib/clusters.ts). The site
itself is general; each certification ("cluster") lives in its own folder. Cluster 1 is EPA Section 608, cluster 2
is EPA 609. Content is in English; planning documents are in Indonesian. Never make site-wide pages (home, header,
footer, trust pages) specific to one cluster.

## Accuracy principles (no third-party reviewer)

1. Only write questions whose answer is stated clearly in an official document (for EPA 608: eCFR 40 CFR Part 82
   Subpart F and EPA.gov; for each later cluster: the rules of the agency that writes them). Avoid questions that
   depend on field experience.
2. Never claim to be an expert in any trade. The site is an independent education site built from official sources.
3. Every answer and every fact links to its official source with a "Last checked" date. Error reports are
   handled within 7 days and logged on /corrections/.

## Rules

- Never copy, adapt or paraphrase real exam questions from any certifying organization.
- Byline label: "Fact-checked against official sources · Last checked <date>". Never "Reviewed by".
- URLs follow the silo structure in the content map (`/epa-608/<silo>/<page>/`, trailing slash) and never change
  after publishing.
- Footer independence line: "Independent. Not affiliated with or endorsed by any government agency or certifying
  organization." Cluster pages also name the agency, e.g. "Not affiliated with or endorsed by the U.S. EPA".
- Only builds with `SITE_ENV=production` are indexable.
- News posts (`content/news/*.md`, guide in docs/news.md) are `kind: rule-change` (official proposed or final rule
  changes; always say which) or `kind: explainer` (evergreen articles built only from official sources), tagged with
  `topic` (cluster name), from the Federal Register, eCFR or the agency's own site. The daily schedule is in
  docs/daily-news.md: three runs a day, 8 to 10 posts in total (all rule changes found plus explainers on the keywords in
  docs/news-keywords.md), each fact-checked; the target is a ceiling, never pad to a quota.
- A cluster appears in menus and grids with its status until its overview page exists (no links to missing pages).

## Deploy

Push to `main` goes live: GitHub Actions checks, builds and deploys the static export to the shared VPS
(docs/deploy.md). Run `npm run check` and `npm run format:check` before pushing. Secrets (SSH keys, origin
key, API keys) never go in the repo, in chat or in the browser bundle. The server files in `deploy/` only touch
goraedu's own user, folders and Nginx file; never edit the other sites on that VPS.
