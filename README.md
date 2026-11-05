# goraedu

Free practice tests and study guides for U.S. skilled trades certifications (roadmap in lib/clusters.ts),
starting with EPA Section 608.
Every answer links to the official source, with the date it was checked.

Stack: Next.js 16 (static export), served by Nginx on the shared VPS behind Cloudflare.

## Deploy

Every push to `main` is checked, built and deployed to the VPS by GitHub Actions
(`.github/workflows/deploy.yml`). Setup, server layout and rollback: [docs/deploy.md](docs/deploy.md).

Until the repository variable `SITE_ENV=production` is set, every build is `noindex` and `robots.txt` blocks
crawling, so the early site never gets indexed by accident.

## Local

```sh
npm ci
npm run dev      # http://localhost:3000
npm run check    # typecheck, lint, build
```

## Planning documents

Roadmap, EPA 608 content map, runbook and the production tracker live outside the repo
(Claude Docs and `goraedu-tracker-epa608.xlsx`).
