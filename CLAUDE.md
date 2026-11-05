# goraedu: working notes for Claude

goraedu.com is a skilled trades certification practice site for the U.S. market. Cluster 1 is EPA Section 608,
cluster 2 is EPA 609. Content is in English; planning documents are in Indonesian.

## Accuracy principles (no third-party reviewer)

1. Only write questions whose answer is stated clearly in an official document (eCFR 40 CFR Part 82 Subpart F,
   EPA.gov). Avoid questions that depend on field experience.
2. Never claim to be an HVAC expert. The site is an independent education site built from official sources.
3. Every answer and every fact links to its official source with a "Last checked" date. Error reports are
   handled within 7 days and logged on /corrections/.

## Rules

- Never copy, adapt or paraphrase real exam questions from any certifying organization.
- Byline label: "Fact-checked against official EPA sources · Last checked <date>". Never "Reviewed by".
- URLs follow the silo structure in the content map (`/epa-608/<silo>/<page>/`, trailing slash) and never change
  after publishing.
- Footer independence line: "Independent. Not affiliated with or endorsed by the U.S. EPA or any certifying
  organization."
- Only builds with `SITE_ENV=production` are indexable.
- News posts (`content/news/*.md`, guide in docs/news.md) cover EPA refrigerant rules and Section 608
  certification only, from Federal Register, eCFR or EPA.gov. Always say whether a rule is proposed or final.

## Deploy

Push to `main` goes live: GitHub Actions checks, builds and deploys the static export to the shared VPS
(docs/deploy.md). Run `npm run check` and `npm run format:check` before pushing. Secrets (SSH keys, origin
key, API keys) never go in the repo, in chat or in the browser bundle. The server files in `deploy/` only touch
goraedu's own user, folders and Nginx file; never edit the other sites on that VPS.
